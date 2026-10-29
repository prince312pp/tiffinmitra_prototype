'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { IOrder } from '@/lib/types';
import { formatCurrency, formatDateTime } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Package, Clock, ArrowRight, ChefHat, ShoppingBag } from 'lucide-react';

export default function CustomerOrdersPage() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/v1/orders');
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          setOrders(json.data);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-brand-charcoal">My Order History</h1>
        <p className="text-sm text-brand-muted mt-1">
          Track real-time cooking progress or review past delivered tiffins.
        </p>
      </div>

      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-8 h-8 border-4 border-brand-darkGreen/20 border-t-brand-darkGreen rounded-full animate-spin mx-auto" />
          <p className="text-sm text-brand-muted">Loading your past meals...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-brand-border text-center space-y-4">
          <ShoppingBag className="w-12 h-12 text-brand-muted mx-auto" />
          <h3 className="text-lg font-bold text-brand-charcoal">No orders placed yet</h3>
          <p className="text-xs text-brand-muted max-w-sm mx-auto">
            Order a home-cooked lunch or dinner thali from local home chefs near you.
          </p>
          <Link href="/discover">
            <Button variant="default">Find Fresh Tiffin</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const isDelivered = order.orderStatus === 'delivered';
            const isCancelled = order.orderStatus === 'cancelled' || order.orderStatus === 'rejected';

            return (
              <div
                key={order._id}
                className="bg-white p-6 rounded-2xl border border-brand-border shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-extrabold text-base text-brand-charcoal">
                      {order.orderNumber}
                    </span>
                    <Badge
                      variant={
                        isDelivered
                          ? 'success'
                          : isCancelled
                          ? 'destructive'
                          : 'default'
                      }
                      className="capitalize text-[10px]"
                    >
                      {order.orderStatus.replace('_', ' ')}
                    </Badge>
                  </div>

                  <p className="text-xs text-brand-muted flex items-center gap-1.5">
                    <ChefHat className="w-3.5 h-3.5 text-brand-green" />
                    <span>Kitchen: <strong>{order.cookName}</strong></span>
                    <span>•</span>
                    <Clock className="w-3.5 h-3.5 text-brand-muted" />
                    <span>{formatDateTime(order.placedAt)}</span>
                  </p>

                  <div className="text-xs text-brand-charcoal pt-1">
                    {order.items.map((it) => `${it.mealName} × ${it.quantity}`).join(', ')}
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto sm:flex-col sm:items-end gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-brand-border/60">
                  <div className="text-right">
                    <span className="text-xs text-brand-muted block">Total Paid</span>
                    <span className="text-base font-extrabold text-brand-darkGreen">
                      {formatCurrency(order.totalMinor)}
                    </span>
                  </div>

                  <Link href={`/orders/${order._id}`}>
                    <Button variant="outline" size="sm" className="gap-1 text-xs">
                      <span>{isDelivered ? 'View Receipt & Review' : 'Track Order'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
