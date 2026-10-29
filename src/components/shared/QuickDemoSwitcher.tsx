'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Badge } from '@/components/ui/Badge';
import { UserCheck, Utensils, Shield, RefreshCw, ChevronUp, ChevronDown } from 'lucide-react';

export function QuickDemoSwitcher() {
  const { user, role, switchRole } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedMessage, setSeedMessage] = useState<string | null>(null);

  const handleReSeed = async () => {
    setIsSeeding(true);
    setSeedMessage(null);
    try {
      const res = await fetch('/api/v1/seed', { method: 'POST' });
      const json = await res.json();
      if (json.success) {
        setSeedMessage('✓ Demo data re-seeded!');
        setTimeout(() => {
          window.location.reload();
        }, 800);
      }
    } catch {
      setSeedMessage('✕ Seed failed');
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="fixed bottom-3 right-3 z-50">
      <div className="bg-white/95 backdrop-blur-md border border-brand-border shadow-xl rounded-2xl p-2.5 max-w-sm transition-all duration-200">
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between gap-3 cursor-pointer select-none px-2 py-1"
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-brand-charcoal">Demo Role Switcher</span>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="terracotta" className="text-[10px] py-0 px-2 uppercase font-mono">
              {role}
            </Badge>
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-brand-muted" />
            ) : (
              <ChevronUp className="w-4 h-4 text-brand-muted" />
            )}
          </div>
        </div>

        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-brand-border space-y-2 text-xs">
            <p className="text-[11px] text-brand-muted px-1">
              Currently signed in as: <strong className="text-brand-charcoal">{user?.name || 'Guest'}</strong>
            </p>

            <div className="grid grid-cols-3 gap-1.5 pt-1">
              <button
                type="button"
                onClick={() => switchRole('customer')}
                className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all ${
                  role === 'customer'
                    ? 'border-brand-darkGreen bg-brand-darkGreen text-white shadow-sm font-semibold'
                    : 'border-brand-border bg-brand-cream/50 hover:bg-white text-brand-charcoal'
                }`}
              >
                <UserCheck className="w-4 h-4 mb-1" />
                <span className="text-[10px]">Diner</span>
              </button>

              <button
                type="button"
                onClick={() => switchRole('cook')}
                className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all ${
                  role === 'cook'
                    ? 'border-brand-darkGreen bg-brand-darkGreen text-white shadow-sm font-semibold'
                    : 'border-brand-border bg-brand-cream/50 hover:bg-white text-brand-charcoal'
                }`}
              >
                <Utensils className="w-4 h-4 mb-1" />
                <span className="text-[10px]">Cook</span>
              </button>

              <button
                type="button"
                onClick={() => switchRole('admin')}
                className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all ${
                  role === 'admin'
                    ? 'border-brand-darkGreen bg-brand-darkGreen text-white shadow-sm font-semibold'
                    : 'border-brand-border bg-brand-cream/50 hover:bg-white text-brand-charcoal'
                }`}
              >
                <Shield className="w-4 h-4 mb-1" />
                <span className="text-[10px]">Admin</span>
              </button>
            </div>

            <div className="pt-2">
              <button
                type="button"
                disabled={isSeeding}
                onClick={handleReSeed}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg border border-brand-border bg-white text-brand-muted hover:text-brand-charcoal hover:bg-brand-cream text-[11px] font-medium transition-all"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSeeding ? 'animate-spin' : ''}`} />
                <span>{isSeeding ? 'Resetting MongoDB...' : 'Reset & Re-Seed Mock Data'}</span>
              </button>
              {seedMessage && (
                <p className="text-[10px] text-center text-emerald-700 font-semibold mt-1">
                  {seedMessage}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
