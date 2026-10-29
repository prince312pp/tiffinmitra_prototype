'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { IMeal } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Clock, Plus, Flame, ChefHat } from 'lucide-react';

export function MealCard({ meal }: { meal: IMeal }) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAdding(true);
    await addToCart(meal, 1);
    setIsAdding(false);
  };

  const isLowPortion = meal.availableQuantity <= 10;

  return (
    <div className="group rounded-2xl border border-brand-border bg-white overflow-hidden shadow-sm hover:shadow-md hover:border-brand-green/30 transition-all duration-200 flex flex-col">
      {/* Photo with badges */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-cream">
        <img
          src={meal.imageUrl}
          alt={meal.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Dietary Badge */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {meal.dietaryLabels.map((tag) => (
            <Badge key={tag} variant={tag as any} className="shadow-sm capitalize">
              {tag === 'veg' ? 'Pure Veg' : tag === 'nonVeg' ? 'Non-Veg' : tag}
            </Badge>
          ))}
        </div>

        {/* Remaining Portions (Section 5 UI_UX) */}
        {isLowPortion && (
          <div className="absolute bottom-3 left-3 bg-brand-charcoal/80 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow">
            <Flame className="w-3.5 h-3.5 text-brand-terracotta" />
            <span>Only {meal.availableQuantity} left today</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {meal.cookName && (
            <Link
              href={`/cooks/${meal.cookSlug}`}
              className="inline-flex items-center gap-1.5 text-xs text-brand-muted hover:text-brand-darkGreen font-medium transition-colors"
            >
              <ChefHat className="w-3.5 h-3.5 text-brand-green" />
              <span>{meal.cookName}</span>
            </Link>
          )}

          <h3 className="text-base font-bold text-brand-charcoal group-hover:text-brand-darkGreen transition-colors line-clamp-1">
            {meal.name}
          </h3>

          <p className="text-xs text-brand-muted line-clamp-2 leading-relaxed">
            {meal.description}
          </p>

          <p className="text-[11px] text-brand-muted/90 bg-brand-cream/60 px-2.5 py-1.5 rounded-lg border border-brand-border/40 font-mono">
            {meal.portionDescription}
          </p>
        </div>

        {/* Bottom Price & Add to Cart */}
        <div className="pt-2 border-t border-brand-border/60 flex items-center justify-between">
          <div>
            <span className="text-xs text-brand-muted block">Price</span>
            <span className="text-lg font-bold text-brand-darkGreen">
              {formatCurrency(meal.priceMinor)}
            </span>
          </div>

          <Button
            size="sm"
            variant="default"
            isLoading={isAdding}
            onClick={handleAdd}
            className="rounded-xl px-4 flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
