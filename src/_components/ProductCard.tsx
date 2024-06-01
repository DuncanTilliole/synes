import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Stripe } from "stripe";
import ImagesProduct from "./ImagesProduct";

type Props = {
  product: Stripe.Product & { price: Stripe.Price };
};

function ProductCard({ product }: Props) {
  const [hovered, setHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const originalPrice = product.metadata?.original_price
    ? parseInt(product.metadata.original_price, 10)
    : null;
  const currentPrice = product.price.unit_amount! / 100;
  const discount = originalPrice
    ? ((originalPrice - currentPrice) / originalPrice) * 100
    : null;

  return (
    <Card className="flex-1 max-w-sm border-none rounded-lg shadow-none">
      <CardHeader className="p-0">
        <a href={`/product/${product.id}`} className="block relative">
          {discount && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full z-10">
              -{discount.toFixed(0)}%
            </div>
          )}
          <ImagesProduct images={product.images} name={product.name} />
        </a>
      </CardHeader>
      <CardContent className="text-center mt-2">
        <CardTitle className="text-lg font-semibold">{product.name}</CardTitle>
        <p className="text-gray-700 mt-1">
          {currentPrice.toFixed(2)}
          {product.price.currency.toUpperCase()}
        </p>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
