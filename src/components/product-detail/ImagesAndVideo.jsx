import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import { Disclosure } from "@headlessui/react";
import { MinusSmIcon, PlusSmIcon } from "@heroicons/react/outline";
import images from "../../assets/images.json";
import StatusMoreIcon from "../../assets/StatusMoreIcon";
import { TrashIcon } from "@heroicons/react/outline";
import info from "../../assets/information.json";
import { ImSpinner8 } from "react-icons/im";
import ImageUploadModal from "../store/ImageUploadModal";
import DeleteWarning from "../layout/DeleteWarning";
import UpdateModal from "./sub-menus/UpdateModal";

const product = {
  name: info.products[0].name,
  price: "$140",
  rating: 4,
  images: [
    {
      id: 3,
      title: "Trial Users",
      alt: "Last message sent 4 days ago",
      users: "2740 users",
      source: images.products[2],
    },
    {
      id: 4,
      title: "Trial Users",
      alt: "Last message sent 4 days ago",
      users: "2740 users",
      source: images.products[3],
    },
    {
      id: 5,
      title: "Trial Users",
      alt: "Last message sent 4 days ago",
      users: "2740 users",
      source: images.products[4],
    },
    {
      id: 6,
      title: "Trial Users",
      alt: "Last message sent 4 days ago",
      users: "2740 users",
      source: images.products[5],
    },
    {
      id: 7,
      title: "Trial Users",
      alt: "Last message sent 4 days ago",
      users: "2740 users",
      source: images.products[6],
    },
    {
      id: 8,
      title: "Trial Users",
      alt: "Last message sent 4 days ago",
      users: "2740 users",
      source: images.products[7],
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
export default function ImagesAndVideo() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productImages, setProductImages] = useState(product.images);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdatModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("video");


  const toggleModal = (toggle) => {
    setIsModalOpen(toggle);
  };

  const toggleDeleteModal = (toggle) => {
    setIsDeleteModalOpen(toggle);
  };

  const toggleUpdateModal = (toggle) => {
    setIsUpdateModalOpen(toggle);
  }

  const loadComplete = () => {
    setIsLoading(false);
  };

  const handleAccordionToggle = (isOpen) => {
    setIsAccordionOpen(isOpen);
    if (!isOpen) {
      setIsLoading(true);
    }
  };

  const updateProductImages = (images) => {
    setProductImages(images);
  };

  return (
    <>
      <div>

        {/* Images Display */}

        <Tab.Group as="div" className="flex flex-col-reverse">
          {/* Image selector */}
          <div className=" mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
            <Tab.List className="grid grid-cols-4 gap-6">
              {productImages.map((image, index) => (
                <Tab
                  key={index}
                  className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                >
                  {({ selected }) => (
                    <>
                      <span className="sr-only">{image.name}</span>
                      <span className="absolute inset-0 rounded-md overflow-hidden">
                        <img
                          src={image.source}
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
              <div
                onClick={() => setIsModalOpen(true)}
                className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
              >
                <>
                  <span className="sr-only">Add more</span>
                  <StatusMoreIcon />
                </>
              </div>
            </Tab.List>
          </div>

          <Tab.Panels className="w-full aspect-w-1 aspect-h-1 relative">
            {productImages.map((image) => (
              <Tab.Panel key={image.id}>
                <img
                  src={image.source}
                  alt={image.alt}
                  className="w-full h-full object-center object-cover sm:rounded-lg"
                />
                <div
                  className="absolute top-3 right-2 w-8  h-4 cursor-pointer"
                  onClick={() => setIsDeleteModalOpen(true)}
                >
                  <TrashIcon className="text-red-400" />
                </div>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>

        {/* Video Display */}

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
                className="pb-6 prose prose-sm grid grid-cols-1 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-col-2"
              >
                {
                  <>
                    <div className="col-span-2 mt-1 flex items-center justify-end">
                      <a
                        href="#"
                        onClick={() => {setIsUpdateModalOpen(true); setSelectedSection("video")}}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Edit videos
                      </a>
                    </div>
                    {isLoading && (
                      <div className="lg:col-span-2 flex items-center justify-center">
                        <ImSpinner8 className="animate-spin text-center text-2xl text-indigo-600" />
                      </div>
                    )}
                    <div className="col-span-2 lg:col-span-1 aspect-w-16 aspect-h-9 flex justify-center">
                      <iframe
                        src="https://www.youtube.com/embed/r9jwGansp1E"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        onLoad={loadComplete}
                      ></iframe>
                    </div>
                    <div className="col-span-2 lg:col-span-1 aspect-w-16 aspect-h-9 flex justify-center">
                      <iframe
                        src="https://www.youtube.com/embed/r9jwGansp1E"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        onLoad={loadComplete}
                      ></iframe>
                    </div>
                    <div className="col-span-2 lg:col-span-1 aspect-w-16 aspect-h-9 flex justify-center">
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

      {isUpdatModalOpen ? (
        <UpdateModal toggleModal={toggleUpdateModal} section={selectedSection} productInfo={info.products[0]} />
      ) : (
        <></>
      )}

      {isModalOpen ? (
        <ImageUploadModal
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
          updateDisplayImages={updateProductImages}
          displayImages={productImages}
        />
      ) : (
        <></>
      )}
      {isDeleteModalOpen ? (
        <DeleteWarning
          header={info.delete.image.header}
          message={info.delete.image.message}
          buttonText={info.delete.image.buttonText}
          toggleModal={toggleDeleteModal}
        />
      ) : (
        <></>
      )}
    </>
  );
}
