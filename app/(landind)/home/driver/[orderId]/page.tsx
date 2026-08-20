"use client";

import Link from "next/link";

export default function DriverPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-2xl border border-border bg-card p-10 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <span className="text-3xl">🚚</span>
          </div>

          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Delivery Tracking
          </p>

          <h1 className="mt-2 text-3xl font-bold text-foreground">
            Track Your Driver
          </h1>

          <p className="mx-auto mt-3 max-w-lg text-foreground/60">
            Your driver tracking page will appear here once a driver
            has been assigned to your order.
          </p>

          <Link
            href="/home"
            className="mt-6 inline-flex rounded-lg bg-primary px-6 py-3 font-semibold text-white transition hover:opacity-90"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}