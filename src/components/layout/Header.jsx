import { Popover } from "@headlessui/react";
import app from "../../config/firebase-config";
import { getAuth, signOut } from "firebase/auth";
import { logout } from "../../slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function Header() {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        dispatch(logout());
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Popover className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="#">
              <span className="sr-only">Workflow</span>
              <img
                className="h-8 w-auto sm:h-10"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt=""
              />
            </Link>
          </div>

          <div className="flex items-center justify-end md:flex-1 lg:w-0">
            <button
              onClick={logoutHandler}
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </Popover>
  );
}

export default Header;
