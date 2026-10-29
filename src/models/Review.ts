import mongoose, { Schema, Document } from 'mongoose';

export interface IReviewDocument extends Document {
  customerId: mongoose.Types.ObjectId;
  customerName: string;
  cookId: mongoose.Types.ObjectId;
  orderId: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReviewDocument>(
  {
    customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    customerName: { type: String, required: true },
    cookId: { type: Schema.Types.ObjectId, ref: 'CookProfile', required: true, index: true },
    orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, default: '' },
  },
  { timestamps: true }
);

ReviewSchema.index({ cookId: 1, createdAt: -1 });

export default mongoose.models.Review || mongoose.model<IReviewDocument>('Review', ReviewSchema);
