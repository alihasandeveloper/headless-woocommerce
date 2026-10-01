const WC_STORE_URL = process.env.WC_STORE_URL || process.env.NEXT_PUBLIC_WORDPRESS_URL || "";
const WC_CONSUMER_KEY = process.env.WC_CONSUMER_KEY || "";
const WC_CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET || "";

export function isWooConfigured(): boolean {
  return Boolean(WC_STORE_URL && WC_CONSUMER_KEY && WC_CONSUMER_SECRET);
}

export async function wooFetch<T>(
  endpoint: string,
  options: {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: any;
    params?: Record<string, string | number | boolean | undefined>;
    revalidate?: number | false;
    tags?: string[];
  } = {}
): Promise<{ data: T; total?: number; totalPages?: number }> {
  if (!isWooConfigured()) {
    throw new Error("WooCommerce API credentials are not configured in environment variables.");
  }

  const cleanStoreUrl = WC_STORE_URL.replace(/\/$/, "");
  const cleanEndpoint = endpoint.replace(/^\//, "");
  const url = new URL(`${cleanStoreUrl}/wp-json/wc/v3/${cleanEndpoint}`);

  if (options.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.append(key, String(value));
      }
    });
  }

  const authHeader = `Basic ${Buffer.from(
    `${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`
  ).toString("base64")}`;

  const fetchOptions: RequestInit = {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader,
      "User-Agent": "Next.js Headless WooCommerce Frontend",
    },
    ...(options.body ? { body: JSON.stringify(options.body) } : {}),
    ...(options.revalidate !== undefined || options.tags
      ? {
          next: {
            revalidate: options.revalidate !== undefined ? options.revalidate : 60,
            tags: options.tags,
          },
        }
      : { cache: "no-store" }),
  };

  const response = await fetch(url.toString(), fetchOptions);

  if (!response.ok) {
    const errorText = await response.text();
    let errorJson;
    try {
      errorJson = JSON.parse(errorText);
    } catch {
      // not JSON
    }
    const errorMessage = errorJson?.message || `WooCommerce API error (${response.status}): ${response.statusText}`;
    console.error(`[WooCommerce Fetch Error] ${endpoint}:`, errorMessage);
    throw new Error(errorMessage);
  }

  const total = parseInt(response.headers.get("x-wp-total") || "0", 10);
  const totalPages = parseInt(response.headers.get("x-wp-totalpages") || "0", 10);
  const data = (await response.json()) as T;

  return { data, total, totalPages };
}
