import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import { Disclosure } from "@headlessui/react";
import { MinusSmIcon, PlusSmIcon } from "@heroicons/react/outline";
import images from "../assets/images.json";
import StatusMoreIcon from "../assets/StatusMoreIcon";
import { TrashIcon } from "@heroicons/react/outline";
import info from "../assets/information.json";
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

function ImagesRender() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const loadComplete = () => {
    setIsLoading(false);
  };

  const handleAccordionToggle = (isOpen) => {
    setIsAccordionOpen(isOpen);
    if (!isOpen) {
      setIsLoading(true);
    }
  };

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

      <Disclosure as="div" key={"yt-videos"}>
        {({ open }) => (
          <>
            <h3>
              <Disclosure.Button className="group relative w-full pb-6 pt-16 px-4 sm:px-0 flex justify-between items-center text-left">
                <span
                  className={classNames(
                    open ? "text-indigo-600" : "text-gray-900",
                    "font-medium text-2xl"
                  )}
                >
                  <h3 className="text-2xl leading-6 font-medium text-gray-900">
                    Videos
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Product videos.
                  </p>
                </span>
                <span className="ml-6 flex items-center">
                  {open ? (
                    <MinusSmIcon
                      className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                      aria-hidden="true"
                      onClick={() => {
                        handleAccordionToggle(false);
                      }}
                    />
                  ) : (
                    <PlusSmIcon
                      className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                      onClick={() => {
                        handleAccordionToggle(true);
                      }}
                    />
                  )}
                </span>
              </Disclosure.Button>
            </h3>
            <Disclosure.Panel
              as="div"
              className="pb-6 prose prose-sm grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-2 xl:gap-x-8"
            >
              {
                <>
                  <div className="md:col-span-2 mt-1 flex items-center justify-end">
                    <a
                      href="#"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Edit videos
                    </a>
                  </div>
                  {isLoading && (
                    <div className="md:col-span-2 flex items-center justify-center">
                      <ImSpinner8 className="animate-spin text-center text-2xl text-indigo-600" />
                    </div>
                  )}
                  <div className="aspect-w-16 aspect-h-9 flex justify-center">
                    <iframe
                      src="https://www.youtube.com/embed/r9jwGansp1E"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      onLoad={loadComplete}
                    ></iframe>
                  </div>
                  <div className="aspect-w-16 aspect-h-9 flex justify-center">
                    <iframe
                      src="https://www.youtube.com/embed/r9jwGansp1E"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      onLoad={loadComplete}
                    ></iframe>
                  </div>
                  <div className="aspect-w-16 aspect-h-9 flex justify-center">
                    <iframe
                      src="https://www.youtube.com/embed/r9jwGansp1E"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      onLoad={loadComplete}
                    ></iframe>
                  </div>
                </>
              }
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}

export default ImagesRender;
