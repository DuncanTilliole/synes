"use client";

import ImagesProduct from "@/_components/ImagesProduct";
import { Button } from "@/components/ui/button";
import { ProductContext } from "@/utils/context/productContext";
import { useContext, useEffect, useState } from "react";
import Stripe from "stripe";

const Cart = () => {
  const [products, setProducts] = useState<
    (Stripe.Product & { price: Stripe.Price })[] | null
  >([]);
  const { products: contextProducts } = useContext(ProductContext);

  useEffect(() => {
    setProducts(contextProducts);
  }, [contextProducts]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Votre panier</h2>
      <ul className="space-y-4">
        {products?.map((product) => (
          <li
            key={product.id}
            className="flex flex-col md:flex-row items-center bg-white shadow-md rounded-lg p-4"
          >
            <div className="flex flex-1 flex-col md:flex-row items-center">
              <ImagesProduct images={product.images} name={product.name} />
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-medium">{product.name}</h3>
                <p className="text-gray-500">
                  {product.price.currency.toUpperCase()}{" "}
                  {(product.price.unit_amount! / 100).toFixed(2)}
                </p>
              </div>
            </div>
            <Button
              className="mt-4 md:mt-0 md:ml-4"
              onClick={() => handleRemoveFromCart(product.id)}
            >
              Retirer
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const handleRemoveFromCart = (productId: string) => {
  // Implement the function to remove the product from the cart
  console.log(`Remove product with ID: ${productId}`);
};

export default Cart;
