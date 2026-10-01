"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Product, ProductVariation } from "@/types/product";
import { ProductVariations } from "./ProductVariations";
import { QuantitySelector } from "./QuantitySelector";
import { useCart } from "@/hooks/useCart";
import { calculateDiscountPercentage, formatPrice } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import {
  ShoppingCart,
  MessageCircle,
  Phone,
  Check,
} from "lucide-react";

interface ProductInfoProps {
  product: Product;
  variations?: ProductVariation[];
}

export function ProductInfo({ product, variations = [] }: ProductInfoProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  const initialAttributes = useMemo(() => {
    const map: Record<string, string> = {};
    if (product.default_attributes && product.default_attributes.length > 0) {
      product.default_attributes.forEach((def) => {
        map[def.name] = def.option;
      });
    } else if (product.attributes && product.attributes.length > 0) {
      product.attributes.forEach((attr) => {
        if (attr.options.length > 0) {
          map[attr.name] = attr.options[0];
        }
      });
    }
    return map;
  }, [product]);

  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>(initialAttributes);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const activeVariation = useMemo(() => {
    if (!variations || variations.length === 0) return null;
    return (
      variations.find((v) => {
        return v.attributes.every((attr) => {
          const selectedVal = selectedAttributes[attr.name];
          return !attr.option || selectedVal === attr.option;
        });
      }) || variations[0]
    );
  }, [variations, selectedAttributes]);

  const handleAttributeChange = (name: string, value: string) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const currentPrice = activeVariation
    ? activeVariation.sale_price || activeVariation.price
    : product.sale_price || product.price;

  const regularPrice = activeVariation
    ? activeVariation.regular_price
    : product.regular_price;

  const discount = calculateDiscountPercentage(regularPrice, currentPrice);

  const handleAddToCart = () => {
    addToCart(product, {
      quantity,
      variation: activeVariation,
      selectedAttributes,
      openDrawer: true,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleBuyNow = () => {
    addToCart(product, {
      quantity,
      variation: activeVariation,
      selectedAttributes,
      openDrawer: false,
    });
    router.push("/checkout");
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* Title */}
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
        {product.name}
      </h1>

      {/* Pricing Row */}
      <div className="flex items-center gap-3">
        {regularPrice && parseFloat(String(regularPrice)) > parseFloat(String(currentPrice)) && (
          <del className="text-sm font-normal text-gray-400 line-through">
            {formatPrice(regularPrice)}
          </del>
        )}
        <span className="text-2xl sm:text-3xl font-black text-emerald-600">
          {formatPrice(currentPrice)}
        </span>
        {discount > 0 && (
          <span className="rounded bg-red-100 text-red-600 px-2 py-0.5 text-xs font-bold">
            {discount}% OFF
          </span>
        )}
      </div>

      {/* Variations Selector if variable product */}
      {product.type === "variable" && product.attributes && product.attributes.length > 0 && (
        <ProductVariations
          attributes={product.attributes}
          variations={variations}
          selectedAttributes={selectedAttributes}
          onAttributeChange={handleAttributeChange}
        />
      )}

      {/* Quantity Stepper */}
      <div className="space-y-1.5 pt-1">
        <label className="text-xs font-semibold text-gray-700">Quantity:</label>
        <QuantitySelector
          quantity={quantity}
          onQuantityChange={setQuantity}
          max={product.stock_quantity || 99}
          className="w-32"
        />
      </div>

      {/* Action Buttons Stack */}
      <div className="space-y-2.5 pt-2">
        {/* Row 1: Add to Cart + Buy Now */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-3 text-xs sm:text-sm font-bold text-white uppercase tracking-wider transition-colors hover:bg-black active:scale-[0.99]"
          >
            {isAdded ? (
              <>
                <Check className="h-4 w-4 text-emerald-400" />
                <span>ADDED</span>
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" />
                <span>ADD TO CART</span>
              </>
            )}
          </button>

          <button
            onClick={handleBuyNow}
            className="flex items-center justify-center rounded-lg bg-red-600 px-4 py-3 text-xs sm:text-sm font-bold text-white uppercase tracking-wider transition-colors hover:bg-red-700 active:scale-[0.99] shadow-sm shadow-red-600/30"
          >
            BUY NOW
          </button>
        </div>

        {/* Row 2: Messenger + WhatsApp */}
        <div className="grid grid-cols-2 gap-3">
          <a
            href={siteConfig.contact.messenger}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-blue-700"
          >
            <MessageCircle className="h-4 w-4 fill-white" />
            <span>Messenger</span>
          </a>

          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-emerald-700"
          >
            <MessageCircle className="h-4 w-4" />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Row 3: Call for Order */}
        <a
          href={`tel:${siteConfig.contact.phone}`}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-xs font-bold text-white transition-colors hover:bg-slate-800"
        >
          <Phone className="h-4 w-4" />
          <span>Call for Order ({siteConfig.contact.phone})</span>
        </a>
      </div>
    </div>
  );
}
