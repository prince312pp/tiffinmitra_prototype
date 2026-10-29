import mongoose, { Schema, Document } from 'mongoose';

export interface IFavoriteDocument extends Document {
  customerId: mongoose.Types.ObjectId;
  cookId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const FavoriteSchema = new Schema<IFavoriteDocument>(
  {
    customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    cookId: { type: Schema.Types.ObjectId, ref: 'CookProfile', required: true },
  },
  { timestamps: true }
);

FavoriteSchema.index({ customerId: 1, cookId: 1 }, { unique: true });

export default mongoose.models.Favorite || mongoose.model<IFavoriteDocument>('Favorite', FavoriteSchema);
