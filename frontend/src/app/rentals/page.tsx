"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import type { Rental, Provider, Car } from "@/types";
import { toInputDate } from "@/libs/utils";
import { useToast, Toast } from "@/components/ui/Toast";
import Loading from "@/components/ui/Loading";
import DateRangeDisplay from "@/components/ui/DateRangeDisplay";
import DateRangePicker from "@/components/ui/DateRangePicker";

export default function RentalsPage() {
  const { data: session, status } = useSession();
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<string | null>(null);
  const [editPickup, setEditPickup] = useState("");
  const [editReturn, setEditReturn] = useState("");
  const [toast, showToast] = useToast();

  const fetchRentals = async (token: string) => {
    try {
      const res = await fetch("/api/rentals", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setRentals(data.data);
    } catch (err) {
      console.error("Failed to fetch rentals:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (status === "authenticated" && session?.user.token) {
      fetchRentals(session.user.token);
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [status, session]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this rental?")) return;
    const res = await fetch(`/api/rentals/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${session!.user.token}` },
    }).then((r) => r.json());
    if (res.success) {
      showToast("Rental deleted");
      fetchRentals(session!.user.token);
    }
  };

  const handleUpdate = async (id: string) => {
    if (new Date(editReturn) <= new Date(editPickup)) {
      showToast("Return date must be after pickup date");
      return;
    }
    const res = await fetch(`/api/rentals/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${session!.user.token}` },
      body: JSON.stringify({ rentalDate: editPickup, returnDate: editReturn }),
    }).then((r) => r.json());
    if (res.success) {
      showToast("Rental updated");
      setEditId(null);
      fetchRentals(session!.user.token);
    } else {
      showToast(res.message || "Failed to update");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <Toast message={toast} />

      <div className="mb-10 animate-fade-in-up">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">My Rentals</h1>
        <p className="text-slate-500">Manage your car rental bookings</p>
      </div>

      {rentals.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <p className="mb-4">No rentals yet.</p>
          <a href="/providers" className="btn-primary text-sm">Browse Providers</a>
        </div>
      ) : (
        <div className="space-y-4 stagger-children">
          {rentals.map((r) => {
            const prov = r.provider as Provider;
            const car = r.car as Car | undefined;

            return (
              <div key={r._id} className="card overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  {car?.image && (
                    <div className="sm:w-48 h-32 sm:h-auto shrink-0 bg-slate-100">
                      <img src={car.image} alt={`${car.brand} ${car.model}`} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex-1 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-slate-900">{car ? `${car.brand} ${car.model}` : "Car"}</h3>
                        {car && <span className="text-xs text-slate-400">{car.licensePlate}</span>}
                      </div>
                      <p className="text-sm text-slate-500 mt-1">Provider: {prov?.name || "Unknown"}</p>

                      {editId === r._id ? (
                        <div className="flex flex-wrap items-center gap-2 mt-3">
                          <DateRangePicker compact pickup={editPickup} returnDate={editReturn} onPickupChange={setEditPickup} onReturnChange={setEditReturn} />
                          <div className="flex gap-2 mt-4">
                            <button onClick={() => handleUpdate(r._id)} className="btn-primary text-xs px-3 py-1.5">Save</button>
                            <button onClick={() => setEditId(null)} className="btn-secondary text-xs px-3 py-1.5">Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-2">
                          <DateRangeDisplay pickup={r.rentalDate} returnDate={r.returnDate} dailyRate={car?.dailyRate} />
                        </div>
                      )}
                    </div>

                    {editId !== r._id && (
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => { setEditId(r._id); setEditPickup(toInputDate(r.rentalDate)); setEditReturn(toInputDate(r.returnDate)); }}
                          className="btn-secondary text-xs px-3 py-2"
                        >Edit</button>
                        <button onClick={() => handleDelete(r._id)} className="btn-danger text-xs px-3 py-2">Delete</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
