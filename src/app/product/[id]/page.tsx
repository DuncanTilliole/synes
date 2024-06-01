"use client";
import ImagesProduct from "@/_components/ImagesProduct";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { extractValue } from "@/lib/utils";
import { ProductContext } from "@/utils/context/productContext";
import { useContext, useEffect, useState } from "react";
import Stripe from "stripe";

const ProductPage = (context: any) => {
  const { addProduct } = useContext(ProductContext);
  const [product, setProduct] = useState<
    (Stripe.Product & { prices: Stripe.Price[] }) | null
  >(null);
  const [selectedPriceIndex, setSelectedPriceIndex] = useState<number>(0);
  const [itCanBeSelled, setItCanBeSelled] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/product?id=${context.params.id}`);

      if (response.ok) {
        const data = await response.json();

        setProduct(data);
      }
    })();
  }, [context.params.id]);

  useEffect(() => {
    if (
      product &&
      product.prices[selectedPriceIndex].lookup_key &&
      extractValue(product.prices[selectedPriceIndex].lookup_key!, "stock") ===
        "true"
    ) {
      setItCanBeSelled(true);
    } else setItCanBeSelled(false);
  }, [selectedPriceIndex, product]);

  if (!product) {
    return <div>Loading...</div>;
  }

  function onClickAddToCart() {
    if (product) {
      const { prices, ...otherProps } = product;
      const productToSave = {
        ...otherProps,
        price: prices[selectedPriceIndex],
      };

      addProduct(productToSave);
    }
  }

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row gap-8 min-h-screen">
      <div className="w-2/6 md:min-h-screen">
        <div className="relative pb-[100%]">
          <ImagesProduct
            images={product.images}
            name={product.name}
            style={{ maxWidth: "450px", maxHeight: "700px" }}
          />
        </div>
      </div>
      <div className="w-2/6 space-y-6 md:min-h-screen">
        <Card className="flex-1 shadow-none border-none">
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {product.prices ? (
              <p className="text-xl text-gray-700">
                {(
                  product.prices[selectedPriceIndex].unit_amount! / 100
                ).toFixed(2)}
                {product.prices[selectedPriceIndex].currency.toUpperCase()}
              </p>
            ) : (
              "Le prix est inconnu"
            )}

            <p className="text-gray-500">Taxes incluses.</p>
            <div>
              <h3 className="font-semibold pb-1">Taille</h3>
              <RadioGroup
                defaultValue={selectedPriceIndex?.toString()}
                onValueChange={(value) => setSelectedPriceIndex(Number(value))}
                className="flex flex-col space-y-1"
              >
                <div className="flex flex:row space-x-4">
                  {product.prices.map((price, index) => (
                    <div
                      key={price.id}
                      className="flex flex:row space-x-2 items-center"
                    >
                      <RadioGroupItem value={index.toString()} />
                      <p>
                        {price.lookup_key
                          ? extractValue(price.lookup_key, "size")
                          : null}
                      </p>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
            {itCanBeSelled ? (
              <div className="flex items-center space-x-2">
                <span>🟢</span>
                <span>En stock</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span>🔴</span>
                <span>Rupture de stock</span>
              </div>
            )}

            <div className="flex flex-2 items-center">
              Commandes expédiées sous 1 à 2 jours
            </div>
            <Button
              className="flex flex-1 w-full"
              disabled={!itCanBeSelled}
              onClick={onClickAddToCart}
            >
              Ajouter au panier
            </Button>
            <Separator className="my-4" />
          </CardContent>
        </Card>
        <Card className="min-h-40 border-none shadow-none">
          <CardContent>
            <h2 className="text-lg font-semibold">Description :</h2>
            <p>{product.description}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductPage;
