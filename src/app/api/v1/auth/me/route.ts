import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import CookProfile from '@/models/CookProfile';
import { getUserFromRequest, signToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const tokenUser = getUserFromRequest(request);

    if (!tokenUser) {
      return NextResponse.json({ success: false, error: 'Unauthenticated' }, { status: 401 });
    }

    let user = null;
    if (tokenUser.userId) {
      try {
        user = await User.findById(tokenUser.userId).select('-passwordHash');
      } catch {
        user = null;
      }
    }

    // Resilient fallback: If database was re-seeded and userId changed, recover user by email
    if (!user && tokenUser.email) {
      user = await User.findOne({ email: tokenUser.email }).select('-passwordHash');
    }

    if (!user) {
      const response = NextResponse.json({ success: false, error: 'User not found' }, { status: 401 });
      response.cookies.delete('tm_token');
      return response;
    }

    let cookProfile = null;
    if (user.role === 'cook') {
      cookProfile = await CookProfile.findOne({ userId: user._id });
    }

    const response = NextResponse.json({
      success: true,
      data: {
        user,
        cookProfile,
      },
    });

    // If userId changed after re-seeding, seamlessly update cookie with new id
    if (user._id.toString() !== tokenUser.userId) {
      const freshToken = signToken({
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
        name: user.name,
      });
      response.cookies.set('tm_token', freshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    return response;
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
