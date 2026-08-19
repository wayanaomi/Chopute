"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { cn } from "@/lib/utils";
import { auth } from "@/lib/firebase/config";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/form-controls";
import { GoogleSignInButton } from "./google-sign-in-button";

const loginFormSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

const signupFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

async function createChoputeSession(
  idToken: string,
  referralCode?: string | null
) {
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

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Could not create your Chopute session");
  }

  return data;
}

function firebaseErrorMessage(error: unknown, fallback: string) {
  const code =
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof error.code === "string"
      ? error.code
      : "";

  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Invalid email or password";

    case "auth/email-already-in-use":
      return "An account with this email already exists";

    case "auth/invalid-email":
      return "Enter a valid email address";

    case "auth/weak-password":
      return "Password must be at least 8 characters";

    case "auth/popup-closed-by-user":
      return "Google sign-in was cancelled";

    case "auth/popup-blocked":
      return "Your browser blocked the Google sign-in popup";

    case "auth/network-request-failed":
      return "Network error. Please check your internet connection";

    default:
      return fallback;
  }
}

export function AuthCard({
  initialMode,
  referralCode,
}: {
  initialMode: "login" | "signup";
  referralCode?: string | null;
}) {
  const [mode, setMode] = useState<"login" | "signup">(initialMode);

  return (
    <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8">
      <GoogleSignInButton referralCode={referralCode} />

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs font-medium text-foreground-subtle">or</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="mb-6 grid grid-cols-2 rounded-lg bg-background p-1">
        <button
          type="button"
          onClick={() => setMode("login")}
          className={cn(
            "rounded-md py-2 text-sm font-medium transition-colors",
            mode === "login"
              ? "bg-card text-foreground shadow-sm"
              : "text-foreground-muted"
          )}
        >
          Sign in
        </button>

        <button
          type="button"
          onClick={() => setMode("signup")}
          className={cn(
            "rounded-md py-2 text-sm font-medium transition-colors",
            mode === "signup"
              ? "bg-card text-foreground shadow-sm"
              : "text-foreground-muted"
          )}
        >
          Sign up
        </button>
      </div>

      {mode === "login" ? (
        <LoginForm />
      ) : (
        <SignupForm referralCode={referralCode} />
      )}
    </div>
  );
}

function LoginForm() {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    setFormError(null);

    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        values.email.trim().toLowerCase(),
        values.password
      );

      const idToken = await credential.user.getIdToken();

      await createChoputeSession(idToken);

      router.push("/app");
      router.refresh();
    } catch (error) {
      console.error("Firebase login error:", error);

      setFormError(
        firebaseErrorMessage(error, "Invalid email or password")
      );
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>

        <Input
          id="email"
          type="email"
          autoComplete="email"
          {...register("email")}
        />

        {errors.email && (
          <p className="mt-1 text-xs text-danger">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="password">Password</Label>

        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          {...register("password")}
        />

        {errors.password && (
          <p className="mt-1 text-xs text-danger">
            {errors.password.message}
          </p>
        )}
      </div>

      {formError && (
        <p className="text-sm text-danger">{formError}</p>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full"
        loading={isSubmitting}
      >
        Sign in
      </Button>
    </form>
  );
}

function SignupForm({
  referralCode,
}: {
  referralCode?: string | null;
}) {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
  });

  async function onSubmit(values: z.infer<typeof signupFormSchema>) {
    setFormError(null);

    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        values.email.trim().toLowerCase(),
        values.password
      );

      await updateProfile(credential.user, {
        displayName: values.name.trim(),
      });

      const idToken = await credential.user.getIdToken();

      await createChoputeSession(idToken, referralCode);

      router.push("/app");
      router.refresh();
    } catch (error) {
      console.error("Firebase signup error:", error);

      setFormError(
        firebaseErrorMessage(error, "Could not create your account")
      );
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>

        <Input
          id="name"
          autoComplete="name"
          {...register("name")}
        />

        {errors.name && (
          <p className="mt-1 text-xs text-danger">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="signup-email">Email</Label>

        <Input
          id="signup-email"
          type="email"
          autoComplete="email"
          {...register("email")}
        />

        {errors.email && (
          <p className="mt-1 text-xs text-danger">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="signup-password">Password</Label>

        <Input
          id="signup-password"
          type="password"
          autoComplete="new-password"
          {...register("password")}
        />

        {errors.password && (
          <p className="mt-1 text-xs text-danger">
            {errors.password.message}
          </p>
        )}
      </div>

      {formError && (
        <p className="text-sm text-danger">{formError}</p>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full"
        loading={isSubmitting}
      >
        Create account
      </Button>
    </form>
  );
}