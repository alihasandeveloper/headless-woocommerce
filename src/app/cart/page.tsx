"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/hooks/useCart";
import { ShoppingBag, ArrowLeft, Trash2 } from "lucide-react";

export default function CartPage() {
  const { items, itemCount, clearCart } = useCart();

  return (
    <div className="min-h-screen bg-white pb-20">
      <Breadcrumbs items={[{ label: "Cart", href: "/cart" }]} />

      <Container className="pt-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-100 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900">
              Shopping Cart
            </h1>
            <p className="mt-1 text-xs text-gray-500 font-medium">
              You have {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-red-600 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Clear Cart</span>
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="py-12">
            <EmptyState
              icon={ShoppingBag}
              title="Your shopping cart is empty"
              description="Looks like you haven't added anything to your cart yet. Explore our curated catalog to find something you'll love."
              actionText="Continue Shopping"
              actionHref="/shop"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-8 items-start">
            {/* Items List */}
            <div className="lg:col-span-8">
              <div className="hidden sm:grid grid-cols-12 pb-3 border-b border-gray-200 text-xs font-bold uppercase tracking-wider text-gray-400">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-right">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Subtotal</div>
              </div>

              <div className="divide-y divide-gray-100">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 text-xs font-bold text-gray-700 hover:text-red-600 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-4 sticky top-6">
              <CartSummary showCheckoutButton={true} />
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
