import { useState } from "react";
import GoogleIcon from "../../assets/GoogleIcon";
import { ImSpinner8 } from "react-icons/im";
import { Link } from "react-router-dom";
import images from "../../assets/images.json"

// eslint-disable-next-line react/prop-types
function LoginForm({ loginWithGoogle, loginWithEmailPassword }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    validateInput(name, value);
  };

  const validateInput = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "email":
        // eslint-disable-next-line no-case-declarations
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors[name] = "Invalid email format";
        } else {
          delete newErrors[name];
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isEmpty = Object.keys(errors).length === 0;
    if (isEmpty) {
      setButtonLoading(true);
      await loginWithEmailPassword(formData);
      setButtonLoading(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <Link
                to="/signup"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                create an account
              </Link>
            </p>
          </div>

          <div className="mb-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <div className="mb-6">
                <div className="mb-6 grid grid-cols-1 gap-3">
                  <div>
                    <button
                      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-600 hover:bg-gray-50"
                      onClick={loginWithGoogle}
                    >
                      <span className="sr-only">Sign in with Google</span>
                      <GoogleIcon />{" "}
                      <span className="pl-2">Sign in with Google</span>
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>
              </div>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <Link
                      to="/forgot-password"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={buttonLoading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {buttonLoading ? (
                      <>
                        <ImSpinner8 className="animate-spin" />
                      </>
                    ) : (
                      "Login"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <img
            className="h-full w-full object-cover"
            src={images.background[0]}
            alt="sign up image"
          />
        </div>
      </div>
    </>
  );
}

export default LoginForm;
