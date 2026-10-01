import React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ProductCategory } from "@/types/category";
import {
  Lightbulb,
  Watch,
  Mic,
  Camera,
  Headphones,
  Smartphone,
  Layers,
} from "lucide-react";

const CATEGORY_ICON_MAP: Record<string, any> = {
  lighting: Lightbulb,
  "smart-watch": Watch,
  microphone: Mic,
  "tripods-stand": Camera,
  earbuds: Headphones,
  accessories: Smartphone,
};

interface CategoryIconGridProps {
  categories?: ProductCategory[];
}

export function CategoryIconGrid({ categories = [] }: CategoryIconGridProps) {
  if (!categories || categories.length === 0) return null;

  return (
    <section className="py-6 bg-white">
      <Container>
        {/* Section Pill Header */}
        <div className="flex items-center mb-5">
          <div className="inline-block rounded-md bg-red-600 px-3 py-1 text-xs font-bold text-white uppercase tracking-wider">
            MAIN CATEGORIES
          </div>
        </div>

        {/* Dynamic Category icon boxes */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
          {categories.slice(0, 6).map((cat) => {
            const Icon = CATEGORY_ICON_MAP[cat.slug.toLowerCase()] || Layers;

            return (
              <Link
                key={cat.id}
                href={`/product-category/${cat.slug}`}
                className="group flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-gray-50/70 p-4 text-center transition-all duration-200 hover:bg-white hover:border-red-200 hover:shadow-md"
              >
                <div className="mb-2.5 flex h-10 w-10 items-center justify-center text-gray-700 group-hover:text-red-600 transition-colors">
                  <Icon className="h-6 w-6 stroke-[1.75]" />
                </div>
                <span className="text-xs font-bold text-gray-800 group-hover:text-red-600 transition-colors">
                  {cat.name}
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
