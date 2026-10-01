"use client";

import React, { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Mail, CheckCircle2 } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-gray-900 p-8 sm:p-12 text-center text-white">
          <div className="relative max-w-2xl mx-auto space-y-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-600/20 text-red-500 border border-red-500/30 mb-2">
              <Mail className="h-6 w-6" />
            </div>

            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              Unlock 15% Off Your Next Order
            </h2>

            <p className="text-sm text-gray-300 max-w-lg mx-auto leading-relaxed">
              Join our newsletter for VIP members-only sales, limited drop announcements, and style inspirations.
            </p>

            {isSubmitted ? (
              <div className="mt-6 flex items-center justify-center gap-2 text-emerald-400 font-semibold bg-emerald-950/60 py-3 px-6 rounded-xl border border-emerald-500/30 max-w-md mx-auto">
                <CheckCircle2 className="h-5 w-5" />
                <span>Thank you! Use code <strong>WELCOME20</strong> at checkout.</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full sm:flex-1 h-12 rounded-xl bg-gray-800 border border-gray-700 px-4 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                />
                <Button
                  type="submit"
                  size="lg"
                  variant="primary"
                  className="w-full sm:w-auto font-bold h-12"
                >
                  Join VIP Club
                </Button>
              </form>
            )}

            <p className="text-[11px] text-gray-500">
              We respect your privacy. Unsubscribe at any time with one click.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
