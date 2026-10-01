import { Address } from "./customer";
import { WooCommerceImage } from "./category";

export interface OrderLineItem {
  id: number;
  name: string;
  product_id: number;
  variation_id: number;
  quantity: number;
  tax_class: string;
  subtotal: string;
  subtotal_tax: string;
  total: string;
  total_tax: string;
  taxes: any[];
  meta_data: {
    id: number;
    key: string;
    value: string;
  }[];
  sku: string;
  price: number;
  image?: WooCommerceImage;
}

export interface ShippingLine {
  id: number;
  method_title: string;
  method_id: string;
  instance_id: string;
  total: string;
  total_tax: string;
  taxes: any[];
  meta_data: any[];
}

export interface Order {
  id: number;
  parent_id: number;
  number: string;
  order_key: string;
  created_via: string;
  version: string;
  status: "pending" | "processing" | "on-hold" | "completed" | "cancelled" | "refunded" | "failed" | "trash";
  currency: string;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  discount_total: string;
  discount_tax: string;
  shipping_total: string;
  shipping_tax: string;
  cart_tax: string;
  total: string;
  total_tax: string;
  prices_include_tax: boolean;
  customer_id: number;
  customer_ip_address: string;
  customer_user_agent: string;
  customer_note: string;
  billing: Address;
  shipping: Address;
  payment_method: string;
  payment_method_title: string;
  transaction_id: string;
  date_paid: string | null;
  date_paid_gmt: string | null;
  date_completed: string | null;
  date_completed_gmt: string | null;
  cart_hash: string;
  meta_data: {
    id: number;
    key: string;
    value: any;
  }[];
  line_items: OrderLineItem[];
  shipping_lines: ShippingLine[];
  fee_lines: any[];
  coupon_lines: any[];
  refunds: any[];
  payment_url?: string;
  is_paid?: boolean;
}

export interface CreateOrderPayload {
  payment_method: string;
  payment_method_title: string;
  set_paid?: boolean;
  billing: Address;
  shipping: Address;
  line_items: {
    product_id: number;
    variation_id?: number;
    quantity: number;
  }[];
  shipping_lines?: {
    method_id: string;
    method_title: string;
    total: string;
  }[];
  coupon_lines?: {
    code: string;
  }[];
  customer_note?: string;
  customer_id?: number;
}
