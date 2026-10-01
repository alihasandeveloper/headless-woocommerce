"use client";

import React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ArrowUpDown } from "lucide-react";

const SORT_OPTIONS = [
  { label: "Default Sorting", orderby: "id", order: "desc" },
  { label: "Popularity", orderby: "popularity", order: "desc" },
  { label: "Latest Arrivals", orderby: "date", order: "desc" },
  { label: "Price: Low to High", orderby: "price", order: "asc" },
  { label: "Price: High to Low", orderby: "price", order: "desc" },
  { label: "Highest Rated", orderby: "rating", order: "desc" },
];

export function SortDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentOrderby = searchParams.get("orderby") || "id";
  const currentOrder = searchParams.get("order") || "desc";

  const selectedValue = `${currentOrderby}:${currentOrder}`;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [orderby, order] = e.target.value.split(":");
    const params = new URLSearchParams(searchParams.toString());

    params.set("orderby", orderby);
    params.set("order", order);
    params.delete("page");

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative flex items-center">
      <div className="flex items-center gap-2">
        <ArrowUpDown className="h-4 w-4 text-gray-400 hidden sm:block" />
        <select
          value={selectedValue}
          onChange={handleChange}
          className="h-10 rounded-lg border border-gray-300 bg-white px-3 pr-8 text-xs font-medium text-gray-700 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 cursor-pointer shadow-2xs"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={`${opt.orderby}:${opt.order}`} value={`${opt.orderby}:${opt.order}`}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
