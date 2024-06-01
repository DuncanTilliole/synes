"use client";
import { PropsWithChildren, createContext, useEffect, useState } from "react";
import Stripe from "stripe";

interface ProductContext {
  products: (Stripe.Product & { price: Stripe.Price })[] | null;
  addProduct: (product: Stripe.Product & { price: Stripe.Price }) => void;
  initializeContext: () => void;
}

type ProductStorage = {
  productId: string;
  priceId: string;
};

const ProductContext = createContext<ProductContext>({
  products: null,
  addProduct: () => {},
  initializeContext: () => {},
});

function ProductProvider(props: PropsWithChildren) {
  const [products, setProducts] = useState<
    (Stripe.Product & { price: Stripe.Price })[]
  >([]);

  useEffect(() => {
    initializeContext();
  }, []);

  const initializeContext = async () => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      const cartParsed: Array<ProductStorage> = JSON.parse(cart);
      await fetchProducts(cartParsed);
    }
  };

  const fetchProducts = async (cartParsed: Array<ProductStorage>) => {
    const productsDetailed: (Stripe.Product & { price: Stripe.Price })[] = [];

    await Promise.all(
      cartParsed.map(async (p) => {
        try {
          const response = await fetch(`/api/product?id=${p.productId}`);

          if (response.ok) {
            const data: Stripe.Product & { prices: Stripe.Price[] } =
              await response.json();

            const { prices, ...otherProps } = data;

            productsDetailed.push({
              ...otherProps,
              price: prices.find((price) => price.id === p.priceId)!,
            });
          }
        } catch (error) {
          console.error(error);
        }
      })
    );

    setProducts(productsDetailed);
  };

  const addProduct = (product: Stripe.Product & { price: Stripe.Price }) => {
    const cart = localStorage.getItem("cart");

    if (cart) {
      const cartParsed: Array<ProductStorage> = JSON.parse(cart);
      cartParsed.push({ productId: product.id, priceId: product.price.id });

      localStorage.setItem("cart", JSON.stringify(cartParsed));
    } else {
      localStorage.setItem(
        "cart",
        JSON.stringify([{ productId: product.id, priceId: product.price.id }])
      );
    }

    setProducts((prevProducts) => [...prevProducts, product]);
  };

  return (
    <ProductContext.Provider
      value={{ products, addProduct, initializeContext }}
    >
      {props.children}
    </ProductContext.Provider>
  );
}

export { ProductContext, ProductProvider };
