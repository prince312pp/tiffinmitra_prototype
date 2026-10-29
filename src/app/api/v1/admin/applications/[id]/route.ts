import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import CookApplication from '@/models/CookApplication';
import CookProfile from '@/models/CookProfile';
import User from '@/models/User';
import AuditLog from '@/models/AuditLog';
import { getUserFromRequest } from '@/lib/auth';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const tokenUser = getUserFromRequest(request);
    if (!tokenUser || tokenUser.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Administrator access required' }, { status: 403 });
    }

    const { id } = params;
    const body = await request.json();
    const { action, rejectionReason, reviewNotes } = body; // action: 'approve' | 'reject'

    const app = await CookApplication.findById(id);
    if (!app) {
      return NextResponse.json({ success: false, error: 'Application not found' }, { status: 404 });
    }

    const now = new Date();

    if (action === 'approve') {
      app.status = 'approved';
      app.reviewedAt = now;
      app.reviewNotes = reviewNotes || 'Kitchen hygiene inspected and verified.';
      await app.save();

      // Upgrade user role if userId is attached
      if (app.userId) {
        await User.findByIdAndUpdate(app.userId, { $set: { role: 'cook' } });

        const slug = app.kitchenName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        let cookProfile = await CookProfile.findOne({ userId: app.userId });
        if (!cookProfile) {
          cookProfile = await CookProfile.create({
            userId: app.userId,
            slug: `${slug}-${Date.now().toString().slice(-4)}`,
            displayName: app.kitchenName,
            bio: `Authentic domestic food prepared with care by ${app.applicantName}.`,
            cuisineTypes: app.cuisineSpecialties || ['Homestyle Indian'],
            dietaryOptions: ['veg'],
            serviceAreas: [app.locality],
            deliveryEnabled: true,
            pickupEnabled: true,
            applicationStatus: 'approved',
            isAcceptingOrders: true,
            dailyOrderCapacity: app.dailyCapacity || 25,
            fssaiNumber: app.fssaiNumber,
            kitchenHygieneCertified: true,
          });
        } else {
          cookProfile.applicationStatus = 'approved';
          cookProfile.isAcceptingOrders = true;
          await cookProfile.save();
        }
      }

      await AuditLog.create({
        actorUserId: tokenUser.userId,
        action: 'APPROVE_COOK_APPLICATION',
        entityType: 'CookApplication',
        entityId: app._id.toString(),
        metadata: { kitchenName: app.kitchenName },
      });

      return NextResponse.json({
        success: true,
        message: `Cook application for "${app.kitchenName}" approved!`,
        data: app,
      });
    } else if (action === 'reject') {
      app.status = 'rejected';
      app.rejectionReason = rejectionReason || 'Kitchen inspection requirements not met.';
      app.reviewedAt = now;
      await app.save();

      await AuditLog.create({
        actorUserId: tokenUser.userId,
        action: 'REJECT_COOK_APPLICATION',
        entityType: 'CookApplication',
        entityId: app._id.toString(),
        metadata: { kitchenName: app.kitchenName, reason: rejectionReason },
      });

      return NextResponse.json({
        success: true,
        message: `Cook application for "${app.kitchenName}" rejected.`,
        data: app,
      });
    }

    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
