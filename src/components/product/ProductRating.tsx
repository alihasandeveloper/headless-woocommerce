import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductRatingProps {
  rating: string | number;
  count?: number;
  className?: string;
  showCount?: boolean;
  size?: "sm" | "md";
}

export function ProductRating({
  rating,
  count,
  className,
  showCount = true,
  size = "sm",
}: ProductRatingProps) {
  const numericRating = typeof rating === "string" ? parseFloat(rating) || 0 : rating || 0;
  const rounded = Math.round(numericRating);

  const starSizes = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
  };

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center text-amber-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              starSizes[size],
              star <= rounded
                ? "fill-amber-400 text-amber-400"
                : "text-gray-200 fill-gray-100"
            )}
          />
        ))}
      </div>
      {showCount && count !== undefined && count > 0 && (
        <span className="text-xs text-gray-500 font-medium">
          ({count})
        </span>
      )}
    </div>
  );
}
