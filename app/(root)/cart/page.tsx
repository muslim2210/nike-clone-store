"use client";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Wrapper from "@/components/layout/Wrapper";
import useCart from "@/lib/hooks/useCart";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { MinusCircle, PlusCircle, Trash } from "lucide-react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FormatRupiah } from "@arismun/format-rupiah";
import CartItem from "@/components/cart/CartItem";

const Cart = () => {
  const router = useRouter();
  const { user } = useUser();
  const cart = useCart();

  const total = cart.cartItems.reduce(
    (acc, cartItem) => acc + cartItem.item.price * cartItem.quantity,
    0
  );
  const totalRounded = parseFloat(total.toFixed(2));

  const customer = {
    clerkId: user?.id,
    email: user?.emailAddresses[0].emailAddress,
    name: user?.fullName,
  };

  const handleCheckout = async () => {
    try {
      if (!user) {
        router.push("sign-in");
      } else {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
          method: "POST",
          body: JSON.stringify({ cartItems: cart.cartItems, customer }),
        });
        const data = await res.json();
        window.location.href = data.url;
        console.log(data);
      }
    } catch (err) {
      console.log("[checkout_POST]", err);
    }
  };

  return (
    <div className="w-full md:py-20">
      <Wrapper>
        {/* HEADING AND PARAGRAPH START */}
        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            Shopping Cart
          </div>
        </div>
        {/* HEADING AND PARAGRAPH END */}

        {/* CART CONTENT START */}
        <div className="flex flex-col lg:flex-row gap-12 py-10">
          {/* CART ITEMS START */}
          <div className="flex-[2]">
            <div className="text-lg font-bold">Cart Items</div>
            {cart.cartItems.length === 0 ? (
              <div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
                <Image
                  src="/empty-cart.jpg"
                  width={300}
                  height={300}
                  alt="Empty cart"
                  className="w-[300px] md:w-[400px]"
                />
                <span className="text-xl font-bold">Your cart is empty</span>
                <span className="text-center mt-4">
                  Looks like you have not added anything in your cart.
                  <br />
                  Go ahead and explore top categories.
                </span>
                <Link
                  href="/"
                  className="py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <>
                {cart.cartItems.map((cartItem, index) => (
                  <CartItem key={index} cartItem={cartItem} />
                ))}
              </>
            )}
          </div>
          {/* CART ITEMS END */}

          {/* SUMMARY START */}
          <div className="flex-[1]">
            <div className="text-lg font-bold">
              Summary{" "}
              <span>{`(${cart.cartItems.length} ${
                cart.cartItems.length > 1 ? "items" : "item"
              })`}</span>
            </div>

            <div className="p-5 my-5 bg-black/[0.05] rounded-xl">
              <div className="flex justify-between">
                <div className="uppercase text-md md:text-lg font-medium text-black">
                  Subtotal
                </div>
                <div className="text-md md:text-lg font-medium text-black">
                  <FormatRupiah value={totalRounded} />
                </div>
              </div>
              <div className="text-sm md:text-md py-5 border-t mt-5">
                The subtotal reflects the total price of your order, including
                duties and taxes, before any applicable discounts. It does not
                include delivery costs and international transaction fees.
              </div>
            </div>

            {/* BUTTON START */}
            <button
              className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center gap-2 justify-center"
              onClick={handleCheckout}
            >
              Checkout
            </button>
            {/* BUTTON END */}
          </div>
          {/* SUMMARY END */}
        </div>
        {/* CART CONTENT END */}
      </Wrapper>
    </div>
  );
};

export default Cart;
