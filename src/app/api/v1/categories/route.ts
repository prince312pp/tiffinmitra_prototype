import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import MealCategory from '@/models/MealCategory';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    const categories = await MealCategory.find({ isActive: true }).sort({ sortOrder: 1 });
    return NextResponse.json({ success: true, data: categories });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
