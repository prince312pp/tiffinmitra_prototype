import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  ChefHat,
  Search,
  CalendarCheck,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Heart,
  ArrowRight,
} from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Hero */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <Badge variant="secondary">Step-By-Step Walkthrough</Badge>
        <h1 className="text-4xl font-extrabold text-brand-charcoal tracking-tight">
          How TiffinMitra Works
        </h1>
        <p className="text-sm text-brand-muted leading-relaxed">
          TiffinMitra connects everyday diners with trusted neighborhood home chefs.
          Here is how our seamless dining and cooking ecosystem operates.
        </p>
      </div>

      {/* Diner Walkthrough */}
      <section className="space-y-8">
        <div className="border-b border-brand-border pb-4">
          <Badge variant="default" className="mb-2">For Diners & Students</Badge>
          <h2 className="text-2xl font-bold text-brand-charcoal">The Customer Journey</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-brand-border space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-brand-darkGreen text-white flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h3 className="font-bold text-base text-brand-charcoal">Discover Local Cooks</h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              Enter your Bangalore locality (e.g. Koramangala or HSR Layout) to see certified home chefs serving Gujarati, Punjabi, South Indian, or Mughlai daily food.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-brand-border space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-brand-green text-white flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h3 className="font-bold text-base text-brand-charcoal">Single-Kitchen Fresh Order</h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              Choose your lunch or dinner thali. Our single-kitchen rule ensures your entire order is prepared together with authentic home care rather than mixed across disparate kitchens.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-brand-border space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-brand-terracotta text-white flex items-center justify-center font-bold text-sm">
              3
            </div>
            <h3 className="font-bold text-base text-brand-charcoal">Live Cooking Timeline</h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              Watch your food move through live stages (Placed → Accepted → Cooking Fresh → Out for Delivery). Delivered hot right inside your requested meal slot.
            </p>
          </div>
        </div>
      </section>

      {/* Subscription Guarantee */}
      <section className="bg-brand-darkGreen text-white p-8 sm:p-12 rounded-3xl space-y-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-emerald-300" />
          <h3 className="text-xl font-bold">The Morning Cutoff Pause Guarantee</h3>
        </div>
        <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-2xl">
          Subscribed to a 5-day or 14-day tiffin routine? If your plans change, pause any upcoming day before <strong>8:00 AM for Lunch</strong> or <strong>3:00 PM for Dinner</strong>. Pausing automatically extends your subscription validity date by 1 day with zero cancellation charge.
        </p>
      </section>

      {/* Cook Walkthrough */}
      <section className="space-y-8">
        <div className="border-b border-brand-border pb-4">
          <Badge variant="terracotta" className="mb-2">For Home Chefs</Badge>
          <h2 className="text-2xl font-bold text-brand-charcoal">The Home Cook Journey</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-brand-border space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-brand-terracotta text-white flex items-center justify-center font-bold text-sm">
              A
            </div>
            <h3 className="font-bold text-base text-brand-charcoal">Apply & Kitchen Check</h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              Submit your kitchen story, specialties, and FSSAI details. Our admin operations team reviews kitchen hygiene before approving your storefront.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-brand-border space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-brand-green text-white flex items-center justify-center font-bold text-sm">
              B
            </div>
            <h3 className="font-bold text-base text-brand-charcoal">Set Daily Portions</h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              Never get overwhelmed. Set your maximum daily capacity (e.g. 25 thalis/day). Once reached, orders throttle automatically to preserve quality.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-brand-border space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-brand-darkGreen text-white flex items-center justify-center font-bold text-sm">
              C
            </div>
            <h3 className="font-bold text-base text-brand-charcoal">Cook with Care</h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              Receive incoming orders via your dedicated Live Kitchen Dashboard. Accept, prepare, and hand off meals without dealing with tech headaches.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
        <Link href="/discover">
          <Button variant="default" size="lg" className="gap-2">
            <span>Find Homemade Food</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
        <Link href="/become-a-cook">
          <Button variant="outline" size="lg">
            Apply to Become a Cook
          </Button>
        </Link>
      </div>
    </div>
  );
}
