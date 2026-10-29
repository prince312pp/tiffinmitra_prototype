'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How is TiffinMitra different from restaurant food delivery apps?',
      a: 'TiffinMitra exclusively features certified home cooks and homemakers preparing everyday home-style meals (thalis, parathas, khichdi, sambhar). Meals are prepared in small domestic batches with low oil, hand-ground spices, zero artificial colors, and no heavy restaurant grease.',
    },
    {
      q: 'Why can I only order from one cook per cart?',
      a: 'Unlike industrial restaurant clouds, our cooks prepare meals in independent domestic kitchens with their own preparation timings. Bundling items from different homes in one delivery is operationally impractical. If you add an item from another cook, our transparent modal lets you choose whether to keep your current order or clear and start fresh.',
    },
    {
      q: 'How does the Morning Cutoff Pause Guarantee work for subscriptions?',
      a: 'If you have a weekly or monthly subscription plan, you can pause upcoming deliveries directly from your Interactive Delivery Calendar. For lunch deliveries, pause before 8:00 AM; for dinner deliveries, pause before 3:00 PM. Pausing automatically extends your subscription end date by 1 day with zero cancellation charge.',
    },
    {
      q: 'How are home cooks verified on TiffinMitra?',
      a: 'Every home chef must submit an onboarding application with kitchen hygiene photos, identity verification, and FSSAI registration details. Platform administrators manually inspect each kitchen application before approving the storefront.',
    },
    {
      q: 'What is the simulated payment system in this prototype?',
      a: 'In accordance with IDEA.md Section 13, this prototype features an assimilated development payment adapter. You can test both instant payment success and bank decline scenarios safely without real money. All transactions, prices in paise, and order snapshots are recorded immutably in MongoDB.',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      <div className="text-center space-y-3">
        <Badge variant="secondary">Got Questions?</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-charcoal">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-brand-muted">
          Everything you need to know about TiffinMitra's food, subscriptions, and kitchens.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-brand-border overflow-hidden transition-all shadow-sm"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-brand-charcoal select-none"
              >
                <span>{faq.q}</span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-brand-darkGreen shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-brand-muted shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-brand-muted leading-relaxed border-t border-brand-border/40">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
