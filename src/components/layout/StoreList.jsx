/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  SelectorIcon,
} from "@heroicons/react/solid";

const people = [
  { id: 1, name: "Geel Geworden", online: false },
  { id: 2, name: "OHIC", online: false },
  { id: 3, name: "Lavent Living", online: true },
  { id: 4, name: "Expertnaire", online: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function StoreList() {
  const [selected, setSelected] = useState(people[2]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-base font-medium text-gray-300 mt-10 px-2 md:mt-7">
            Store
          </Listbox.Label>
          <div className="relative px-2 space-y-1 mt-3 mb-8 md:mb-0">
            <Listbox.Button className="relativebg-white border border-gray-300 rounded-md shadow-sm px-3 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <div className="flex items-center">
                <span
                  aria-label={selected.online ? "Online" : "Offline"}
                  className={classNames(
                    selected.online ? "bg-green-400" : "bg-gray-200",
                    "flex-shrink-0 inline-block h-2 w-2 rounded-full"
                  )}
                />
                <span className="ml-3 block truncate text-gray-300 text-base font-medium">
                  {selected.name + "  "}{" "}
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
                {people.map((person) => (
                  <Listbox.Option
                    key={person.id}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-indigo-600" : "text-gray-900",
                        "cursor-default select-none relative py-2 pl-3 pr-9"
                      )
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(
                              person.online ? "bg-green-400" : "bg-gray-200",
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
                            {person.name}
                            <span className="sr-only">
                              {" "}
                              is {person.online ? "online" : "offline"}
                            </span>
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
