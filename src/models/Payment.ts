import mongoose, { Schema, Document } from 'mongoose';

export interface IPaymentDocument extends Document {
  paymentId: string;
  orderId: mongoose.Types.ObjectId;
  customerId: mongoose.Types.ObjectId;
  provider: 'mock' | 'razorpay';
  providerReference: string;
  idempotencyKey: string;
  amountMinor: number;
  currency: string;
  method: string;
  status: 'pending' | 'processing' | 'succeeded' | 'failed' | 'refunded';
  failureReason?: string;
  simulatedScenario?: string;
  refundAmountMinor?: number;
  processedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<IPaymentDocument>(
  {
    paymentId: { type: String, required: true, unique: true, index: true },
    orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true, index: true },
    customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    provider: { type: String, default: 'mock' },
    providerReference: { type: String, required: true },
    idempotencyKey: { type: String, index: true },
    amountMinor: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    method: { type: String, default: 'upi' },
    status: {
      type: String,
      enum: ['pending', 'processing', 'succeeded', 'failed', 'refunded'],
      default: 'pending',
      index: true,
    },
    failureReason: { type: String },
    simulatedScenario: { type: String },
    refundAmountMinor: { type: Number, default: 0 },
    processedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Payment || mongoose.model<IPaymentDocument>('Payment', PaymentSchema);
