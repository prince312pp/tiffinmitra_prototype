import React from 'react';
import Link from 'next/link';
import { connectDB } from '@/lib/db';
import CookProfile from '@/models/CookProfile';
import Meal from '@/models/Meal';
import { MealCard } from '@/components/meals/MealCard';
import { CookCard } from '@/components/cooks/CookCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  ChefHat,
  Search,
  MapPin,
  Clock,
  ShieldCheck,
  CalendarCheck,
  Heart,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getFeaturedData() {
  try {
    await connectDB();
    const cooks = await CookProfile.find({ applicationStatus: 'approved' })
      .sort({ averageRating: -1 })
      .limit(4)
      .lean();

    const meals = await Meal.find({ isAvailable: true })
      .populate('cookId', 'displayName slug serviceAreas averageRating')
      .limit(6)
      .lean();

    const formattedMeals = meals.map((m: any) => ({
      ...m,
      _id: m._id.toString(),
      cookId: m.cookId?._id?.toString(),
      cookName: m.cookId?.displayName,
      cookSlug: m.cookId?.slug,
      cookServiceAreas: m.cookId?.serviceAreas || [],
      cookRating: m.cookId?.averageRating || 4.8,
    }));

    const formattedCooks = cooks.map((c: any) => ({
      ...c,
      _id: c._id.toString(),
      userId: c.userId.toString(),
    }));

    return { cooks: formattedCooks, meals: formattedMeals };
  } catch (error) {
    console.error('Failed to load featured data from database:', error);
    return { cooks: [], meals: [] };
  }
}

