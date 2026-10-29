import mongoose, { Schema, Document } from 'mongoose';

export interface ISubscriptionPlanDocument extends Document {
  cookId: mongoose.Types.ObjectId;
  name: string;
  description: string;
  mealDefinitions: string[];
  schedule: 'weekdays' | 'daily' | 'weekends';
  durationDays: number;
  mealSlots: ('lunch' | 'dinner')[];
  priceMinor: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SubscriptionPlanSchema = new Schema<ISubscriptionPlanDocument>(
  {
    cookId: { type: Schema.Types.ObjectId, ref: 'CookProfile', required: true, index: true },
    name: { type: String, required: true },
    description: { type: String, default: '' },
    mealDefinitions: [{ type: String }],
    schedule: { type: String, enum: ['weekdays', 'daily', 'weekends'], default: 'weekdays' },
    durationDays: { type: Number, default: 7 },
    mealSlots: [{ type: String, enum: ['lunch', 'dinner'] }],
    priceMinor: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.SubscriptionPlan ||
  mongoose.model<ISubscriptionPlanDocument>('SubscriptionPlan', SubscriptionPlanSchema);
