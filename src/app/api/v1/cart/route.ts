import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Cart from '@/models/Cart';
import Meal from '@/models/Meal';
import CookProfile from '@/models/CookProfile';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const tokenUser = getUserFromRequest(request);

    if (!tokenUser) {
      return NextResponse.json({
        success: true,
        data: { cookId: null, cookName: null, cookSlug: null, items: [] },
      });
    }

    const cart = await Cart.findOne({ userId: tokenUser.userId }).populate('cookId', 'displayName slug');
    if (!cart) {
      return NextResponse.json({
        success: true,
        data: { cookId: null, cookName: null, cookSlug: null, items: [] },
      });
    }

    const cook = cart.cookId as any;
    return NextResponse.json({
      success: true,
      data: {
        cookId: cook?._id || null,
        cookName: cook?.displayName || null,
        cookSlug: cook?.slug || null,
        items: cart.items || [],
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const tokenUser = getUserFromRequest(request);
    if (!tokenUser) {
      return NextResponse.json({ success: false, error: 'Please log in to add items to your cart' }, { status: 401 });
    }

    const body = await request.json();
    const { mealId, quantity = 1, replaceCart = false } = body;

    const meal = await Meal.findById(mealId);
    if (!meal || !meal.isAvailable) {
      return NextResponse.json({ success: false, error: 'Meal is currently unavailable' }, { status: 400 });
    }

    const mealCook = await CookProfile.findById(meal.cookId);
    if (!mealCook) {
      return NextResponse.json({ success: false, error: 'Cook profile not found' }, { status: 404 });
    }

    let cart = await Cart.findOne({ userId: tokenUser.userId });

    if (!cart) {
      cart = new Cart({
        userId: tokenUser.userId,
        cookId: meal.cookId,
        items: [],
      });
    }

    // Single-Cook UX invariant check
    if (cart.cookId && cart.items.length > 0 && cart.cookId.toString() !== meal.cookId.toString()) {
      if (!replaceCart) {
        const currentCook = await CookProfile.findById(cart.cookId);
        return NextResponse.json(
          {
            success: false,
            conflict: true,
            currentCookName: currentCook?.displayName || 'Another Cook',
            newCookName: mealCook.displayName,
            message: `Your cart contains items from ${currentCook?.displayName || 'another cook'}. Would you like to clear your cart and start a new order with ${mealCook.displayName}?`,
          },
          { status: 409 }
        );
      } else {
        // Diner agreed to clear and start fresh with new cook
        cart.cookId = meal.cookId;
        cart.items = [];
      }
    }

    // Update active cook if cart was empty
    if (!cart.cookId || cart.items.length === 0) {
      cart.cookId = meal.cookId;
    }

    const existingItemIndex = cart.items.findIndex(
      (item: any) => item.mealId.toString() === mealId
    );

    if (existingItemIndex > -1) {
      if (quantity <= 0) {
        cart.items.splice(existingItemIndex, 1);
      } else {
        cart.items[existingItemIndex].quantity = quantity;
      }
    } else if (quantity > 0) {
      cart.items.push({
        mealId: meal._id,
        name: meal.name,
        imageUrl: meal.imageUrl,
        priceMinor: meal.priceMinor,
        quantity,
        portionDescription: meal.portionDescription,
      });
    }

    if (cart.items.length === 0) {
      cart.cookId = null;
    }

    await cart.save();

    return NextResponse.json({
      success: true,
      data: {
        cookId: cart.cookId,
        cookName: mealCook.displayName,
        cookSlug: mealCook.slug,
        items: cart.items,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    const tokenUser = getUserFromRequest(request);
    if (!tokenUser) {
      return NextResponse.json({ success: false, error: 'Unauthenticated' }, { status: 401 });
    }

    await Cart.findOneAndUpdate(
      { userId: tokenUser.userId },
      { $set: { cookId: null, items: [] } }
    );

    return NextResponse.json({
      success: true,
      data: { cookId: null, cookName: null, cookSlug: null, items: [] },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
