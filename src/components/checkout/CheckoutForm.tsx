"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { BillingForm } from "./BillingForm";
import { PaymentMethods } from "./PaymentMethods";
import { OrderSummary } from "./OrderSummary";
import { Address } from "@/types/customer";
import { CreateOrderPayload } from "@/types/order";
import { createOrder } from "@/lib/woocommerce/orders";

export function CheckoutForm() {
  const router = useRouter();
  const { items, totals, coupon, shippingMethodId, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [billingData, setBillingData] = useState<Address>({
    first_name: "Alex",
    last_name: "Morgan",
    company: "",
    address_1: "742 Evergreen Terrace",
    address_2: "",
    city: "Springfield",
    state: "OR",
    postcode: "97477",
    country: "US",
    email: "alex.morgan@example.com",
    phone: "+1 (555) 0144",
  });

  const [shipToDifferentAddress, setShipToDifferentAddress] = useState(false);
  const [shippingData, setShippingData] = useState<Address>({
    first_name: "",
    last_name: "",
    company: "",
    address_1: "",
    address_2: "",
    city: "",
    state: "",
    postcode: "",
    country: "US",
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("credit_card");
  const [orderNotes, setOrderNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleBillingChange = (field: keyof Address, value: string) => {
    setBillingData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleShippingChange = (field: keyof Address, value: string) => {
    setShippingData((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!billingData.first_name.trim()) errs.first_name = "First name is required";
    if (!billingData.last_name.trim()) errs.last_name = "Last name is required";
    if (!billingData.email?.trim() || !billingData.email.includes("@")) errs.email = "Valid email is required";
    if (!billingData.phone?.trim()) errs.phone = "Phone number is required";
    if (!billingData.address_1.trim()) errs.address_1 = "Address is required";
    if (!billingData.city.trim()) errs.city = "City is required";
    if (!billingData.state.trim()) errs.state = "State is required";
    if (!billingData.postcode.trim()) errs.postcode = "Postal code is required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (items.length === 0) {
      setErrorMessage("Your cart is empty.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const finalShippingAddress = shipToDifferentAddress ? shippingData : billingData;

      const orderPayload: CreateOrderPayload = {
        payment_method: selectedPaymentMethod,
        payment_method_title:
          selectedPaymentMethod === "credit_card"
            ? "Credit Card"
            : selectedPaymentMethod === "cod"
            ? "Cash on Delivery"
            : "Direct Bank Transfer",
        set_paid: selectedPaymentMethod === "credit_card",
        billing: billingData,
        shipping: finalShippingAddress,
        line_items: items.map((item) => ({
          product_id: item.productId,
          variation_id: item.variationId || 0,
          quantity: item.quantity,
        })),
        shipping_lines: [
          {
            method_id: shippingMethodId,
            method_title: "Standard Ground Delivery",
            total: String(totals.shipping),
          },
        ],
        coupon_lines: coupon ? [{ code: coupon.code }] : [],
        customer_note: orderNotes,
      };

      const createdOrder = await createOrder(orderPayload);

      // Clear cart
      clearCart();

      // Navigate to order success page
      router.push(`/order-success?order_id=${createdOrder.id}`);
    } catch (err: any) {
      console.error("Failed to place order:", err);
      setErrorMessage(
        err?.message || "Failed to process your order with WooCommerce. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmitOrder}>
      {errorMessage && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Billing, Shipping, Payment */}
        <div className="lg:col-span-7 space-y-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
            <BillingForm
              formData={billingData}
              onChange={handleBillingChange}
              errors={errors}
            />
          </div>

          {/* Ship to different address toggle */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={shipToDifferentAddress}
                onChange={(e) => setShipToDifferentAddress(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500 accent-red-600"
              />
              <span className="text-sm font-bold text-gray-900">
                Ship to a different address?
              </span>
            </label>

            {shipToDifferentAddress && (
              <div className="pt-4 border-t border-gray-100 animate-in fade-in duration-200">
                <BillingForm
                  formData={shippingData}
                  onChange={handleShippingChange}
                  errors={{}}
                />
              </div>
            )}
          </div>

          {/* Order Notes */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs space-y-2">
            <label className="block text-xs font-semibold text-gray-700">
              Order Notes (Optional)
            </label>
            <textarea
              rows={3}
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
              placeholder="Notes about your order, e.g. special delivery instructions."
              className="w-full rounded-lg border border-gray-300 p-3 text-xs text-gray-900 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
            />
          </div>

          {/* Payment Methods */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
            <PaymentMethods
              selectedMethod={selectedPaymentMethod}
              onSelectMethod={setSelectedPaymentMethod}
            />
          </div>
        </div>

        {/* Right Column: Order Summary & Place Order */}
        <div className="lg:col-span-5 sticky top-8">
          <OrderSummary isLoading={isLoading} />
        </div>
      </div>
    </form>
  );
}
