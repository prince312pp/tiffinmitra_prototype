'use client';

import React, { useState, useEffect } from 'react';
import { ISubscription, ISubscriptionPlan } from '@/lib/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  CalendarCheck,
  Calendar,
  Clock,
  ShieldCheck,
  PauseCircle,
  PlayCircle,
  CheckCircle2,
  ChefHat,
  Sparkles,
} from 'lucide-react';

function SubscriptionCalendar({
  sub,
  onToggleDate,
}: {
  sub: ISubscription;
  onToggleDate: (dateStr: string) => Promise<void>;
}) {
  const [loadingDate, setLoadingDate] = useState<string | null>(null);

  // Generate 14 day dates starting from startDate
  const dates = [];
  const start = new Date(sub.startDate);
  for (let i = 0; i < 14; i++) {
    const d = new Date(start.getTime() + i * 24 * 60 * 60 * 1000);
    const dateStr = d.toISOString().split('T')[0];
    dates.push({
      dateStr,
      dayName: d.toLocaleDateString('en-IN', { weekday: 'short' }),
      dayNum: d.getDate(),
      month: d.toLocaleDateString('en-IN', { month: 'short' }),
      isPaused: sub.pausedDates?.includes(dateStr),
    });
  }

  const handleToggle = async (dateStr: string) => {
    setLoadingDate(dateStr);
    await onToggleDate(dateStr);
    setLoadingDate(null);
  };

  return (
    <div className="space-y-4 pt-4 border-t border-brand-border/60">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-brand-charcoal flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-brand-darkGreen" />
          <span>Interactive Delivery Calendar & Morning Cutoff Control</span>
        </h4>
        <div className="flex items-center gap-3 text-[11px] text-brand-muted">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Scheduled
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Paused (Extended)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-7 gap-2.5">
        {dates.map((d) => (
          <button
            key={d.dateStr}
            type="button"
            disabled={loadingDate === d.dateStr}
            onClick={() => handleToggle(d.dateStr)}
            className={`p-3 rounded-xl border text-center transition-all ${
              d.isPaused
                ? 'bg-amber-50 border-amber-300 text-amber-900 shadow-sm'
                : 'bg-white border-brand-border text-brand-charcoal hover:border-brand-darkGreen'
            }`}
          >
            <p className="text-[10px] uppercase font-semibold text-brand-muted">{d.dayName}</p>
            <p className="text-lg font-extrabold">{d.dayNum}</p>
            <p className="text-[10px] text-brand-muted">{d.month}</p>

            <div className="mt-2 pt-1 border-t border-brand-border/60 text-[10px] font-bold">
              {d.isPaused ? (
                <span className="text-amber-700 flex items-center justify-center gap-0.5">
                  <PlayCircle className="w-3 h-3" /> Resume
                </span>
              ) : (
                <span className="text-brand-darkGreen flex items-center justify-center gap-0.5">
                  <PauseCircle className="w-3 h-3" /> Pause
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="p-3 bg-brand-cream/80 rounded-xl text-[11px] text-brand-muted leading-relaxed border border-brand-border/60">
        <strong className="text-brand-charcoal">Morning Cutoff Guarantee: </strong>
        Click any day to pause meal delivery (e.g. if you are traveling). The system automatically extends your plan end date by 1 day with zero cancellation charge.
      </div>
    </div>
  );
}

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<ISubscription[]>([]);
  const [plans, setPlans] = useState<ISubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const fetchSubs = async () => {
    try {
      const [subRes, planRes] = await Promise.all([
        fetch('/api/v1/subscriptions'),
        fetch('/api/v1/subscriptions?type=plans'),
      ]);
      const subJson = await subRes.json();
      const planJson = await planRes.json();
      if (subJson.success) setSubscriptions(subJson.data || []);
      if (planJson.success) setPlans(planJson.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubs();
  }, []);

  const handleTogglePause = async (subId: string, dateStr: string) => {
    try {
      const res = await fetch(`/api/v1/subscriptions/${subId}/pause`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dateStr }),
      });
      const json = await res.json();
      if (json.success) {
        setFeedbackMessage(json.message);
        fetchSubs();
      }
    } catch {
      alert('Error updating subscription schedule');
    }
  };

  const handlePurchasePlan = async (planId: string) => {
    try {
      const res = await fetch('/api/v1/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId }),
      });
      const json = await res.json();
      if (json.success) {
        setFeedbackMessage('✓ Subscribed successfully! Simulated payment confirmed.');
        fetchSubs();
      } else {
        alert(json.error || 'Failed to purchase plan');
      }
    } catch {
      alert('Error purchasing subscription plan');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div>
        <Badge variant="secondary" className="mb-2">Recurring Daily Meals</Badge>
        <h1 className="text-3xl font-extrabold text-brand-charcoal">Tiffin Meal Subscriptions</h1>
        <p className="text-sm text-brand-muted mt-1">
          Enjoy predictable, comforting home-cooked lunches and dinners without re-ordering every day.
        </p>
      </div>

      {feedbackMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2 shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{feedbackMessage}</span>
        </div>
      )}

      {/* Active Subscriptions Section */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-brand-charcoal">My Active Subscriptions</h2>

        {loading ? (
          <div className="py-12 text-center text-xs text-brand-muted">Loading subscriptions...</div>
        ) : subscriptions.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-brand-border text-center space-y-3">
            <CalendarCheck className="w-10 h-10 text-brand-muted mx-auto" />
            <h3 className="text-base font-bold text-brand-charcoal">No active meal subscriptions</h3>
            <p className="text-xs text-brand-muted max-w-sm mx-auto">
              Choose from the verified cook meal plans below to start receiving daily homemade tiffins.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {subscriptions.map((sub) => (
              <div
                key={sub._id}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-border shadow-sm space-y-6"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-lg text-brand-charcoal">
                        {sub.planName}
                      </span>
                      <Badge variant="success">Active</Badge>
                    </div>
                    <p className="text-xs text-brand-muted flex items-center gap-1.5">
                      <ChefHat className="w-3.5 h-3.5 text-brand-green" />
                      <span>Cooked by: <strong>{sub.cookName}</strong></span>
                      <span>•</span>
                      <span>Valid until {formatDate(sub.endDate)}</span>
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-brand-muted block">Prepaid Plan Total</span>
                    <span className="text-lg font-extrabold text-brand-darkGreen">
                      {formatCurrency(sub.totalMinor)}
                    </span>
                  </div>
                </div>

                <SubscriptionCalendar
                  sub={sub}
                  onToggleDate={(dateStr) => handleTogglePause(sub._id, dateStr)}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Available Plans Catalog */}
      <section className="space-y-6 pt-6 border-t border-brand-border">
        <div>
          <h2 className="text-xl font-bold text-brand-charcoal">Available Subscription Plans</h2>
          <p className="text-xs text-brand-muted mt-1">
            Carefully curated daily tiffins with pure spices, soft rotis, and balanced nutrition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan._id}
              className="bg-white p-6 rounded-2xl border border-brand-border shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{plan.durationDays} Days Plan</Badge>
                  <span className="text-base font-extrabold text-brand-darkGreen">
                    {formatCurrency(plan.priceMinor)}
                  </span>
                </div>

                <h3 className="text-base font-bold text-brand-charcoal">{plan.name}</h3>
                <p className="text-xs text-brand-muted leading-relaxed">{plan.description}</p>

                <div className="p-3 bg-brand-cream/60 rounded-xl space-y-1 text-xs">
                  <p className="font-semibold text-brand-charcoal">Daily rotating items:</p>
                  <ul className="list-disc list-inside text-brand-muted space-y-0.5">
                    {plan.mealDefinitions.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <Button
                variant="default"
                size="sm"
                onClick={() => handlePurchasePlan(plan._id)}
                className="w-full gap-2 shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Start Subscription ({formatCurrency(plan.priceMinor)})</span>
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
