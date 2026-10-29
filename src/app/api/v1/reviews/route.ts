import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Review from '@/models/Review';
import Order from '@/models/Order';
import CookProfile from '@/models/CookProfile';
import { getUserFromRequest } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const tokenUser = getUserFromRequest(request);
    if (!tokenUser) {
      return NextResponse.json({ success: false, error: 'Please log in to submit a review' }, { status: 401 });
    }

    const body = await request.json();
    const { orderId, rating, comment } = body;

    if (!orderId || !rating || rating < 1 || rating > 5) {
      return NextResponse.json({ success: false, error: 'Valid order ID and rating (1-5) are required' }, { status: 400 });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }

    // Verify customer ownership and delivered status
    if (order.customerId.toString() !== tokenUser.userId) {
      return NextResponse.json({ success: false, error: 'You can only review your own orders' }, { status: 403 });
    }

    if (order.orderStatus !== 'delivered') {
      return NextResponse.json(
        { success: false, error: 'Only completed and delivered meals can be reviewed' },
        { status: 400 }
      );
    }

    // Check duplicate
    const existing = await Review.findOne({ orderId: order._id, customerId: tokenUser.userId });
    if (existing) {
      return NextResponse.json({ success: false, error: 'You have already reviewed this order' }, { status: 409 });
    }

    const review = await Review.create({
      customerId: tokenUser.userId,
      customerName: tokenUser.name,
      cookId: order.cookId,
      orderId: order._id,
      rating: Number(rating),
      comment: comment || '',
    });

    // Recompute cook average rating
    const allReviews = await Review.find({ cookId: order.cookId });
    const avg = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
    await CookProfile.findByIdAndUpdate(order.cookId, {
      $set: {
        averageRating: parseFloat(avg.toFixed(1)),
        reviewCount: allReviews.length,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Review submitted successfully',
      data: review,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
