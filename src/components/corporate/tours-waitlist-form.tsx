"use client";

import { useState } from "react";

export function ToursWaitlistForm() {
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);

  async function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");
    setPending(true);

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/tours/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });

      const result = await response.json();

      if (!response.ok) {
        setStatus(result.error || "We couldn't submit your registration. Please try again.");
        return;
      }

      setStatus("You're on the waitlist. We'll be in touch!");
      form.reset();
    } catch {
      setStatus("Something went wrong. Please check your connection and try again.");
    } finally {
      setPending(false);
    }
  }

  const fieldClass =
    "mt-2 w-full rounded-xl border border-[#dedede] bg-white px-4 py-3 text-[#212121] outline-none transition focus:border-[#ff6b00] focus:ring-2 focus:ring-[#ff6b00]/15";

  return (
    <form onSubmit={submitForm} className="space-y-5">
      <div>
        <label htmlFor="tour-fullName" className="text-sm font-semibold">Full name</label>
        <input id="tour-fullName" name="fullName" autoComplete="name" required maxLength={120} className={fieldClass} placeholder="Your full name" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="tour-email" className="text-sm font-semibold">Email address</label>
          <input id="tour-email" name="email" type="email" autoComplete="email" required maxLength={254} className={fieldClass} placeholder="you@example.com" />
        </div>
        <div>
          <label htmlFor="tour-phone" className="text-sm font-semibold">Phone number</label>
          <input id="tour-phone" name="phone" type="tel" autoComplete="tel" required maxLength={30} className={fieldClass} placeholder="+234..." />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="tour-city" className="text-sm font-semibold">City</label>
          <input id="tour-city" name="city" autoComplete="address-level2" required maxLength={100} className={fieldClass} placeholder="Your city" />
        </div>
        <div>
          <label htmlFor="tour-occupation" className="text-sm font-semibold">Occupation</label>
          <select id="tour-occupation" name="occupation" required className={fieldClass} defaultValue="">
            <option value="" disabled>Select your occupation</option>
            <option>Student</option>
            <option>Graduate</option>
            <option>Working professional</option>
            <option>Founder / Entrepreneur</option>
            <option>Educator</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#ff6b00] px-6 py-3 font-semibold text-white transition hover:bg-[#e85f00] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Joining the waitlist..." : "Join the waitlist"}
        {!pending && <span className="ml-2" aria-hidden="true">↗</span>}
      </button>

      <p aria-live="polite" role="status" className="text-sm leading-6 text-[#5c5c5c]">
        {status}
      </p>
      <p className="text-xs leading-5 text-[#777777]">
        By submitting, you agree to be contacted about Boss Campus Tour updates.
      </p>
    </form>
  );
}
