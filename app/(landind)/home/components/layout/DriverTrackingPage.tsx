"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaStar, FaPhone, FaMotorcycle,
  FaMapMarkerAlt, FaClock, FaShieldAlt,
  FaWhatsapp, FaArrowLeft, FaShareAlt,
  FaCheckCircle,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { MdMyLocation, MdDeliveryDining, MdLocationOn } from "react-icons/md";


// ===== DRIVER DATA =====
const drivers = [
  {
    id: "DRV-2047",
    name: "James Mbah",
    rating: 4.9,
    totalDeliveries: 1284,
    completedToday: 7,
    memberSince: "2022",
    phone: "+237 654 905 427",
    whatsapp: "+237654905427",
    vehicle: "Honda CB 125F",
    plateNumber: "LT 4821 CM",
    status: "On the way",
    currentLocation: "Commercial Avenue, Bamenda",
    distance: "2.4 km away",
    verified: true,
    available: true,
    pinX: 22,
    pinY: 62,
    // Delivery progress (steps)
    progress: 3, // 0..4 (4 = delivered)
  },
  {
    id: "DRV-1123",
    name: "Amina Ngo",
    rating: 4.7,
    totalDeliveries: 932,
    completedToday: 5,
    memberSince: "2023",
    phone: "+237 675 123 456",
    whatsapp: "+237675123456",
    vehicle: "Yamaha XT 250",
    plateNumber: "LT 7210 CM",
    status: "Available",
    currentLocation: "Nkwen, Bamenda",
    distance: "1.8 km away",
    verified: true,
    available: true,
    pinX: 45,
    pinY: 45,
    progress: 0,
  },
  {
    id: "DRV-3309",
    name: "Paul Ekambi",
    rating: 4.5,
    totalDeliveries: 675,
    completedToday: 3,
    memberSince: "2024",
    phone: "+237 699 887 665",
    whatsapp: "+237699887665",
    vehicle: "Suzuki Hayate",
    plateNumber: "LT 9432 CM",
    status: "Delivering",
    currentLocation: "Mile 4, Bamenda",
    distance: "3.1 km away",
    verified: false,
    available: true,
    pinX: 70,
    pinY: 35,
    progress: 2,
  },
];

// ===== PROGRESS STEPS =====
const PROGRESS_STEPS = ["Confirmed", "Preparing", "Picked Up", "On the Way", "Delivered"];

// ===== HEADQUARTERS =====
const MAP_BBOX = "10.130,5.940,10.170,5.980";

