import React from 'react';
import Link from 'next/link';
import { ICookProfile } from '@/lib/types';
import { Badge } from '@/components/ui/Badge';
import { Star, MapPin, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

export function CookCard({ cook }: { cook: ICookProfile }) {
  return (
    <div className="group rounded-2xl border border-brand-border bg-white overflow-hidden shadow-sm hover:shadow-md hover:border-brand-green/30 transition-all duration-200 flex flex-col">
      {/* Cover Image */}
      <div className="relative h-36 w-full bg-brand-cream overflow-hidden">
        <img
          src={cook.coverImage}
          alt={cook.displayName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-brand-charcoal flex items-center gap-1 shadow">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{cook.averageRating}</span>
          <span className="text-[10px] text-brand-muted font-normal">({cook.reviewCount})</span>
        </div>

        {/* FSSAI Badge */}
        {cook.kitchenHygieneCertified && (
          <div className="absolute bottom-3 left-3 bg-emerald-950/80 backdrop-blur-md text-emerald-300 text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>FSSAI Inspected</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <div className="flex items-center gap-3">
            <img
              src={cook.profileImage}
              alt={cook.displayName}
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow -mt-8 relative z-10 shrink-0"
            />
            <div className="min-w-0">
              <h3 className="text-base font-bold text-brand-charcoal truncate group-hover:text-brand-darkGreen transition-colors">
                {cook.displayName}
              </h3>
              <p className="text-xs text-brand-muted flex items-center gap-1 truncate">
                <MapPin className="w-3.5 h-3.5 text-brand-green shrink-0" />
                <span>{cook.serviceAreas.join(', ')}</span>
              </p>
            </div>
          </div>

          <p className="text-xs text-brand-muted line-clamp-2 leading-relaxed">
            {cook.bio}
          </p>

          {/* Cuisines */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {cook.cuisineTypes.map((c) => (
              <Badge key={c} variant="outline" className="text-[11px] py-0.5">
                {c}
              </Badge>
            ))}
          </div>
        </div>

        {/* Footer info & CTA */}
        <div className="pt-3 border-t border-brand-border/60 flex items-center justify-between text-xs text-brand-muted">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-brand-terracotta" />
            <span>{cook.preparationTimeMinutes} min prep</span>
          </div>

          <Link
            href={`/cooks/${cook.slug}`}
            className="inline-flex items-center gap-1 font-bold text-brand-darkGreen hover:text-brand-green transition-colors"
          >
            <span>View Menu</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