export default async function HomePage() {
  const { cooks, meals } = await getFeaturedData();

  const localities = ['Navrangpura', 'Vastrapur', 'Satellite', 'Bodakdev', 'Prahlad Nagar', 'Thaltej'];

  return (
    <div className="space-y-20 pb-16">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-darkGreen/10 border border-brand-darkGreen/20 text-brand-darkGreen text-xs font-semibold">
                <Sparkles className="w-4 h-4 text-brand-terracotta" />
                <span>Hyperlocal Homemade Food Marketplace</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-charcoal tracking-tight leading-[1.15]">
                A Little Taste of Home, <br className="hidden sm:block" />
                <span className="text-brand-darkGreen">Every Single Day.</span>
              </h1>

              <p className="text-base sm:text-lg text-brand-muted max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Discover local home cooks serving fresh, comforting meals made for your everyday life.
                No restaurant grease, no preservatives — just authentic home cooking.
              </p>

              {/* Locality Quick Selector */}
              <div className="p-3 bg-white rounded-2xl shadow-md border border-brand-border max-w-xl mx-auto lg:mx-0">
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-2 w-full sm:w-auto flex-1 text-sm text-brand-charcoal">
                    <MapPin className="w-4 h-4 text-brand-terracotta shrink-0" />
                    <select
                      className="w-full bg-transparent border-none text-sm font-semibold text-brand-charcoal focus:outline-none cursor-pointer"
                      defaultValue="Vastrapur"
                    >
                      <option value="" disabled>Select your delivery area</option>
                      {localities.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}, Ahmedabad
                        </option>
                      ))}
                    </select>
                  </div>

                  <Link href="/discover" className="w-full sm:w-auto">
                    <Button variant="default" size="default" className="w-full sm:w-auto px-6 gap-2">
                      <Search className="w-4 h-4" />
                      <span>Find Your Tiffin</span>
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-brand-muted font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% Domestic Kitchens
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Morning Cutoff Guarantee
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Single-Kitchen Freshness
                </span>
              </div>
            </div>

            {/* Right Food Collage */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-brand-cream relative">
                  <img
                    src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80"
                    alt="Authentic Homemade Indian Thali"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {/* Floating Cook Card */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-brand-border flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
                        alt="Asha Patel"
                        className="w-11 h-11 rounded-full object-cover border-2 border-brand-green"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-brand-charcoal">Asha's Gujarati Rasoi</h4>
                        <p className="text-[11px] text-brand-muted">Vastrapur • 4.9 ★ (84 reviews)</p>
                      </div>
                    </div>
                    <Badge variant="veg" className="text-[10px]">Pure Veg</Badge>
                  </div>
                </div>

                {/* Floating Decorative Badge */}
                <div className="absolute -top-4 -left-4 bg-brand-terracotta text-white p-3 rounded-2xl shadow-xl flex items-center gap-2 transform -rotate-3 hidden sm:flex">
                  <Heart className="w-4 h-4 fill-white" />
                  <span className="text-xs font-bold">Made with Love</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. How It Works (Section 9.1 IDEA.md) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <Badge variant="secondary">Simple 3-Step Journey</Badge>
          <h2 className="text-3xl font-extrabold text-brand-charcoal">How TiffinMitra Works</h2>
          <p className="text-sm text-brand-muted leading-relaxed">
            Getting everyday homemade meals delivered to your doorstep is effortless.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-brand-border text-center space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-2xl bg-brand-darkGreen/10 text-brand-darkGreen mx-auto flex items-center justify-center font-bold text-xl">
              1
            </div>
            <h3 className="text-lg font-bold text-brand-charcoal">Discover Local Home Cooks</h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              Explore authentic home chefs in your locality preparing Gujarati, Punjabi, South Indian, or Mughlai daily meals.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-brand-border text-center space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-2xl bg-brand-green/10 text-brand-green mx-auto flex items-center justify-center font-bold text-xl">
              2
            </div>
            <h3 className="text-lg font-bold text-brand-charcoal">Choose Meal or Tiffin Plan</h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              Order a single lunch or dinner, or subscribe to a weekly or monthly routine. Pause anytime with zero penalty.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-brand-border text-center space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-2xl bg-brand-terracotta/10 text-brand-terracotta mx-auto flex items-center justify-center font-bold text-xl">
              3
            </div>
            <h3 className="text-lg font-bold text-brand-charcoal">Enjoy Comfort Food</h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              Freshly cooked in small domestic batches with pure spices, delivered hot right on schedule to your doorstep.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Featured Home Cooks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <Badge variant="default" className="mb-2">Local Kitchens</Badge>
            <h2 className="text-3xl font-extrabold text-brand-charcoal">Featured Home Cooks</h2>
            <p className="text-sm text-brand-muted mt-1">
              Homemakers and passionate home chefs cooking with authentic family recipes.
            </p>
          </div>
          <Link href="/discover?view=cooks">
            <Button variant="outline" size="sm" className="gap-2">
              <span>View All Cooks</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cooks.map((cook) => (
            <CookCard key={cook._id} cook={cook as any} />
          ))}
        </div>
      </section>

      {/* 4. Popular Today's Meals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <Badge variant="terracotta" className="mb-2">Fresh From Kitchens</Badge>
            <h2 className="text-3xl font-extrabold text-brand-charcoal">Popular Daily Thalis</h2>
            <p className="text-sm text-brand-muted mt-1">
              Balanced, wholesome home-cooked lunch and dinner options ready for ordering.
            </p>
          </div>
          <Link href="/discover">
            <Button variant="outline" size="sm" className="gap-2">
              <span>Explore All Dishes</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {meals.map((meal) => (
            <MealCard key={meal._id} meal={meal as any} />
          ))}
        </div>
      </section>

      {/* 5. Subscriptions Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-brand-darkGreen text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-6">
            <Badge variant="outline" className="bg-white/10 text-emerald-200 border-white/20">
              Recurring Meal Plans
            </Badge>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Tired of deciding what to eat every day?
            </h2>

            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              Subscribe to a 5-Day Weekday or 14-Day Routine tiffin plan. Enjoy rotating menus, guaranteed morning delivery, and the flexibility to pause anytime before the morning cutoff with zero fees.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/subscriptions">
                <Button variant="terracotta" size="lg" className="gap-2">
                  <CalendarCheck className="w-5 h-5" />
                  <span>Explore Tiffin Subscriptions</span>
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button variant="outline" size="lg" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
                  How Subscriptions Work
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Become a Cook CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-brand-border bg-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2 text-brand-darkGreen">
              <ChefHat className="w-6 h-6 text-brand-green" />
              <span className="text-xs font-bold uppercase tracking-wider">Empowering Home Chefs</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-charcoal">
              Turn your cooking skills into sustainable income.
            </h2>
            <p className="text-sm text-brand-muted leading-relaxed">
              Join TiffinMitra as a verified home cook. Set your own menu, manage daily portion capacities, and serve delicious homemade food to nearby students and professionals.
            </p>
          </div>

          <Link href="/become-a-cook" className="shrink-0">
            <Button variant="default" size="lg" className="gap-2">
              <span>Apply to Become a Cook</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
