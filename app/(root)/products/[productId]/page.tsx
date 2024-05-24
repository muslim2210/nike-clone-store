import Wrapper from "@/components/layout/Wrapper";
import Gallery from "@/components/product/Gallery";
import ProductCard from "@/components/product/ProductCard";
import ProductInfo from "@/components/product/ProductInfo";
import RelatedProducts from "@/components/product/RelatedProducts";
import { getProductDetails, getRelatedProducts } from "@/lib/actions/actions";
import "react-multi-carousel/lib/styles.css";

const ProductDetails = async ({
  params,
}: {
  params: { productId: string };
}) => {
  const productDetails = await getProductDetails(params.productId);
  const relatedProducts = await getRelatedProducts(params.productId);

  return (
    <div className="w-full md:py-20">
      <Wrapper>
        <div className="flex flex-col lg:flex-row md:px-10 gap-2 lg:gap-[100px]">
          {/* left column start */}
          <div className="w-full md:w-auto flex-[1.5] mt-10 md:mt-0 max-w-[400px] md:max-w-[700px] lg:max-w-full mx-auto lg:mx-0">
            <Gallery productMedia={productDetails.media} />
          </div>
          {/* left column end */}

          {/* right column start */}
          <div className="flex-[1] mt-[-260px] md:mt-12 lg:mt-0 py-3">
            <ProductInfo productInfo={productDetails} />
          </div>
          {/* right column end */}
        </div>
        <RelatedProducts relatedProducts={relatedProducts} />
      </Wrapper>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default ProductDetails;
