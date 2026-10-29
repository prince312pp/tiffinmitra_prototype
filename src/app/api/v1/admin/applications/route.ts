import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import CookApplication from '@/models/CookApplication';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const tokenUser = getUserFromRequest(request);
    if (!tokenUser || tokenUser.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Administrator access required' }, { status: 403 });
    }

    const applications = await CookApplication.find().sort({ submittedAt: -1 });

    return NextResponse.json({
      success: true,
      data: applications,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const tokenUser = getUserFromRequest(request);
    const body = await request.json();

    const {
      applicantName,
      kitchenName,
      phone,
      email,
      address,
      locality,
      cuisineSpecialties = [],
      fssaiNumber,
      dailyCapacity = 25,
    } = body;

    if (!applicantName || !kitchenName || !phone || !email || !locality) {
      return NextResponse.json(
        { success: false, error: 'All core kitchen details are required' },
        { status: 400 }
      );
    }

    const application = await CookApplication.create({
      userId: tokenUser?.userId,
      applicantName,
      kitchenName,
      phone,
      email,
      address,
      locality,
      cuisineSpecialties: Array.isArray(cuisineSpecialties) ? cuisineSpecialties : [cuisineSpecialties],
      fssaiNumber,
      dailyCapacity: Number(dailyCapacity),
      status: 'pending_review',
      submittedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully for kitchen hygiene and platform review',
      data: application,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
