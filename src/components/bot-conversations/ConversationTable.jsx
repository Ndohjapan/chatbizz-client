import { SearchIcon } from "@heroicons/react/outline";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { useLayoutEffect, useRef, useState } from "react";
import Fuse from "fuse.js";
import { Link } from "react-router-dom";
import DeleteWarning from "../layout/DeleteWarning";
import info from "../../assets/information.json";
import images from "../../assets/images.json";
import { Switch } from "@headlessui/react";

const customers = [
  {
    id: 1,
    name: 'Joel',
    price: 229,
    number: "2349056144059",
    lastMessageTime: "2023-10-27T23:45:16.086+00:00",
    enabled: true,
    lastMessage:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim reiciendis quisquam iure? Enim libero officiis debitis provident eius, cum, nisi facere numquam dolores ipsum est voluptate cupiditate quod illo similique!",
  },
  {
    id: 2,
    name: "~~❣️❣️",
    price: 39,
    number: "2349056144059",
    lastMessageTime: "2023-10-28T16:24:16.086+00:00",
    enabled: false,
    lastMessage:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim reiciendis quisquam iure? Enim libero officiis debitis provident eius, cum, nisi facere numquam dolores ipsum est voluptate cupiditate quod illo similique!",
  },
  {
    id: 3,
    name: "--</dev>--",
    price: 45,
    number: "2349056144059",
    lastMessageTime: "2023-10-27T17:24:16.086+00:00",
    enabled: false,
    lastMessage:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim reiciendis quisquam iure? Enim libero officiis debitis provident eius, cum, nisi facere numquam dolores ipsum est voluptate cupiditate quod illo similique!",
  },
  {
    id: 4,
    name: "Patrick",
    price: 99,
    number: "2349056144059",
    lastMessageTime: "2023-07-15T23:24:16.086+00:00",
    enabled: false,
    lastMessage:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim reiciendis quisquam iure? Enim libero officiis debitis provident eius, cum, nisi facere numquam dolores ipsum est voluptate cupiditate quod illo similique!",
  },
  {
    id: 5,
    name: "Mr. Kapts 🥑👷🏽‍♂️",
    price: 25,
    number: "2349056144059",
    lastMessageTime: "2023-06-15T23:24:16.086+00:00",
    enabled: true,
    lastMessage:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim reiciendis quisquam iure? Enim libero officiis debitis provident eius, cum, nisi facere numquam dolores ipsum est voluptate cupiditate quod illo similique!",
  },
  {
    id: 6,
    name: 'Chibuike',
    price: 87,
    number: "2349056144059",
    lastMessageTime: "2023-10-27T06:24:16.086+00:00",
    enabled: true,
    lastMessage:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim reiciendis quisquam iure? Enim libero officiis debitis provident eius, cum, nisi facere numquam dolores ipsum est voluptate cupiditate quod illo similique!",
  },
  {
    id: 7,
    name: "Chukwuma",
    price: 149,
    number: "2349056144059",
    lastMessageTime: "2023-10-27T11:24:16.086+00:00",
    enabled: false,
    lastMessage:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim reiciendis quisquam iure? Enim libero officiis debitis provident eius, cum, nisi facere numquam dolores ipsum est voluptate cupiditate quod illo similique!",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductsTable() {
  const checkbox = useRef();
  const [enabled, setEnabled] = useState(false);
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [displayProducts, setDisplayProducts] = useState(customers);
  const [sortOrder, setSortOrder] = useState({
    name: "ascending",
    price: "ascending",
    lastMessageTime: "ascending",
    variants: "ascending",
    lastMessage: "ascending",
    enabled: "ascending"
  });
  const [sortOrderIcon, setSortOrderIcon] = useState({
    name: true,
    price: false,
    lastMessageTime: false,
    variants: false,
    lastMessage: false,
    enabled: false
  });

  const toggleBotStatus = (index) => {
    setDisplayProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      updatedProducts[index] = {
        ...updatedProducts[index],
        enabled: !updatedProducts[index].enabled,
      };
      return updatedProducts;
    });
  };

  const toggleDeleteModal = (toggle) => {
    setIsDeleteModalOpen(toggle);
  };

  function fuzzySearchProducts(input) {
    const options = {
      keys: ["name"],
      threshold: 0.4,
    };

    const fuse = new Fuse(customers, options);

    if (input === "") {
      setDisplayProducts(customers);
    } else {
      const result = fuse.search(input);
      setDisplayProducts(result.map((item) => item.item));
    }
  }

  function sortProducts(column, order) {
    const sortedProducts = [...displayProducts];

    sortedProducts.sort((a, b) => {
      if (order === "ascending") {
        if (a[column] < b[column]) return -1;
        if (a[column] > b[column]) return 1;
      } else if (order === "descending") {
        if (a[column] > b[column]) return -1;
        if (a[column] < b[column]) return 1;
      }
      return 0;
    });

    setDisplayProducts(sortedProducts);
  }

  function handleSearchInputChange(event) {
    const userInput = event.target.value;
    fuzzySearchProducts(userInput);
  }

  function handleSorting(column) {
    setSortOrder((prevSortOrder) => ({
      ...prevSortOrder,
      [column]:
        prevSortOrder[column] === "ascending" ? "descending" : "ascending",
    }));

    setSortOrderIcon(() => ({
      name: false,
      price: false,
      variants: false,
      lastMessageTime: false,
      lastMessage: false,
      enabled: false,
      [column]: true,
    }));

    sortProducts(
      column,
      sortOrder[column] === "ascending" ? "ascending" : "descending"
    );
  }

  useLayoutEffect(() => {
    const isIndeterminate =
      selectedPeople.length > 0 && selectedPeople.length < customers.length;
    setChecked(selectedPeople.length === customers.length);
    setIndeterminate(isIndeterminate);
    checkbox.current.indeterminate = isIndeterminate;
  }, [selectedPeople]);

  function toggleAll() {
    setSelectedPeople(checked || indeterminate ? [] : customers);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  return (
    <>
      <div className="mt-8 px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="mt-4 sm:mt-0 sm:flex-none shadow-sm rounded-md ">
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                type="text"
                name="search"
                id="search"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2"
                placeholder="Search"
                onChange={handleSearchInputChange}
              />
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                {selectedPeople.length > 0 && (
                  <div className="absolute top-0 left-12 flex h-12 items-center space-x-3 bg-gray-50 sm:left-16">
                    <button
                      type="button"
                      className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      Export
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsDeleteModalOpen(true)}
                      className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      Delete all
                    </button>
                  </div>
                )}
                <table className="min-w-full table-fixed divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="relative w-12 px-6 sm:w-16 sm:px-8"
                      >
                        <input
                          type="checkbox"
                          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                          ref={checkbox}
                          checked={checked}
                          onChange={toggleAll}
                        />
                      </th>
                      <th
                        scope="col"
                        className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                      >
                        <button
                          href="#"
                          className="group inline-flex"
                          onClick={() => handleSorting("name")}
                        >
                          Name
                          <span
                            className={classNames(
                              "ml-2 flex-none rounded bg-gray-100",
                              sortOrderIcon["name"]
                                ? "text-gray-700"
                                : "text-gray-200"
                            )}
                          >
                            {sortOrder["name"] === "ascending" ? (
                              <ChevronDownIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <ChevronUpIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </button>
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        <button
                          href="#"
                          className="group inline-flex"
                          onClick={() => handleSorting("enabled")}
                        >
                          Active
                          <span
                            className={classNames(
                              "ml-2 flex-none rounded bg-gray-100",
                              sortOrderIcon["enabled"]
                                ? "text-gray-700"
                                : "text-gray-200"
                            )}
                          >
                            {sortOrder["enabled"] === "ascending" ? (
                              <ChevronDownIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <ChevronUpIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </button>
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        <button
                          href="#"
                          className="group inline-flex"
                          onClick={() => handleSorting("lastMessage")}
                        >
                          Last Message
                          <span
                            className={classNames(
                              "ml-2 flex-none rounded bg-gray-100",
                              sortOrderIcon["lastMessage"]
                                ? "text-gray-700"
                                : "text-gray-200"
                            )}
                          >
                            {sortOrder["lastMessage"] === "ascending" ? (
                              <ChevronDownIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <ChevronUpIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </button>
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        <button
                          href="#"
                          className="group inline-flex"
                          onClick={() => handleSorting("lastMessageTime")}
                        >
                            Last Message Time
                          <span
                            className={classNames(
                              "ml-2 flex-none rounded bg-gray-100",
                              sortOrderIcon["lastMessageTime"]
                                ? "text-gray-700"
                                : "text-gray-200"
                            )}
                          >
                            {sortOrder["lastMessageTime"] === "ascending" ? (
                              <ChevronDownIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <ChevronUpIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </button>
                      </th>
                    
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {displayProducts.map((person, index) => (
                      <tr
                        key={person.id}
                        className={classNames(
                          selectedPeople.includes(person) ? "bg-gray-50" : "",
                          ""
                        )}
                      >
                        <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                          {selectedPeople.includes(person) && (
                            <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
                          )}
                          <input
                            type="checkbox"
                            className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                            value={person.lastMessageTime}
                            checked={selectedPeople.includes(person)}
                            onChange={(e) =>
                              setSelectedPeople(
                                e.target.checked
                                  ? [...selectedPeople, person]
                                  : selectedPeople.filter((p) => p !== person)
                              )
                            }
                          />
                        </td>
                        <td className="whitespace-nowrap py-4 pr-3 text-sm font-medium max-w-xs truncate">
                          <Link to={`https://wa.me/${person.number}`} target="_blank">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={images.profile[index % 5]}
                                  alt=""
                                />
                              </div>
                              <div className="ml-4">
                                <div
                                  className={classNames(
                                    "font-medium text-gray-900",
                                    selectedPeople.includes(person)
                                      ? "text-indigo-600"
                                      : "text-gray-900"
                                  )}
                                >
                                  {person.name}
                                </div>
                                <div
                                  className={classNames(
                                    "text-gray-500",
                                    selectedPeople.includes(person)
                                      ? "text-indigo-600"
                                      : "text-gray-500"
                                  )}
                                >
                                  {"+"+person.number}
                                </div>
                              </div>
                            </div>
                          </Link>
                        </td>

                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <Switch
                            checked={person.enabled}
                            onChange={() => {
                              toggleBotStatus(index);
                            }}
                            className={classNames(
                              person.enabled ? "bg-indigo-600" : "bg-gray-200",
                              "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            )}
                          >
                            <span className="sr-only">Use setting</span>
                            <span
                              aria-hidden="true"
                              className={classNames(
                                person.enabled
                                  ? "translate-x-5"
                                  : "translate-x-0",
                                "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                              )}
                            />
                          </Switch>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 max-w-xs truncate">
                          {person.lastMessage}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.lastMessageTime}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isDeleteModalOpen ? (
        <DeleteWarning
          header={info.delete.conversation.header}
          message={info.delete.conversation.message}
          buttonText={info.delete.conversation.buttonText}
          toggleModal={toggleDeleteModal}
        />
      ) : (
        <></>
      )}
    </>
  );
}
