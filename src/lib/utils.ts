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

/**
 * Extracts the value of the given key from a query string.
 * @param str The query string (e.g., "size=xl,stock=true").
 * @param key The key whose value needs to be extracted (e.g., "size").
 * @returns The value of the key if found, otherwise null.
 */
export const extractValue = (str: string, key: string): string | null => {
  const pairs = str.split(",");
  for (const pair of pairs) {
    const [k, v] = pair.split("=");
    if (k.trim() === key) {
      return v.trim();
    }
  }
  return null;
};