export default function DriverTrackingPage() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [etas, setEtas] = useState<Record<string, number>>({});

  useEffect(() => {
    const initial: Record<string, number> = {};
    drivers.forEach((d) => {
      initial[d.id] = Math.floor(Math.random() * 15) + 5;
    });
    setEtas(initial);

    const t = setInterval(() => {
      setEtas((prev) => {
        const newEtas = { ...prev };
        for (const id in newEtas) {
          if (newEtas[id] > 1) newEtas[id]--;
        }
        return newEtas;
      });
    }, 30_000);
    return () => clearInterval(t);
  }, []);

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const shareTracking = (driverId: string) => {
    const url = `${window.location.origin}/tracking/${driverId}`;
    if (navigator.share) {
      navigator.share({ title: "Track my delivery", url });
    } else {
      navigator.clipboard.writeText(url).then(() => {
        alert("Tracking link copied to clipboard!");
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] font-sans">

      {/* ── TOP BAR ── */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-500 hover:text-orange-500 transition text-sm font-medium"
          >
            <FaArrowLeft className="text-xs" /> Back
          </Link>
          <div className="text-center">
            <h1 className="text-sm font-extrabold text-gray-900 leading-none">Available Drivers</h1>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
              Live tracking
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-full font-bold">
              {drivers.filter((d) => d.available).length} online
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-5 space-y-6">

        {/* ── LIVE MAP ── */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-white">
          <div className="relative w-full h-72 md:h-96">
            <iframe
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${MAP_BBOX}&layer=mapnik`}
              className="w-full h-full border-0"
              title="Driver live map"
              loading="lazy"
            />
            {/* Bottom fade */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/70 to-transparent pointer-events-none" />

            {/* HQ pin */}
            <div className="absolute pointer-events-none" style={{ left: "48%", top: "52%" }}>
              <div className="flex flex-col items-center -translate-x-1/2 -translate-y-1/2">
                <div className="w-8 h-8 bg-blue-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                  <MdLocationOn className="text-white text-sm" />
                </div>
                <span className="mt-1 bg-blue-600 text-white text-[8px] font-bold px-2 py-0.5 rounded-full shadow whitespace-nowrap">
                  HQ
                </span>
              </div>
            </div>

            {/* Driver pins */}
            {drivers.map((driver) => (
              <div
                key={driver.id}
                className="absolute pointer-events-none transition-all duration-700 ease-linear"
                style={{ left: `${driver.pinX}%`, top: `${driver.pinY}%` }}
              >
                <div className="relative flex flex-col items-center -translate-x-1/2 -translate-y-1/2">
                  <div className="absolute w-8 h-8 rounded-full bg-orange-400 opacity-30 animate-ping" />
                  <div className="relative z-10 w-8 h-8 bg-orange-500 rounded-full border-2 border-white shadow-xl flex items-center justify-center">
                    <MdDeliveryDining className="text-white text-sm" />
                  </div>
                  <span className="mt-1 bg-orange-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow whitespace-nowrap">
                    {driver.name.split(" ")[0]}
                  </span>
                </div>
              </div>
            ))}

            {/* My location */}
            <button className="absolute bottom-5 right-4 bg-white shadow-md border border-gray-100 rounded-full p-2.5 hover:bg-orange-50 transition">
              <MdMyLocation className="text-orange-500 text-lg" />
            </button>
          </div>
        </div>

        {/* ── DRIVER CARDS ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {drivers.map((driver) => {
            const eta = etas[driver.id] ?? "—";
            const isExpanded = expanded[driver.id] || false;

            return (
              <div
                key={driver.id}
                className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Header: ETA + Status */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-400 px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaClock className="text-white text-sm" />
                    <span className="text-white font-bold text-lg tracking-tight">
                      {eta} min
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-3 py-1 rounded-full ${
                      driver.available
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {driver.available ? "Available" : "Offline"}
                  </span>
                </div>

                <div className="p-4">
                  {/* Profile row: avatar + name + rating */}
                  <div className="flex items-start gap-3">
                    <div className="relative flex-shrink-0">
                      <Image
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                          driver.name
                        )}&background=FF7A00&color=fff&size=64&rounded=true&bold=true`}
                        alt={driver.name}
                        width={56}
                        height={56}
                        className="rounded-xl border-2 border-orange-100 object-cover"
                      />
                      {driver.verified && (
                        <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-0.5 border-2 border-white">
                          <FaShieldAlt className="text-white text-[8px]" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-extrabold text-gray-900 leading-tight">
                        {driver.name}
                      </h3>
                      <p className="text-gray-400 text-[10px] mt-0.5">ID: {driver.id}</p>
                      <div className="flex items-center gap-1 mt-1 flex-wrap">
                        <span className="flex items-center gap-0.5 bg-yellow-50 border border-yellow-200 px-1.5 py-0.5 rounded-full text-[9px] font-bold text-yellow-600">
                          <FaStar className="text-yellow-400 text-[9px]" /> {driver.rating}
                        </span>
                        <span className="text-[9px] text-gray-400">
                          {driver.totalDeliveries.toLocaleString()} deliveries
                        </span>
                      </div>
                    </div>
                    {/* Action buttons */}
                    <div className="flex flex-col gap-1.5 flex-shrink-0">
                      <a
                        href={`tel:${driver.phone}`}
                        className="flex items-center justify-center w-8 h-8 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition shadow-sm"
                      >
                        <FaPhone className="text-xs" />
                      </a>
                      <a
                        href={`https://wa.me/${driver.whatsapp}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full hover:bg-green-600 transition shadow-sm"
                      >
                        <FaWhatsapp className="text-sm" />
                      </a>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-3">
                    <div className="flex justify-between text-[8px] text-gray-400 font-semibold uppercase tracking-wider mb-1">
                      {PROGRESS_STEPS.map((step, idx) => (
                        <span
                          key={step}
                          className={`${
                            idx <= driver.progress ? "text-orange-500" : ""
                          }`}
                        >
                          {step}
                        </span>
                      ))}
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-orange-500 rounded-full transition-all duration-500"
                        style={{ width: `${(driver.progress / 4) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="my-3 border-t border-gray-100" />

                  {/* Info grid */}
                  <div className="grid grid-cols-2 gap-1.5">
                    <div className="bg-gray-50 rounded-lg p-2">
                      <p className="text-gray-400 text-[8px] font-semibold uppercase tracking-wide">
                        Vehicle
                      </p>
                      <div className="flex items-center gap-1">
                        <FaMotorcycle className="text-orange-500 text-xs" />
                        <span className="font-semibold text-gray-800 text-[10px] truncate">
                          {driver.vehicle}
                        </span>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2">
                      <p className="text-gray-400 text-[8px] font-semibold uppercase tracking-wide">
                        Plate
                      </p>
                      <div className="flex items-center gap-1">
                        <FaShieldAlt className="text-orange-500 text-[10px]" />
                        <span className="font-mono font-semibold text-gray-800 text-[10px]">
                          {driver.plateNumber}
                        </span>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2 col-span-2">
                      <p className="text-gray-400 text-[8px] font-semibold uppercase tracking-wide">
                        Location
                      </p>
                      <div className="flex items-center gap-1">
                        <FaMapMarkerAlt className="text-orange-500 text-[10px]" />
                        <span className="font-semibold text-gray-800 text-[10px] truncate">
                          {driver.currentLocation}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Expandable extra */}
                  <button
                    onClick={() => toggleExpand(driver.id)}
                    className="mt-2 w-full flex items-center justify-center gap-1 text-[10px] text-gray-400 hover:text-orange-500 transition font-semibold py-1"
                  >
                    {isExpanded ? "Hide details" : "Show more"}
                    {isExpanded ? (
                      <FaChevronUp className="text-[8px]" />
                    ) : (
                      <FaChevronDown className="text-[8px]" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="mt-1 bg-orange-50 border border-orange-100 rounded-lg p-3 space-y-1.5">
                      {[
                        ["Phone", driver.phone],
                        ["Email", driver.email],
                        ["Deliveries Today", driver.completedToday],
                        ["Member Since", driver.memberSince],
                        ["Status", driver.status],
                        ["Distance", driver.distance],
                      ].map(([label, value]) => (
                        <div key={label} className="flex justify-between items-center">
                          <span className="text-gray-400 text-[9px]">{label}</span>
                          <span className="text-gray-900 text-[9px] font-bold">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Share button */}
                  <button
                    onClick={() => shareTracking(driver.id)}
                    className="mt-2 w-full flex items-center justify-center gap-1.5 text-[10px] text-blue-600 hover:text-blue-700 transition font-semibold py-1.5 border border-blue-200 rounded-lg hover:bg-blue-50"
                  >
                    <FaShareAlt className="text-[10px]" /> Share tracking
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── FOOTER ── */}
        <p className="text-center text-[11px] text-gray-400 pb-4">
          Need help?{" "}
          <Link href="/contact" className="text-orange-500 font-semibold hover:underline">
            Contact Support
          </Link>{" "}
          · Restor Food Delivery · Bamenda, Cameroon
        </p>
      </div>
    </div>
  );
}