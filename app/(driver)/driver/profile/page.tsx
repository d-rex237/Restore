'use client';

import React, { useState } from 'react';
import DriverLayout from '../components/driver/DriverLayout';
import { User, Mail, Phone, Truck, CreditCard, Edit2, Camera, Star, CheckCircle } from 'lucide-react';
import { FaStar } from 'react-icons/fa';

export default function DriverProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Driver",
    email: "john.driver@example.com",
    phone: "+1 234 567 890",
    vehicleType: "Car",
    licenseNumber: "DL-12345",
    plateNumber: "ABC-1234",
    vehicleModel: "Toyota Camry 2020",
    memberSince: "January 2024",
    totalDeliveries: 42,
    rating: 4.8,
    completionRate: "98%",
  });

  return (
    <DriverLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Driver Profile</h1>
          <p className="text-gray-500">Manage your driver information</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold">
                JD
              </div>
              <button className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-50 transition-colors">
                <Camera className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-xl font-bold text-gray-800">
                {profile.name}
              </h2>
              <div className="flex flex-col md:flex-row md:items-center md:space-x-3 mt-1">
                <span className="text-sm text-blue-600 font-medium">
                  Driver
                </span>
                <span className="hidden md:inline text-gray-300">|</span>
                <span className="text-sm text-gray-500">
                  Member since {profile.memberSince}
                </span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-6 mt-3">
                <div className="flex items-center space-x-1">
                  <FaStar color="gold" />
                  <span className="font-semibold text-gray-800">
                    {profile.rating}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Truck className="w-4 h-4 text-blue-500" />
                  <span className="font-semibold text-gray-800">
                    {profile.totalDeliveries}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="font-semibold text-gray-800">
                    {profile.completionRate}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors shadow-sm"
            >
              <Edit2 className="w-4 h-4" />
              <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
            </button>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8 space-y-6">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-gray-100 rounded-xl">
                <User className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Full Name</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                    className="text-gray-400 mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                ) : (
                  <p className="font-medium text-gray-800">{profile.name}</p>
                )}
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-2 bg-gray-100 rounded-xl">
                <Mail className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-800">{profile.email}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-2 bg-gray-100 rounded-xl">
                <Phone className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Phone</p>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                    className="text-gray-400 mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                ) : (
                  <p className="font-medium text-gray-800">{profile.phone}</p>
                )}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-semibold text-gray-800 mb-4">
                Vehicle Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-gray-100 rounded-xl">
                    <Truck className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Vehicle Type</p>
                    {isEditing ? (
                      <select
                        value={profile.vehicleType}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            vehicleType: e.target.value,
                          })
                        }
                        className="text-gray-400 mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      >
                        <option value="Car">Car</option>
                        <option value="Motorcycle">Motorcycle</option>
                        <option value="Scooter">Scooter</option>
                        <option value="Bicycle">Bicycle</option>
                      </select>
                    ) : (
                      <p className="font-medium text-gray-800">
                        {profile.vehicleType}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-gray-100 rounded-xl">
                    <CreditCard className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">License Number</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.licenseNumber}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            licenseNumber: e.target.value,
                          })
                        }
                        className="text-gray-400 mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    ) : (
                      <p className="font-medium text-gray-800">
                        {profile.licenseNumber}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-gray-100 rounded-xl">
                    <CreditCard className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Plate Number</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.plateNumber}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            plateNumber: e.target.value,
                          })
                        }
                        className="text-gray-400 mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    ) : (
                      <p className="font-medium text-gray-800">
                        {profile.plateNumber}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-gray-100 rounded-xl">
                    <Truck className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Vehicle Model</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.vehicleModel}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            vehicleModel: e.target.value,
                          })
                        }
                        className="text-gray-400 mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    ) : (
                      <p className="font-medium text-gray-800">
                        {profile.vehicleModel}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="pt-4 border-t border-gray-200">
                <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors shadow-sm">
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </DriverLayout>
  );
}