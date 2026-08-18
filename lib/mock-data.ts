// lib/mock-data.ts
// Temporary mock data for UI development — remove/replace once Neon + Prisma are wired up.
// Shapes intentionally mirror the Prisma models from the project spec so swapping
// this out for real DB queries later requires minimal changes to your components.

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
  joinedAt: string; // ISO date
  avatarUrl?: string;
};

export type MockRestaurant = {
  id: string;
  ownerId: string;
  name: string;
  address: string;
  imageUrl?: string;
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
  createdAt: string; // ISO date
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

// ---------------- Users ----------------

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

// ---------------- Restaurants ----------------

export const mockRestaurants: MockRestaurant[] = [
  {
    id: "r1",
    ownerId: "u5",
    name: "Mama Grace Kitchen",
    address: "Old Town, Bamenda",
    isOpen: true,
    rating: 4.7,
  },
  {
    id: "r2",
    ownerId: "u6",
    name: "Suya Spot",
    address: "Commercial Avenue, Bamenda",
    isOpen: true,
    rating: 4.4,
  },
  {
    id: "r3",
    ownerId: "u6",
    name: "Suya Spot Express",
    address: "Nkwen, Bamenda",
    isOpen: false,
    rating: 4.1,
  },
];

// ---------------- Menu Items ----------------

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

// ---------------- Orders ----------------

export const mockOrders: MockOrder[] = [
  // August
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
        name: "Eru & Garri",
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
    restaurantName: "Suya Spot",
    status: "delivered",
    items: [
      {
        menuItemId: "m4",
        name: "Beef Suya Skewers",
        quantity: 4,
        priceAtOrder: 2500,
      },
    ],
    total: 10000,
    deliveryAddress: "Ntarikon",
    createdAt: "2026-08-18T18:45:00Z",
  },

  // September
  {
    id: "o8",
    customerId: "u2",
    customerName: "Ngwa Precious",
    restaurantId: "r3",
    restaurantName: "Suya Spot Express",
    status: "delivered",
    items: [
      {
        menuItemId: "m6",
        name: "Suya Platter",
        quantity: 2,
        priceAtOrder: 6000,
      },
    ],
    total: 12000,
    deliveryAddress: "Mile 2",
    createdAt: "2026-09-06T19:20:00Z",
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
    createdAt: "2026-09-20T14:35:00Z",
  },

  // October
  {
    id: "o10",
    customerId: "u2",
    customerName: "Ngwa Precious",
    restaurantId: "r2",
    restaurantName: "Suya Spot",
    status: "delivered",
    items: [
      {
        menuItemId: "m5",
        name: "Chicken Suya Wrap",
        quantity: 5,
        priceAtOrder: 2000,
      },
    ],
    total: 10000,
    deliveryAddress: "Finance Junction",
    createdAt: "2026-10-03T12:10:00Z",
  },
  {
    id: "o11",
    customerId: "u1",
    customerName: "Achiri Divine",
    restaurantId: "r1",
    restaurantName: "Mama Grace Kitchen",
    status: "delivered",
    items: [
      {
        menuItemId: "m1",
        name: "Jollof Rice & Chicken",
        quantity: 4,
        priceAtOrder: 3500,
      },
    ],
    total: 14000,
    deliveryAddress: "Foncha Street",
    createdAt: "2026-10-25T20:10:00Z",
  },

  // November
  {
    id: "o12",
    customerId: "u2",
    customerName: "Ngwa Precious",
    restaurantId: "r3",
    restaurantName: "Suya Spot Express",
    status: "delivered",
    items: [
      {
        menuItemId: "m6",
        name: "Suya Platter",
        quantity: 3,
        priceAtOrder: 6000,
      },
    ],
    total: 18000,
    deliveryAddress: "Bambili",
    createdAt: "2026-11-09T16:30:00Z",
  },
  {
    id: "o13",
    customerId: "u1",
    customerName: "Achiri Divine",
    restaurantId: "r2",
    restaurantName: "Suya Spot",
    status: "delivered",
    items: [
      {
        menuItemId: "m4",
        name: "Beef Suya Skewers",
        quantity: 6,
        priceAtOrder: 2500,
      },
    ],
    total: 15000,
    deliveryAddress: "Mile 4",
    createdAt: "2026-11-21T19:45:00Z",
  },

  // December
  {
    id: "o14",
    customerId: "u2",
    customerName: "Ngwa Precious",
    restaurantId: "r1",
    restaurantName: "Mama Grace Kitchen",
    status: "delivered",
    items: [
      {
        menuItemId: "m3",
        name: "Eru & Garri",
        quantity: 5,
        priceAtOrder: 4500,
      },
    ],
    total: 22500,
    deliveryAddress: "Up Station",
    createdAt: "2026-12-08T13:00:00Z",
  },
  {
    id: "o15",
    customerId: "u1",
    customerName: "Achiri Divine",
    restaurantId: "r3",
    restaurantName: "Suya Spot Express",
    status: "delivered",
    items: [
      {
        menuItemId: "m6",
        name: "Suya Platter",
        quantity: 4,
        priceAtOrder: 6000,
      },
    ],
    total: 24000,
    deliveryAddress: "Bamenda Commercial Avenue",
    createdAt: "2026-12-28T18:00:00Z",
  },
];

