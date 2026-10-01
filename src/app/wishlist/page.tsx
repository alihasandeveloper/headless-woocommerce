"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { ProductPrice } from "@/components/product/ProductPrice";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { Heart, ShoppingCart, Trash2, CheckCircle2 } from "lucide-react";

export default function WishlistPage() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-white pb-20">
      <Breadcrumbs items={[{ label: "Wishlist", href: "/wishlist" }]} />

      <Container className="pt-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-100 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900">
              My Wishlist
            </h1>
            <p className="mt-1 text-xs text-gray-500 font-medium">
              You have {items.length} saved {items.length === 1 ? "item" : "items"}
            </p>
          </div>

          {items.length > 0 && (
            <button
              onClick={clearWishlist}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-red-600 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Clear Wishlist</span>
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="py-12">
            <EmptyState
              icon={Heart}
              title="Your wishlist is empty"
              description="Save items you love to your wishlist to review or purchase them later."
              actionText="Explore Shop"
              actionHref="/shop"
            />
          </div>
        ) : (
          <div className="pt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {items.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col rounded-2xl border border-gray-200 bg-white p-4 transition-all hover:shadow-lg hover:border-gray-300"
                >
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-gray-50 mb-3">
                    <Link href={`/product/${product.slug}`}>
                      <Image
                        src={product.images[0]?.src || "/images/placeholder.jpg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </Link>

                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="absolute top-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-red-600 shadow-md transition-transform hover:scale-110"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <Link href={`/product/${product.slug}`}>
                    <h3 className="text-sm font-bold text-gray-900 line-clamp-2 hover:text-red-600 transition-colors min-h-[40px]">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="mt-2">
                    <ProductPrice
                      price={product.price}
                      regularPrice={product.regular_price}
                      salePrice={product.sale_price}
                      onSale={product.on_sale}
                    />
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                    <Button
                      onClick={() => {
                        addToCart(product, { quantity: 1, openDrawer: true });
                      }}
                      size="sm"
                      variant="primary"
                      className="w-full text-xs font-semibold h-9"
                    >
                      <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
