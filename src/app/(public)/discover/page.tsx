'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { IMeal, ICookProfile } from '@/lib/types';
import { MealCard } from '@/components/meals/MealCard';
import { CookCard } from '@/components/cooks/CookCard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Search, Filter, MapPin, ChefHat, Utensils, X } from 'lucide-react';

function DiscoverContent() {
  const searchParams = useSearchParams();
  const initialView = searchParams.get('view') === 'cooks' ? 'cooks' : 'meals';

  const [view, setView] = useState<'meals' | 'cooks'>(initialView);
  const [meals, setMeals] = useState<IMeal[]>([]);
  const [cooks, setCooks] = useState<ICookProfile[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [selectedLocality, setSelectedLocality] = useState('All');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [selectedDietary, setSelectedDietary] = useState('all');
  const [maxPrice, setMaxPrice] = useState(250);

  const localities = ['All', 'Navrangpura', 'Vastrapur', 'Satellite', 'Bodakdev', 'Prahlad Nagar', 'Thaltej'];
  const cuisines = ['All', 'Gujarati', 'Punjabi', 'South Indian', 'Mughlai', 'North Indian'];

  const fetchData = async () => {
    setLoading(true);
    try {
      if (view === 'meals') {
        const query = new URLSearchParams();
        if (search) query.set('q', search);
        if (selectedDietary !== 'all') query.set('dietary', selectedDietary);
        if (maxPrice < 250) query.set('maxPrice', maxPrice.toString());

        const res = await fetch(`/api/v1/meals?${query.toString()}`);
        const json = await res.json();
        if (json.success) {
          let list = json.data;
          if (selectedLocality !== 'All') {
            list = list.filter((m: any) => m.cookServiceAreas?.includes(selectedLocality));
          }
          if (selectedCuisine !== 'All') {
            list = list.filter((m: any) => m.category?.toLowerCase().includes(selectedCuisine.toLowerCase()) || m.name?.toLowerCase().includes(selectedCuisine.toLowerCase()));
          }
          setMeals(list);
        }
      } else {
        const query = new URLSearchParams();
        if (search) query.set('q', search);
        if (selectedLocality !== 'All') query.set('locality', selectedLocality);
        if (selectedCuisine !== 'All') query.set('cuisine', selectedCuisine);
        if (selectedDietary !== 'all') query.set('dietary', selectedDietary);

        const res = await fetch(`/api/v1/cooks?${query.toString()}`);
        const json = await res.json();
        if (json.success) {
          setCooks(json.data);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [view, search, selectedLocality, selectedCuisine, selectedDietary, maxPrice]);

  const clearFilters = () => {
    setSearch('');
    setSelectedLocality('All');
    setSelectedCuisine('All');
    setSelectedDietary('all');
    setMaxPrice(250);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header & View Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-brand-charcoal">
            {view === 'meals' ? 'Discover Homestyle Meals' : 'Explore Local Home Cooks'}
          </h1>
          <p className="text-sm text-brand-muted mt-1">
            Browse genuine, freshly prepared food cooked in certified domestic kitchens.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center p-1 bg-white rounded-xl border border-brand-border shadow-sm">
          <button
            type="button"
            onClick={() => setView('meals')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              view === 'meals'
                ? 'bg-brand-darkGreen text-white shadow-sm'
                : 'text-brand-charcoal hover:bg-brand-cream'
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>Dishes & Thalis</span>
          </button>
          <button
            type="button"
            onClick={() => setView('cooks')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              view === 'cooks'
                ? 'bg-brand-darkGreen text-white shadow-sm'
                : 'text-brand-charcoal hover:bg-brand-cream'
            }`}
          >
            <ChefHat className="w-3.5 h-3.5" />
            <span>Home Cooks</span>
          </button>
        </div>
      </div>

      {/* Search Bar & Filter Strip */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-brand-border shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search by dish name, cook, or ingredient (e.g. Rajma, Gujarati, Phulka)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-brand-border bg-brand-cream/30 text-sm focus:outline-none focus:ring-2 focus:ring-brand-darkGreen"
            />
          </div>

          {/* Locality Selector */}
          <div className="sm:col-span-3">
            <select
              value={selectedLocality}
              onChange={(e) => setSelectedLocality(e.target.value)}
              className="w-full h-11 px-3 rounded-xl border border-brand-border bg-brand-cream/30 text-xs font-semibold text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-darkGreen cursor-pointer"
            >
              {localities.map((loc) => (
                <option key={loc} value={loc}>
                  {loc === 'All' ? '📍 All Localities' : `📍 ${loc}`}
                </option>
              ))}
            </select>
          </div>

          {/* Cuisine Selector */}
          <div className="sm:col-span-3">
            <select
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
              className="w-full h-11 px-3 rounded-xl border border-brand-border bg-brand-cream/30 text-xs font-semibold text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-darkGreen cursor-pointer"
            >
              {cuisines.map((c) => (
                <option key={c} value={c}>
                  {c === 'All' ? '🍲 All Cuisines' : `🍲 ${c}`}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Dietary Filters Pill Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-brand-border/60">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-brand-muted mr-1">Dietary:</span>
            {[
              { id: 'all', label: 'All' },
              { id: 'veg', label: 'Pure Veg', variant: 'veg' },
              { id: 'jain', label: 'Jain (No Root Veg)', variant: 'jain' },
              { id: 'nonVeg', label: 'Non-Veg', variant: 'nonVeg' },
              { id: 'vegan', label: 'Vegan', variant: 'vegan' },
            ].map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setSelectedDietary(d.id)}
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                  selectedDietary === d.id
                    ? 'bg-brand-darkGreen text-white border-brand-darkGreen shadow-sm'
                    : 'bg-white text-brand-charcoal border-brand-border hover:bg-brand-cream'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          {(search || selectedLocality !== 'All' || selectedCuisine !== 'All' || selectedDietary !== 'all') && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-xs text-brand-terracotta hover:underline font-semibold flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid Results */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-10 h-10 border-4 border-brand-darkGreen/20 border-t-brand-darkGreen rounded-full animate-spin mx-auto" />
          <p className="text-sm text-brand-muted">Loading fresh food options...</p>
        </div>
      ) : view === 'meals' ? (
        meals.length === 0 ? (
          <div className="bg-white rounded-2xl border border-brand-border p-12 text-center space-y-4">
            <Utensils className="w-12 h-12 text-brand-muted mx-auto" />
            <h3 className="text-lg font-bold text-brand-charcoal">No dishes match your filters</h3>
            <p className="text-xs text-brand-muted max-w-sm mx-auto">
              Try selecting "All Localities" or clearing the dietary filter to see more delicious home cooking.
            </p>
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {meals.map((meal) => (
              <MealCard key={meal._id} meal={meal} />
            ))}
          </div>
        )
      ) : cooks.length === 0 ? (
        <div className="bg-white rounded-2xl border border-brand-border p-12 text-center space-y-4">
          <ChefHat className="w-12 h-12 text-brand-muted mx-auto" />
          <h3 className="text-lg font-bold text-brand-charcoal">No home cooks found in this area</h3>
          <p className="text-xs text-brand-muted max-w-sm mx-auto">
            Try switching to another locality or clearing your filters.
          </p>
          <Button variant="outline" size="sm" onClick={clearFilters}>
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cooks.map((cook) => (
            <CookCard key={cook._id} cook={cook} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function DiscoverPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-sm text-brand-muted">
          Loading marketplace...
        </div>
      }
    >
      <DiscoverContent />
    </Suspense>
  );
}
