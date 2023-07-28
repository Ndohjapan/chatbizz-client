import { useState } from "react";
import info from "../../../assets/information.json";

function StoreInformation() {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    about: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    validateInput(name, value);
  };

  const validateInput = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "name":
        if (value.trim().length < 3) {
          newErrors[name] = `Must be at least 3 characters long`;
        } else {
          delete newErrors[name];
        }
        break;
      case "about":
        if (value.trim().length < 20) {
          newErrors[name] = `Must be at least 20 characters long`;
        } else {
          delete newErrors[name];
        }
        break;

      case "number":
        // eslint-disable-next-line no-case-declarations
        const numberRegex = /^\+?[0-9]{10,}$/;
        if (!numberRegex.test(value)) {
          newErrors[name] = "Invalid phone number format";
        } else {
          delete newErrors[name];
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const [errors, setErrors] = useState({});

  return (
    <div className="space-y-6 mt-4">
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Profile
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Basic store information.
            </p>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form className="space-y-6" action="#" method="POST">
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3 sm:col-span-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Store name <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 flex rounded-md border-2 shadow-sm">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300 p-2"
                      placeholder={info.store.name}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3 sm:col-span-2">
                  <label
                    htmlFor="number"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Whatsapp Phone <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 flex rounded-md border-2 shadow-sm">
                    <input
                      type="text"
                      name="number"
                      id="number"
                      required
                      value={formData.number}
                      onChange={handleInputChange}
                      className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300 p-2"
                      placeholder={info.store.number}
                    />
                  </div>
                  {errors.number && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.number}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="about"
                  className="block text-sm font-medium text-gray-700"
                >
                  About <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <textarea
                    id="about"
                    name="about"
                    required
                    rows={3}
                    value={formData.about}
                    onChange={handleInputChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                    placeholder={info.store.about}
                    defaultValue={""}
                  />
                </div>
                {errors.about && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.about}
                    </p>
                  )}
                <p className="mt-2 text-sm text-gray-500">
                  Briefly describe your store.
                </p>

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoreInformation;
