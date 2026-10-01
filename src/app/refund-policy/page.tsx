import React from "react";
import { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Refund & Return Policy",
  description: "30-day money-back guarantee terms and return authorization details.",
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-white pb-20">
      <Breadcrumbs items={[{ label: "Refund Policy", href: "/refund-policy" }]} />

      <Container size="md" className="pt-12">
        <h1 className="text-3xl font-black tracking-tight text-gray-900 mb-8">
          Refund & Return Policy
        </h1>

        <div className="prose prose-gray max-w-none text-sm leading-relaxed space-y-6 text-gray-600">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-gray-900">30-Day Guarantee</h2>
            <p>
              We want you to be completely satisfied with your purchase. If you are not delighted with your gear, you may return it within 30 days of the delivery date for a full refund back to your original payment method.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-gray-900">Return Eligibility</h2>
            <p>
              To be eligible for a return, your item must be in new, unused condition, and in the original packaging with all documentation and accessories intact.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-gray-900">How to Initiate a Return</h2>
            <p>
              Contact our support team at support@woostore.example.com with your order number to obtain a prepaid return shipping label and RMA instructions.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
