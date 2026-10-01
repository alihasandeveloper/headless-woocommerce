import React from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Star, Quote } from "lucide-react";

export function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: "Marcus Vance",
      role: "Audio Engineer & Producer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
      text: "The Acoustic Pro headphones exceeded all my expectations. Frequency response is pristine and the battery life easily got me through cross-continental flights.",
      rating: 5,
      product: "Acoustic Pro Wireless ANC",
    },
    {
      id: 2,
      name: "Elena Rostova",
      role: "Creative Director",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
      text: "The sapphire minimalist watch is gorgeous. The weight, balance, and clean dial details look far more premium than timepieces triple its price tag.",
      rating: 5,
      product: "Minimalist Chrono Sapphire",
    },
    {
      id: 3,
      name: "David Chen",
      role: "Marathon Runner",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      text: "Super fast checkout and 2-day delivery. The Nitro-Foam sneakers give me incredible spring and zero knee strain after 15-mile Sunday runs.",
      rating: 5,
      product: "Ultralight Nitro Runners",
    },
  ];

  return (
    <section className="py-16 bg-gray-50/70 border-t border-gray-100">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600">
            Real Feedback
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 mt-1">
            Loved By Over 50,000+ Happy Customers
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Hear what our verified community says about their gear and customer experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="relative flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="h-6 w-6 text-red-100" />
                </div>

                <p className="text-sm text-gray-700 leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="relative h-10 w-10 overflow-hidden rounded-full border border-gray-200">
                  <Image
                    src={rev.avatar}
                    alt={rev.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{rev.name}</h4>
                  <p className="text-xs text-gray-400">{rev.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
