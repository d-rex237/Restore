"use client";

import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface AvailableDriver {
  id: string;
  name: string;
  vehicleType: string;
  plateNumber: string;
  latitude: number;
  longitude: number;
  rating?: number;
}

interface DriverMapProps {
  latitude: number;
  longitude: number;
  driverName: string;

  pickupLatitude?: number;
  pickupLongitude?: number;
  pickupName?: string;

  destinationLatitude?: number;
  destinationLongitude?: number;
  destinationName?: string;

  availableDrivers?: AvailableDriver[];
}

function RecenterMap({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}) {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lng], map.getZoom(), {
      animate: true,
    });
  }, [lat, lng, map]);

  return null;
}

export default function DriverMap({
  latitude,
  longitude,
  driverName,
  pickupLatitude,
  pickupLongitude,
  pickupName = "Restaurant",
  destinationLatitude,
  destinationLongitude,
  destinationName = "Delivery location",
  availableDrivers = [],
}: DriverMapProps) {
  const route: [number, number][] = [];

  if (
    pickupLatitude !== undefined &&
    pickupLongitude !== undefined
  ) {
    route.push([pickupLatitude, pickupLongitude]);
  }

  route.push([latitude, longitude]);

  if (
    destinationLatitude !== undefined &&
    destinationLongitude !== undefined
  ) {
    route.push([
      destinationLatitude,
      destinationLongitude,
    ]);
  }

  return (
    <div className="relative h-full min-h-[500px] overflow-hidden rounded-2xl">
      <MapContainer
        center={[latitude, longitude]}
        zoom={15}
        scrollWheelZoom={true}
        className="h-full min-h-[500px] w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <RecenterMap
          lat={latitude}
          lng={longitude}
        />

        {/* Delivery route */}
        {route.length >= 2 && (
          <Polyline
            positions={route}
            pathOptions={{
              color: "#FA7B2C",
              weight: 6,
              opacity: 0.85,
            }}
          />
        )}

        {/* Restaurant / Pickup */}
        {pickupLatitude !== undefined &&
          pickupLongitude !== undefined && (
            <Marker
              position={[
                pickupLatitude,
                pickupLongitude,
              ]}
            >
              <Popup>
                <strong>{pickupName}</strong>
                <br />
                Pickup location
              </Popup>
            </Marker>
          )}

        {/* Assigned driver */}
        <Marker position={[latitude, longitude]}>
          <Popup>
            <strong>{driverName}</strong>
            <br />
            Your assigned driver
            <br />
            <span style={{ color: "green" }}>
              ● Live
            </span>
          </Popup>
        </Marker>

        {/* Other available drivers */}
        {availableDrivers.map((driver) => (
          <Marker
            key={driver.id}
            position={[
              driver.latitude,
              driver.longitude,
            ]}
          >
            <Popup>
              <strong>{driver.name}</strong>
              <br />
              Available driver
              <br />
              {driver.vehicleType}
              <br />
              {driver.plateNumber}
              {driver.rating !== undefined && (
                <>
                  <br />
                  ⭐ {driver.rating.toFixed(1)}
                </>
              )}
            </Popup>
          </Marker>
        ))}

        {/* Destination */}
        {destinationLatitude !== undefined &&
          destinationLongitude !== undefined && (
            <Marker
              position={[
                destinationLatitude,
                destinationLongitude,
              ]}
            >
              <Popup>
                <strong>
                  {destinationName}
                </strong>
                <br />
                Delivery destination
              </Popup>
            </Marker>
          )}
      </MapContainer>

      {/* Live tracking badge */}
      <div className="absolute left-4 top-4 z-[1000] flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-lg">
        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-500" />
        Live tracking
      </div>

      {/* Map legend */}
      <div className="absolute bottom-4 left-4 z-[1000] rounded-xl bg-white p-3 text-xs text-gray-900 shadow-lg">
        <div className="mb-2 font-bold">
          Delivery map
        </div>

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-green-500" />
          Assigned driver
        </div>

        <div className="mt-1 flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-blue-500" />
          Available drivers
        </div>

        <div className="mt-1 flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500" />
          Delivery destination
        </div>
      </div>

      {/* Driver count */}
      {availableDrivers.length > 0 && (
        <div className="absolute right-4 top-4 z-[1000] rounded-xl bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-lg">
          {availableDrivers.length} drivers nearby
        </div>
      )}
    </div>
  );
}