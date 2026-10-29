import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ChefHat, Heart, ShieldCheck, Sparkles, MapPin, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Intro */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <Badge variant="secondary">Our Story & Mission</Badge>
        <h1 className="text-4xl font-extrabold text-brand-charcoal tracking-tight">
          Homemade Food. Heartfelt Care.
        </h1>
        <p className="text-sm text-brand-muted leading-relaxed">
          TiffinMitra was founded on a simple realization: millions of students and professionals living away from home struggle to find wholesome, affordable daily meals, while thousands of passionate home cooks have the skill to prepare them.
        </p>
      </div>

      {/* Vision & Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-brand-border space-y-3 shadow-sm">
          <Sparkles className="w-8 h-8 text-brand-terracotta" />
          <h3 className="text-xl font-bold text-brand-charcoal">Our Vision</h3>
          <p className="text-xs text-brand-muted leading-relaxed">
            To make fresh, comforting, home-style food accessible to everyone in urban India while empowering passionate home cooks to turn their culinary skills into sustainable livelihood opportunities.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-brand-border space-y-3 shadow-sm">
          <Users className="w-8 h-8 text-brand-green" />
          <h3 className="text-xl font-bold text-brand-charcoal">Our Mission</h3>
          <p className="text-xs text-brand-muted leading-relaxed">
            To build a trusted hyperlocal ecosystem connecting people seeking everyday home-cooked food with the local cooks who prepare it with maternal warmth, clean ingredients, and zero restaurant shortcuts.
          </p>
        </div>
      </div>

      {/* Core Invariants */}
      <div className="bg-white p-8 rounded-3xl border border-brand-border shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-brand-charcoal">What Sets TiffinMitra Apart</h3>

        <div className="space-y-4 text-xs text-brand-charcoal">
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0">
              ✓
            </span>
            <div>
              <strong className="text-brand-darkGreen">Small Domestic Batches: </strong>
              Our cooks prepare meals in real domestic kitchens. Portions are intentionally limited so food is always cooked fresh to order rather than mass-refrigerated.
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0">
              ✓
            </span>
            <div>
              <strong className="text-brand-darkGreen">Single-Cook Cart UX: </strong>
              We never bundle items across different kitchens in a single delivery order. When you order from a cook, every roti, dal, and sabzi arrives hot together directly from their home.
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0">
              ✓
            </span>
            <div>
              <strong className="text-brand-darkGreen">Morning Cutoff Pause Guarantee: </strong>
              Subscribers can pause any day's lunch before 8:00 AM or dinner before 3:00 PM without cancellation penalties, automatically extending their validity.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
