import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import CookProfile from '@/models/CookProfile';
import Order from '@/models/Order';
import Subscription from '@/models/Subscription';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const tokenUser = getUserFromRequest(request);
    if (!tokenUser || tokenUser.role !== 'cook') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 });
    }

    const cook = await CookProfile.findOne({ userId: tokenUser.userId });
    if (!cook) {
      return NextResponse.json({ success: false, error: 'Cook profile not found' }, { status: 404 });
    }

    const allOrders = await Order.find({ cookId: cook._id });
    const pendingOrders = allOrders.filter((o) => o.orderStatus === 'placed');
    const preparingOrders = allOrders.filter((o) => o.orderStatus === 'preparing' || o.orderStatus === 'accepted');
    const completedOrders = allOrders.filter((o) => o.orderStatus === 'delivered');
    const grossSalesPaise = completedOrders.reduce((sum, o) => sum + o.totalMinor, 0);

    const activeSubscriptions = await Subscription.countDocuments({ cookId: cook._id, status: 'active' });

    return NextResponse.json({
      success: true,
      data: {
        cook,
        stats: {
          totalOrders: allOrders.length,
          pendingCount: pendingOrders.length,
          preparingCount: preparingOrders.length,
          completedCount: completedOrders.length,
          grossSalesMinor: grossSalesPaise,
          activeSubscriptions,
          dailyCapacity: cook.dailyOrderCapacity,
          rating: cook.averageRating,
          reviewCount: cook.reviewCount,
        },
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
