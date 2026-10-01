import React from "react";
import { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ShopFilters } from "@/components/shop/ShopFilters";
import { FilterDrawer } from "@/components/shop/FilterDrawer";
import { SortDropdown } from "@/components/shop/SortDropdown";
import { Pagination } from "@/components/shop/Pagination";
import { EmptyState } from "@/components/ui/EmptyState";
import { getProducts } from "@/lib/woocommerce/products";
import { getCategories } from "@/lib/woocommerce/categories";
import { ProductQueryFilters } from "@/types/product";

export const metadata: Metadata = {
  title: "Shop All Products",
  description: "Browse our complete catalog of premium electronics, footwear, apparel, and lifestyle accessories.",
};

interface ShopPageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
    min_price?: string;
    max_price?: string;
    on_sale?: string;
    stock_status?: "instock" | "outofstock" | "onbackorder";
    orderby?: "date" | "id" | "include" | "title" | "slug" | "price" | "popularity" | "rating";
    order?: "asc" | "desc";
    search?: string;
  }>;
}

export const revalidate = 60;

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const resolvedParams = await searchParams;

  const page = resolvedParams.page ? parseInt(resolvedParams.page, 10) : 1;
  const category = resolvedParams.category;
  const min_price = resolvedParams.min_price;
  const max_price = resolvedParams.max_price;
  const on_sale = resolvedParams.on_sale === "true";
  const stock_status = resolvedParams.stock_status;
  const orderby = resolvedParams.orderby || "id";
  const order = resolvedParams.order || "desc";
  const search = resolvedParams.search;

  const queryFilters: ProductQueryFilters = {
    page,
    per_page: 12,
    category,
    min_price,
    max_price,
    on_sale: on_sale ? true : undefined,
    stock_status,
    orderby,
    order,
    search,
  };

  const [categories, { products, total, totalPages }] = await Promise.all([
    getCategories(),
    getProducts(queryFilters),
  ]);

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "Shop", href: "/shop" }]} />

      <Container className="pt-8">
        {/* Page Title & Count Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-100 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900">
              Shop Products
            </h1>
            <p className="mt-1 text-xs text-gray-500 font-medium">
              Showing {(page - 1) * 12 + 1} - {Math.min(page * 12, total)} of {total} results
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Drawer */}
            <FilterDrawer categories={categories} />
            {/* Sort Dropdown */}
            <SortDropdown />
          </div>
        </div>

        {/* 2-Column Layout: Sidebar Filters + Main Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-start">
          {/* Desktop Left Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs">
              <ShopFilters categories={categories} />
            </div>
          </aside>

          {/* Right Product Grid */}
          <main className="lg:col-span-9">
            {products.length === 0 ? (
              <EmptyState
                title="No products found"
                description="We couldn't find any products matching your selected criteria. Try adjusting your filters or search keywords."
                actionText="Clear All Filters"
                actionHref="/shop"
              />
            ) : (
              <div>
                <ProductGrid products={products} columns={3} />
                <Pagination currentPage={page} totalPages={totalPages} />
              </div>
            )}
          </main>
        </div>
      </Container>
    </div>
  );
}
