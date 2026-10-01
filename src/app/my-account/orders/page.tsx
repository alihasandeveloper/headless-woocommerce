import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AccountSidebar } from "@/components/account/AccountSidebar";
import { getCustomerOrders } from "@/lib/woocommerce/orders";
import { formatPrice } from "@/lib/utils";
import { PackageCheck, ShoppingBag } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata: Metadata = {
  title: "My Orders",
  description: "View your past and present WooCommerce orders.",
};

export const revalidate = 0;

export default async function OrdersPage() {
  const orders = await getCustomerOrders(1);

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      <Breadcrumbs
        items={[
          { label: "My Account", href: "/my-account" },
          { label: "Orders", href: "/my-account/orders" },
        ]}
      />

      <Container className="pt-8">
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 mb-8">
          Order History
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-3">
            <AccountSidebar />
          </div>

          <div className="lg:col-span-9">
            {orders.length === 0 ? (
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <EmptyState
                  icon={ShoppingBag}
                  title="No orders found"
                  description="You haven't placed any orders yet. Once you complete checkout, your order details will appear here."
                  actionText="Explore Products"
                  actionHref="/shop"
                />
              </div>
            ) : (
              <div className="rounded-2xl border border-gray-200 bg-white shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-wider font-bold">
                      <tr>
                        <th className="px-6 py-4">Order</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Total</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50/70 transition-colors">
                          <td className="px-6 py-4 font-bold text-gray-900">
                            #{order.number}
                          </td>
                          <td className="px-6 py-4 text-gray-500">
                            {new Date(order.date_created).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 border border-emerald-200 uppercase">
                              <PackageCheck className="h-3 w-3" />
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-bold text-red-600">
                            {formatPrice(order.total)}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Link
                              href={`/my-account/orders/${order.id}`}
                              className="rounded-lg border border-gray-300 px-3 py-1.5 font-semibold text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
                            >
                              View Details
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
