import { stripe } from "@/lib/utils";
import { ERROR_INTERNAL_SERVER } from "@/utils/types/error";
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      if (req.query.id) {
        return getById(req.query.id as string, res);
      } else {
        return fetchStripeProducts(res);
      }
    case "POST":
      return;
    case "PUT":
      return;
    case "DELETE":
      return;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

async function getById(id: string, res: NextApiResponse) {
  try {
    const product = await stripe.products.retrieve(id);

    const prices = await stripe.prices.list({
      product: id,
    });

    return res.status(200).json({ ...product, prices: prices.data });
  } catch (error) {
    return res.status(500).json(ERROR_INTERNAL_SERVER);
  }
}

async function fetchStripeProducts(res: NextApiResponse) {
  try {
    const products = await stripe.products.list();
    const productWithPrices: Array<Stripe.Product & { price: Stripe.Price }> =
      [];

    for (const product of products.data) {
      if (product.default_price) {
        const price = await stripe.prices.retrieve(
          product.default_price as string
        );
        productWithPrices.push({ price, ...product });
      }
    }

    return res.status(200).json(productWithPrices);
  } catch (error) {
    return res.status(500).json(ERROR_INTERNAL_SERVER);
  }
}
