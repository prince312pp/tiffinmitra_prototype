'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from './Button';
import { AlertCircle, ChefHat } from 'lucide-react';

export function SingleCookModal() {
  const { conflictModalOpen, currentConflictCook, pendingNewMeal, resolveConflict } = useCart();

  if (!conflictModalOpen || !pendingNewMeal) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-brand-border">
        <div className="flex items-center gap-3 text-brand-terracotta mb-4">
          <div className="w-10 h-10 rounded-full bg-brand-terracotta/10 flex items-center justify-center">
            <ChefHat className="w-5 h-5" />
          </div>
          <div>
            <h3 id="modal-title" className="text-lg font-bold text-brand-charcoal">
              Replace items in cart?
            </h3>
            <p className="text-xs text-brand-muted">Single-Kitchen Freshness Invariant</p>
          </div>
        </div>

        <p className="text-sm text-brand-charcoal leading-relaxed mb-4">
          Your cart already contains delicious dishes freshly prepared by{' '}
          <strong className="text-brand-darkGreen font-semibold">{currentConflictCook}</strong>.
        </p>

        <div className="p-3 bg-brand-cream rounded-xl border border-brand-border/60 text-xs text-brand-muted leading-relaxed mb-6">
          <span className="font-semibold text-brand-charcoal">Why this rule? </span>
          Unlike industrial restaurant factories, TiffinMitra orders are cooked in separate domestic home kitchens with independent preparation timings and cannot be bundled into a single delivery.
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={() => resolveConflict(false)}
            className="flex-1 order-2 sm:order-1"
          >
            Keep Current Order
          </Button>
          <Button
            variant="terracotta"
            onClick={() => resolveConflict(true)}
            className="flex-1 order-1 sm:order-2"
          >
            Clear & Add New Item
          </Button>
        </div>
      </div>
    </div>
  );
}
