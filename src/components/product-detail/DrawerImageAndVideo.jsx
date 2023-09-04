import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import StatusMoreIcon from "../../assets/StatusMoreIcon";
import { TrashIcon } from "@heroicons/react/outline";
import ImageUploadIcon from "../../assets/ImageUploadIcon";
import VariantsImageUpload from "../store/VariantsImageUpload";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function DrawerImageAndVideo({ variant }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [variantImages, setVariantImages] = useState(variant.images);

  const toggleModal = (toggle) => {
    setIsModalOpen(toggle);
  };

  const updateDisplayImages = (images) => {
    setVariantImages(images);
  };

  return (
    <>
      <div>
        <Tab.Group as="div" className="flex flex-col-reverse">
          {/* Image selector */}
          {/* <Tab.Panels className="w-full aspect-w-1 aspect-h-1 relative"> */}
            <>
              {variantImages.length ? (
                <>
                  <div className=" mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
                    <Tab.List className="grid grid-cols-4 gap-6">
                      {variantImages.map((image, index) => (
                        <Tab
                          key={image.index}
                          className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                        >
                          {({ selected }) => (
                            <>
                              <span className="sr-only">{image.name}</span>
                              <span className="absolute inset-0 rounded-md overflow-hidden">
                                <img
                                  src={image.secure_url.replace(
                                    "/upload/",
                                    "/upload/c_scale,w_500/f_auto/q_auto:eco/"
                                  )}
                                  alt=""
                                  className="w-full h-full object-center object-cover"
                                />
                              </span>
                              <span
                                className={classNames(
                                  selected
                                    ? "ring-indigo-500"
                                    : "ring-transparent",
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
                        <li
                          className="space-y-1 text-center cursor-pointer"
                          onClick={() => {
                            setIsModalOpen(true);
                          }}
                        >
                          <StatusMoreIcon />
                        </li>
                        </>
                      </div>
                    </Tab.List>
                  </div>

                  <Tab.Panels className="w-full aspect-w-1 aspect-h-1 relative">
                    {variantImages.map((image, index) => (
                      <Tab.Panel key={index}>
                        <img
                          src={image.secure_url.replace(
                            "/upload/",
                            "/upload/c_scale,w_500/f_auto/q_auto:eco/"
                          )}
                          alt={image.asset_id}
                          className="w-full h-full object-center object-cover sm:rounded-lg"
                        />
                        <div className="absolute top-3 right-2 w-8  h-4 cursor-pointer">
                          <TrashIcon className="text-red-400" />
                        </div>
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </>
              ) : (
                <>
                  <main>
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                      <div className="py-4 sm:px-0">
                        <div className="border-4 border-dashed border-gray-200 rounded-lg h-48 flex justify-center items-center flex-col">
                          <div className="text-center">
                            <div className="flex items-center justify-center">
                              <ImageUploadIcon className="text-gray-300 text-4xl" />
                            </div>
                            <h3 className="mt-2 text-sm font-medium text-gray-600">
                              No Images
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              Get started {"  "}
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                              >
                                <span
                                  onClick={() => {
                                    setIsModalOpen(true);
                                  }}
                                >
                                  click to browse
                                </span>
                              </label>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </main>
                </>
              )}
            </>
          {/* </Tab.Panels> */}
        </Tab.Group>
      </div>
      {isModalOpen ? (
        <VariantsImageUpload
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
          updateDisplayImages={updateDisplayImages}
          displayImages={variantImages}
          IsDrawerOpen={true}
        />
      ) : (
        <></>
      )}
    </>
  );
}
