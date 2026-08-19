"use client";

import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import {
  auth,
  authPersistenceReady,
} from "@/lib/firebase/config";
import { Button } from "@/components/ui/button";

export function GoogleSignInButton({
  referralCode,
}: {
  referralCode?: string | null;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      console.log("[Google Auth] Step 1: Starting popup");

      const provider = new GoogleAuthProvider();

      provider.setCustomParameters({
        prompt: "select_account",
      });

      await authPersistenceReady;

      const credential = await signInWithPopup(auth, provider);

      console.log("[Google Auth] Step 2: Firebase popup succeeded");
      console.log("[Google Auth] Firebase UID:", credential.user.uid);
      console.log("[Google Auth] Firebase email:", credential.user.email);

      const idToken = await credential.user.getIdToken();

      console.log("[Google Auth] Step 3: Firebase ID token obtained");

      const response = await fetch("/api/auth/firebase/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken,
          referralCode: referralCode || undefined,
        }),
      });

      console.log(
        "[Google Auth] Step 4: Session API responded:",
        response.status
      );

      const data = await response.json();

      console.log("[Google Auth] Session API response:", data);

      if (!response.ok) {
        throw new Error(
          data.error || "Could not create your Chopute session"
        );
      }

      console.log("[Google Auth] Step 5: Session created successfully");

      window.location.href = "/app";
    } catch (error) {
      console.error("[Google Auth] FAILED:", error);

      const code =
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        typeof error.code === "string"
          ? error.code
          : "";

      if (code === "auth/popup-closed-by-user") {
        setError("Google sign-in was cancelled");
      } else if (code === "auth/popup-blocked") {
        setError("Your browser blocked the Google sign-in popup");
      } else if (code === "auth/unauthorized-domain") {
        setError("This domain is not authorized in Firebase.");
      } else {
        setError("Could not sign in with Google. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <Button
        type="button"
        variant="secondary"
        size="lg"
        className="w-full"
        onClick={handleClick}
        loading={loading}
      >
        <FcGoogle className="h-5 w-5" />
        Continue with Google
      </Button>

      {error && (
        <p className="text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}