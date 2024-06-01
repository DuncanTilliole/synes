"use server";
import Stripe from "stripe";
import { stripe } from "./utils";

export async function fetchStripeProducts(): Promise<
  Array<Stripe.Product & { price: Stripe.Price }>
> {
  const products = await stripe.products.list();
  const productWithPrices: Array<Stripe.Product & { price: Stripe.Price }> = [];

  for (const product of products.data) {
    if (product.default_price) {
      const price = await stripe.prices.retrieve(
        product.default_price as string
      );
      productWithPrices.push({ price, ...product });
    }
  }

  return productWithPrices;
}
