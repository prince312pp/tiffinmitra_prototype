import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Order from '@/models/Order';
import Payment from '@/models/Payment';
import { paymentProvider } from '@/lib/payment';
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
    const body = await request.json().catch(() => ({}));
    const reason = body.reason || 'Customer requested cancellation';

    let order = null;
    if (id.startsWith('TM-')) {
      order = await Order.findOne({ orderNumber: id });
    } else {
      order = await Order.findById(id);
    }

    if (!order) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }

    if (order.orderStatus === 'delivered' || order.orderStatus === 'cancelled') {
      return NextResponse.json(
        { success: false, error: `Order cannot be cancelled in status ${order.orderStatus}` },
        { status: 400 }
      );
    }

    if (order.orderStatus === 'preparing' || order.orderStatus === 'out_for_delivery') {
      return NextResponse.json(
        { success: false, error: 'Meal is already in preparation or out for delivery and cannot be cancelled.' },
        { status: 400 }
      );
    }

    order.orderStatus = 'cancelled';
    order.cancellationReason = reason;
    order.cancelledAt = new Date();

    if (order.paymentStatus === 'succeeded' && order.paymentId) {
      // Simulate refund
      const refundResult = await paymentProvider.refundPayment(order.paymentId, order.totalMinor);
      if (refundResult.success) {
        order.paymentStatus = 'refunded';
        await Payment.findOneAndUpdate(
          { orderId: order._id },
          { $set: { status: 'refunded', refundAmountMinor: order.totalMinor } }
        );
      }
    }

    await order.save();

    return NextResponse.json({
      success: true,
      message: 'Order cancelled and simulated refund initiated.',
      data: order,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
