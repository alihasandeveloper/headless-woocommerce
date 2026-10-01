"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Drawer } from "@/components/ui/Drawer";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { ProductCategory } from "@/types/category";
import {
  Menu,
  Search,
  ShoppingBag,
  Heart,
  User,
  X,
  ChevronRight,
  Layers,
  Phone,
  Mail,
} from "lucide-react";
import { siteConfig } from "@/config/site";

interface MobileHeaderProps {
  categories: ProductCategory[];
}

export function MobileHeader({ categories }: MobileHeaderProps) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { itemCount: cartCount, openCartDrawer } = useCart();
  const { itemCount: wishlistCount } = useWishlist();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <div className="sticky top-0 z-40 bg-white border-b border-gray-200 lg:hidden shadow-xs">
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="p-2 -ml-2 text-gray-700 hover:text-red-600 rounded-lg"
          aria-label="Open navigation menu"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-red-600 flex items-center justify-center text-white font-black text-sm">
            HL
          </div>
          <span className="font-extrabold text-lg tracking-tight text-gray-900">
            {siteConfig.name}
          </span>
        </Link>

        {/* Header Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 text-gray-700 hover:text-red-600 rounded-lg"
            aria-label="Toggle search input"
          >
            <Search className="h-5 w-5" />
          </button>

          <Link
            href="/wishlist"
            className="p-2 text-gray-700 hover:text-red-600 relative rounded-lg"
            aria-label="Wishlist"
          >
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          <button
            onClick={openCartDrawer}
            className="p-2 text-gray-700 hover:text-red-600 relative rounded-lg"
            aria-label="Open Cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Expandable Mobile Search Bar */}
      {isSearchOpen && (
        <div className="px-4 pb-3 border-t border-gray-100 bg-gray-50 pt-2 animate-in slide-in-from-top-2 duration-150">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, brands, or categories..."
              className="w-full h-10 pl-9 pr-8 rounded-lg border border-gray-300 bg-white text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
              autoFocus
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      <Drawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        title="Navigation Menu"
        position="left"
      >
        <div className="flex flex-col space-y-6">
          {/* Main Links */}
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
              Main Menu
            </p>
            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between py-2 text-base font-medium text-gray-800 hover:text-red-600 transition-colors"
              >
                <span>{link.title}</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </Link>
            ))}
          </div>

          {/* Categories */}
          <div className="space-y-1 border-t border-gray-100 pt-4">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
              <Layers className="h-3.5 w-3.5" />
              <span>Product Categories</span>
            </div>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/product-category/${category.slug}`}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between py-2 text-sm text-gray-700 hover:text-red-600 transition-colors"
              >
                <span>{category.name}</span>
                <span className="text-xs text-gray-400 font-mono">({category.count})</span>
              </Link>
            ))}
          </div>

          {/* Account & Policies */}
          <div className="space-y-2 border-t border-gray-100 pt-4">
            <Link
              href="/my-account"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 py-2 text-sm font-medium text-gray-800 hover:text-red-600 transition-colors"
            >
              <User className="h-4 w-4 text-gray-500" />
              <span>My Account & Orders</span>
            </Link>
            <Link
              href="/wishlist"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 py-2 text-sm font-medium text-gray-800 hover:text-red-600 transition-colors"
            >
              <Heart className="h-4 w-4 text-gray-500" />
              <span>Wishlist ({wishlistCount})</span>
            </Link>
          </div>

          {/* Contact Support */}
          <div className="rounded-xl bg-gray-50 p-4 border border-gray-200/80 text-xs text-gray-600 space-y-2">
            <p className="font-semibold text-gray-900">Need Help?</p>
            <div className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-red-600" />
              <span>{siteConfig.contact.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-red-600" />
              <span>{siteConfig.contact.email}</span>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
