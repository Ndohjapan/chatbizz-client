import { SearchIcon } from "@heroicons/react/outline";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { useLayoutEffect, useRef, useState } from "react";
import Fuse from "fuse.js";
import { v4 as uuidv4 } from "uuid";
import { Link, useLocation } from "react-router-dom";
import DeleteWarning from "../layout/DeleteWarning";
import info from "../../assets/information.json";

const currencies = {"NGN": "₦", "USD": "$", "GBP": "£", "EUR": "€", "CAD": "CAD"}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// eslint-disable-next-line react/prop-types
export default function ProductsTable({products}) {
  const location = useLocation();
  const uniqueId = uuidv4();
  const checkbox = useRef();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [displayProducts, setDisplayProducts] = useState(products);
  const [sortOrder, setSortOrder] = useState({
    name: "ascending",
    price: "ascending",
    stock: "ascending",
    variants: "ascending",
    description: "ascending",
  });
  const [sortOrderIcon, setSortOrderIcon] = useState({
    name: true,
    price: false,
    stock: false,
    variants: false,
    description: false,
  });
  const toggleDeleteModal = (toggle) => {
    setIsDeleteModalOpen(toggle);
  };

  function fuzzySearchProducts(input) {
    const options = {
      keys: ["name"],
      threshold: 0.4,
    };

    const fuse = new Fuse(products, options);

    if (input === "") {
      setDisplayProducts(products);
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
      stock: false,
      description: false,
      [column]: true,
    }));

    sortProducts(
      column,
      sortOrder[column] === "ascending" ? "ascending" : "descending"
    );
  }

  useLayoutEffect(() => {
    const isIndeterminate =
      selectedPeople.length > 0 && selectedPeople.length < products.length;
    setChecked(selectedPeople.length === products.length);
    setIndeterminate(isIndeterminate);
    checkbox.current.indeterminate = isIndeterminate;
  }, [selectedPeople]);

  function toggleAll() {
    setSelectedPeople(checked || indeterminate ? [] : products);
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
                  
                  {/* Table header */}

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
                          onClick={() => handleSorting("price")}
                        >
                          Price
                          <span
                            className={classNames(
                              "ml-2 flex-none rounded bg-gray-100",
                              sortOrderIcon["price"]
                                ? "text-gray-700"
                                : "text-gray-200"
                            )}
                          >
                            {sortOrder["price"] === "ascending" ? (
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
                          onClick={() => handleSorting("stock")}
                        >
                          Stock
                          <span
                            className={classNames(
                              "ml-2 flex-none rounded bg-gray-100",
                              sortOrderIcon["stock"]
                                ? "text-gray-700"
                                : "text-gray-200"
                            )}
                          >
                            {sortOrder["stock"] === "ascending" ? (
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
                          onClick={() => handleSorting("variants")}
                        >
                          Variants
                          <span
                            className={classNames(
                              "ml-2 flex-none rounded bg-gray-100",
                              sortOrderIcon["variants"]
                                ? "text-gray-700"
                                : "text-gray-200"
                            )}
                          >
                            {sortOrder["variants"] === "ascending" ? (
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
                          onClick={() => handleSorting("description")}
                        >
                          Description
                          <span
                            className={classNames(
                              "ml-2 flex-none rounded bg-gray-100",
                              sortOrderIcon["description"]
                                ? "text-gray-700"
                                : "text-gray-200"
                            )}
                          >
                            {sortOrder["description"] === "ascending" ? (
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

                  {/* Table body */}

                  <tbody className="divide-y divide-gray-200 bg-white">
                    {displayProducts.map((product) => (
                      <tr
                        key={product._id}
                        className={classNames(
                          selectedPeople.includes(product) ? "bg-gray-50" : "",
                          ""
                        )}
                      >
                        <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                          {selectedPeople.includes(product) && (
                            <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
                          )}
                          <input
                            type="checkbox"
                            className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                            value={product.stock}
                            checked={selectedPeople.includes(product)}
                            onChange={(e) =>
                              setSelectedPeople(
                                e.target.checked
                                  ? [...selectedPeople, product]
                                  : selectedPeople.filter((p) => p !== product)
                              )
                            }
                          />
                        </td>
                        <td
                          className={classNames(
                            "whitespace-nowrap py-4 pr-3 text-sm font-medium max-w-xs truncate",
                            selectedPeople.includes(product)
                              ? "text-indigo-600"
                              : "text-gray-900"
                          )}
                        >
                          <Link to={location.pathname+"/product/" + product._id}>
                            {product.name}
                          </Link>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {currencies[product.currency] + product.price}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {product.stock}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {product.variants.length}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 max-w-xs truncate">
                          {product.description}
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
          header={info.delete.product.header}
          message={info.delete.product.message}
          buttonText={info.delete.product.buttonText}
          toggleModal={toggleDeleteModal}
        />
      ) : (
        <></>
      )}
    </>
  );
}
