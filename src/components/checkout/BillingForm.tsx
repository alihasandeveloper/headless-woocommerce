import React from "react";
import { Input } from "@/components/ui/Input";
import { Address } from "@/types/customer";

interface BillingFormProps {
  formData: Address;
  onChange: (field: keyof Address, value: string) => void;
  errors: Record<string, string>;
}

export function BillingForm({ formData, onChange, errors }: BillingFormProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-2">
        Billing Details
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            First Name *
          </label>
          <Input
            value={formData.first_name}
            onChange={(e) => onChange("first_name", e.target.value)}
            error={errors.first_name}
            placeholder="Alex"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Last Name *
          </label>
          <Input
            value={formData.last_name}
            onChange={(e) => onChange("last_name", e.target.value)}
            error={errors.last_name}
            placeholder="Morgan"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Email Address *
          </label>
          <Input
            type="email"
            value={formData.email || ""}
            onChange={(e) => onChange("email", e.target.value)}
            error={errors.email}
            placeholder="alex.morgan@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Phone Number *
          </label>
          <Input
            type="tel"
            value={formData.phone || ""}
            onChange={(e) => onChange("phone", e.target.value)}
            error={errors.phone}
            placeholder="+1 (555) 0144"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          Street Address *
        </label>
        <Input
          value={formData.address_1}
          onChange={(e) => onChange("address_1", e.target.value)}
          error={errors.address_1}
          placeholder="House number and street name"
          required
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          Apartment, suite, unit (optional)
        </label>
        <Input
          value={formData.address_2 || ""}
          onChange={(e) => onChange("address_2", e.target.value)}
          placeholder="Apartment, suite, unit, etc."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            City *
          </label>
          <Input
            value={formData.city}
            onChange={(e) => onChange("city", e.target.value)}
            error={errors.city}
            placeholder="San Francisco"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            State / District *
          </label>
          <Input
            value={formData.state}
            onChange={(e) => onChange("state", e.target.value)}
            error={errors.state}
            placeholder="California"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Postal / Zip Code *
          </label>
          <Input
            value={formData.postcode}
            onChange={(e) => onChange("postcode", e.target.value)}
            error={errors.postcode}
            placeholder="94105"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          Country *
        </label>
        <select
          value={formData.country}
          onChange={(e) => onChange("country", e.target.value)}
          className="w-full h-11 rounded-lg border border-gray-300 bg-white px-3.5 text-sm text-gray-900 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
        >
          <option value="US">United States (US)</option>
          <option value="GB">United Kingdom (UK)</option>
          <option value="CA">Canada</option>
          <option value="AU">Australia</option>
          <option value="DE">Germany</option>
          <option value="FR">France</option>
          <option value="BD">Bangladesh</option>
        </select>
      </div>
    </div>
  );
}
