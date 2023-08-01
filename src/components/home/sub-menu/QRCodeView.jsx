import { useEffect, useState } from "react";
import images from "../../../assets/images.json";
import CheckMark from "./CheckMark";
import XMark from "./XMark";

function QRCodeView() {
  const [hideCode, setHideCode] = useState(false);
  const [displayComponent, setDisplayComponent] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (hideCode) {
        setHideCode(false);
        setDisplayComponent("");
      } else {
        const randomComponent = Math.random() >= 0.5 ? "checkmark" : "xmark";
        setHideCode(true);

        setDisplayComponent(randomComponent);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [hideCode]);

  return (
    <div className="space-y-6 mt-4">
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1 md:mt-8">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Whatsapp Code
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Scan code to set up the bot for your store. Enable the bot from your store
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
            {displayComponent === "checkmark" && <CheckMark />}
            {displayComponent === "xmark" && <XMark />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QRCodeView;
