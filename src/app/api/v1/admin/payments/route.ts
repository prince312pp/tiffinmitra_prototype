import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Payment from '@/models/Payment';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const tokenUser = getUserFromRequest(request);
    if (!tokenUser || tokenUser.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Administrator access required' }, { status: 403 });
    }

    const payments = await Payment.find().sort({ processedAt: -1 }).populate('orderId', 'orderNumber totalMinor customerName cookName');

    return NextResponse.json({
      success: true,
      data: payments,
      meta: { total: payments.length },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
