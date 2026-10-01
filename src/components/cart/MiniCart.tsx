"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Drawer } from "@/components/ui/Drawer";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";

export function MiniCart() {
  const {
    items,
    itemCount,
    totals,
    isCartDrawerOpen,
    closeCartDrawer,
    updateQuantity,
    removeFromCart,
  } = useCart();

  return (
    <Drawer
      isOpen={isCartDrawerOpen}
      onClose={closeCartDrawer}
      title={`Shopping Cart (${itemCount})`}
      position="right"
      className="flex flex-col h-full"
    >
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full py-12">
          <EmptyState
            icon={ShoppingBag}
            title="Your cart is empty"
            description="Looks like you haven't added any items to your shopping cart yet."
            actionText="Start Shopping"
            onActionClick={closeCartDrawer}
            actionHref="/shop"
          />
        </div>
      ) : (
        <div className="flex flex-col h-full justify-between">
          {/* Item List */}
          <div className="divide-y divide-gray-100 overflow-y-auto max-h-[calc(100vh-280px)] pr-1">
            {items.map((item) => (
              <div key={item.id} className="py-4 flex gap-4 items-start">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                  {item.image ? (
                    <Image
                      src={item.image.src}
                      alt={item.image.alt || item.name}
                      fill
                      sizes="80px"
                      className="object-cover object-center"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                      No img
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col justify-between min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={closeCartDrawer}
                        className="font-medium text-sm text-gray-900 hover:text-red-600 transition-colors line-clamp-1"
                      >
                        {item.name}
                      </Link>
                      {item.attributes && Object.keys(item.attributes).length > 0 && (
                        <p className="text-xs text-gray-500 mt-0.5">
                          {Object.entries(item.attributes)
                            .map(([k, v]) => `${k}: ${v}`)
                            .join(", ")}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    {/* Quantity controls */}
                    <div className="flex items-center rounded-md border border-gray-200 bg-white">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 text-gray-500 hover:text-gray-900 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-medium text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 text-gray-500 hover:text-gray-900 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-[11px] text-gray-400">
                          {formatPrice(item.price)} each
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Drawer Footer */}
          <div className="border-t border-gray-100 pt-4 mt-auto bg-white">
            <div className="space-y-1.5 mb-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">
                  {formatPrice(totals.subtotal)}
                </span>
              </div>
              <p className="text-xs text-gray-500">
                Shipping, taxes, and coupon discounts calculated at checkout.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Link href="/cart" onClick={closeCartDrawer} className="w-full">
                <Button variant="outline" className="w-full">
                  View Cart
                </Button>
              </Link>
              <Link href="/checkout" onClick={closeCartDrawer} className="w-full">
                <Button variant="primary" className="w-full group">
                  Checkout
                  <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
}
