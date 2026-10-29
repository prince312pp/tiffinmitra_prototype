import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Order from '@/models/Order';
import CookProfile from '@/models/CookProfile';
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
    const { status, cookNotes, rejectionReason } = body;

    let order = null;
    if (id.startsWith('TM-')) {
      order = await Order.findOne({ orderNumber: id });
    } else {
      order = await Order.findById(id);
    }

    if (!order) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }

    // Role check: Only Cook or Admin can update status
    if (tokenUser.role === 'customer') {
      return NextResponse.json(
        { success: false, error: 'Customers are not permitted to update kitchen order progress' },
        { status: 403 }
      );
    }

    const now = new Date();

    if (status === 'accepted') {
      order.orderStatus = 'accepted';
      order.acceptedAt = now;
    } else if (status === 'preparing') {
      order.orderStatus = 'preparing';
      order.preparingAt = now;
    } else if (status === 'ready_for_pickup' || status === 'out_for_delivery') {
      order.orderStatus = status;
      order.readyAt = now;
    } else if (status === 'delivered') {
      order.orderStatus = 'delivered';
      order.deliveredAt = now;
    } else if (status === 'rejected') {
      order.orderStatus = 'rejected';
      order.cancellationReason = rejectionReason || 'Cook at maximum capacity';
      order.cancelledAt = now;
    }

    if (cookNotes) {
      order.cookNotes = cookNotes;
    }

    await order.save();

    return NextResponse.json({
      success: true,
      data: order,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
