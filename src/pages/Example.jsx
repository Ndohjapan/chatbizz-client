import { useState } from "react";
import { Disclosure, RadioGroup, Tab } from "@headlessui/react";
import { HeartIcon, MinusSmIcon, PlusSmIcon } from "@heroicons/react/outline";
import images from "../assets/images.json";
import info from "../assets/information.json";
import ImagesRender from "./ImagesRender";
import BasicInfo from "./BasicInfo";
import ColorAndSize from "./ColorAndSize";
import BenefitAndFeature from "./BenefitAndFeature";
import Videos from "./Videos";
import OtherInfo from "./OtherInfo";
import { PaperClipIcon } from "@heroicons/react/solid";

const product = {
  name: info.products[0].name,
  price: "$140",
  rating: 4,
  images: [
    {
      id: 1,
      name: "Angled view",
      src: "https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg",
      alt: "Angled front view with bag zipped and handles upright.",
    },
    {
      id: 2,
      name: "We are one",
      src: images.background[1],
      alt: "Angled front view with bag zipped and handles upright.",
    },
    {
      id: 3,
      name: "Them no dey see me",
      src: images.background[0],
      alt: "Angled front view with bag zipped and handles upright.",
    },
    {
      id: 5,
      name: "Them no dey see me",
      src: images.profile[4],
      alt: "Angled front view with bag zipped and handles upright.",
    },
    {
      id: 6,
      name: "Them no dey see me",
      src: images.background[0],
      alt: "Angled front view with bag zipped and handles upright.",
    },
    {
      id: 7,
      name: "Them no dey see me",
      src: images.background[0],
      alt: "Angled front view with bag zipped and handles upright.",
    },
  ],
  description: `
    <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
  `,
  details: [
    {
      name: "Features / Benefit",
      items:
        "We have been from the day of the pentecost to this day and we have seen the Lord our God",
    },
  ],
  sizes: [
    { name: "XXS", inStock: true },
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: false },
  ],
  colors: ["Orange", "Red", "Yellow", "Blue"],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Example() {
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto pb-16 pt-6 px-4 sm:pb-24 sm:pt-8 sm:px-6 lg:max-w-7xl lg:px-8">
        {/* Product header */}
        <div className="pb-6 sm:pb-8 flex items-center justify-between">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Product
          </h3>
          <div className="mt-3 flex sm:mt-0 sm:ml-4">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Discard
            </button>
            <button
              type="button"
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </div>
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <ImagesRender />

          {/* Product info */}
          <BasicInfo/>
          
        </div>
      </div>
    </div>
  );
}

export default Example;
