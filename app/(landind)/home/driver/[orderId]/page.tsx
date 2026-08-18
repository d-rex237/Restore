// app/(landind)/home/driver/[orderId]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DriverMap from "../../components/DriverMap";
import DriverCard from "../../components/DriverCard";
interface OrderTrackData {
  orderId: string;
  status: string;
  driver: {
    name: string;
    vehicleType: string;
    plateNumber: string;
    isOnline: boolean;
    currentLatitude: number;
    currentLongitude: number;
  } | null;
}

export default function TrackOrderPage() {
  const params = useParams();
  const orderId = params.orderId as string;

  const [data, setData] = useState<OrderTrackData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchOrderData = async () => {
    try {
      const res = await fetch(`/api/orders/${orderId}/track`);
      if (!res.ok) throw new Error('Failed to fetch');
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchOrderData();
      // Poll every 3 seconds
      const interval = setInterval(fetchOrderData, 3000);
      return () => clearInterval(interval);
    }
  }, [orderId]);

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>Order not found</div>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-foreground mb-6">
        Track Your Order
      </h1>

      {data.driver ? (
        <DriverCard
          name={data.driver.name}
          vehicleType={data.driver.vehicleType}
          plateNumber={data.driver.plateNumber}
          isOnline={data.driver.isOnline}
          status={data.status}
          latitude={data.driver.currentLatitude}
          longitude={data.driver.currentLongitude}
        />
      ) : (
        <div className="bg-card/50 border border-border/30 rounded-xl shadow-sm p-6 text-center text-foreground/60">
          No driver has been assigned to this order yet.
        </div>
      )}
    </div>
  );
}