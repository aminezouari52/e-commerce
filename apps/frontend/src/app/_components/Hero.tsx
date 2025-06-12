"use client";

import Image from "next/image";
import { motion } from "motion/react";
import HeroButton from "@/components/common/HeroButton";

const Hero = () => {
  return (
    <div className="h-[100vh] font-hero">
      <Image
        className="z-[-1] object-cover brightness-90"
        src="/bg_cropped.jpg"
        alt="Background Image"
        fill
        quality={100}
        priority
      />

      <motion.div
        className="flex flex-col pt-40 gap-4 px-20"
        initial={{ x: -500 }}
        whileInView={{ x: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl py-6 text-white">
          Own the Court. <br /> Every Step.
        </h1>

        <div className="flex">
          <HeroButton text="Shop Now" href="/shop" />
        </div>
      </motion.div>
      <motion.div
        className="absolute bottom-0 w-full"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1 }}
      >
        <InfiniteScrollBanner />
      </motion.div>
    </div>
  );
};

const InfiniteScrollBanner = () => {
  const text = "Free delivery for orders above 100dt";
  const items = Array.from({ length: 10 }, () => text); // increase repetition

  return (
    <div className="font-regular h-6 w-full overflow-hidden relative text-xs uppercase bg-black">
      <motion.div
        className="flex absolute whitespace-nowrap will-change-transform"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ minWidth: "300%" }}
      >
        <div className="flex min-w-max text-white items-center h-6">
          {items.map((item, i) => (
            <span key={`1-${i}`} className="mr-8">
              {item}
            </span>
          ))}
        </div>

        <div className="flex min-w-max text-white items-center h-6">
          {items.map((item, i) => (
            <span key={`2-${i}`} className="mr-8">
              {item}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
