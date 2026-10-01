import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AccountSidebar } from "@/components/account/AccountSidebar";
import { getCustomer } from "@/lib/woocommerce/customers";
import { getCustomerOrders } from "@/lib/woocommerce/orders";
import { formatPrice } from "@/lib/utils";
import {
  ShoppingBag,
  MapPin,
  User,
  Heart,
  PackageCheck,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "My Account Dashboard",
  description: "Manage your WooCommerce orders, shipping addresses, and account details.",
};

export const revalidate = 0;

export default async function MyAccountPage() {
  const customer = await getCustomer(1);
  const orders = await getCustomerOrders(1);

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      <Breadcrumbs items={[{ label: "My Account", href: "/my-account" }]} />

      <Container className="pt-8">
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 mb-8">
          My Account
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <AccountSidebar />
          </div>

          {/* Main Dashboard Content */}
          <div className="lg:col-span-9 space-y-8">
            {/* Welcome banner */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
              <h2 className="text-lg font-bold text-gray-900">
                Hello, {customer?.first_name || "Alex"} {customer?.last_name || "Morgan"}!
              </h2>
              <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.
              </p>
            </div>

            {/* Quick Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                href="/my-account/orders"
                className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 hover:border-red-300 hover:shadow-md transition-all group"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 font-medium">Total Orders</span>
                  <p className="text-lg font-bold text-gray-900">{orders.length}</p>
                </div>
              </Link>

              <Link
                href="/my-account/addresses"
                className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 hover:border-red-300 hover:shadow-md transition-all group"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 font-medium">Addresses</span>
                  <p className="text-lg font-bold text-gray-900">2 Saved</p>
                </div>
              </Link>

              <Link
                href="/wishlist"
                className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 hover:border-red-300 hover:shadow-md transition-all group"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                  <Heart className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 font-medium">Wishlist</span>
                  <p className="text-lg font-bold text-gray-900">Saved Items</p>
                </div>
              </Link>
            </div>

            {/* Recent Orders Overview */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="text-base font-bold text-gray-900">Recent Orders</h3>
                <Link
                  href="/my-account/orders"
                  className="text-xs font-semibold text-red-600 hover:underline flex items-center gap-1"
                >
                  <span>View All</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              {orders.length === 0 ? (
                <p className="text-xs text-gray-500 py-4">No recent orders found.</p>
              ) : (
                <div className="divide-y divide-gray-100">
                  {orders.slice(0, 3).map((order) => (
                    <div
                      key={order.id}
                      className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <p className="font-bold text-gray-900">
                          Order #{order.number}
                        </p>
                        <p className="text-gray-400">
                          {new Date(order.date_created).toLocaleDateString()} • {order.line_items.length} items
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-bold text-red-600">
                          {formatPrice(order.total)}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 border border-emerald-200">
                          <PackageCheck className="h-3 w-3" />
                          {order.status}
                        </span>
                        <Link
                          href={`/my-account/orders/${order.id}`}
                          className="rounded-lg border border-gray-300 px-3 py-1.5 font-semibold text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
