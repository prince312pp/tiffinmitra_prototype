import mongoose, { Schema, Document } from 'mongoose';

export interface ICartDocument extends Document {
  userId: mongoose.Types.ObjectId;
  cookId: mongoose.Types.ObjectId | null;
  items: Array<{
    mealId: mongoose.Types.ObjectId;
    name: string;
    imageUrl: string;
    priceMinor: number;
    quantity: number;
    portionDescription: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const CartSchema = new Schema<ICartDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    cookId: { type: Schema.Types.ObjectId, ref: 'CookProfile', default: null },
    items: [
      {
        mealId: { type: Schema.Types.ObjectId, ref: 'Meal', required: true },
        name: { type: String, required: true },
        imageUrl: { type: String, required: true },
        priceMinor: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1 },
        portionDescription: { type: String, default: '' },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Cart || mongoose.model<ICartDocument>('Cart', CartSchema);
