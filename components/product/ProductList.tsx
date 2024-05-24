"use client";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import useSWR from "swr";
import Wrapper from "../layout/Wrapper";
import ProductCard from "./ProductCard";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ProductList = () => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/products`,
    fetcher
  );

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
  return (
    <Wrapper>
      <div className="mt-[80px] md:mt-[100px] mb-[100px] relative">
        <div className="text-xl md:text-2xl font-bold mb-5">
          All Featured Products
        </div>
        {!data || data.length === 0 ? (
          <p className="text-body-bold">No collections found</p>
        ) : (
          <Carousel
            responsive={responsive}
            containerClass="-mx-[10px]"
            itemClass="px-[5px] md:px-[10px] mt-5"
            infinite={true}
          >
            {data?.map((product: ProductType) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </Carousel>
        )}
      </div>
    </Wrapper>
  );
};

export default ProductList;
