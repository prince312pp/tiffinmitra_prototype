import React from 'react';
import { notFound } from 'next/navigation';
import { connectDB } from '@/lib/db';
import CookProfile from '@/models/CookProfile';
import Meal from '@/models/Meal';
import SubscriptionPlan from '@/models/SubscriptionPlan';
import Review from '@/models/Review';
import { MealCard } from '@/components/meals/MealCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatCurrency, formatDate } from '@/lib/utils';
import {
  Star,
  MapPin,
  Clock,
  ShieldCheck,
  CalendarCheck,
  ChefHat,
  Heart,
  MessageSquare,
} from 'lucide-react';

async function getCookStorefront(slug: string) {
  await connectDB();
  const cook = await CookProfile.findOne({ slug, applicationStatus: 'approved' }).lean();
  if (!cook) return null;

  const meals = await Meal.find({ cookId: cook._id }).lean();
  const plans = await SubscriptionPlan.find({ cookId: cook._id, isActive: true }).lean();
  const reviews = await Review.find({ cookId: cook._id }).sort({ createdAt: -1 }).lean();

  return {
    cook: { ...cook, _id: cook._id.toString(), userId: cook.userId.toString() },
    meals: meals.map((m: any) => ({
      ...m,
      _id: m._id.toString(),
      cookId: cook._id.toString(),
      cookName: cook.displayName,
      cookSlug: cook.slug,
      cookServiceAreas: cook.serviceAreas,
    })),
    plans: plans.map((p: any) => ({ ...p, _id: p._id.toString(), cookId: cook._id.toString() })),
    reviews: reviews.map((r: any) => ({ ...r, _id: r._id.toString() })),
  };
}

export default async function CookStorefrontPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getCookStorefront(params.slug);
  if (!data) notFound();

  const { cook, meals, plans, reviews } = data;

  return (
    <div className="space-y-12 pb-16">
      {/* Cover & Cook Header */}
      <div className="relative">
        <div className="h-64 sm:h-80 w-full bg-brand-cream relative overflow-hidden">
          <img
            src={cook.coverImage}
            alt={cook.displayName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-20">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-brand-border flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <img
                src={cook.profileImage}
                alt={cook.displayName}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-white shadow-md shrink-0"
              />
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-charcoal">
                    {cook.displayName}
                  </h1>
                  {cook.kitchenHygieneCertified && (
                    <Badge variant="success" className="gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>FSSAI Certified</span>
                    </Badge>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-brand-muted max-w-xl leading-relaxed">
                  {cook.bio}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-brand-muted pt-1">
                  <span className="flex items-center gap-1 font-bold text-brand-charcoal">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{cook.averageRating}</span>
                    <span className="text-brand-muted font-normal">({cook.reviewCount} verified reviews)</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-green" />
                    <span>Delivers to: {cook.serviceAreas.join(', ')}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-brand-terracotta" />
                    <span>{cook.operatingHours}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {cook.cuisineTypes.map((c: string) => (
                <Badge key={c} variant="outline" className="text-xs">
                  {c}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Daily Menu Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-brand-charcoal">Daily Fresh Menu</h2>
              <p className="text-xs text-brand-muted mt-1">
                Cooked fresh today in small domestic batches. Single kitchen delivery rule applies.
              </p>
            </div>
            <Badge variant="veg">{meals.length} Dishes Available</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {meals.map((meal: any) => (
              <MealCard key={meal._id} meal={meal} />
            ))}
          </div>
        </section>

        {/* Subscription Plans Section */}
        {plans.length > 0 && (
          <section className="space-y-6 pt-6 border-t border-brand-border">
            <div>
              <h2 className="text-2xl font-extrabold text-brand-charcoal">Tiffin Meal Plans</h2>
              <p className="text-xs text-brand-muted mt-1">
                Pre-book recurring meals with morning cutoff pause guarantee.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plans.map((plan: any) => (
                <div
                  key={plan._id}
                  className="p-6 rounded-2xl border border-brand-border bg-white shadow-sm flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{plan.durationDays} Days Routine</Badge>
                      <span className="text-lg font-bold text-brand-darkGreen">
                        {formatCurrency(plan.priceMinor)}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-brand-charcoal">{plan.name}</h3>
                    <p className="text-xs text-brand-muted leading-relaxed">{plan.description}</p>

                    <div className="p-3 bg-brand-cream/60 rounded-xl space-y-1.5 text-xs">
                      <p className="font-semibold text-brand-charcoal">What's included daily:</p>
                      <ul className="list-disc list-inside text-brand-muted space-y-0.5">
                        {plan.mealDefinitions.map((d: string, i: number) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <a href={`/subscriptions?cookId=${cook._id}`}>
                    <Button variant="default" size="sm" className="w-full gap-2">
                      <CalendarCheck className="w-4 h-4" />
                      <span>Subscribe to Plan</span>
                    </Button>
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Verified Reviews Section */}
        <section className="space-y-6 pt-6 border-t border-brand-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-brand-charcoal">Verified Customer Reviews</h2>
              <p className="text-xs text-brand-muted mt-1">
                Only diners who received a delivered order can review this cook.
              </p>
            </div>
            <div className="flex items-center gap-1 font-bold text-sm text-brand-darkGreen">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{cook.averageRating} Average Rating</span>
            </div>
          </div>

          {reviews.length === 0 ? (
            <div className="p-8 bg-white rounded-2xl border border-brand-border text-center text-xs text-brand-muted">
              No reviews submitted yet for this cook. Order a meal and be the first to share your experience!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reviews.map((rev: any) => (
                <div
                  key={rev._id}
                  className="p-5 rounded-2xl border border-brand-border bg-white space-y-2 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-brand-darkGreen/10 flex items-center justify-center font-bold text-xs text-brand-darkGreen">
                        {rev.customerName.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-brand-charcoal">{rev.customerName}</h4>
                        <p className="text-[10px] text-brand-muted">{formatDate(rev.createdAt)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-brand-muted leading-relaxed pt-1">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
