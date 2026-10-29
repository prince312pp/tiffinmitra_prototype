'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatCurrency, formatDateTime } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Shield,
  Users,
  ChefHat,
  ShoppingBag,
  TrendingUp,
  CreditCard,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const fetchAdminData = async () => {
    try {
      const [statsRes, appRes, orderRes, payRes] = await Promise.all([
        fetch('/api/v1/admin/stats'),
        fetch('/api/v1/admin/applications'),
        fetch('/api/v1/admin/orders'),
        fetch('/api/v1/admin/payments'),
      ]);

      const [statsJson, appJson, orderJson, payJson] = await Promise.all([
        statsRes.json(),
        appRes.json(),
        orderRes.json(),
        payRes.json(),
      ]);

      if (statsJson.success) setStats(statsJson.data);
      if (appJson.success) setApplications(appJson.data || []);
      if (orderJson.success) setOrders(orderJson.data || []);
      if (payJson.success) setPayments(payJson.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleApplicationAction = async (appId: string, action: 'approve' | 'reject') => {
    setActionMessage(null);
    try {
      const res = await fetch(`/api/v1/admin/applications/${appId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });
      const json = await res.json();
      if (json.success) {
        setActionMessage(json.message);
        fetchAdminData();
      } else {
        alert(json.error || 'Failed to process application');
      }
    } catch {
      alert('Error updating application');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-terracotta">
              Platform Governance
            </span>
            <Badge variant="terracotta">Admin Portal</Badge>
          </div>
          <h1 className="text-3xl font-extrabold text-brand-charcoal mt-1">
            Marketplace Operations & Integrity
          </h1>
          <p className="text-xs text-brand-muted mt-1">
            Review cook onboarding applications, audit payments, and inspect orders.
          </p>
        </div>

        <Link href="/admin/applications">
          <Button variant="outline" size="sm" className="gap-2">
            <ChefHat className="w-4 h-4" />
            <span>View All Cook Applications</span>
          </Button>
        </Link>
      </div>

      {actionMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-brand-border shadow-sm space-y-1">
            <p className="text-xs text-brand-muted font-medium">Registered Users</p>
            <p className="text-2xl font-extrabold text-brand-charcoal">{stats.totalUsers}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-brand-border shadow-sm space-y-1">
            <p className="text-xs text-brand-muted font-medium">Approved Cooks</p>
            <p className="text-2xl font-extrabold text-brand-green">{stats.approvedCooks}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-brand-border shadow-sm space-y-1">
            <p className="text-xs text-brand-muted font-medium">Pending Apps</p>
            <p className="text-2xl font-extrabold text-brand-terracotta">{stats.pendingApplications}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-brand-border shadow-sm space-y-1">
            <p className="text-xs text-brand-muted font-medium">Total Orders</p>
            <p className="text-2xl font-extrabold text-brand-charcoal">{stats.totalOrders}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-brand-border shadow-sm space-y-1 col-span-2 md:col-span-1">
            <p className="text-xs text-brand-muted font-medium">Marketplace GMV</p>
            <p className="text-2xl font-extrabold text-brand-darkGreen">
              {formatCurrency(stats.gmvMinor)}
            </p>
          </div>
        </div>
      )}

      {/* 1. Pending Cook Applications Queue */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-brand-charcoal flex items-center gap-2">
            <ChefHat className="w-5 h-5 text-brand-terracotta" />
            <span>Cook Applications Queue</span>
          </h2>
          <Badge variant="outline">{applications.length} Total Applications</Badge>
        </div>

        {applications.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-brand-border text-center text-xs text-brand-muted">
            No cook applications in queue.
          </div>
        ) : (
          <div className="space-y-3">
            {applications.map((app) => (
              <div
                key={app._id}
                className="bg-white p-6 rounded-2xl border border-brand-border shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-base text-brand-charcoal">{app.kitchenName}</span>
                    <Badge
                      variant={
                        app.status === 'approved'
                          ? 'success'
                          : app.status === 'rejected'
                          ? 'destructive'
                          : 'warning'
                      }
                      className="capitalize text-[10px]"
                    >
                      {app.status.replace('_', ' ')}
                    </Badge>
                  </div>

                  <p className="text-xs text-brand-muted">
                    Applicant: <strong>{app.applicantName}</strong> • Phone: {app.phone} • Locality: <strong>{app.locality}</strong>
                  </p>

                  <p className="text-xs text-brand-charcoal">
                    Cuisines: {app.cuisineSpecialties?.join(', ')} • Capacity: {app.dailyCapacity} thalis/day • FSSAI: {app.fssaiNumber || 'Self-Declared'}
                  </p>

                  {app.reviewNotes && (
                    <p className="text-xs text-brand-muted bg-brand-cream/60 p-2 rounded-lg">
                      Review Note: {app.reviewNotes}
                    </p>
                  )}
                </div>

                {app.status === 'pending_review' ? (
                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleApplicationAction(app._id, 'reject')}
                    >
                      Reject
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleApplicationAction(app._id, 'approve')}
                    >
                      Approve & Activate Cook
                    </Button>
                  </div>
                ) : (
                  <span className="text-xs text-brand-muted font-mono capitalize">
                    Status: {app.status}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 2. Payment Transaction Logs */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-brand-charcoal flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-brand-darkGreen" />
            <span>Assimilated Payment Provider Records</span>
          </h2>
          <Badge variant="secondary">{payments.length} Transactions</Badge>
        </div>

        <div className="bg-white rounded-2xl border border-brand-border overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-brand-cream/60 border-b border-brand-border text-brand-muted font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3.5">Payment ID</th>
                  <th className="p-3.5">Order No</th>
                  <th className="p-3.5">Amount</th>
                  <th className="p-3.5">Method</th>
                  <th className="p-3.5">Provider Reference</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/60 text-brand-charcoal font-mono">
                {payments.map((p) => (
                  <tr key={p._id} className="hover:bg-brand-cream/30">
                    <td className="p-3.5 font-bold text-brand-darkGreen">{p.paymentId}</td>
                    <td className="p-3.5">{p.orderId?.orderNumber || 'N/A'}</td>
                    <td className="p-3.5 font-sans font-bold">{formatCurrency(p.amountMinor)}</td>
                    <td className="p-3.5 uppercase">{p.method}</td>
                    <td className="p-3.5 text-brand-muted">{p.providerReference}</td>
                    <td className="p-3.5">
                      <Badge
                        variant={
                          p.status === 'succeeded'
                            ? 'success'
                            : p.status === 'refunded'
                            ? 'terracotta'
                            : 'destructive'
                        }
                        className="text-[10px] capitalize font-sans"
                      >
                        {p.status}
                      </Badge>
                    </td>
                    <td className="p-3.5 text-brand-muted font-sans">{formatDateTime(p.processedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
