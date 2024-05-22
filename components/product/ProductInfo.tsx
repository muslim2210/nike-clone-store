"use client";
import React, { useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { FormatRupiah } from "@arismun/format-rupiah";
import HeartWishlist from "./HeartWishlist";

import useCart from "@/lib/hooks/useCart";
import { MinusCircle, PlusCircle } from "lucide-react";

interface ProductCardProps {
  productInfo: ProductType;
  updateSignedInUser?: (updatedUser: UserType) => void;
}

const ProductInfo = ({ productInfo, updateSignedInUser }: ProductCardProps) => {
  const [selectedColor, setSelectedColor] = useState<string>(
    productInfo.colors[0]
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    productInfo.sizes[0]
  );

  const [quantity, setQuantity] = useState<number>(1);

  const cart = useCart();

  return (
    <>
      {/* PRODUCT TITLE */}
      <div className="text-[34px] font-semibold mb-2 leading-tight">
        {productInfo.title}
      </div>

      {/* PRODUCT SUBTITLE */}
      <div className="text-lg font-semibold mb-5">{productInfo.category}</div>

      {/* PRODUCT PRICE */}
      <div className="flex items-center  justify-between">
        <p className="mr-2 text-lg md:text-2xl font-semibold">
          <FormatRupiah value={productInfo.price} />
        </p>

        {/* <HeartWishlist
          product={productInfo}
          updateSignedInUser={updateSignedInUser}
        /> */}
      </div>

      <div className="text-md font-medium text-black/[0.5]">incl. of taxes</div>
      <div className="text-md font-medium text-black/[0.5] mb-5">
        {`(Also includes all applicable duties)`}
      </div>

      {productInfo.colors.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-base-medium text-black/[0.5]">Colors:</p>
          <div className="flex flex-wrap gap-3">
            {productInfo.colors.map((color, index) => (
              <p
                key={index}
                className={`border border-black px-4 py-3 cursor-pointer rounded-md ${
                  selectedColor === color && "bg-black text-white"
                }`}
                onClick={() => setSelectedColor(color)}
              >
                {color}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* PRODUCT SIZE RANGE START */}
      <div className="mb-10 mt-10">
        {/* HEADING START */}
        <div className="flex justify-between mb-2">
          <div className="text-md font-semibold">Select Size</div>
          <div className="text-md font-medium text-black/[0.5] cursor-pointer">
            Select Guide
          </div>
        </div>
        {/* HEADING END */}

        {/* SIZE START */}
        {productInfo.sizes.length > 0 && (
          <div id="sizesGrid" className="grid grid-cols-3 gap-2">
            {productInfo.sizes.map((size, index) => (
              <div
                key={index}
                className={`border rounded-md text-center font-medium py-3 cursor-pointer ${
                  selectedSize === size && "bg-black text-white"
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </div>
            ))}
          </div>
        )}
        {/* SIZE END */}

        {/* SHOW ERROR START */}

        {/* <div className="text-red-600 mt-1">Size selection is required</div> */}

        {/* SHOW ERROR END */}
      </div>
      {/* PRODUCT SIZE RANGE END */}

      {/* ADD TO CART BUTTON START */}
      <button
        className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
        onClick={() => {
          cart.addItem({
            item: productInfo,
            quantity,
            color: selectedColor,
            size: selectedSize,
          });
        }}
      >
        Add to Cart
      </button>
      {/* ADD TO CART BUTTON END */}

      {/* WHISHLIST BUTTON START */}
      <div className="w-full py-4 rounded-full border hover:border-black text-lg font-medium transition-transform flex items-center justify-center gap-2 mb-10">
        Favourite
        <HeartWishlist
          product={productInfo}
          updateSignedInUser={updateSignedInUser}
        />
      </div>
      {/* WHISHLIST BUTTON END */}

      <div>
        <div className="text-lg font-bold mb-5">Product Details</div>
        <div className="markdown text-md mb-5">{productInfo.description}</div>
      </div>
    </>
  );
};

export default ProductInfo;
