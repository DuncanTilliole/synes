import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  images: Array<string>;
  name: string;
  style?: object;
};

export default function ImagesProduct({ images, name, style }: Props) {
  const [loading, setLoading] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (loading && images[2]) {
      timer = setTimeout(() => {
        setLoading(false);
        setImageIndex(2);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [loading, images]);

  return (
    <Image
      src={images[imageIndex]}
      alt={name}
      className="w-full h-auto object-cover"
      onMouseEnter={() => {
        if (images[1]) {
          setLoading(true);
          setImageIndex(1);
        }
      }}
      onMouseLeave={() => {
        setLoading(false);
        setImageIndex(0);
      }}
      width={500}
      height={500}
      style={{ maxHeight: "625px", maxWidth: "400px", ...style }}
    />
  );
}
