import { useEffect, useState } from "react";
import images from "../../../assets/images.json";
import CheckMark from "./CheckMark";
import XMark from "./XMark";
import { useGetQRMutation } from "../../../slices/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, showToast } from "../../../slices/authSlice";
import errors from "../../../assets/error.json";
import { ImSpinner8 } from "react-icons/im";

function QRCodeView() {
  const [hideCode, setHideCode] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [displayComponent, setDisplayComponent] = useState("");
  const [getQRCodeMutation, { isLoading: isQRLoading }] = useGetQRMutation();
  const newStoreWANum = useSelector((state) => state.auth.newStoreWANum);
  const twk = useSelector((state) => state.auth.twk);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGetQR = async () => {
    try {
      const res = await getQRCodeMutation({ phone: newStoreWANum, token: twk });
      if (res.error) throw Error(JSON.stringify(res.error));
      setQrCode(res.data.qrCodeUrl);
      return res.data;
    } catch (error) {
      const message = JSON.parse(error.message);

      if (message.status === 401) {
        dispatch(logout());
        navigate("/login");
      }

      const errorMessage = message.data.message;
      dispatch(
        showToast({
          title: errors["title-error"],
          message: errorMessage,
        })
      );
    }
  };

  return (
    <div className="space-y-6 mt-4">
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1 md:mt-8">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Whatsapp Code
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Scan code to set up the bot for your store. Enable the bot from
              your store menu once successful.
            </p>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            {qrCode ? (
              <img
                // hidden={hideCode}
                className="w-full h-full mx-auto md:max-w-xs"
                src={qrCode}
                alt="qr code"
              />
            ) : (
              <>
                <div className="flex items-center justify-center h-full">
                  {isQRLoading ? (
                    <ImSpinner8 className="text-7xl animate-spin text-gray-400" />
                  ) : (
                    <button
                      onClick={handleGetQR}
                      className="py-3 px-3 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 border border-transparent rounded-md shadow-sm text-sm text-white font-medium "
                    >
                      Generate Qr
                    </button>
                  )}
                </div>
              </>
            )}
            {/* {displayComponent === "checkmark" && <CheckMark />} */}
            {/* {displayComponent === "xmark" && <XMark />} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QRCodeView;
