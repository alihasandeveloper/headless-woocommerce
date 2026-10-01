import React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ProductCard } from "@/components/product/ProductCard";
import { Product } from "@/types/product";

interface CategoryProductSectionProps {
  title: string;
  slug?: string;
  products: Product[];
  viewAllHref?: string;
}

export function CategoryProductSection({
  title,
  slug,
  products,
  viewAllHref,
}: CategoryProductSectionProps) {
  if (!products || products.length === 0) return null;

  const targetHref = viewAllHref || (slug ? `/product-category/${slug}` : "/shop");

  return (
    <section className="py-6 bg-white">
      <Container>
        {/* Category Header Label */}
        <div className="flex items-center mb-4">
          <div className="inline-block rounded-md bg-red-600 px-3 py-1 text-xs font-bold text-white uppercase tracking-wider">
            {title}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {products.slice(0, 5).map((product) => (
            <ProductCard key={product.id} product={product} buttonType="buy_now" />
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-end mt-4">
          <Link
            href={targetHref}
            className="rounded-full bg-black px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-gray-800"
          >
            সকলগুলো দেখুন
          </Link>
        </div>
      </Container>
    </section>
  );
}
