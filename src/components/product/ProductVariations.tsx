"use client";

import React from "react";
import { ProductAttribute, ProductVariation } from "@/types/product";
import { cn } from "@/lib/utils";

interface ProductVariationsProps {
  attributes: ProductAttribute[];
  variations: ProductVariation[];
  selectedAttributes: Record<string, string>;
  onAttributeChange: (name: string, value: string) => void;
}

export function ProductVariations({
  attributes,
  variations,
  selectedAttributes,
  onAttributeChange,
}: ProductVariationsProps) {
  if (!attributes || attributes.length === 0) return null;

  return (
    <div className="space-y-4 py-4 border-y border-gray-100">
      {attributes.map((attr) => {
        const selectedValue = selectedAttributes[attr.name] || "";

        return (
          <div key={attr.id || attr.name} className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-gray-900 uppercase tracking-wider">
                {attr.name}:
              </span>
              {selectedValue && (
                <span className="font-medium text-red-600">{selectedValue}</span>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {attr.options.map((option) => {
                const isSelected = selectedValue === option;

                // Check if this option is valid across variations
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => onAttributeChange(attr.name, option)}
                    className={cn(
                      "min-w-[44px] h-10 px-3.5 rounded-lg text-xs font-semibold border transition-all duration-200",
                      isSelected
                        ? "border-red-600 bg-red-50 text-red-600 shadow-sm ring-1 ring-red-600"
                        : "border-gray-300 bg-white text-gray-800 hover:border-gray-400 hover:bg-gray-50"
                    )}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
