import React, {useState} from "react";
import { ImSpinner8 } from "react-icons/im";
import DeleteWarning from "../layout/DeleteWarning";
import info from "../../assets/information.json"
export default function ProductDetailsHeader({ isUpdate, isLoading, updateFunction, goBackHome }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const toggleDeleteModal = (toggle) => {
    setIsDeleteModalOpen(toggle);
  };
  return (
    <>
    <div className="pb-6 sm:pb-8 flex items-center justify-between">
      <h3 className="text-lg leading-6 font-medium text-gray-900">Product</h3>
      <div className="mt-3 flex sm:mt-0 sm:ml-4">
        <button
          type="button"
          onClick={() => {
            setIsDeleteModalOpen(true);
          }}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Discard
        </button>
        {isUpdate ? (
          <button
            type="button"
            disabled={isLoading}
            onClick={() => {updateFunction()}}
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLoading ? (
              <>
              <ImSpinner8 className="animate-spin"/>
              </>
            ) : (
              <>
              Save
              </>
            )}
          </button>
        ) : (
          <button
            type="button"
            disabled
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        )}
      </div>
    </div>

    {isDeleteModalOpen ? (
        <DeleteWarning
          header={info.unsaved.product.header}
          message={info.unsaved.product.message}
          buttonText={info.unsaved.product.buttonText}
          toggleModal={toggleDeleteModal}
          deleteFunction={goBackHome}
        />
      ) : (
        <></>
      )}
    </>
  );
}
