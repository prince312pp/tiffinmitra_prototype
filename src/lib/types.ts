export type Role = 'customer' | 'cook' | 'admin';

export type DietaryType = 'veg' | 'jain' | 'nonVeg' | 'vegan';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: Role;
  phone?: string;
  avatarUrl?: string;
  addresses?: any[];
  accountStatus: 'active' | 'suspended' | 'pending_verification';
  createdAt: string;
}

export interface IAddress {
  _id: string;
  userId: string;
  label: 'Home' | 'Work' | 'PG / Hostel' | 'Other';
  recipientName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  locality: string;
  city: string;
  postalCode: string;
  deliveryInstructions?: string;
  isDefault: boolean;
}

export interface ICookProfile {
  _id: string;
  userId: string;
  slug: string;
  displayName: string;
  bio: string;
  profileImage: string;
  coverImage: string;
  cuisineTypes: string[];
  dietaryOptions: DietaryType[];
  serviceAreas: string[];
  deliveryEnabled: boolean;
  pickupEnabled: boolean;
  operatingHours: string;
  preparationTimeMinutes: number;
  dailyOrderCapacity: number;
  applicationStatus: 'draft' | 'pending_review' | 'approved' | 'rejected' | 'suspended';
  isAcceptingOrders: boolean;
  averageRating: number;
  reviewCount: number;
  fssaiNumber?: string;
  kitchenHygieneCertified: boolean;
  createdAt: string;
}

export interface IMeal {
  _id: string;
  cookId: string;
  cookSlug?: string;
  cookName?: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  imageUrl: string;
  priceMinor: number; // Stored in Paise (e.g. 14000 = ₹140)
  portionDescription: string;
  ingredients: string[];
  allergens?: string[];
  dietaryLabels: DietaryType[];
  preparationMinutes: number;
  availableQuantity: number;
  isAvailable: boolean;
}

export interface ICartItem {
  mealId: string;
  name: string;
  imageUrl: string;
  priceMinor: number;
  quantity: number;
  portionDescription: string;
}

export interface ICart {
  cookId: string | null;
  cookName: string | null;
  cookSlug: string | null;
  items: ICartItem[];
}

export type OrderStatus =
  | 'pending_payment'
  | 'placed'
  | 'accepted'
  | 'preparing'
  | 'ready_for_pickup'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'rejected';

export type PaymentStatus =
  | 'pending'
  | 'processing'
  | 'succeeded'
  | 'failed'
  | 'refunded';

export interface IOrderItemSnapshot {
  mealId: string;
  mealName: string;
  imageUrl: string;
  unitPriceMinor: number;
  quantity: number;
  lineTotalMinor: number;
}

export interface IOrder {
  _id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  cookId: string;
  cookName: string;
  items: IOrderItemSnapshot[];
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
  paymentStatus: PaymentStatus;
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod';
  paymentId?: string;
  orderStatus: OrderStatus;
  customerNotes?: string;
  cancellationReason?: string;
  placedAt: string;
  acceptedAt?: string;
  preparingAt?: string;
  readyAt?: string;
  deliveredAt?: string;
  cancelledAt?: string;
  createdAt: string;
}

export interface IPaymentRecord {
  _id: string;
  paymentId: string;
  orderId: string;
  customerId: string;
  provider: 'mock' | 'razorpay';
  providerReference: string;
  idempotencyKey: string;
  amountMinor: number;
  currency: string;
  method: string;
  status: PaymentStatus;
  failureReason?: string;
  simulatedScenario?: string;
  processedAt: string;
  createdAt: string;
}

export interface ISubscriptionPlan {
  _id: string;
  cookId: string;
  cookName?: string;
  cookSlug?: string;
  name: string;
  description: string;
  mealDefinitions: string[];
  schedule: 'weekdays' | 'daily' | 'weekends';
  durationDays: number; // e.g. 7, 14, 30
  mealSlots: ('lunch' | 'dinner')[];
  priceMinor: number;
  isActive: boolean;
}

export interface ISubscription {
  _id: string;
  subscriptionNumber: string;
  customerId: string;
  customerName: string;
  cookId: string;
  cookName: string;
  planId: string;
  planName: string;
  mealSlots: ('lunch' | 'dinner')[];
  startDate: string;
  endDate: string;
  pausedDates: string[]; // ISO date strings YYYY-MM-DD
  status: 'active' | 'paused' | 'completed' | 'cancelled';
  totalMinor: number;
  deliveryAddress: {
    addressLine1: string;
    locality: string;
    city: string;
  };
  createdAt: string;
}

export interface IReview {
  _id: string;
  customerId: string;
  customerName: string;
  cookId: string;
  orderId: string;
  rating: number; // 1-5
  comment: string;
  createdAt: string;
}

export interface ICookApplication {
  _id: string;
  userId: string;
  applicantName: string;
  kitchenName: string;
  phone: string;
  email: string;
  address: string;
  locality: string;
  cuisineSpecialties: string[];
  fssaiNumber?: string;
  dailyCapacity: number;
  status: 'draft' | 'pending_review' | 'approved' | 'rejected';
  rejectionReason?: string;
  reviewNotes?: string;
  submittedAt: string;
  reviewedAt?: string;
}
