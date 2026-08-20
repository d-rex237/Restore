// lib/mock-data.ts
// Temporary mock data for UI development.
// This file can later be replaced with Neon + Prisma queries.

// ============================================================
// TYPES
// ============================================================

export type Role = "customer" | "driver" | "provider" | "admin";

export type ReqStatus = "pending" | "approved" | "rejected";

export type OrderStatus =
  | "pending"
  | "accepted"
  | "preparing"
  | "ready_for_pickup"
  | "out_for_delivery"
  | "delivered"
  | "rejected"
  | "cancelled";

export type MockUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
  joinedAt: string;
  avatarUrl?: string;
};

export type MockRestaurant = {
  id: string;
  ownerId: string;
  name: string;
  address: string;
  imageUrl?: string;
  logoUrl?: string;
  description?: string;
  isOpen: boolean;
  rating: number;
};

export type MockMenuItem = {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
  imageUrl?: string;
};

export type MockOrderItem = {
  menuItemId: string;
  name: string;
  quantity: number;
  priceAtOrder: number;
};

export type MockOrder = {
  id: string;
  customerId: string;
  customerName: string;
  restaurantId: string;
  restaurantName: string;
  driverId?: string;
  driverName?: string;
  status: OrderStatus;
  items: MockOrderItem[];
  total: number;
  deliveryAddress: string;
  createdAt: string;
};

export type MockRoleRequest = {
  id: string;
  userId: string;
  userName: string;
  requestedRole: "driver" | "provider";
  status: ReqStatus;
  extraData: Record<string, string>;
  createdAt: string;
};

// ============================================================
// USERS
// ============================================================

export const mockUsers: MockUser[] = [
  {
    id: "u1",
    name: "Achiri Divine",
    email: "achiri@example.com",
    role: "customer",
    joinedAt: "2026-05-02",
  },
  {
    id: "u2",
    name: "Ngwa Precious",
    email: "precious@example.com",
    role: "customer",
    joinedAt: "2026-05-10",
  },
  {
    id: "u3",
    name: "Tabi Emmanuel",
    email: "tabi@example.com",
    role: "driver",
    joinedAt: "2026-04-18",
  },
  {
    id: "u4",
    name: "Fon Blessing",
    email: "blessing@example.com",
    role: "driver",
    joinedAt: "2026-04-22",
  },
  {
    id: "u5",
    name: "Mama Grace Kitchen",
    email: "grace@example.com",
    role: "provider",
    joinedAt: "2026-03-30",
  },
  {
    id: "u6",
    name: "Suya Spot Ltd",
    email: "suyaspot@example.com",
    role: "provider",
    joinedAt: "2026-04-01",
  },
  {
    id: "u7",
    name: "Admin Root",
    email: "admin@restor.com",
    role: "admin",
    joinedAt: "2026-01-01",
  },
];

// ============================================================
// RESTAURANTS
// ============================================================

export const mockRestaurants: MockRestaurant[] = [
  {
    id: "r1",
    ownerId: "u5",
    name: "Mama Grace Kitchen",
    address: "Old Town, Bamenda",
    imageUrl: "/images/restaurants/mama-grace.jpg",
    logoUrl: "/images/restaurants/mama-grace-logo.jpg",
    description:
      "Authentic Cameroonian meals prepared with traditional recipes and fresh local ingredients.",
    isOpen: true,
    rating: 4.7,
  },
  {
    id: "r2",
    ownerId: "u6",
    name: "Bamboo Restaurant",
    address: "Commercial Avenue, Bamenda",
    imageUrl: "/images/restaurants/bamboo.jpg",
    logoUrl: "/images/restaurants/bamboo-logo.jpg",
    description:
      "A beautiful local restaurant serving traditional Cameroonian dishes, grilled specialties and refreshing drinks.",
    isOpen: true,
    rating: 4.8,
  },
  {
    id: "r3",
    ownerId: "u6",
    name: "Suya Spot",
    address: "Nkwen, Bamenda",
    imageUrl: "/images/restaurants/suya-spot.jpg",
    logoUrl: "/images/restaurants/suya-spot-logo.jpg",
    description:
      "Enjoy smoky charcoal grilled suya, chicken, beef and delicious local sides.",
    isOpen: true,
    rating: 4.6,
  },
  {
    id: "r4",
    ownerId: "u6",
    name: "Street Bites",
    address: "Commercial Avenue, Bamenda",
    imageUrl: "/images/restaurants/street-bites.jpg",
    logoUrl: "/images/restaurants/street-bites-logo.jpg",
    description:
      "Quick, affordable and delicious Cameroonian street food made fresh every day.",
    isOpen: true,
    rating: 4.4,
  },
  {
    id: "r5",
    ownerId: "u6",
    name: "Sea Catch",
    address: "Nkwen, Bamenda",
    imageUrl: "/images/restaurants/sea-catch.jpg",
    logoUrl: "/images/restaurants/sea-catch-logo.jpg",
    description:
      "Fresh seafood, grilled fish and delicious coastal-inspired meals.",
    isOpen: true,
    rating: 4.5,
  },
];

// ============================================================
// BASIC MENU ITEMS
// ============================================================

