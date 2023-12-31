import { useState } from "react";
import ImageUploadModal from "./ImageUploadModal";
import CreateVariantDrawer from "./CreateVariantDrawer";
import { TrashIcon } from "@heroicons/react/outline";
import StatusMoreIcon from "../../assets/StatusMoreIcon";
import ImageUploadIcon from "../../assets/ImageUploadIcon";
import info from "../../assets/information.json";
import { PiYoutubeLogoThin } from "react-icons/pi";
import { VscSymbolColor } from "react-icons/vsc";
import images from "../../assets/images.json";
import { v4 as uuidv4 } from "uuid";
import TShirtSizeIcon from "../../assets/TShirtSizeIcon";
import { useDispatch, useSelector } from "react-redux";
import { useCreateProductMutation } from "../../slices/userApiSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { logout, showToast } from "../../slices/authSlice";
import errors from "../../assets/error.json";
import { ImSpinner8 } from "react-icons/im";

function NewProductForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [IsDrawerOpen, setIsDrawerOpen] = useState(false);
  const [stateVariants, setStateVariants] = useState([]);
  const [selectedVariant, setSelectVariant] = useState({});
  const [displayImages, setDisplayImages] = useState([]);
  const [links, setLinks] = useState([""]);
  const [colors, setColors] = useState([""]);
  const [sizes, setSizes] = useState([""]);
  const [ytErrors, setYtErrors] = useState({});
  const location = useLocation();

  const [createProductMutation, { isLoading }] = useCreateProductMutation();
  const twk = useSelector((state) => state.auth.twk);

  const selectedStore = useSelector((state) => state.auth.selectedStore);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    const newErrors = { ...ytErrors };
    const youtubeRegex =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

    if (!youtubeRegex.test(value)) {
      newErrors[index] = true;
      setYtErrors(newErrors);
    } else {
      newErrors[index] = false;
      setYtErrors(newErrors);
      updatedLinks[index] = value;
      setLinks(updatedLinks);
    }
  };

  const handleColorChange = (index, value) => {
    const updatedColors = [...colors];
    updatedColors[index] = value;
    setColors(updatedColors);
  };

  const handleSizeChange = (index, value) => {
    const updatedSizes = [...sizes];
    updatedSizes[index] = value;
    setSizes(updatedSizes);
  };

  const toggleModal = (toggle) => {
    setIsModalOpen(toggle);
  };

  const toggleDrawer = (toggle) => {
    setIsDrawerOpen(toggle);
  };

  const updateDisplayImages = (images) => {
    setDisplayImages(images);
  };

  const createVariant = (newVariant) => {
    newVariant.index = uuidv4();
    setStateVariants([...stateVariants, newVariant]);
  };

  const updateVariant = (updatedVariant) => {
    const update = stateVariants.map((variant) => {
      if (variant.index === updatedVariant.index) {
        return {
          ...variant,
          ...updatedVariant,
        };
      }
      return variant;
    });

    setStateVariants(update);
  };

  const deleteVariant = (idToDelete) => {
    const update = stateVariants.filter((variant) => variant.index !== idToDelete);
    setStateVariants(update);
  };

  const createProduct = async () => {
    const url = location.pathname.match(/store\/([^/]*)/);

    const storeId = selectedStore ? selectedStore : url[1];

    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const features = document.getElementById("features").value;
    const store = `${storeId}`;
    const images = displayImages;
    const videos = links[0] ? links : [];
    colors;
    sizes;
    const price = document.getElementById("price").value;
    const currency = document.getElementById("currency").value;
    const weight = document.getElementById("weight").value;
    const weightUnit = document.getElementById("weight-unit").value;
    const stock = document.getElementById("stock").value;
    const stockUnit = document.getElementById("stock-unit").value;
    const dimensions = document.getElementById("dimensions").value;
    const users = document.getElementById("users").value;
    const sex = document.getElementById("sex").value;
    const variants = stateVariants;

    const product = {
      name,
      store,
      description,
      features,
      images,
      videos,
      colors,
      sizes,
      price,
      currency,
      weight: weight.length ? weight : undefined,
      weightUnit,
      stock: stock.length ? stock : undefined,
      stockUnit,
      dimensions,
      users,
      sex,
      variants,
    };

    try {
      const res = await createProductMutation({ token: twk, product });
      if (res.error) throw Error(JSON.stringify(res.error));
      dispatch(showToast({ message: info["product-created"] }));
      navigate(`/store/${storeId}`);
    }  catch (error) {
      const message = JSON.parse(error.message);
      if (message.status === 401) {
        dispatch(logout());
        navigate("/login");
      }

      if (message && message.data && message.data.validationErrors) {
        const validationErrors = message.data.validationErrors;
        const errorMessage = Object.values(validationErrors).join("\n, ");
        dispatch(
          showToast({
            title: errors["title-error"],
            message: errorMessage,
          })
        );
      } else if (message && message.data && message.data.message) {
        const errorMessage = message.data.message;
        dispatch(
          showToast({
            title: errors["title-error"],
            message: errorMessage,
          })
        );
      } else {
        dispatch(
          showToast({
            title: errors["title-error"],
            message: errors["error-signin"],
          })
        );
      }
    }

  };

  return (
    <>
      <div className="space-y-6">
        {/* Basic information */}

        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Product Info
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Providing more information will make the bot more
                human-friendly.
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form className="space-y-6" action="#" method="POST">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Product Name{" "}
                    <span className="text-red-400 font-bold">*</span>
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="name"
                      name="name"
                      rows={3}
                      required
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                      placeholder={info.products[0].name}
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Provide enough details in the product name
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Product Description{" "}
                    <span className="text-red-400 font-bold">*</span>
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                      placeholder={info.products[0].description}
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Give full description of the product
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="features"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Features / Benefits{" "}
                    <span className="text-red-400 font-bold">*</span>
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="features"
                      name="features"
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                      placeholder={info.products[0].feature}
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

        {/* Image selction */}

        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Product Images
              </h3>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form className="space-y-6" action="#" method="POST">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Images
                  </label>
                  <div
                    onClick={() => setIsModalOpen(true)}
                    className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer"
                  >
                    {displayImages.length === 0 ? (
                      <>
                        <div className="space-y-1 text-center">
                          <ImageUploadIcon />
                          <div className="flex text-sm text-gray-600">
                            <p className="pl-1">
                              Upload images or select from uploaded images
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
                        {displayImages.map((image) => (
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
                                  View details for {image.title}
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
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Video links */}

        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Video
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Insert links to youtube videos of the product
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form action="#" method="POST">
                <div className="grid grid-cols-6 gap-6 mt-3">
                  {links.map((link, index) => (
                    <div className="col-span-6 sm:col-span-5" key={index}>
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
                            handleLinkChange(index, e.target.value);
                          }}
                        />
                        {index === 0 ? (
                          <></>
                        ) : (
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                            onClick={() => removeLink(index)}
                          >
                            <TrashIcon
                              className="h-5 w-5 text-red-400"
                              aria-hidden="true"
                            />
                          </button>
                        )}
                      </div>
                      {ytErrors[index] && (
                        <p className="text-red-500 text-sm mt-1">
                          Invalid Youtube Link
                        </p>
                      )}
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

        {/* Color input */}

        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Colors
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Insert different colors of your poduct available
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
                          onChange={(e) => {
                            handleColorChange(index, e.target.value);
                          }}
                        />
                        {index === 0 ? (
                          <></>
                        ) : (
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                            onClick={() => removeColor(index)}
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

        {/* Size input */}

        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Sizes
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Insert various sizes of your product available
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
                          onChange={(e) => {
                            handleSizeChange(index, e.target.value);
                          }}
                        />
                        {index === 0 ? (
                          <></>
                        ) : (
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                            onClick={() => removeSize(index)}
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

        {/* More information */}

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
                      Price{" "}
                    <span className="text-red-400 font-bold">*</span>
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
                        <label htmlFor="price" className="sr-only">
                          Price
                        </label>
                        <select
                          id="currency"
                          name="currency"
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
                      htmlFor="stock"
                      className="block text-sm font-medium text-gray-700"
                    >
                      In Stock{" "}
                    <span className="text-red-400 font-bold">*</span>
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm border">
                      <input
                        type="number"
                        name="stock"
                        id="stock"
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md  p-2"
                        placeholder="0"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center">
                        <label htmlFor="unit" className="sr-only">
                          Unit
                        </label>
                        <select
                          id="stock-unit"
                          name="stock-unit"
                          className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                        >
                          <option>Cartons</option>
                          <option>Units</option>
                          <option>Pallete</option>
                          <option>Pieces</option>
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
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center">
                        <label htmlFor="unit" className="sr-only">
                          Unit
                        </label>
                        <select
                          id="weight-unit"
                          name="weight-unit"
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
                      htmlFor="dimensions"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Dimension
                    </label>
                    <input
                      type="dimensions"
                      name="dimensions"
                      id="dimensions"
                      autoComplete="7.87 x 5.31 x 0.79 inches"
                      placeholder="7.87 x 5.31 x 0.79 inches"
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

        {/* Variants */}

        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Variants
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Describe to customers the various types of this product.
              </p>
            </div>
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
                          onClick={() => setIsDrawerOpen(true)}
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
                        {stateVariants.map((variant) => (
                          <li key={variant.index} className="relative">
                            <div
                              className="absolute -top-3 -right-2 w-4 h-4 cursor-pointer"
                              onClick={() => {
                                deleteVariant(variant.index);
                              }}
                            >
                              <TrashIcon className="text-red-400" />
                            </div>
                            <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg  focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                              <img
                                src={
                                  variant.images[0]
                                    ? variant.images[0].secure_url.replace(
                                        "/upload/",
                                        "/upload/c_scale,w_500/f_auto/q_auto:eco/"
                                      )
                                    : images.icons.box
                                }
                                alt=""
                                onClick={() => {
                                  setSelectVariant(variant);
                                  setIsDrawerOpen(true);
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
                              {variant.color}
                            </p>
                            <p className="block text-sm font-medium text-gray-500 pointer-events-none">
                              {variant.size}
                            </p>
                          </li>
                        ))}

                        <li
                          className="space-y-1 text-center cursor-pointer"
                          onClick={() => {
                            setSelectVariant({});
                            setIsDrawerOpen(true);
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
          </div>
        </div>

        <div className="flex justify-end p-6 pt-0 sm:rounded-lg">
          <button
            type="button"
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          {isLoading ? (
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled
            >
              <ImSpinner8 className="animate-spin text-gray-400" />
            </button>
          ) : (
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={createProduct}
            >
              Save
            </button>
          )}
        </div>
      </div>
      {isModalOpen ? (
        <ImageUploadModal
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
          updateDisplayImages={updateDisplayImages}
          displayImages={displayImages}
        />
      ) : (
        <></>
      )}
      {IsDrawerOpen ? (
        <CreateVariantDrawer
          IsDrawerOpen={IsDrawerOpen}
          toggleDrawer={toggleDrawer}
          variant={selectedVariant}
          createVariant={createVariant}
          updateVariant={updateVariant}
        />
      ) : (
        <></>
      )}
    </>
  );
}

export default NewProductForm;
