"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { BiArrowBack } from "react-icons/bi";
import Image from "next/image";
import { useRouter } from "next/navigation";

const banner = [
  {
    id: 1,
    img: "/slide-1.png",
    name: "shoes1",
  },
  {
    id: 2,
    img: "/slide-2.png",
    name: "shoes2",
  },
  {
    id: 3,
    img: "/slide-3.png",
    name: "shoes3",
  },
];

const HeroBanner = () => {
  const router = useRouter();
  return (
    <div className="relative text-white text-[20px] w-full max-w-[1360px] mx-auto">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        renderArrowPrev={(clickHandler, hasPrev) => (
          <div
            onClick={clickHandler}
            className="absolute right-[31px] md:right-[51px] bottom-0 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
          >
            <BiArrowBack className="text-sm md:text-lg" />
          </div>
        )}
        renderArrowNext={(clickHandler, hasNext) => (
          <div
            onClick={clickHandler}
            className="absolute right-0 bottom-0 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
          >
            <BiArrowBack className="rotate-180 text-sm md:text-lg" />
          </div>
        )}
      >
        {banner.map((item) => (
          <div key={item.id}>
            <Image
              src={item.img}
              alt={item.name}
              width={1920}
              height={1080}
              priority
              className="aspect-[16/10] md:aspect-auto object-cover"
            />

            <button
              type="button"
              onClick={() => router.push("/products")}
              className="px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-oswald bg-white absolute bottom-[25px] md:bottom-[75px] left-0 text-black/[0.9] text-[15px] md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90"
            >
              shop now
            </button>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroBanner;
