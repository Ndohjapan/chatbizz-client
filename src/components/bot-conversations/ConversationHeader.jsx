import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import { Switch } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ConversationHeader() {
  const [enabled, setEnabled] = useState(false);

  return (
    <>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 border-gray-200 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              Bot / Conversations
            </h1>
          </div>
          <div className="hidden sm:mt-0 sm:ml-4 md:flex md:justify-evenly">
            <span className="text-sm text-gray-500 mr-4">{"Turn off  "}</span>
            <Switch.Group as="div" className="flex items-center">
              <Switch
                checked={enabled}
                onChange={setEnabled}
                className={classNames(
                  enabled ? "bg-indigo-600" : "bg-gray-200",
                  "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                )}
              >
                <span
                  aria-hidden="true"
                  className={classNames(
                    enabled ? "translate-x-5" : "translate-x-0",
                    "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                  )}
                />
              </Switch>
              <Switch.Label as="span" className="ml-3">
                <span className="text-sm font-medium text-gray-900">
                  Enable Bot{" "}
                </span>
              </Switch.Label>
            </Switch.Group>
          </div>
          <div className="flex items-center justify-between sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:justify-start md:hidden">
            <Menu as="div" className="ml-3 relative inline-block text-left">
              <div>
                <Menu.Button className="-my-2 p-2 rounded-full bg-white flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <span className="sr-only">Open options</span>
                  <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute right-0 top-8 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-6 flex justify-evenly">
                    <Menu.Item>
                      {({ active }) => (
                        <>
                          <span className="text-sm text-gray-500 mr-4">
                            {"Turn off  "}
                          </span>
                          <Switch.Group as="div" className="flex items-center">
                            <Switch
                              checked={enabled}
                              onChange={setEnabled}
                              className={classNames(
                                enabled ? "bg-indigo-600" : "bg-gray-200",
                                "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              )}
                            >
                              <span
                                aria-hidden="true"
                                className={classNames(
                                  enabled ? "translate-x-5" : "translate-x-0",
                                  "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                                )}
                              />
                            </Switch>
                            <Switch.Label as="span" className="ml-3">
                              <span className="text-sm font-medium text-gray-900">
                                Enable Bot{" "}
                              </span>
                            </Switch.Label>
                          </Switch.Group>
                        </>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </header>
    </>
  );
}

export default ConversationHeader;
