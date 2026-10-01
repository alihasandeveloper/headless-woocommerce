"use client";

import React, { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "How long will my order take to arrive?",
    a: "Standard delivery typically takes 3-5 business days within the continental US. Express priority courier arrives in 1-2 business days. Tracking details are automatically emailed upon dispatch.",
  },
  {
    q: "How do I qualify for Free Shipping?",
    a: "All orders with a subtotal exceeding $150 automatically qualify for Free Standard Delivery at checkout.",
  },
  {
    q: "What is your return and refund policy?",
    a: "We offer a 30-day hassle-free money back guarantee. Products must be in original condition with all accessories and packaging included.",
  },
  {
    q: "Are the headphones covered by warranty?",
    a: "Yes, all audio gear and electronics come standard with a 1-Year Limited Manufacturer Warranty covering any defects in materials or craftsmanship.",
  },
  {
    q: "How does the Headless WooCommerce architecture work?",
    a: "Our frontend is rendered using Next.js Server Components and communicates with our WordPress WooCommerce backend via high-speed REST APIs, ensuring near-instant page loads and top-tier security.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-white pb-20">
      <Breadcrumbs items={[{ label: "FAQ", href: "/faq" }]} />

      <Container size="md" className="pt-12">
        <div className="text-center space-y-3 mb-12">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <HelpCircle className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            Find answers to common questions regarding orders, shipping, returns, and products.
          </p>
        </div>

        <div className="divide-y divide-gray-200 rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;

            return (
              <div key={i} className="py-4 first:pt-0 last:pb-0">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between text-left text-sm font-bold text-gray-900 hover:text-red-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-gray-400 transition-transform duration-200 shrink-0 ml-4",
                      isOpen && "rotate-180 text-red-600"
                    )}
                  />
                </button>

                {isOpen && (
                  <p className="mt-3 text-xs text-gray-600 leading-relaxed animate-in fade-in duration-200">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
