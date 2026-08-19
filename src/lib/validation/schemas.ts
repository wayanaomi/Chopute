import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const signupSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128),
  referralCode: z.string().trim().max(32).optional().nullable(),
});

export const searchSchema = z.object({
  businessType: z
    .string()
    .trim()
    .min(2, "Enter a business type, e.g. dental clinic")
    .max(120),
  location: z
    .string()
    .trim()
    .min(2, "Enter a location, e.g. Lagos, Nigeria")
    .max(160),
  idempotencyKey: z.string().trim().min(1).max(100),
});

export const leadStatusSchema = z.object({
  status: z.enum(["NEW", "CONTACTED", "INTERESTED", "CLOSED"]),
});

export const leadFilterSchema = z.object({
  hasPhone: z.coerce.boolean().optional(),
  hasWebsite: z.coerce.boolean().optional(),
  minRating: z.coerce.number().min(0).max(5).optional(),
  status: z.enum(["ALL", "NEW", "CONTACTED", "INTERESTED", "CLOSED"]).optional(),
});
