"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Lock, Mail, ArrowRight } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    setIsLoading(true);
    setError("");

    // Simulate login
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

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          Email Address
        </label>
        <Input
          type="email"
          required
          placeholder="your.email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-xs font-semibold text-gray-700">
            Password
          </label>
          <Link
            href="/forgot-password"
            className="text-xs text-red-600 hover:underline font-medium"
          >
            Forgot Password?
          </Link>
        </div>
        <Input
          type="password"
          required
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="flex items-center">
        <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-600">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500 accent-red-600"
          />
          <span>Remember me on this browser</span>
        </label>
      </div>

      <Button
        type="submit"
        size="lg"
        variant="primary"
        isLoading={isLoading}
        className="w-full font-bold h-11 shadow-md shadow-red-600/20"
      >
        <span>Sign In to Account</span>
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>

      <div className="pt-2 text-center text-xs text-gray-500">
        Don't have an account yet?{" "}
        <Link href="/register" className="font-bold text-red-600 hover:underline">
          Create an Account
        </Link>
      </div>
    </form>
  );
}
