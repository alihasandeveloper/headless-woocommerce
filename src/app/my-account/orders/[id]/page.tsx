import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AccountSidebar } from "@/components/account/AccountSidebar";
import { getOrderById } from "@/lib/woocommerce/orders";
import { formatPrice } from "@/lib/utils";
import { ArrowLeft, PackageCheck, Truck } from "lucide-react";

interface OrderDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: OrderDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  return {
    title: `Order #${resolvedParams.id}`,
    description: `Order details and tracking for WooCommerce order #${resolvedParams.id}`,
  };
}

export const revalidate = 0;

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const resolvedParams = await params;
  const order = await getOrderById(resolvedParams.id);

  if (!order) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      <Breadcrumbs
        items={[
          { label: "My Account", href: "/my-account" },
          { label: "Orders", href: "/my-account/orders" },
          { label: `Order #${order.number}`, href: `/my-account/orders/${order.id}` },
        ]}
      />

      <Container className="pt-8">
        <div className="flex items-center gap-3 mb-8">
          <Link
            href="/my-account/orders"
            className="p-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900">
            Order #{order.number} Details
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-3">
            <AccountSidebar />
          </div>

          <div className="lg:col-span-9 space-y-6">
            {/* Status overview */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs text-gray-400 font-medium">Order Placed On</p>
                <p className="text-sm font-bold text-gray-900">
                  {new Date(order.date_created).toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 font-medium">Status:</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200 uppercase">
                  <PackageCheck className="h-4 w-4" />
                  {order.status}
                </span>
              </div>
            </div>

            {/* Line items table */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                Order Items
              </h3>

              <div className="divide-y divide-gray-100 text-xs">
                {order.line_items.map((item) => (
                  <div
                    key={item.id}
                    className="py-3 flex items-center justify-between gap-4"
                  >
                    <div>
                      <p className="font-bold text-gray-900">{item.name}</p>
                      <p className="text-gray-400">
                        {formatPrice(item.price)} × {item.quantity}
                      </p>
                    </div>
                    <span className="font-bold text-gray-900">
                      {formatPrice(parseFloat(item.total))}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-2 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="font-semibold text-gray-900">
                    {formatPrice(order.shipping_total)} ({order.shipping_lines[0]?.method_title || "Standard"})
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-gray-900 border-t border-gray-100 pt-2">
                  <span>Grand Total:</span>
                  <span className="text-red-600">{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>

            {/* Addresses */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs text-xs space-y-1.5">
                <h4 className="font-bold text-gray-900 uppercase tracking-wider mb-2">
                  Billing Address
                </h4>
                <p className="font-bold text-gray-900">
                  {order.billing.first_name} {order.billing.last_name}
                </p>
                <p className="text-gray-600">{order.billing.address_1}</p>
                <p className="text-gray-600">
                  {order.billing.city}, {order.billing.state} {order.billing.postcode}
                </p>
                <p className="text-gray-600">{order.billing.country}</p>
                <p className="text-gray-600">Email: {order.billing.email}</p>
                <p className="text-gray-600">Phone: {order.billing.phone}</p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs text-xs space-y-1.5">
                <h4 className="font-bold text-gray-900 uppercase tracking-wider mb-2">
                  Shipping Address
                </h4>
                <p className="font-bold text-gray-900">
                  {order.shipping.first_name} {order.shipping.last_name}
                </p>
                <p className="text-gray-600">{order.shipping.address_1}</p>
                <p className="text-gray-600">
                  {order.shipping.city}, {order.shipping.state} {order.shipping.postcode}
                </p>
                <p className="text-gray-600">{order.shipping.country}</p>
                <p className="text-gray-600 pt-2">
                  Payment Method:{" "}
                  <strong className="text-gray-900">
                    {order.payment_method_title}
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
