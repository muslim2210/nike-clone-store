"use client";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "./ProductCard";

const RelatedProducts = ({
  relatedProducts,
}: {
  relatedProducts: ProductType[];
}) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1023, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 2,
    },
  };

  return (
    <div className="mt-[70px] md:mt-[150px] mb-[100px] md:mb-0">
      <div className="text-2xl md:text-3xl font-bold mb-5">
        You Might Also Like
      </div>
      <Carousel
        responsive={responsive}
        containerClass="-mx-[10px]"
        itemClass="px-[5px] md:px-[10px]"
      >
        {relatedProducts?.map((product: ProductType) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </Carousel>
    </div>
  );
};

export default RelatedProducts;
