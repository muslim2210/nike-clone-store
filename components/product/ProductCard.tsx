import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FormatRupiah } from "@arismun/format-rupiah";

const ProductCard = ({ product }: { product: ProductType }) => {
  return (
    <div className="transform overflow-hidden bg-white duration-200 hover:scale-105 flex flex-col gap-1">
      <Link href={`/product/${product._id}`}>
        <Image
          width={500}
          height={500}
          src={product.media[0]}
          alt=""
          priority
        />
      </Link>
      <div className="py-4 px-2 flex flex-col gap-2">
        <h2 className="text-lg font-medium text-primaryBlack">
          {product.title}
        </h2>
        <span className="text-sm text-slate-500">{product.category}</span>
        <div className="flex items-center justify-between">
          <p className="mr-2 text-lg font-semibold">
            <FormatRupiah value={product.price} />
          </p>
          <button>
            <Heart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
