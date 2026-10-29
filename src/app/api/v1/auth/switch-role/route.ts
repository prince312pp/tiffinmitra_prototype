import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import CookProfile from '@/models/CookProfile';
import { signToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { targetRole } = await request.json();

    let targetEmail = 'customer@tiffinmitra.com';
    if (targetRole === 'cook') {
      targetEmail = 'cook@tiffinmitra.com';
    } else if (targetRole === 'admin') {
      targetEmail = 'admin@tiffinmitra.com';
    }

    const user = await User.findOne({ email: targetEmail });
    if (!user) {
      return NextResponse.json({ success: false, error: 'Target demo account not found. Please seed first.' }, { status: 404 });
    }

    const token = signToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
      name: user.name,
    });

    let cookProfile = null;
    if (user.role === 'cook') {
      cookProfile = await CookProfile.findOne({ userId: user._id });
    }

    const response = NextResponse.json({
      success: true,
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          avatarUrl: user.avatarUrl,
          accountStatus: user.accountStatus,
          addresses: user.addresses || [],
        },
        cookProfile,
        token,
      },
    });

    response.cookies.set('tm_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
