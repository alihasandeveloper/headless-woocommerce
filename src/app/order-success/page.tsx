import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { getOrderById } from "@/lib/woocommerce/orders";
import { formatPrice } from "@/lib/utils";
import {
  CheckCircle2,
  PackageCheck,
  Truck,
  ArrowRight,
  Printer,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "Thank you for your order! Your WooCommerce order has been received.",
};

interface OrderSuccessPageProps {
  searchParams: Promise<{
    order_id?: string;
  }>;
}

export default async function OrderSuccessPage({
  searchParams,
}: OrderSuccessPageProps) {
  const resolvedParams = await searchParams;
  const orderId = resolvedParams.order_id || "10842";
  const order = await getOrderById(orderId);

  return (
    <div className="min-h-screen bg-gray-50/50 py-12">
      <Container size="md">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-10 shadow-sm space-y-8">
          {/* Header confirmation */}
          <div className="text-center space-y-3 pb-8 border-b border-gray-100">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-sm">
              <CheckCircle2 className="h-10 w-10 stroke-[2.5]" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Order Confirmed & Received
            </span>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900">
              Thank You For Your Order!
            </h1>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              We've sent a detailed confirmation email and invoice to{" "}
              <strong className="text-gray-900">{order?.billing.email || "your email"}</strong>.
            </p>
          </div>

          {/* Key Order Info Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 text-xs">
            <div>
              <span className="text-gray-400 block font-medium">Order Number</span>
              <span className="font-bold text-gray-900 text-sm">
                #{order?.number || orderId}
              </span>
            </div>
            <div>
              <span className="text-gray-400 block font-medium">Date</span>
              <span className="font-bold text-gray-900 text-sm">
                {new Date(order?.date_created || Date.now()).toLocaleDateString()}
              </span>
            </div>
            <div>
              <span className="text-gray-400 block font-medium">Status</span>
              <span className="inline-flex items-center gap-1 font-bold text-emerald-600 uppercase text-[11px]">
                <PackageCheck className="h-3.5 w-3.5" />
                {order?.status || "Processing"}
              </span>
            </div>
            <div>
              <span className="text-gray-400 block font-medium">Total Paid</span>
              <span className="font-bold text-red-600 text-sm">
                {formatPrice(order?.total || "0.00")}
              </span>
            </div>
          </div>

          {/* Ordered Line Items */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
              Ordered Items
            </h3>
            <div className="divide-y divide-gray-100 border rounded-xl p-4 border-gray-200 text-xs">
              {order?.line_items.map((item) => (
                <div key={item.id} className="py-2.5 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-gray-900">{item.name}</p>
                    <p className="text-gray-400">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {formatPrice(parseFloat(item.total))}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping & Billing Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-gray-100 text-xs">
            <div className="space-y-1 rounded-xl bg-gray-50 p-4 border border-gray-100">
              <h4 className="font-bold text-gray-900 uppercase tracking-wider mb-2">
                Shipping Address
              </h4>
              <p className="font-semibold text-gray-800">
                {order?.shipping.first_name} {order?.shipping.last_name}
              </p>
              <p className="text-gray-600">{order?.shipping.address_1}</p>
              <p className="text-gray-600">
                {order?.shipping.city}, {order?.shipping.state} {order?.shipping.postcode}
              </p>
              <p className="text-gray-600">{order?.shipping.country}</p>
            </div>

            <div className="space-y-1 rounded-xl bg-gray-50 p-4 border border-gray-100">
              <h4 className="font-bold text-gray-900 uppercase tracking-wider mb-2">
                Payment Info
              </h4>
              <p className="text-gray-600">
                Method:{" "}
                <strong className="text-gray-900">
                  {order?.payment_method_title || "Credit Card"}
                </strong>
              </p>
              <p className="text-gray-600">
                Status: <strong className="text-emerald-600">Paid & Verified</strong>
              </p>
              <p className="text-gray-600 mt-2">
                Estimated Delivery: <strong className="text-gray-900">2-4 Business Days</strong>
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-gray-100">
            <Link href="/shop" className="w-full sm:w-auto">
              <Button size="lg" variant="primary" className="w-full sm:w-auto font-bold">
                <span>Continue Shopping</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/my-account/orders" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto font-medium">
                View in My Account
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
