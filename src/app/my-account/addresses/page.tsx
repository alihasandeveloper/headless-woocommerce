import React from "react";
import { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AccountSidebar } from "@/components/account/AccountSidebar";
import { getCustomer } from "@/lib/woocommerce/customers";
import { Button } from "@/components/ui/Button";
import { MapPin, Edit3 } from "lucide-react";

export const metadata: Metadata = {
  title: "My Addresses",
  description: "Manage your default billing and shipping addresses.",
};

export const revalidate = 0;

export default async function AddressesPage() {
  const customer = await getCustomer(1);

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      <Breadcrumbs
        items={[
          { label: "My Account", href: "/my-account" },
          { label: "Addresses", href: "/my-account/addresses" },
        ]}
      />

      <Container className="pt-8">
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 mb-8">
          Saved Addresses
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-3">
            <AccountSidebar />
          </div>

          <div className="lg:col-span-9 space-y-6">
            <p className="text-xs text-gray-500">
              The following addresses will be used on the checkout page by default.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Billing Address Card */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-red-600" />
                      <span>Billing Address</span>
                    </h3>
                  </div>

                  <div className="text-xs text-gray-600 space-y-1">
                    <p className="font-bold text-gray-900">
                      {customer?.billing.first_name} {customer?.billing.last_name}
                    </p>
                    <p>{customer?.billing.address_1}</p>
                    <p>
                      {customer?.billing.city}, {customer?.billing.state}{" "}
                      {customer?.billing.postcode}
                    </p>
                    <p>{customer?.billing.country}</p>
                    <p className="pt-1">Phone: {customer?.billing.phone}</p>
                    <p>Email: {customer?.billing.email}</p>
                  </div>
                </div>

                <div className="pt-6">
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    <Edit3 className="h-3.5 w-3.5 mr-1.5" />
                    Edit Billing Address
                  </Button>
                </div>
              </div>

              {/* Shipping Address Card */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-red-600" />
                      <span>Shipping Address</span>
                    </h3>
                  </div>

                  <div className="text-xs text-gray-600 space-y-1">
                    <p className="font-bold text-gray-900">
                      {customer?.shipping.first_name} {customer?.shipping.last_name}
                    </p>
                    <p>{customer?.shipping.address_1}</p>
                    <p>
                      {customer?.shipping.city}, {customer?.shipping.state}{" "}
                      {customer?.shipping.postcode}
                    </p>
                    <p>{customer?.shipping.country}</p>
                  </div>
                </div>

                <div className="pt-6">
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    <Edit3 className="h-3.5 w-3.5 mr-1.5" />
                    Edit Shipping Address
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
