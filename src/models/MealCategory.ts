import mongoose, { Schema, Document } from 'mongoose';

export interface IMealCategoryDocument extends Document {
  name: string;
  slug: string;
  description: string;
  imageUrl?: string;
  isActive: boolean;
  sortOrder: number;
}

const MealCategorySchema = new Schema<IMealCategoryDocument>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: '' },
    imageUrl: { type: String },
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.MealCategory ||
  mongoose.model<IMealCategoryDocument>('MealCategory', MealCategorySchema);
