import { useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/solid";
import images from "../assets/images.json";

const files = [
  {
    id: 1,
    title: "Newsletter",
    description: "Last message sent an hour ago",
    users: "621 users",
    source: images.profile[0],
  },
  {
    id: 2,
    title: "Existing Customers",
    description: "Last message sent 2 weeks ago",
    users: "1200 users",
    source: images.profile[1],
  },
  {
    id: 3,
    title: "Trial Users",
    description: "Last message sent 4 days ago",
    users: "2740 users",
    source: images.profile[2],
  },
  {
    id: 4,
    title: "Trial Users",
    description: "Last message sent 4 days ago",
    users: "2740 users",
    source: images.profile[3],
  },
  {
    id: 5,
    title: "Trial Users",
    description: "Last message sent 4 days ago",
    users: "2740 users",
    source: images.profile[4],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ImageSelector() {
  const [selectedMailingLists, setSelectedMailingLists] = useState([]);

  const handleMailingListToggle = (mailingList) => {
    setSelectedMailingLists((prevSelected) => {
      if (prevSelected.includes(mailingList)) {
        return prevSelected.filter((list) => list !== mailingList);
      } else {
        return [...prevSelected, mailingList];
      }
    });
  };

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div>
          <h1 className="text-base font-medium text-gray-900">
            Select Image(s)
          </h1>

          <ul
            role="list"
            className="mt-4 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
          >
            {files.map((mailingList) => (
              <li
                key={mailingList.id}
                onClick={() => handleMailingListToggle(mailingList)}
                className={classNames(
                  "relative bg-white border rounded-lg shadow-sm p-0 flex justify-center flex-col cursor-pointer focus:outline-none",
                  selectedMailingLists.includes(mailingList)
                    ? "border-indigo-500 ring-2 ring-indigo-500"
                    : "border-gray-300"
                )}
              >
                <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden">
                  <img
                    src={mailingList.source}
                    alt=""
                    className="object-cover pointer-events-none group-hover:opacity-75"
                  />
                  <button
                    type="button"
                    className="absolute inset-0 focus:outline-none"
                  >
                    <span className="sr-only">
                      View details for {mailingList.title}
                    </span>
                  </button>
                </div>
                {selectedMailingLists.includes(mailingList) && (
                  <CheckCircleIcon
                    className="absolute right-2 top-2 h-5 w-5 text-indigo-600"
                    aria-hidden="true"
                  />
                )}
                <div
                  className={classNames(
                    "border-2",
                    selectedMailingLists.includes(mailingList)
                      ? "border-indigo-500"
                      : "border-transparent",
                    "absolute -inset-px rounded-lg pointer-events-none"
                  )}
                  aria-hidden="true"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
