import React from "react";
import { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description: "Learn about our shipping rates, delivery estimates, and international transit times.",
};

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-white pb-20">
      <Breadcrumbs items={[{ label: "Shipping Policy", href: "/shipping-policy" }]} />

      <Container size="md" className="pt-12">
        <h1 className="text-3xl font-black tracking-tight text-gray-900 mb-8">
          Shipping Policy
        </h1>

        <div className="prose prose-gray max-w-none text-sm leading-relaxed space-y-6 text-gray-600">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-gray-900">Order Processing</h2>
            <p>
              All orders placed before 2:00 PM EST Monday through Friday are processed and dispatched on the same business day. Orders placed on weekends or holidays will be processed on the following business day.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-gray-900">Domestic Shipping Rates & Estimates</h2>
            <p>
              Standard Ground Shipping (3-5 business days) is flat-rate $9.99 for orders under $150. All orders over $150 qualify for <strong>Complimentary Free Delivery</strong>.
            </p>
            <p>
              Express Priority Courier (1-2 business days) is available at checkout for $19.99.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-gray-900">Shipment Tracking</h2>
            <p>
              You will receive a shipment confirmation email containing your tracking number once your order has left our distribution warehouse.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
