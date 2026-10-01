import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { siteConfig } from "@/config/site";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  amount: number | string | undefined | null,
  options: {
    currency?: string;
    showDecimals?: boolean;
  } = {}
) {
  if (amount === undefined || amount === null || amount === "") {
    return `${siteConfig.currency.symbol}0`;
  }

  const numeric = typeof amount === "string" ? parseFloat(amount) : amount;
  if (isNaN(numeric)) {
    return `${siteConfig.currency.symbol}0`;
  }

  const hasDecimals = options.showDecimals ?? (numeric % 1 !== 0);

  return `${siteConfig.currency.symbol}${numeric.toLocaleString("en-US", {
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: hasDecimals ? 2 : 0,
  })}`;
}

export function calculateDiscountPercentage(
  regularPrice: number | string,
  salePrice: number | string
): number {
  const reg = typeof regularPrice === "string" ? parseFloat(regularPrice) : regularPrice;
  const sale = typeof salePrice === "string" ? parseFloat(salePrice) : salePrice;

  if (!reg || !sale || reg <= sale) return 0;
  return Math.round(((reg - sale) / reg) * 100);
}

export function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, "").trim();
}

export function truncateText(text: string, maxLength: number = 100): string {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}
