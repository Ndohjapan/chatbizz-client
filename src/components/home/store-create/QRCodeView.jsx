import { useState } from "react";
import images from "../../../assets/images.json";
import CheckMark from "./CheckMark";
function QRCodeView() {
  const [hideCode, setHideCode] = useState(false);
  const [displayCheckMark, setDisplayCheckMark] = useState(false);

  const toggleQR = () => {
    setHideCode(!hideCode);
  };

  const toggleCheckMark = () => {
    setDisplayCheckMark(!displayCheckMark);
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
              Scan code to setup bot for your store. Enable bot from your store
              menu once successful.
            </p>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <img
              hidden={hideCode}
              className="w-full h-full mx-auto md:max-w-xs"
              src={images["qr-code"][0]}
              alt="qr code"
            />
            {displayCheckMark && (<CheckMark/>)}

            {setTimeout(() => {
                toggleQR();
                toggleCheckMark();
            }, 5000)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QRCodeView;
