import React from "react";
import { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { UserPlus } from "lucide-react";

export const metadata: Metadata = {
  title: "Create an Account",
  description: "Register for an account to enjoy faster checkout, order tracking, and exclusive discounts.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      <Breadcrumbs items={[{ label: "Register", href: "/register" }]} />

      <Container size="sm" className="pt-12">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 sm:p-10 shadow-sm">
          <div className="text-center mb-8 space-y-2">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <UserPlus className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-gray-900">
              Create an Account
            </h1>
            <p className="text-xs text-gray-500">
              Join thousands of shoppers and get 15% off your first order.
            </p>
          </div>

          <RegisterForm />
        </div>
      </Container>
    </div>
  );
}
