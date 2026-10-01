import React from "react";
import { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how we collect, protect, and handle your private data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white pb-20">
      <Breadcrumbs items={[{ label: "Privacy Policy", href: "/privacy-policy" }]} />

      <Container size="md" className="pt-12">
        <h1 className="text-3xl font-black tracking-tight text-gray-900 mb-8">
          Privacy Policy
        </h1>

        <div className="prose prose-gray max-w-none text-sm leading-relaxed space-y-6 text-gray-600">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-gray-900">Information We Collect</h2>
            <p>
              When you visit the site or purchase products, we collect certain information about your device, your interaction with the site, and information necessary to process your purchases.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-gray-900">How We Use Your Personal Information</h2>
            <p>
              We use your personal Information to provide our services to you, which includes: offering products for sale, processing payments, shipping and fulfillment of your order, and keeping you up to date on new products, services, and offers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-gray-900">Security & Encryption</h2>
            <p>
              We maintain reasonable technical and organizational measures to protect personal data against unauthorized access, destruction, loss, alteration, or disclosure.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
