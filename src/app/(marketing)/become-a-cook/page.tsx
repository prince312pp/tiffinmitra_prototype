'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import {
  ChefHat,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  Heart,
  Clock,
  Sparkles,
} from 'lucide-react';

export default function BecomeACookPage() {
  const [applicantName, setApplicantName] = useState('');
  const [kitchenName, setKitchenName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [locality, setLocality] = useState('Vastrapur');
  const [cuisineSpecialties, setCuisineSpecialties] = useState('Gujarati, Kathiyawadi');
  const [fssaiNumber, setFssaiNumber] = useState('');
  const [dailyCapacity, setDailyCapacity] = useState('25');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const localities = ['Navrangpura', 'Vastrapur', 'Satellite', 'Bodakdev', 'Prahlad Nagar', 'Thaltej'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/v1/admin/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicantName,
          kitchenName,
          phone,
          email,
          address,
          locality,
          cuisineSpecialties: cuisineSpecialties.split(',').map((s) => s.trim()),
          fssaiNumber,
          dailyCapacity: Number(dailyCapacity),
        }),
      });

      const json = await res.json();
      if (json.success) {
        setSubmittedSuccess(true);
      } else {
        setErrorMessage(json.error || 'Failed to submit application');
      }
    } catch {
      setErrorMessage('Network error submitting application');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <Badge variant="terracotta">Cook Empowerment</Badge>
        <h1 className="text-4xl font-extrabold text-brand-charcoal tracking-tight">
          Cook from Your Kitchen. <br />
          <span className="text-brand-darkGreen">Earn on Your Own Terms.</span>
        </h1>
        <p className="text-sm text-brand-muted leading-relaxed">
          TiffinMitra gives homemakers, independent home chefs, and regional cooks a dedicated storefront, daily portion controls, and instant order notifications without technical friction.
        </p>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-brand-border space-y-2 shadow-sm">
          <Clock className="w-8 h-8 text-brand-green" />
          <h3 className="font-bold text-sm text-brand-charcoal">Flexible Schedule & Limits</h3>
          <p className="text-xs text-brand-muted leading-relaxed">
            You decide how many meals you want to cook each day. Once your capacity is reached, orders throttle automatically.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-brand-border space-y-2 shadow-sm">
          <ShieldCheck className="w-8 h-8 text-brand-darkGreen" />
          <h3 className="font-bold text-sm text-brand-charcoal">FSSAI & Hygiene Guidance</h3>
          <p className="text-xs text-brand-muted leading-relaxed">
            We assist domestic cooks with basic food safety registration and hygiene standards to build lasting customer trust.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-brand-border space-y-2 shadow-sm">
          <Heart className="w-8 h-8 text-brand-terracotta" />
          <h3 className="font-bold text-sm text-brand-charcoal">Direct Community Diners</h3>
          <p className="text-xs text-brand-muted leading-relaxed">
            Serve appreciative nearby students and working professionals who value authentic home-cooked meals.
          </p>
        </div>
      </div>

      {/* Application Wizard */}
      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-brand-border shadow-md space-y-6">
        <div>
          <h2 className="text-2xl font-extrabold text-brand-charcoal">Cook Onboarding Application</h2>
          <p className="text-xs text-brand-muted mt-1">
            Submit your domestic kitchen details for platform hygiene review and onboarding.
          </p>
        </div>

        {submittedSuccess ? (
          <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="text-lg font-bold text-emerald-950">Application Submitted for Review!</h3>
            <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
              Thank you, <strong>{applicantName}</strong>! Your kitchen application for <strong>"{kitchenName}"</strong> has been recorded in MongoDB with <code>pending_review</code> status. Our operations team reviews all applications within 24 hours.
            </p>
            <div className="pt-2">
              <a href="/admin/dashboard" className="text-xs text-brand-darkGreen font-bold underline">
                (Admin demo: View pending queue in Admin Dashboard →)
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-700 rounded-xl">
                {errorMessage}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Your Full Name"
                placeholder="e.g. Meenakshi Sundaram"
                required
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
              />

              <Input
                label="Kitchen / Storefront Name"
                placeholder="e.g. Meenakshi's Homestyle Rasoi"
                required
                value={kitchenName}
                onChange={(e) => setKitchenName(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Contact Phone"
                type="tel"
                placeholder="+91 98450 12345"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <Input
                label="Contact Email"
                type="email"
                placeholder="meenakshi@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <Input
              label="Kitchen Address"
              placeholder="Flat 101, 2nd Main, near Temple"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal mb-1.5">
                  Primary Locality
                </label>
                <select
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-brand-border bg-white text-xs font-semibold text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-darkGreen"
                >
                  {localities.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Input
                  label="Daily Capacity (Meals/Day)"
                  type="number"
                  min="5"
                  max="100"
                  required
                  value={dailyCapacity}
                  onChange={(e) => setDailyCapacity(e.target.value)}
                />
              </div>

              <div>
                <Input
                  label="FSSAI Registration No (If any)"
                  placeholder="21223010000XXX (Optional)"
                  value={fssaiNumber}
                  onChange={(e) => setFssaiNumber(e.target.value)}
                />
              </div>
            </div>

            <Input
              label="Cuisine Specialties (Comma-separated)"
              placeholder="e.g. South Indian, Tamilian Brahmin, Sambar Specials"
              required
              value={cuisineSpecialties}
              onChange={(e) => setCuisineSpecialties(e.target.value)}
            />

            <Button
              type="submit"
              variant="default"
              size="lg"
              isLoading={isSubmitting}
              className="w-full mt-4"
            >
              Submit Application for Review
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