export const mockMenuItems: MockMenuItem[] = [
  {
    id: "m1",
    restaurantId: "r1",
    name: "Jollof Rice & Chicken",
    description: "Smoky jollof rice with grilled chicken thigh",
    price: 3500,
    category: "Rice Dishes",
    available: true,
  },
  {
    id: "m2",
    restaurantId: "r1",
    name: "Ndole & Plantain",
    description: "Traditional ndole with ripe fried plantain",
    price: 4000,
    category: "Local Dishes",
    available: true,
  },
  {
    id: "m3",
    restaurantId: "r1",
    name: "Achu & Yellow Soup",
    description: "Pounded cocoyam with palm nut yellow soup",
    price: 4500,
    category: "Local Dishes",
    available: false,
  },
  {
    id: "m4",
    restaurantId: "r2",
    name: "Beef Suya Skewers",
    description: "Spicy grilled beef skewers, 6 pieces",
    price: 2500,
    category: "Grill",
    available: true,
  },
  {
    id: "m5",
    restaurantId: "r2",
    name: "Chicken Suya Wrap",
    description: "Suya-spiced chicken in a soft wrap",
    price: 2000,
    category: "Grill",
    available: true,
  },
  {
    id: "m6",
    restaurantId: "r3",
    name: "Suya Platter",
    description: "Mixed beef and chicken suya sharing platter",
    price: 6000,
    category: "Grill",
    available: true,
  },
];

// ============================================================
// ORDERS
// ============================================================

export const mockOrders: MockOrder[] = [
  {
    id: "o6",
    customerId: "u2",
    customerName: "Ngwa Precious",
    restaurantId: "r1",
    restaurantName: "Mama Grace Kitchen",
    driverId: "u3",
    driverName: "Tabi Emmanuel",
    status: "delivered",
    items: [
      {
        menuItemId: "m3",
        name: "Achu & Yellow Soup",
        quantity: 2,
        priceAtOrder: 4500,
      },
    ],
    total: 9000,
    deliveryAddress: "Commercial Avenue, Bamenda",
    createdAt: "2026-08-04T13:10:00Z",
  },
  {
    id: "o7",
    customerId: "u1",
    customerName: "Achiri Divine",
    restaurantId: "r2",
    restaurantName: "Bamboo Restaurant",
    status: "delivered",
    items: [
      {
        menuItemId: "menu-20",
        name: "Bamboo Special Jollof",
        quantity: 2,
        priceAtOrder: 3500,
      },
    ],
    total: 7000,
    deliveryAddress: "Ntarikon",
    createdAt: "2026-08-18T18:45:00Z",
  },
  {
    id: "o8",
    customerId: "u2",
    customerName: "Ngwa Precious",
    restaurantId: "r5",
    restaurantName: "Sea Catch",
    status: "delivered",
    items: [
      {
        menuItemId: "menu-39",
        name: "Grilled Tilapia",
        quantity: 2,
        priceAtOrder: 4500,
      },
    ],
    total: 9000,
    deliveryAddress: "Mile 2",
    createdAt: "2026-08-19T19:20:00Z",
  },
  {
    id: "o9",
    customerId: "u1",
    customerName: "Achiri Divine",
    restaurantId: "r1",
    restaurantName: "Mama Grace Kitchen",
    status: "delivered",
    items: [
      {
        menuItemId: "m2",
        name: "Ndole & Plantain",
        quantity: 3,
        priceAtOrder: 4000,
      },
    ],
    total: 12000,
    deliveryAddress: "Mankon",
    createdAt: "2026-08-20T14:35:00Z",
  },
  {
    id: "o10",
    customerId: "u2",
    customerName: "Ngwa Precious",
    restaurantId: "r3",
    restaurantName: "Suya Spot",
    status: "delivered",
    items: [
      {
        menuItemId: "menu-29",
        name: "Chicken Suya Wrap",
        quantity: 5,
        priceAtOrder: 2000,
      },
    ],
    total: 10000,
    deliveryAddress: "Finance Junction",
    createdAt: "2026-08-20T12:10:00Z",
  },
];

// ============================================================
// ROLE REQUESTS
// ============================================================

export const mockRoleRequests: MockRoleRequest[] = [
  {
    id: "req1",
    userId: "u1",
    userName: "Achiri Divine",
    requestedRole: "driver",
    status: "pending",
    extraData: {
      vehicleType: "Motorbike",
      plate: "LT 1234 CM",
    },
    createdAt: "2026-07-27T09:00:00Z",
  },
  {
    id: "req2",
    userId: "u2",
    userName: "Ngwa Precious",
    requestedRole: "provider",
    status: "rejected",
    extraData: {
      restaurantName: "Precious Bites",
      address: "Sonac Street, Bamenda",
    },
    createdAt: "2026-07-27T14:20:00Z",
  },
  {
    id: "req3",
    userId: "u3",
    userName: "Tabi Emmanuel",
    requestedRole: "driver",
    status: "approved",
    extraData: {
      vehicleType: "Bicycle",
      plate: "N/A",
    },
    createdAt: "2026-07-20T10:00:00Z",
  },
  {
    id: "req4",
    userId: "u4",
    userName: "Fonyuy Brenda",
    requestedRole: "provider",
    status: "pending",
    extraData: {
      restaurantName: "Brenda's Kitchen",
      address: "Commercial Avenue, Bamenda",
    },
    createdAt: "2026-07-25T12:45:00Z",
  },
  {
    id: "req5",
    userId: "u5",
    userName: "Neba Collins",
    requestedRole: "driver",
    status: "rejected",
    extraData: {
      vehicleType: "Car",
      plate: "NW 4587 AB",
    },
    createdAt: "2026-07-24T08:15:00Z",
  },
  {
    id: "req6",
    userId: "u6",
    userName: "Atanga Ruth",
    requestedRole: "provider",
    status: "approved",
    extraData: {
      restaurantName: "Ruth's Grill",
      address: "Up Station, Bamenda",
    },
    createdAt: "2026-07-22T15:30:00Z",
  },
  {
    id: "req7",
    userId: "u7",
    userName: "Mbah Junior",
    requestedRole: "driver",
    status: "pending",
    extraData: {
      vehicleType: "Tricycle",
      plate: "NW 9032 TR",
    },
    createdAt: "2026-07-23T16:10:00Z",
  },
  {
    id: "req8",
    userId: "u8",
    userName: "Tiku Linda",
    requestedRole: "provider",
    status: "approved",
    extraData: {
      restaurantName: "Linda's Fast Food",
      address: "Mile 2 Nkwen, Bamenda",
    },
    createdAt: "2026-07-21T13:05:00Z",
  },
  {
    id: "req9",
    userId: "u9",
    userName: "Nfor Michael",
    requestedRole: "driver",
    status: "approved",
    extraData: {
      vehicleType: "Motorbike",
      plate: "NW 7781 BK",
    },
    createdAt: "2026-07-19T09:45:00Z",
  },
  {
    id: "req10",
    userId: "u10",
    userName: "Kengne Esther",
    requestedRole: "provider",
    status: "pending",
    extraData: {
      restaurantName: "Esther's Delight",
      address: "Old Town, Bamenda",
    },
    createdAt: "2026-07-18T17:20:00Z",
  },
];

