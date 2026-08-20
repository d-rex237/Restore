'use client';

import React, { useState } from 'react';
import DriverLayout from '../components/dashboard/DashboardLayout';
import { 
  Bell, 
  Shield, 
  Moon, 
  Globe, 
  Volume2, 
  MapPin, 
  CreditCard,
  Smartphone,
  Eye,
  Lock,
  User,
  Mail,
  Phone,
  Save,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  DollarSign,
  Clock,
  Truck
} from 'lucide-react';

export default function DriverSettingsPage() {
  const [settings, setSettings] = useState({
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    orderUpdates: true,
    paymentAlerts: true,
    marketingEmails: false,
    
    // Privacy Settings
    showOnlineStatus: true,
    showEarnings: true,
    shareLocation: true,
    
    // Appearance
    darkMode: false,
    compactView: false,
    
    // Language
    language: 'English',
    
    // Delivery Preferences
    maxDistance: '10',
    preferredArea: 'All',
    vehicleType: 'Car',
    acceptAuto: false,
    
    // Payment Settings
    defaultTip: '10',
    paymentMethod: 'Card',
    
    // Account Settings
    twoFactorAuth: false,
    sessionTimeout: '30',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleToggle = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleChange = (key: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

  const SettingSection = ({ 
    title, 
    icon: Icon, 
    children 
  }: { 
    title: string; 
    icon: any; 
    children: React.ReactNode;
  }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-xl">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );

  const ToggleItem = ({ 
    label, 
    description, 
    value, 
    onChange 
  }: { 
    label: string; 
    description?: string; 
    value: boolean; 
    onChange: () => void;
  }) => (
    <div className="flex items-center justify-between py-2">
      <div>
        <p className="text-sm font-medium text-gray-700">{label}</p>
        {description && (
          <p className="text-xs text-gray-500">{description}</p>
        )}
      </div>
      <button
        onClick={onChange}
        className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
          value ? 'bg-blue-600' : 'bg-gray-300'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
            value ? 'transform translate-x-5' : ''
          }`}
        />
      </button>
    </div>
  );

  return (
    <DriverLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
            <p className="text-gray-500">
              Manage your driver preferences and account settings
            </p>
          </div>
          <div className="flex items-center space-x-3">
            {saveSuccess && (
              <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-3 py-2 rounded-xl">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Settings saved!</span>
              </div>
            )}
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`
                flex items-center space-x-2 px-6 py-2.5 rounded-xl font-medium text-white
                transition-all duration-200 shadow-sm
                ${
                  isSaving
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Settings</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Notifications */}
          <SettingSection title="Notifications" icon={Bell}>
            <ToggleItem
              label="Email Notifications"
              description="Receive updates via email"
              value={settings.emailNotifications}
              onChange={() => handleToggle("emailNotifications")}
            />
            <ToggleItem
              label="Push Notifications"
              description="Receive push notifications on your device"
              value={settings.pushNotifications}
              onChange={() => handleToggle("pushNotifications")}
            />
            <ToggleItem
              label="SMS Notifications"
              description="Receive text message alerts"
              value={settings.smsNotifications}
              onChange={() => handleToggle("smsNotifications")}
            />
            <ToggleItem
              label="Order Updates"
              description="Get notified about new delivery requests"
              value={settings.orderUpdates}
              onChange={() => handleToggle("orderUpdates")}
            />
            <ToggleItem
              label="Payment Alerts"
              description="Receive payment confirmation notifications"
              value={settings.paymentAlerts}
              onChange={() => handleToggle("paymentAlerts")}
            />
            <ToggleItem
              label="Marketing Emails"
              description="Receive promotional offers and updates"
              value={settings.marketingEmails}
              onChange={() => handleToggle("marketingEmails")}
            />
          </SettingSection>

          {/* Privacy & Security */}
          <SettingSection title="Privacy & Security" icon={Shield}>
            <ToggleItem
              label="Show Online Status"
              description="Let others see when you're online"
              value={settings.showOnlineStatus}
              onChange={() => handleToggle("showOnlineStatus")}
            />
            <ToggleItem
              label="Show Earnings"
              description="Display your earnings publicly"
              value={settings.showEarnings}
              onChange={() => handleToggle("showEarnings")}
            />
            <ToggleItem
              label="Share Location"
              description="Allow real-time location sharing for deliveries"
              value={settings.shareLocation}
              onChange={() => handleToggle("shareLocation")}
            />
            <ToggleItem
              label="Two-Factor Authentication"
              description="Add an extra layer of security to your account"
              value={settings.twoFactorAuth}
              onChange={() => handleToggle("twoFactorAuth")}
            />

            <div className="py-2">
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Session Timeout (minutes)
              </label>
              <select
                value={settings.sessionTimeout}
                onChange={(e) => handleChange("sessionTimeout", e.target.value)}
                className="text-gray-400 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
                <option value="240">4 hours</option>
                <option value="0">Never</option>
              </select>
            </div>
          </SettingSection>

          {/* Appearance */}
          <SettingSection title="Appearance" icon={Moon}>
            <ToggleItem
              label="Dark Mode"
              description="Switch to dark theme"
              value={settings.darkMode}
              onChange={() => handleToggle("darkMode")}
            />
            <ToggleItem
              label="Compact View"
              description="Display more items with compact layout"
              value={settings.compactView}
              onChange={() => handleToggle("compactView")}
            />

            <div className="py-2">
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Language
              </label>
              <select
                value={settings.language}
                onChange={(e) => handleChange("language", e.target.value)}
                className="text-gray-400 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Chinese">Chinese</option>
                <option value="Japanese">Japanese</option>
              </select>
            </div>
          </SettingSection>

          {/* Account */}
          <SettingSection title="Account Settings" icon={User}>
            <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-600" />
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-700">
                    Profile Information
                  </p>
                  <p className="text-xs text-gray-500">
                    Update your personal details
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>

            <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
              <div className="flex items-center space-x-3">
                <Lock className="w-5 h-5 text-gray-600" />
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-700">
                    Change Password
                  </p>
                  <p className="text-xs text-gray-500">
                    Update your security credentials
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>

            <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
              <div className="flex items-center space-x-3">
                <Smartphone className="w-5 h-5 text-gray-600" />
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-700">
                    Device Management
                  </p>
                  <p className="text-xs text-gray-500">
                    Manage connected devices
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>

            <button className="w-full flex items-center justify-between px-4 py-3 bg-red-50 hover:bg-red-100 rounded-xl transition-colors">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <div className="text-left">
                  <p className="text-sm font-medium text-red-700">
                    Deactivate Account
                  </p>
                  <p className="text-xs text-red-600">
                    Temporarily disable your driver account
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-red-400" />
            </button>
          </SettingSection>
        </div>

        {/* Save Bar - Sticky on mobile */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
          <div className="flex items-center space-x-3">
            {saveSuccess && (
              <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-3 py-2 rounded-xl flex-1">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Saved!</span>
              </div>
            )}
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`
                flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-medium text-white
                transition-all duration-200 shadow-sm
                ${
                  isSaving
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }
              `}
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Settings</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </DriverLayout>
  );
}