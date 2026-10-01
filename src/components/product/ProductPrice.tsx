import React from "react";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ProductPriceProps {
  price: string | number;
  regularPrice?: string | number;
  salePrice?: string | number;
  onSale?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function ProductPrice({
  price,
  regularPrice,
  salePrice,
  onSale,
  className,
  size = "md",
}: ProductPriceProps) {
  const current = salePrice || price;
  const original = regularPrice || price;
  const isDiscounted = onSale && regularPrice && parseFloat(String(regularPrice)) > parseFloat(String(current));

  const sizeClasses = {
    sm: "text-xs sm:text-sm",
    md: "text-sm sm:text-base",
    lg: "text-lg sm:text-xl",
    xl: "text-2xl sm:text-3xl",
  };

  const originalSizeClasses = {
    sm: "text-[11px]",
    md: "text-xs",
    lg: "text-sm",
    xl: "text-base",
  };

  return (
    <div className={cn("flex items-baseline gap-2", className)}>
      {isDiscounted && (
        <del className={cn("text-gray-400 font-normal line-through", originalSizeClasses[size])}>
          {formatPrice(original)}
        </del>
      )}
      <span className={cn("font-bold text-emerald-600 tracking-tight", sizeClasses[size])}>
        {formatPrice(current)}
      </span>
    </div>
  );
}
