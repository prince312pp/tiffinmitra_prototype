import mongoose, { Schema, Document } from 'mongoose';

export interface IUserDocument extends Document {
  name: string;
  email: string;
  normalizedEmail: string;
  passwordHash: string;
  role: 'customer' | 'cook' | 'admin';
  phone?: string;
  avatarUrl?: string;
  accountStatus: 'active' | 'suspended' | 'pending_verification';
  addresses?: Array<{
    label: string;
    recipientName: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    locality: string;
    city: string;
    postalCode: string;
    deliveryInstructions?: string;
    isDefault: boolean;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    normalizedEmail: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['customer', 'cook', 'admin'], default: 'customer' },
    phone: { type: String },
    avatarUrl: { type: String },
    accountStatus: { type: String, enum: ['active', 'suspended', 'pending_verification'], default: 'active' },
    addresses: [
      {
        label: { type: String, default: 'Home' },
        recipientName: { type: String, required: true },
        phone: { type: String, required: true },
        addressLine1: { type: String, required: true },
        addressLine2: { type: String },
        locality: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        deliveryInstructions: { type: String },
        isDefault: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUserDocument>('User', UserSchema);
