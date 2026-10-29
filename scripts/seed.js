require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tiffinmitra';

async function seed() {
  console.log('Connecting to MongoDB at:', MONGODB_URI);
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB successfully.');

  const db = mongoose.connection.db;

  // Clear collections
  await db.collection('users').deleteMany({});
  await db.collection('cookprofiles').deleteMany({});
  await db.collection('cookapplications').deleteMany({});
  await db.collection('mealcategories').deleteMany({});
  await db.collection('meals').deleteMany({});
  await db.collection('subscriptionplans').deleteMany({});
  await db.collection('orders').deleteMany({});
  await db.collection('payments').deleteMany({});
  await db.collection('reviews').deleteMany({});

  const salt = await bcrypt.genSalt(10);
  const defaultPasswordHash = await bcrypt.hash('password123', salt);

  // 1. Users
  const userInsertResult = await db.collection('users').insertMany([
    {
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
          _id: new mongoose.Types.ObjectId(),
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
          _id: new mongoose.Types.ObjectId(),
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
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Asha Patel',
      email: 'cook@tiffinmitra.com',
      normalizedEmail: 'cook@tiffinmitra.com',
      passwordHash: defaultPasswordHash,
      role: 'cook',
      phone: '+91 98450 11223',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      accountStatus: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Sunita Kaur',
      email: 'sunita@tiffinmitra.com',
      normalizedEmail: 'sunita@tiffinmitra.com',
      passwordHash: defaultPasswordHash,
      role: 'cook',
      phone: '+91 98451 22334',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      accountStatus: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Meenakshi Amma',
      email: 'meenakshi@tiffinmitra.com',
      normalizedEmail: 'meenakshi@tiffinmitra.com',
      passwordHash: defaultPasswordHash,
      role: 'cook',
      phone: '+91 98452 33445',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
      accountStatus: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Fatima Begum',
      email: 'fatima@tiffinmitra.com',
      normalizedEmail: 'fatima@tiffinmitra.com',
      passwordHash: defaultPasswordHash,
      role: 'cook',
      phone: '+91 98453 44556',
      avatarUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=150&q=80',
      accountStatus: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Admin Operator',
      email: 'admin@tiffinmitra.com',
      normalizedEmail: 'admin@tiffinmitra.com',
      passwordHash: defaultPasswordHash,
      role: 'admin',
      phone: '+91 99999 88888',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
      accountStatus: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const customerId = userInsertResult.insertedIds[0];
  const cookId1 = userInsertResult.insertedIds[1];
  const cookId2 = userInsertResult.insertedIds[2];
  const cookId3 = userInsertResult.insertedIds[3];
  const cookId4 = userInsertResult.insertedIds[4];

  // 2. Cook Profiles
  const cookProfileInsert = await db.collection('cookprofiles').insertMany([
    {
      userId: cookId1,
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
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: cookId2,
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
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: cookId3,
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
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: cookId4,
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
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const cookProfileId1 = cookProfileInsert.insertedIds[0];
  const cookProfileId2 = cookProfileInsert.insertedIds[1];
  const cookProfileId3 = cookProfileInsert.insertedIds[2];
  const cookProfileId4 = cookProfileInsert.insertedIds[3];

  // 3. Categories
  await db.collection('mealcategories').insertMany([
    { name: 'Daily Thalis', slug: 'daily-thalis', description: 'Complete balanced home meals with rotis, sabzi, dal & rice', sortOrder: 1, isActive: true },
    { name: 'Regional Specials', slug: 'regional-specials', description: 'Authentic heirloom dishes from diverse Indian states', sortOrder: 2, isActive: true },
    { name: 'Dietary & Jain', slug: 'dietary-jain', description: 'Zero root vegetables, sattvic and pure vegetarian preparations', sortOrder: 3, isActive: true },
    { name: 'Weekly Subscriptions', slug: 'weekly-subscriptions', description: 'Pre-ordered daily tiffin plans for working professionals', sortOrder: 4, isActive: true },
  ]);

  // 4. Meals
  const mealInsert = await db.collection('meals').insertMany([
    {
      cookId: cookProfileId1,
      name: 'Gujarati Ghar Ka Thali',
      slug: 'gujarati-ghar-ka-thali',
      description: '4 Soft Phulkas smeared with fresh ghee, Sev Tameta Sabzi, Gujarati Khatti-Meethi Dal, Steamed Basmati Rice, Kachumber & Chhach.',
      category: 'Daily Thalis',
      imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
      priceMinor: 14000,
      portionDescription: '1 Person Comfort Meal (4 Phulkas, 150ml Dal, 150ml Sabzi, Rice, Salad & Chaas)',
      ingredients: ['Whole Wheat Atta', 'Country Tomatoes', 'Besan Sev', 'Tuvar Dal', 'Desi Ghee', 'Cumin'],
      allergens: ['Dairy (Ghee/Chaas)', 'Gluten'],
      dietaryLabels: ['veg', 'jain'],
      preparationMinutes: 30,
      availableQuantity: 12,
      isAvailable: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      cookId: cookProfileId1,
      name: 'Kathiyawadi Ringan Bhartu & Rotla',
      slug: 'kathiyawadi-ringan-bhartu-rotla',
      description: 'Smoky fire-roasted baingan bhartha prepared with spring garlic, served with 2 Bajra Rotlas, White Butter (Makhan), and Jaggery.',
      category: 'Regional Specials',
      imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
      priceMinor: 18000,
      portionDescription: 'Hearty Rustic Thali (2 Bajra Rotla, 200g Bhartu, Fresh White Butter, Gud)',
      ingredients: ['Roasted Eggplant', 'Bajra Flour', 'Spring Garlic', 'Fresh Makhan', 'Organic Jaggery'],
      allergens: ['Dairy (Makhan)'],
      dietaryLabels: ['veg'],
      preparationMinutes: 40,
      availableQuantity: 8,
      isAvailable: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      cookId: cookProfileId2,
      name: 'Amritsari Rajma Chawal Thali',
      slug: 'amritsari-rajma-chawal-thali',
      description: 'Slow-simmered Kashmiri Rajma in thick tomato onion gravy, fragrant Jeera Rice, 2 Tawa Rotis, Boondi Raita, and spicy green chili pickle.',
      category: 'Daily Thalis',
      imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
      priceMinor: 16000,
      portionDescription: 'Standard 1 Person Thali (200ml Rajma, Jeera Rice, 2 Rotis, Raita & Salad)',
      ingredients: ['Kashmiri Red Rajma', 'Basmati Rice', 'Cold Pressed Mustard Oil', 'Ginger Garlic', 'Whole Spices'],
      allergens: ['Dairy (Raita)', 'Gluten'],
      dietaryLabels: ['veg'],
      preparationMinutes: 35,
      availableQuantity: 15,
      isAvailable: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      cookId: cookProfileId2,
      name: 'Punjabi Dal Makhani & Missi Roti',
      slug: 'punjabi-dal-makhani-missi-roti',
      description: 'Overnight slow-cooked black lentils with white butter, served with 2 spiced Missi Rotis, Sirka Onions, and fresh green mint chutney.',
      category: 'Regional Specials',
      imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
      priceMinor: 19000,
      portionDescription: 'Special Meal (200ml Dal Makhani, 2 Missi Rotis, Salad & Chutney)',
      ingredients: ['Urad Dal', 'Rajma', 'Makhan', 'Gram Flour', 'Kasuri Methi'],
      allergens: ['Dairy (Butter/Cream)', 'Gluten'],
      dietaryLabels: ['veg'],
      preparationMinutes: 40,
      availableQuantity: 10,
      isAvailable: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      cookId: cookProfileId3,
      name: 'South Indian Raja Thali',
      slug: 'south-indian-raja-thali',
      description: 'Steamed Ponni Rice, Drumstick Sambhar, Pepper Rasam, Cabbage Kootu, Potato Podimas, Crispy Appalam, and Sweet Payasam.',
      category: 'Daily Thalis',
      imageUrl: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=600&q=80',
      priceMinor: 15000,
      portionDescription: 'Generous Meal Box (Ponni Rice, 150ml Sambar, 150ml Rasam, Kootu, Poriyal, Appalam)',
      ingredients: ['Ponni Rice', 'Drumsticks', 'Curry Leaves', 'Asafoetida', 'Grated Coconut'],
      allergens: ['Mustard Seeds'],
      dietaryLabels: ['veg', 'vegan'],
      preparationMinutes: 30,
      availableQuantity: 20,
      isAvailable: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      cookId: cookProfileId4,
      name: 'Homestyle Murgh Curry Thali',
      slug: 'homestyle-murgh-curry-thali',
      description: 'Tender chicken pieces simmered in caramelized onion and yogurt gravy, served with 3 Tawa Parathas, Jeera Rice, and sliced red onions.',
      category: 'Daily Thalis',
      imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
      priceMinor: 22000,
      portionDescription: '1 Person Rich Thali (3 Chicken pieces in gravy, 3 Parathas, Rice, Salad)',
      ingredients: ['Farm Fresh Chicken', 'Yogurt', 'Brown Onions', 'Coriander', 'Shahi Garam Masala'],
      allergens: ['Dairy (Yogurt)', 'Gluten'],
      dietaryLabels: ['nonVeg'],
      preparationMinutes: 45,
      availableQuantity: 10,
      isAvailable: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const mealId1 = mealInsert.insertedIds[0];
  const mealId2 = mealInsert.insertedIds[1];

  // 5. Subscription Plans
  await db.collection('subscriptionplans').insertMany([
    {
      cookId: cookProfileId1,
      name: '5-Day Weekday Gujarati Lunch Tiffin',
      description: 'Monday to Friday healthy lunch delivered hot before 1:00 PM. Balanced daily rotating menu of Gujarati subzis and soft rotis.',
      mealDefinitions: ['4 Phulkas with Ghee', 'Rotating Seasonal Sabzi', 'Dal or Kadhi', 'Rice', 'Chaas'],
      schedule: 'weekdays',
      durationDays: 5,
      mealSlots: ['lunch'],
      priceMinor: 65000,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      cookId: cookProfileId2,
      name: '14-Day Routine North Indian Meal Plan',
      description: '14 days of wholesome Punjabi lunches (Rajma, Kadhi, Dal Tadka, Chhole, Aloo Gobi rotis). Pause anytime with morning cutoff.',
      mealDefinitions: ['2 Tawa Rotis', 'Dal or Rajma', 'Seasonal Sabzi', 'Jeera Rice', 'Salad'],
      schedule: 'daily',
      durationDays: 14,
      mealSlots: ['lunch'],
      priceMinor: 196000,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      cookId: cookProfileId3,
      name: 'Monthly South Indian Lunch & Dinner Plan',
      description: '30-day complete meal peace of mind. South Indian lunch thali + Light dinner (Idli/Dosa/Upma with sambar & chutneys).',
      mealDefinitions: ['Lunch: Traditional Sambar Rice & Poriyal', 'Dinner: 3 Idlis or 2 Dosas with fresh Chutneys'],
      schedule: 'daily',
      durationDays: 30,
      mealSlots: ['lunch', 'dinner'],
      priceMinor: 600000,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  // 6. Pending Cook Application
  await db.collection('cookapplications').insertOne({
    userId: customerId,
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
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // 7. Orders
  const order1 = await db.collection('orders').insertOne({
    orderNumber: 'TM-2026-9041',
    customerId: customerId,
    customerName: 'Rahul Sharma',
    customerPhone: '+91 98765 43210',
    cookId: cookProfileId1,
    cookName: "Asha's Gujarati Rasoi",
    items: [
      {
        mealId: mealId1,
        mealName: 'Gujarati Ghar Ka Thali',
        imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
        unitPriceMinor: 14000,
        quantity: 2,
        lineTotalMinor: 28000,
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
    totalMinor: 32400,
    currency: 'INR',
    paymentStatus: 'succeeded',
    paymentMethod: 'upi',
    paymentId: 'pay_demo_completed_001',
    orderStatus: 'delivered',
    placedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    acceptedAt: new Date(Date.now() - 1000 * 60 * 60 * 23.5),
    preparingAt: new Date(Date.now() - 1000 * 60 * 60 * 23),
    readyAt: new Date(Date.now() - 1000 * 60 * 60 * 22),
    deliveredAt: new Date(Date.now() - 1000 * 60 * 60 * 21.5),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await db.collection('payments').insertOne({
    paymentId: 'pay_demo_completed_001',
    orderId: order1.insertedId,
    customerId: customerId,
    provider: 'mock',
    providerReference: 'MOCK_UPI_REF_9041',
    idempotencyKey: 'idemp_order_9041',
    amountMinor: 32400,
    currency: 'INR',
    method: 'upi',
    status: 'succeeded',
    processedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const order2 = await db.collection('orders').insertOne({
    orderNumber: 'TM-2026-9042',
    customerId: customerId,
    customerName: 'Rahul Sharma',
    customerPhone: '+91 98765 43210',
    cookId: cookProfileId1,
    cookName: "Asha's Gujarati Rasoi",
    items: [
      {
        mealId: mealId1,
        mealName: 'Gujarati Ghar Ka Thali',
        imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
        unitPriceMinor: 14000,
        quantity: 1,
        lineTotalMinor: 14000,
      },
      {
        mealId: mealId2,
        mealName: 'Kathiyawadi Ringan Bhartu & Rotla',
        imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
        unitPriceMinor: 18000,
        quantity: 1,
        lineTotalMinor: 18000,
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
    totalMinor: 36600,
    currency: 'INR',
    paymentStatus: 'succeeded',
    paymentMethod: 'upi',
    paymentId: 'pay_demo_active_002',
    orderStatus: 'preparing',
    placedAt: new Date(Date.now() - 1000 * 60 * 35),
    acceptedAt: new Date(Date.now() - 1000 * 60 * 25),
    preparingAt: new Date(Date.now() - 1000 * 60 * 15),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await db.collection('payments').insertOne({
    paymentId: 'pay_demo_active_002',
    orderId: order2.insertedId,
    customerId: customerId,
    provider: 'mock',
    providerReference: 'MOCK_UPI_REF_9042',
    idempotencyKey: 'idemp_order_9042',
    amountMinor: 36600,
    currency: 'INR',
    method: 'upi',
    status: 'succeeded',
    processedAt: new Date(Date.now() - 1000 * 60 * 35),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // 8. Reviews
  await db.collection('reviews').insertOne({
    customerId: customerId,
    customerName: 'Rahul Sharma',
    cookId: cookProfileId1,
    orderId: order1.insertedId,
    rating: 5,
    comment: 'Tasted just like maa ke haath ka khana! The phulkas were super soft and the khatti-meethi dal had the perfect authentic flavor. Delivered hot and right on time.',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  console.log('Seed finished successfully!');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
