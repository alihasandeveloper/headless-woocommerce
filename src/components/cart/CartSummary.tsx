"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { SHIPPING_METHODS } from "@/lib/woocommerce/cart";
import { ArrowRight, Tag, Check, X, ShieldCheck } from "lucide-react";

interface CartSummaryProps {
  showCheckoutButton?: boolean;
}

export function CartSummary({ showCheckoutButton = true }: CartSummaryProps) {
  const {
    totals,
    coupon,
    shippingMethodId,
    setShippingMethodId,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [couponMessage, setCouponMessage] = useState<{
    text: string;
    isError: boolean;
  } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    const res = applyCoupon(couponInput.trim());
    setCouponMessage({
      text: res.message,
      isError: !res.success,
    });

    if (res.success) {
      setCouponInput("");
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50/70 p-6 space-y-6">
      <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-4">
        Order Summary
      </h3>

      {/* Coupon Code Input */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
          <Tag className="h-3.5 w-3.5 text-red-600" />
          <span>Promo Code</span>
        </label>

        {coupon ? (
          <div className="flex items-center justify-between rounded-lg bg-emerald-50 border border-emerald-200 p-2.5 text-xs text-emerald-800">
            <div>
              <span className="font-bold">{coupon.code}</span>
              <span className="ml-1.5">({coupon.discountAmount}% OFF)</span>
            </div>
            <button
              onClick={removeCoupon}
              className="text-emerald-700 hover:text-emerald-900 font-semibold flex items-center gap-0.5"
            >
              <X className="h-3.5 w-3.5" /> Remove
            </button>
          </div>
        ) : (
          <form onSubmit={handleApplyCoupon} className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. WELCOME20"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              className="flex-1 h-10 rounded-lg border border-gray-300 bg-white px-3 text-xs uppercase font-medium focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
            />
            <Button type="submit" size="sm" variant="dark" className="h-10 px-4 text-xs">
              Apply
            </Button>
          </form>
        )}

        {couponMessage && (
          <p
            className={`text-xs ${
              couponMessage.isError ? "text-red-600" : "text-emerald-600"
            }`}
          >
            {couponMessage.text}
          </p>
        )}
      </div>

      {/* Shipping Method Options */}
      <div className="space-y-2.5 border-t border-gray-200 pt-4">
        <label className="text-xs font-semibold uppercase tracking-wider text-gray-700">
          Shipping Option
        </label>
        <div className="space-y-2">
          {SHIPPING_METHODS.map((method) => {
            const isSelected = shippingMethodId === method.id;
            const isFree = method.id === "free_shipping";
            const isEligible = isFree ? totals.subtotal >= 150 : true;

            if (isFree && !isEligible) return null;

            return (
              <label
                key={method.id}
                className={`flex items-center justify-between p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                  isSelected
                    ? "border-red-600 bg-red-50 text-red-950 font-medium"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="shipping"
                    checked={isSelected}
                    onChange={() => setShippingMethodId(method.id)}
                    className="accent-red-600"
                  />
                  <span>{method.title}</span>
                </div>
                <span className="font-bold">
                  {method.cost === 0 ? "FREE" : formatPrice(method.cost)}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Calculations Breakdown */}
      <div className="space-y-2.5 border-t border-gray-200 pt-4 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-semibold text-gray-900">
            {formatPrice(totals.subtotal)}
          </span>
        </div>

        {totals.discount > 0 && (
          <div className="flex justify-between text-emerald-600 font-medium">
            <span>Coupon Discount</span>
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
          <span>Estimated Sales Tax (8%)</span>
          <span className="font-semibold text-gray-900">
            {formatPrice(totals.tax)}
          </span>
        </div>

        <div className="flex justify-between border-t border-gray-200 pt-3 text-base sm:text-lg font-bold text-gray-900">
          <span>Total</span>
          <span className="text-red-600">{formatPrice(totals.total)}</span>
        </div>
      </div>

      {/* Checkout CTA */}
      {showCheckoutButton && (
        <Link href="/checkout" className="block w-full">
          <Button size="lg" variant="primary" className="w-full font-bold h-12 group shadow-md shadow-red-600/30">
            <span>Proceed to Checkout</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      )}

      {/* Trust & Guarantee */}
      <div className="flex items-center justify-center gap-2 text-xs text-gray-400 text-center">
        <ShieldCheck className="h-4 w-4 text-emerald-600" />
        <span>256-Bit SSL Encrypted & Secure Checkout</span>
      </div>
    </div>
  );
}
