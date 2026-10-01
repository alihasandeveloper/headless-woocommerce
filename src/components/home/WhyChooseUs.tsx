import React from "react";
import { Container } from "@/components/layout/Container";
import { Truck, ShieldCheck, Headphones, RotateCcw } from "lucide-react";

export function WhyChooseUs() {
  const perks = [
    {
      icon: Truck,
      title: "Complimentary Express Delivery",
      description: "Enjoy zero shipping fees on all qualifying orders exceeding $150 worldwide.",
    },
    {
      icon: ShieldCheck,
      title: "Guaranteed Authenticity",
      description: "Every item is rigorously inspected and verified by our certified QA team.",
    },
    {
      icon: RotateCcw,
      title: "30-Day Effortless Returns",
      description: "Not completely delighted? Return your items within 30 days for a swift refund.",
    },
    {
      icon: Headphones,
      title: "Dedicated 24/7 Concierge",
      description: "Our ecommerce specialists are ready around the clock to support your inquiries.",
    },
  ];

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600">
            The WooStore Experience
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 mt-1">
            Why Customers Choose Us
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            We combine high-performance craftsmanship with seamless customer service.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {perks.map((perk, i) => {
            const Icon = perk.icon;
            return (
              <div
                key={i}
                className="flex flex-col items-center text-center p-6 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-red-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 text-white shadow-md shadow-red-600/20 mb-4">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  {perk.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {perk.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
