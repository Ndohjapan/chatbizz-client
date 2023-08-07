import { useState, useEffect } from "react";
import { Disclosure } from "@headlessui/react";
import { MinusSmIcon, PlusSmIcon } from "@heroicons/react/outline";
import Iframes from "./Iframes";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Videos() {
  return (
    <>
    
      <Disclosure as="div" key={"yt-videos"}>
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
                  {"Videos"}
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
            <Iframes />
          </>
        )}
      </Disclosure>
    </>
  );
}
