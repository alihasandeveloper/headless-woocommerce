"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { AppliedCoupon, CartItem, CartTotals } from "@/types/cart";
import { calculateCartTotals, VALID_COUPONS } from "@/lib/woocommerce/cart";
import { Product, ProductVariation } from "@/types/product";

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  totals: CartTotals;
  coupon: AppliedCoupon | null;
  shippingMethodId: string;
  isCartDrawerOpen: boolean;
  addToCart: (
    product: Product,
    options?: {
      quantity?: number;
      variation?: ProductVariation | null;
      selectedAttributes?: Record<string, string>;
      openDrawer?: boolean;
    }
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  setShippingMethodId: (id: string) => void;
  setIsCartDrawerOpen: (open: boolean) => void;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "woostore_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState<AppliedCoupon | null>(null);
  const [shippingMethodId, setShippingMethodId] = useState<string>("flat_rate");
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  // Load from local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed.items)) setItems(parsed.items);
        if (parsed.coupon) setCoupon(parsed.coupon);
        if (parsed.shippingMethodId) setShippingMethodId(parsed.shippingMethodId);
      }
    } catch (err) {
      console.error("Failed to load cart from localStorage", err);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Sync to local storage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify({
          items,
          coupon,
          shippingMethodId,
        })
      );
    } catch (err) {
      console.error("Failed to persist cart to localStorage", err);
    }
  }, [items, coupon, shippingMethodId, isHydrated]);

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const totals = calculateCartTotals(items, coupon, shippingMethodId);

  const addToCart = (
    product: Product,
    options: {
      quantity?: number;
      variation?: ProductVariation | null;
      selectedAttributes?: Record<string, string>;
      openDrawer?: boolean;
    } = {}
  ) => {
    const quantity = Math.max(1, options.quantity || 1);
    const variationId = options.variation ? options.variation.id : undefined;
    const cartItemId = `${product.id}-${variationId || 0}`;

    const price = options.variation
      ? parseFloat(options.variation.price || options.variation.regular_price || "0")
      : parseFloat(product.price || product.regular_price || "0");

    const regularPrice = options.variation?.regular_price
      ? parseFloat(options.variation.regular_price)
      : product.regular_price
      ? parseFloat(product.regular_price)
      : undefined;

    const image = options.variation?.image || product.images[0] || null;

    setItems((prevItems) => {
      const existingIdx = prevItems.findIndex((item) => item.id === cartItemId);
      if (existingIdx > -1) {
        const next = [...prevItems];
        next[existingIdx] = {
          ...next[existingIdx],
          quantity: next[existingIdx].quantity + quantity,
        };
        return next;
      }

      const newItem: CartItem = {
        id: cartItemId,
        productId: product.id,
        variationId,
        name: product.name,
        slug: product.slug,
        sku: options.variation?.sku || product.sku,
        price,
        regularPrice,
        image,
        quantity,
        attributes: options.selectedAttributes,
        stockQuantity: options.variation?.stock_quantity ?? product.stock_quantity,
        stockStatus: options.variation?.stock_status ?? product.stock_status,
      };

      return [...prevItems, newItem];
    });

    if (options.openDrawer !== false) {
      setIsCartDrawerOpen(true);
    }
  };

  const removeFromCart = (cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
    setCoupon(null);
  };

  const applyCoupon = (code: string) => {
    const formatted = code.trim().toUpperCase();
    const found = VALID_COUPONS[formatted];

    if (!found) {
      return { success: false, message: `Coupon "${code}" is invalid or expired.` };
    }

    setCoupon({
      code: found.code,
      discountAmount: found.discountPercent,
      discountType: "percent",
    });

    return { success: true, message: `Coupon "${found.code}" (${found.discountPercent}% OFF) applied!` };
  };

  const removeCoupon = () => {
    setCoupon(null);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        totals,
        coupon,
        shippingMethodId,
        isCartDrawerOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        setShippingMethodId,
        setIsCartDrawerOpen,
        openCartDrawer: () => setIsCartDrawerOpen(true),
        closeCartDrawer: () => setIsCartDrawerOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
