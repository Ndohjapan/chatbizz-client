/* eslint-disable react/prop-types */
import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import FileUpload from "./sub-menus/FileUpload";
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "./sub-menus/ProgressBar";
import ImageSelector from "./sub-menus/ImageSelector";
import { showToast } from "../../slices/authSlice";
import errors from "../../assets/error.json";
import axios from "axios";

const tabs = [
  { id: "Upload", name: "Upload", href: "#", current: true },
  { id: "All", name: "All Files", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function VariantsImageUpload({
  isModalOpen,
  toggleModal,
  updateDisplayImages,
  displayImages,
  IsDrawerOpen
}) {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [tabVal, setTabVal] = useState("Upload");
  const [loading, setLoading] = useState(false);
  const [uploadStarted, setUploadStarted] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [percentages, setPercentages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    setOpen(isModalOpen);
    setTabVal("Upload");
  }, [isModalOpen]);

  const uploadImages = async () => {
    if (selectedFiles.length < 1) {
      return;
    }

    setLoading(true);
    setUploadStarted(true);

    try {
      const uploadPromises = selectedFiles.map((file, index) => {
        const data = new FormData();
        data.append("file", file);
        data.append(
          "upload_preset",
          import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
        );
        data.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);
        data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
        data.append("folder", `chatbizz/users/${userInfo.uid}/products`);

        return new Promise((resolve, reject) => {
          const config = {
            onUploadProgress: (progressEvent) => {
              const progress =
                (progressEvent.loaded / progressEvent.total) * 100;
              updateArrayValue(index, progress);
              updateProgress();
            },
          };

          axios
            .post(
              `https://api.cloudinary.com/v1_1/${
                import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
              }/image/upload`,
              data,
              config
            )
            .then((response) => {
              resolve(response.data);
              console.log(response.data);
            })
            .catch((error) => {
              reject(error);
            });
        });
      });

      await Promise.all(uploadPromises);

      setLoading(false);
      setTimeout(() => {
        setUploadStarted(false);
        setTabVal("All");
        setSelectedFiles([]);
      }, 1000);
    } catch (error) {
      console.log(error);
      dispatch(
        showToast({
          title: errors["title-error"],
          message: "File Upload Error. Try again later",
        })
      );
      setLoading(false);
      setUploadStarted(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setTabVal("Upload");
      toggleModal(false);
    }, 300);
  };

  const updateArrayValue = (index, value) => {
    const newArray = percentages;
    newArray[index] = value;
    setPercentages(newArray);
  };

  const updateProgress = () => {
    const sum = percentages.reduce((acc, curr) => acc + curr, 0);

    const average = sum / percentages.length;

    setProgress(average);
  };

  return (
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
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-80 sm:p-6 md:w-full md:max-w-3xl">
              <div className="border-b border-gray-200">
                <div className="sm:flex sm:items-baseline">
                  <h3 className="text-lg leading-6 font-bold text-gray-900">
                    Files
                  </h3>
                  <div className="mt-4 sm:mt-0 sm:ml-10">
                    <nav className="-mb-px flex space-x-8">
                      {tabs.map((tab) => (
                        <a
                          key={tab.name}
                          onClick={() => {
                            setTabVal(tab.id);
                          }}
                          className={classNames(
                            tabVal === tab.id
                              ? "border-indigo-500 text-indigo-600"
                              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                            "whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm"
                          )}
                          aria-current={tab.current ? "page" : undefined}
                        >
                          {tab.name}
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>
              {(() => {
                switch (tabVal) {
                  case "Upload":
                    return uploadStarted ? (
                      <ProgressBar percentage={progress} />
                    ) : (
                      <FileUpload
                        isDragActive={isDragActive}
                        setIsDragActive={setIsDragActive}
                        selectedFiles={selectedFiles}
                        setSelectedFiles={setSelectedFiles}
                        setPercentages={setPercentages}
                      />
                    );
                  case "All":
                    return (
                      <ImageSelector
                        updateDisplayImages={updateDisplayImages}
                        displayImages={displayImages}
                      />
                    );
                  default:
                    return null;
                }
              })()}
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse px-4 sm:px-6 lg:px-8">
                <button
                  type="button"
                  disabled={loading ? true : false}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={tabVal === "Upload" ? uploadImages : handleClose}
                >
                  {tabVal === "Upload" ? "Upload" : "Select"}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
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
  );
}

export default VariantsImageUpload;
