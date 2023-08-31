import { useEffect, useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, showToast } from "../../../slices/authSlice";
import errors from "../../../assets/error.json";
import { useGetImagesMutation } from "../../../slices/userApiSlice";
import { ImSpinner8 } from "react-icons/im";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// eslint-disable-next-line react/prop-types
export default function ImageSelector({ updateDisplayImages, displayImages }) {
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImageIds, setSelectedImageIds] = useState([]);
  const [apiCallDone, setApiCallDone] = useState(false);
  const [getImagesMutation, { isLoading }] = useGetImagesMutation();
  const twk = useSelector((state) => state.auth.twk);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedImages.length === 0) {
      setSelectedImages(displayImages);
    } else {
      updateDisplayImages(selectedImages);
    }
    const preSelectedImageIds = displayImages.map((image) => image.asset_id);
    setSelectedImageIds(preSelectedImageIds);

    const handleGetImages = async () => {
      try {
        const res = await getImagesMutation({ token: twk });
        if (res.error) throw Error(JSON.stringify(res.error));
        console.log(res.data);
        setImages(res.data.resources);
        return res.data;
      } catch (error) {
        const message = JSON.parse(error.message);

        if (message.status === 401) {
          dispatch(logout());
          navigate("/login");
        }

        const errorMessage = message.data.message;
        dispatch(
          showToast({
            title: errors["title-error"],
            message: errorMessage,
          })
        );
      }
    };

    if (!apiCallDone) {
      setApiCallDone(true);
      handleGetImages();
    }
  }, [displayImages, selectedImages]);

  const handleImagesToggle = async (image) => {
    await setSelectedImages((prevSelected) => {
      if (
        prevSelected.findIndex(
          (subsetObj) => subsetObj.asset_id === image.asset_id
        ) !== -1
      ) {
        return prevSelected.filter((list) => list.asset_id !== image.asset_id);
      } else {
        return [...prevSelected, image];
      }
    });
  };

  const handleClearSelection = () => {
    setSelectedImages([]);
    updateDisplayImages([]);
  };

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div>
          <h1 className="text-base font-medium text-gray-900">
            Select Image(s)
          </h1>
          {isLoading ? (
            <>
            <div className="my-7 flex items-center justify-center">
            <ImSpinner8 className="text-5xl animate-spin text-gray-400" />
          </div>
            </>
          ) : (
            <ul
              role="list"
              className="mt-4 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8 max-h-96 overflow-y-scroll"
            >
              {images.map((image, index) => (
                <li
                  key={index}
                  onClick={() => handleImagesToggle(image)}
                  className={classNames(
                    "relative bg-white border rounded-lg shadow-sm p-0 flex justify-center flex-col cursor-pointer focus:outline-none",
                    selectedImageIds.includes(image.asset_id)
                      ? "border-indigo-500 ring-2 ring-indigo-500"
                      : "border-gray-300"
                  )}
                >
                  <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden">
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
                        View details for {image.public_id}
                      </span>
                    </button>
                  </div>
                  {selectedImageIds.includes(image.asset_id) && (
                    <CheckCircleIcon
                      className="absolute right-2 top-2 h-5 w-5 text-indigo-600"
                      aria-hidden="true"
                    />
                  )}
                  <div
                    className={classNames(
                      "border-2",
                      selectedImageIds.includes(image.asset_id)
                        ? "border-indigo-500"
                        : "border-transparent",
                      "absolute -inset-px rounded-lg pointer-events-none"
                    )}
                    aria-hidden="true"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
        {selectedImages.length > 0 && (
          <button
            type="button"
            className="mt-4 w-full border-2 border-indigo-500 rounded-lg p-4 text-center hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleClearSelection}
          >
            Clear Selection
          </button>
        )}
      </div>
    </>
  );
}
