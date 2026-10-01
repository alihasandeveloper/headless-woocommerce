"use client";

import React, { useState } from "react";
import Image from "next/image";
import { WooCommerceImage } from "@/types/category";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { Modal } from "@/components/ui/Modal";

interface ProductGalleryProps {
  images: WooCommerceImage[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const displayImages = images.length > 0 ? images : [
    {
      id: 0,
      src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop",
      name: productName,
      alt: productName,
    },
  ];

  const currentImage = displayImages[selectedIdx] || displayImages[0];

  return (
    <div className="flex flex-col-reverse sm:flex-row gap-4">
      {/* Vertical Thumbnails */}
      {displayImages.length > 1 && (
        <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-y-auto max-h-[460px] shrink-0">
          {displayImages.map((img, idx) => {
            const isSelected = idx === selectedIdx;
            return (
              <button
                key={img.id || idx}
                onClick={() => setSelectedIdx(idx)}
                className={cn(
                  "relative h-16 w-16 sm:h-18 sm:w-18 shrink-0 overflow-hidden rounded-md border transition-all bg-white",
                  isSelected
                    ? "border-red-600 ring-1 ring-red-500"
                    : "border-gray-200 hover:border-gray-400 opacity-80 hover:opacity-100"
                )}
                aria-label={`View thumbnail ${idx + 1}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt || `${productName} ${idx + 1}`}
                  fill
                  sizes="72px"
                  className="object-cover object-center"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Main Image Container */}
      <div className="relative flex-1">
        <div
          onClick={() => setIsZoomOpen(true)}
          className="relative aspect-square w-full overflow-hidden rounded-xl border border-gray-200 bg-white cursor-pointer group"
        >
          <Image
            src={currentImage.src}
            alt={currentImage.alt || productName}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain p-2 transition-transform duration-300 group-hover:scale-103"
          />

          {/* Click to View Zoom indicator */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded bg-white/90 px-2 py-1 text-[10px] font-bold text-gray-700 shadow-xs border border-gray-200">
            <Search className="h-3 w-3 text-gray-500" />
            <span>CLICK TO VIEW</span>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      <Modal
        isOpen={isZoomOpen}
        onClose={() => setIsZoomOpen(false)}
        maxWidth="3xl"
        title={productName}
      >
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-white">
          <Image
            src={currentImage.src}
            alt={productName}
            fill
            sizes="100vw"
            className="object-contain"
          />
        </div>
      </Modal>
    </div>
  );
}
