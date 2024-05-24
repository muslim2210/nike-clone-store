import Wrapper from "@/components/layout/Wrapper";
import ProductCard from "@/components/product/ProductCard";
import Heading from "@/components/section/Heading";
import Slider from "@/components/slider/Slider";
import { getCollectionDetails } from "@/lib/actions/actions";
import Image from "next/image";
import React from "react";

const CollectionsDetails = async ({
  params,
}: {
  params: { collectionId: string };
}) => {
  const collectionDetails = await getCollectionDetails(params.collectionId);

  return (
    <>
      <Slider />
      <Wrapper className="py-5 flex flex-col gap-8">
        {collectionDetails?.image && (
          <Image
            src={collectionDetails.image}
            width={1500}
            height={1000}
            alt="collection"
            className="w-full h-[200px] md:h-[400px] lg:h-[600px] object-cover mt-3 md:mt-11"
          />
        )}
        <Heading
          span={"collections"}
          title={collectionDetails.title}
          subtitle={collectionDetails.description}
        />
        <div className="text-primaryBlack flex flex-col gap-2">
          <h5 className="font-medium text-xs md:text-base">
            Collections / {collectionDetails.title}
          </h5>
          <h2 className="text-xl md:text-[34px] font-semibold leading-tight">
            {collectionDetails.title} Shoes{" "}
            {`(${collectionDetails.products.length})`}
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          {collectionDetails?.products?.map((product: ProductType) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </Wrapper>
    </>
  );
};

export const dynamic = "force-dynamic";

export default CollectionsDetails;
