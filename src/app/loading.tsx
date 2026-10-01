import React from "react";
import { Container } from "@/components/layout/Container";
import { Spinner } from "@/components/ui/Spinner";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
      <Spinner size="lg" />
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest animate-pulse">
        Loading...
      </p>
    </div>
  );
}
