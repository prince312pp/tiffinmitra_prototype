'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { IMeal } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { ChefHat, Plus, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function CookMenuPage() {
  const [meals, setMeals] = useState<IMeal[]>([]);
  const [loading, setLoading] = useState(true);

  // New meal form
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [priceRupees, setPriceRupees] = useState('150');
  const [description, setDescription] = useState('');
  const [portionDescription, setPortionDescription] = useState('1 Person Standard Thali (4 Phulkas, Sabzi, Dal, Rice)');
  const [dietary, setDietary] = useState<'veg' | 'jain' | 'nonVeg'>('veg');
  const [availableQuantity, setAvailableQuantity] = useState(15);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const fetchMeals = async () => {
    try {
      const res = await fetch('/api/v1/cook/meals');
      const json = await res.json();
      if (json.success) setMeals(json.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const handleToggleAvailability = async (mealId: string, currentStatus: boolean) => {
    try {
      const res = await fetch('/api/v1/cook/meals', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mealId, isAvailable: !currentStatus }),
      });
      const json = await res.json();
      if (json.success) {
        setMeals((prev) =>
          prev.map((m) => (m._id === mealId ? { ...m, isAvailable: !currentStatus } : m))
        );
      }
    } catch {
      alert('Error updating dish availability');
    }
  };

  const handleAddMeal = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMsg(null);
    try {
      const priceMinor = Math.round(parseFloat(priceRupees) * 100);
      const res = await fetch('/api/v1/cook/meals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          priceMinor,
          description,
          portionDescription,
          dietaryLabels: [dietary],
          availableQuantity: Number(availableQuantity),
        }),
      });
      const json = await res.json();
      if (json.success) {
        setSuccessMsg(`✓ Dish "${name}" added to today's active menu!`);
        setShowAddForm(false);
        setName('');
        setDescription('');
        fetchMeals();
      } else {
        alert(json.error || 'Failed to add meal');
      }
    } catch {
      alert('Error adding meal');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Link href="/cook/dashboard" className="inline-flex items-center gap-1.5 text-xs text-brand-muted hover:text-brand-darkGreen font-semibold">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Kitchen Orders</span>
      </Link>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-brand-charcoal">Menu & Inventory Management</h1>
          <p className="text-sm text-brand-muted mt-1">
            Configure daily portions, prices in paise, and dietary classifications.
          </p>
        </div>

        <Button
          variant="default"
          size="sm"
          onClick={() => setShowAddForm(!showAddForm)}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>{showAddForm ? 'Close Form' : 'Add New Daily Dish'}</span>
        </Button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Add New Meal Form */}
      {showAddForm && (
        <form onSubmit={handleAddMeal} className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-border shadow-sm space-y-4">
          <h3 className="text-base font-bold text-brand-charcoal">Add New Fresh Dish</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Dish / Thali Name"
              placeholder="e.g. Gujarati Undhiyu & Puri Thali"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              label="Price (INR ₹)"
              type="number"
              min="30"
              max="1000"
              required
              value={priceRupees}
              onChange={(e) => setPriceRupees(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal mb-1.5">
                Dietary Type
              </label>
              <select
                value={dietary}
                onChange={(e) => setDietary(e.target.value as any)}
                className="w-full h-11 px-3 rounded-xl border border-brand-border bg-white text-xs font-semibold text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-darkGreen"
              >
                <option value="veg">Pure Veg</option>
                <option value="jain">Jain (No Root Veg)</option>
                <option value="nonVeg">Non-Veg</option>
              </select>
            </div>

            <Input
              label="Daily Remaining Portions"
              type="number"
              min="1"
              max="100"
              required
              value={availableQuantity}
              onChange={(e) => setAvailableQuantity(Number(e.target.value))}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal mb-1.5">
              Description
            </label>
            <textarea
              rows={2}
              placeholder="Details of ingredients, preparation style, and spices..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border border-brand-border p-3 text-xs focus:outline-none focus:ring-2 focus:ring-brand-darkGreen"
            />
          </div>

          <Input
            label="Portion Description"
            value={portionDescription}
            onChange={(e) => setPortionDescription(e.target.value)}
          />

          <Button type="submit" variant="default" isLoading={isSubmitting}>
            Publish to Storefront
          </Button>
        </form>
      )}

      {/* Dishes List */}
      <div className="space-y-4">
        {loading ? (
          <div className="py-12 text-center text-xs text-brand-muted">Loading menu items...</div>
        ) : meals.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-brand-border text-center text-xs text-brand-muted">
            No dishes published yet. Click "Add New Daily Dish" to get started!
          </div>
        ) : (
          meals.map((meal) => (
            <div
              key={meal._id}
              className="bg-white p-5 rounded-2xl border border-brand-border shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 min-w-0">
                <img
                  src={meal.imageUrl}
                  alt={meal.name}
                  className="w-14 h-14 rounded-xl object-cover shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-brand-charcoal truncate">{meal.name}</h3>
                    <Badge variant={meal.dietaryLabels[0] as any} className="text-[10px]">
                      {meal.dietaryLabels[0]}
                    </Badge>
                  </div>
                  <p className="text-xs text-brand-muted truncate mt-0.5">{meal.portionDescription}</p>
                  <p className="text-xs font-bold text-brand-darkGreen mt-1">
                    {formatCurrency(meal.priceMinor)} • {meal.availableQuantity} portions left today
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => handleToggleAvailability(meal._id, meal.isAvailable)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    meal.isAvailable
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : 'bg-gray-100 text-gray-600 border-gray-300'
                  }`}
                >
                  {meal.isAvailable ? '✓ Available for Order' : '✕ Out of Stock'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
