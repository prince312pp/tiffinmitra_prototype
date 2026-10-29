import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import CookProfile from '@/models/CookProfile';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const locality = searchParams.get('locality');
    const cuisine = searchParams.get('cuisine');
    const dietary = searchParams.get('dietary');
    const search = searchParams.get('q');

    const query: any = {
      applicationStatus: 'approved',
    };

    if (locality && locality !== 'All Localities') {
      query.serviceAreas = { $in: [locality] };
    }

    if (cuisine && cuisine !== 'All Cuisines') {
      query.cuisineTypes = { $in: [cuisine] };
    }

    if (dietary && dietary !== 'all') {
      query.dietaryOptions = { $in: [dietary] };
    }

    if (search) {
      query.$or = [
        { displayName: { $regex: search, $options: 'i' } },
        { bio: { $regex: search, $options: 'i' } },
        { cuisineTypes: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const cooks = await CookProfile.find(query).sort({ averageRating: -1 });

    return NextResponse.json({
      success: true,
      data: cooks,
      meta: { total: cooks.length },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
