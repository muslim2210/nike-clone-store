"use client";
import Image from "next/image";
import React from "react";
import useSWR from "swr";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Wrapper from "../layout/Wrapper";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Collections = () => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/collections`,
    fetcher
  );

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const ButtonGroup = ({ next, previous, goToSlide, ...rest }: any) => {
    const {
      carouselState: { currentSlide },
    } = rest;
    return (
      <div
        className="carousel-button-group mb-4 gap-2 flex justify-end 
        items-center w-full absolute top-0 right-0"
      >
        <button
          className="block p-3 bg-slate-300 rounded-full"
          onClick={() => previous()}
        >
          <FiChevronLeft size={20} />
        </button>
        <button
          onClick={() => next()}
          className="block p-3 bg-slate-300 rounded-full"
        >
          <FiChevronRight size={20} />
        </button>
      </div>
    );
  };

  return (
    <Wrapper>
      <div className="mt-[50px] md:mt-[100px] mb-[100px] relative">
        <div className="text-3xl font-bold mb-5">Shop By Collections</div>
        {!data || data.length === 0 ? (
          <p className="text-body-bold">No collections found</p>
        ) : (
          <Carousel
            responsive={responsive}
            containerClass="-mx-[10px]"
            itemClass="px-[10px] mt-5"
            arrows={false}
            renderButtonGroupOutside={true}
            customButtonGroup={<ButtonGroup />}
            infinite={true}
          >
            {data.map((collection: CollectionType) => (
              <div key={collection._id}>
                <h2 className="text-primaryBlack font-medium text-2xl oswald mt-5 underline">
                  {collection.title}
                </h2>
                <Link
                  href={`/collections/${collection._id}`}
                  key={collection._id}
                  className=""
                >
                  <div className="w-[350px] h-[450px] mt-3">
                    <Image
                      key={collection._id}
                      src={collection.image}
                      alt={collection.title}
                      width={500}
                      height={600}
                      priority
                      className="object-cover"
                    />
                  </div>
                </Link>
              </div>
            ))}
          </Carousel>
        )}
      </div>
    </Wrapper>
  );
};

export default Collections;
