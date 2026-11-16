import mongoose from 'mongoose';
import User from '@/models/User';
import CookProfile from '@/models/CookProfile';
import Meal from '@/models/Meal';
import MealCategory from '@/models/MealCategory';
import Order from '@/models/Order';
import Payment from '@/models/Payment';
import Subscription from '@/models/Subscription';
import SubscriptionPlan from '@/models/SubscriptionPlan';
import Review from '@/models/Review';
import Cart from '@/models/Cart';
import CookApplication from '@/models/CookApplication';
import AuditLog from '@/models/AuditLog';
import Favorite from '@/models/Favorite';

// Pre-register all models to avoid MissingSchemaError in serverless functions
export const models = {
  User,
  CookProfile,
  Meal,
  MealCategory,
  Order,
  Payment,
  Subscription,
  SubscriptionPlan,
  Review,
  Cart,
  CookApplication,
  AuditLog,
  Favorite,
};

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tiffinmitra';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

export async function connectDB(): Promise<typeof mongoose> {
  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    };

    cached!.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    cached!.conn = await cached!.promise;
  } catch (e) {
    cached!.promise = null;
    throw e;
  }

  return cached!.conn;
}
