import React from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

interface RelatedProductsProps {
  products: Product[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (!products || products.length === 0) return null;

  return (
    <div className="pt-8">
      {/* Header with Title and View All Button */}
      <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-100">
        <h2 className="text-base sm:text-lg font-black text-gray-900">
          রিলেটেড প্রোডাক্টস
        </h2>
        <Link
          href="/shop"
          className="rounded-full border border-red-600 px-3.5 py-1 text-xs font-bold text-red-600 transition-colors hover:bg-red-50"
        >
          সকলগুলো দেখুন
        </Link>
      </div>

      {/* 4-column product grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} buttonType="buy_now" />
        ))}
      </div>
    </div>
  );
}
