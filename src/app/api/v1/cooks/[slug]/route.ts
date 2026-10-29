import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import CookProfile from '@/models/CookProfile';
import Meal from '@/models/Meal';
import SubscriptionPlan from '@/models/SubscriptionPlan';
import Review from '@/models/Review';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();
    const { slug } = params;

    const cook = await CookProfile.findOne({ slug });
    if (!cook) {
      return NextResponse.json({ success: false, error: 'Cook not found' }, { status: 404 });
    }

    const meals = await Meal.find({ cookId: cook._id }).sort({ isAvailable: -1, priceMinor: 1 });
    const subscriptionPlans = await SubscriptionPlan.find({ cookId: cook._id, isActive: true });
    const reviews = await Review.find({ cookId: cook._id }).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: {
        cook,
        meals,
        subscriptionPlans,
        reviews,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
