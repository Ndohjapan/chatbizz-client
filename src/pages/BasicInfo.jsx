import React from "react";
import images from "../assets/images.json";
import info from "../assets/information.json";
import { MinusSmIcon, PlusSmIcon } from "@heroicons/react/outline";
import { Disclosure } from "@headlessui/react";

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

export default function BasicInfo() {
  return (
    <>
      <Disclosure as="div" key={"yt-videos"} defaultOpen={true}>
        {({ open }) => (
          <>
            <h3>
              <Disclosure.Button className="group relative w-full pb-1 pt-16 px-4 sm:px-0 flex justify-between items-center text-left">
                <span
                  className={classNames(
                    open ? "text-indigo-600" : "text-gray-900",
                    "font-medium text-2xl"
                  )}
                >
                  <h3 className="text-2xl leading-6 font-medium text-gray-900">
                    Product Information
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Information about product.
                  </p>
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
            <Disclosure.Panel
              as="div"
              className="pb-6 prose prose-sm grid grid-cols-1 gap-x-4 gap-y-8 sm:gap-x-6 xl:gap-x-8"
            >
              {
                <>
                  <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                    <div className="mt-5 border-t border-gray-200">
                      <dl className="divide-y divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Name
                          </dt>
                          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">
                              {info.products[0].name}
                            </span>
                            <span className="ml-4 flex-shrink-0">
                              <button
                                type="button"
                                className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                Update
                              </button>
                            </span>
                          </dd>
                        </div>
                        <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Decription
                          </dt>
                          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">
                              {info.products[0].description}
                            </span>
                            <span className="ml-4 flex-shrink-0">
                              <button
                                type="button"
                                className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                Update
                              </button>
                            </span>
                          </dd>
                        </div>
                        <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Price
                          </dt>
                          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">$300</span>
                            <span className="ml-4 flex-shrink-0">
                              <button
                                type="button"
                                className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                Update
                              </button>
                            </span>
                          </dd>
                        </div>
                        <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            In Stock
                          </dt>
                          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">
                              22{" "}
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                mid
                              </span>{" "}
                            </span>
                            <span className="ml-4 flex-shrink-0">
                              <button
                                type="button"
                                className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                Update
                              </button>
                            </span>
                          </dd>
                        </div>

                        <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Feature / Benefits
                          </dt>
                          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">
                              {" "}
                              {info.products[0].feature}
                            </span>
                            <span className="ml-4 flex-shrink-0">
                              <button
                                type="button"
                                className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                Update
                              </button>
                            </span>
                          </dd>
                        </div>

                        <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Colors
                          </dt>
                          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">
                              <ul>
                                <li> Orange</li>
                                <li> Blue</li>
                                <li> Brown</li>
                                <li> Orange</li>
                              </ul>
                            </span>
                            <span className="ml-4 flex-shrink-0">
                              <button
                                type="button"
                                className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                Update
                              </button>
                            </span>
                          </dd>
                        </div>

                        <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Sizes
                          </dt>
                          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">
                              <ul>
                                <li> XXL</li>
                                <li> XL</li>
                                <li> 21</li>
                                <li> 23</li>
                              </ul>
                            </span>
                            <span className="ml-4 flex-shrink-0">
                              <button
                                type="button"
                                className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                Update
                              </button>
                            </span>
                          </dd>
                        </div>

                        <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Weight
                          </dt>
                          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow"> 22kg</span>
                            <span className="ml-4 flex-shrink-0">
                              <button
                                type="button"
                                className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                Update
                              </button>
                            </span>
                          </dd>
                        </div>

                        <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Dimension
                          </dt>
                          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">
                              {" "}
                              {"7.87 x 5.31 x 0.79 inches"}
                            </span>
                            <span className="ml-4 flex-shrink-0">
                              <button
                                type="button"
                                className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                Update
                              </button>
                            </span>
                          </dd>
                        </div>
                        <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Users
                          </dt>
                          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow"> Children </span>
                            <span className="ml-4 flex-shrink-0">
                              <button
                                type="button"
                                className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                Update
                              </button>
                            </span>
                          </dd>
                        </div>
                        <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
                          <dt className="text-sm font-medium text-gray-500">
                            Sex
                          </dt>
                          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow"> Unisex</span>
                            <span className="ml-4 flex-shrink-0">
                              <button
                                type="button"
                                className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                Update
                              </button>
                            </span>
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </>
              }
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}
