'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center space-y-3">
        <Badge variant="default">Support & Feedback</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-charcoal">
          We're Here to Help
        </h1>
        <p className="text-sm text-brand-muted max-w-md mx-auto">
          Have questions about your tiffin deliveries, subscriptions, or cook onboarding?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Contact Info */}
        <div className="bg-white p-8 rounded-3xl border border-brand-border space-y-6 shadow-sm">
          <h3 className="text-lg font-bold text-brand-charcoal">Contact Details</h3>

          <div className="space-y-4 text-xs text-brand-charcoal">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-brand-darkGreen/10 flex items-center justify-center text-brand-darkGreen">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <p className="text-brand-muted">Email Support</p>
                <p className="font-semibold">support@tiffinmitra.com</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-brand-muted">Help Helpline</p>
                <p className="font-semibold">+91 (80) 4567-8900</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-brand-terracotta/10 flex items-center justify-center text-brand-terracotta">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-brand-muted">Operations Center</p>
                <p className="font-semibold">Titanium City Center, Prahlad Nagar, Ahmedabad, GJ 380015</p>
              </div>
            </div>
          </div>
        </div>

        {/* Message form */}
        <div className="bg-white p-8 rounded-3xl border border-brand-border space-y-4 shadow-sm">
          <h3 className="text-lg font-bold text-brand-charcoal">Send Us a Message</h3>

          {submitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 text-center space-y-2 rounded-2xl">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <p className="font-bold text-xs text-emerald-950">Message Sent</p>
              <p className="text-xs text-emerald-800">Our customer care team will respond within 4 hours.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-3"
            >
              <Input label="Your Name" placeholder="e.g. Rahul Sharma" required />
              <Input label="Email Address" type="email" placeholder="name@example.com" required />
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-brand-charcoal mb-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we assist you with your tiffin order or cook application?"
                  className="w-full rounded-xl border border-brand-border p-3 text-xs focus:outline-none focus:ring-2 focus:ring-brand-darkGreen"
                />
              </div>
              <Button type="submit" variant="default" className="w-full">
                Send Message
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
