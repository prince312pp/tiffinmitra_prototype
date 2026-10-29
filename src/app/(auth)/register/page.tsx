'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ChefHat } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<'customer' | 'cook'>('customer');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone, role }),
      });
      const json = await res.json();
      if (json.success) {
        window.location.href = role === 'cook' ? '/cook/dashboard' : '/discover';
      } else {
        setError(json.error || 'Failed to create account');
      }
    } catch {
      setError('An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-8">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-brand-darkGreen flex items-center justify-center text-white mx-auto shadow-md">
          <ChefHat className="w-6 h-6 text-emerald-300" />
        </div>
        <h1 className="text-2xl font-extrabold text-brand-charcoal">Join TiffinMitra</h1>
        <p className="text-xs text-brand-muted">Fresh, comforting meals made for your everyday life.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-brand-border shadow-sm space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-700 rounded-xl">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-2 p-1 bg-brand-cream/60 rounded-xl border border-brand-border/60">
          <button
            type="button"
            onClick={() => setRole('customer')}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              role === 'customer'
                ? 'bg-brand-darkGreen text-white shadow-sm'
                : 'text-brand-charcoal hover:bg-white'
            }`}
          >
            I want to Order Food
          </button>
          <button
            type="button"
            onClick={() => setRole('cook')}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              role === 'cook'
                ? 'bg-brand-darkGreen text-white shadow-sm'
                : 'text-brand-charcoal hover:bg-white'
            }`}
          >
            I am a Home Cook
          </button>
        </div>

        <Input
          label="Full Name"
          placeholder="e.g. Rahul Sharma"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="name@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="+91 98765 43210"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <Input
          label="Create Password"
          type="password"
          placeholder="••••••••"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" variant="default" className="w-full mt-2" isLoading={isLoading}>
          Create Account
        </Button>

        <p className="text-center text-xs text-brand-muted pt-2">
          Already have an account?{' '}
          <Link href="/login" className="text-brand-darkGreen font-bold hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
