import Wrapper from "@/components/layout/Wrapper";
import Gallery from "@/components/product/Gallery";
import ProductInfo from "@/components/product/ProductInfo";
import { getProductDetails, getRelatedProducts } from "@/lib/actions/actions";
import { IoMdHeartEmpty } from "react-icons/io";

const ProductDetails = async ({
  params,
}: {
  params: { productId: string };
}) => {
  const productDetails = await getProductDetails(params.productId);

  return (
    <div className="w-full md:py-20">
      <Wrapper>
        <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
          {/* left column start */}
          <div className="w-full md:w-auto flex-[1.5] max-w-[500px] md:max-w-[700px] lg:max-w-full mx-auto lg:mx-0">
            <Gallery productMedia={productDetails.media} />
          </div>
          {/* left column end */}

          {/* right column start */}
          <div className="flex-[1] py-3">
            <ProductInfo productInfo={productDetails} />
          </div>
          {/* right column end */}
        </div>
      </Wrapper>
    </div>
  );
};

export default ProductDetails;
