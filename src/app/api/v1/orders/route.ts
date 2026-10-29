import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Order from '@/models/Order';
import CookProfile from '@/models/CookProfile';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const tokenUser = getUserFromRequest(request);
    if (!tokenUser) {
      return NextResponse.json({ success: false, error: 'Unauthenticated' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const roleParam = searchParams.get('role');

    let query: any = {};

    if (tokenUser.role === 'cook' || roleParam === 'cook') {
      const cook = await CookProfile.findOne({ userId: tokenUser.userId });
      if (!cook) {
        return NextResponse.json({ success: true, data: [] });
      }
      query.cookId = cook._id;
    } else if (tokenUser.role === 'admin') {
      // admin can view all
    } else {
      query.customerId = tokenUser.userId;
    }

    const orders = await Order.find(query).sort({ placedAt: -1 });

    return NextResponse.json({
      success: true,
      data: orders,
      meta: { total: orders.length },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
