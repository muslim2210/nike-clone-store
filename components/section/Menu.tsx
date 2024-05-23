"use client";
import React from "react";
import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";
import useSWR from "swr";
import { useUser } from "@clerk/nextjs";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const MenuLink = ({ showCatMenu, setShowCatMenu, categories }: any) => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/collections`,
    fetcher
  );

  const { user } = useUser();

  return (
    <ul className="hidden md:flex items-center gap-5 font-medium text-black text-base">
      <li className="cursor-pointer">
        <Link href="/">Home</Link>
      </li>
      <li className="cursor-pointer">
        <Link href="/products">Products</Link>
      </li>
      <li
        className="cursor-pointer flex items-center gap-2 relative"
        onMouseEnter={() => setShowCatMenu(true)}
        onMouseLeave={() => setShowCatMenu(false)}
      >
        Collections
        <BsChevronDown size={14} />
        {showCatMenu && (
          <ul className="bg-white absolute top-6 left-0 min-w-[250px] px-1 py-1 text-black shadow-lg">
            {data?.map((collection: any) => {
              return (
                <Link
                  key={collection._id}
                  href={`/collections/${collection._id}`}
                  onClick={() => setShowCatMenu(false)}
                >
                  <li className="h-12 flex justify-between items-center px-3 hover:bg-black/[0.03] rounded-md">
                    {collection.title}
                    <span className="opacity-50 text-sm">
                      {`(${collection?.products?.length})`}
                    </span>
                  </li>
                </Link>
              );
            })}
          </ul>
        )}
      </li>

      <li className="cursor-pointer">
        <Link href={user ? "/orders" : "/sign-in"}>Orders</Link>
      </li>
    </ul>
  );
};

export default MenuLink;
