import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import CookProfile from '@/models/CookProfile';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const tokenUser = getUserFromRequest(request);

    if (!tokenUser) {
      return NextResponse.json({ success: false, error: 'Unauthenticated' }, { status: 401 });
    }

    const user = await User.findById(tokenUser.userId).select('-passwordHash');
    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
    }

    let cookProfile = null;
    if (user.role === 'cook') {
      cookProfile = await CookProfile.findOne({ userId: user._id });
    }

    return NextResponse.json({
      success: true,
      data: {
        user,
        cookProfile,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
