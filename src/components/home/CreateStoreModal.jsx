import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/solid";
import images from "../../assets/images.json";

const types = [
  {
    id: 1,
    title: "Ecommerce",
    description: "Physical products",
    image: images.illustration.ecommerce[new Date().getMilliseconds() % 4],
  },
  {
    id: 2,
    title: "Digital",
    description: "Digital products / services",
    image:
      images.illustration["digital-product"][new Date().getMilliseconds() % 4],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// eslint-disable-next-line react/prop-types
function CreateStoreModal({isModalOpen, toggleModal}) {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [selectedStoreType, setSelectStoreType] = useState(types[0]);

  useEffect(() => {
    setOpen(isModalOpen);
  }, [isModalOpen])

  const handleClose = () => {
    setOpen(false);
    setTimeout(()=>{
      toggleModal(false);
    }, 300);
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
              <RadioGroup
                value={selectedStoreType}
                onChange={setSelectStoreType}
              >
                <RadioGroup.Label className="text-base font-medium text-gray-900">
                  Select store type
                </RadioGroup.Label>

                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  {types.map((type) => (
                    <RadioGroup.Option
                      key={type.id}
                      value={type}
                      className={({ active }) =>
                        classNames(
                          "border",
                          active
                            ? "border-indigo-500 ring-2 ring-indigo-500"
                            : "",
                          "relative bg-white border rounded-lg shadow-sm flex flex-col cursor-pointer focus:outline-none"
                        )
                      }
                    >
                      {({ checked, active }) => (
                        <>
                          <div
                            className="flex-1 flex"
                            onMouseDown={(e) => {
                              e.preventDefault(); // Prevent the default behavior to avoid closing the modal
                              setSelectStoreType(type); // Handle the selection of the radio element
                            }}
                          >
                            <div className="bg-white overflow-hidden shadow rounded-lg cursor-pointer">
                              <div className="px-4 py-5 sm:p-6">
                                {/* Content goes here */}
                                <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                                  <img
                                    src={type.image}
                                    alt=""
                                    className="object-cover pointer-events-none group-hover:opacity-75"
                                  />
                                </div>
                              </div>
                              <div className="bg-gray-50 px-4 py-4 sm:px-6">
                                <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
                                  {type.title}
                                </p>
                                <p className="block text-sm font-medium text-gray-500 pointer-events-none">
                                  {type.description}
                                </p>
                              </div>
                            </div>
                          </div>
                          <CheckCircleIcon
                            className={classNames(
                              checked ? "h-5 w-5 text-indigo-600" : "invisible",
                              "absolute right-2 top-2"
                            )}
                            aria-hidden="true"
                          />
                          <div
                            className={classNames(
                              active ? "border" : "border-2",
                              checked
                                ? "border-indigo-500"
                                : "border-transparent",
                              "absolute -inset-px rounded-lg pointer-events-none"
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleClose}
                >
                  Next
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

export default CreateStoreModal;
