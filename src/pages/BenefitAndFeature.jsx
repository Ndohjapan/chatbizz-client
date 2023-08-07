import React from "react";
import { Disclosure } from "@headlessui/react";
import images from "../assets/images.json";
import info from "../assets/information.json";
import { MinusSmIcon, PlusSmIcon } from "@heroicons/react/outline";

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

export default function BenefitAndFeature() {
  return (
    <>
      {product.details.map((detail) => (
        <Disclosure as="div" key={detail.name}>
          {({ open }) => (
            <>
              <h3>
                <Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
                  <span
                    className={classNames(
                      open ? "text-indigo-600" : "text-gray-900",
                      "text-sm font-medium"
                    )}
                  >
                    {detail.name}
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusSmIcon
                        className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                        aria-hidden="true"
                      />
                    ) : (
                      <PlusSmIcon
                        className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel as="div" className="pb-6 prose prose-sm">
                <p className="text-base text-gray-700 space-y-6">
                  {detail.items}
                </p>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </>
  );
}
