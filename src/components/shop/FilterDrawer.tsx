"use client";

import React, { useState } from "react";
import { Drawer } from "@/components/ui/Drawer";
import { ShopFilters } from "./ShopFilters";
import { ProductCategory } from "@/types/category";
import { Button } from "@/components/ui/Button";
import { Filter, SlidersHorizontal } from "lucide-react";

interface FilterDrawerProps {
  categories: ProductCategory[];
}

export function FilterDrawer({ categories }: FilterDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="lg:hidden flex items-center gap-2 h-10 px-4 text-xs font-semibold"
      >
        <SlidersHorizontal className="h-4 w-4 text-red-600" />
        <span>Filters & Sort</span>
      </Button>

      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Filter Products"
        position="left"
      >
        <div className="py-2">
          <ShopFilters
            categories={categories}
            onFilterApplied={() => setIsOpen(false)}
          />
        </div>
      </Drawer>
    </>
  );
}
