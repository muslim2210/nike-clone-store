"use client";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const Gallery = ({ productMedia }: { productMedia: string[] }) => {
  return (
    <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]">
      <Carousel
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        thumbWidth={60}
        className="productCarousel"
      >
        {productMedia?.map((media, index) => (
          <div key={index} className="rounded-[10px]">
            <img src={media} alt={media} className="rounded-[10px]" />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Gallery;
