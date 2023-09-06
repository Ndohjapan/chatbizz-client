import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import { Disclosure } from "@headlessui/react";
import { MinusSmIcon, PlusSmIcon } from "@heroicons/react/outline";
import StatusMoreIcon from "../../assets/StatusMoreIcon";
import { TrashIcon } from "@heroicons/react/outline";
import info from "../../assets/information.json";
import { ImSpinner8 } from "react-icons/im";
import ImageUploadModal from "../store/ImageUploadModal";
import DeleteWarning from "../layout/DeleteWarning";
import UpdateModal from "./sub-menus/UpdateModal";
import ImageUploadIcon from "../../assets/ImageUploadIcon";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function ImagesAndVideo({ product, updateProductFunction }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productImages, setProductImages] = useState(product.images);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdatModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("video");
  const [testimonialImages, setTestimonialImages] = useState(product.testimonials);
  const [buttonSelected, setButtonSelected] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState();


  const toggleModal = (toggle) => {
    setIsModalOpen(toggle);
  };

  const toggleDeleteModal = (toggle) => {
    setIsDeleteModalOpen(toggle);
  };

  const toggleUpdateModal = (toggle) => {
    setIsUpdateModalOpen(toggle);
  };

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
    updateProductFunction({images})
    
  };
  
  const updateTestimonialImages = (testimonials) => {
    setTestimonialImages(testimonials);
    updateProductFunction({testimonials})
  };

  
  const deleteImage = () => {
    let updatedImages = [...productImages];

    updatedImages.splice(selectedImageIndex, 1);
  
    setProductImages(updatedImages);
    
    updateProductFunction({images: updatedImages})
  };

  function getYoutubeEmbedUrl(youtubeUrl) {
    const youtubeRegex =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

    const match = youtubeUrl.match(youtubeRegex);

    if (match) {
      const embed = `https://www.youtube.com/embed/${match[1]}`;
      return embed;
    } else {
      return youtubeUrl;
    }
  }

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
                      <span className="sr-only">{image.public_id}</span>
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
                          selected ? "ring-indigo-500" : "ring-transparent",
                          "absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none"
                        )}
                        aria-hidden="true"
                      />
                    </>
                  )}
                </Tab>
              ))}
              {productImages.length > 0 && (
                <div
                  onClick={() => {
                    setIsModalOpen(true);
                    setButtonSelected("Product");
                  }}
                  className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                >
                  <>
                    <span className="sr-only">Add more</span>
                    <StatusMoreIcon />
                  </>
                </div>
              )}
            </Tab.List>
          </div>

          <Tab.Panels className="w-full aspect-w-1 aspect-h-1 relative">
            <>
              {productImages.length ? (
                <>
                  {productImages.map((image, index) => (
                    <Tab.Panel key={index}>
                      <img
                        src={image.secure_url.replace(
                          "/upload/",
                          "/upload/c_scale,w_500/f_auto/q_auto:eco/"
                        )}
                        alt={image.asset_id}
                        className="w-full h-full object-center object-cover sm:rounded-lg"
                      />
                      <div
                        className="absolute top-3 right-2 w-8  h-4 cursor-pointer"
                        onClick={() => {
                          setSelectedImageIndex(index)
                          setIsDeleteModalOpen(true)
                        }}
                      >
                        <TrashIcon className="text-red-400" />
                      </div>
                    </Tab.Panel>
                  ))}
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
                                    setButtonSelected("Product");
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
                className="pb-6 prose prose-sm grid grid-cols-1 gap-x-4 gap-y-8 sm:gap-x-6"
              >
                {
                  <>
                    <div className="col-span-2 mt-1 flex items-center justify-end">
                      <a
                        href="#"
                        onClick={() => {
                          setIsUpdateModalOpen(true);
                          setSelectedSection("video");
                        }}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Edit videos
                      </a>
                    </div>
                    {isLoading && product.videos.length && (
                      <div className="flex items-center justify-center">
                        <ImSpinner8 className="animate-spin text-center text-2xl text-indigo-600" />
                      </div>
                    )}
                    {product.videos.map((video, index) => (
                      <div
                        key={index}
                        className="col-span-2 aspect-w-16 aspect-h-9 flex justify-center"
                      >
                        <iframe
                          src={getYoutubeEmbedUrl(video)}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          onLoad={loadComplete}
                        ></iframe>
                      </div>
                    ))}
                  </>
                }
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* Testimonial Display */}

        <Disclosure as="div" key={"testimonial-sections"}>
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
                      Testimonials
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      What buyers are saying
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
                    <div className="mt-5 md:mt-0 md:col-span-2">
                      <form className="space-y-6" action="#" method="POST">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Testimonials
                          </label>
                          <div
                            onClick={() => {
                              setIsModalOpen(true);
                              setButtonSelected("Testimonial");
                            }}
                            className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer"
                          >
                            {testimonialImages.length === 0 ? (
                              <>
                                <div className="space-y-1 text-center">
                                  <ImageUploadIcon />
                                  <div className="flex text-sm text-gray-600">
                                    <p className="pl-1">
                                      Upload testimonials or select from
                                      uploaded testimonials
                                    </p>
                                  </div>
                                  <p className="text-xs text-gray-500">
                                    PNG, JPG, JPEG up to 1MB each
                                  </p>
                                </div>
                              </>
                            ) : (
                              <ul
                                role="list"
                                className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
                              >
                                {testimonialImages.map((image) => (
                                  <li key={image.asset_id} className="relative">
                                    <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                                      <img
                                        src={image.secure_url.replace(
                                          "/upload/",
                                          "/upload/c_scale,w_500/f_auto/q_auto:eco/"
                                        )}
                                        alt=""
                                        className="object-cover pointer-events-none group-hover:opacity-75"
                                      />
                                      <button
                                        type="button"
                                        className="absolute inset-0 focus:outline-none"
                                      >
                                        <span className="sr-only">
                                          View details for {image.asset_id}
                                        </span>
                                      </button>
                                    </div>
                                    <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
                                    </p>
                                    <p className="block text-sm font-medium text-gray-500 pointer-events-none">
                                    </p>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      </form>
                    </div>
                  </>
                }
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>

      {isUpdatModalOpen ? (
        <UpdateModal
          toggleModal={toggleUpdateModal}
          section={selectedSection}
          productInfo={product}
          updateProductFnc={updateProductFunction}
        />
      ) : (
        <></>
      )}

      {isModalOpen ? (
        <ImageUploadModal
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
          updateDisplayImages={
            buttonSelected === "Product"
              ? updateProductImages
              : updateTestimonialImages
          }
          displayImages={
            buttonSelected === "Product" ? productImages : testimonialImages
          }
          headerText={buttonSelected === "Product" ? "Files" : "Testimonials"}
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
          deleteFunction={deleteImage}
        />
      ) : (
        <></>
      )}
    </>
  );
}
