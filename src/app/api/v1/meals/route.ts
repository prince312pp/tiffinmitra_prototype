import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Meal from '@/models/Meal';
import CookProfile from '@/models/CookProfile';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const dietary = searchParams.get('dietary');
    const cookId = searchParams.get('cookId');
    const maxPrice = searchParams.get('maxPrice');
    const search = searchParams.get('q');

    const query: any = { isAvailable: true };

    if (category && category !== 'All') {
      query.category = category;
    }

    if (dietary && dietary !== 'all') {
      query.dietaryLabels = { $in: [dietary] };
    }

    if (cookId) {
      query.cookId = cookId;
    }

    if (maxPrice) {
      const maxPaise = parseInt(maxPrice, 10) * 100;
      query.priceMinor = { $lte: maxPaise };
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { ingredients: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const meals = await Meal.find(query).populate('cookId', 'displayName slug serviceAreas averageRating').lean();

    const formattedMeals = meals.map((m: any) => ({
      ...m,
      cookName: m.cookId?.displayName,
      cookSlug: m.cookId?.slug,
      cookServiceAreas: m.cookId?.serviceAreas || [],
      cookRating: m.cookId?.averageRating || 4.8,
    }));

    return NextResponse.json({
      success: true,
      data: formattedMeals,
      meta: { total: formattedMeals.length },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
