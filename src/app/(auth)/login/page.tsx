'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { ChefHat, UserCheck, Utensils, Shield, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, switchRole } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    const success = await login(email, password);
    setIsLoading(false);
    if (success) {
      router.push('/discover');
    } else {
      setError('Invalid email or password. You can also use the 1-click demo login buttons below.');
    }
  };

  const handleQuickLogin = async (role: 'customer' | 'cook' | 'admin') => {
    setIsLoading(true);
    await switchRole(role);
    setIsLoading(false);
    if (role === 'cook') {
      router.push('/cook/dashboard');
    } else if (role === 'admin') {
      router.push('/admin/dashboard');
    } else {
      router.push('/discover');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-8">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-brand-darkGreen flex items-center justify-center text-white mx-auto shadow-md">
          <ChefHat className="w-6 h-6 text-emerald-300" />
        </div>
        <h1 className="text-2xl font-extrabold text-brand-charcoal">Sign in to TiffinMitra</h1>
        <p className="text-xs text-brand-muted">Homemade Food. Heartfelt Care.</p>
      </div>

      {/* 1-Click Demo Accounts Box */}
      <div className="bg-brand-darkGreen/5 p-5 rounded-2xl border border-brand-darkGreen/20 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-brand-darkGreen uppercase tracking-wider">
            1-Click Demo Access
          </span>
          <Badge variant="veg" className="text-[10px]">Instant Login</Badge>
        </div>
        <p className="text-xs text-brand-muted">
          Select any role to test the prototype instantly without entering passwords:
        </p>

        <div className="grid grid-cols-3 gap-2 pt-1">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleQuickLogin('customer')}
            className="flex-col h-auto py-2.5 text-xs gap-1 border-brand-darkGreen/30 hover:bg-white"
          >
            <UserCheck className="w-4 h-4 text-brand-darkGreen" />
            <span className="font-bold">Diner</span>
            <span className="text-[10px] text-brand-muted font-normal">Rahul S.</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleQuickLogin('cook')}
            className="flex-col h-auto py-2.5 text-xs gap-1 border-brand-green/30 hover:bg-white"
          >
            <Utensils className="w-4 h-4 text-brand-green" />
            <span className="font-bold">Home Cook</span>
            <span className="text-[10px] text-brand-muted font-normal">Asha P.</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleQuickLogin('admin')}
            className="flex-col h-auto py-2.5 text-xs gap-1 border-brand-terracotta/30 hover:bg-white"
          >
            <Shield className="w-4 h-4 text-brand-terracotta" />
            <span className="font-bold">Admin</span>
            <span className="text-[10px] text-brand-muted font-normal">Operator</span>
          </Button>
        </div>
      </div>

      {/* Standard Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-brand-border shadow-sm space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-700 rounded-xl">
            {error}
          </div>
        )}

        <Input
          label="Email Address"
          type="email"
          placeholder="name@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" variant="default" className="w-full mt-2" isLoading={isLoading}>
          Sign In
        </Button>

        <p className="text-center text-xs text-brand-muted pt-2">
          New to TiffinMitra?{' '}
          <Link href="/register" className="text-brand-darkGreen font-bold hover:underline">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}
