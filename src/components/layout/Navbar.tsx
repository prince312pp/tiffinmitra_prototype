'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  ShoppingBag,
  Menu,
  X,
  ChefHat,
  User,
  Shield,
  Utensils,
  LogOut,
  CalendarCheck,
  Package,
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const { user, role, logout } = useAuth();
  const { itemCount, setIsCartDrawerOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { label: 'Discover Meals', href: '/discover' },
    { label: 'Explore Cooks', href: '/discover?view=cooks' },
    { label: 'Meal Plans', href: '/subscriptions' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Become a Cook', href: '/become-a-cook' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FFF8EE]/95 backdrop-blur-md border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-brand-darkGreen flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <ChefHat className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-brand-darkGreen">TiffinMitra</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-terracotta bg-brand-terracotta/10 px-1.5 py-0.5 rounded">
                  Prototype
                </span>
              </div>
              <p className="text-[11px] text-brand-muted hidden sm:block">Homemade Food. Heartfelt Care.</p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors duration-150 ${
                    isActive ? 'text-brand-darkGreen border-b-2 border-brand-darkGreen pb-1' : 'text-brand-charcoal/80 hover:text-brand-darkGreen'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & User Controls */}
          <div className="flex items-center gap-3">
            {/* Cart Trigger */}
            <button
              type="button"
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative p-2.5 rounded-xl border border-brand-border bg-white text-brand-charcoal hover:bg-brand-cream/60 transition-all shadow-sm flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-darkGreen"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5 text-brand-darkGreen" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-brand-terracotta text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                  {itemCount}
                </span>
              )}
            </button>

            {/* User Dropdown / Auth CTA */}
            {user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pl-3 pr-2 rounded-xl border border-brand-border bg-white hover:bg-brand-cream/50 transition-all shadow-sm"
                >
                  <div className="text-left hidden sm:block">
                    <p className="text-xs font-bold text-brand-charcoal leading-none truncate max-w-[100px]">
                      {user.name.split(' ')[0]}
                    </p>
                    <p className="text-[10px] text-brand-muted capitalize mt-0.5">{role}</p>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-brand-darkGreen/10 flex items-center justify-center text-brand-darkGreen font-bold text-xs">
                    {user.name.charAt(0)}
                  </div>
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div
                    onClick={() => setUserDropdownOpen(false)}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-brand-border py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  >
                    <div className="px-4 py-2 border-b border-brand-border/60">
                      <p className="text-xs font-bold text-brand-charcoal">{user.name}</p>
                      <p className="text-[11px] text-brand-muted truncate">{user.email}</p>
                      <Badge variant="terracotta" className="mt-1.5 text-[10px] uppercase font-mono">
                        Role: {role}
                      </Badge>
                    </div>

                    <div className="py-1">
                      {role === 'customer' && (
                        <>
                          <Link
                            href="/orders"
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-brand-charcoal hover:bg-brand-cream"
                          >
                            <Package className="w-4 h-4 text-brand-green" />
                            <span>My Orders</span>
                          </Link>
                          <Link
                            href="/subscriptions"
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-brand-charcoal hover:bg-brand-cream"
                          >
                            <CalendarCheck className="w-4 h-4 text-brand-green" />
                            <span>Meal Subscriptions</span>
                          </Link>
                          <Link
                            href="/profile"
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-brand-charcoal hover:bg-brand-cream"
                          >
                            <User className="w-4 h-4 text-brand-green" />
                            <span>Saved Addresses & Profile</span>
                          </Link>
                        </>
                      )}

                      {role === 'cook' && (
                        <>
                          <Link
                            href="/cook/dashboard"
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-brand-charcoal hover:bg-brand-cream"
                          >
                            <Utensils className="w-4 h-4 text-brand-darkGreen" />
                            <span>Kitchen Orders Queue</span>
                          </Link>
                          <Link
                            href="/cook/menu"
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-brand-charcoal hover:bg-brand-cream"
                          >
                            <ChefHat className="w-4 h-4 text-brand-darkGreen" />
                            <span>Manage Dishes & Portions</span>
                          </Link>
                        </>
                      )}

                      {role === 'admin' && (
                        <>
                          <Link
                            href="/admin/dashboard"
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-brand-charcoal hover:bg-brand-cream"
                          >
                            <Shield className="w-4 h-4 text-brand-terracotta" />
                            <span>Admin Portal & Stats</span>
                          </Link>
                          <Link
                            href="/admin/applications"
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-brand-charcoal hover:bg-brand-cream"
                          >
                            <ChefHat className="w-4 h-4 text-brand-terracotta" />
                            <span>Cook Applications Queue</span>
                          </Link>
                        </>
                      )}
                    </div>

                    <div className="pt-1 border-t border-brand-border/60">
                      <button
                        type="button"
                        onClick={logout}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    Log in
                  </Button>
                </Link>
                <Link href="/discover" className="hidden sm:inline-flex">
                  <Button variant="default" size="sm">
                    Find Tiffin
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-brand-charcoal md:hidden focus-visible:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-brand-border bg-white px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-150">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 px-3 rounded-xl text-sm font-semibold text-brand-charcoal hover:bg-brand-cream"
            >
              {link.label}
            </Link>
          ))}
          {role === 'cook' && (
            <Link
              href="/cook/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 px-3 rounded-xl text-sm font-bold text-brand-darkGreen bg-brand-darkGreen/10"
            >
              🍳 Kitchen Dashboard
            </Link>
          )}
          {role === 'admin' && (
            <Link
              href="/admin/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 px-3 rounded-xl text-sm font-bold text-brand-terracotta bg-brand-terracotta/10"
            >
              🛡️ Admin Operations
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
