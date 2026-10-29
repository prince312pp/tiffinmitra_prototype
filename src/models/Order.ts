import mongoose, { Schema, Document } from 'mongoose';

export interface IOrderDocument extends Document {
  orderNumber: string;
  customerId: mongoose.Types.ObjectId;
  customerName: string;
  customerPhone: string;
  cookId: mongoose.Types.ObjectId;
  cookName: string;
  items: Array<{
    mealId: mongoose.Types.ObjectId;
    mealName: string;
    imageUrl: string;
    unitPriceMinor: number;
    quantity: number;
    lineTotalMinor: number;
  }>;
  deliveryMode: 'delivery' | 'pickup';
  deliveryAddress?: {
    recipientName: string;
    phone: string;
    addressLine1: string;
    locality: string;
    city: string;
    postalCode: string;
    instructions?: string;
  };
  deliverySlot?: string;
  subtotalMinor: number;
  deliveryFeeMinor: number;
  taxMinor: number;
  discountMinor: number;
  totalMinor: number;
  currency: string;
  paymentStatus: 'pending' | 'processing' | 'succeeded' | 'failed' | 'refunded';
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod';
  paymentId?: string;
  orderStatus:
    | 'pending_payment'
    | 'placed'
    | 'accepted'
    | 'preparing'
    | 'ready_for_pickup'
    | 'out_for_delivery'
    | 'delivered'
    | 'cancelled'
    | 'rejected';
  customerNotes?: string;
  cookNotes?: string;
  cancellationReason?: string;
  placedAt: Date;
  acceptedAt?: Date;
  preparingAt?: Date;
  readyAt?: Date;
  deliveredAt?: Date;
  cancelledAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrderDocument>(
  {
    orderNumber: { type: String, required: true, unique: true, index: true },
    customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    cookId: { type: Schema.Types.ObjectId, ref: 'CookProfile', required: true, index: true },
    cookName: { type: String, required: true },
    items: [
      {
        mealId: { type: Schema.Types.ObjectId, ref: 'Meal', required: true },
        mealName: { type: String, required: true },
        imageUrl: { type: String, required: true },
        unitPriceMinor: { type: Number, required: true },
        quantity: { type: Number, required: true },
        lineTotalMinor: { type: Number, required: true },
      },
    ],
    deliveryMode: { type: String, enum: ['delivery', 'pickup'], default: 'delivery' },
    deliveryAddress: {
      recipientName: { type: String },
      phone: { type: String },
      addressLine1: { type: String },
      locality: { type: String },
      city: { type: String },
      postalCode: { type: String },
      instructions: { type: String },
    },
    deliverySlot: { type: String, default: 'Lunch (12:30 PM - 01:30 PM)' },
    subtotalMinor: { type: Number, required: true },
    deliveryFeeMinor: { type: Number, default: 0 },
    taxMinor: { type: Number, default: 0 },
    discountMinor: { type: Number, default: 0 },
    totalMinor: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    paymentStatus: {
      type: String,
      enum: ['pending', 'processing', 'succeeded', 'failed', 'refunded'],
      default: 'pending',
      index: true,
    },
    paymentMethod: {
      type: String,
      enum: ['upi', 'card', 'netbanking', 'cod'],
      default: 'upi',
    },
    paymentId: { type: String },
    orderStatus: {
      type: String,
      enum: [
        'pending_payment',
        'placed',
        'accepted',
        'preparing',
        'ready_for_pickup',
        'out_for_delivery',
        'delivered',
        'cancelled',
        'rejected',
      ],
      default: 'placed',
      index: true,
    },
    customerNotes: { type: String },
    cookNotes: { type: String },
    cancellationReason: { type: String },
    placedAt: { type: Date, default: Date.now },
    acceptedAt: { type: Date },
    preparingAt: { type: Date },
    readyAt: { type: Date },
    deliveredAt: { type: Date },
    cancelledAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model<IOrderDocument>('Order', OrderSchema);
