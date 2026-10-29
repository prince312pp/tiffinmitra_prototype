'use client';

import React, { useState } from 'react';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ShieldCheck, Smartphone, CreditCard, Building2, Banknote, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface PaymentSimulatorProps {
  totalMinor: number;
  onConfirmPayment: (method: 'upi' | 'card' | 'netbanking' | 'cod', scenario: 'success' | 'failure') => Promise<void>;
  isLoading: boolean;
  errorMessage?: string;
}

export function PaymentSimulator({
  totalMinor,
  onConfirmPayment,
  isLoading,
  errorMessage,
}: PaymentSimulatorProps) {
  const [selectedMethod, setSelectedMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [simulatedScenario, setSimulatedScenario] = useState<'success' | 'failure'>('success');

  const methods = [
    {
      id: 'upi',
      name: 'Simulated UPI',
      description: 'Google Pay, PhonePe, Paytm, BHIM',
      icon: Smartphone,
      recommended: true,
    },
    {
      id: 'card',
      name: 'Credit / Debit Card',
      description: 'Visa, Mastercard, RuPay',
      icon: CreditCard,
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      description: 'HDFC, SBI, ICICI, Axis & 50+ Banks',
      icon: Building2,
    },
    {
      id: 'cod',
      name: 'Pay on Delivery (COD)',
      description: 'Cash or QR code upon home delivery',
      icon: Banknote,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Simulation Notice Banner */}
      <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 text-amber-900 text-xs flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-amber-950">Development Simulated Payment Gateway</p>
          <p className="text-amber-800 leading-relaxed">
            This checkout uses an isolated development adapter in accordance with <code>IDEA.md</code> Section 13.
            No real money is charged. You can test both successful checkout and bank failure retry scenarios.
          </p>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="space-y-3">
        <label className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal">
          Select Payment Method
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {methods.map((method) => {
            const Icon = method.icon;
            const isSelected = selectedMethod === method.id;
            return (
              <div
                key={method.id}
                onClick={() => setSelectedMethod(method.id as any)}
                className={`relative flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-brand-darkGreen bg-brand-darkGreen/5 shadow-sm'
                    : 'border-brand-border bg-white hover:border-brand-green/40'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-brand-darkGreen text-white' : 'bg-brand-cream text-brand-charcoal'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-brand-charcoal">{method.name}</span>
                    {method.recommended && (
                      <Badge variant="veg" className="text-[10px] py-0 px-1.5">
                        Popular
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-brand-muted truncate mt-0.5">{method.description}</p>
                </div>
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center mt-1 ${
                    isSelected ? 'border-brand-darkGreen bg-brand-darkGreen' : 'border-gray-300'
                  }`}
                >
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Simulator Scenario Controller */}
      <div className="p-4 bg-brand-cream/60 rounded-xl border border-brand-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-charcoal">
            Simulation Test Scenario
          </span>
          <Badge variant={simulatedScenario === 'success' ? 'success' : 'destructive'}>
            {simulatedScenario === 'success' ? 'Scenario: Success' : 'Scenario: Bank Decline'}
          </Badge>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setSimulatedScenario('success')}
            className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
              simulatedScenario === 'success'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'bg-white text-brand-charcoal border-brand-border hover:bg-gray-50'
            }`}
          >
            ✓ Test Instant Success
          </button>
          <button
            type="button"
            onClick={() => setSimulatedScenario('failure')}
            className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
              simulatedScenario === 'failure'
                ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                : 'bg-white text-brand-charcoal border-brand-border hover:bg-gray-50'
            }`}
          >
            ✕ Test Bank Decline / Retry
          </button>
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* CTA Button */}
      <Button
        variant="default"
        size="lg"
        isLoading={isLoading}
        onClick={() => onConfirmPayment(selectedMethod, simulatedScenario)}
        className="w-full text-base py-6 shadow-md"
      >
        <span>Pay {formatCurrency(totalMinor)} via Simulated {selectedMethod.toUpperCase()}</span>
      </Button>
    </div>
  );
}
