import { useEffect, useState } from "react";
import info from "../../../assets/information.json";
import { CheckIcon, XIcon } from "@heroicons/react/solid";
import images from "../../../assets/images.json"

function WhatsappInfo() {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    about: "",
  });
  const [disconnected, setDisconnected] = useState(0);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    validateInput(name, value);
  };

  useEffect(() => {
    setDisconnected(new Date().getMilliseconds() % 2);
  }, []);

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
              Disconnect
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Disconnect current whatsapp to change whatsapp number.
            </p>
            <img src={images.whatsapp[0]} alt="whatsapp image logout" className="mt-3" />
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2 flex items-center">
            <form className="space-y-6" action="#" method="POST">
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2">
                  <h3 className="font-semibold text-xl">
                    Disconnect from Whatsapp
                  </h3>
                </div>
                <div className="col-span-1">
                  {disconnected ? (
                    <a className="relative w-8 h-8 flex items-center justify-center bg-green-600 rounded-full hover:bg-green-900">
                      <CheckIcon
                        className="w-5 h-5 text-white"
                        aria-hidden="true"
                      />
                    </a>
                  ) : (
                    <a className="relative w-8 h-8 flex items-center justify-center bg-red-600 rounded-full hover:bg-red-900">
                      <XIcon
                        className="w-5 h-5 text-white"
                        aria-hidden="true"
                      />
                    </a>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3">
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
                    <p className="text-red-500 text-sm mt-1">{errors.number}</p>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhatsappInfo;
