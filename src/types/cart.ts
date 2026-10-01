import { WooCommerceImage } from "./category";

export interface CartItem {
  id: string; // unique cart item key (e.g. `${productId}-${variationId || 0}`)
  productId: number;
  variationId?: number;
  name: string;
  slug: string;
  sku?: string;
  price: number; // numeric unit price
  regularPrice?: number;
  image: WooCommerceImage | null;
  quantity: number;
  attributes?: Record<string, string>; // e.g. { "Size": "L", "Color": "Red" }
  stockQuantity?: number | null;
  stockStatus?: "instock" | "outofstock" | "onbackorder";
}

export interface CartTotals {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
}

export interface AppliedCoupon {
  code: string;
  discountAmount: number;
  discountType: "percent" | "fixed_cart" | "fixed_product";
}

export interface CartState {
  items: CartItem[];
  coupon: AppliedCoupon | null;
  shippingMethodId: string;
}
