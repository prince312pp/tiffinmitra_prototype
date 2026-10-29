import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import CookProfile from '@/models/CookProfile';
import CookApplication from '@/models/CookApplication';
import Order from '@/models/Order';
import Payment from '@/models/Payment';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const tokenUser = getUserFromRequest(request);
    if (!tokenUser || tokenUser.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Administrator access required' }, { status: 403 });
    }

    const totalUsers = await User.countDocuments();
    const approvedCooks = await CookProfile.countDocuments({ applicationStatus: 'approved' });
    const pendingApplications = await CookApplication.countDocuments({ status: 'pending_review' });
    const totalOrders = await Order.countDocuments();
    const deliveredOrders = await Order.find({ orderStatus: 'delivered' });
    const gmvMinor = deliveredOrders.reduce((sum, o) => sum + o.totalMinor, 0);
    const totalPayments = await Payment.countDocuments();

    return NextResponse.json({
      success: true,
      data: {
        totalUsers,
        approvedCooks,
        pendingApplications,
        totalOrders,
        gmvMinor,
        totalPayments,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
