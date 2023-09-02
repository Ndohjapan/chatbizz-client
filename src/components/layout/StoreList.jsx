import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  SelectorIcon,
} from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  logout,
  setAllStores,
  setSelectedStore,
  showToast,
} from "../../slices/authSlice";
import { useGetStoresMutation } from "../../slices/userApiSlice";
import errors from "../../assets/error.json";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function StoreList() {
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const twk = useSelector((state) => state.auth.twk);
  const location = useLocation();
  const url = location.pathname.match(/store\/([^/]*)/);
  const selectedStore = url ? url[1] : null;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [stores, setStores] = useState([]);

  const [getStoresMutation, { isLoading }] = useGetStoresMutation();

  const handleGetStores = async () => {
    try {
      const res = await getStoresMutation({ token: twk });
      if (res.error) throw Error(JSON.stringify(res.error));
      const storeData = res.data.map(store => {
        if(store._id === selectedStore){
          return {...store, selected: true}
        }else{
          return {...store, selected: false}
        }
      })
      storeData.map(store => {
        if(store.selected === true){
          setSelected(store);
          return true;
        }
      })
      setStores(storeData);
      setLoading(false);
    } catch (error) {
      console.log(error);
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

  useEffect(() => {
    handleGetStores();
  }, []); // Only run this effect once, on component mount

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Listbox value={selected} onChange={setSelected}>
          {({ open }) => (
            <>
              <Listbox.Label className="block text-base font-medium text-gray-300 mt-10 px-2 md:mt-7">
                Store
              </Listbox.Label>
              <div className="relative px-2 space-y-1 mt-3 mb-8 md:mb-0">
                <Listbox.Button className="relative bg-transparent border border-gray-300 rounded-md shadow-sm px-3 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <div className="flex items-center">
                    <span
                      aria-label={selected ? "Online" : "Offline"}
                      className={classNames(
                        selected.selected ? "bg-green-400" : "bg-gray-200",
                        "flex-shrink-0 inline-block h-2 w-2 rounded-full"
                      )}
                    />
                    <span className="ml-3 block truncate text-gray-300 text-base font-medium">
                      {selected ? selected.name + "  " : "Select a store"}{" "}
                    </span>

                    {open === false ? (
                      <>
                        <span>
                          <ChevronDownIcon
                            className="h-5 w-5 ml-3 text-gray-300"
                            aria-hidden="true"
                          />
                        </span>
                      </>
                    ) : (
                      <>
                        <span>
                          <ChevronUpIcon
                            className="h-5 w-5 ml-3 text-gray-300"
                            aria-hidden="true"
                          />
                        </span>
                      </>
                    )}
                  </div>
                  <span className="hidden absolute inset-y-0 right-0 items-center pointer-events-none md:pr-24">
                    <SelectorIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    {stores.map((store) => (
                      <a
                        key={store._id}
                        href={`/store/${store._id}`}
                        onClick={() => {
                          dispatch(setSelectedStore(store._id));
                        }}
                      >
                        <Listbox.Option
                          className={({ active }) =>
                            classNames(
                              active
                                ? "text-white bg-indigo-600"
                                : "text-gray-900",
                              "cursor-default select-none relative py-2 pl-3 pr-9"
                            )
                          }
                          value={store}
                        >
                          {({ selected, active }) => (
                            <>
                              <div className="flex items-center">
                                <span
                                  className={classNames(
                                    store.selected
                                      ? "bg-green-400"
                                      : "bg-gray-200",
                                    "flex-shrink-0 inline-block h-2 w-2 rounded-full"
                                  )}
                                  aria-hidden="true"
                                />
                                <span
                                  className={classNames(
                                    selected
                                      ? "font-semibold"
                                      : "font-medium text-base",
                                    "ml-3 block truncate"
                                  )}
                                >
                                  {store.name}
                                  <span className="sr-only">
                                    {" "}
                                    is {store.online ? "online" : "offline"}
                                  </span>
                                </span>
                              </div>

                              {store.online ? (
                                <span
                                  className={classNames(
                                    active ? "text-white" : "text-indigo-600",
                                    "absolute inset-y-0 right-0 flex items-center pr-4"
                                  )}
                                >
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      </a>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      )}
    </>
  );
}
