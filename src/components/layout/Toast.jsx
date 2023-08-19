import { useEffect, useState } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/solid";
import errors from "../../assets/error.json";

// eslint-disable-next-line react/prop-types
export default function Toast({ message, title, onClose }) {
  const [show, setShow] = useState(true);
  const [isCircleCheck, setCircleCheck] = useState(true);

  useEffect(() => {
    setCircleCheck(title !== errors["title-error"]);

    const timer = setTimeout(() => {
      setShow(false);
      onClose();
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [onClose, title]);

  return (
    <>
      <div
        className={`fixed top-4 right-4 z-50 ${
          show ? "animate-slide-in-right" : "animate-slide-out-right"
        } ${
          "w-64 md:w-96"
        }`}
      >
        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {isCircleCheck ? (
                <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
              ) : (
                <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{title}</p>
              <p className="mt-1 text-sm text-gray-500">{message}</p>
            </div>
            <div className="ml-auto pl-3">
              <button
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
                onClick={() => {
                  setShow(false);
                  onClose();
                }}
              >
                <span className="sr-only">Close</span>
                <XIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}




