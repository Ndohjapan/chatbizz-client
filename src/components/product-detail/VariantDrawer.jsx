import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ImSpinner8 } from "react-icons/im";
import { XIcon } from "@heroicons/react/outline";
import DrawerProduct from "./DrawerProduct";
import { useGetVariantMutation, useUpdateVariantMutation } from "../../slices/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, showToast } from "../../slices/authSlice";
import errors from "../../assets/error.json";
import info from "../../assets/information.json";
import VariantLoadingState from "./VariantLoadingState";

// eslint-disable-next-line react/prop-types
export default function VariantDrawer({ toggleDrawer, variantId, productId, updateVariantInfo }) {
  const [open, setOpen] = useState(true);
  const [apiCallDone, setApiCallDone] = useState(false);
  const [variant, setVariant] = useState(false);
  const [getVariantNutation, { isLoading }] = useGetVariantMutation();
  const [updateVariantMutation, { isLoading: updateLoading }] = useUpdateVariantMutation();
  const twk = useSelector((state) => state.auth.twk);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      toggleDrawer(false);
    }, 500);
  };

  const updateVariantFunc = async (update) => {
    try {
      const updatedVariant = {
        ...variant,
        ...update,
      };

      setVariant(updatedVariant);

    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleGetVariant = async () => {
    try {
      const res = await getVariantNutation({
        token: twk,
        product: productId,
        variant: variantId,
      });
      if (res.error) throw Error(JSON.stringify(res.error));
      setVariant(res.data);
    } catch (error) {
      const message = JSON.parse(error.message);

      console.log(message);

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

  const handleUpdateVariant = async () => {
    try {
      const res = await updateVariantMutation({
        token: twk,
        variantId,
        updateData: variant
      });
      if (res.error) throw Error(JSON.stringify(res.error));
      setVariant(res.data);
      dispatch(showToast({ message: info["variant-updated"] }));
      updateVariantInfo({_id: variant._id, image: variant.images[0].secure_url, name: variant.name});
      handleClose();
    } catch (error) {
      const message = JSON.parse(error.message);

      console.log(message);

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

  useEffect(() => {
    if (!apiCallDone) {
      setApiCallDone(true);
      handleGetVariant();
    }
  }, []);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden"
        onClose={handleClose}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="pointer-events-auto w-screen max-w-2xl">
                <div className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                  <div className="flex min-h-0 flex-1 flex-col overflow-y-scroll py-6">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          {" "}
                          Variant{" "}
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onClick={handleClose}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      {/* Replace with your content */}
                      {!variant ? (
                        <>
                          <VariantLoadingState />
                        </>
                      ) : (
                        <>
                          <DrawerProduct variant={variant} updateVariantFnc={updateVariantFunc}/>
                        </>
                      )}
                      {/* /End replace */}
                    </div>
                  </div>
                  <div className="flex flex-shrink-0 justify-end px-4 py-4">
                      <button
                        type="button"
                        className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={handleClose}
                      >
                        Cancel
                      </button>
                      <button
                      onClick={() => {
                        handleUpdateVariant();
                      }}
                        className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        {updateLoading ? (
                          <>
                          <ImSpinner8 className="animate-spin"/>
                          </>
                        ) : (
                          <>
                          Update
                          </>
                        )}

                      </button>
                    </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
