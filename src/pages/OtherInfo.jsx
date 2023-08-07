import { Disclosure } from "@headlessui/react";
import { MinusSmIcon, PlusSmIcon } from "@heroicons/react/outline";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function OtherInfo() {
  return (
    <>
      <Disclosure as="div">
        {({ open }) => (
          <>
            <h3>
              <Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
                <span
                  className={classNames(
                    open ? "text-indigo-600" : "text-gray-900",
                    "text-sm font-medium"
                  )}
                >
                  Other Information
                </span>
                <span className="ml-6 flex items-center">
                  {open ? (
                    <MinusSmIcon
                      className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                      aria-hidden="true"
                    />
                  ) : (
                    <PlusSmIcon
                      className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  )}
                </span>
              </Disclosure.Button>
            </h3>
            <Disclosure.Panel as="div" className="pb-6 prose prose-sm">
              <p className="text-base text-gray-700 space-y-6">
                {"Other Information"}
              </p>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}
