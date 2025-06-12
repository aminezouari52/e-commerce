"use client";

import { useEffect, useState } from "react";

import {
  NavigationMenu,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import HeroLink from "../common/HeroLink";
import HeroSelect from "../common/HeroSelect";

export function HeroHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight - 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <NavigationMenu
      viewport={false}
      className={`font-hero z-10 flex items-center gap-20 fixed top-0 w-full py-2 px-20 transition-colors duration-300 ${
        isScrolled ? "bg-black/80" : "bg-black/10 backdrop-blur"
      }`}
    >
      <p className="font-regular text-white uppercase cursor-pointer w-[150px] hover:opacity-80">
        stride step
      </p>
      <div className="flex justify-between list-none w-full ">
        <div className="flex gap-6">
          <HeroLink
            className="text-white text-xs cursor-pointer h-8"
            href="/shop"
          >
            <NavigationMenuItem className="flex items-center">
              Shop
            </NavigationMenuItem>
          </HeroLink>
          <HeroSelect
            className="text-white text-xs"
            optionsBg={isScrolled ? "bg-black/80" : "bg-black/10 backdrop-blur"}
          />
        </div>

        <HeroLink
          className="text-white text-xs cursor-pointer h-8"
          href="/shop"
        >
          <NavigationMenuItem className="flex items-center">
            <div className="group flex flex-row gap-2 items-center">
              <div>Cart</div>
              <div className="font-regular font-bold">(0)</div>
            </div>
          </NavigationMenuItem>
        </HeroLink>
      </div>
    </NavigationMenu>
  );
}
