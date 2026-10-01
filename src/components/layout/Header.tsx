"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Container } from "./Container";
import { CategoryNav } from "./CategoryNav";
import { MobileHeader } from "./MobileHeader";
import { MiniCart } from "@/components/cart/MiniCart";
import { useCart } from "@/hooks/useCart";
import { ProductCategory } from "@/types/category";
import { siteConfig } from "@/config/site";
import { Search, User, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface HeaderProps {
  categories?: ProductCategory[];
}

export function Header({ categories = [] }: HeaderProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const { itemCount: cartCount, totals, openCartDrawer } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-40">
      {/* Main Desktop Header */}
      <div className="hidden py-3 lg:block border-b border-gray-100">
        <Container>
          <div className="flex items-center justify-between gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-1.5">
                <div className="h-9 w-9 rounded-lg bg-red-600 flex items-center justify-center text-white font-extrabold text-lg shadow-xs">
                  HL
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black tracking-tight text-gray-900 leading-tight">
                    Head<span className="text-red-600">less</span>
                  </span>
                  <span className="text-[9px] font-bold text-gray-400 -mt-0.5">
                    {siteConfig.tagline}
                  </span>
                </div>
              </div>
            </Link>

            {/* Pill Search Bar */}
            <div className="flex-1 max-w-xl">
              <form onSubmit={handleSearch} className="relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="পণ্য খুঁজুন..."
                  className="h-10 w-full rounded-full border border-red-500 bg-white pl-4 pr-11 text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-red-600"
                />
                <button
                  type="submit"
                  className="absolute right-1 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white transition-colors hover:bg-red-700"
                  aria-label="Search"
                >
                  <Search className="h-4 w-4" />
                </button>
              </form>
            </div>

            {/* Right Header Actions */}
            <div className="flex items-center gap-5 shrink-0">
              {/* Profile */}
              <Link
                href="/my-account"
                className="text-gray-700 hover:text-red-600 transition-colors p-1"
                aria-label="Account"
              >
                <User className="h-5 w-5" />
              </Link>

              {/* Cart Pill */}
              <button
                onClick={openCartDrawer}
                className="flex items-center gap-2 text-gray-800 hover:text-red-600 transition-colors text-xs font-semibold"
                aria-label="Open Cart"
              >
                <div className="relative">
                  <ShoppingBag className="h-5 w-5 text-gray-800" />
                  <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                    {cartCount}
                  </span>
                </div>
                <span className="font-bold text-gray-900">
                  {formatPrice(totals.subtotal)}
                </span>
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* Sub-navbar with category dropdown and menu links */}
      <CategoryNav categories={categories} />

      {/* Mobile Header */}
      <MobileHeader categories={categories} />

      {/* Cart Drawer */}
      <MiniCart />
    </header>
  );
}
