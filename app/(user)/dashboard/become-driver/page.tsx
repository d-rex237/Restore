"use client";

import React, { useState } from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import {
  Truck,
  Send,
  AlertCircle,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";
import {
  useCreateRoleRequest,
  useMyRoleRequests,
} from "@/hooks/use-role-requests";

function BecomeDriverPage() {
  const { data: requests = [], isLoading: statusLoading } = useMyRoleRequests();
  const createRequest = useCreateRoleRequest();

  const [formData, setFormData] = useState({
    vehicleType: "",
    licenseNumber: "",
    plateNumber: "",
  });
  const [formError, setFormError] = useState<string | null>(null);

  const driverRequest = requests.find((r: any) => r.requestedRole === "DRIVER");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    try {
      await createRequest.mutateAsync({
        requestedRole: "DRIVER",
        extraData: formData,
      });
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-blue-200 rounded-xl">
              <Truck className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Become a Driver
              </h1>
              <p className="text-gray-500">
                Join our delivery fleet and start earning
              </p>
            </div>
          </div>

          {statusLoading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
          ) : driverRequest?.status === "PENDING" ? (
            /* ---------------- Already has a pending application ---------------- */
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 flex items-start space-x-4">
              <Clock className="w-6 h-6 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-amber-900">
                  Application under review
                </p>
                <p className="text-sm text-amber-700 mt-1">
                  Your driver application was submitted on{" "}
                  {new Date(driverRequest.createdAt).toLocaleDateString()}. An
                  admin will review it soon.
                </p>
              </div>
            </div>
          ) : driverRequest?.status === "APPROVED" ? (
            /* ---------------- Already approved ---------------- */
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 flex items-start space-x-4">
              <CheckCircle2 className="w-6 h-6 text-green-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-green-900">
                  You're already a driver!
                </p>
                <p className="text-sm text-green-700 mt-1">
                  Head to your driver dashboard to start accepting deliveries.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* ---------------- Rejected banner (can reapply) ---------------- */}
              {driverRequest?.status === "REJECTED" && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start space-x-3">
                  <XCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                  <p className="text-sm text-red-700">
                    Your previous application was not approved. You're welcome
                    to submit a new one below.
                  </p>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-800 font-medium">
                      Application Process
                    </p>
                    <p className="text-sm text-blue-700">
                      Your application will be reviewed by our admin team. Once
                      approved, you'll be able to start accepting deliveries.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vehicle Type *
                  </label>
                  <select
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleChange}
                    required
                    className="text-gray-700 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="">Select vehicle type</option>
                    <option value="car">Car</option>
                    <option value="motorcycle">Motorcycle</option>
                    <option value="scooter">Scooter</option>
                    <option value="bicycle">Bicycle</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      License Number *
                    </label>
                    <input
                      type="text"
                      name="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={handleChange}
                      required
                      placeholder="e.g., DL-12345"
                      className="text-gray-700 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Plate Number *
                    </label>
                    <input
                      type="text"
                      name="plateNumber"
                      value={formData.plateNumber}
                      onChange={handleChange}
                      required
                      placeholder="e.g., ABC-1234"
                      className="text-gray-700 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                {formError && (
                  <p className="text-sm text-red-600">{formError}</p>
                )}

                <button
                  type="submit"
                  disabled={createRequest.isPending}
                  className={`
                    w-full flex items-center justify-center space-x-2 py-3 rounded-xl font-semibold text-white
                    transition-all duration-200
                    ${
                      createRequest.isPending
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl"
                    }`}
                >
                  <span>
                    {createRequest.isPending
                      ? "Submitting..."
                      : "Submit Application"}
                  </span>
                  <Send
                    className={`w-4 h-4 ${createRequest.isPending ? "opacity-0" : ""}`}
                  />
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default BecomeDriverPage;
