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
  {
    id: "o1",
    customerId: "u1",
    customerName: "Achiri Divine",
    restaurantId: "r1",
    restaurantName: "Mama Grace Kitchen",
    driverId: undefined,
    driverName: undefined,
    status: "pending",
    items: [
      {
        menuItemId: "m1",
        name: "Jollof Rice & Chicken",
        quantity: 2,
        priceAtOrder: 3500,
      },
    ],
    total: 7000,
    deliveryAddress: "Hospital Roundabout, Bamenda",
    createdAt: "2026-07-28T08:15:00Z",
  },
  {
    id: "o2",
    customerId: "u2",
    customerName: "Ngwa Precious",
    restaurantId: "r2",
    restaurantName: "Suya Spot",
    driverId: "u3",
    driverName: "Tabi Emmanuel",
    status: "out_for_delivery",
    items: [
      {
        menuItemId: "m4",
        name: "Beef Suya Skewers",
        quantity: 1,
        priceAtOrder: 2500,
      },
      {
        menuItemId: "m5",
        name: "Chicken Suya Wrap",
        quantity: 1,
        priceAtOrder: 2000,
      },
    ],
    total: 4500,
    deliveryAddress: "Food Market, Bamenda",
    createdAt: "2026-07-28T07:40:00Z",
  },
  {
    id: "o3",
    customerId: "u1",
    customerName: "Achiri Divine",
    restaurantId: "r1",
    restaurantName: "Mama Grace Kitchen",
    driverId: "u4",
    driverName: "Fon Blessing",
    status: "delivered",
    items: [
      {
        menuItemId: "m2",
        name: "Ndole & Plantain",
        quantity: 1,
        priceAtOrder: 4000,
      },
    ],
    total: 4000,
    deliveryAddress: "Up Station, Bamenda",
    createdAt: "2026-07-27T18:05:00Z",
  },
  {
    id: "o4",
    customerId: "u2",
    customerName: "Ngwa Precious",
    restaurantId: "r2",
    restaurantName: "Suya Spot",
    status: "preparing",
    items: [
      {
        menuItemId: "m4",
        name: "Beef Suya Skewers",
        quantity: 3,
        priceAtOrder: 2500,
      },
    ],
    total: 7500,
    deliveryAddress: "Cow Street, Bamenda",
    createdAt: "2026-07-28T08:30:00Z",
  },
  {
    id: "o5",
    customerId: "u1",
    customerName: "Achiri Divine",
    restaurantId: "r3",
    restaurantName: "Suya Spot Express",
    status: "cancelled",
    items: [
      {
        menuItemId: "m6",
        name: "Suya Platter",
        quantity: 1,
        priceAtOrder: 6000,
      },
    ],
    total: 6000,
    deliveryAddress: "Nkwen Junction, Bamenda",
    createdAt: "2026-07-26T20:00:00Z",
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
