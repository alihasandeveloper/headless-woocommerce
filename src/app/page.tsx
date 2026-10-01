import React from "react";
import { HomePromoBanner } from "@/components/home/HomePromoBanner";
import { CategoryIconGrid } from "@/components/home/CategoryIconGrid";
import { CategoryProductSection } from "@/components/home/CategoryProductSection";
import { getProducts, getBestSellingProducts } from "@/lib/woocommerce/products";
import { getCategories } from "@/lib/woocommerce/categories";

export const revalidate = 60;

export default async function HomePage() {
  const [
    categories,
    bestSellers,
    { products: allProducts },
  ] = await Promise.all([
    getCategories(),
    getBestSellingProducts(5),
    getProducts({ per_page: 20 }),
  ]);

  return (
    <div className="flex flex-col bg-white pb-12">
      {/* 1. Top Promo Banner */}
      <HomePromoBanner />

      {/* 2. Main Categories Icon Grid */}
      <CategoryIconGrid categories={categories} />

      {/* 3. Best Selling Products */}
      <CategoryProductSection
        title="Best Selling Products"
        products={bestSellers.length > 0 ? bestSellers : allProducts.slice(0, 5)}
        viewAllHref="/shop?orderby=popularity"
      />

      {/* 4. Dynamic Category Sections */}
      {categories.slice(0, 4).map((cat) => {
        const categoryProducts = allProducts.filter((p) =>
          p.categories.some((c) => c.id === cat.id || c.slug === cat.slug)
        );

        if (categoryProducts.length === 0) return null;

        return (
          <CategoryProductSection
            key={cat.id}
            title={cat.name}
            slug={cat.slug}
            products={categoryProducts.slice(0, 5)}
          />
        );
      })}
    </div>
  );
}