// ============================================================
// DRIVER PROFILES
// ============================================================

export type MockDriverProfile = {
  userId: string;
  vehicleType: string;
  plateNumber: string;
  isOnline: boolean;
  currentLatitude: number;
  currentLongitude: number;
};

export const mockDriverProfiles: MockDriverProfile[] = [
  {
    userId: "u3",
    vehicleType: "Motorbike",
    plateNumber: "LT 1234 CM",
    isOnline: true,
    currentLatitude: 5.9631,
    currentLongitude: 10.1591,
  },
  {
    userId: "u4",
    vehicleType: "Bicycle",
    plateNumber: "N/A",
    isOnline: true,
    currentLatitude: 5.958,
    currentLongitude: 10.152,
  },
];

// ============================================================
// CUSTOMER MENU DATA
// ============================================================
//
// Restaurant IDs:
//
// r1 = Mama Grace Kitchen
// r2 = Bamboo Restaurant
// r3 = Suya Spot
// r4 = Street Bites
// r5 = Sea Catch
//
// Every restaurant has:
// - Starters
// - Main Course
// - Seafood / Local specialty where appropriate
// - Desserts
// - Drinks / More
//
// Images are loaded from:
// /public/images/meals/
//
// ============================================================

export const menuData = [
  // ============================================================
  // MAMA GRACE KITCHEN
  // ============================================================

  {
    id: "menu-1",
    restaurantId: "r1",
    name: "Cameroonian Pepper Soup",
    category: "starters",
    price: 2000,
    image: "/images/meals/pepper-soup.jpg",
    description:
      "A spicy traditional Cameroonian pepper soup prepared with fresh herbs and tender meat.",
    preparationTime: 20,
    isPopular: true,
    ingredients: ["Beef", "Pepper", "Ginger", "Garlic", "Local spices"],
    dietaryInfo: {
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
    },
    available: true,
    restaurant: "Mama Grace Kitchen",
    restaurantLocation: "Old Town, Bamenda",
    restaurantName: "Mama Grace Kitchen",
    orderCount: 320,
  },

  {
    id: "menu-2",
    restaurantId: "r1",
    name: "Plantain Chips",
    category: "starters",
    price: 1200,
    image: "/images/meals/plantain-chips.jpg",
    description:
      "Crispy golden plantain chips lightly seasoned and served as a delicious starter.",
    preparationTime: 10,
    isPopular: false,
    ingredients: ["Ripe Plantain", "Vegetable Oil", "Salt"],
    dietaryInfo: {
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: true,
    },
    available: true,
    restaurant: "Mama Grace Kitchen",
    restaurantLocation: "Old Town, Bamenda",
    restaurantName: "Mama Grace Kitchen",
    orderCount: 180,
  },

  {
    id: "menu-3",
    restaurantId: "r1",
    name: "Jollof Rice & Chicken",
    category: "main course",
    price: 3500,
    image: "/images/meals/jollof-rice-chicken.jpg",
    description:
      "Smoky jollof rice served with grilled chicken and fresh vegetables.",
    preparationTime: 30,
    isPopular: true,
    ingredients: [
      "Rice",
      "Chicken",
      "Tomatoes",
      "Pepper",
      "Onions",
      "Spices",
    ],
    dietaryInfo: {
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
    },
    available: true,
    restaurant: "Mama Grace Kitchen",
    restaurantLocation: "Old Town, Bamenda",
    restaurantName: "Mama Grace Kitchen",
    orderCount: 820,
  },

  {
    id: "menu-4",
    restaurantId: "r1",
    name: "Ndole & Plantain",
    category: "main course",
    price: 4000,
    image: "/images/meals/ndole-plantain.jpg",
    description:
      "Traditional bitterleaf ndole prepared with groundnuts and served with fried plantain.",
    preparationTime: 35,
    isPopular: true,
    ingredients: [
      "Ndole",
      "Groundnuts",
      "Plantain",
      "Beef",
      "Shrimp",
      "Palm oil",
    ],
    dietaryInfo: {
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
    },
    available: true,
    restaurant: "Mama Grace Kitchen",
    restaurantLocation: "Old Town, Bamenda",
    restaurantName: "Mama Grace Kitchen",
    orderCount: 760,
  },

  {
    id: "menu-5",
    restaurantId: "r1",
    name: "Achu & Yellow Soup",
    category: "main course",
    price: 4500,
    image: "/images/meals/achu-yellow-soup.jpg",
    description:
      "Pounded cocoyam served with rich traditional palm-nut yellow soup.",
    preparationTime: 40,
    isPopular: true,
    ingredients: [
      "Cocoyam",
      "Palm nuts",
      "Meat",
      "Pepper",
      "Spices",
    ],
    dietaryInfo: {
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
    },
    available: true,
    restaurant: "Mama Grace Kitchen",
    restaurantLocation: "Old Town, Bamenda",
    restaurantName: "Mama Grace Kitchen",
    orderCount: 680,
  },

  {
    id: "menu-6",
    restaurantId: "r1",
    name: "Grilled Fish",
    category: "seafood",
    price: 4500,
    image: "/images/meals/grilled-fish.jpg",
    description:
      "Fresh local fish grilled with onions, pepper and traditional spices.",
    preparationTime: 30,
    isPopular: false,
    ingredients: ["Fresh Fish", "Onions", "Pepper", "Garlic", "Spices"],
    dietaryInfo: {
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
    },
    available: true,
    restaurant: "Mama Grace Kitchen",
    restaurantLocation: "Old Town, Bamenda",
    restaurantName: "Mama Grace Kitchen",
    orderCount: 270,
  },

  {
    id: "menu-7",
    restaurantId: "r1",
    name: "Puff Puff",
    category: "desserts",
    price: 1000,
    image: "/images/meals/puff-puff.jpg",
    description:
      "Soft golden Cameroonian puff puff freshly fried and lightly sweetened.",
    preparationTime: 15,
    isPopular: true,
    ingredients: ["Flour", "Sugar", "Yeast", "Nutmeg", "Oil"],
    dietaryInfo: {
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: false,
    },
    available: true,
    restaurant: "Mama Grace Kitchen",
    restaurantLocation: "Old Town, Bamenda",
    restaurantName: "Mama Grace Kitchen",
    orderCount: 700,
  },

  {
    id: "menu-8",
    restaurantId: "r1",
    name: "Fresh Mango Juice",
    category: "drinks",
    price: 1500,
    image: "/images/meals/mango-juice.jpg",
    description:
      "Refreshing natural mango juice made from ripe local mangoes.",
    preparationTime: 5,
    isPopular: false,
    ingredients: ["Mango", "Water", "Ice"],
    dietaryInfo: {
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: true,
    },
    available: true,
    restaurant: "Mama Grace Kitchen",
    restaurantLocation: "Old Town, Bamenda",
    restaurantName: "Mama Grace Kitchen",
    orderCount: 310,
  },

  // ============================================================
  // BAMBOO RESTAURANT
  // ============================================================

  {
    id: "menu-9",
    restaurantId: "r2",
    name: "Bamboo Pepper Soup",
    category: "starters",
    price: 2200,
    image: "/images/meals/bamboo-pepper-soup.jpg",
    description:
      "A rich spicy pepper soup prepared with tender meat and aromatic local spices.",
    preparationTime: 20,
    isPopular: true,
    ingredients: [
      "Beef",
      "Pepper",
      "Ginger",
      "Garlic",
      "Basil",
    ],
    dietaryInfo: {
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
    },
    available: true,
    restaurant: "Bamboo Restaurant",
    restaurantLocation: "Commercial Avenue, Bamenda",
    restaurantName: "Bamboo Restaurant",
    orderCount: 490,
  },

  {
    id: "menu-10",
    restaurantId: "r2",
    name: "Chicken Wings",
    category: "starters",
    price: 2500,
    image: "/images/meals/chicken-wings.jpg",
    description:
      "Crispy seasoned chicken wings served with a spicy homemade dip.",
    preparationTime: 20,
    isPopular: true,
    ingredients: [
      "Chicken",
      "Pepper",
      "Garlic",
      "Paprika",
      "Spices",
    ],
    dietaryInfo: {
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
    },
    available: true,
    restaurant: "Bamboo Restaurant",
    restaurantLocation: "Commercial Avenue, Bamenda",
    restaurantName: "Bamboo Restaurant",
    orderCount: 420,
  },

  {
    id: "menu-11",
    restaurantId: "r2",
    name: "Bamboo Special Jollof",
    category: "main course",
    price: 3500,
    image: "/images/meals/bamboo-jollof.jpg",
    description:
      "Special smoky jollof rice served with grilled chicken and vegetables.",
    preparationTime: 30,
    isPopular: true,
    ingredients: [
      "Rice",
      "Chicken",
      "Tomatoes",
      "Onions",
      "Pepper",
      "Spices",
    ],
    dietaryInfo: {
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
    },
    available: true,
    restaurant: "Bamboo Restaurant",
    restaurantLocation: "Commercial Avenue, Bamenda",
    restaurantName: "Bamboo Restaurant",
    orderCount: 950,
  },

  {
    id: "menu-12",
    restaurantId: "r2",
    name: "Ndole with Fried Plantain",
    category: "main course",
    price: 4500,
    image: "/images/meals/ndole-plantain.jpg",
    description:
      "Creamy traditional ndole prepared with groundnuts and served with fried plantain.",
    preparationTime: 35,
    isPopular: true,
    ingredients: [
      "Ndole",
      "Groundnuts",
      "Plantain",
      "Beef",
      "Shrimp",
    ],
    dietaryInfo: {
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
    },
    available: true,
    restaurant: "Bamboo Restaurant",
    restaurantLocation: "Commercial Avenue, Bamenda",
    restaurantName: "Bamboo Restaurant",
    orderCount: 780,
  },

  {
    id: "menu-13",
    restaurantId: "r2",
    name: "Achu Yellow Soup",
    category: "main course",
    price: 5000,
    image: "/images/meals/achu-yellow-soup.jpg",
    description:
      "Traditional pounded cocoyam served with rich yellow palm-nut soup.",
    preparationTime: 40,
    isPopular: true,
    ingredients: [
      "Cocoyam",
      "Palm nuts",
      "Beef",
      "Pepper",
      "Spices",
    ],
    dietaryInfo: {
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
    },
    available: true,
    restaurant: "Bamboo Restaurant",
    restaurantLocation: "Commercial Avenue, Bamenda",
    restaurantName: "Bamboo Restaurant",
    orderCount: 640,
  },

  {
    id: "menu-14",
    restaurantId: "r2",
    name: "Grilled Tilapia",
    category: "seafood",
    price: 5000,
    image: "/images/meals/grilled-tilapia.jpg",
    description:
      "Fresh tilapia grilled with herbs, garlic, lemon and local spices.",
    preparationTime: 30,
    isPopular: true,
    ingredients: [
      "Tilapia",
      "Garlic",
      "Lemon",
      "Onions",
      "Spices",
    ],
    dietaryInfo: {
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
    },
    available: true,
    restaurant: "Bamboo Restaurant",
    restaurantLocation: "Commercial Avenue, Bamenda",
    restaurantName: "Bamboo Restaurant",
    orderCount: 560,
  },

  {
    id: "menu-15",
    restaurantId: "r2",
    name: "Fried Fish & Plantain",
    category: "seafood",
    price: 4500,
    image: "/images/meals/fried-fish-plantain.jpg",
    description:
      "Crispy fried fish served with ripe fried plantain and pepper sauce.",
    preparationTime: 25,
    isPopular: false,
    ingredients: [
      "Fresh Fish",
      "Plantain",
      "Pepper",
      "Tomatoes",
      "Onions",
    ],
    dietaryInfo: {
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
    },
    available: true,
    restaurant: "Bamboo Restaurant",
    restaurantLocation: "Commercial Avenue, Bamenda",
    restaurantName: "Bamboo Restaurant",
    orderCount: 390,
  },

  {
    id: "menu-16",
    restaurantId: "r2",
    name: "Puff Puff",
    category: "desserts",
    price: 1200,
    image: "/images/meals/puff-puff.jpg",
    description:
      "Freshly fried soft puff puff with a golden crispy outside.",
    preparationTime: 15,
    isPopular: true,
    ingredients: ["Flour", "Sugar", "Yeast", "Nutmeg"],
    dietaryInfo: {
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: false,
    },
    available: true,
    restaurant: "Bamboo Restaurant",
    restaurantLocation: "Commercial Avenue, Bamenda",
    restaurantName: "Bamboo Restaurant",
    orderCount: 620,
  },

  {
    id: "menu-17",
    restaurantId: "r2",
    name: "Fresh Pineapple Juice",
    category: "drinks",
    price: 1500,
    image: "/images/meals/pineapple-juice.jpg",
    description:
      "Freshly blended pineapple juice served chilled.",
    preparationTime: 5,
    isPopular: true,
    ingredients: ["Pineapple", "Water", "Ice"],
    dietaryInfo: {
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: true,
    },
    available: true,
    restaurant: "Bamboo Restaurant",
    restaurantLocation: "Commercial Avenue, Bamenda",
    restaurantName: "Bamboo Restaurant",
    orderCount: 510,
  },

  // ============================================================
  // SUYA SPOT
  // ============================================================

  {
    id: "menu-18",
    restaurantId: "r3",
    name: "Suya Wings",
    category: "starters",
    price: 2200,
    image: "/images/meals/suya-wings.jpg",
    description:
      "Juicy chicken wings coated with authentic spicy suya seasoning.",
    preparationTime: 20,
    isPopular: true,
    ingredients: [
      "Chicken",
      "Suya Spice",
      "Pepper",
      "Onions",
    ],
    dietaryInfo: {
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
    },
    available: true,
    restaurant: "Suya Spot",
    restaurantLocation: "Nkwen, Bamenda",
    restaurantName: "Suya Spot",
    orderCount: 450,
  },

  {
    id: "menu-19",
    restaurantId: "r3",
    name: "Beef Suya",
    category: "main course",
    price: 2500,
    image: "/images/meals/beef-suya.jpg",
    description:
      "Tender beef skewers grilled over charcoal and coated with spicy suya seasoning.",
    preparationTime: 20,
    isPopular: true,
    ingredients: [
      "Beef",
      "Suya Spice",
      "Onions",
      "Peppers",
      "Peanuts",
    ],
    dietaryInfo: {
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
    },
    available: true,
    restaurant: "Suya Spot",
    restaurantLocation: "Nkwen, Bamenda",
    restaurantName: "Suya Spot",
    orderCount: 850,
  },

  {
    id: "menu-20",
    restaurantId: "r3",
    name: "Chicken Suya",
    category: "main course",
    price: 3000,
    image: "/images/meals/chicken-suya.jpg",
    description:
      "Juicy grilled chicken pieces coated in authentic Cameroonian suya spice.",
    preparationTime: 25,
    isPopular: true,
    ingredients: [
      "Chicken",
      "Suya Spice",
      "Peanuts",
      "Pepper",
      "Onions",
    ],
    dietaryInfo: {
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
    },
    available: true,
    restaurant: "Suya Spot",
    restaurantLocation: "Nkwen, Bamenda",
    restaurantName: "Suya Spot",
    orderCount: 730,
  },

  {
    id: "menu-21",
    restaurantId: "r3",
    name: "Suya Platter",
    category: "main course",
    price: 6000,
    image: "/images/meals/suya-platter.jpg",
    description:
      "A generous sharing platter of beef and chicken suya with onions and peppers.",
    preparationTime: 30,
    isPopular: true,
    ingredients: [
      "Beef",
      "Chicken",
      "Suya Spice",
      "Onions",
      "Pepper",
      "Peanuts",
    ],
    dietaryInfo: {
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
    },
    available: true,
    restaurant: "Suya Spot",
    restaurantLocation: "Nkwen, Bamenda",
    restaurantName: "Suya Spot",
    orderCount: 510,
  },

  {
    id: "menu-22",
    restaurantId: "r3",
    name: "Beef & Plantain",
    category: "main course",
    price: 4000,
    image: "/images/meals/beef-plantain.jpg",
    description:
      "Charcoal grilled beef served with golden fried ripe plantains.",
    preparationTime: 25,
    isPopular: false,
    ingredients: [
      "Beef",
      "Plantain",
      "Pepper",
      "Onions",
      "Spices",
    ],
    dietaryInfo: {
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
    },
    available: true,
    restaurant: "Suya Spot",
    restaurantLocation: "Nkwen, Bamenda",
    restaurantName: "Suya Spot",
    orderCount: 275,
  },

  {
    id: "menu-23",
    restaurantId: "r3",
    name: "Chicken Suya Wrap",
    category: "main course",
    price: 2000,
    image: "/images/meals/chicken-suya-wrap.jpg",
    description:
      "Spicy grilled chicken suya wrapped with fresh vegetables in soft flatbread.",
    preparationTime: 15,
    isPopular: false,
    ingredients: [
      "Chicken",
      "Flatbread",
      "Lettuce",
      "Tomatoes",
      "Suya Spice",
    ],
    dietaryInfo: {
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
    },
    available: true,
    restaurant: "Suya Spot",
    restaurantLocation: "Nkwen, Bamenda",
    restaurantName: "Suya Spot",
    orderCount: 390,
  },

  {
    id: "menu-24",
    restaurantId: "r3",
    name: "Grilled Chicken",
    category: "main course",
    price: 3500,
    image: "/images/meals/grilled-chicken.jpg",
    description:
      "Tender charcoal grilled chicken served with spicy pepper sauce.",
    preparationTime: 30,
    isPopular: false,
    ingredients: [
      "Chicken",
      "Pepper",
      "Garlic",
      "Onions",
      "Spices",
    ],
    dietaryInfo: {
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
    },
    available: true,
    restaurant: "Suya Spot",
    restaurantLocation: "Nkwen, Bamenda",
    restaurantName: "Suya Spot",
    orderCount: 330,
  },

  {
    id: "menu-25",
    restaurantId: "r3",
    name: "Chin Chin",
    category: "desserts",
    price: 1500,
    image: "/images/meals/chin-chin.jpg",
    description:
      "Crunchy homemade chin chin with a lightly sweet buttery flavor.",
    preparationTime: 15,
    isPopular: false,
    ingredients: [
      "Flour",
      "Sugar",
      "Butter",
      "Milk",
      "Nutmeg",
    ],
    dietaryInfo: {
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false,
    },
    available: true,
    restaurant: "Suya Spot",
    restaurantLocation: "Nkwen, Bamenda",
    restaurantName: "Suya Spot",
    orderCount: 240,
  },

  {
    id: "menu-26",
    restaurantId: "r3",
    name: "Cold Soft Drink",
    category: "drinks",
    price: 1000,
    image: "/images/meals/soft-drink.jpg",
    description:
      "A chilled refreshing soft drink to enjoy with your meal.",
    preparationTime: 2,
    isPopular: false,
    ingredients: ["Soft drink", "Ice"],
    dietaryInfo: {
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: true,
    },
    available: true,
    restaurant: "Suya Spot",
    restaurantLocation: "Nkwen, Bamenda",
    restaurantName: "Suya Spot",
    orderCount: 280,
  },

  // ============================================================
  // STREET BITES
  // ============================================================

  {
    id: "menu-27",
    restaurantId: "r4",
    name: "Miondo",
    category: "starters",
    price: 1500,
    image: "/images/meals/miondo.jpg",
    description:
      "Soft fermented cassava sticks served with spicy peanut sauce.",
    preparationTime: 15,
    isPopular: true,
    ingredients: [
      "Cassava",
      "Peanuts",
      "Pepper",
      "Salt",
    ],
    dietaryInfo: {
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: true,
    },
    available: true,
    restaurant: "Street Bites",
    restaurantLocation: "Commercial Avenue, Bamenda",
    restaurantName: "Street Bites",
    orderCount: 430,
  },

  {
    id: "menu-28",
    restaurantId: "r4",
    name: "Fried Plantain",
    category: "starters",
    price: 1200,
    image: "/images/meals/fried-plantain.jpg",
    description:
      "Golden fried ripe plantains served hot with spicy pepper sauce.",
    preparationTime: 10,
    isPopular: true,
    ingredients: [
      "Ripe Plantain",
      "Oil",
      "Salt",
      "Pepper",
    ],
    dietaryInfo: {
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: true,
    },
    available: true,
    restaurant: "Street Bites",
    restaurantLocation: "Commercial Avenue, Bamenda",
    restaurantName: "Street Bites",
    orderCount: 620,
  },

  {
    id: "menu-29",
    restaurantId: "r4",
    name: "Beans & Plantain",
    category: "main course",
    price: 2500,
    image: "/images/meals/beans-plantain.jpg",
    description:
      "Seasoned beans served with sweet fried ripe plantain.",
    preparationTime: 25,
    isPopular: true,
    ingredients: [
      "Beans",
      "Plantain",
      "Palm Oil",
      "Onions",
      "Pepper",
    ],
    dietaryInfo: {
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: true,
    },
    available: true,
    restaurant: "Street Bites",
    restaurantLocation: "Commercial Avenue, Bamenda",
    restaurantName: "Street Bites",
    orderCount: 570,
  },

  {
    id: "menu-30",
    restaurantId: "r4",
    name: "Koki Beans",
    category: "main course",
    price: 3000,
    image: "/images/meals/koki.jpg",
    description:
      "Traditional steamed koki beans prepared with palm oil and local spices.",
    preparationTime: 35,
    isPopular: true,
    ingredients: [
      "Beans",
      "Palm Oil",
      "Pepper",
      "Banana Leaves",
    ],
    dietaryInfo: {
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: true,
    },
    available: true,
    restaurant: "Street Bites",
    restaurantLocation: "Commercial Avenue, Bamenda",
    restaurantName: "Street Bites",
    orderCount: 380,
  },

  {
    id: "menu-31",
    restaurantId: "r4",
    name: "Fried Fish & Plantain",
    category: "seafood",
    price: 3500,
    image: "/images/meals/fried-fish-plantain.jpg",
    description:
      "Crispy fried fish served with ripe plantain and pepper sauce.",
    preparationTime: 25,
    isPopular: true,
    ingredients: [
      "Fish",
      "Plantain",
      "Pepper",
      "Onions",
      "Spices",
    ],
    dietaryInfo: {
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
    },
    available: true,
    restaurant: "Street Bites",
    restaurantLocation: "Commercial Avenue, Bamenda",
    restaurantName: "Street Bites",
    orderCount: 410,
  },

  {
    id: "menu-32",
    restaurantId: "r4",
    name: "Accra Banana",
    category: "desserts",
    price: 1000,
    image: "/images/meals/accra-banana.jpg",
    description:
      "Crispy fried banana fritters with a soft sweet center.",
    preparationTime: 15,
    isPopular: false,
    ingredients: [
      "Banana",
      "Flour",
      "Sugar",
      "Oil",
    ],
    dietaryInfo: {
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: false,
    },
    available: true,
    restaurant: "Street Bites",
    restaurantLocation: "Commercial Avenue, Bamenda",
    restaurantName: "Street Bites",
    orderCount: 280,
  },

  {
    id: "menu-33",
    restaurantId: "r4",
    name: "Fresh Watermelon Juice",
    category: "drinks",
    price: 1500,
    image: "/images/meals/watermelon-juice.jpg",
    description:
      "Refreshing natural watermelon juice served chilled.",
    preparationTime: 5,
    isPopular: true,
    ingredients: ["Watermelon", "Ice"],
    dietaryInfo: {
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: true,
    },
    available: true,
    restaurant: "Street Bites",
    restaurantLocation: "Commercial Avenue, Bamenda",
    restaurantName: "Street Bites",
    orderCount: 360,
  },

  // ============================================================
  // SEA CATCH
  // ============================================================

  {
    id: "menu-34",
    restaurantId: "r5",
    name: "Fish Pepper Soup",
    category: "starters",
    price: 3000,
    image: "/images/meals/fish-pepper-soup.jpg",
    description:
      "Aromatic spicy fish broth prepared with fresh herbs and traditional spices.",
    preparationTime: 25,
    isPopular: true,
    ingredients: [
      "Fresh Fish",
      "Pepper",
      "Ginger",
      "Garlic",
      "Herbs",
    ],
    dietaryInfo: {
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
    },
    available: true,
    restaurant: "Sea Catch",
    restaurantLocation: "Nkwen, Bamenda",
    restaurantName: "Sea Catch",
    orderCount: 300,
  },

  {
    id: "menu-35",
    restaurantId: "r5",
    name: "Prawn Cocktail",
    category: "starters",
    price: 3500,
    image: "/images/meals/prawn-cocktail.jpg",
    description:
      "Fresh prawns served with vegetables and a creamy homemade sauce.",
    preparationTime: 15,
    isPopular: false,
    ingredients: [
      "Prawns",
      "Lettuce",
      "Tomatoes",
      "Lemon",
      "Sauce",
    ],
    dietaryInfo: {
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
    },
    available: true,
    restaurant: "Sea Catch",
    restaurantLocation: "Nkwen, Bamenda",
    restaurantName: "Sea Catch",
    orderCount: 190,
  },

  {
    id: "menu-36",
    restaurantId: "r5",
    name: "Seafood Rice",
    category: "main course",
    price: 4500,
    image: "/images/meals/seafood-rice.jpg",
    description:
      "Fragrant rice cooked with fresh seafood, vegetables and local spices.",
    preparationTime: 30,
    isPopular: true,
    ingredients: [
      "Rice",
      "Fish",
      "Prawns",
      "Vegetables",
      "Spices",
    ],
    dietaryInfo: {
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
    },
    available: true,
    restaurant: "Sea Catch",
    restaurantLocation: "Nkwen, Bamenda",
    restaurantName: "Sea Catch",
    orderCount: 470,
  },

  {
    id: "menu-37",
    restaurantId: "r5",
    name: "Grilled Prawns",
    category: "seafood",
    price: 5500,
    image: "/images/meals/grilled-prawns.jpg",
    description:
      "Fresh prawns grilled with garlic, lemon and a blend of local spices.",
    preparationTime: 20,
    isPopular: true,
    ingredients: [
      "Prawns",
      "Garlic",
      "Lemon",
      "Butter",
      "Spices",
    ],
    dietaryInfo: {
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
    },
    available: true,
    restaurant: "Sea Catch",
    restaurantLocation: "Nkwen, Bamenda",
    restaurantName: "Sea Catch",
    orderCount: 245,
  },

  {
    id: "menu-38",
    restaurantId: "r5",
    name: "Fried Fish & Plantain",
    category: "seafood",
    price: 4000,
    image: "/images/meals/fried-fish-plantain.jpg",
    description:
      "Crispy fried fish served with golden ripe plantains and fresh vegetables.",
    preparationTime: 25,
    isPopular: true,
    ingredients: [
      "Fresh Fish",
      "Plantain",
      "Tomatoes",
      "Onions",
      "Pepper",
    ],
    dietaryInfo: {
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
    },
    available: true,
    restaurant: "Sea Catch",
    restaurantLocation: "Nkwen, Bamenda",
    restaurantName: "Sea Catch",
    orderCount: 460,
  },

  {
    id: "menu-39",
    restaurantId: "r5",
    name: "Grilled Tilapia",
    category: "seafood",
    price: 4500,
    image: "/images/meals/grilled-tilapia.jpg",
    description:
      "Fresh tilapia grilled with local spices and served with vegetables.",
    preparationTime: 30,
    isPopular: true,
    ingredients: [
      "Tilapia",
      "Lemon",
      "Garlic",
      "Onions",
      "Local spices",
    ],
    dietaryInfo: {
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
    },
    available: true,
    restaurant: "Sea Catch",
    restaurantLocation: "Nkwen, Bamenda",
    restaurantName: "Sea Catch",
    orderCount: 520,
  },

  {
    id: "menu-40",
    restaurantId: "r5",
    name: "Coconut Cake",
    category: "desserts",
    price: 2500,
    image: "/images/meals/coconut-cake.jpg",
    description:
      "Soft homemade cake infused with fresh coconut flavor.",
    preparationTime: 30,
    isPopular: false,
    ingredients: [
      "Coconut",
      "Flour",
      "Sugar",
      "Eggs",
      "Butter",
    ],
    dietaryInfo: {
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false,
    },
    available: true,
    restaurant: "Sea Catch",
    restaurantLocation: "Nkwen, Bamenda",
    restaurantName: "Sea Catch",
    orderCount: 230,
  },

  {
    id: "menu-41",
    restaurantId: "r5",
    name: "Fresh Pineapple Juice",
    category: "drinks",
    price: 1500,
    image: "/images/meals/pineapple-juice.jpg",
    description:
      "Freshly blended pineapple juice made from locally sourced fruit.",
    preparationTime: 5,
    isPopular: true,
    ingredients: ["Fresh Pineapple", "Water", "Ice"],
    dietaryInfo: {
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: true,
    },
    available: true,
    restaurant: "Sea Catch",
    restaurantLocation: "Nkwen, Bamenda",
    restaurantName: "Sea Catch",
    orderCount: 340,
  },
];

