import React from "react";
import { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { LoginForm } from "@/components/auth/LoginForm";
import { Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your account to manage orders, wishlist, and profile.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      <Breadcrumbs items={[{ label: "Login", href: "/login" }]} />

      <Container size="sm" className="pt-12">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 sm:p-10 shadow-sm">
          <div className="text-center mb-8 space-y-2">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <Lock className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-gray-900">
              Welcome Back
            </h1>
            <p className="text-xs text-gray-500">
              Sign in with your email and password to access your account.
            </p>
          </div>

          <LoginForm />
        </div>
      </Container>
    </div>
  );
}
