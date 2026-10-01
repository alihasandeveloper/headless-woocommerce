import { Customer } from "@/types/customer";
import { isWooConfigured, wooFetch } from "./client";

export async function getCustomer(id: number): Promise<Customer | null> {
  if (!isWooConfigured()) {
    return null;
  }

  try {
    const { data } = await wooFetch<Customer>(`customers/${id}`);
    return data;
  } catch (error) {
    console.error(`Failed to get customer ${id}:`, error);
    return null;
  }
}

export async function updateCustomer(
  id: number,
  customerData: Partial<Customer>
): Promise<Customer | null> {
  if (!isWooConfigured()) {
    return null;
  }

  try {
    const { data } = await wooFetch<Customer>(`customers/${id}`, {
      method: "PUT",
      body: customerData,
    });
    return data;
  } catch (error) {
    console.error(`Failed to update customer ${id}:`, error);
    return null;
  }
}
