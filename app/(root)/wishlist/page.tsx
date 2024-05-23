"use client";
import Loader from "@/components/custom ui/Loader";
import Wrapper from "@/components/layout/Wrapper";
import ProductCard from "@/components/product/ProductCard";
import { getProductDetails } from "@/lib/actions/actions";
import { useUser } from "@clerk/nextjs";
import { use, useEffect, useState } from "react";

const Wishlist = () => {
  const { user } = useUser();

  const [loading, setLoading] = useState(true);
  const [signedInUser, setSignedInUser] = useState<UserType | null>(null);
  const [wishlist, setWishlist] = useState<ProductType[]>([]);

  const getUser = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setSignedInUser(data);
      setLoading(false);
    } catch (err) {
      console.log("[users_GET", err);
    }
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  const getWishlistProducts = async () => {
    setLoading(true);

    if (!signedInUser) return;

    const wishlistProducts = await Promise.all(
      signedInUser.wishlist.map(async (productId) => {
        const res = await getProductDetails(productId);
        return res;
      })
    );

    setWishlist(wishlistProducts);
    setLoading(false);
  };

  useEffect(() => {
    if (signedInUser) {
      getWishlistProducts();
    }
  }, [signedInUser]);

  const updateSignedInUser = (updatedUser: UserType) => {
    setSignedInUser(updatedUser);
  };

  return (
    <div className="w-full md:py-20 relative">
      <Wrapper>
        <div className="max-w-[800px] mt-8 md:mt-0">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            Fovourite {`(${wishlist?.length})`}
          </div>
        </div>
        {wishlist.length === 0 && <p>No items in your wishlist</p>}

        {/* products grid start */}
        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-14 md:px-0">
            {wishlist?.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                updateSignedInUser={updateSignedInUser}
              />
            ))}
          </div>
        )}
        {/* products grid end */}

        {/* PAGINATION BUTTONS START */}
        {/* {data?.meta?.pagination?.total > maxResult && (
          <div className="flex gap-3 items-center justify-center my-16 md:my-0">
            <button
              className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
              disabled={pageIndex === 1}
              onClick={() => setPageIndex(pageIndex - 1)}
            >
              Previous
            </button>

            <span className="font-bold">{`${pageIndex} of ${
              data && data.meta.pagination.pageCount
            }`}</span>

            <button
              className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
              disabled={pageIndex === (data && data.meta.pagination.pageCount)}
              onClick={() => setPageIndex(pageIndex + 1)}
            >
              Next
            </button>
          </div>
        )} */}
        {/* PAGINATION BUTTONS END */}
        {/* {isLoading && (
          <div className="absolute top-0 left-0 w-full h-full bg-white/[0.5] flex flex-col gap-5 justify-center items-center">
            <img src="/logo.svg" width={150} />
            <span className="text-2xl font-medium">Loading...</span>
          </div>
        )} */}
      </Wrapper>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default Wishlist;
