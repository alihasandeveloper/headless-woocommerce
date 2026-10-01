import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ProductCategory } from "@/types/category";
import { ArrowRight } from "lucide-react";

interface FeaturedCategoriesProps {
  categories: ProductCategory[];
}

export function FeaturedCategories({ categories }: FeaturedCategoriesProps) {
  const displayCategories = categories.slice(0, 5);

  return (
    <section className="py-16 bg-gray-50/70 border-b border-gray-100">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-red-600">
              Curated Collections
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 mt-1">
              Popular Categories
            </h2>
          </div>
          <Link
            href="/shop"
            className="group flex items-center text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
          >
            <span>Browse All Categories</span>
            <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {displayCategories.map((category) => (
            <Link
              key={category.id}
              href={`/product-category/${category.slug}`}
              className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 text-center transition-all duration-300 hover:border-red-300 hover:shadow-xl hover:shadow-red-500/5"
            >
              <div className="relative h-28 w-28 sm:h-32 sm:w-32 overflow-hidden rounded-full bg-gray-100 mb-4 transition-transform duration-300 group-hover:scale-105 shadow-inner">
                {category.image ? (
                  <Image
                    src={category.image.src}
                    alt={category.name}
                    fill
                    sizes="(max-width: 640px) 120px, 150px"
                    className="object-cover object-center"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center font-bold text-gray-400 text-sm">
                    {category.name.charAt(0)}
                  </div>
                )}
              </div>

              <h3 className="text-sm font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                {category.name}
              </h3>
              <p className="mt-1 text-xs text-gray-400 font-medium">
                {category.count} {category.count === 1 ? "Product" : "Products"}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
