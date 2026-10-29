'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatDateTime } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ChefHat, ArrowLeft, CheckCircle2, XCircle, ShieldCheck } from 'lucide-react';

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  const fetchApps = async () => {
    try {
      const res = await fetch('/api/v1/admin/applications');
      const json = await res.json();
      if (json.success) setApplications(json.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const handleAction = async (id: string, action: 'approve' | 'reject') => {
    try {
      const res = await fetch(`/api/v1/admin/applications/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });
      const json = await res.json();
      if (json.success) {
        setMessage(json.message);
        fetchApps();
      } else {
        alert(json.error || 'Failed to update application');
      }
    } catch {
      alert('Error updating application');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Link href="/admin/dashboard" className="inline-flex items-center gap-1.5 text-xs text-brand-muted hover:text-brand-darkGreen font-semibold">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Admin Operations</span>
      </Link>

      <div>
        <h1 className="text-3xl font-extrabold text-brand-charcoal">Cook Onboarding Queue</h1>
        <p className="text-sm text-brand-muted mt-1">
          Review submitted domestic kitchen applications, examine hygiene declarations, and approve storefronts.
        </p>
      </div>

      {message && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{message}</span>
        </div>
      )}

      {loading ? (
        <div className="py-12 text-center text-xs text-brand-muted">Loading applications...</div>
      ) : applications.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl border border-brand-border text-center text-xs text-brand-muted">
          No cook applications currently in queue.
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-white p-6 rounded-2xl border border-brand-border shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-base text-brand-charcoal">{app.kitchenName}</h3>
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

                <p className="text-xs text-brand-charcoal">
                  <strong>Applicant:</strong> {app.applicantName} ({app.phone}, {app.email})
                </p>

                <p className="text-xs text-brand-muted">
                  <strong>Address:</strong> {app.address}, {app.locality}
                </p>

                <p className="text-xs text-brand-muted">
                  <strong>Specialties:</strong> {app.cuisineSpecialties?.join(', ')} • <strong>Daily Limit:</strong> {app.dailyCapacity} thalis • <strong>FSSAI:</strong> {app.fssaiNumber || 'Self-Declared'}
                </p>

                <p className="text-[11px] text-brand-muted">
                  Submitted: {formatDateTime(app.submittedAt)}
                </p>
              </div>

              {app.status === 'pending_review' && (
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleAction(app._id, 'reject')}
                  >
                    Reject
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleAction(app._id, 'approve')}
                  >
                    Approve Storefront
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
