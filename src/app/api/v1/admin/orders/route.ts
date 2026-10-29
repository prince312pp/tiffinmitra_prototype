import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Order from '@/models/Order';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const tokenUser = getUserFromRequest(request);
    if (!tokenUser || tokenUser.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Administrator access required' }, { status: 403 });
    }

    const orders = await Order.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: orders,
      meta: { total: orders.length },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
