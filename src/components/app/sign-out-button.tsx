"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  async function handleSignOut() {
    try {
      await signOut(auth);

      // Clear the Chopute server session.
      await fetch("/api/auth/firebase/session", {
        method: "DELETE",
      });

      window.location.href = "/";
    } catch (error) {
      console.error("[Firebase Auth] Sign-out failed:", error);
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleSignOut}
    >
      Sign out
    </Button>
  );
}