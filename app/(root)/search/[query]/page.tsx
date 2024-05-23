import React from "react";
import Wrapper from "@/components/layout/Wrapper";
import ProductCard from "@/components/product/ProductCard";
import { getSearchedProducts } from "@/lib/actions/actions";

const SearchPage = async ({ params }: { params: { query: string } }) => {
  const searchedProducts = await getSearchedProducts(params.query);

  const decodedQuery = decodeURIComponent(params.query);

  return (
    <Wrapper className="my-10">
      <div className="text-primaryBlack flex flex-col gap-2">
        <h5 className="font-medium text-xs md:text-base">Products</h5>
        <h2 className="text-[20px] md:text-[34px] font-semibold leading-tight">
          Search results for {decodedQuery}
        </h2>
      </div>
      {!searchedProducts ||
        (searchedProducts.length === 0 && (
          <div className="h-[50vh]">
            <p className="text-primaryBlack text-bold text-xl my-5">
              No products found
            </p>
          </div>
        ))}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 mt-5 md:mt-10">
        {searchedProducts?.map((product: ProductType) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </Wrapper>
  );
};

export const dynamic = "force-dynamic";

export default SearchPage;
