import React from "react";
import { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms of service and legal conditions for using our store.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white pb-20">
      <Breadcrumbs items={[{ label: "Terms & Conditions", href: "/terms-and-conditions" }]} />

      <Container size="md" className="pt-12">
        <h1 className="text-3xl font-black tracking-tight text-gray-900 mb-8">
          Terms & Conditions
        </h1>

        <div className="prose prose-gray max-w-none text-sm leading-relaxed space-y-6 text-gray-600">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-gray-900">1. Acceptance of Terms</h2>
            <p>
              By accessing and placing an order on our store, you confirm that you are in agreement with and bound by the terms of service contained in the Terms & Conditions outlined below.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-gray-900">2. Products & Pricing</h2>
            <p>
              Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-gray-900">3. Accuracy of Billing and Account Information</h2>
            <p>
              We reserve the right to refuse any order you place with us. You agree to provide current, complete, and accurate purchase and account information for all purchases made at our store.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
