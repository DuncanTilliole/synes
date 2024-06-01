"use client";
import ProductCard from "@/_components/ProductCard";
import { useEffect, useState } from "react";
import Stripe from "stripe";

export default function ListProducts() {
  const [products, setProducts] = useState<
    Array<Stripe.Product & { price: Stripe.Price }>
  >([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/product`);

      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    })();
  }, []);

  return (
    <div className="p-5 flex flex-col lg:flex-row lg:space-x-5 space-y-5 lg:space-y-0 justify-evenly">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
