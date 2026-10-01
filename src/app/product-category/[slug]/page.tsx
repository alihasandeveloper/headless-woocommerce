import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Pagination } from "@/components/shop/Pagination";
import { EmptyState } from "@/components/ui/EmptyState";
import { getCategoryBySlug } from "@/lib/woocommerce/categories";
import { getProducts } from "@/lib/woocommerce/products";
import { ProductQueryFilters } from "@/types/product";
import { siteConfig } from "@/config/site";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    page?: string;
    orderby?: "date" | "id" | "include" | "title" | "slug" | "price" | "popularity" | "rating";
    order?: "asc" | "desc";
  }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const category = await getCategoryBySlug(resolvedParams.slug);

  if (!category) {
    return { title: "Category Not Found" };
  }

  return {
    title: `${category.name} - ${siteConfig.name}`,
    description: category.description || `Browse our latest ${category.name} products.`,
  };
}

export const revalidate = 60;

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const resolvedParams = await params;
  const resolvedQuery = await searchParams;

  const category = await getCategoryBySlug(resolvedParams.slug);
  if (!category) {
    notFound();
  }

  const page = resolvedQuery.page ? parseInt(resolvedQuery.page, 10) : 1;
  const orderby = resolvedQuery.orderby || "id";
  const order = resolvedQuery.order || "desc";

  const queryFilters: ProductQueryFilters = {
    page,
    per_page: 12,
    category: category.slug,
    orderby,
    order,
  };

  const { products, total, totalPages } = await getProducts(queryFilters);

  return (
    <div className="min-h-screen bg-white py-8 pb-20">
      <Container>
        {/* Category Heading matching Shokher Gadget */}
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-gray-900">
            {category.name}
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            {total} {total === 1 ? "product" : "products"} found
          </p>
        </div>

        {/* Product Grid */}
        <main>
          {products.length === 0 ? (
            <EmptyState
              title={`No products in "${category.name}"`}
              description="We currently don't have any items in this category."
              actionText="View All Products"
              actionHref="/shop"
            />
          ) : (
            <div>
              <ProductGrid products={products} columns={4} />
              <Pagination currentPage={page} totalPages={totalPages} />
            </div>
          )}
        </main>
      </Container>
    </div>
  );
}
