import { useDispatch, useSelector } from "react-redux";
import { useCreateStoreMutation } from "../../slices/userApiSlice";
import { showToast, logout } from "../../slices/authSlice";
import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/solid";
import StoreTypes from "./sub-menu/StoreTypes";
import StoreInformation from "./sub-menu/StoreInformation";
import QRCodeView from "./sub-menu/QRCodeView";
import { ImSpinner8 } from "react-icons/im";
import errors from "../../assets/error.json";
import info from "../../assets/information.json";
import { useNavigate } from "react-router-dom";

const steps = [
  { name: "Step 1", href: "#", status: "complete", num: 1 },
  { name: "Step 2", href: "#", status: "current", num: 2 },
  { name: "Step 3", href: "#", status: "upcoming", num: 3 },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// eslint-disable-next-line react/prop-types
function CreateStoreModal({ isModalOpen, toggleModal }) {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [stepNum, setStepNum] = useState(1);

  const newStoreName = useSelector((state) => state.auth.newStoreName);
  const newStoreWANum = useSelector((state) => state.auth.newStoreWANum);
  const newStoreAbout = useSelector((state) => state.auth.newStoreAbout);
  const newStoreType = useSelector((state) => state.auth.newStoreType);
  const twk = useSelector((state) => state.auth.twk);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setOpen(isModalOpen);
    setStepNum(1);
  }, [isModalOpen]);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setStepNum(1);
      toggleModal(false);
    }, 300);
  };

  const handleNext = () => {
    const nextNum = stepNum + 1;
    setStepNum(nextNum);
  };

  // Initialize the mutation hook
  const [createStoreMutation, { isLoading: isCreatingStore }] =
    useCreateStoreMutation();

  const handleCreateStore = async () => {
    const storeData = {
      name: newStoreName,
      storeType: newStoreType,
      about: newStoreAbout,
      whatsappNumber: newStoreWANum,
    };

    try {
      const res = await createStoreMutation({ storeData, token: twk });
      if (res.error) throw Error(JSON.stringify(res.error));
      dispatch(showToast({message: info["store-created"]}))
      handleNext();
      return res.data;
    } catch (error) {
      const message = JSON.parse(error.message);

      if(message.status === 401){
        dispatch(logout());
        navigate("/login");
      }

      if (message && message.data && message.data.validationErrors) {
        const validationErrors = message.data.validationErrors;
        const errorMessage = Object.values(validationErrors).join('\n, ');
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
              <nav aria-label="Progress">
                <ol role="list" className="flex items-center justify-center">
                  {steps.map((step, stepIdx) => (
                    <li
                      key={step.name}
                      className={classNames(
                        stepIdx !== steps.length - 1 ? "pr-8 sm:pr-20" : "",
                        "relative"
                      )}
                      onClick={() => {
                        if (step.num === 1 && !isCreatingStore) {
                          setStepNum(step.num);
                        }
                      }}
                    >
                      {step.num < stepNum ? (
                        <>
                          <div
                            className="absolute inset-0 flex items-center"
                            aria-hidden="true"
                          >
                            <div className="h-0.5 w-full bg-indigo-600" />
                          </div>
                          <a className="relative w-8 h-8 flex items-center justify-center bg-indigo-600 rounded-full hover:bg-indigo-900">
                            <CheckIcon
                              className="w-5 h-5 text-white"
                              aria-hidden="true"
                            />
                            <span className="sr-only">{step.name}</span>
                          </a>
                        </>
                      ) : step.num === stepNum ? (
                        <>
                          <div
                            className="absolute inset-0 flex items-center"
                            aria-hidden="true"
                          >
                            <div className="h-0.5 w-full bg-gray-200" />
                          </div>
                          <a
                            className="relative w-8 h-8 flex items-center justify-center bg-white border-2 border-indigo-600 rounded-full"
                            aria-current="step"
                          >
                            <span
                              className="h-2.5 w-2.5 bg-indigo-600 rounded-full"
                              aria-hidden="true"
                            />
                            <span className="sr-only">{step.name}</span>
                          </a>
                        </>
                      ) : (
                        <>
                          <div
                            className="absolute inset-0 flex items-center"
                            aria-hidden="true"
                          >
                            <div className="h-0.5 w-full bg-gray-200" />
                          </div>
                          <a className="group relative w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full hover:border-gray-400">
                            <span
                              className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300"
                              aria-hidden="true"
                            />
                            <span className="sr-only">{step.name}</span>
                          </a>
                        </>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
              {(() => {
                switch (stepNum) {
                  case 1:
                    return <StoreTypes />;
                  case 2:
                    return <StoreInformation />;
                  case 3:
                    return <QRCodeView />;
                  default:
                    return null;
                }
              })()}
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                {stepNum === 2 ? (
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleCreateStore}
                  >
                    {isCreatingStore ? (
                      <ImSpinner8 className="animate-spin h-5 w-5 mr-3" />
                    ) : (
                      "Create"
                    )}
                  </button>
                ) : (
                  <button
                    disabled={stepNum === 3 ? true : false}
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleNext}
                  >
                    {stepNum === 3 ? "Continue" : "Next"}
                  </button>
                )}
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={handleClose}
                  ref={cancelButtonRef}
                >
                  Close
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default CreateStoreModal;
