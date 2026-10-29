'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ICartItem, IMeal } from '@/lib/types';
import { useAuth } from './AuthContext';

interface CartContextType {
  cookId: string | null;
  cookName: string | null;
  cookSlug: string | null;
  items: ICartItem[];
  itemCount: number;
  subtotalMinor: number;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  addToCart: (meal: IMeal, quantity?: number, replaceCart?: boolean) => Promise<boolean>;
  updateQuantity: (mealId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  // Single-cook conflict state
  conflictModalOpen: boolean;
  currentConflictCook: string;
  pendingNewMeal: { meal: IMeal; quantity: number } | null;
  resolveConflict: (replace: boolean) => Promise<void>;
}

const CartContext = createContext<CartContextType>({
  cookId: null,
  cookName: null,
  cookSlug: null,
  items: [],
  itemCount: 0,
  subtotalMinor: 0,
  isCartDrawerOpen: false,
  setIsCartDrawerOpen: () => {},
  addToCart: async () => false,
  updateQuantity: async () => {},
  clearCart: async () => {},
  conflictModalOpen: false,
  currentConflictCook: '',
  pendingNewMeal: null,
  resolveConflict: async () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [cookId, setCookId] = useState<string | null>(null);
  const [cookName, setCookName] = useState<string | null>(null);
  const [cookSlug, setCookSlug] = useState<string | null>(null);
  const [items, setItems] = useState<ICartItem[]>([]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  // Conflict modal state
  const [conflictModalOpen, setConflictModalOpen] = useState(false);
  const [currentConflictCook, setCurrentConflictCook] = useState('');
  const [pendingNewMeal, setPendingNewMeal] = useState<{ meal: IMeal; quantity: number } | null>(null);

  const fetchCart = async () => {
    try {
      const res = await fetch('/api/v1/cart');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setCookId(json.data.cookId);
          setCookName(json.data.cookName);
          setCookSlug(json.data.cookSlug);
          setItems(json.data.items || []);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = async (meal: IMeal, quantity = 1, replaceCart = false): Promise<boolean> => {
    // If not logged in, prompt or quick login
    if (!user) {
      window.location.href = '/login';
      return false;
    }

    try {
      const res = await fetch('/api/v1/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mealId: meal._id,
          quantity,
          replaceCart,
        }),
      });

      const json = await res.json();

      if (res.status === 409 && json.conflict) {
        // Single cook invariant triggered! Show accessible prompt dialog
        setCurrentConflictCook(json.currentCookName);
        setPendingNewMeal({ meal, quantity });
        setConflictModalOpen(true);
        return false;
      }

      if (json.success && json.data) {
        setCookId(json.data.cookId);
        setCookName(json.data.cookName);
        setCookSlug(json.data.cookSlug);
        setItems(json.data.items || []);
        setIsCartDrawerOpen(true);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const resolveConflict = async (replace: boolean) => {
    if (replace && pendingNewMeal) {
      await addToCart(pendingNewMeal.meal, pendingNewMeal.quantity, true);
    }
    setConflictModalOpen(false);
    setPendingNewMeal(null);
  };

  const updateQuantity = async (mealId: string, quantity: number) => {
    try {
      const res = await fetch('/api/v1/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mealId, quantity }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        setCookId(json.data.cookId);
        setCookName(json.data.cookName);
        setCookSlug(json.data.cookSlug);
        setItems(json.data.items || []);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const clearCart = async () => {
    try {
      await fetch('/api/v1/cart', { method: 'DELETE' });
      setCookId(null);
      setCookName(null);
      setCookSlug(null);
      setItems([]);
    } catch (e) {
      console.error(e);
    }
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotalMinor = items.reduce((sum, item) => sum + item.priceMinor * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cookId,
        cookName,
        cookSlug,
        items,
        itemCount,
        subtotalMinor,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        addToCart,
        updateQuantity,
        clearCart,
        conflictModalOpen,
        currentConflictCook,
        pendingNewMeal,
        resolveConflict,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
