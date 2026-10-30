'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { IOrder, ICookProfile } from '@/lib/types';
import { formatCurrency, formatDateTime } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Utensils,
  Clock,
  ChefHat,
  CheckCircle2,
  XCircle,
  Truck,
  Flame,
  AlertCircle,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export default function CookDashboardPage() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [cook, setCook] = useState<ICookProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeActionId, setActiveActionId] = useState<string | null>(null);

  const fetchCookData = async () => {
    try {
      const [orderRes, statsRes] = await Promise.all([
        fetch('/api/v1/orders?role=cook'),
        fetch('/api/v1/cook/stats'),
      ]);
      const orderJson = await orderRes.json();
      const statsJson = await statsRes.json();

      if (orderJson.success) setOrders(orderJson.data || []);
      if (statsJson.success) {
        setStats(statsJson.data.stats);
        setCook(statsJson.data.cook);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCookData();
    const interval = setInterval(fetchCookData, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleUpdateStatus = async (orderId: string, nextStatus: string) => {
    setActiveActionId(orderId);
    try {
      const res = await fetch(`/api/v1/orders/${orderId}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      const json = await res.json();
      if (json.success) {
        fetchCookData();
      } else {
        alert(json.error || 'Failed to update order status');
      }
    } catch {
      alert('Error updating status');
    } finally {
      setActiveActionId(null);
    }
  };

  const pendingOrders = orders.filter((o) => o.orderStatus === 'placed');
  const activeOrders = orders.filter((o) => ['accepted', 'preparing', 'ready_for_pickup', 'out_for_delivery'].includes(o.orderStatus));
  const completedOrders = orders.filter((o) => o.orderStatus === 'delivered' || o.orderStatus === 'cancelled');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-darkGreen">
              Home Cook Kitchen Portal
            </span>
            <Badge variant="veg">Kitchen Live</Badge>
          </div>
          <h1 className="text-3xl font-extrabold text-brand-charcoal mt-1">
            {cook?.displayName || "Asha's Gujarati Rasoi"}
          </h1>
          <p className="text-xs text-brand-muted mt-1">
            Serviceable areas: {cook?.serviceAreas?.join(', ') || 'Navrangpura, Vastrapur, Bodakdev'} • FSSAI: {cook?.fssaiNumber || '21223010000456'}
          </p>
        </div>

        <Link href="/cook/menu">
          <Button variant="default" size="sm" className="gap-2">
            <ChefHat className="w-4 h-4" />
            <span>Manage Menu & Daily Portions</span>
          </Button>
        </Link>
      </div>

      {/* Metrics Row */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-brand-border shadow-sm space-y-1">
            <p className="text-xs text-brand-muted font-medium">Pending Orders</p>
            <p className="text-2xl font-extrabold text-brand-terracotta">{stats.pendingCount}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-brand-border shadow-sm space-y-1">
            <p className="text-xs text-brand-muted font-medium">In Kitchen Preparation</p>
            <p className="text-2xl font-extrabold text-brand-green">{stats.preparingCount}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-brand-border shadow-sm space-y-1">
            <p className="text-xs text-brand-muted font-medium">Completed Deliveries</p>
            <p className="text-2xl font-extrabold text-brand-darkGreen">{stats.completedCount}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-brand-border shadow-sm space-y-1">
            <p className="text-xs text-brand-muted font-medium">Gross Kitchen Value</p>
            <p className="text-2xl font-extrabold text-brand-darkGreen">
              {formatCurrency(stats.grossSalesMinor)}
            </p>
          </div>
        </div>
      )}

      {/* Live Incoming Orders Queue */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-brand-charcoal flex items-center gap-2">
            <Flame className="w-5 h-5 text-brand-terracotta" />
            <span>Incoming Orders (Action Required)</span>
          </h2>
          <Badge variant={pendingOrders.length > 0 ? 'terracotta' : 'outline'}>
            {pendingOrders.length} New Requests
          </Badge>
        </div>

        {pendingOrders.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-brand-border text-center text-xs text-brand-muted">
            ✓ No pending order requests right now. New customer orders will show here with instant action buttons.
          </div>
        ) : (
          <div className="space-y-4">
            {pendingOrders.map((order) => (
              <div
                key={order._id}
                className="bg-white p-6 rounded-2xl border-2 border-brand-terracotta/40 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-base text-brand-charcoal">{order.orderNumber}</span>
                    <Badge variant="terracotta">Needs Acceptance</Badge>
                    <span className="text-xs text-brand-muted">• Slot: {order.deliverySlot}</span>
                  </div>

                  <p className="text-xs text-brand-charcoal font-semibold">
                    Customer: {order.customerName} ({order.customerPhone})
                  </p>

                  <div className="text-xs text-brand-muted">
                    {order.items.map((it) => `${it.mealName} × ${it.quantity}`).join(', ')}
                  </div>

                  {order.customerNotes && (
                    <p className="text-xs text-brand-terracotta font-medium bg-brand-cream/60 p-2 rounded-lg">
                      Note: "{order.customerNotes}"
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    isLoading={activeActionId === order._id}
                    onClick={() => handleUpdateStatus(order._id, 'rejected')}
                    className="text-red-600 hover:bg-red-50"
                  >
                    Reject
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    isLoading={activeActionId === order._id}
                    onClick={() => handleUpdateStatus(order._id, 'accepted')}
                    className="shadow-sm"
                  >
                    Accept Order ({formatCurrency(order.totalMinor)})
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Orders In Preparation Stage */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-brand-charcoal flex items-center gap-2">
          <Clock className="w-5 h-5 text-brand-green" />
          <span>Kitchen Stage Transitions</span>
        </h2>

        {activeOrders.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-brand-border text-center text-xs text-brand-muted">
            No orders currently in the kitchen cooking stages.
          </div>
        ) : (
          <div className="space-y-4">
            {activeOrders.map((order) => {
              const isAccepted = order.orderStatus === 'accepted';
              const isPreparing = order.orderStatus === 'preparing';
              const isHandoff = order.orderStatus === 'ready_for_pickup' || order.orderStatus === 'out_for_delivery';

              return (
                <div
                  key={order._id}
                  className="bg-white p-6 rounded-2xl border border-brand-border shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-base text-brand-charcoal">{order.orderNumber}</span>
                      <Badge variant="default" className="capitalize">{order.orderStatus.replace('_', ' ')}</Badge>
                      <span className="text-xs text-brand-muted">• {order.deliverySlot}</span>
                    </div>

                    <p className="text-xs text-brand-charcoal">
                      <strong>Deliver to:</strong> {order.deliveryAddress?.addressLine1}, {order.deliveryAddress?.locality}
                    </p>

                    <div className="text-xs text-brand-muted">
                      {order.items.map((it) => `${it.mealName} × ${it.quantity}`).join(', ')}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto">
                    {isAccepted && (
                      <Button
                        variant="default"
                        size="sm"
                        isLoading={activeActionId === order._id}
                        onClick={() => handleUpdateStatus(order._id, 'preparing')}
                      >
                        Start Cooking Fresh
                      </Button>
                    )}

                    {isPreparing && (
                      <Button
                        variant="terracotta"
                        size="sm"
                        isLoading={activeActionId === order._id}
                        onClick={() =>
                          handleUpdateStatus(
                            order._id,
                            order.deliveryMode === 'pickup' ? 'ready_for_pickup' : 'out_for_delivery'
                          )
                        }
                      >
                        Mark Ready for Delivery
                      </Button>
                    )}

                    {isHandoff && (
                      <Button
                        variant="secondary"
                        size="sm"
                        isLoading={activeActionId === order._id}
                        onClick={() => handleUpdateStatus(order._id, 'delivered')}
                      >
                        Confirm Handed Over / Delivered
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
