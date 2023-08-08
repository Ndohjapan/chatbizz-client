import { SearchIcon } from "@heroicons/react/outline";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { useLayoutEffect, useRef, useState } from "react";
import Fuse from "fuse.js";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: 'Durable Packaging 8" x 8" x 3" Clear Hinged Plastic Food Bakery Take-Out Container (pack of 25)Durable Packaging 8" x 8" x 3" Clear Hinged Plastic Food Bakery Take-Out Container (pack of 25)',
    price: 229,
    stock: 100,
    variants: 0,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim reiciendis quisquam iure? Enim libero officiis debitis provident eius, cum, nisi facere numquam dolores ipsum est voluptate cupiditate quod illo similique!",
  },
  {
    id: 2,
    name: "SAMSUNG Galaxy Tab S7+ Plus 12.4” 128GB Android Tablet w/ S Pen Included, Edge-to-Edge Display, Expandable Storage, Fast Charging USB-C Port, SM-T970NZKAXAR, Mystic Black",
    price: 39,
    stock: 5,
    variants: 2,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim reiciendis quisquam iure? Enim libero officiis debitis provident eius, cum, nisi facere numquam dolores ipsum est voluptate cupiditate quod illo similique!",
  },
  {
    id: 3,
    name: "Neutrogena Soothing & Calming Healthy Scalp Shampoo to Moisturize Dry Scalp & Hair, with Tea Tree Oil, pH-Balanced, Paraben-Free & Phthalate-Free, Safe for Color-Treated Hair, 12oz",
    price: 45,
    stock: 17,
    variants: 3,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim reiciendis quisquam iure? Enim libero officiis debitis provident eius, cum, nisi facere numquam dolores ipsum est voluptate cupiditate quod illo similique!",
  },
  {
    id: 4,
    name: "DULOVE Lace Front Wigs Human Hair 13x4 Straight HD Transparent Lace Front Wigs for Black Women Human Hair Pre Plucked with Baby Hair 180 Density Glueless Natural Color 24inch",
    price: 99,
    stock: 20,
    variants: 4,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim reiciendis quisquam iure? Enim libero officiis debitis provident eius, cum, nisi facere numquam dolores ipsum est voluptate cupiditate quod illo similique!",
  },
  {
    id: 5,
    name: "Cat Birthday Gift Set, Pet Party Supplies, Dog Toys, 6 Kinds of Cat Birthday Gifts, Gift Box, Headgear, Mouse Toy, Cat Teasing Stick",
    price: 25,
    stock: 15,
    variants: 10,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim reiciendis quisquam iure? Enim libero officiis debitis provident eius, cum, nisi facere numquam dolores ipsum est voluptate cupiditate quod illo similique!",
  },
  {
    id: 6,
    name: 'NINA WOOF Dog Poop Bags with Handles - 200 Compostable & Biodegradable Dog Waste Bags for Puppy Walks, Travel, Thick Housebreaking Supplies, Premium Cornstarch Pet Trash Bag, Leak Fragrance-Free, 15"x 8"',
    price: 87,
    stock: 99,
    variants: 2,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim reiciendis quisquam iure? Enim libero officiis debitis provident eius, cum, nisi facere numquam dolores ipsum est voluptate cupiditate quod illo similique!",
  },
  {
    id: 7,
    name: "Soft Cat Toys for Indoor Cats Self Play Pet Supplies Cat Gifts Interactive Pillows Cat nip Filled Toys 5PCS Plush Kitten Teething Toys Set Cute Kitty Chew Bite Toys Resistant Cartoon Cat Mouse Toys",
    price: 149,
    stock: 40,
    variants: 0,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim reiciendis quisquam iure? Enim libero officiis debitis provident eius, cum, nisi facere numquam dolores ipsum est voluptate cupiditate quod illo similique!",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductsTable() {
  const uniqueId = uuidv4();
  const checkbox = useRef();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState([]);
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
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {displayProducts.map((person) => (
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
                          value={person.stock}
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
                      <td
                        className={classNames(
                          "whitespace-nowrap py-4 pr-3 text-sm font-medium max-w-xs truncate",
                          selectedPeople.includes(person)
                            ? "text-indigo-600"
                            : "text-gray-900"
                        )}
                      >
                        <Link to={location.pathname+"/product/"+uniqueId}>{person.name}</Link>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {"$" + person.price}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.stock}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.variants}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {person.description}
                      </td>
                      <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit<span className="sr-only">, {person.name}</span>
                        </a>
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
  );
}
