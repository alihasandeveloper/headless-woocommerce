import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/config/site";

export function HomePromoBanner() {
  return (
    <div className="py-4 bg-white">
      <Container>
        <Link href="/shop" className="block group">
          <div className="relative aspect-21/7 sm:aspect-21/6 w-full overflow-hidden rounded-2xl bg-linear-to-r from-purple-900 via-indigo-900 to-black text-white shadow-md border border-gray-100">
            <Image
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1600&auto=format&fit=crop"
              alt="Promo Banner"
              fill
              priority
              className="object-cover opacity-25 group-hover:scale-102 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-radial-at-c from-transparent via-purple-950/60 to-black/80" />

            <div className="relative h-full flex flex-col justify-center items-center text-center p-6 space-y-2">
              <span className="inline-block rounded-full bg-red-600/90 px-3 py-0.5 text-[11px] font-extrabold uppercase tracking-widest text-white shadow-xs">
                HOT DEALS
              </span>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
                {siteConfig.tagline}
              </h2>
              <p className="text-xs sm:text-sm text-gray-200 max-w-md">
                অরিজিনাল স্মার্ট গ্যাজেট কিনুন সেরা ডিসকাউন্টে সারা বাংলাদেশে ক্যাশ অন ডেলিভারিতে।
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center rounded-lg bg-red-600 px-5 py-2 text-xs font-bold text-white shadow-sm transition-all group-hover:bg-red-700">
                  SHOP NOW
                </span>
              </div>
            </div>
          </div>
        </Link>
      </Container>
    </div>
  );
}
