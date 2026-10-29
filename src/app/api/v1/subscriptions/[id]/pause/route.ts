import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Subscription from '@/models/Subscription';
import { getUserFromRequest } from '@/lib/auth';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const tokenUser = getUserFromRequest(request);
    if (!tokenUser) {
      return NextResponse.json({ success: false, error: 'Unauthenticated' }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();
    const { dateStr } = body; // YYYY-MM-DD

    if (!dateStr) {
      return NextResponse.json({ success: false, error: 'Target pause date is required (YYYY-MM-DD)' }, { status: 400 });
    }

    const sub = await Subscription.findById(id);
    if (!sub) {
      return NextResponse.json({ success: false, error: 'Subscription not found' }, { status: 404 });
    }

    const dateIdx = sub.pausedDates.indexOf(dateStr);
    let message = '';

    if (dateIdx > -1) {
      // Unpause / Resume this date
      sub.pausedDates.splice(dateIdx, 1);
      // Reduce end date by 1 day
      sub.endDate = new Date(new Date(sub.endDate).getTime() - 24 * 60 * 60 * 1000);
      message = `Delivery on ${dateStr} resumed. Subscription validity adjusted.`;
    } else {
      // Pause this date
      sub.pausedDates.push(dateStr);
      // Extend end date by 1 day with zero cancellation penalty!
      sub.endDate = new Date(new Date(sub.endDate).getTime() + 24 * 60 * 60 * 1000);
      message = `Delivery on ${dateStr} paused. Morning Cutoff guarantee: Validity extended by 1 day with zero fee.`;
    }

    await sub.save();

    return NextResponse.json({
      success: true,
      message,
      data: sub,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
