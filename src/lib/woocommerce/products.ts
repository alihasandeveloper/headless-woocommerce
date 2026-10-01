import { Product, ProductQueryFilters, ProductVariation } from "@/types/product";
import { isWooConfigured, wooFetch } from "./client";

export async function getProducts(
  params: ProductQueryFilters = {}
): Promise<{ products: Product[]; total: number; totalPages: number }> {
  if (!isWooConfigured()) {
    return { products: [], total: 0, totalPages: 0 };
  }

  try {
    const queryParams: Record<string, any> = {
      page: params.page || 1,
      per_page: params.per_page || 12,
      status: params.status || "publish",
    };

    if (params.search) queryParams.search = params.search;
    if (params.category) queryParams.category = params.category;
    if (params.tag) queryParams.tag = params.tag;
    if (params.featured !== undefined) queryParams.featured = params.featured;
    if (params.on_sale !== undefined) queryParams.on_sale = params.on_sale;
    if (params.min_price) queryParams.min_price = params.min_price;
    if (params.max_price) queryParams.max_price = params.max_price;
    if (params.orderby) queryParams.orderby = params.orderby;
    if (params.order) queryParams.order = params.order;
    if (params.stock_status) queryParams.stock_status = params.stock_status;
    if (params.slug) queryParams.slug = params.slug;

    const { data, total, totalPages } = await wooFetch<Product[]>("products", {
      params: queryParams,
      revalidate: 60,
    });

    return {
      products: data || [],
      total: total || (data ? data.length : 0),
      totalPages: totalPages || 1,
    };
  } catch (error) {
    console.error("Failed to fetch products from WooCommerce:", error);
    return {
      products: [],
      total: 0,
      totalPages: 0,
    };
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!isWooConfigured()) {
    return null;
  }

  try {
    const { data } = await wooFetch<Product[]>("products", {
      params: { slug, status: "publish" },
      revalidate: 60,
    });
    return data && data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error(`Failed to fetch product with slug ${slug}:`, error);
    return null;
  }
}

export async function getProductById(id: number): Promise<Product | null> {
  if (!isWooConfigured()) {
    return null;
  }

  try {
    const { data } = await wooFetch<Product>(`products/${id}`, {
      revalidate: 60,
    });
    return data || null;
  } catch (error) {
    console.error(`Failed to fetch product by id ${id}:`, error);
    return null;
  }
}

export async function getProductVariations(productId: number): Promise<ProductVariation[]> {
  if (!isWooConfigured()) {
    return [];
  }

  try {
    const { data } = await wooFetch<ProductVariation[]>(`products/${productId}/variations`, {
      revalidate: 60,
    });
    return data || [];
  } catch (error) {
    console.error(`Failed to fetch variations for product ${productId}:`, error);
    return [];
  }
}

export async function getFeaturedProducts(limit: number = 8): Promise<Product[]> {
  const { products } = await getProducts({ featured: true, per_page: limit });
  return products;
}

export async function getBestSellingProducts(limit: number = 8): Promise<Product[]> {
  const { products } = await getProducts({ orderby: "popularity", order: "desc", per_page: limit });
  return products;
}

export async function getSaleProducts(limit: number = 8): Promise<Product[]> {
  const { products } = await getProducts({ on_sale: true, per_page: limit });
  return products;
}

export async function getNewArrivals(limit: number = 8): Promise<Product[]> {
  const { products } = await getProducts({ orderby: "date", order: "desc", per_page: limit });
  return products;
}

export async function getRelatedProducts(product: Product, limit: number = 4): Promise<Product[]> {
  if (product.related_ids && product.related_ids.length > 0) {
    try {
      const { data } = await wooFetch<Product[]>("products", {
        params: { include: product.related_ids.join(","), per_page: limit },
        revalidate: 60,
      });
      return data || [];
    } catch {
      // fallback by category
    }
  }

  // Fallback by category
  const categoryId = product.categories[0]?.id;
  if (categoryId) {
    const { products } = await getProducts({
      category: String(categoryId),
      per_page: limit + 1,
    });
    return products.filter((p) => p.id !== product.id).slice(0, limit);
  }

  return [];
}
