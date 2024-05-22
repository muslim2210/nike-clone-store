"use client";
import React from "react";
import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const data = [
  { id: 1, name: "Home", url: "/" },
  { id: 2, name: "Products", url: "/products" },
  { id: 3, name: "Collections", subMenu: true },
  { id: 4, name: "Orders", url: "/orders" },
];

const subMenuData = [
  { id: 1, name: "Jordan", doc_count: 11 },
  { id: 2, name: "Sneakers", doc_count: 8 },
  { id: 3, name: "Running shoes", doc_count: 64 },
  { id: 4, name: "Football shoes", doc_count: 107 },
];

const MenuMobile = ({
  showCatMenu,
  setShowCatMenu,
  setMobileMenu,
  categories,
}: any) => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/collections`,
    fetcher
  );

  return (
    <ul className="flex flex-col md:hidden font-bold absolute top-[50px] left-0 w-full bg-white border-t border-b shadow-md text-black">
      <li className="py-4 px-5">
        <Link href="/" onClick={() => setMobileMenu(false)}>
          Home
        </Link>
      </li>
      <li className="py-4 px-5">
        <Link href="/products" onClick={() => setMobileMenu(false)}>
          Products
        </Link>
      </li>
      <li
        className="cursor-pointer py-4 px-5 flex flex-col relative"
        onClick={() => setShowCatMenu(!showCatMenu)}
      >
        <div className="flex justify-between items-center">
          Collections
          <BsChevronDown size={14} />
        </div>

        {showCatMenu && (
          <ul className="bg-black/[0.05] -mx-5 mt-4 -mb-4">
            {data.map((collection: any) => {
              return (
                <Link
                  key={collection._id}
                  href={`/collections/${collection._id}`}
                  onClick={() => {
                    setShowCatMenu(false);
                    setMobileMenu(false);
                  }}
                >
                  <li className="py-4 px-8 border-t flex justify-between">
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

      <li className="py-4 px-5">
        <Link href="/orders" onClick={() => setMobileMenu(false)}>
          Orders
        </Link>
      </li>
    </ul>
  );
};

export default MenuMobile;
