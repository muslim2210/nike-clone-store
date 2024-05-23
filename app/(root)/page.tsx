import Wrapper from "@/components/layout/Wrapper";
import ProductList from "@/components/product/ProductList";
import Collections from "@/components/section/Collections";
import Heading from "@/components/section/Heading";
import Banner from "@/components/slider/Banner";
import Slider from "@/components/slider/Slider";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Slider />
      <Heading
        span={"Lifestyle Running Shoes"}
        title={"Extra Ordinary"}
        subtitle={
          "Meet the latest collection of retro running inspired shoes.The unlikely heroes of your easiest styling hack."
        }
      />
      <Banner />
      <Collections />
      <Heading
        span={"The Best Air Jordans"}
        title={"all comfort. no pressure."}
        subtitle={
          "Based on the design of the original outsole, the integrated traction pattern includes a forefoot pivot circle."
        }
      />
      <Wrapper>
        <Image
          src="/banner.jpg"
          alt="banner"
          priority
          width={1920}
          height={1080}
        />
      </Wrapper>
      <ProductList />
    </main>
  );
}

export const dynamic = "force-dynamic";
