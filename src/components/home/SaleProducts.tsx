import React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Product } from "@/types/product";
import { ArrowRight, Tag } from "lucide-react";

interface SaleProductsProps {
  products: Product[];
}

export function SaleProducts({ products }: SaleProductsProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-600 mb-1">
              <Tag className="h-4 w-4" />
              <span>Great Discounts</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900">
              On Sale Now
            </h2>
          </div>
          <Link
            href="/shop?on_sale=true"
            className="group flex items-center text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
          >
            <span>View All Sale Deals</span>
            <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <ProductGrid products={products.slice(0, 4)} columns={4} />
      </Container>
    </section>
  );
}
