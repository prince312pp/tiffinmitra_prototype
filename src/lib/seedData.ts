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

  // 1. Create Users
  const customerUser = await User.create({
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
        addressLine1: 'Flat 402, Green Glen Layout, 4th Cross',
        locality: 'Koramangala',
        city: 'Bengaluru',
        postalCode: '560034',
        deliveryInstructions: 'Ring doorbell, 4th floor elevator accessible',
        isDefault: true,
      },
      {
        label: 'Work',
        recipientName: 'Rahul Sharma',
        phone: '+91 98765 43210',
        addressLine1: 'Tower B, 3rd Floor, Tech Park',
        locality: 'HSR Layout',
        city: 'Bengaluru',
        postalCode: '560102',
        deliveryInstructions: 'Leave with reception security desk',
        isDefault: false,
      },
    ],
  });

  const cookUser1 = await User.create({
    name: 'Asha Patel',
    email: 'cook@tiffinmitra.com',
    normalizedEmail: 'cook@tiffinmitra.com',
    passwordHash: defaultPasswordHash,
    role: 'cook',
    phone: '+91 98450 11223',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    accountStatus: 'active',
  });

  const cookUser2 = await User.create({
    name: 'Sunita Kaur',
    email: 'sunita@tiffinmitra.com',
    normalizedEmail: 'sunita@tiffinmitra.com',
    passwordHash: defaultPasswordHash,
    role: 'cook',
    phone: '+91 98451 22334',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    accountStatus: 'active',
  });

  const cookUser3 = await User.create({
    name: 'Meenakshi Amma',
    email: 'meenakshi@tiffinmitra.com',
    normalizedEmail: 'meenakshi@tiffinmitra.com',
    passwordHash: defaultPasswordHash,
    role: 'cook',
    phone: '+91 98452 33445',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
    accountStatus: 'active',
  });

  const cookUser4 = await User.create({
    name: 'Fatima Begum',
    email: 'fatima@tiffinmitra.com',
    normalizedEmail: 'fatima@tiffinmitra.com',
    passwordHash: defaultPasswordHash,
    role: 'cook',
    phone: '+91 98453 44556',
    avatarUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=150&q=80',
    accountStatus: 'active',
  });

  const adminUser = await User.create({
    name: 'Admin Operator',
    email: 'admin@tiffinmitra.com',
    normalizedEmail: 'admin@tiffinmitra.com',
    passwordHash: defaultPasswordHash,
    role: 'admin',
    phone: '+91 99999 88888',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    accountStatus: 'active',
  });

  // 2. Create Cook Profiles
  const cookProfile1 = await CookProfile.create({
    userId: cookUser1._id,
    slug: 'ashas-gujarati-rasoi',
    displayName: "Asha's Gujarati Rasoi",
    bio: 'Cooking with 25+ years of motherly warmth. Serving authentic, comforting Gujarati & Kathiyawadi thalis with zero soda and hand-ground spices.',
    profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80',
    cuisineTypes: ['Gujarati', 'Kathiyawadi', 'North Indian'],
    dietaryOptions: ['veg', 'jain'],
    serviceAreas: ['Koramangala', 'HSR Layout', 'BTM Layout'],
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

  const cookProfile2 = await CookProfile.create({
    userId: cookUser2._id,
    slug: 'sunitas-punjabi-rasoi',
    displayName: "Sunita's Punjabi Rasoi",
    bio: 'Homestyle Amritsari Dal Makhani, Rajma Chawal, and soft whole-wheat Phulkas cooked in cold-pressed mustard oil with pure desi ghee.',
    profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=80',
    cuisineTypes: ['Punjabi', 'North Indian'],
    dietaryOptions: ['veg'],
    serviceAreas: ['Indiranagar', 'Domlur', 'Koramangala'],
    deliveryEnabled: true,
    pickupEnabled: true,
    operatingHours: '11:30 AM - 09:00 PM',
    preparationTimeMinutes: 40,
    dailyOrderCapacity: 30,
    applicationStatus: 'approved',
    isAcceptingOrders: true,
    averageRating: 4.8,
    reviewCount: 62,
    fssaiNumber: '21223010000789',
    kitchenHygieneCertified: true,
  });

  const cookProfile3 = await CookProfile.create({
    userId: cookUser3._id,
    slug: 'meenakshi-ammas-kitchen',
    displayName: "Meenakshi Amma's Kitchen",
    bio: 'Traditional South Indian home meals with freshly roasted Podi, steaming Sambhar, rasam, and seasonal vegetable poriyal.',
    profileImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=1200&q=80',
    cuisineTypes: ['South Indian', 'Tamilian'],
    dietaryOptions: ['veg', 'vegan'],
    serviceAreas: ['HSR Layout', 'Koramangala', 'Bellandur'],
    deliveryEnabled: true,
    pickupEnabled: false,
    operatingHours: '11:00 AM - 08:30 PM',
    preparationTimeMinutes: 30,
    dailyOrderCapacity: 40,
    applicationStatus: 'approved',
    isAcceptingOrders: true,
    averageRating: 4.9,
    reviewCount: 110,
    fssaiNumber: '21223010000321',
    kitchenHygieneCertified: true,
  });

  const cookProfile4 = await CookProfile.create({
    userId: cookUser4._id,
    slug: 'dastarkhwan-home-kitchen',
    displayName: "Dastarkhwan Home Kitchen",
    bio: 'Family heirloom recipes: homestyle Murgh Korma, slow-simmered aromatic dum biryani, and handmade tawa parathas with fresh raita.',
    profileImage: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80',
    cuisineTypes: ['Mughlai', 'Hyderabadi', 'North Indian'],
    dietaryOptions: ['nonVeg'],
    serviceAreas: ['BTM Layout', 'Jayanagar', 'JP Nagar'],
    deliveryEnabled: true,
    pickupEnabled: true,
    operatingHours: '12:00 PM - 10:00 PM',
    preparationTimeMinutes: 45,
    dailyOrderCapacity: 25,
    applicationStatus: 'approved',
    isAcceptingOrders: true,
    averageRating: 4.8,
    reviewCount: 48,
    fssaiNumber: '21223010000654',
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
    cookId: cookProfile2._id,
    name: 'Amritsari Rajma Chawal Thali',
    slug: 'amritsari-rajma-chawal-thali',
    description: 'Slow-simmered Kashmiri Rajma in thick tomato onion gravy, fragrant Jeera Rice, 2 Tawa Rotis, Boondi Raita, and spicy green chili pickle.',
    category: 'Daily Thalis',
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
    priceMinor: 16000, // ₹160
    portionDescription: 'Standard 1 Person Thali (200ml Rajma, Jeera Rice, 2 Rotis, Raita & Salad)',
    ingredients: ['Kashmiri Red Rajma', 'Basmati Rice', 'Cold Pressed Mustard Oil', 'Ginger Garlic', 'Whole Spices'],
    allergens: ['Dairy (Raita)', 'Gluten'],
    dietaryLabels: ['veg'],
    preparationMinutes: 35,
    availableQuantity: 15,
    isAvailable: true,
  });

  const meal4 = await Meal.create({
    cookId: cookProfile2._id,
    name: 'Punjabi Dal Makhani & Missi Roti',
    slug: 'punjabi-dal-makhani-missi-roti',
    description: 'Overnight slow-cooked black lentils with white butter, served with 2 spiced Missi Rotis, Sirka Onions, and fresh green mint chutney.',
    category: 'Regional Specials',
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
    priceMinor: 19000, // ₹190
    portionDescription: 'Special Meal (200ml Dal Makhani, 2 Missi Rotis, Salad & Chutney)',
    ingredients: ['Urad Dal', 'Rajma', 'Makhan', 'Gram Flour', 'Kasuri Methi'],
    allergens: ['Dairy (Butter/Cream)', 'Gluten'],
    dietaryLabels: ['veg'],
    preparationMinutes: 40,
    availableQuantity: 10,
    isAvailable: true,
  });

  const meal5 = await Meal.create({
    cookId: cookProfile3._id,
    name: 'South Indian Raja Thali',
    slug: 'south-indian-raja-thali',
    description: 'Steamed Ponni Rice, Drumstick Sambhar, Pepper Rasam, Cabbage Kootu, Potato Podimas, Crispy Appalam, and Sweet Payasam.',
    category: 'Daily Thalis',
    imageUrl: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=600&q=80',
    priceMinor: 15000, // ₹150
    portionDescription: 'Generous Meal Box (Ponni Rice, 150ml Sambar, 150ml Rasam, Kootu, Poriyal, Appalam)',
    ingredients: ['Ponni Rice', 'Drumsticks', 'Curry Leaves', 'Asafoetida', 'Grated Coconut'],
    allergens: ['Mustard Seeds'],
    dietaryLabels: ['veg', 'vegan'],
    preparationMinutes: 30,
    availableQuantity: 20,
    isAvailable: true,
  });

  const meal6 = await Meal.create({
    cookId: cookProfile4._id,
    name: 'Homestyle Murgh Curry Thali',
    slug: 'homestyle-murgh-curry-thali',
    description: 'Tender chicken pieces simmered in caramelized onion and yogurt gravy, served with 3 Tawa Parathas, Jeera Rice, and sliced red onions.',
    category: 'Daily Thalis',
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
    priceMinor: 22000, // ₹220
    portionDescription: '1 Person Rich Thali (3 Chicken pieces in gravy, 3 Parathas, Rice, Salad)',
    ingredients: ['Farm Fresh Chicken', 'Yogurt', 'Brown Onions', 'Coriander', 'Shahi Garam Masala'],
    allergens: ['Dairy (Yogurt)', 'Gluten'],
    dietaryLabels: ['nonVeg'],
    preparationMinutes: 45,
    availableQuantity: 10,
    isAvailable: true,
  });

  // 5. Create Subscription Plans
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
      cookId: cookProfile2._id,
      name: '14-Day Routine North Indian Meal Plan',
      description: '14 days of wholesome Punjabi lunches (Rajma, Kadhi, Dal Tadka, Chhole, Aloo Gobi rotis). Pause anytime with morning cutoff.',
      mealDefinitions: ['2 Tawa Rotis', 'Dal or Rajma', 'Seasonal Sabzi', 'Jeera Rice', 'Salad'],
      schedule: 'daily',
      durationDays: 14,
      mealSlots: ['lunch'],
      priceMinor: 196000, // ₹1960 (14 meals @ ₹140)
      isActive: true,
    },
    {
      cookId: cookProfile3._id,
      name: 'Monthly South Indian Lunch & Dinner Plan',
      description: '30-day complete meal peace of mind. South Indian lunch thali + Light dinner (Idli/Dosa/Upma with sambar & chutneys).',
      mealDefinitions: ['Lunch: Traditional Sambar Rice & Poriyal', 'Dinner: 3 Idlis or 2 Dosas with fresh Chutneys'],
      schedule: 'daily',
      durationDays: 30,
      mealSlots: ['lunch', 'dinner'],
      priceMinor: 600000, // ₹6000 (60 meal deliveries)
      isActive: true,
    },
  ]);

  // 6. Create A Pending Cook Application for Admin Queue Demo
  await CookApplication.create({
    userId: customerUser._id,
    applicantName: 'Kavita Deshmukh',
    kitchenName: "Kavita's Maharashtrian Poli Bhaji",
    phone: '+91 98111 22334',
    email: 'kavita.cook@example.com',
    address: 'B-12, Sunrise Apts, 1st Main, HSR Layout Sector 2',
    locality: 'HSR Layout',
    cuisineSpecialties: ['Maharashtrian', 'Poli Bhaji Kendra', 'Puran Poli'],
    fssaiNumber: '21223010099887',
    dailyCapacity: 25,
    status: 'pending_review',
    reviewNotes: 'Kitchen cleanliness photo submitted, domestic gas pipeline verified.',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
  });

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
      addressLine1: 'Flat 402, Green Glen Layout, 4th Cross',
      locality: 'Koramangala',
      city: 'Bengaluru',
      postalCode: '560034',
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
      addressLine1: 'Flat 402, Green Glen Layout, 4th Cross',
      locality: 'Koramangala',
      city: 'Bengaluru',
      postalCode: '560034',
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
