import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Meal from '@/models/Meal';
import CookProfile from '@/models/CookProfile';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const tokenUser = getUserFromRequest(request);
    if (!tokenUser || tokenUser.role !== 'cook') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 });
    }

    const cook = await CookProfile.findOne({ userId: tokenUser.userId });
    if (!cook) {
      return NextResponse.json({ success: false, error: 'Cook profile not found' }, { status: 404 });
    }

    const meals = await Meal.find({ cookId: cook._id }).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: meals,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const tokenUser = getUserFromRequest(request);
    if (!tokenUser || tokenUser.role !== 'cook') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 });
    }

    const cook = await CookProfile.findOne({ userId: tokenUser.userId });
    if (!cook) {
      return NextResponse.json({ success: false, error: 'Cook profile not found' }, { status: 404 });
    }

    const body = await request.json();
    const {
      name,
      description,
      category = 'Daily Thalis',
      priceMinor,
      portionDescription,
      ingredients = [],
      dietaryLabels = ['veg'],
      preparationMinutes = 35,
      availableQuantity = 15,
      imageUrl = 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
    } = body;

    if (!name || !priceMinor) {
      return NextResponse.json({ success: false, error: 'Meal name and price are required' }, { status: 400 });
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const meal = await Meal.create({
      cookId: cook._id,
      name,
      slug: `${slug}-${Date.now().toString().slice(-4)}`,
      description,
      category,
      imageUrl,
      priceMinor: Number(priceMinor),
      portionDescription: portionDescription || '1 Person Homestyle Meal',
      ingredients: Array.isArray(ingredients) ? ingredients : [ingredients],
      dietaryLabels,
      preparationMinutes: Number(preparationMinutes),
      availableQuantity: Number(availableQuantity),
      isAvailable: true,
    });

    return NextResponse.json({
      success: true,
      message: 'Meal created and published successfully',
      data: meal,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await connectDB();
    const tokenUser = getUserFromRequest(request);
    if (!tokenUser || tokenUser.role !== 'cook') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 });
    }

    const body = await request.json();
    const { mealId, isAvailable, availableQuantity } = body;

    const meal = await Meal.findById(mealId);
    if (!meal) {
      return NextResponse.json({ success: false, error: 'Meal not found' }, { status: 404 });
    }

    if (isAvailable !== undefined) meal.isAvailable = isAvailable;
    if (availableQuantity !== undefined) meal.availableQuantity = availableQuantity;

    await meal.save();

    return NextResponse.json({
      success: true,
      data: meal,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
