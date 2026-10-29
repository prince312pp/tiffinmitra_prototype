import React from 'react';
import Link from 'next/link';
import { ChefHat, Heart, ShieldCheck, Clock, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-brand-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-darkGreen flex items-center justify-center text-white shadow-sm">
                <ChefHat className="w-5 h-5 text-emerald-300" />
              </div>
              <span className="text-xl font-bold tracking-tight text-brand-darkGreen">TiffinMitra</span>
            </Link>
            <p className="text-sm text-brand-muted max-w-sm leading-relaxed">
              Homemade Food. Heartfelt Care. Connecting busy students and working professionals with local home cooks serving fresh, comforting everyday meals.
            </p>
            <div className="flex items-center gap-3 text-xs text-brand-muted pt-2">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> FSSAI Checked
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-brand-terracotta" /> Made to Order
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-brand-green" /> Hyperlocal
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-charcoal">Diners</h4>
            <ul className="space-y-2 text-sm text-brand-muted">
              <li><Link href="/discover" className="hover:text-brand-darkGreen transition-colors">Daily Thalis</Link></li>
              <li><Link href="/discover?view=cooks" className="hover:text-brand-darkGreen transition-colors">Local Cooks</Link></li>
              <li><Link href="/subscriptions" className="hover:text-brand-darkGreen transition-colors">Tiffin Subscriptions</Link></li>
              <li><Link href="/how-it-works" className="hover:text-brand-darkGreen transition-colors">How It Works</Link></li>
            </ul>
          </div>

          {/* Cook Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-charcoal">Home Cooks</h4>
            <ul className="space-y-2 text-sm text-brand-muted">
              <li><Link href="/become-a-cook" className="hover:text-brand-darkGreen transition-colors">Start Cooking</Link></li>
              <li><Link href="/cook/dashboard" className="hover:text-brand-darkGreen transition-colors">Cook Portal</Link></li>
              <li><Link href="/faq#cooks" className="hover:text-brand-darkGreen transition-colors">Cook Guidelines & FSSAI</Link></li>
            </ul>
          </div>

          {/* Legal & Trust */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-charcoal">Platform</h4>
            <ul className="space-y-2 text-sm text-brand-muted">
              <li><Link href="/about" className="hover:text-brand-darkGreen transition-colors">About Us</Link></li>
              <li><Link href="/faq" className="hover:text-brand-darkGreen transition-colors">FAQ & Support</Link></li>
              <li><Link href="/contact" className="hover:text-brand-darkGreen transition-colors">Contact</Link></li>
              <li><Link href="/admin/dashboard" className="hover:text-brand-darkGreen transition-colors">Admin Portal</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-muted">
          <p>© {new Date().getFullYear()} TiffinMitra Hyperlocal Food Marketplace. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3.5 h-3.5 text-brand-terracotta fill-brand-terracotta" /> for authentic Indian home kitchens.
          </p>
        </div>
      </div>
    </footer>
  );
}
