"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function RegisterForm() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    setError("");

    setTimeout(() => {
      setIsLoading(false);
      router.push("/my-account");
    }, 800);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            First Name *
          </label>
          <Input
            required
            placeholder="Alex"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Last Name *
          </label>
          <Input
            required
            placeholder="Morgan"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          Email Address *
        </label>
        <Input
          type="email"
          required
          placeholder="alex.morgan@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          Password *
        </label>
        <Input
          type="password"
          required
          placeholder="At least 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          Confirm Password *
        </label>
        <Input
          type="password"
          required
          placeholder="Repeat password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <div className="text-[11px] text-gray-500 leading-relaxed">
        By registering, you agree to our{" "}
        <Link href="/terms-and-conditions" className="text-red-600 underline">
          Terms & Conditions
        </Link>{" "}
        and{" "}
        <Link href="/privacy-policy" className="text-red-600 underline">
          Privacy Policy
        </Link>
        .
      </div>

      <Button
        type="submit"
        size="lg"
        variant="primary"
        isLoading={isLoading}
        className="w-full font-bold h-11 shadow-md shadow-red-600/20"
      >
        <span>Create Account</span>
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>

      <div className="pt-2 text-center text-xs text-gray-500">
        Already have an account?{" "}
        <Link href="/login" className="font-bold text-red-600 hover:underline">
          Sign In
        </Link>
      </div>
    </form>
  );
}
