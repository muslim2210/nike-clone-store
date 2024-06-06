"use client";
import Wrapper from "@/components/layout/Wrapper";
import ProductCard from "@/components/product/ProductCard";
import { getProducts } from "@/lib/actions/actions";
import React from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ProductsPage = () => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/products`,
    fetcher
  );
  return (
    <Wrapper className="my-10">
      <div className="text-primaryBlack flex flex-col gap-2">
        <h5 className="font-medium text-xs md:text-base">Products</h5>
        <h2 className="text-xl md:text-[34px] font-semibold leading-tight">
          All Products {`(${data?.length})`}
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 mt-5 md:mt-10">
        {data?.map((product: ProductType) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </Wrapper>
  );
};

export const dynamic = "force-dynamic";

export default ProductsPage;
