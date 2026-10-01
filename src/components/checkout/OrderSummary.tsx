"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Lock, ShieldCheck } from "lucide-react";

interface OrderSummaryProps {
  isLoading?: boolean;
}

export function OrderSummary({ isLoading = false }: OrderSummaryProps) {
  const { items, totals, coupon } = useCart();

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-6">
      <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">
        Your Order ({items.length} {items.length === 1 ? "Item" : "Items"})
      </h3>

      {/* Cart Items Miniature list */}
      <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto pr-1">
        {items.map((item) => (
          <div key={item.id} className="py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative h-14 w-14 shrink-0 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                {item.image ? (
                  <Image
                    src={item.image.src}
                    alt={item.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-[10px] text-gray-400">
                    No img
                  </div>
                )}
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-[10px] font-bold text-white">
                  {item.quantity}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-gray-900 truncate">
                  {item.name}
                </p>
                {item.attributes && (
                  <p className="text-[11px] text-gray-400">
                    {Object.values(item.attributes).join(", ")}
                  </p>
                )}
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="text-xs font-bold text-gray-900">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Totals Breakdown */}
      <div className="space-y-2 border-t border-gray-100 pt-4 text-xs text-gray-600">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-semibold text-gray-900">
            {formatPrice(totals.subtotal)}
          </span>
        </div>

        {coupon && (
          <div className="flex justify-between text-emerald-600 font-semibold">
            <span>Coupon ({coupon.code})</span>
            <span>-{formatPrice(totals.discount)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="font-semibold text-gray-900">
            {totals.shipping === 0 ? "FREE" : formatPrice(totals.shipping)}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Tax (8%)</span>
          <span className="font-semibold text-gray-900">{formatPrice(totals.tax)}</span>
        </div>

        <div className="flex justify-between border-t border-gray-200 pt-3 text-base font-bold text-gray-900">
          <span>Order Total</span>
          <span className="text-red-600 text-lg">{formatPrice(totals.total)}</span>
        </div>
      </div>

      {/* Place Order CTA */}
      <Button
        type="submit"
        size="lg"
        variant="primary"
        isLoading={isLoading}
        className="w-full font-bold h-12 shadow-lg shadow-red-600/30"
      >
        <Lock className="mr-2 h-4 w-4" />
        Place Order & Pay {formatPrice(totals.total)}
      </Button>

      <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
        <ShieldCheck className="h-4 w-4 text-emerald-600" />
        <span>WooCommerce Encrypted & Guaranteed</span>
      </div>
    </div>
  );
}
