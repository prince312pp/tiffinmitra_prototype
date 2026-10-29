'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ChefHat } from 'lucide-react';

export function CartDrawer() {
  const {
    items,
    itemCount,
    cookName,
    cookSlug,
    subtotalMinor,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    updateQuantity,
    clearCart,
  } = useCart();

  if (!isCartDrawerOpen) return null;

  const deliveryFeeMinor = 3000; // ₹30
  const taxMinor = Math.round(subtotalMinor * 0.05); // 5% GST
  const totalMinor = subtotalMinor > 0 ? subtotalMinor + deliveryFeeMinor + taxMinor : 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart Drawer"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Backdrop */}
      <div
        onClick={() => setIsCartDrawerOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-brand-border flex items-center justify-between bg-brand-cream/40">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-darkGreen/10 flex items-center justify-center text-brand-darkGreen">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-brand-charcoal">Your Daily Tiffin Cart</h2>
                <p className="text-xs text-brand-muted">{itemCount} items</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-2 rounded-xl text-brand-muted hover:text-brand-charcoal hover:bg-black/5 transition-all"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Active Cook Banner */}
          {cookName && (
            <div className="px-6 py-3 bg-brand-darkGreen/5 border-b border-brand-border/60 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-brand-darkGreen font-semibold">
                <ChefHat className="w-4 h-4 text-brand-green" />
                <span>Cooked by: {cookName}</span>
              </div>
              {cookSlug && (
                <Link
                  href={`/cooks/${cookSlug}`}
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="text-brand-terracotta hover:underline font-semibold"
                >
                  View Menu
                </Link>
              )}
            </div>
          )}

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-brand-cream flex items-center justify-center text-brand-muted">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-brand-charcoal">Your cart is empty</h3>
                  <p className="text-xs text-brand-muted max-w-xs mt-1">
                    Explore delicious homemade thalis, parathas, and regional dishes from verified local cooks.
                  </p>
                </div>
                <Link href="/discover" onClick={() => setIsCartDrawerOpen(false)}>
                  <Button variant="default" size="sm">
                    Discover Homestyle Meals
                  </Button>
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.mealId}
                  className="flex items-start gap-3 p-3.5 rounded-xl border border-brand-border bg-white shadow-sm"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-brand-charcoal truncate">{item.name}</h4>
                    <p className="text-xs text-brand-muted truncate">{item.portionDescription}</p>
                    <p className="text-xs font-semibold text-brand-darkGreen mt-1">
                      {formatCurrency(item.priceMinor)}
                    </p>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="flex items-center border border-brand-border rounded-lg bg-brand-cream/50 overflow-hidden">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.mealId, item.quantity - 1)}
                        className="p-1.5 hover:bg-white text-brand-charcoal transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-brand-charcoal">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.mealId, item.quantity + 1)}
                        className="p-1.5 hover:bg-white text-brand-charcoal transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => updateQuantity(item.mealId, 0)}
                      className="p-1.5 text-brand-muted hover:text-red-600 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-brand-border bg-brand-cream/40 space-y-4">
              <div className="space-y-1.5 text-xs text-brand-charcoal">
                <div className="flex justify-between">
                  <span className="text-brand-muted">Item Subtotal</span>
                  <span className="font-semibold">{formatCurrency(subtotalMinor)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-muted">Estimated Delivery Fee</span>
                  <span className="font-semibold">{formatCurrency(deliveryFeeMinor)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-muted">Govt Taxes (5% GST)</span>
                  <span className="font-semibold">{formatCurrency(taxMinor)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold pt-2 border-t border-brand-border">
                  <span className="text-brand-charcoal">To Pay</span>
                  <span className="text-brand-darkGreen">{formatCurrency(totalMinor)}</span>
                </div>
              </div>

              <div className="flex gap-2.5">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearCart}
                  className="px-3 text-xs text-brand-muted"
                >
                  Clear
                </Button>
                <Link
                  href="/checkout"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="flex-1"
                >
                  <Button variant="default" className="w-full flex items-center justify-center gap-2">
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
