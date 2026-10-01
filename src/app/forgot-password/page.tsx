import React from "react";
import { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { KeyRound } from "lucide-react";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Reset your password via your registered email address.",
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      <Breadcrumbs items={[{ label: "Forgot Password", href: "/forgot-password" }]} />

      <Container size="sm" className="pt-12">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 sm:p-10 shadow-sm">
          <div className="text-center mb-8 space-y-2">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <KeyRound className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-gray-900">
              Reset Password
            </h1>
          </div>

          <ForgotPasswordForm />
        </div>
      </Container>
    </div>
  );
}
