import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import { Disclosure } from "@headlessui/react";
import { MinusSmIcon, PlusSmIcon } from "@heroicons/react/outline";
import images from "../../assets/images.json";
import StatusMoreIcon from "../../assets/StatusMoreIcon";
import { TrashIcon } from "@heroicons/react/outline";
import info from "../../assets/information.json";
import { ImSpinner8 } from "react-icons/im";

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
export default function DrawerImageAndVideo() {
  
    return (
      <div>
        <Tab.Group as="div" className="flex flex-col-reverse">
          {/* Image selector */}
          <div className=" mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
            <Tab.List className="grid grid-cols-4 gap-6">
              {product.images.map((image) => (
                <Tab
                  key={image.id}
                  className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                >
                  {({ selected }) => (
                    <>
                      <span className="sr-only">{image.name}</span>
                      <span className="absolute inset-0 rounded-md overflow-hidden">
                        <img
                          src={image.src}
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </span>
                      <span
                        className={classNames(
                          selected ? "ring-indigo-500" : "ring-transparent",
                          "absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none"
                        )}
                        aria-hidden="true"
                      />
                    </>
                  )}
                </Tab>
              ))}
              <div className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50">
                <>
                  <span className="sr-only">Add more</span>
                  <StatusMoreIcon />
                </>
              </div>
            </Tab.List>
          </div>
  
          <Tab.Panels className="w-full aspect-w-1 aspect-h-1 relative">
            {product.images.map((image) => (
              <Tab.Panel key={image.id}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-center object-cover sm:rounded-lg"
                />
                <div className="absolute top-3 right-2 w-8  h-4 cursor-pointer">
                  <TrashIcon className="text-red-400" />
                </div>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
  
      </div>
    );
}
