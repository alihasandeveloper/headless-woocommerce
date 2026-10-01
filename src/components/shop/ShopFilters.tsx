"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ProductCategory } from "@/types/category";
import { Button } from "@/components/ui/Button";
import { Star, RotateCcw, Filter, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShopFiltersProps {
  categories: ProductCategory[];
  className?: string;
  onFilterApplied?: () => void;
}

export function ShopFilters({
  categories,
  className,
  onFilterApplied,
}: ShopFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category") || "";
  const currentMinPrice = searchParams.get("min_price") || "";
  const currentMaxPrice = searchParams.get("max_price") || "";
  const currentOnSale = searchParams.get("on_sale") === "true";
  const currentRating = searchParams.get("rating") || "";
  const currentInStock = searchParams.get("stock_status") === "instock";

  const [minPrice, setMinPrice] = useState(currentMinPrice);
  const [maxPrice, setMaxPrice] = useState(currentMaxPrice);

  const updateFilters = (newParams: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    // Reset page to 1 when filters change
    params.delete("page");

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    const targetUrl = pathname.includes("/product-category/")
      ? pathname
      : "/shop";

    router.push(`${targetUrl}?${params.toString()}`);
    if (onFilterApplied) onFilterApplied();
  };

  const handlePriceApply = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({
      min_price: minPrice || null,
      max_price: maxPrice || null,
    });
  };

  const handleResetFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    router.push("/shop");
    if (onFilterApplied) onFilterApplied();
  };

  const hasActiveFilters = Boolean(
    currentCategory ||
      currentMinPrice ||
      currentMaxPrice ||
      currentOnSale ||
      currentRating ||
      currentInStock
  );

  return (
    <div className={cn("space-y-6 text-sm", className)}>
      {/* Active filters header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <h3 className="font-bold text-gray-900 flex items-center gap-2">
          <Filter className="h-4 w-4 text-red-600" />
          <span>Filters</span>
        </h3>
        {hasActiveFilters && (
          <button
            onClick={handleResetFilters}
            className="flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700 transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset All</span>
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="space-y-3 pb-6 border-b border-gray-100">
        <h4 className="font-semibold text-gray-900 text-xs uppercase tracking-wider">
          Categories
        </h4>
        <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
          <button
            onClick={() => updateFilters({ category: null })}
            className={cn(
              "flex w-full items-center justify-between py-1.5 px-2 rounded-md text-left transition-colors",
              !currentCategory
                ? "bg-red-50 text-red-600 font-semibold"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            )}
          >
            <span>All Categories</span>
          </button>
          {categories.map((cat) => {
            const isSelected = currentCategory.toLowerCase() === cat.slug.toLowerCase();
            return (
              <button
                key={cat.id}
                onClick={() => updateFilters({ category: cat.slug })}
                className={cn(
                  "flex w-full items-center justify-between py-1.5 px-2 rounded-md text-left transition-colors",
                  isSelected
                    ? "bg-red-50 text-red-600 font-semibold"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                <span className="truncate">{cat.name}</span>
                <span className="text-xs text-gray-400 font-mono">({cat.count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-3 pb-6 border-b border-gray-100">
        <h4 className="font-semibold text-gray-900 text-xs uppercase tracking-wider">
          Price Range ($)
        </h4>
        <form onSubmit={handlePriceApply} className="space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full h-9 rounded-lg border border-gray-300 bg-white px-3 text-xs text-gray-900 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
            />
            <span className="text-gray-400">-</span>
            <input
              type="number"
              min="0"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full h-9 rounded-lg border border-gray-300 bg-white px-3 text-xs text-gray-900 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
            />
          </div>
          <Button type="submit" size="sm" variant="outlineRed" className="w-full h-8 text-xs">
            Apply Price
          </Button>
        </form>
      </div>

      {/* Special Deals & Stock Filter */}
      <div className="space-y-3 pb-6 border-b border-gray-100">
        <h4 className="font-semibold text-gray-900 text-xs uppercase tracking-wider">
          Special Offers & Stock
        </h4>
        <div className="space-y-2.5">
          <label className="flex items-center gap-2.5 cursor-pointer text-gray-700 hover:text-gray-900">
            <input
              type="checkbox"
              checked={currentOnSale}
              onChange={(e) =>
                updateFilters({ on_sale: e.target.checked ? "true" : null })
              }
              className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500 accent-red-600"
            />
            <span className="text-xs font-medium">On Sale Only</span>
          </label>

          <label className="flex items-center gap-2.5 cursor-pointer text-gray-700 hover:text-gray-900">
            <input
              type="checkbox"
              checked={currentInStock}
              onChange={(e) =>
                updateFilters({
                  stock_status: e.target.checked ? "instock" : null,
                })
              }
              className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500 accent-red-600"
            />
            <span className="text-xs font-medium">In Stock Only</span>
          </label>
        </div>
      </div>

      {/* Customer Rating Filter */}
      <div className="space-y-3 pb-6">
        <h4 className="font-semibold text-gray-900 text-xs uppercase tracking-wider">
          Customer Rating
        </h4>
        <div className="space-y-1.5">
          {[5, 4, 3].map((rating) => {
            const isSelected = currentRating === String(rating);
            return (
              <button
                key={rating}
                onClick={() =>
                  updateFilters({ rating: isSelected ? null : String(rating) })
                }
                className={cn(
                  "flex w-full items-center gap-2 py-1.5 px-2 rounded-md text-left transition-colors",
                  isSelected
                    ? "bg-red-50 text-red-600 font-semibold"
                    : "text-gray-600 hover:bg-gray-50"
                )}
              >
                <div className="flex text-amber-400">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs text-gray-500">& Up</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
