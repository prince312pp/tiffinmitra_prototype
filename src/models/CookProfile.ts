import mongoose, { Schema, Document } from 'mongoose';

export interface ICookProfileDocument extends Document {
  userId: mongoose.Types.ObjectId;
  slug: string;
  displayName: string;
  bio: string;
  profileImage: string;
  coverImage: string;
  cuisineTypes: string[];
  dietaryOptions: string[];
  serviceAreas: string[];
  deliveryEnabled: boolean;
  pickupEnabled: boolean;
  operatingHours: string;
  preparationTimeMinutes: number;
  dailyOrderCapacity: number;
  applicationStatus: 'draft' | 'pending_review' | 'approved' | 'rejected' | 'suspended';
  isAcceptingOrders: boolean;
  averageRating: number;
  reviewCount: number;
  fssaiNumber?: string;
  kitchenHygieneCertified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CookProfileSchema = new Schema<ICookProfileDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    slug: { type: String, required: true, unique: true, index: true },
    displayName: { type: String, required: true },
    bio: { type: String, default: '' },
    profileImage: { type: String, default: '' },
    coverImage: { type: String, default: '' },
    cuisineTypes: [{ type: String }],
    dietaryOptions: [{ type: String }],
    serviceAreas: [{ type: String }],
    deliveryEnabled: { type: Boolean, default: true },
    pickupEnabled: { type: Boolean, default: true },
    operatingHours: { type: String, default: '10:00 AM - 09:00 PM' },
    preparationTimeMinutes: { type: Number, default: 45 },
    dailyOrderCapacity: { type: Number, default: 30 },
    applicationStatus: {
      type: String,
      enum: ['draft', 'pending_review', 'approved', 'rejected', 'suspended'],
      default: 'approved',
      index: true,
    },
    isAcceptingOrders: { type: Boolean, default: true },
    averageRating: { type: Number, default: 4.8 },
    reviewCount: { type: Number, default: 0 },
    fssaiNumber: { type: String },
    kitchenHygieneCertified: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.CookProfile ||
  mongoose.model<ICookProfileDocument>('CookProfile', CookProfileSchema);
