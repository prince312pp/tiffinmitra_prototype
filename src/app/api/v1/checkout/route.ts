import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import Cart from '@/models/Cart';
import Meal from '@/models/Meal';
import CookProfile from '@/models/CookProfile';
import Order from '@/models/Order';
import Payment from '@/models/Payment';
import { paymentProvider } from '@/lib/payment';
import { getUserFromRequest } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const tokenUser = getUserFromRequest(request);
    if (!tokenUser) {
      return NextResponse.json({ success: false, error: 'Please log in to place an order' }, { status: 401 });
    }

    const body = await request.json();
    const {
      deliveryMode = 'delivery',
      deliveryAddress,
      deliverySlot = 'Lunch (12:30 PM - 01:30 PM)',
      paymentMethod = 'upi',
      customerNotes = '',
      simulatedScenario = 'success', // 'success' | 'failure'
    } = body;

    const user = await User.findById(tokenUser.userId);
    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    const cart = await Cart.findOne({ userId: user._id });
    if (!cart || !cart.items || cart.items.length === 0) {
      return NextResponse.json({ success: false, error: 'Your cart is empty' }, { status: 400 });
    }

    const cook = await CookProfile.findById(cart.cookId);
    if (!cook || cook.applicationStatus !== 'approved' || !cook.isAcceptingOrders) {
      return NextResponse.json(
        { success: false, error: 'The cook is currently not accepting orders' },
        { status: 400 }
      );
    }

    // Authoritative Server-Side Price Calculation from MongoDB
    let subtotalMinor = 0;
    const orderItemsSnapshot = [];

    for (const item of cart.items) {
      const meal = await Meal.findById(item.mealId);
      if (!meal || !meal.isAvailable) {
        return NextResponse.json(
          { success: false, error: `Item "${item.name}" is no longer available` },
          { status: 400 }
        );
      }

      // Check single cook invariant
      if (meal.cookId.toString() !== cook._id.toString()) {
        return NextResponse.json(
          { success: false, error: 'Cart contains items from multiple cooks' },
          { status: 400 }
        );
      }

      const lineTotalMinor = meal.priceMinor * item.quantity;
      subtotalMinor += lineTotalMinor;

      orderItemsSnapshot.push({
        mealId: meal._id,
        mealName: meal.name,
        imageUrl: meal.imageUrl,
        unitPriceMinor: meal.priceMinor,
        quantity: item.quantity,
        lineTotalMinor,
      });
    }

    const deliveryFeeMinor = deliveryMode === 'delivery' ? 3000 : 0; // ₹30 delivery or ₹0 pickup
    const taxMinor = Math.round(subtotalMinor * 0.05); // 5% GST on home prepared food (paise)
    const discountMinor = 0;
    const totalMinor = subtotalMinor + deliveryFeeMinor + taxMinor - discountMinor;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `TM-2026-${randomSuffix}`;

    // Create Order Record in MongoDB
    const newOrder = await Order.create({
      orderNumber,
      customerId: user._id,
      customerName: user.name,
      customerPhone: user.phone || '+91 98765 43210',
      cookId: cook._id,
      cookName: cook.displayName,
      items: orderItemsSnapshot,
      deliveryMode,
      deliveryAddress: deliveryAddress || {
        recipientName: user.name,
        phone: user.phone || '+91 98765 43210',
        addressLine1: 'Flat 402, Green Glen Layout, 4th Cross',
        locality: 'Koramangala',
        city: 'Bengaluru',
        postalCode: '560034',
      },
      deliverySlot,
      subtotalMinor,
      deliveryFeeMinor,
      taxMinor,
      discountMinor,
      totalMinor,
      currency: 'INR',
      paymentStatus: 'pending',
      paymentMethod,
      orderStatus: 'pending_payment',
      customerNotes,
      placedAt: new Date(),
    });

    // Process via Assimilated Payment Provider
    const paymentIntent = await paymentProvider.createPaymentIntent({
      orderId: newOrder._id.toString(),
      customerId: user._id.toString(),
      amountMinor: totalMinor,
      currency: 'INR',
      method: paymentMethod,
      scenario: simulatedScenario,
    });

    const paymentVerification = await paymentProvider.verifyPayment({
      paymentId: paymentIntent.paymentId,
      providerReference: paymentIntent.providerReference,
      scenario: simulatedScenario,
    });

    // Record Payment in MongoDB
    const paymentRecord = await Payment.create({
      paymentId: paymentIntent.paymentId,
      orderId: newOrder._id,
      customerId: user._id,
      provider: 'mock',
      providerReference: paymentIntent.providerReference,
      idempotencyKey: `idemp_${newOrder.orderNumber}_${Date.now()}`,
      amountMinor: totalMinor,
      currency: 'INR',
      method: paymentMethod,
      status: paymentVerification.status,
      failureReason: paymentVerification.failureReason,
      simulatedScenario,
      processedAt: new Date(),
    });

    if (paymentVerification.success) {
      newOrder.paymentStatus = 'succeeded';
      newOrder.orderStatus = 'placed';
      newOrder.paymentId = paymentIntent.paymentId;
      await newOrder.save();

      // Clear diner cart
      await Cart.findOneAndUpdate(
        { userId: user._id },
        { $set: { cookId: null, items: [] } }
      );

      return NextResponse.json({
        success: true,
        data: {
          order: newOrder,
          payment: paymentRecord,
        },
      });
    } else {
      newOrder.paymentStatus = 'failed';
      newOrder.orderStatus = 'pending_payment';
      newOrder.paymentId = paymentIntent.paymentId;
      await newOrder.save();

      return NextResponse.json({
        success: false,
        error: paymentVerification.failureReason || 'Payment failed',
        data: {
          order: newOrder,
          payment: paymentRecord,
        },
      }, { status: 402 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
