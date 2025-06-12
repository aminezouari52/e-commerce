import React from "react";

const ChevronSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    viewBox="0 0 512 512"
    className="h-2.5 w-6 fill-white transition-transform duration-300  group-hover:rotate-180"
  >
    <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path>
  </svg>
);

const HeroSelect = ({ className }: any) => {
  return (
    <div
      className={`group relative cursor-pointer flex items-center justify-between ${className}`}
    >
      <div>Categories</div>
      <div className="absolute top-5 h-4 left-0 right-0 z-10"></div>
      <ChevronSvg />
      <div
        className={`font-regular absolute flex flex-col rounded-md p-1 bg-gray-800 top-[20px] opacity-0 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:top-[30px] group-hover:pointer-events-auto`}
      >
        <div
          className={`rounded-md p-1 transition-colors duration-300 bg-gray-800 text-sm hover:bg-gray-600`}
        >
          Rustic
        </div>
        <div
          className={`rounded-md p-1 transition-colors duration-300 bg-gray-800 text-sm hover:bg-gray-600`}
        >
          Unbranded
        </div>
        <div
          className={`rounded-md p-1 transition-colors duration-300 bg-gray-800 text-sm hover:bg-gray-600`}
        >
          Small
        </div>
        <div
          className={`rounded-md p-1 transition-colors duration-300 bg-gray-800 text-sm hover:bg-gray-600`}
        >
          Practical
        </div>
      </div>
    </div>
  );
};

export default HeroSelect;
