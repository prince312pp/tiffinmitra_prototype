'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { User, MapPin, Package, CalendarCheck, ShieldCheck, Phone, Mail } from 'lucide-react';

export default function ProfilePage() {
  const { user, role, logout } = useAuth();

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-brand-charcoal">Please sign in to view your profile</h2>
        <Link href="/login">
          <Button variant="default">Sign In</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Profile Overview */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-border shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-brand-darkGreen/10 flex items-center justify-center font-bold text-xl text-brand-darkGreen">
            {user.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-brand-charcoal">{user.name}</h1>
              <Badge variant="terracotta" className="uppercase text-[10px]">
                {role}
              </Badge>
            </div>
            <p className="text-xs text-brand-muted flex items-center gap-1.5 mt-1">
              <Mail className="w-3.5 h-3.5" />
              <span>{user.email}</span>
              {user.phone && (
                <>
                  <span>•</span>
                  <Phone className="w-3.5 h-3.5" />
                  <span>{user.phone}</span>
                </>
              )}
            </p>
          </div>
        </div>

        <Button variant="outline" size="sm" onClick={logout} className="text-red-600 hover:bg-red-50">
          Sign Out
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Saved Addresses */}
        <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-charcoal flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-terracotta" />
              <span>Saved Addresses</span>
            </h3>
            <Badge variant="outline">{user.addresses?.length || 0} saved</Badge>
          </div>

          <div className="space-y-3">
            {user.addresses && user.addresses.length > 0 ? (
              user.addresses.map((addr: any, idx: number) => (
                <div key={idx} className="p-3.5 rounded-xl border border-brand-border bg-brand-cream/40 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-brand-charcoal">{addr.label}</span>
                    {addr.isDefault && <Badge variant="veg" className="text-[10px]">Default</Badge>}
                  </div>
                  <p className="text-brand-charcoal">{addr.addressLine1}</p>
                  <p className="text-brand-muted">{addr.locality}, {addr.city} - {addr.postalCode}</p>
                  {addr.deliveryInstructions && (
                    <p className="text-brand-muted italic mt-1">Note: {addr.deliveryInstructions}</p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-xs text-brand-muted">No saved addresses found.</p>
            )}
          </div>
        </div>

        {/* Quick Shortcuts */}
        <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-sm space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-brand-charcoal">
            Quick Shortcuts
          </h3>

          <div className="space-y-2.5">
            <Link
              href="/orders"
              className="flex items-center justify-between p-3.5 rounded-xl border border-brand-border hover:bg-brand-cream/50 transition-colors text-xs font-semibold text-brand-charcoal"
            >
              <div className="flex items-center gap-2.5">
                <Package className="w-4 h-4 text-brand-green" />
                <span>My Past Orders & Tracking</span>
              </div>
              <span>→</span>
            </Link>

            <Link
              href="/subscriptions"
              className="flex items-center justify-between p-3.5 rounded-xl border border-brand-border hover:bg-brand-cream/50 transition-colors text-xs font-semibold text-brand-charcoal"
            >
              <div className="flex items-center gap-2.5">
                <CalendarCheck className="w-4 h-4 text-brand-green" />
                <span>Manage Meal Subscriptions & Morning Cutoff</span>
              </div>
              <span>→</span>
            </Link>

            <Link
              href="/become-a-cook"
              className="flex items-center justify-between p-3.5 rounded-xl border border-brand-border hover:bg-brand-cream/50 transition-colors text-xs font-semibold text-brand-charcoal"
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-brand-terracotta" />
                <span>Become a Home Cook / Onboarding</span>
              </div>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
