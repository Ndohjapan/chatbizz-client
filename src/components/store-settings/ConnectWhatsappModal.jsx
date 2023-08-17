import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/solid";
import QRCodeView from "../home/sub-menu/QRCodeView";

const steps = [{ name: "Step 1", href: "#", status: "current", num: 1 }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// eslint-disable-next-line react/prop-types
function ConnectWhatsappModal({ isModalOpen, toggleModal }) {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [stepNum, setStepNum] = useState(1);

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
                        setStepNum(step.num);
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
                    return <QRCodeView />;
                  default:
                    return null;
                }
              })()}
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  disabled={stepNum === 2 ? true : false}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleNext}
                >
                  {stepNum === 2 ? "Submit" : "Next"}
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

export default ConnectWhatsappModal;
