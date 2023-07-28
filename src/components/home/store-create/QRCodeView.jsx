import images from "../../../assets/images.json"
function QRCodeView() {
  return (
    <div className="space-y-6 mt-4">
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1 md:mt-8">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Whatsapp Code
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Scan code to setup bot for your store. Enable bot from your store menu once successful.
            </p>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
          <img className="w-full h-full" src={images["qr-code"][0]} alt=""/>

          </div>
        </div>
      </div>
    </div>
  );
}

export default QRCodeView;
