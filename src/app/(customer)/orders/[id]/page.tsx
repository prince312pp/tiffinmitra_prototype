'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { IOrder, IPaymentRecord } from '@/lib/types';
import { formatCurrency, formatDateTime } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  CheckCircle2,
  Clock,
  ChefHat,
  Truck,
  PackageCheck,
  AlertCircle,
  XCircle,
  ShieldCheck,
  Star,
  ArrowLeft,
  RotateCcw,
} from 'lucide-react';

function OrderTrackingContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const justPlaced = searchParams.get('justPlaced') === 'true';

  const orderId = params.id as string;
  const [order, setOrder] = useState<IOrder | null>(null);
  const [payment, setPayment] = useState<IPaymentRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelMessage, setCancelMessage] = useState<string | null>(null);

  // Review modal state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const fetchOrder = async () => {
    try {
      const res = await fetch(`/api/v1/orders/${orderId}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          setOrder(json.data.order);
          setPayment(json.data.payment);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
    // Poll every 5 seconds for status updates from cook dashboard
    const interval = setInterval(fetchOrder, 5000);
    return () => clearInterval(interval);
  }, [orderId]);

  const handleCancelOrder = async () => {
    if (!confirm('Are you sure you want to cancel this order?')) return;
    setIsCancelling(true);
    setCancelMessage(null);
    try {
      const res = await fetch(`/api/v1/orders/${orderId}/cancel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: 'Diner requested cancellation' }),
      });
      const json = await res.json();
      if (json.success) {
        setCancelMessage(json.message);
        setOrder(json.data);
      } else {
        alert(json.error || 'Failed to cancel order');
      }
    } catch {
      alert('Error cancelling order');
    } finally {
      setIsCancelling(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!order) return;
    setIsSubmittingReview(true);
    try {
      const res = await fetch('/api/v1/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: order._id,
          rating: reviewRating,
          comment: reviewComment,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setReviewSubmitted(true);
      } else {
        alert(json.error || 'Failed to submit review');
      }
    } catch {
      alert('Error submitting review');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-3">
        <div className="w-10 h-10 border-4 border-brand-darkGreen/20 border-t-brand-darkGreen rounded-full animate-spin mx-auto" />
        <p className="text-sm text-brand-muted">Fetching live order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-brand-charcoal">Order not found</h2>
        <Link href="/orders">
          <Button variant="default">View My Orders</Button>
        </Link>
      </div>
    );
  }

  const stages = [
    { key: 'placed', label: 'Order Placed', icon: Clock },
    { key: 'accepted', label: 'Cook Accepted', icon: ChefHat },
    { key: 'preparing', label: 'Cooking Fresh', icon: Clock },
    { key: order.deliveryMode === 'pickup' ? 'ready_for_pickup' : 'out_for_delivery', label: order.deliveryMode === 'pickup' ? 'Ready for Pickup' : 'Out for Delivery', icon: Truck },
    { key: 'delivered', label: 'Delivered', icon: PackageCheck },
  ];

  const getStageIndex = (status: string) => {
    switch (status) {
      case 'placed': return 0;
      case 'accepted': return 1;
      case 'preparing': return 2;
      case 'ready_for_pickup':
      case 'out_for_delivery': return 3;
      case 'delivered': return 4;
      default: return -1;
    }
  };

  const currentStageIndex = getStageIndex(order.orderStatus);
  const isCancelled = order.orderStatus === 'cancelled' || order.orderStatus === 'rejected';
  const canCancel = order.orderStatus === 'placed' || order.orderStatus === 'pending_payment';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Navigation */}
      <Link href="/orders" className="inline-flex items-center gap-1.5 text-xs text-brand-muted hover:text-brand-darkGreen font-semibold">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Order History</span>
      </Link>

      {/* Just Placed Alert Banner */}
      {justPlaced && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            <div>
              <p className="font-bold text-emerald-950">Payment Succeeded & Order Placed!</p>
              <p className="text-xs text-emerald-800">
                Your order has been transmitted directly to <strong>{order.cookName}</strong>.
              </p>
            </div>
          </div>
          <Badge variant="success">Confirmed</Badge>
        </div>
      )}

      {/* Main Order Status Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-border shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-border">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-muted">
              Live Order Status
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-charcoal mt-1">
              {order.orderNumber}
            </h1>
            <p className="text-xs text-brand-muted mt-1">
              Placed on {formatDateTime(order.placedAt)} • Prepared by <strong>{order.cookName}</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant={
                order.orderStatus === 'delivered'
                  ? 'success'
                  : isCancelled
                  ? 'destructive'
                  : 'default'
              }
              className="text-xs px-3 py-1 font-bold uppercase"
            >
              {order.orderStatus.replace('_', ' ')}
            </Badge>

            {canCancel && (
              <Button
                variant="destructive"
                size="sm"
                isLoading={isCancelling}
                onClick={handleCancelOrder}
                className="text-xs"
              >
                Cancel Order
              </Button>
            )}
          </div>
        </div>

        {/* Cancel Message */}
        {cancelMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 rounded-xl">
            {cancelMessage}
          </div>
        )}

        {/* Live Step-by-Step Progress Timeline */}
        {!isCancelled ? (
          <div className="py-6">
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-brand-border -translate-y-1/2 hidden md:block" />
              <div
                className="absolute top-1/2 left-0 h-1 bg-brand-darkGreen -translate-y-1/2 transition-all duration-500 hidden md:block"
                style={{
                  width: `${(Math.max(0, currentStageIndex) / (stages.length - 1)) * 100}%`,
                }}
              />

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
                {stages.map((stage, idx) => {
                  const Icon = stage.icon;
                  const isDone = currentStageIndex >= idx;
                  const isCurrent = currentStageIndex === idx;

                  return (
                    <div
                      key={stage.key}
                      className={`flex md:flex-col items-center gap-3 md:text-center p-3 rounded-2xl md:p-0 ${
                        isCurrent ? 'bg-brand-darkGreen/5 md:bg-transparent' : ''
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all shrink-0 ${
                          isDone
                            ? 'bg-brand-darkGreen text-white shadow-md'
                            : 'bg-white border-2 border-brand-border text-brand-muted'
                        } ${isCurrent ? 'ring-4 ring-brand-green/20 scale-110' : ''}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p
                          className={`text-xs font-bold ${
                            isDone ? 'text-brand-charcoal' : 'text-brand-muted'
                          }`}
                        >
                          {stage.label}
                        </p>
                        {isCurrent && (
                          <span className="text-[10px] text-brand-darkGreen font-semibold animate-pulse">
                            In Progress...
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-red-50 border border-red-200 text-red-900 rounded-2xl flex items-center gap-3">
            <XCircle className="w-6 h-6 text-red-600 shrink-0" />
            <div>
              <p className="font-bold text-xs">Order Cancelled</p>
              <p className="text-xs text-red-700">{order.cancellationReason || 'Order was cancelled.'}</p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col: Order Snapshot Items */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-charcoal">
              Order Snapshot & Items
            </h3>

            <div className="divide-y divide-brand-border/60">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-3.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.imageUrl}
                      alt={item.mealName}
                      className="w-12 h-12 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-brand-charcoal truncate">{item.mealName}</p>
                      <p className="text-[11px] text-brand-muted">
                        {formatCurrency(item.unitPriceMinor)} × {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-brand-charcoal shrink-0">
                    {formatCurrency(item.lineTotalMinor)}
                  </span>
                </div>
              ))}
            </div>

            {/* Financial summary */}
            <div className="pt-3 border-t border-brand-border space-y-1.5 text-xs text-brand-charcoal">
              <div className="flex justify-between">
                <span className="text-brand-muted">Subtotal</span>
                <span>{formatCurrency(order.subtotalMinor)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">Delivery</span>
                <span>{formatCurrency(order.deliveryFeeMinor)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">GST (5%)</span>
                <span>{formatCurrency(order.taxMinor)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold pt-2 border-t border-brand-border text-brand-darkGreen">
                <span>Total Paid</span>
                <span>{formatCurrency(order.totalMinor)}</span>
              </div>
            </div>
          </div>

          {/* Verified Review Form if Delivered */}
          {order.orderStatus === 'delivered' && !reviewSubmitted && (
            <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-brand-charcoal flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>Leave a Verified Cook Review</span>
                </h3>
                <Badge variant="success">Eligible Delivered Order</Badge>
              </div>

              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-charcoal mb-1">
                    Your Rating (1 to 5 Stars):
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewRating(star)}
                        className="p-1 focus:outline-none"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= reviewRating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-brand-charcoal ml-2">
                      {reviewRating} out of 5
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-charcoal mb-1">
                    Your Feedback for {order.cookName}:
                  </label>
                  <textarea
                    rows={3}
                    placeholder="How were the rotis, spice level, and freshness? Your honest feedback helps home cooks improve..."
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="w-full rounded-xl border border-brand-border p-3 text-xs focus:outline-none focus:ring-2 focus:ring-brand-darkGreen"
                  />
                </div>

                <Button
                  variant="default"
                  size="sm"
                  isLoading={isSubmittingReview}
                  type="submit"
                >
                  Publish Verified Review
                </Button>
              </form>
            </div>
          )}

          {reviewSubmitted && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Thank you! Your verified review has been published on {order.cookName}'s storefront.</span>
            </div>
          )}
        </div>

        {/* Right Col: Delivery Address & Simulated Payment Receipt */}
        <div className="lg:col-span-5 space-y-6">
          {/* Delivery & Kitchen info */}
          <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-sm space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-charcoal">
              Delivery Details
            </h3>

            <div className="text-xs space-y-2 text-brand-charcoal">
              <p>
                <strong>Recipient:</strong> {order.deliveryAddress?.recipientName || order.customerName}
              </p>
              <p>
                <strong>Phone:</strong> {order.deliveryAddress?.phone || order.customerPhone}
              </p>
              <p>
                <strong>Address:</strong> {order.deliveryAddress?.addressLine1}, {order.deliveryAddress?.locality}, {order.deliveryAddress?.city}
              </p>
              <p>
                <strong>Meal Window:</strong> {order.deliverySlot}
              </p>
              {order.customerNotes && (
                <p className="p-2.5 bg-brand-cream/60 rounded-lg text-brand-muted">
                  <strong>Notes:</strong> {order.customerNotes}
                </p>
              )}
            </div>
          </div>

          {/* Payment Audit Record */}
          <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-brand-charcoal flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-darkGreen" />
                <span>Payment Audit Record</span>
              </h3>
              <Badge
                variant={
                  order.paymentStatus === 'succeeded'
                    ? 'success'
                    : order.paymentStatus === 'refunded'
                    ? 'terracotta'
                    : 'destructive'
                }
                className="capitalize"
              >
                {order.paymentStatus}
              </Badge>
            </div>

            <div className="text-xs space-y-2 text-brand-charcoal font-mono bg-brand-cream/50 p-3 rounded-xl border border-brand-border/60">
              <p>
                <span className="text-brand-muted">Payment ID: </span>
                {payment?.paymentId || order.paymentId || 'N/A'}
              </p>
              <p>
                <span className="text-brand-muted">Provider: </span>
                {payment?.provider || 'MockPaymentProvider (Assimilated)'}
              </p>
              <p>
                <span className="text-brand-muted">Reference: </span>
                {payment?.providerReference || 'MOCK_REF_VERIFIED'}
              </p>
              <p>
                <span className="text-brand-muted">Method: </span>
                {order.paymentMethod.toUpperCase()}
              </p>
              <p>
                <span className="text-brand-muted">Amount: </span>
                {formatCurrency(order.totalMinor)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderTrackingPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-sm text-brand-muted">
          Loading order details...
        </div>
      }
    >
      <OrderTrackingContent />
    </Suspense>
  );
}
