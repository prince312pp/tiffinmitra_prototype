import mongoose, { Schema, Document } from 'mongoose';

export interface ICookApplicationDocument extends Document {
  userId: mongoose.Types.ObjectId;
  applicantName: string;
  kitchenName: string;
  phone: string;
  email: string;
  address: string;
  locality: string;
  cuisineSpecialties: string[];
  fssaiNumber?: string;
  dailyCapacity: number;
  status: 'draft' | 'pending_review' | 'approved' | 'rejected';
  rejectionReason?: string;
  reviewNotes?: string;
  submittedAt: Date;
  reviewedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const CookApplicationSchema = new Schema<ICookApplicationDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    applicantName: { type: String, required: true },
    kitchenName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    locality: { type: String, required: true },
    cuisineSpecialties: [{ type: String }],
    fssaiNumber: { type: String },
    dailyCapacity: { type: Number, default: 25 },
    status: {
      type: String,
      enum: ['draft', 'pending_review', 'approved', 'rejected'],
      default: 'pending_review',
      index: true,
    },
    rejectionReason: { type: String },
    reviewNotes: { type: String },
    submittedAt: { type: Date, default: Date.now },
    reviewedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.CookApplication ||
  mongoose.model<ICookApplicationDocument>('CookApplication', CookApplicationSchema);
