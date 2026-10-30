import { connectDB } from './db';
import User from '../models/User';
import CookProfile from '../models/CookProfile';
import CookApplication from '../models/CookApplication';
import MealCategory from '../models/MealCategory';
import Meal from '../models/Meal';
import SubscriptionPlan from '../models/SubscriptionPlan';
import Order from '../models/Order';
import Payment from '../models/Payment';
import Review from '../models/Review';
import { hashPassword } from './auth';

export async function runSeed() {
  await connectDB();

  // Clear existing collections safely
  await User.deleteMany({});
  await CookProfile.deleteMany({});
  await CookApplication.deleteMany({});
  await MealCategory.deleteMany({});
  await Meal.deleteMany({});
  await SubscriptionPlan.deleteMany({});
  await Order.deleteMany({});
  await Payment.deleteMany({});
  await Review.deleteMany({});

  const defaultPasswordHash = await hashPassword('password123');

  const CUSTOMER_USER_ID = new mongoose.Types.ObjectId('66a000000000000000000001');
  const COOK_USER_ID = new mongoose.Types.ObjectId('66a000000000000000000002');
  const ADMIN_USER_ID = new mongoose.Types.ObjectId('66a000000000000000000003');
  const COOK_PROFILE_ID = new mongoose.Types.ObjectId('66a000000000000000000010');

  // 1. Create Users (Deterministic IDs ensure existing client sessions persist across seeds)
  const customerUser = await User.create({
    _id: CUSTOMER_USER_ID,
    name: 'Rahul Sharma',
    email: 'customer@tiffinmitra.com',
    normalizedEmail: 'customer@tiffinmitra.com',
    passwordHash: defaultPasswordHash,
    role: 'customer',
    phone: '+91 98765 43210',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    accountStatus: 'active',
    addresses: [
      {
        label: 'Home',
        recipientName: 'Rahul Sharma',
        phone: '+91 98765 43210',
        addressLine1: 'Flat 402, Shivalik Residency, Near Vastrapur Lake',
        locality: 'Vastrapur',
        city: 'Ahmedabad',
        postalCode: '380015',
        deliveryInstructions: 'Ring doorbell, 4th floor elevator accessible',
        isDefault: true,
      },
      {
        label: 'Work',
        recipientName: 'Rahul Sharma',
        phone: '+91 98765 43210',
        addressLine1: 'Tower B, 3rd Floor, Titanium City Center',
        locality: 'Prahlad Nagar',
        city: 'Ahmedabad',
        postalCode: '380015',
        deliveryInstructions: 'Leave with reception security desk',
        isDefault: false,
      },
    ],
  });

  const cookUser1 = await User.create({
    _id: COOK_USER_ID,
    name: 'Asha Patel',
    email: 'cook@tiffinmitra.com',
    normalizedEmail: 'cook@tiffinmitra.com',
    passwordHash: defaultPasswordHash,
    role: 'cook',
    phone: '+91 98450 11223',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    accountStatus: 'active',
  });

  const adminUser = await User.create({
    _id: ADMIN_USER_ID,
    name: 'Admin Operator',
    email: 'admin@tiffinmitra.com',
    normalizedEmail: 'admin@tiffinmitra.com',
    passwordHash: defaultPasswordHash,
    role: 'admin',
    phone: '+91 99999 88888',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    accountStatus: 'active',
  });

  // 2. Create Cook Profile (Exclusively Asha's Gujarati Rasoi)
  const cookProfile1 = await CookProfile.create({
    _id: COOK_PROFILE_ID,
    userId: cookUser1._id,
    slug: 'ashas-gujarati-rasoi',
    displayName: "Asha's Gujarati Rasoi",
    bio: 'Cooking with 25+ years of motherly warmth. Serving authentic, comforting Gujarati & Kathiyawadi thalis with zero soda and hand-ground spices.',
    profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80',
    cuisineTypes: ['Gujarati', 'Kathiyawadi', 'North Indian'],
    dietaryOptions: ['veg', 'jain'],
    serviceAreas: ['Navrangpura', 'Vastrapur', 'Satellite', 'Bodakdev', 'Prahlad Nagar'],
    deliveryEnabled: true,
    pickupEnabled: true,
    operatingHours: '11:00 AM - 09:30 PM',
    preparationTimeMinutes: 35,
    dailyOrderCapacity: 35,
    applicationStatus: 'approved',
    isAcceptingOrders: true,
    averageRating: 4.9,
    reviewCount: 84,
    fssaiNumber: '21223010000456',
    kitchenHygieneCertified: true,
  });

  // 3. Create Categories
  await MealCategory.create([
    { name: 'Daily Thalis', slug: 'daily-thalis', description: 'Complete balanced home meals with rotis, sabzi, dal & rice', sortOrder: 1 },
    { name: 'Regional Specials', slug: 'regional-specials', description: 'Authentic heirloom dishes from diverse Indian states', sortOrder: 2 },
    { name: 'Dietary & Jain', slug: 'dietary-jain', description: 'Zero root vegetables, sattvic and pure vegetarian preparations', sortOrder: 3 },
    { name: 'Weekly Subscriptions', slug: 'weekly-subscriptions', description: 'Pre-ordered daily tiffin plans for working professionals', sortOrder: 4 },
  ]);

  // 4. Create Meals (Prices in paise: ₹140 = 14000)
  const meal1 = await Meal.create({
    cookId: cookProfile1._id,
    name: 'Gujarati Ghar Ka Thali',
    slug: 'gujarati-ghar-ka-thali',
    description: '4 Soft Phulkas smeared with fresh ghee, Sev Tameta Sabzi, Gujarati Khatti-Meethi Dal, Steamed Basmati Rice, Kachumber & Chhach.',
    category: 'Daily Thalis',
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
    priceMinor: 14000, // ₹140
    portionDescription: '1 Person Comfort Meal (4 Phulkas, 150ml Dal, 150ml Sabzi, Rice, Salad & Chaas)',
    ingredients: ['Whole Wheat Atta', 'Country Tomatoes', 'Besan Sev', 'Tuvar Dal', 'Desi Ghee', 'Cumin'],
    allergens: ['Dairy (Ghee/Chaas)', 'Gluten'],
    dietaryLabels: ['veg', 'jain'],
    preparationMinutes: 30,
    availableQuantity: 12,
    isAvailable: true,
  });

  const meal2 = await Meal.create({
    cookId: cookProfile1._id,
    name: 'Kathiyawadi Ringan Bhartu & Rotla',
    slug: 'kathiyawadi-ringan-bhartu-rotla',
    description: 'Smoky fire-roasted baingan bhartha prepared with spring garlic, served with 2 Bajra Rotlas, White Butter (Makhan), and Jaggery.',
    category: 'Regional Specials',
    imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
    priceMinor: 18000, // ₹180
    portionDescription: 'Hearty Rustic Thali (2 Bajra Rotla, 200g Bhartu, Fresh White Butter, Gud)',
    ingredients: ['Roasted Eggplant', 'Bajra Flour', 'Spring Garlic', 'Fresh Makhan', 'Organic Jaggery'],
    allergens: ['Dairy (Makhan)'],
    dietaryLabels: ['veg'],
    preparationMinutes: 40,
    availableQuantity: 8,
    isAvailable: true,
  });

  const meal3 = await Meal.create({
    cookId: cookProfile1._id,
    name: 'Gujarati Dal Dhokli & Steamed Rice',
    slug: 'gujarati-dal-dhokli-steamed-rice',
    description: 'Traditional spiced whole wheat pasta simmered gently in a sweet-tangy tuvar dal gravy, served with Steamed Basmati Rice, roasted papad, and fresh chopped coriander.',
    category: 'Daily Thalis',
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
    priceMinor: 13000, // ₹130
    portionDescription: '1 Person Comfort Bowl (350ml Dal Dhokli, Steamed Rice, Roasted Papad & Pickle)',
    ingredients: ['Whole Wheat Flour', 'Tuvar Dal', 'Jaggery', 'Kokum', 'Peanuts', 'Ghee'],
    allergens: ['Dairy (Ghee)', 'Gluten', 'Peanuts'],
    dietaryLabels: ['veg', 'jain'],
    preparationMinutes: 30,
    availableQuantity: 10,
    isAvailable: true,
  });

  const meal4 = await Meal.create({
    cookId: cookProfile1._id,
    name: 'Methi Thepla with Chhundo & Fresh Curd',
    slug: 'methi-thepla-chhundo-curd',
    description: '4 Fragrant soft fenugreek and whole-wheat theplas spiced with ajwain and white sesame seeds. Served with sweet grated mango relish (Chhundo) and chilled homestyle curd.',
    category: 'Regional Specials',
    imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
    priceMinor: 12000, // ₹120
    portionDescription: 'Light Meal Box (4 Fresh Theplas, 100ml Curd, Chhundo Relish)',
    ingredients: ['Fresh Methi (Fenugreek)', 'Whole Wheat Atta', 'Sesame Seeds', 'Ajwain', 'Fresh Dahi', 'Mango Chhundo'],
    allergens: ['Dairy (Curd)', 'Gluten', 'Sesame'],
    dietaryLabels: ['veg', 'jain'],
    preparationMinutes: 25,
    availableQuantity: 15,
    isAvailable: true,
  });

  const meal5 = await Meal.create({
    cookId: cookProfile1._id,
    name: 'Jain Kathiyawadi Sev Tameta Thali',
    slug: 'jain-kathiyawadi-sev-tameta-thali',
    description: '100% Sattvic preparation: tangy desi tomato curry topped with crunchy spicy besan sev, served with 4 soft Phulkas, Gujarati sweet dal, steamed rice, and fresh buttermilk.',
    category: 'Dietary & Jain',
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
    priceMinor: 15000, // ₹150
    portionDescription: '1 Person Jain Thali (4 Phulkas, 150ml Sev Tameta, 150ml Dal, Rice, Chaas)',
    ingredients: ['Country Tomatoes', 'Besan Sev', 'Tuvar Dal', 'Whole Wheat Atta', 'Ghee'],
    allergens: ['Dairy (Ghee/Chaas)', 'Gluten'],
    dietaryLabels: ['veg', 'jain'],
    preparationMinutes: 30,
    availableQuantity: 12,
    isAvailable: true,
  });

  // 5. Create Subscription Plans (Exclusively Asha's Gujarati Rasoi)
  await SubscriptionPlan.create([
    {
      cookId: cookProfile1._id,
      name: '5-Day Weekday Gujarati Lunch Tiffin',
      description: 'Monday to Friday healthy lunch delivered hot before 1:00 PM. Balanced daily rotating menu of Gujarati subzis and soft rotis.',
      mealDefinitions: ['4 Phulkas with Ghee', 'Rotating Seasonal Sabzi', 'Dal or Kadhi', 'Rice', 'Chaas'],
      schedule: 'weekdays',
      durationDays: 5,
      mealSlots: ['lunch'],
      priceMinor: 65000, // ₹650 (5 meals @ ₹130)
      isActive: true,
    },
    {
      cookId: cookProfile1._id,
      name: '14-Day Gujarati Comfort Thali Routine',
      description: '14 days of wholesome homestyle Gujarati lunches. Daily variety with morning cutoff pause guarantee.',
      mealDefinitions: ['4 Phulkas', 'Daily Dal/Kadhi', 'Seasonal Sabzi', 'Steamed Rice', 'Salad & Chaas'],
      schedule: 'daily',
      durationDays: 14,
      mealSlots: ['lunch'],
      priceMinor: 182000, // ₹1820 (14 meals @ ₹130)
      isActive: true,
    },
    {
      cookId: cookProfile1._id,
      name: 'Monthly Complete Ghar Ka Khana Plan',
      description: '30-day complete meal peace of mind. Wholesome lunch thali + Light comforting dinner.',
      mealDefinitions: ['Lunch: Gujarati Ghar Ka Thali', 'Dinner: 4 Theplas or Dal Dhokli with fresh Curd'],
      schedule: 'daily',
      durationDays: 30,
      mealSlots: ['lunch', 'dinner'],
      priceMinor: 600000, // ₹6000 (60 meals)
      isActive: true,
    },
  ]);

  // 7. Create Demo Orders for Customer
  const completedOrder = await Order.create({
    orderNumber: 'TM-2026-9041',
    customerId: customerUser._id,
    customerName: customerUser.name,
    customerPhone: customerUser.phone,
    cookId: cookProfile1._id,
    cookName: cookProfile1.displayName,
    items: [
      {
        mealId: meal1._id,
        mealName: meal1.name,
        imageUrl: meal1.imageUrl,
        unitPriceMinor: meal1.priceMinor,
        quantity: 2,
        lineTotalMinor: meal1.priceMinor * 2,
      },
    ],
    deliveryMode: 'delivery',
    deliveryAddress: {
      recipientName: 'Rahul Sharma',
      phone: '+91 98765 43210',
      addressLine1: 'Flat 402, Shivalik Residency, Near Vastrapur Lake',
      locality: 'Vastrapur',
      city: 'Ahmedabad',
      postalCode: '380015',
    },
    deliverySlot: 'Lunch (12:30 PM - 01:30 PM)',
    subtotalMinor: 28000,
    deliveryFeeMinor: 3000,
    taxMinor: 1400,
    discountMinor: 0,
    totalMinor: 32400, // ₹324
    paymentStatus: 'succeeded',
    paymentMethod: 'upi',
    paymentId: 'pay_demo_completed_001',
    orderStatus: 'delivered',
    placedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    acceptedAt: new Date(Date.now() - 1000 * 60 * 60 * 23.5),
    preparingAt: new Date(Date.now() - 1000 * 60 * 60 * 23),
    readyAt: new Date(Date.now() - 1000 * 60 * 60 * 22),
    deliveredAt: new Date(Date.now() - 1000 * 60 * 60 * 21.5),
  });

  await Payment.create({
    paymentId: 'pay_demo_completed_001',
    orderId: completedOrder._id,
    customerId: customerUser._id,
    provider: 'mock',
    providerReference: 'MOCK_UPI_REF_9041',
    idempotencyKey: 'idemp_order_9041',
    amountMinor: 32400,
    currency: 'INR',
    method: 'upi',
    status: 'succeeded',
    processedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  });

  // Active Preparing Order
  const activeOrder = await Order.create({
    orderNumber: 'TM-2026-9042',
    customerId: customerUser._id,
    customerName: customerUser.name,
    customerPhone: customerUser.phone,
    cookId: cookProfile1._id,
    cookName: cookProfile1.displayName,
    items: [
      {
        mealId: meal1._id,
        mealName: meal1.name,
        imageUrl: meal1.imageUrl,
        unitPriceMinor: meal1.priceMinor,
        quantity: 1,
        lineTotalMinor: meal1.priceMinor,
      },
      {
        mealId: meal2._id,
        mealName: meal2.name,
        imageUrl: meal2.imageUrl,
        unitPriceMinor: meal2.priceMinor,
        quantity: 1,
        lineTotalMinor: meal2.priceMinor,
      },
    ],
    deliveryMode: 'delivery',
    deliveryAddress: {
      recipientName: 'Rahul Sharma',
      phone: '+91 98765 43210',
      addressLine1: 'Flat 402, Shivalik Residency, Near Vastrapur Lake',
      locality: 'Vastrapur',
      city: 'Ahmedabad',
      postalCode: '380015',
    },
    deliverySlot: 'Lunch (12:30 PM - 01:30 PM)',
    subtotalMinor: 32000,
    deliveryFeeMinor: 3000,
    taxMinor: 1600,
    discountMinor: 0,
    totalMinor: 36600, // ₹366
    paymentStatus: 'succeeded',
    paymentMethod: 'upi',
    paymentId: 'pay_demo_active_002',
    orderStatus: 'preparing',
    placedAt: new Date(Date.now() - 1000 * 60 * 35),
    acceptedAt: new Date(Date.now() - 1000 * 60 * 25),
    preparingAt: new Date(Date.now() - 1000 * 60 * 15),
  });

  await Payment.create({
    paymentId: 'pay_demo_active_002',
    orderId: activeOrder._id,
    customerId: customerUser._id,
    provider: 'mock',
    providerReference: 'MOCK_UPI_REF_9042',
    idempotencyKey: 'idemp_order_9042',
    amountMinor: 36600,
    currency: 'INR',
    method: 'upi',
    status: 'succeeded',
    processedAt: new Date(Date.now() - 1000 * 60 * 35),
  });

  // 8. Create Verified Review for Completed Order
  await Review.create({
    customerId: customerUser._id,
    customerName: customerUser.name,
    cookId: cookProfile1._id,
    orderId: completedOrder._id,
    rating: 5,
    comment: 'Tasted just like maa ke haath ka khana! The phulkas were super soft and the khatti-meethi dal had the perfect authentic flavor. Delivered right on time.',
  });

  return {
    success: true,
    message: 'Database successfully seeded with realistic demo data, cooks, meals, orders, and payment records!',
  };
}
