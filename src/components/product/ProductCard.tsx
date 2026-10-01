"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product";
import { ProductPrice } from "./ProductPrice";
import { useCart } from "@/hooks/useCart";
import { calculateDiscountPercentage, cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean;
  buttonType?: "buy_now" | "add_to_cart";
}

export function ProductCard({
  product,
  className,
  priority = false,
  buttonType = "buy_now",
}: ProductCardProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  const mainImage = product.images[0]?.src || "/images/placeholder.jpg";
  const discount = calculateDiscountPercentage(
    product.regular_price,
    product.sale_price || product.price
  );

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (buttonType === "buy_now") {
      addToCart(product, { quantity: 1, openDrawer: false });
      router.push("/checkout");
    } else {
      addToCart(product, { quantity: 1, openDrawer: true });
    }
  };

  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-3 sm:p-3.5 transition-all duration-200 hover:shadow-lg hover:border-gray-300",
        className
      )}
    >
      <div>
        {/* Product Media */}
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-50 mb-3">
          <Link href={`/product/${product.slug}`} className="block h-full w-full">
            <Image
              src={mainImage}
              alt={product.images[0]?.alt || product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={priority}
              className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Discount Badge */}
          {product.on_sale && discount > 0 && (
            <div className="absolute top-2 left-2 z-10 rounded bg-red-600 px-1.5 py-0.5 text-[10px] font-bold text-white shadow-xs">
              {discount}% OFF
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-1.5">
          <Link href={`/product/${product.slug}`} className="group/title block">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-800 group-hover/title:text-red-600 transition-colors line-clamp-2 min-h-[36px] leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Price */}
          <div className="pt-0.5">
            <ProductPrice
              price={product.price}
              regularPrice={product.regular_price}
              salePrice={product.sale_price}
              onSale={product.on_sale}
              size="sm"
            />
          </div>
        </div>
      </div>

      {/* Direct Action Button */}
      <div className="mt-3 pt-2">
        <button
          onClick={handleButtonClick}
          className={cn(
            "w-full rounded-md py-2 text-xs font-bold text-white transition-all active:scale-[0.98]",
            buttonType === "buy_now"
              ? "bg-red-600 hover:bg-red-700 shadow-sm shadow-red-600/20"
              : "border border-red-600 text-red-600 bg-white hover:bg-red-50"
          )}
        >
          {buttonType === "buy_now" ? "Buy Now" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
