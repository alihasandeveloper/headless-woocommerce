"use client";

import React from "react";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { EmptyState } from "@/components/ui/EmptyState";
import { useCart } from "@/hooks/useCart";
import { ShoppingBag } from "lucide-react";

export default function CheckoutPage() {
  const { items } = useCart();

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      <Breadcrumbs
        items={[
          { label: "Cart", href: "/cart" },
          { label: "Checkout", href: "/checkout" },
        ]}
      />

      <Container className="pt-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900">
            Secure Checkout
          </h1>
          <p className="mt-1 text-xs text-gray-500">
            Please enter your billing and shipping information to complete your order.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-8">
            <EmptyState
              icon={ShoppingBag}
              title="Your cart is empty"
              description="You cannot proceed to checkout without any items in your cart."
              actionText="Return to Shop"
              actionHref="/shop"
            />
          </div>
        ) : (
          <CheckoutForm />
        )}
      </Container>
    </div>
  );
}
