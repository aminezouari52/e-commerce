import { useRouter } from "next/navigation";
import React from "react";

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const HeroLink: React.FC<LinkProps> = ({ href, children, className }) => {
  const router = useRouter();
  return (
    <button
      role="link"
      className={`relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-white after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100 ${className}`}
      onClick={() => router.push(href)}
    >
      {children}
    </button>
  );
};

export default HeroLink;
