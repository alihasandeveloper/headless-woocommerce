import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Tag, Zap } from "lucide-react";

export function PromotionalBanner() {
  return (
    <section className="py-12 bg-white">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-red-600 via-red-700 to-rose-900 text-white shadow-2xl">
          {/* Subtle background decoration */}
          <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-black/20 blur-xl" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 items-center p-8 sm:p-12 lg:p-16 gap-8 z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                <Zap className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
                <span>Special Seasonal Offer</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Upgrade Your Lifestyle. Save Up to 40% Off.
              </h2>

              <p className="text-red-100 text-sm sm:text-base max-w-xl leading-relaxed">
                Discover exceptional craftmanship across our audiophile headphones, luxury watches, and premium apparel. Limited time only with coupon code{" "}
                <strong className="underline text-white font-mono bg-white/20 px-2 py-0.5 rounded">
                  WELCOME20
                </strong>
                .
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link href="/shop?on_sale=true">
                  <Button
                    size="lg"
                    className="bg-white text-red-700 hover:bg-gray-100 active:bg-gray-200 font-bold shadow-lg"
                  >
                    <span>Claim Your Discount</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <span className="text-xs text-red-100 font-medium">
                  * Free shipping applied automatically over $150
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative h-64 w-64 sm:h-80 sm:w-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <Image
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop"
                  alt="Special Promotional Deal"
                  fill
                  sizes="320px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
