"use client";

import React from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (qty: number) => void;
  max?: number | null;
  min?: number;
  className?: string;
}

export function QuantitySelector({
  quantity,
  onQuantityChange,
  max = 99,
  min = 1,
  className,
}: QuantitySelectorProps) {
  const handleDecrement = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (max === null || quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
    <div
      className={cn(
        "flex h-11 items-center rounded-lg border border-gray-300 bg-white shadow-2xs",
        className
      )}
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={quantity <= min}
        className="flex h-full w-10 items-center justify-center text-gray-500 hover:text-gray-900 disabled:opacity-40 transition-colors"
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4" />
      </button>

      <span className="w-12 text-center text-sm font-bold text-gray-900 select-none">
        {quantity}
      </span>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={max !== null && quantity >= max}
        className="flex h-full w-10 items-center justify-center text-gray-500 hover:text-gray-900 disabled:opacity-40 transition-colors"
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
