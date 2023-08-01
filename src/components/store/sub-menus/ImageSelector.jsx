import { useEffect, useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/solid";
import images from "../../../assets/images.json";

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
  {
    id: 6,
    title: "Trial Users",
    description: "Last message sent 4 days ago",
    users: "2740 users",
    source: images.profile[4],
  },
  {
    id: 7,
    title: "Trial Users",
    description: "Last message sent 4 days ago",
    users: "2740 users",
    source: images.profile[4],
  },
  {
    id: 8,
    title: "Trial Users",
    description: "Last message sent 4 days ago",
    users: "2740 users",
    source: images.profile[4],
  },
  {
    id: 9,
    title: "Trial Users",
    description: "Last message sent 4 days ago",
    users: "2740 users",
    source: images.profile[4],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// eslint-disable-next-line react/prop-types
export default function ImageSelector({ updateDisplayImages, displayImages }) {
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    if (selectedImages.length === 0) {
      setSelectedImages(displayImages);
    }else{
        updateDisplayImages(selectedImages);
    }
  }, [displayImages, selectedImages, updateDisplayImages]);

  const handleImagesToggle = async(image) => {
    await setSelectedImages((prevSelected) => {
      if (prevSelected.includes(image)) {
        return prevSelected.filter((list) => list !== image);
      } else {
        return [...prevSelected, image];
      }
    });
  };

  const handleClearSelection = () => {
    setSelectedImages([]);
    updateDisplayImages([]);
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
            className="mt-4 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8 max-h-96 overflow-y-scroll"
          >
            {files.map((image) => (
              <li
                key={image.id}
                onClick={() => handleImagesToggle(image)}
                className={classNames(
                  "relative bg-white border rounded-lg shadow-sm p-0 flex justify-center flex-col cursor-pointer focus:outline-none",
                  selectedImages.includes(image)
                    ? "border-indigo-500 ring-2 ring-indigo-500"
                    : "border-gray-300"
                )}
              >
                <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden">
                  <img
                    src={image.source}
                    alt=""
                    className="object-cover pointer-events-none group-hover:opacity-75"
                  />
                  <button
                    type="button"
                    className="absolute inset-0 focus:outline-none"
                  >
                    <span className="sr-only">
                      View details for {image.title}
                    </span>
                  </button>
                </div>
                {selectedImages.includes(image) && (
                  <CheckCircleIcon
                    className="absolute right-2 top-2 h-5 w-5 text-indigo-600"
                    aria-hidden="true"
                  />
                )}
                <div
                  className={classNames(
                    "border-2",
                    selectedImages.includes(image)
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
        {selectedImages.length > 0 && (
          <button
            type="button"
            className="mt-4 w-full border-2 border-indigo-500 rounded-lg p-4 text-center hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleClearSelection}
          >
            Clear Selection
          </button>
        )}
      </div>
    </>
  );
}
