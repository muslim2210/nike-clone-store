import Image from "next/image";
import React from "react";
import { FormatRupiah } from "@arismun/format-rupiah";
import { RiDeleteBin6Line } from "react-icons/ri";
import useCart from "@/lib/hooks/useCart";

const CartItem = ({ cartItem }: any) => {
  const cart = useCart();

  return (
    <div className="flex py-5 gap-4 md:gap-5 border-b">
      {/* IMAGE START */}
      <div className="shrink-0 aspect-square w-[100px] md:w-[120px]">
        <Image
          src={cartItem.item.media[0]}
          alt=""
          width={120}
          height={120}
          priority
        />
      </div>
      {/* IMAGE END */}

      <div className="w-full flex flex-col">
        <div className="flex flex-col md:flex-row justify-between">
          {/* PRODUCT TITLE */}
          <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
            {cartItem.item.title}
          </div>

          {/* PRODUCT SUBTITLE */}
          <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
            {cartItem.item.category}
          </div>

          {/* PRODUCT PRICE */}
          <div className="text-md md:text-lg font-bold text-black/[0.5] mt-2">
            <FormatRupiah value={cartItem.item.price} />
          </div>
        </div>
        {/* PRODUCT SUBTITLE */}
        <div className="text-md font-medium text-black/[0.5] hidden md:block">
          {cartItem.item.category}
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">
            <div className="flex items-center gap-1">
              <div className="font-semibold">Size:</div>
              {cartItem.size && (
                <p className="text-small-medium">{cartItem.size}</p>
              )}
            </div>

            <div className="flex items-center gap-1">
              <div className="font-semibold">Color:</div>
              {cartItem.color && (
                <p className="text-small-medium capitalize font-semibold">
                  {cartItem.color}
                </p>
              )}
            </div>
          </div>
          <button onClick={() => cart.removeItem(cartItem.item._id)}>
            <RiDeleteBin6Line
              size={25}
              className="cursor-pointer text-black/[0.5] hover:text-black text-[18px] md:text-[22px]"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
