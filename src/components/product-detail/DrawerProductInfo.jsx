import { useState } from "react";
import info from "../../assets/information.json";
import { MinusSmIcon, PlusSmIcon } from "@heroicons/react/outline";
import { Disclosure } from "@headlessui/react";
import UpdateModal from "./sub-menus/UpdateModal";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const currencies = {"NGN": "₦", "USD": "$", "GBP": "£", "EUR": "€", "CAD": "CAD"}

export default function DrawerProductInfo({variant, updateVariantFnc}) {
  const [isUpdatModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("name");

  const toggleUpdateModal = (toggle) => {
    setIsUpdateModalOpen(toggle);
  };

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
                              {variant.name}
                            </span>
                            <span className="ml-4 flex-shrink-0">
                              <button
                                type="button"
                                onClick={() => {
                                  setIsUpdateModalOpen(true);
                                  setSelectedSection("name");
                                }}
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
                              {variant.description}
                            </span>
                            <span className="ml-4 flex-shrink-0">
                              <button
                                type="button"
                                onClick={() => {
                                  setIsUpdateModalOpen(true);
                                  setSelectedSection("description");
                                }}
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
                            <span className="flex-grow">{currencies[variant.currency] + variant.price}</span>
                            <span className="ml-4 flex-shrink-0">
                              <button
                                type="button"
                                onClick={() => {
                                  setIsUpdateModalOpen(true);
                                  setSelectedSection("more");
                                }}
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
                            {variant.stock + " "}
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                {variant.stockUnit}
                              </span>{" "}
                            </span>
                            <span className="ml-4 flex-shrink-0">
                              <button
                                type="button"
                                onClick={() => {
                                  setIsUpdateModalOpen(true);
                                  setSelectedSection("more");
                                }}
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
                              {variant.features}
                            </span>
                            <span className="ml-4 flex-shrink-0">
                              <button
                                type="button"
                                onClick={() => {
                                  setIsUpdateModalOpen(true);
                                  setSelectedSection("features");
                                }}
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
                                {variant.colors.map((color, index) => (
                                  <li key={index}> {color}</li>
                                ))}
                              </ul>
                            </span>
                            <span className="ml-4 flex-shrink-0">
                              <button
                                type="button"
                                onClick={() => {
                                  setIsUpdateModalOpen(true);
                                  setSelectedSection("color");
                                }}
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
                              {variant.sizes.map((size, index) => (
                                  <li key={index}> {size}</li>
                                ))}
                              </ul>
                            </span>
                            <span className="ml-4 flex-shrink-0">
                              <button
                                type="button"
                                onClick={() => {
                                  setIsUpdateModalOpen(true);
                                  setSelectedSection("size");
                                }}
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
                            <span className="flex-grow"> {variant.weight ? variant.weight + " "+ variant.weightUnit: 0 +" "+ variant.weightUnit}</span>
                            <span className="ml-4 flex-shrink-0">
                              <button
                                type="button"
                                onClick={() => {
                                  setIsUpdateModalOpen(true);
                                  setSelectedSection("more");
                                }}
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
                              {variant.dimensions}
                            </span>
                            <span className="ml-4 flex-shrink-0">
                              <button
                                type="button"
                                onClick={() => {
                                  setIsUpdateModalOpen(true);
                                  setSelectedSection("more");
                                }}
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
                            <span className="flex-grow"> {variant.users} </span>
                            <span className="ml-4 flex-shrink-0">
                              <button
                                type="button"
                                onClick={() => {
                                  setIsUpdateModalOpen(true);
                                  setSelectedSection("more");
                                }}
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
                            <span className="flex-grow"> {variant.sex}</span>
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

      {isUpdatModalOpen ? (
        <UpdateModal
          toggleModal={toggleUpdateModal}
          section={selectedSection}
          productInfo={variant}
          updateProductFnc={updateVariantFnc}
        />
      ) : (
        <></>
      )}
    </>
  )
}
