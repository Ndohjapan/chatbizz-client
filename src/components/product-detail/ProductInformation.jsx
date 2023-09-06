import { useState } from "react";
import images from "../../assets/images.json";
import info from "../../assets/information.json";
import { MinusSmIcon, PlusSmIcon, TrashIcon } from "@heroicons/react/outline";
import { Disclosure } from "@headlessui/react";
import StatusMoreIcon from "../../assets/StatusMoreIcon";
import { v4 as uuidv4 } from "uuid";
import CreateVariantDrawer from "../../components/store/CreateVariantDrawer";
import VariantDrawer from "./VariantDrawer";
import DeleteWarning from "../layout/DeleteWarning";
import UpdateModal from "./sub-menus/UpdateModal";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const currencies = { NGN: "₦", USD: "$", GBP: "£", EUR: "€", CAD: "CAD" };

export default function ProductInformation({ product, updateProductFnc }) {
  const [drawerProductOpen, setDrawerProductOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState("");
  const [drawerNewVariantOpen, setDrawerNewVariantOpen] = useState(false);
  const [stateVariants, setStateVariants] = useState(product.variants);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdatModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("name");
  const [selectedVariantIndex, setSelectedVariantIndex] = useState();

  const toggleProductDrawer = (toggle) => {
    setDrawerProductOpen(toggle);
  };

  const toggleDeleteModal = (toggle) => {
    setIsDeleteModalOpen(toggle);
  };

  const toggleNewVariantDrawer = (toggle) => {
    setDrawerNewVariantOpen(toggle);
  };

  const toggleUpdateModal = (toggle) => {
    setIsUpdateModalOpen(toggle);
  };

  const createVariant = (newVariant) => {
    newVariant.id = uuidv4();
    setStateVariants([...stateVariants, newVariant]);
  };

  const updateSelectedVariant = (update) => {
    console.log(update);
    let updatedVariants = [...stateVariants];
    
    updatedVariants[selectedVariantIndex] = update;
    
    setStateVariants(updatedVariants);
    updateProductFnc({variants: updatedVariants});    
    console.log(updatedVariants);
  }

  const updateVariant = (updatedVariant) => {
    const update = stateVariants.map((variant) => {
      if (variant.id === updatedVariant.id) {
        return {
          ...variant,
          ...updatedVariant,
        };
      }
      return variant;
    });

    setStateVariants(update);
    updateProductFnc({variants: update})
  };

  const deleteVariant = (idToDelete) => {
    const update = stateVariants.filter((variant) => variant.id !== idToDelete);
    setStateVariants(update);
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
                            <span className="flex-grow">{product.name}</span>
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
                              {product.description}
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
                            <span className="flex-grow">
                              {currencies[product.currency] + product.price}
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
                            In Stock
                          </dt>
                          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">
                              {product.stock + " "}
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                {product.stockUnit}
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
                              {product.features}
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
                                {product.colors.map((color, index) => (
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
                                {product.sizes.map((size, index) => (
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
                            <span className="flex-grow">
                              {" "}
                              {product.weight
                                ? product.weight + " " + product.weightUnit
                                : 0 + " " + product.weightUnit}
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
                            Dimension
                          </dt>
                          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <span className="flex-grow">
                              {" "}
                              {product.dimensions}
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
                            <span className="flex-grow"> {product.users} </span>
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
                            <span className="flex-grow"> {product.sex}</span>
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
                      </dl>
                    </div>
                  </div>
                </>
              }
            </Disclosure.Panel>

            <div className="mt-5 md:mt-0 md:col-span-2">
              <form className="space-y-6" action="#" method="POST">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Variants
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    {stateVariants.length === 0 ? (
                      <>
                        <div
                          className="space-y-1 text-center cursor-pointer"
                          onClick={() => setDrawerNewVariantOpen(true)}
                        >
                          <StatusMoreIcon />
                          <div className="flex text-sm text-gray-600">
                            <p className="pl-1">
                              Crates variants of the same product.
                            </p>
                          </div>
                          <p className="text-xs text-gray-500">
                            Shoes, Clothes, Electronics, Kitchenwares
                          </p>
                        </div>
                      </>
                    ) : (
                      <ul
                        role="list"
                        className="grid grid-cols-5 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-6 xl:gap-x-8"
                      >
                        {stateVariants.map((variant, index) => (
                          <li key={index} className="relative">
                            <div
                              className="absolute -top-3 -right-2 w-4 h-4 cursor-pointer"
                              onClick={() => {
                                setIsDeleteModalOpen(true)
                              }}
                            >
                              <TrashIcon className="text-red-400" />
                            </div>
                            <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg  focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                              <img
                                src={
                                  variant.image
                                    ? variant.image.replace(
                                        "/upload/",
                                        "/upload/c_scale,w_500/f_auto/q_auto:eco/"
                                      )
                                    : images.icons.box
                                }
                                alt=""
                                onClick={() => {
                                  setDrawerProductOpen(true);
                                  setSelectedVariant(variant._id);
                                  setSelectedVariantIndex(index);
                                }}
                                className="object-cover object-center group-hover:opacity-75 w-full h-full cursor-pointer"
                                style={{
                                  maxHeight: "50px",
                                  maxWidth: "50px",
                                  minHeight: "50px",
                                  minWidth: "50px",
                                }}
                              />
                            </div>
                            <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
                              {variant.colors
                                ? variant.colors[0]
                                : variant.name}
                            </p>
                            <p className="block text-sm font-medium text-gray-500 pointer-events-none">
                              {variant.sizes
                                ? variant.sizes[0]
                                : variant.features}
                            </p>
                          </li>
                        ))}

                        <li
                          className="space-y-1 text-center cursor-pointer"
                          onClick={() => {
                            setDrawerNewVariantOpen(true);
                          }}
                        >
                          <StatusMoreIcon />
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </>
        )}
      </Disclosure>

      {isUpdatModalOpen ? (
        <UpdateModal
          toggleModal={toggleUpdateModal}
          section={selectedSection}
          productInfo={product}
          updateProductFnc={updateProductFnc}
        />
      ) : (
        <></>
      )}

      {drawerProductOpen ? (
        <VariantDrawer
          toggleDrawer={toggleProductDrawer}
          productId={product._id}
          variantId={selectedVariant}
          updateVariantInfo={updateSelectedVariant}
        />
      ) : (
        <></>
      )}
      {drawerNewVariantOpen ? (
        <CreateVariantDrawer
          IsDrawerOpen={drawerNewVariantOpen}
          toggleDrawer={toggleNewVariantDrawer}
          createVariant={createVariant}
          updateVariant={updateVariant}
          variant={stateVariants}
        />
      ) : (
        <></>
      )}
      {isDeleteModalOpen ? (
        <DeleteWarning
          header={info.delete.variant.header}
          message={info.delete.variant.message}
          buttonText={info.delete.variant.buttonText}
          toggleModal={toggleDeleteModal}
        />
      ) : (
        <></>
      )}
    </>
  );
}
