import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/solid";

// eslint-disable-next-line react/prop-types
function StoreTypes({selectedStoreType, setSelectStoreType, types, classNames}) {
  return (
    <>
      <RadioGroup
        value={selectedStoreType}
        onChange={setSelectStoreType}
        className={"mt-4"}
      >
        <div className="text-center">
          <RadioGroup.Label className="text-base font-medium text-gray-900">
            Select store type
          </RadioGroup.Label>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
          {types.map((type) => (
            <RadioGroup.Option
              key={type.id}
              value={type}
              className={({ active }) =>
                classNames(
                  "border",
                  active ? "border-indigo-500 ring-2 ring-indigo-500" : "",
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
                      checked ? "border-indigo-500" : "border-transparent",
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
    </>
  );
}

export default StoreTypes;
