import { ProductCategory } from "@/types/category";
import { isWooConfigured, wooFetch } from "./client";

export async function getCategories(
  params: {
    per_page?: number;
    parent?: number;
    hide_empty?: boolean;
    orderby?: string;
  } = {}
): Promise<ProductCategory[]> {
  if (!isWooConfigured()) {
    return [];
  }

  try {
    const { data } = await wooFetch<ProductCategory[]>("products/categories", {
      params: {
        per_page: params.per_page || 50,
        parent: params.parent,
        hide_empty: params.hide_empty ?? false,
        orderby: params.orderby || "count",
      },
      revalidate: 300,
    });
    return data || [];
  } catch (error) {
    console.error("Failed to fetch categories from WooCommerce:", error);
    return [];
  }
}

export async function getCategoryBySlug(slug: string): Promise<ProductCategory | null> {
  if (!isWooConfigured()) {
    return null;
  }

  try {
    const { data } = await wooFetch<ProductCategory[]>("products/categories", {
      params: { slug },
      revalidate: 300,
    });
    return data && data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error(`Failed to fetch category with slug ${slug}:`, error);
    return null;
  }
}
