"use client";

import {
  useApproveRoleRequest,
  useGetAllRoleRequests,
  useRejectRoleRequest,
} from "@/hooks/use-role-requests";
import { Check, Loader2, Trash } from "lucide-react";
import { useState } from "react";

function AdminRequest() {
  const ITEMS_PER_PAGE = 5;

  const { data: requests = [], isLoading } = useGetAllRoleRequests();
  const approveMutation = useApproveRoleRequest();
  const rejectMutation = useRejectRoleRequest();

  const [currentPage, setCurrentPage] = useState(1);
  const [actioningId, setActioningId] = useState<string | null>(null);

  const totalPages = Math.max(1, Math.ceil(requests.length / ITEMS_PER_PAGE));
  const paginatedRequests = requests.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  async function handleApprove(requestId: string) {
    setActioningId(requestId);
    try {
      await approveMutation.mutateAsync(requestId);
    } finally {
      setActioningId(null);
    }
  }

  async function handleReject(requestId: string) {
    if (!confirm("Reject this application?")) return;
    setActioningId(requestId);
    try {
      await rejectMutation.mutateAsync(requestId);
    } finally {
      setActioningId(null);
    }
  }

  // Different roles submit different extraData shapes — show the most
  // relevant field per role instead of blindly grabbing the first value.
  function getKeyDetail(request: any) {
    const extraData = request.extraData ?? {};
    if (request.requestedRole === "DRIVER") {
      return extraData.vehicleType
        ? `${extraData.vehicleType} · ${extraData.plateNumber ?? ""}`
        : "N/A";
    }
    if (request.requestedRole === "PROVIDER") {
      return extraData.restaurantName ?? "N/A";
    }
    return Object.values(extraData)[0] ?? "N/A";
  }

  return (
    <div>
      <section className="mt-8 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Role Requests
            </h2>
            <p className="text-sm text-gray-500">
              Review driver and vendor applications
            </p>
          </div>

          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
            {requests.length} Requests
          </span>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 size={20} className="animate-spin text-gray-400" />
          </div>
        ) : requests.length === 0 ? (
          <div className="py-16 text-center text-sm text-gray-500">
            No role requests yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px]">
              <thead className="bg-gray-50">
                <tr className="text-left text-sm font-semibold uppercase tracking-wide text-gray-500">
                  <th className="px-6 py-4">Applicant</th>
                  <th className="px-6 py-4">Details</th>
                  <th className="px-6 py-4">Requested Role</th>
                  <th className="px-6 py-4">Submitted</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {paginatedRequests.map((request: any) => {
                  const isPending = request.status === "PENDING";
                  const isActioning = actioningId === request.id;

                  return (
                    <tr key={request.id} className="bg-white hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                            {request.user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {request.user.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {request.user.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {getKeyDetail(request)}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium capitalize
                            ${
                              request.requestedRole === "DRIVER"
                                ? "border-green-500 bg-green-50 text-green-700"
                                : "border-orange-500 bg-orange-50 text-orange-700"
                            }`}
                        >
                          <span
                            className={`h-2 w-2 rounded-full ${
                              request.requestedRole === "DRIVER"
                                ? "bg-green-500"
                                : "bg-orange-500"
                            }`}
                          />
                          {request.requestedRole.toLowerCase()}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {new Date(request.createdAt).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium capitalize
                            ${
                              request.status === "APPROVED"
                                ? "border-green-500 bg-green-50 text-green-700"
                                : request.status === "PENDING"
                                  ? "border-purple-500 bg-purple-50 text-purple-700"
                                  : "border-red-500 bg-red-50 text-red-700"
                            }`}
                        >
                          {request.status.toLowerCase()}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        {/* Only show actions while pending — once reviewed,
                            the status badge alone communicates the outcome. */}
                        {isPending ? (
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleApprove(request.id)}
                              disabled={isActioning}
                              className="rounded-md border border-green-500 bg-green-100 p-1 text-green-600 disabled:opacity-50"
                              aria-label="Approve request"
                            >
                              {isActioning ? (
                                <Loader2 size={18} className="animate-spin" />
                              ) : (
                                <Check size={18} />
                              )}
                            </button>
                            <button
                              onClick={() => handleReject(request.id)}
                              disabled={isActioning}
                              className="rounded-md border border-red-500 bg-red-100 p-1 text-red-500 disabled:opacity-50"
                              aria-label="Reject request"
                            >
                              <Trash size={18} />
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">
                            No action needed
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex items-center justify-between border-t bg-white px-6 py-4">
          <p className="text-sm text-gray-500">
            Showing{" "}
            {requests.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1}
            –{Math.min(currentPage * ITEMS_PER_PAGE, requests.length)} of{" "}
            {requests.length} requests
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="rounded-md border px-2 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-100"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`h-7 w-7 rounded-md text-sm ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white"
                    : "border hover:bg-gray-100"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="rounded-md border px-2 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-100"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminRequest;
