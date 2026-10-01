import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { siteConfig } from "@/config/site";
import { ShieldCheck, Sparkles, Award, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${siteConfig.name}, our mission, values, and commitment to superior craftsmanship.`,
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pb-20">
      <Breadcrumbs items={[{ label: "About Us", href: "/about" }]} />

      <Container className="pt-12">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600">
            Our Story & Craft
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-gray-900 leading-tight">
            Crafting Exceptional Lifestyle & Audio Experiences
          </h1>
          <p className="text-base text-gray-500 leading-relaxed">
            Founded with a passion for minimalism, durability, and uncompromising acoustic performance, {siteConfig.name} brings together world-class industrial design and modern headless architecture.
          </p>
        </div>

        <div className="relative aspect-21/9 w-full rounded-3xl overflow-hidden shadow-2xl mb-16 border border-gray-200">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop"
            alt="Our Team and Studio"
            fill
            className="object-cover"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="rounded-2xl border border-gray-200 p-6 bg-gray-50/50 space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600 text-white shadow-md">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Uncompromising Quality</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Every item in our collection undergoes stringent acoustic and mechanical testing to guarantee longevity.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 p-6 bg-gray-50/50 space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600 text-white shadow-md">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Modern Architecture</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Powered by cutting-edge Next.js and WooCommerce for sub-second page loads and seamless shopping journeys.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 p-6 bg-gray-50/50 space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600 text-white shadow-md">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Community Centric</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Proudly serving over 50,000 audiophiles, runners, and tastemakers across 40+ countries.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
