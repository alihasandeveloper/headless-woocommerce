import { AppliedCoupon, CartItem, CartTotals } from "@/types/cart";

export const SHIPPING_METHODS = [
  { id: "free_shipping", title: "Free Standard Delivery (Orders over $150)", cost: 0, minAmount: 150 },
  { id: "flat_rate", title: "Standard Ground Shipping (3-5 days)", cost: 9.99 },
  { id: "express", title: "Express Priority Courier (1-2 days)", cost: 19.99 },
];

export const VALID_COUPONS: Record<string, { discountPercent: number; code: string }> = {
  SAVE10: { discountPercent: 10, code: "SAVE10" },
  WELCOME20: { discountPercent: 20, code: "WELCOME20" },
  WOO50: { discountPercent: 50, code: "WOO50" },
};

export function calculateCartTotals(
  items: CartItem[],
  coupon: AppliedCoupon | null = null,
  shippingMethodId: string = "flat_rate"
): CartTotals {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  let discount = 0;
  if (coupon) {
    if (coupon.discountType === "percent") {
      discount = (subtotal * coupon.discountAmount) / 100;
    } else {
      discount = coupon.discountAmount;
    }
  }

  // Determine shipping cost
  let shippingCost = 9.99;
  if (subtotal >= 150) {
    shippingCost = 0; // free shipping auto threshold
  } else {
    const selectedMethod = SHIPPING_METHODS.find((m) => m.id === shippingMethodId);
    if (selectedMethod) {
      shippingCost = selectedMethod.cost;
    }
  }

  if (items.length === 0) {
    shippingCost = 0;
    discount = 0;
  }

  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = taxableAmount * 0.08; // 8% estimated sales tax
  const total = Math.max(0, taxableAmount + shippingCost + tax);

  return {
    subtotal: Number(subtotal.toFixed(2)),
    discount: Number(discount.toFixed(2)),
    shipping: Number(shippingCost.toFixed(2)),
    tax: Number(tax.toFixed(2)),
    total: Number(total.toFixed(2)),
  };
}
