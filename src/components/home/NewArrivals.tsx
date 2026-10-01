import React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Product } from "@/types/product";
import { ArrowRight, Sparkles } from "lucide-react";

interface NewArrivalsProps {
  products: Product[];
}

export function NewArrivals({ products }: NewArrivalsProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50/70 border-t border-gray-100">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-600 mb-1">
              <Sparkles className="h-4 w-4" />
              <span>Fresh Releases</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900">
              New Arrivals
            </h2>
          </div>
          <Link
            href="/shop?orderby=date"
            className="group flex items-center text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
          >
            <span>Explore All New</span>
            <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <ProductGrid products={products.slice(0, 4)} columns={4} />
      </Container>
    </section>
  );
}
