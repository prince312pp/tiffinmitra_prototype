import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import SubscriptionPlan from '@/models/SubscriptionPlan';
import Subscription from '@/models/Subscription';
import CookProfile from '@/models/CookProfile';
import User from '@/models/User';
import { paymentProvider } from '@/lib/payment';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const tokenUser = getUserFromRequest(request);
    const { searchParams } = new URL(request.url);
    const cookId = searchParams.get('cookId');

    // If query is for plans:
    if (searchParams.get('type') === 'plans') {
      const query: any = { isActive: true };
      if (cookId) query.cookId = cookId;
      const plans = await SubscriptionPlan.find(query).populate('cookId', 'displayName slug');
      return NextResponse.json({ success: true, data: plans });
    }

    if (!tokenUser) {
      return NextResponse.json({ success: false, error: 'Unauthenticated' }, { status: 401 });
    }

    let subQuery: any = {};
    if (tokenUser.role === 'cook') {
      const cook = await CookProfile.findOne({ userId: tokenUser.userId });
      if (cook) subQuery.cookId = cook._id;
    } else if (tokenUser.role === 'admin') {
      // all
    } else {
      subQuery.customerId = tokenUser.userId;
    }

    const subscriptions = await Subscription.find(subQuery).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: subscriptions,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const tokenUser = getUserFromRequest(request);
    if (!tokenUser) {
      return NextResponse.json({ success: false, error: 'Please log in to purchase a subscription' }, { status: 401 });
    }

    const body = await request.json();
    const {
      planId,
      startDate = new Date().toISOString(),
      mealSlots = ['lunch'],
      deliveryAddress,
      paymentMethod = 'upi',
    } = body;

    const user = await User.findById(tokenUser.userId);
    const plan = await SubscriptionPlan.findById(planId);
    if (!plan) {
      return NextResponse.json({ success: false, error: 'Subscription plan not found' }, { status: 404 });
    }

    const cook = await CookProfile.findById(plan.cookId);
    if (!cook) {
      return NextResponse.json({ success: false, error: 'Cook not found' }, { status: 404 });
    }

    const start = new Date(startDate);
    const end = new Date(start.getTime() + plan.durationDays * 24 * 60 * 60 * 1000);

    const subscriptionNumber = `SUB-${Date.now().toString().slice(-6)}`;

    // Process simulated payment
    const paymentIntent = await paymentProvider.createPaymentIntent({
      orderId: subscriptionNumber,
      customerId: user._id.toString(),
      amountMinor: plan.priceMinor,
      currency: 'INR',
      method: paymentMethod,
    });

    const newSub = await Subscription.create({
      subscriptionNumber,
      customerId: user._id,
      customerName: user.name,
      cookId: cook._id,
      cookName: cook.displayName,
      planId: plan._id,
      planName: plan.name,
      mealSlots: plan.mealSlots || mealSlots,
      startDate: start,
      endDate: end,
      pausedDates: [],
      status: 'active',
      totalMinor: plan.priceMinor,
      deliveryAddress: deliveryAddress || {
        addressLine1: 'Flat 402, Green Glen Layout, 4th Cross',
        locality: 'Koramangala',
        city: 'Bengaluru',
      },
      paymentId: paymentIntent.paymentId,
    });

    return NextResponse.json({
      success: true,
      data: newSub,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
