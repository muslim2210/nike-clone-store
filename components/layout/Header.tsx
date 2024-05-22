"use client";
import React, { useEffect, useState } from "react";
import Wrapper from "./Wrapper";
import Link from "next/link";

import { IoMdHeartEmpty } from "react-icons/io";
import { BsCart } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import Image from "next/image";
import MenuMobile from "../section/MenuMobile";
import { UserButton, useUser } from "@clerk/nextjs";
import MenuLink from "../section/Menu";
import { CircleUserRound, Menu } from "lucide-react";
import useCart from "@/lib/hooks/useCart";
const Header = () => {
  const { user } = useUser();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [show, setShow] = useState("translate-y-0");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [categories, setCategories] = useState(null);

  const [dropDownMenu, setDropDownMenu] = useState(false);

  const cart = useCart();

  const controlNavbar = () => {
    if (window.scrollY > 500) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("-translate-y-[80px]");
      } else {
        setShow("shadow-sm");
      }
    } else {
      setShow("translate-y-0");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`w-full h-[50px] md:h-[80px] bg-white flex items-center justify-between z-20 shadow-sm sticky top-0 transition-transform duration-300 ${show}`}
    >
      <Wrapper className="h-[60px] flex justify-between items-center">
        <div className="flex-1">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="logo"
              width={100}
              height={100}
              priority
              className="w-[40px] md:w-[60px]"
            />
          </Link>
        </div>
        <div className="flex-1 hidden md:flex justify-center">
          <MenuLink
            showCatMenu={showCatMenu}
            setShowCatMenu={setShowCatMenu}
            categories={categories}
          />
        </div>

        <div className="flex-1 flex justify-end items-center">
          {mobileMenu && (
            <MenuMobile
              showCatMenu={showCatMenu}
              setShowCatMenu={setShowCatMenu}
              setMobileMenu={setMobileMenu}
              categories={categories}
            />
          )}
          <div className="flex items-center gap-2 text-black relative">
            {/* Icon start */}
            <Link href="/wishlist">
              <div className="w-8 md:w-10 h-8 md:h-10 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative mr-[-12px]">
                <IoMdHeartEmpty className="text-[23px]" />
              </div>
            </Link>
            {/* Icon end */}

            {/* Icon start */}
            <Link href="/cart">
              <div className="w-8 md:w-10 h-8 md:h-10 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
                <BsCart className="text-[20px] mr-1" />
                <div className="h-[18px] md:h-[22px] min-w-[18px] md:min-w-[22px] rounded-full bg-red-600 absolute top-0 left-4 md:left-6 text-white text-[12px] md:text-[14px] flex justify-center items-center px-[2px] md:px-[5px]">
                  {cart.cartItems.length}
                </div>
              </div>
            </Link>
            {/* Icon end */}

            {user ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <Link href="/sign-in">
                <CircleUserRound size={35} />
              </Link>
            )}

            {/* Mobile icon start */}
            <div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex md:hidden justify-center items-center hover:bg-black/[0.05] cursor-pointer relative -mr-2">
              {mobileMenu ? (
                <VscChromeClose
                  className="text-[16px]"
                  onClick={() => setMobileMenu(false)}
                />
              ) : (
                <BiMenuAltRight
                  className="text-[20px]"
                  onClick={() => setMobileMenu(true)}
                />
              )}
            </div>
            {/* Mobile icon end */}
          </div>
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
