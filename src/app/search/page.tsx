import React from "react";
import { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SortDropdown } from "@/components/shop/SortDropdown";
import { Pagination } from "@/components/shop/Pagination";
import { EmptyState } from "@/components/ui/EmptyState";
import { getProducts } from "@/lib/woocommerce/products";
import { Search as SearchIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Search Results",
  description: "Search across our complete catalog of products.",
};

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    page?: string;
    orderby?: "date" | "id" | "include" | "title" | "slug" | "price" | "popularity" | "rating";
    order?: "asc" | "desc";
  }>;
}

export const revalidate = 60;

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";
  const page = resolvedParams.page ? parseInt(resolvedParams.page, 10) : 1;
  const orderby = resolvedParams.orderby || "id";
  const order = resolvedParams.order || "desc";

  const { products, total, totalPages } = await getProducts({
    search: query,
    page,
    per_page: 12,
    orderby,
    order,
  });

  return (
    <div className="min-h-screen bg-white pb-20">
      <Breadcrumbs
        items={[
          { label: "Shop", href: "/shop" },
          { label: query ? `Search: "${query}"` : "Search", href: "/search" },
        ]}
      />

      <Container className="pt-8">
        {/* Search Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-100 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-600 mb-1">
              <SearchIcon className="h-4 w-4" />
              <span>Search Results</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900">
              {query ? `Results for "${query}"` : "All Products"}
            </h1>
            <p className="mt-1 text-xs text-gray-500 font-medium">
              Found {total} {total === 1 ? "product" : "products"}
            </p>
          </div>

          <SortDropdown />
        </div>

        {/* Results Body */}
        <div className="pt-8">
          {products.length === 0 ? (
            <EmptyState
              icon={SearchIcon}
              title="No products found"
              description={`We couldn't find any items matching "${query}". Try checking for spelling errors or searching for broader terms.`}
              actionText="Browse All Products"
              actionHref="/shop"
            />
          ) : (
            <div>
              <ProductGrid products={products} columns={4} />
              <Pagination currentPage={page} totalPages={totalPages} />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