// ---------------- Role Requests (for Admin dashboard) ----------------

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
export const menuData = [
  {
    id: "1",
    name: "Ndolé",
    description:
      "Classic Cameroonian dish with bitter leaves, peanuts, and tender beef.",
    price: 3500,
    category: "Main Course",
    preparationTime: 30,
    ingredients: ["Bitter leaves", "Peanuts", "Beef", "Onions", "Garlic"],
    isPopular: true,
    image: "/images/ndole.webp",
    dietaryInfo: { isVegetarian: false, isVegan: false, isGlutenFree: true },
    available: true,
    restaurant: "Restor Kitchen",
    restaurantLocation: "Bamenda, Cameroon",
    preparationSteps: [
      "Prep bitter leaves and beef",
      "Grind peanuts into paste",
      "Cook beef with spices",
      "Combine leaves, paste, and beef",
      "Simmer until tender"
    ],
    orderCount: 410,
  },
  {
    id: "2",
    name: "Eru Soup",
    description:
      "Rich, hearty soup made with water leaves, okra, and smoked fish.",
    price: 3000,
    category: "Main Course",
    preparationTime: 25,
    ingredients: ["Water leaves", "Okra", "Smoked fish", "Palm oil", "Pepper"],
    isPopular: true,
    image: "/images/fufu-and-eru.webp",
    dietaryInfo: { isVegetarian: false, isVegan: false, isGlutenFree: true },
    available: true,
    restaurant: "Restor Kitchen",
    restaurantLocation: "Bamenda, Cameroon",
    preparationSteps: [
      "Chop water leaves and okra",
      "Soak smoked fish",
      "Cook with palm oil and spices",
      "Add water leaves and okra",
      "Simmer until thick"
    ],
    orderCount: 385,
  },
  {
    id: "3",
    name: "Miondo",
    description:
      "Soft cassava sticks served with a flavorful, spicy peanut sauce.",
    price: 1500,
    category: "Street Food",
    preparationTime: 15,
    ingredients: ["Cassava", "Peanuts", "Pepper", "Salt"],
    isPopular: false,
    image: "/images/miondo.webp",
    dietaryInfo: { isVegetarian: true, isVegan: true, isGlutenFree: true },
    available: true,
    restaurant: "Street Bites",
    restaurantLocation: "Bamenda, Cameroon",
    preparationSteps: [
      "Peel and boil cassava",
      "Pound into smooth dough",
      "Shape into sticks",
      "Steam until cooked",
      "Serve with spicy peanut sauce"
    ],
    orderCount: 120,
  },
  {
    id: "4",
    name: "Grilled Tilapia",
    description:
      "Fresh tilapia grilled to perfection with local spices and lemon.",
    price: 4000,
    category: "Seafood",
    preparationTime: 20,
    ingredients: ["Tilapia", "Lemon", "Garlic", "Onions", "Spices"],
    isPopular: true,
    image: "/images/grilled-tilapia.webp",
    dietaryInfo: { isVegetarian: false, isVegan: false, isGlutenFree: true },
    available: true,
    restaurant: "Sea Catch",
    restaurantLocation: "Bamenda, Cameroon",
    preparationSteps: [
      "Clean and score fish",
      "Marinate with lemon, garlic, and spices",
      "Grill over charcoal",
      "Baste with oil and turn",
      "Serve with fresh vegetables"
    ],
    orderCount: 520,
  },
  {
    id: "5",
    name: "Plantain & Stew",
    description:
      "Fried ripe plantains served with a rich tomato and pepper stew.",
    price: 2000,
    category: "Street Food",
    preparationTime: 10,
    ingredients: ["Plantains", "Tomatoes", "Onions", "Peppers"],
    isPopular: false,
    image: "/images/plantain-and-stew.webp",
    dietaryInfo: { isVegetarian: true, isVegan: true, isGlutenFree: true },
    available: true,
    restaurant: "Street Bites",
    restaurantLocation: "Bamenda, Cameroon",
    preparationSteps: [
      "Peel and slice plantains",
      "Fry until golden brown",
      "Prepare tomato stew with onions and peppers",
      "Serve plantains with stew"
    ],
    orderCount: 95,
  },
  {
    id: "6",
    name: "Cameroonian Pepper Soup",
    description:
      "Spicy, aromatic broth with chunks of beef or fish, perfect for a cold day.",
    price: 2500,
    category: "Appetizers",
    preparationTime: 25,
    ingredients: ["Beef", "Pepper", "Onions", "Garlic", "Ginger"],
    isPopular: false,
    image: "/images/pepper-soup.webp",
    dietaryInfo: { isVegetarian: false, isVegan: false, isGlutenFree: true },
    available: true,
    restaurant: "Restor Kitchen",
    restaurantLocation: "Bamenda, Cameroon",
    preparationSteps: [
      "Boil beef with spices and aromatics",
      "Add ground peppers and ginger",
      "Simmer until meat is tender",
      "Adjust seasoning",
      "Garnish with fresh herbs"
    ],
    orderCount: 200,
  },
  {
    id: "7",
    name: "Beef Stew with Rice",
    description:
      "Tender beef simmered in a rich tomato-based stew, served with white rice.",
    price: 3500,
    category: "Main Course",
    preparationTime: 30,
    ingredients: ["Beef", "Tomatoes", "Rice", "Onions", "Thyme"],
    isPopular: true,
    image: "/images/rice-and-stew.webp",
    dietaryInfo: { isVegetarian: false, isVegan: false, isGlutenFree: true },
    available: true,
    restaurant: "Restor Kitchen",
    restaurantLocation: "Bamenda, Cameroon",
    preparationSteps: [
      "Brown beef with onions",
      "Add tomatoes and thyme",
      "Simmer until beef is tender",
      "Cook rice separately",
      "Serve stew over rice"
    ],
    orderCount: 630,
  },
  {
    id: "8",
    name: "Puff Puff",
    description: "Sweet, fluffy fried dough balls, a perfect snack or dessert.",
    price: 1000,
    category: "Desserts",
    preparationTime: 20,
    ingredients: ["Flour", "Sugar", "Yeast", "Nutmeg", "Oil"],
    isPopular: true,
    image: "/images/puff-puff.webp",
    dietaryInfo: { isVegetarian: true, isVegan: true, isGlutenFree: false },
    available: true,
    restaurant: "Sweet Treats",
    restaurantLocation: "Bamenda, Cameroon",
    preparationSteps: [
      "Mix flour, sugar, yeast, and nutmeg",
      "Add water to form dough",
      "Let rise for 15 minutes",
      "Fry in hot oil until golden",
      "Drain and serve warm"
    ],
    orderCount: 700,
  },
  {
    id: "9",
    name: "Fried Rice",
    description:
      "Savory fried rice loaded with mixed vegetables, juicy shrimp, and flavorful local spices.",
    price: 3000,
    category: "Main Course",
    preparationTime: 20,
    ingredients: [
      "Rice",
      "Shrimp",
      "Carrots",
      "Green peas",
      "Onions",
      "Spices",
    ],
    isPopular: true,
    image: "/images/fried-rice.webp",
    dietaryInfo: { isVegetarian: false, isVegan: false, isGlutenFree: true },
    available: false,
    restaurant: "Sea Catch",
    restaurantLocation: "Bamenda, Cameroon",
    preparationSteps: [
      "Cook rice and let cool",
      "Sauté onions and shrimp",
      "Add vegetables and spices",
      "Add rice and stir-fry",
      "Garnish with green onions"
    ],
    orderCount: 450,
  },
];

// ---------------- Helpers ----------------

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

























// ---------------- Driver Profiles (mock, for live tracking demo) ----------------

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

export function getDriverForOrder(orderId: string) {
  const order = mockOrders.find((o) => o.id === orderId);
  if (!order || !order.driverId) return null;

  const user = mockUsers.find((u) => u.id === order.driverId);
  const profile = mockDriverProfiles.find((p) => p.userId === order.driverId);

  if (!user || !profile) return null;

  return {
    name: user.name,
    vehicleType: profile.vehicleType,
    plateNumber: profile.plateNumber,
    isOnline: profile.isOnline,
    currentLatitude: profile.currentLatitude,
    currentLongitude: profile.currentLongitude,
  };
}