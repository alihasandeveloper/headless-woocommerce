import React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Product } from "@/types/product";
import { ArrowRight, Flame } from "lucide-react";

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-600 mb-1">
              <Flame className="h-4 w-4 fill-red-600" />
              <span>Handpicked For You</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900">
              Featured Products
            </h2>
          </div>
          <Link
            href="/shop?featured=true"
            className="group flex items-center text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
          >
            <span>View All Featured</span>
            <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <ProductGrid products={products.slice(0, 4)} columns={4} />
      </Container>
    </section>
  );
}
