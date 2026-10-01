import React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { FileQuestion, ArrowLeft, ShoppingBag } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-white py-16">
      <Container size="sm" className="text-center space-y-6">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-red-50 text-red-600 shadow-inner">
          <FileQuestion className="h-10 w-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-red-600">
            Error 404
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-gray-900">
            Page Not Found
          </h1>
          <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
            The page or product you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Link href="/">
            <Button size="lg" variant="primary" className="font-bold">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <Link href="/shop">
            <Button size="lg" variant="outline" className="font-medium">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