// ============================================================
// HELPERS
// ============================================================

export function getOrdersByRestaurant(restaurantId: string) {
  return mockOrders.filter((o) => o.restaurantId === restaurantId);
}

export function getMenuByRestaurant(restaurantId: string) {
  return mockMenuItems.filter((m) => m.restaurantId === restaurantId);
}

export function getPendingRoleRequests() {
  return mockRoleRequests.filter((r) => r.status === "pending");
}

export function getOrderStatusCounts() {
  return mockOrders.reduce<Record<OrderStatus, number>>(
    (acc, order) => {
      acc[order.status] = (acc[order.status] ?? 0) + 1;
      return acc;
    },
    {} as Record<OrderStatus, number>,
  );
}

// ============================================================
// DRIVER LOOKUP
// ============================================================

export function getDriverForOrder(orderId: string) {
  const order = mockOrders.find((o) => o.id === orderId);

  if (!order || !order.driverId) {
    return null;
  }

  const user = mockUsers.find((u) => u.id === order.driverId);

  const profile = mockDriverProfiles.find(
    (p) => p.userId === order.driverId,
  );

  if (!user || !profile) {
    return null;
  }

  return {
    name: user.name,
    vehicleType: profile.vehicleType,
    plateNumber: profile.plateNumber,
    isOnline: profile.isOnline,
    currentLatitude: profile.currentLatitude,
    currentLongitude: profile.currentLongitude,
  };
}