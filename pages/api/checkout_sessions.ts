import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { urlFor } from "../../sanity";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2022-08-01",
});

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if (req.method === "POST") {
      const items: Product[] = req.body.items;
  
      // This is the shape in which stripe expects the data to be
      const transformedItems = items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
            images: [urlFor(item.image[0]).url()],
          },
          unit_amount: item.price * 100,
        },
        quantity: 1,
      }));
    }
}
