"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Zap, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface SlideData {
  id: number;
  tagline: string;
  heading: string;
  subheading: string;
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  image: string;
  badgeText: string;
  accentBg: string;
}

const SLIDES: SlideData[] = [
  {
    id: 1,
    tagline: "Flagship Audio Engineering",
    heading: "Next-Gen Wireless Sound",
    subheading:
      "Engineered with custom planar magnetic drivers and hybrid active noise cancellation for ultimate studio immersion.",
    primaryCtaText: "Shop Headphones",
    primaryCtaHref: "/shop?category=electronics-audio",
    secondaryCtaText: "Explore Collection",
    secondaryCtaHref: "/shop",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1400&auto=format&fit=crop",
    badgeText: "Limited Launch Edition",
    accentBg: "from-zinc-900 via-neutral-900 to-black",
  },
  {
    id: 2,
    tagline: "Timeless Precision Horology",
    heading: "Sapphire Minimalist Timepieces",
    subheading:
      "Forged with 316L surgical stainless steel and domed sapphire crystal. Pure aesthetics for everyday sophistication.",
    primaryCtaText: "Explore Watches",
    primaryCtaHref: "/shop?category=watches-accessories",
    secondaryCtaText: "View Lookbook",
    secondaryCtaHref: "/shop",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1400&auto=format&fit=crop",
    badgeText: "Handcrafted Luxury",
    accentBg: "from-gray-950 via-slate-900 to-black",
  },
  {
    id: 3,
    tagline: "Athletic Performance & Innovation",
    heading: "Nitro-Foam Road Runners",
    subheading:
      "Explosive energy return and featherlight engineered mesh. Designed for marathon training and all-day comfort.",
    primaryCtaText: "Shop Footwear",
    primaryCtaHref: "/shop?category=footwear",
    secondaryCtaText: "New Arrivals",
    secondaryCtaHref: "/shop?featured=true",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1400&auto=format&fit=crop",
    badgeText: "Up to 30% Off",
    accentBg: "from-stone-950 via-neutral-900 to-black",
  },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  return (
    <div
      className="relative overflow-hidden bg-gray-900 text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] flex items-center">
        {SLIDES.map((slide, index) => {
          const isActive = index === current;

          return (
            <div
              key={slide.id}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000 ease-in-out",
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              )}
            >
              {/* Background Image with Gradient Overlay */}
              <div className="absolute inset-0">
                <Image
                  src={slide.image}
                  alt={slide.heading}
                  fill
                  priority={index === 0}
                  className="object-cover object-center opacity-35"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${slide.accentBg} opacity-85`} />
                <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/40 to-black" />
              </div>

              {/* Content Box */}
              <Container className="relative h-full flex items-center py-16 sm:py-20 z-20">
                <div className="max-w-2xl space-y-4 sm:space-y-6">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 rounded-full bg-red-600/20 border border-red-500/40 px-3.5 py-1 text-xs font-semibold text-red-400 backdrop-blur-md">
                    <Sparkles className="h-3.5 w-3.5 text-red-400" />
                    <span>{slide.badgeText}</span>
                  </div>

                  <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-red-500">
                    {slide.tagline}
                  </p>

                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                    {slide.heading}
                  </h1>

                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-xl">
                    {slide.subheading}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                    <Link href={slide.primaryCtaHref}>
                      <Button
                        size="lg"
                        variant="primary"
                        className="group font-bold shadow-lg shadow-red-600/40"
                      >
                        <span>{slide.primaryCtaText}</span>
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>

                    {slide.secondaryCtaText && slide.secondaryCtaHref && (
                      <Link href={slide.secondaryCtaHref}>
                        <Button
                          size="lg"
                          variant="outline"
                          className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white backdrop-blur-xs font-semibold"
                        >
                          {slide.secondaryCtaText}
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </Container>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md border border-white/10 hover:bg-red-600 transition-colors shadow-lg"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md border border-white/10 hover:bg-red-600 transition-colors shadow-lg"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={cn(
              "h-2.5 rounded-full transition-all duration-300",
              index === current
                ? "w-8 bg-red-600"
                : "w-2.5 bg-white/40 hover:bg-white/70"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
