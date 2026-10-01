"use client";

import React from "react";
import { CreditCard, Banknote, Landmark, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaymentMethodsProps {
  selectedMethod: string;
  onSelectMethod: (method: string) => void;
}

export function PaymentMethods({
  selectedMethod,
  onSelectMethod,
}: PaymentMethodsProps) {
  const methods = [
    {
      id: "credit_card",
      title: "Credit / Debit Card",
      description: "Pay securely with Visa, MasterCard, Amex, or Discover via encrypted gateway.",
      icon: CreditCard,
    },
    {
      id: "cod",
      title: "Cash on Delivery (COD)",
      description: "Pay with cash directly to the courier upon product delivery.",
      icon: Banknote,
    },
    {
      id: "bacs",
      title: "Direct Bank Transfer (BACS)",
      description: "Make your payment directly into our bank account using your Order ID.",
      icon: Landmark,
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
        <span>Payment Method</span>
        <ShieldCheck className="h-4 w-4 text-emerald-600" />
      </h3>

      <div className="space-y-3">
        {methods.map((method) => {
          const Icon = method.icon;
          const isSelected = selectedMethod === method.id;

          return (
            <label
              key={method.id}
              onClick={() => onSelectMethod(method.id)}
              className={cn(
                "flex flex-col p-4 rounded-xl border cursor-pointer transition-all",
                isSelected
                  ? "border-red-600 bg-red-50/40 ring-1 ring-red-600"
                  : "border-gray-200 bg-white hover:border-gray-300"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment_method"
                    checked={isSelected}
                    onChange={() => onSelectMethod(method.id)}
                    className="accent-red-600 h-4 w-4"
                  />
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-red-600" />
                    <span className="text-sm font-bold text-gray-900">
                      {method.title}
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-2 text-xs text-gray-500 pl-7 leading-relaxed">
                {method.description}
              </p>

              {/* Conditional Card Mock Fields */}
              {isSelected && method.id === "credit_card" && (
                <div className="mt-4 pt-3 border-t border-gray-200/80 pl-7 grid grid-cols-2 gap-3 animate-in fade-in duration-200">
                  <div className="col-span-2">
                    <input
                      type="text"
                      placeholder="Card Number (4111 2222 3333 4444)"
                      className="w-full h-10 rounded-lg border border-gray-300 bg-white px-3 text-xs focus:border-red-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="MM / YY"
                      className="w-full h-10 rounded-lg border border-gray-300 bg-white px-3 text-xs focus:border-red-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="CVC"
                      className="w-full h-10 rounded-lg border border-gray-300 bg-white px-3 text-xs focus:border-red-600 focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </label>
          );
        })}
      </div>
    </div>
  );
}
