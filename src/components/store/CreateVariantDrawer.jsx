import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import info from "../../assets/information.json";
import VariantsImageUpload from "./VariantsImageUpload";
import ImageUploadIcon from "../../assets/ImageUploadIcon";

// eslint-disable-next-line react/prop-types
export default function CreateVariantDrawer({ IsDrawerOpen, toggleDrawer, variant, createVariant, updateVariant }) {
  const [open, setOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [variantDisplayImages, setVariantDisplayImages] = useState([]);

  const toggleModal = (toggle) => {
    setIsModalOpen(toggle);
  };
  const updateDisplayImages = (images) => {
    setVariantDisplayImages(images);
  };

  useEffect(() => {
    setOpen(IsDrawerOpen);
    if(variant.images){
        setVariantDisplayImages(variant.images)
    }
  }, [IsDrawerOpen, variant]);

  const handleClose = () => {
    if (!isModalOpen) {
      setOpen(false);
      setTimeout(() => {
        toggleDrawer(false);
      }, 300);
    }
  };

  const submitForm = () => {
    const name = document.getElementById("variantName").value; 
    const description = document.getElementById("variantDescription").value;
    const feature = document.getElementById("variantFeatures").value;
    const images = variantDisplayImages
    const price = document.getElementById("variantPrice").value;
    const currency = document.getElementById("variantCurrency").value;
    const weight = document.getElementById("variantWeight").value;
    const unit = document.getElementById("variantUnit").value;
    const stock = document.getElementById("variantStock").value;
    const group = document.getElementById("variantGroup").value;
    const color = document.getElementById("variantColor").value;
    const dimension = document.getElementById("variantDimension").value;
    const size = document.getElementById("variantSize").value;
    const users = document.getElementById("variantUsers").value;
    const sex = document.getElementById("variantSex").value;

    const form = {name, description, feature, images, price, weight, currency, group, stock, unit, color, dimension, size, users, sex};

    console.log(form);

    if(variant.id){
        form.id = variant.id;
        updateVariant(form);
        handleClose()
    }else{
        createVariant(form);
        handleClose();
    }

  }

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-hidden z-10"
          onClose={handleClose}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Dialog.Overlay className="absolute inset-0" />

            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="pointer-events-auto w-screen max-w-3xl">
                  <div className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                    <div className="flex min-h-0 flex-1 flex-col overflow-y-scroll py-6">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            {" "}
                            Variant{" "}
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              onClick={handleClose}
                            >
                              <span className="sr-only">Close panel</span>
                              <XIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        {/* Replace with your content */}
                        <div
                          className="h-full border-2 border-dashed border-gray-200"
                          aria-hidden="true"
                        >
                          <div className="space-y-6">
                            <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
                              <div className="md:grid md:grid-cols-3 md:gap-6">
                                <div className="md:col-span-1">
                                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                                    Variant Info
                                  </h3>
                                  <p className="mt-1 text-sm text-gray-500">
                                    Providing more information will make the bot
                                    more human-friendly.
                                  </p>
                                </div>
                                <div className="mt-5 md:mt-0 md:col-span-2">
                                  <form
                                    className="space-y-6"
                                    action="#"
                                    method="POST"
                                  >
                                    <div>
                                      <label
                                        htmlFor="variantName"
                                        className="block text-sm font-medium text-gray-700"
                                      >
                                        Variant Name{" "}
                                        <span className="text-red-400 font-bold">
                                          *
                                        </span>
                                      </label>
                                      <div className="mt-1">
                                        <textarea
                                          id="variantName"
                                          name="variantName"
                                          rows={3}
                                          required
                                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                                          placeholder={info.variants[0].name}
                                          defaultValue={variant.name ? variant.name : " "}
                                        />
                                      </div>
                                      <p className="mt-2 text-sm text-gray-500">
                                        Provide enough details in the variant
                                        name
                                      </p>
                                    </div>

                                    <div>
                                      <label
                                        htmlFor="variantDescription"
                                        className="block text-sm font-medium text-gray-700"
                                      >
                                        Variant Description
                                      </label>
                                      <div className="mt-1">
                                        <textarea
                                          id="variantDescription"
                                          name="variantDescription"
                                          rows={3}
                                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                                          placeholder={info.variants[0].description}
                                          defaultValue={variant.description ? variant.description : ""}
                                        />
                                      </div>
                                      <p className="mt-2 text-sm text-gray-500">
                                        Give full description of the variant
                                      </p>
                                    </div>

                                    <div>
                                      <label
                                        htmlFor="variantFeatures"
                                        className="block text-sm font-medium text-gray-700"
                                      >
                                        Features / Benefits{" "}
                                        <span className="text-red-400 font-bold">
                                          *
                                        </span>
                                      </label>
                                      <div className="mt-1">
                                        <textarea
                                          id="variantFeatures"
                                          name="variantFeatures"
                                          rows={3}
                                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                                          placeholder={info.variants[0].features}
                                          defaultValue={variant.feature ? variant.feature : ""}
                                        />
                                      </div>
                                      <p className="mt-2 text-sm text-gray-500">
                                        {info.explainer.product.feature}
                                      </p>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>

                            <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
                              <div className="md:grid md:grid-cols-3 md:gap-6">
                                <div className="md:col-span-1">
                                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                                    Variant Images
                                  </h3>
                                </div>
                                <div className="mt-5 md:mt-0 md:col-span-2">
                                  <form
                                    className="space-y-6"
                                    action="#"
                                    method="POST"
                                  >
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700">
                                        Images
                                      </label>
                                      <div
                                        onClick={() => setIsModalOpen(true)}
                                        className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer"
                                      >
                                        {variantDisplayImages.length === 0 ? (
                                          <>
                                            <div className="space-y-1 text-center">
                                              <ImageUploadIcon />
                                              <div className="flex text-sm text-gray-600">
                                                <p className="pl-1">
                                                  Upload images or select from
                                                  uploaded images
                                                </p>
                                              </div>
                                              <p className="text-xs text-gray-500">
                                                PNG, JPG, JPEG up to 5MB each
                                              </p>
                                            </div>
                                          </>
                                        ) : (
                                          <ul
                                            role="list"
                                            className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
                                          >
                                            {variantDisplayImages.map(
                                              (image) => (
                                                <li
                                                  key={image.source}
                                                  className="relative"
                                                >
                                                  <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                                                    <img
                                                      src={image.source}
                                                      alt=""
                                                      className="object-cover pointer-events-none group-hover:opacity-75"
                                                    />
                                                    <button
                                                      type="button"
                                                      className="absolute inset-0 focus:outline-none"
                                                    >
                                                      <span className="sr-only">
                                                        View details for{" "}
                                                        {image.title}
                                                      </span>
                                                    </button>
                                                  </div>
                                                  <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
                                                    {image.title}
                                                  </p>
                                                  <p className="block text-sm font-medium text-gray-500 pointer-events-none">
                                                    {image.size}
                                                  </p>
                                                </li>
                                              )
                                            )}
                                          </ul>
                                        )}
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>

                            <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
                              <div className="md:grid md:grid-cols-3 md:gap-6">
                                <div className="md:col-span-1">
                                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                                    More Information
                                  </h3>
                                  <p className="mt-1 text-sm text-gray-500">
                                    Provide more description information.
                                  </p>
                                </div>
                                <div className="mt-5 md:mt-0 md:col-span-2">
                                  <form action="#" method="POST">
                                    <div className="grid grid-cols-6 gap-6">
                                      <div className="col-span-6 sm:col-span-3">
                                        <label
                                          htmlFor="variantPrice"
                                          className="block text-sm font-medium text-gray-700"
                                        >
                                          Price {" "}
                                        <span className="text-red-400 font-bold">
                                          *
                                        </span>
                                        </label>
                                        <div className="mt-1 relative rounded-md shadow-sm border">
                                          <input
                                            type="number"
                                            name="variantPrice"
                                            id="variantPrice"
                                            required
                                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md  p-2"
                                            placeholder={info.variants[0].price}
                                            defaultValue={variant.price ? variant.price : ""}
                                          />
                                          <div className="absolute inset-y-0 right-0 flex items-center">
                                            <label
                                              htmlFor="variantCurrency"
                                              className="sr-only"
                                            >
                                              Price
                                            </label>
                                            <select
                                              id="variantCurrency"
                                              name="variantCurrency"
                                              className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                                            >
                                              <option>NGN</option>
                                              <option>USD</option>
                                              <option>CAD</option>
                                              <option>GBP</option>
                                              <option>EUR</option>
                                            </select>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="col-span-6 sm:col-span-3">
                                        <label
                                          htmlFor="variantWeight"
                                          className="block text-sm font-medium text-gray-700"
                                        >
                                          Weight
                                        </label>
                                        <div className="mt-1 relative rounded-md shadow-sm border">
                                          <input
                                            type="number"
                                            name="variantWeight"
                                            id="variantWeight"
                                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md  p-2"
                                            placeholder={info.variants[0].weight}
                                            defaultValue={variant.weight ? variant.weight : ""}
                                          />
                                          <div className="absolute inset-y-0 right-0 flex items-center">
                                            <label
                                              htmlFor="variantUnit"
                                              className="sr-only"
                                            >
                                              Unit
                                            </label>
                                            <select
                                              id="variantUnit"
                                              name="variantUnit"
                                              className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                                            >
                                              <option>Kg</option>
                                              <option>Lbs</option>
                                            </select>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="col-span-6 sm:col-span-3">
                                        <label
                                          htmlFor="variantStock"
                                          className="block text-sm font-medium text-gray-700"
                                        >
                                          In Stock
                                        </label>
                                        <div className="mt-1 relative rounded-md shadow-sm border">
                                          <input
                                            type="number"
                                            name="variantStock"
                                            id="variantStock"
                                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md  p-2"
                                            placeholder={info.variants[0].stock}
                                            defaultValue={variant.stock ? variant.stock : ""}
                                          />
                                          <div className="absolute inset-y-0 right-0 flex items-center">
                                            <label
                                              htmlFor="variantGroup"
                                              className="sr-only"
                                            >
                                              Unit
                                            </label>
                                            <select
                                              id="variantGroup"
                                              name="variantGroup"
                                              className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                                            >
                                              <option>Cartons</option>
                                              <option>Units</option>
                                              <option>Pallete</option>
                                            </select>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="col-span-6 sm:col-span-3">
                                        <label
                                          htmlFor="variantColor"
                                          className="block text-sm font-medium text-gray-700"
                                        >
                                          Color
                                        </label>
                                        <input
                                          type="text"
                                          name="variantColor"
                                          id="variantColor"
                                          autoComplete="given-name"
                                          placeholder={info.variants[0].color}
                                          defaultValue={variant.color ? variant.color : ""}
                                          className="mt-1 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
                                        />
                                      </div>

                                      <div className="col-span-6 sm:col-span-3">
                                        <label
                                          htmlFor="variantDimension"
                                          className="block text-sm font-medium text-gray-700"
                                        >
                                          Dimension
                                        </label>
                                        <input
                                          type="variantDimension"
                                          name="variantDimension"
                                          id="variantDimension"
                                          autoComplete="7.87 x 5.31 x 0.79 inches"
                                          placeholder={info.variants[0].dimension}
                                          defaultValue={variant.dimension ? variant.dimension : ""}
                                          className="mt-1 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
                                        />
                                      </div>

                                      <div className="col-span-6 sm:col-span-3">
                                        <label
                                          htmlFor="variantSize"
                                          className="block text-sm font-medium text-gray-700"
                                        >
                                          Size
                                        </label>
                                        <input
                                          type="text"
                                          name="variantSize"
                                          id="variantSize"
                                          autoComplete="41"
                                          placeholder={info.variants[0].size}
                                          defaultValue={variant.size ? variant.size : ""}
                                          className="mt-1 border p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />
                                      </div>

                                      <div className="col-span-6 sm:col-span-3">
                                        <label
                                          htmlFor="variantUsers"
                                          className="block text-sm font-medium text-gray-700"
                                        >
                                          Users
                                        </label>
                                        <select
                                          id="variantUsers"
                                          name="variantUsers"
                                          autoComplete="variantUsers"
                                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                          <option>All</option>
                                          <option>Children</option>
                                          <option>Adult</option>
                                        </select>
                                      </div>

                                      <div className="col-span-6 sm:col-span-3">
                                        <label
                                          htmlFor="variantSex"
                                          className="block text-sm font-medium text-gray-700"
                                        >
                                          Sex
                                        </label>
                                        <select
                                          id="variantSex"
                                          name="variantSex"
                                          autoComplete="variantSex"
                                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                          <option>Unisex</option>
                                          <option>Male</option>
                                          <option>Female</option>
                                        </select>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* /End replace */}
                      </div>
                    </div>
                    <div className="flex flex-shrink-0 justify-end px-4 py-4">
                      <button
                        type="button"
                        className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={handleClose}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {submitForm()}}
                        className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        {variant.id ? "Update" : "Save"}
                      </button>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      {isModalOpen ? (
        <VariantsImageUpload
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
          updateDisplayImages={updateDisplayImages}
          displayImages={variantDisplayImages}
          IsDrawerOpen={IsDrawerOpen}
        />
      ) : (
        <></>
      )}
    </>
  );
}
