"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Search } from "lucide-react";

export default function TrackOrderPage() {
  const router = useRouter();
  const [orderId, setOrderId] = useState("");

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) {
      router.push(`/my-account/orders/${encodeURIComponent(orderId.trim())}`);
    }
  };

  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center py-16 bg-white">
      <Container size="sm">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
            অর্ডার ট্র্যাক করুন
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            অর্ডার আইডি দিয়ে সার্চ করুন — বর্তমান অবস্থা দেখতে পাবেন
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs max-w-lg mx-auto">
          <form onSubmit={handleTrack} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-900 mb-2">
                অর্ডার আইডি
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="যেমন: 12345"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="flex-1 h-11 rounded-lg border border-gray-300 bg-white px-3.5 text-xs sm:text-sm text-gray-900 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
                />
                <button
                  type="submit"
                  className="flex items-center justify-center gap-1.5 rounded-lg bg-red-600 px-5 h-11 text-xs sm:text-sm font-bold text-white transition-colors hover:bg-red-700 shadow-sm shadow-red-600/30 shrink-0"
                >
                  <Search className="h-4 w-4" />
                  <span>ট্র্যাক করুন</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
}
