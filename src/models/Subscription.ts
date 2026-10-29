import mongoose, { Schema, Document } from 'mongoose';

export interface ISubscriptionDocument extends Document {
  subscriptionNumber: string;
  customerId: mongoose.Types.ObjectId;
  customerName: string;
  cookId: mongoose.Types.ObjectId;
  cookName: string;
  planId: mongoose.Types.ObjectId;
  planName: string;
  mealSlots: ('lunch' | 'dinner')[];
  startDate: Date;
  endDate: Date;
  pausedDates: string[]; // YYYY-MM-DD
  status: 'active' | 'paused' | 'completed' | 'cancelled';
  totalMinor: number;
  deliveryAddress: {
    addressLine1: string;
    locality: string;
    city: string;
  };
  paymentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SubscriptionSchema = new Schema<ISubscriptionDocument>(
  {
    subscriptionNumber: { type: String, required: true, unique: true, index: true },
    customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    customerName: { type: String, required: true },
    cookId: { type: Schema.Types.ObjectId, ref: 'CookProfile', required: true, index: true },
    cookName: { type: String, required: true },
    planId: { type: Schema.Types.ObjectId, ref: 'SubscriptionPlan', required: true },
    planName: { type: String, required: true },
    mealSlots: [{ type: String, enum: ['lunch', 'dinner'] }],
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    pausedDates: [{ type: String }],
    status: {
      type: String,
      enum: ['active', 'paused', 'completed', 'cancelled'],
      default: 'active',
      index: true,
    },
    totalMinor: { type: Number, required: true },
    deliveryAddress: {
      addressLine1: { type: String, required: true },
      locality: { type: String, required: true },
      city: { type: String, required: true },
    },
    paymentId: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Subscription ||
  mongoose.model<ISubscriptionDocument>('Subscription', SubscriptionSchema);
