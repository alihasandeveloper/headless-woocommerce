import { CreateOrderPayload, Order } from "@/types/order";
import { isWooConfigured, wooFetch } from "./client";

export async function createOrder(payload: CreateOrderPayload): Promise<Order> {
  if (!isWooConfigured()) {
    throw new Error("WooCommerce API is not configured. Please add WC_STORE_URL, WC_CONSUMER_KEY, and WC_CONSUMER_SECRET in .env.local.");
  }

  const { data } = await wooFetch<Order>("orders", {
    method: "POST",
    body: payload,
  });

  return data;
}

export async function getOrderById(orderId: number | string): Promise<Order | null> {
  if (!isWooConfigured()) {
    return null;
  }

  try {
    const { data } = await wooFetch<Order>(`orders/${orderId}`);
    return data;
  } catch (error) {
    console.error(`Failed to fetch order ${orderId}:`, error);
    return null;
  }
}

export async function getCustomerOrders(customerId: number): Promise<Order[]> {
  if (!isWooConfigured()) {
    return [];
  }

  try {
    const { data } = await wooFetch<Order[]>("orders", {
      params: { customer: customerId, per_page: 20 },
    });
    return data || [];
  } catch (error) {
    console.error(`Failed to fetch orders for customer ${customerId}:`, error);
    return [];
  }
}
