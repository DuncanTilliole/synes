import { clsx, type ClassValue } from "clsx";
import Stripe from "stripe";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2024-04-10",
  typescript: true,
});
