import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | 'default'
    | 'secondary'
    | 'terracotta'
    | 'outline'
    | 'veg'
    | 'jain'
    | 'nonVeg'
    | 'vegan'
    | 'success'
    | 'warning'
    | 'destructive';
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  const baseStyles = 'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border';

  const variants = {
    default: 'bg-brand-darkGreen/10 text-brand-darkGreen border-brand-darkGreen/20',
    secondary: 'bg-brand-green/10 text-brand-green border-brand-green/20',
    terracotta: 'bg-brand-terracotta/10 text-brand-terracotta border-brand-terracotta/20',
    outline: 'border-brand-border bg-white text-brand-charcoal',
    // Dietary tokens
    veg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    jain: 'bg-amber-50 text-amber-800 border-amber-200',
    nonVeg: 'bg-rose-50 text-rose-800 border-rose-200',
    vegan: 'bg-sky-50 text-sky-800 border-sky-200',
    // Status tokens
    success: 'bg-green-50 text-green-800 border-green-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    destructive: 'bg-red-50 text-red-800 border-red-200',
  };

  return (
    <span className={cn(baseStyles, variants[variant], className)} {...props}>
      {variant === 'veg' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>}
      {variant === 'jain' && <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>}
      {variant === 'nonVeg' && <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>}
      {variant === 'vegan' && <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span>}
      {children}
    </span>
  );
}
