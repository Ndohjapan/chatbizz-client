/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import VariantsImageUpload from "./ImageUploadModal";

// eslint-disable-next-line react/prop-types
export default function Drawer({IsDrawerOpen, toggleDrawer, open, setOpen, isModalOpen, setIsModalOpen, toggleModal, variantDisplayImages}) {


  useEffect(() => {
    setOpen(IsDrawerOpen);
  }, [IsDrawerOpen, setOpen]);

  const handleClose = () => {
    if(!isModalOpen){
    setOpen(false);
    setTimeout(() => {
        toggleDrawer(false);
      }, 300);
    }
  };

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
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700"
                                      >
                                        Variant Name{" "}
                                        <span className="text-red-400 font-bold">
                                          *
                                        </span>
                                      </label>
                                      <div className="mt-1">
                                        <textarea
                                          id="name"
                                          name="name"
                                          rows={3}
                                          required
                                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                                          placeholder="Purple Gift Box Set "
                                        />
                                      </div>
                                      <p className="mt-2 text-sm text-gray-500">
                                        Provide enough details in the variant
                                        name
                                      </p>
                                    </div>

                                    <div>
                                      <label
                                        htmlFor="description"
                                        className="block text-sm font-medium text-gray-700"
                                      >
                                        Variant Description
                                      </label>
                                      <div className="mt-1">
                                        <textarea
                                          id="description"
                                          name="description"
                                          rows={3}
                                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                                          placeholder="Decorated and colorful tablet"
                                        />
                                      </div>
                                      <p className="mt-2 text-sm text-gray-500">
                                        Give full description of the variant
                                      </p>
                                    </div>

                                    <div>
                                      <label
                                        htmlFor="features"
                                        className="block text-sm font-medium text-gray-700"
                                      >
                                        Features / Benefits{" "}
                                        <span className="text-red-400 font-bold">
                                          *
                                        </span>
                                      </label>
                                      <div className="mt-1">
                                        <textarea
                                          id="features"
                                          name="features"
                                          rows={3}
                                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                                          placeholder="- Mood boost 
                                        - Uplifting - Invigorating"
                                        />
                                      </div>
                                      <p className="mt-2 text-sm text-gray-500">
                                        With more benefits and features, the bot
                                        can maximize its sales and convincing
                                        power.
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
                                              <svg
                                                className="mx-auto h-12 w-12 text-gray-400"
                                                stroke="currentColor"
                                                fill="none"
                                                viewBox="0 0 48 48"
                                                aria-hidden="true"
                                              >
                                                <path
                                                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                  strokeWidth={2}
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                              </svg>
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
                                          htmlFor="price"
                                          className="block text-sm font-medium text-gray-700"
                                        >
                                          Price
                                        </label>
                                        <div className="mt-1 relative rounded-md shadow-sm border">
                                          <input
                                            type="number"
                                            name="price"
                                            id="price"
                                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md  p-2"
                                            placeholder="0.00"
                                          />
                                          <div className="absolute inset-y-0 right-0 flex items-center">
                                            <label
                                              htmlFor="price"
                                              className="sr-only"
                                            >
                                              Price
                                            </label>
                                            <select
                                              id="price"
                                              name="price"
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
                                          htmlFor="weight"
                                          className="block text-sm font-medium text-gray-700"
                                        >
                                          Weight
                                        </label>
                                        <div className="mt-1 relative rounded-md shadow-sm border">
                                          <input
                                            type="text"
                                            name="weight"
                                            id="weight"
                                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md  p-2"
                                            placeholder="0.00"
                                          />
                                          <div className="absolute inset-y-0 right-0 flex items-center">
                                            <label
                                              htmlFor="unit"
                                              className="sr-only"
                                            >
                                              Unit
                                            </label>
                                            <select
                                              id="unit"
                                              name="unit"
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
                                          htmlFor="stock"
                                          className="block text-sm font-medium text-gray-700"
                                        >
                                          In Stock
                                        </label>
                                        <div className="mt-1 relative rounded-md shadow-sm border">
                                          <input
                                            type="text"
                                            name="stock"
                                            id="stock"
                                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md  p-2"
                                            placeholder="0"
                                          />
                                          <div className="absolute inset-y-0 right-0 flex items-center">
                                            <label
                                              htmlFor="unit"
                                              className="sr-only"
                                            >
                                              Unit
                                            </label>
                                            <select
                                              id="unit"
                                              name="unit"
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
                                          htmlFor="first-name"
                                          className="block text-sm font-medium text-gray-700"
                                        >
                                          Color
                                        </label>
                                        <input
                                          type="text"
                                          name="first-name"
                                          id="first-name"
                                          autoComplete="given-name"
                                          placeholder="yellow, orange, red"
                                          className="mt-1 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
                                        />
                                      </div>

                                      <div className="col-span-6 sm:col-span-3">
                                        <label
                                          htmlFor="dimension"
                                          className="block text-sm font-medium text-gray-700"
                                        >
                                          Dimension
                                        </label>
                                        <input
                                          type="dimension"
                                          name="dimension"
                                          id="dimension"
                                          autoComplete="7.87 x 5.31 x 0.79 inches"
                                          placeholder="7.87 x 5.31 x 0.79 inches"
                                          className="mt-1 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
                                        />
                                      </div>

                                      <div className="col-span-6 sm:col-span-3">
                                        <label
                                          htmlFor="size"
                                          className="block text-sm font-medium text-gray-700"
                                        >
                                          Size
                                        </label>
                                        <input
                                          type="text"
                                          name="size"
                                          id="size"
                                          autoComplete="41"
                                          placeholder="41"
                                          className="mt-1 border p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />
                                      </div>

                                      <div className="col-span-6 sm:col-span-3">
                                        <label
                                          htmlFor="users"
                                          className="block text-sm font-medium text-gray-700"
                                        >
                                          Users
                                        </label>
                                        <select
                                          id="users"
                                          name="users"
                                          autoComplete="users"
                                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                          <option>All</option>
                                          <option>Children</option>
                                          <option>Adult</option>
                                        </select>
                                      </div>

                                      <div className="col-span-6 sm:col-span-3">
                                        <label
                                          htmlFor="sex"
                                          className="block text-sm font-medium text-gray-700"
                                        >
                                          Sex
                                        </label>
                                        <select
                                          id="sex"
                                          name="sex"
                                          autoComplete="sex"
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
                        type="submit"
                        className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
