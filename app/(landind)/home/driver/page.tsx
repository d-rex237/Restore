"use client";

import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";

import {
  FaArrowLeft,
  FaCheck,
  FaClock,
  FaMapMarkerAlt,
  FaStore,
  FaTruck,
} from "react-icons/fa";
import DriverCard from "../components/DriverCard";

const DriverMap = dynamic(
  () => import("../components/DriverMap"),
  {
    ssr: false,
  }
);

export default function DriverTrackingPage() {
  const params = useParams();
  const router = useRouter();

  const orderId = params.orderId as string;

  /*
   * CITY CHEMIST / BAMENDA
   *
   * These coordinates are used for the prototype.
   * They will later come from the customer's saved
   * delivery address in the backend.
   */
  const cityChemist = {
    latitude: 5.9587416,
    longitude: 10.1515844,
  };

  /*
   * Temporary order data.
   *
   * Later this will come from:
   *
   * GET /api/orders/[orderId]/track
   */
  const order = {
    id: orderId,

    status: "on_the_way",

    eta: 12,

    driver: {
      id: "driver-001",
      name: "John Driver",
      vehicleType: "Motorbike",
      plateNumber: "NW 123 AB",
      isOnline: true,
      rating: 4.9,
      phone: "+237600000000",

      /*
       * Assigned driver.
       * Keep this around Bamenda / City Chemist.
       */
      latitude: 5.9568,
      longitude: 10.1489,
    },

    restaurant: {
      name: "Restore Restaurant",

      latitude: 5.9622,
      longitude: 10.1545,
    },

    destination: {
      name: "City Chemist",
      latitude: cityChemist.latitude,
      longitude: cityChemist.longitude,
    },

    /*
     * Other drivers currently available nearby.
     */
    availableDrivers: [
      {
        id: "driver-002",
        name: "Michael",
        vehicleType: "Motorbike",
        plateNumber: "NW 221 BB",
        latitude: 5.9607,
        longitude: 10.1572,
        rating: 4.8,
      },
      {
        id: "driver-003",
        name: "Daniel",
        vehicleType: "Motorbike",
        plateNumber: "NW 342 CC",
        latitude: 5.9548,
        longitude: 10.1552,
        rating: 4.7,
      },
      {
        id: "driver-004",
        name: "Peter",
        vehicleType: "Car",
        plateNumber: "NW 455 DD",
        latitude: 5.9634,
        longitude: 10.1475,
        rating: 4.9,
      },
      {
        id: "driver-005",
        name: "David",
        vehicleType: "Motorbike",
        plateNumber: "NW 518 EE",
        latitude: 5.9518,
        longitude: 10.1498,
        rating: 4.6,
      },
    ],

    items: [
      {
        name: "Grilled Chicken",
        quantity: 1,
        price: 3500,
      },
      {
        name: "Plantain",
        quantity: 1,
        price: 1000,
      },
    ],

    deliveryFee: 500,
  };

  const subtotal = order.items.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const total =
    subtotal + order.deliveryFee;

  const steps = [
    {
      label: "Order confirmed",
      description:
        "Your order has been confirmed",
      completed: true,
    },
    {
      label: "Restaurant preparing",
      description:
        "Your food is being prepared",
      completed: true,
    },
    {
      label: "Driver picked up order",
      description:
        "Your driver has your order",
      completed: true,
    },
    {
      label: "Driver is on the way",
      description:
        "Your driver is heading to City Chemist",
      completed: true,
      active: true,
    },
    {
      label: "Delivered",
      description:
        "Your order will be delivered here",
      completed: false,
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/30 bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border/40 transition hover:bg-card"
          >
            <FaArrowLeft />
          </button>

          <div>
            <h1 className="font-bold">
              Track your order
            </h1>

            <p className="text-xs text-foreground/50">
              Order #{order.id}
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Tracking overview */}
        <div className="mb-6 rounded-2xl border border-primary/20 bg-primary/5 p-5">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-medium text-primary">
                Your order is on the way
              </p>

              <h2 className="mt-1 text-2xl font-bold">
                Arriving in about {order.eta} minutes
              </h2>

              <p className="mt-1 text-sm text-foreground/60">
                Your driver is heading to City Chemist,
                Bamenda.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-600">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-500" />
              Driver is live
            </div>
          </div>
        </div>

        {/* Map + driver */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="overflow-hidden rounded-2xl border border-border/30 bg-card shadow-sm lg:col-span-2">
            <DriverMap
              latitude={order.driver.latitude}
              longitude={order.driver.longitude}
              driverName={order.driver.name}
              pickupLatitude={
                order.restaurant.latitude
              }
              pickupLongitude={
                order.restaurant.longitude
              }
              pickupName={order.restaurant.name}
              destinationLatitude={
                order.destination.latitude
              }
              destinationLongitude={
                order.destination.longitude
              }
              destinationName={
                order.destination.name
              }
              availableDrivers={
                order.availableDrivers
              }
            />
          </div>

          <div>
            <DriverCard
              name={order.driver.name}
              vehicleType={
                order.driver.vehicleType
              }
              plateNumber={
                order.driver.plateNumber
              }
              isOnline={
                order.driver.isOnline
              }
              status={order.status}
              rating={order.driver.rating}
              phone={order.driver.phone}
              eta={order.eta}
            />
          </div>
        </div>

        {/* Nearby drivers */}
        <section className="mt-6 rounded-2xl border border-border/30 bg-card p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold">
                Drivers nearby
              </h2>

              <p className="mt-1 text-sm text-foreground/50">
                Other available Restore drivers around
                your delivery area.
              </p>
            </div>

            <span className="w-fit rounded-full bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-600">
              {order.availableDrivers.length} available
            </span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {order.availableDrivers.map(
              (driver) => (
                <div
                  key={driver.id}
                  className="rounded-xl border border-border/30 bg-background/50 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-500/10 text-lg">
                      🛵
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate font-semibold">
                        {driver.name}
                      </h3>

                      <p className="text-xs text-foreground/50">
                        Available nearby
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span>
                      {driver.vehicleType}
                    </span>

                    <span className="font-mono font-semibold">
                      {driver.plateNumber}
                    </span>
                  </div>

                  <div className="mt-2 text-xs">
                    ⭐ {driver.rating?.toFixed(1)}
                  </div>
                </div>
              )
            )}
          </div>
        </section>

        {/* Delivery progress */}
        <section className="mt-6 rounded-2xl border border-border/30 bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">
                Delivery progress
              </h2>

              <p className="mt-1 text-sm text-foreground/50">
                Follow your order from restaurant to
                your door.
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
              <FaTruck />
            </div>
          </div>

          <div className="mt-8">
            {steps.map((step, index) => {
              const isLast =
                index === steps.length - 1;

              return (
                <div
                  key={step.label}
                  className="relative flex gap-4"
                >
                  {!isLast && (
                    <div
                      className={`absolute left-[15px] top-8 h-12 w-0.5 ${
                        step.completed
                          ? "bg-primary"
                          : "bg-border"
                      }`}
                    />
                  )}

                  <div
                    className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      step.completed
                        ? "bg-primary text-primary-foreground"
                        : "border-2 border-border bg-card text-foreground/40"
                    } ${
                      step.active
                        ? "ring-4 ring-primary/10"
                        : ""
                    }`}
                  >
                    {step.completed ? (
                      <FaCheck className="text-xs" />
                    ) : (
                      <span className="text-xs">
                        {index + 1}
                      </span>
                    )}
                  </div>

                  <div className="pb-8">
                    <h3
                      className={`font-semibold ${
                        step.active
                          ? "text-primary"
                          : "text-foreground"
                      }`}
                    >
                      {step.label}
                    </h3>

                    <p className="mt-1 text-sm text-foreground/50">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Pickup and destination */}
        <section className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border/30 bg-card p-5 shadow-sm">
            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <FaStore />
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-foreground/50">
                  Pickup
                </p>

                <h3 className="mt-1 font-bold">
                  {order.restaurant.name}
                </h3>

                <p className="mt-1 text-sm text-foreground/50">
                  Restaurant in Bamenda
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-green-500/20 bg-card p-5 shadow-sm">
            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-600">
                <FaMapMarkerAlt />
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-foreground/50">
                  Delivery
                </p>

                <h3 className="mt-1 font-bold">
                  City Chemist
                </h3>

                <p className="mt-1 text-sm text-foreground/50">
                  Bamenda, Cameroon
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Order summary */}
        <section className="mt-6 rounded-2xl border border-border/30 bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">
                Order summary
              </h2>

              <p className="mt-1 text-sm text-foreground/50">
                Order #{order.id}
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-primary">
              <FaClock />
              <span>{order.eta} min</span>
            </div>
          </div>

          <div className="mt-6 divide-y divide-border/30">
            {order.items.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between py-3"
              >
                <span className="font-medium">
                  {item.quantity} × {item.name}
                </span>

                <span className="font-semibold">
                  {(
                    item.price *
                    item.quantity
                  ).toLocaleString()}{" "}
                  FCFA
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-2 border-t border-border/30 pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-foreground/50">
                Subtotal
              </span>

              <span>
                {subtotal.toLocaleString()} FCFA
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-foreground/50">
                Delivery fee
              </span>

              <span>
                {order.deliveryFee.toLocaleString()} FCFA
              </span>
            </div>

            <div className="flex justify-between border-t border-border/30 pt-3 text-lg font-bold">
              <span>Total</span>

              <span>
                {total.toLocaleString()} FCFA
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}