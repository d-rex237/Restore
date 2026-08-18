
'use client';

import React, { useState } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { User, Mail, Phone, MapPin, Edit2, Camera } from 'lucide-react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+237 682 567 890",
    address: "123 Main St, New York, NY 10001",
    role: "Customer",
    memberSince: "January 2024",
  });

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
          <p className="text-gray-500">Manage your personal information</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-700 rounded-2xl flex items-center justify-center text-white text-3xl font-bold">
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
                <span className="text-sm text-gray-500">{profile.role}</span>
                <span className="hidden md:inline text-gray-300">|</span>
                <span className="text-sm text-gray-500">
                  Member since {profile.memberSince}
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors shadow-sm"
            >
              <Edit2 className="w-4 h-4" />
              <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
            </button>
          </div>

          {/* Profile Details */}
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
                    className="text-gray-400 mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
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
                    className="text-gray-400 mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  />
                ) : (
                  <p className="font-medium text-gray-800">{profile.phone}</p>
                )}
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-2 bg-gray-100 rounded-xl">
                <MapPin className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Delivery Address</p>
                {isEditing ? (
                  <textarea
                    value={profile.address}
                    onChange={(e) =>
                      setProfile({ ...profile, address: e.target.value })
                    }
                    rows={2}
                    className="text-gray-400 mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
                  />
                ) : (
                  <p className="font-medium text-gray-800">{profile.address}</p>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="pt-4 border-t border-gray-200">
                <button className="w-full py-3 bg-blue-500 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors shadow-sm">
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}