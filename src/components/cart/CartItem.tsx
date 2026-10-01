"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CartItem as CartItemType } from "@/types/cart";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-6 border-b border-gray-200">
      {/* Product Image & Title */}
      <div className="flex items-center gap-4 min-w-0">
        <div className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
          {item.image ? (
            <Image
              src={item.image.src}
              alt={item.image.alt || item.name}
              fill
              sizes="96px"
              className="object-cover object-center"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
              No Image
            </div>
          )}
        </div>

        <div className="space-y-1">
          <Link
            href={`/product/${item.slug}`}
            className="text-sm sm:text-base font-bold text-gray-900 hover:text-red-600 transition-colors line-clamp-2"
          >
            {item.name}
          </Link>
          {item.attributes && Object.keys(item.attributes).length > 0 && (
            <p className="text-xs text-gray-500">
              {Object.entries(item.attributes)
                .map(([k, v]) => `${k}: ${v}`)
                .join(" | ")}
            </p>
          )}
          <p className="text-xs text-red-600 font-medium sm:hidden">
            {formatPrice(item.price)} each
          </p>
        </div>
      </div>

      {/* Quantity & Pricing Desktop Layout */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
        <div className="hidden sm:block text-right">
          <p className="text-sm font-medium text-gray-500">{formatPrice(item.price)}</p>
        </div>

        {/* Quantity control */}
        <div className="flex items-center rounded-lg border border-gray-200 bg-white">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="p-2 text-gray-500 hover:text-gray-900 transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-10 text-center text-xs font-bold text-gray-900">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="p-2 text-gray-500 hover:text-gray-900 transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Total for Item */}
        <div className="text-right min-w-[80px]">
          <p className="text-base font-bold text-gray-900">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>

        {/* Remove item */}
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-gray-400 hover:text-red-600 transition-colors p-2"
          aria-label="Remove item"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
