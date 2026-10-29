import mongoose, { Schema, Document } from 'mongoose';

export interface IMealDocument extends Document {
  cookId: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  description: string;
  category: string;
  imageUrl: string;
  priceMinor: number; // in paise
  portionDescription: string;
  ingredients: string[];
  allergens: string[];
  dietaryLabels: string[];
  preparationMinutes: number;
  availableQuantity: number;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MealSchema = new Schema<IMealDocument>(
  {
    cookId: { type: Schema.Types.ObjectId, ref: 'CookProfile', required: true, index: true },
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    priceMinor: { type: Number, required: true }, // integer paise
    portionDescription: { type: String, default: 'Standard 1 Person Thali (3 Rotis, Dal, Sabzi, Rice, Salad)' },
    ingredients: [{ type: String }],
    allergens: [{ type: String }],
    dietaryLabels: [{ type: String }], // 'veg', 'jain', 'nonVeg', 'vegan'
    preparationMinutes: { type: Number, default: 35 },
    availableQuantity: { type: Number, default: 15 },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

MealSchema.index({ cookId: 1, isAvailable: 1 });
MealSchema.index({ dietaryLabels: 1 });
MealSchema.index({ category: 1 });

export default mongoose.models.Meal || mongoose.model<IMealDocument>('Meal', MealSchema);
