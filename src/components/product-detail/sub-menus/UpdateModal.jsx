import { TrashIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { PiYoutubeLogoThin } from "react-icons/pi";
import info from "../../../assets/information.json";
import { VscSymbolColor } from "react-icons/vsc";
import TShirtSizeIcon from "../../../assets/TShirtSizeIcon";
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function UpdateModal({ toggleModal, section, productInfo }) {
  const [links, setLinks] = useState(productInfo.videos);
  const [colors, setColors] = useState(productInfo.colors);
  const [sizes, setSizes] = useState(productInfo.sizes);

  const [open, setOpen] = useState(true);

  const cancelButtonRef = useRef(null);

  const addLink = (e) => {
    e.preventDefault();
    setLinks([...links, ""]);
  };

  const removeLink = (index) => {
    const updatedLinks = [...links];
    updatedLinks.splice(index, 1);
    setLinks(updatedLinks);
  };

  const addColor = (e) => {
    e.preventDefault();
    setColors([...colors, ""]);
  };

  const removeColor = (index) => {
    const updatedColors = [...colors];
    updatedColors.splice(index, 1);
    setColors(updatedColors);
  };

  const addSize = (e) => {
    e.preventDefault();
    setSizes([...sizes, ""]);
  };

  const removeSize = (index) => {
    const updatedSizes = [...sizes];
    updatedSizes.splice(index, 1);
    setSizes(updatedSizes);
  };

  const handleLinkChange = (index, value) => {
    const updatedLinks = [...links];
    updatedLinks[index] = value;
    setLinks(updatedLinks);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      toggleModal(false);
    }, 500);
  };

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={handleClose}
        >
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-lg w-full md:max-w-2xl lg:max-w-4xl">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="space-y-6">
                      {/* Basic information */}

                      {(() => {
                        switch (section) {
                          case "name":
                            return (
                              <>
                                <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
                                  <div className="md:grid md:grid-cols-3 md:gap-6">
                                    <div className="md:col-span-1">
                                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                                        Product Name
                                      </h3>
                                      <p className="mt-1 text-sm text-gray-500">
                                        Providing more information will make the
                                        bot more human-friendly.
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
                                            Product Name{" "}
                                            <span className="text-red-400 font-bold">
                                              *
                                            </span>
                                          </label>
                                          <div className="mt-1">
                                            <textarea
                                              id="name"
                                              name="name"
                                              rows={7}
                                              required
                                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                                              placeholder={
                                                info.products[0].name
                                              }
                                              defaultValue={
                                                productInfo.name
                                              }
                                            />
                                          </div>
                                          <p className="mt-2 text-sm text-gray-500">
                                            Provide enough details in the
                                            product name
                                          </p>
                                        </div>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                              </>
                            );
                          case "description":
                            return (
                              <>
                                <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
                                  <div className="md:grid md:grid-cols-3 md:gap-6">
                                    <div className="md:col-span-1">
                                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                                        Product Descripiton
                                      </h3>
                                      <p className="mt-1 text-sm text-gray-500">
                                        Providing more information will make the
                                        bot more human-friendly.
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
                                            htmlFor="description"
                                            className="block text-sm font-medium text-gray-700"
                                          >
                                            Product Description
                                          </label>
                                          <div className="mt-1">
                                            <textarea
                                              id="description"
                                              name="description"
                                              rows={12}
                                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                                              placeholder={
                                                info.products[0].description
                                              }
                                              defaultValue={
                                                productInfo.description
                                              }
                                            />
                                          </div>
                                          <p className="mt-2 text-sm text-gray-500">
                                            Give full description of the product
                                          </p>
                                        </div>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                              </>
                            );
                          case "features":
                            return (
                              <>
                                <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
                                  <div className="md:grid md:grid-cols-3 md:gap-6">
                                    <div className="md:col-span-1">
                                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                                        Features / Benefits
                                      </h3>
                                      <p className="mt-1 text-sm text-gray-500">
                                        Providing more information will make the
                                        bot more human-friendly.
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
                                              rows={12}
                                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                                              placeholder={
                                                info.products[0].feature
                                              }
                                              defaultValue={
                                                productInfo.feature
                                              }
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
                              </>
                            );
                          case "video":
                            return (
                              <>
                                <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
                                  <div className="md:grid md:grid-cols-3 md:gap-6">
                                    <div className="md:col-span-1">
                                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                                        Video
                                      </h3>
                                      <p className="mt-1 text-sm text-gray-500">
                                        Insert links to youtube videos of the
                                        product
                                      </p>
                                    </div>
                                    <div className="mt-5 md:mt-0 md:col-span-2">
                                      <form action="#" method="POST">
                                        <div className="grid grid-cols-6 gap-6 mt-3">
                                          {links.map((link, index) => (
                                            <div
                                              className="col-span-6 sm:col-span-5"
                                              key={index}
                                            >
                                              <label
                                                htmlFor={`link-${index}`}
                                                className="block text-sm font-medium text-gray-700"
                                              >
                                                {"Youtube Link " + (index + 1)}
                                              </label>
                                              <div className="mt-1 relative rounded-md shadow-sm border">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                  <span className="text-gray-500 sm:text-sm">
                                                    <PiYoutubeLogoThin className="text-3xl" />
                                                  </span>
                                                </div>
                                                <input
                                                  type="url"
                                                  name={`link-${index}`}
                                                  id={`link-${index}`}
                                                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-16 sm:pl-14 sm:text-sm border-gray-300 rounded-md p-2"
                                                  placeholder="https://youtube.com/"
                                                  defaultValue={link}
                                                  onChange={(e) => {
                                                    handleLinkChange(
                                                      index,
                                                      e.target.value
                                                    );
                                                  }}
                                                />
                                                {index === 0 ? (
                                                  <></>
                                                ) : (
                                                  <button
                                                    type="button"
                                                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                                    onClick={() =>
                                                      removeLink(index)
                                                    }
                                                  >
                                                    <TrashIcon
                                                      className="h-5 w-5 text-red-400"
                                                      aria-hidden="true"
                                                    />
                                                  </button>
                                                )}
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                        <div className="mt-3">
                                          <button
                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            onClick={addLink}
                                          >
                                            + Link
                                          </button>
                                        </div>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                              </>
                            );
                          case "color":
                            return (
                              <>
                                <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
                                  <div className="md:grid md:grid-cols-3 md:gap-6">
                                    <div className="md:col-span-1">
                                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                                        Colors
                                      </h3>
                                      <p className="mt-1 text-sm text-gray-500">
                                        Insert different colors of your poduct
                                        available
                                      </p>
                                    </div>
                                    <div className="mt-5 md:mt-0 md:col-span-2">
                                      <form action="#" method="POST">
                                        <div className="grid grid-cols-6 gap-6 mt-3">
                                          {colors.map((link, index) => (
                                            <div
                                              className="col-span-6 sm:col-span-5"
                                              key={`color-${index}`}
                                            >
                                              <label
                                                htmlFor={`color-${index}`}
                                                className="block text-sm font-medium text-gray-700"
                                              >
                                                {"Color " + (index + 1)}
                                              </label>
                                              <div className="mt-1 relative rounded-md shadow-sm border">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                  <span className="text-gray-400 sm:text-sm">
                                                    <VscSymbolColor className="text-3xl" />
                                                  </span>
                                                </div>
                                                <input
                                                  type="text"
                                                  name={`color-${index}`}
                                                  id={`color-${index}`}
                                                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-16 sm:pl-14 sm:text-sm border-gray-300 rounded-md p-2"
                                                  placeholder="Red, Oraange, Wine red, metallic brown"
                                                  defaultValue={link}
                                                />
                                                {index === 0 ? (
                                                  <></>
                                                ) : (
                                                  <button
                                                    type="button"
                                                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                                    onClick={() =>
                                                      removeColor(index)
                                                    }
                                                  >
                                                    <TrashIcon
                                                      className="h-5 w-5 text-red-400"
                                                      aria-hidden="true"
                                                    />
                                                  </button>
                                                )}
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                        <div className="mt-3">
                                          <button
                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            onClick={addColor}
                                          >
                                            + Color
                                          </button>
                                        </div>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                              </>
                            );
                          case "size":
                            return (
                              <>
                                <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
                                  <div className="md:grid md:grid-cols-3 md:gap-6">
                                    <div className="md:col-span-1">
                                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                                        Sizes
                                      </h3>
                                      <p className="mt-1 text-sm text-gray-500">
                                        Insert various sizes of your product
                                        available
                                      </p>
                                    </div>
                                    <div className="mt-5 md:mt-0 md:col-span-2">
                                      <form action="#" method="POST">
                                        <div className="grid grid-cols-6 gap-6 mt-3">
                                          {sizes.map((link, index) => (
                                            <div
                                              className="col-span-6 sm:col-span-5"
                                              key={`size-${index}`}
                                            >
                                              <label
                                                htmlFor={`size-${index}`}
                                                className="block text-sm font-medium text-gray-700"
                                              >
                                                {"Size " + (index + 1)}
                                              </label>
                                              <div className="mt-1 relative rounded-md shadow-sm border">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                  <span className="text-gray-500 sm:text-sm">
                                                    <TShirtSizeIcon className="" />
                                                  </span>
                                                </div>
                                                <input
                                                  type="text"
                                                  name={`size-${index}`}
                                                  id={`size-${index}`}
                                                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-16 sm:pl-14 sm:text-sm border-gray-300 rounded-md p-2"
                                                  placeholder="S, M, L, XL, XXL, 38, 41"
                                                  defaultValue={link}
                                                />
                                                {index === 0 ? (
                                                  <></>
                                                ) : (
                                                  <button
                                                    type="button"
                                                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                                    onClick={() =>
                                                      removeSize(index)
                                                    }
                                                  >
                                                    <TrashIcon
                                                      className="h-5 w-5 text-red-400"
                                                      aria-hidden="true"
                                                    />
                                                  </button>
                                                )}
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                        <div className="mt-3">
                                          <button
                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            onClick={addSize}
                                          >
                                            + Size
                                          </button>
                                        </div>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                              </>
                            );
                          case "more":
                            return (
                              <>
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
                                                defaultValue={productInfo.price}
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
                                                type="number"
                                                name="weight"
                                                id="weight"
                                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md  p-2"
                                                placeholder="0.00"
                                                defaultValue={productInfo.weight}
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
                                                type="number"
                                                name="stock"
                                                id="stock"
                                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md  p-2"
                                                placeholder="0"
                                                defaultValue={productInfo.stock}
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
                                              defaultValue={productInfo.dimension}
                                              className="mt-1 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
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
                                              defaultValue={productInfo.users}
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
                                              defaultValue={productInfo.sex}
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
                              </>
                            );
                          default:
                            return null;
                        }
                      })()}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleClose}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleClose}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
