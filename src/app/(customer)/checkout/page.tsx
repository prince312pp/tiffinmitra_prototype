'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { PaymentSimulator } from '@/components/checkout/PaymentSimulator';
import {
  MapPin,
  Clock,
  ChefHat,
  ShoppingBag,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  Building,
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { items, cookName, subtotalMinor, clearCart } = useCart();

  const [deliveryMode, setDeliveryMode] = useState<'delivery' | 'pickup'>('delivery');
  const [deliverySlot, setDeliverySlot] = useState('Lunch (12:30 PM - 01:30 PM)');
  const [customerNotes, setCustomerNotes] = useState('');

  // Address state
  const defaultAddress = user?.addresses?.[0] || {
    recipientName: user?.name || 'Rahul Sharma',
    phone: user?.phone || '+91 98765 43210',
    addressLine1: 'Flat 402, Shivalik Residency, Near Vastrapur Lake',
    locality: 'Vastrapur',
    city: 'Ahmedabad',
    postalCode: '380015',
    instructions: 'Ring doorbell on 4th floor',
  };

  const [address, setAddress] = useState(defaultAddress);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const deliveryFeeMinor = deliveryMode === 'delivery' ? 3000 : 0;
  const taxMinor = Math.round(subtotalMinor * 0.05);
  const totalMinor = subtotalMinor > 0 ? subtotalMinor + deliveryFeeMinor + taxMinor : 0;

  const handleConfirmPayment = async (
    method: 'upi' | 'card' | 'netbanking' | 'cod',
    scenario: 'success' | 'failure'
  ) => {
    setIsProcessing(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/v1/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deliveryMode,
          deliveryAddress: address,
          deliverySlot,
          paymentMethod: method,
          customerNotes,
          simulatedScenario: scenario,
        }),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        // Successful checkout!
        router.push(`/orders/${json.data.order._id}?justPlaced=true`);
      } else {
        setErrorMessage(
          json.error || 'Simulated payment failed: Bank rejected transaction or timeout. Please retry.'
        );
      }
    } catch (e: any) {
      setErrorMessage(e.message || 'Network error occurred during simulated checkout');
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-brand-cream flex items-center justify-center text-brand-muted mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-brand-charcoal">Your cart is empty</h2>
        <p className="text-sm text-brand-muted max-w-sm mx-auto">
          Please add a delicious homemade meal from a local cook before proceeding to checkout.
        </p>
        <Link href="/discover">
          <Button variant="default">Discover Meals</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back button */}
      <Link href="/discover" className="inline-flex items-center gap-1.5 text-xs text-brand-muted hover:text-brand-darkGreen font-semibold">
        <ArrowLeft className="w-4 h-4" />
        <span>Continue exploring meals</span>
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-brand-charcoal">Review & Checkout</h1>
          <p className="text-sm text-brand-muted mt-0.5">
            Single-kitchen fresh food delivery • Prepared with motherly care
          </p>
        </div>
        <Badge variant="veg" className="hidden sm:inline-flex">
          100% Domestic Kitchen
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Form: Delivery, Slot, Notes & Simulated Payment */}
        <div className="lg:col-span-7 space-y-8">
          {/* 1. Delivery Mode Toggle */}
          <div className="bg-white p-6 rounded-2xl border border-brand-border space-y-4 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-charcoal flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-terracotta" />
              <span>Fulfillment Arrangement</span>
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDeliveryMode('delivery')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  deliveryMode === 'delivery'
                    ? 'border-brand-darkGreen bg-brand-darkGreen/5 font-semibold text-brand-charcoal'
                    : 'border-brand-border hover:bg-brand-cream/50 text-brand-muted'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-brand-charcoal">Doorstep Delivery</span>
                  <span className="text-xs text-brand-darkGreen font-semibold">₹30</span>
                </div>
                <p className="text-xs text-brand-muted">Hot tiffin delivered right to your door</p>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryMode('pickup')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  deliveryMode === 'pickup'
                    ? 'border-brand-darkGreen bg-brand-darkGreen/5 font-semibold text-brand-charcoal'
                    : 'border-brand-border hover:bg-brand-cream/50 text-brand-muted'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-brand-charcoal">Kitchen Self-Pickup</span>
                  <span className="text-xs text-brand-darkGreen font-semibold">FREE</span>
                </div>
                <p className="text-xs text-brand-muted">Pick up fresh directly from cook's kitchen</p>
              </button>
            </div>

            {/* Address fields */}
            {deliveryMode === 'delivery' && (
              <div className="pt-4 border-t border-brand-border/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-brand-charcoal">Delivery Address:</span>
                  <Badge variant="outline" className="text-[10px]">Primary Home Address</Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    label="Recipient Name"
                    value={address.recipientName}
                    onChange={(e) => setAddress({ ...address, recipientName: e.target.value })}
                  />
                  <Input
                    label="Phone Number"
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  />
                </div>
                <Input
                  label="Street Address / Flat / Floor"
                  value={address.addressLine1}
                  onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Locality"
                    value={address.locality}
                    onChange={(e) => setAddress({ ...address, locality: e.target.value })}
                  />
                  <Input
                    label="PIN Code"
                    value={address.postalCode}
                    onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                  />
                </div>
              </div>
            )}
          </div>

          {/* 2. Delivery Time Slot */}
          <div className="bg-white p-6 rounded-2xl border border-brand-border space-y-3 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-charcoal flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-green" />
              <span>Requested Meal Slot</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { slot: 'Lunch (12:30 PM - 01:30 PM)', label: 'Lunch Tiffin Slot' },
                { slot: 'Dinner (07:30 PM - 08:30 PM)', label: 'Dinner Tiffin Slot' },
              ].map((item) => (
                <div
                  key={item.slot}
                  onClick={() => setDeliverySlot(item.slot)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    deliverySlot === item.slot
                      ? 'border-brand-darkGreen bg-brand-darkGreen/5 shadow-sm font-semibold'
                      : 'border-brand-border hover:bg-brand-cream/50'
                  }`}
                >
                  <p className="text-xs font-bold text-brand-charcoal">{item.label}</p>
                  <p className="text-xs text-brand-muted mt-0.5">{item.slot}</p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Input
                label="Kitchen Notes / Food Instructions (Optional)"
                placeholder="e.g. Please make dal slightly less spicy, extra salad..."
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
              />
            </div>
          </div>

          {/* 3. Assimilated Payment System */}
          <div className="bg-white p-6 rounded-2xl border border-brand-border space-y-4 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-charcoal flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-darkGreen" />
              <span>Simulated Payment Gateway</span>
            </h3>

            <PaymentSimulator
              totalMinor={totalMinor}
              onConfirmPayment={handleConfirmPayment}
              isLoading={isProcessing}
              errorMessage={errorMessage}
            />
          </div>
        </div>

        {/* Right Sticky Order Summary */}
        <div className="lg:col-span-5 sticky top-28 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-brand-border">
              <div>
                <h3 className="text-base font-bold text-brand-charcoal">Order Summary</h3>
                <p className="text-xs text-brand-muted flex items-center gap-1 mt-0.5">
                  <ChefHat className="w-3.5 h-3.5 text-brand-green" />
                  <span>Kitchen: {cookName}</span>
                </p>
              </div>
              <Badge variant="secondary">{items.length} items</Badge>
            </div>

            {/* Items list */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.mealId} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-10 h-10 rounded-lg object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-brand-charcoal truncate">{item.name}</p>
                      <p className="text-[11px] text-brand-muted">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-brand-charcoal shrink-0">
                    {formatCurrency(item.priceMinor * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Breakdown */}
            <div className="pt-4 border-t border-brand-border space-y-2 text-xs text-brand-charcoal">
              <div className="flex justify-between">
                <span className="text-brand-muted">Items Subtotal</span>
                <span className="font-semibold">{formatCurrency(subtotalMinor)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">
                  {deliveryMode === 'delivery' ? 'Delivery Fee' : 'Self-Pickup'}
                </span>
                <span className="font-semibold">{formatCurrency(deliveryFeeMinor)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">Govt Taxes (5% GST)</span>
                <span className="font-semibold">{formatCurrency(taxMinor)}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold pt-3 border-t border-brand-border text-brand-charcoal">
                <span>Final Payable</span>
                <span className="text-brand-darkGreen">{formatCurrency(totalMinor)}</span>
              </div>
            </div>

            {/* Invariant guarantee note */}
            <div className="p-3 bg-brand-cream rounded-xl border border-brand-border/60 text-[11px] text-brand-muted leading-relaxed">
              <span className="font-semibold text-brand-charcoal">Single Cook Guarantee: </span>
              All items in this order are prepared in the domestic kitchen of <strong>{cookName}</strong> and delivered together hot and fresh.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
