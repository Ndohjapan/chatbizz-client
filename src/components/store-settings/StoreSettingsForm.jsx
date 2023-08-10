import info from "../../assets/information.json";
import PaymentLink from "../../assets/PaymentLink";


function StoreSettingsForm() {

  return (
    <>
      <div className="space-y-6">
        {/* Basic information */}

        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Store Information
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                This information will be used by the bot to identify your store.
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form className="space-y-6" action="#" method="POST">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Store Name <span className="text-red-400 font-bold">*</span>
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="name"
                      name="name"
                      rows={3}
                      required
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                      placeholder={info.store.name}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    About Store{" "}
                    <span className="text-red-400 font-bold">*</span>
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="description"
                      name="description"
                      rows={12}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                      placeholder={info.store.about}
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Give as much information as possible
                  </p>
                </div>
              </form>
              <div className="pt-6 flex justify-end">
                <button
                  type="button"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Account Number */}

        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Bank Account
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Insert your bank details to enable bot make sales for you.
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form action="#" method="POST">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="bank-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Bank Name
                    </label>
                    <select
                      id="bank-name"
                      name="bank-name"
                      autoComplete="bank-name"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option>Zenith Bank Plc.</option>
                      <option>UBA</option>
                      <option>Kuda Bank</option>
                      <option>Opay</option>
                      <option>Access Bank</option>
                      <option>Eco Bank</option>
                      <option>KeyStone Bank</option>
                    </select>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="account-number"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Account Number
                    </label>
                    <input
                      type="account-number"
                      name="account-number"
                      id="account-number"
                      autoComplete="222 333 4444"
                      placeholder="222 333 4444"
                      className="mt-1 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="holders-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Holders Name
                    </label>
                    <input
                      type="holders-name"
                      name="holders-name"
                      id="holders-name"
                      autoComplete="John Doe"
                      placeholder="John Doe"
                      disabled={true}
                      className="mt-1 border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
                    />
                  </div>
                </div>
              </form>
              <div className="pt-6 flex justify-end">
                <button
                  type="button"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Link */}

        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Payment Link
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Insert your payment link if there is any.
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form action="#" method="POST">
                <div className="grid grid-cols-6 gap-6 mt-3">
                  <div className="col-span-6 sm:col-span-5">
                    <label
                      htmlFor={`payment-link`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {"Link"}
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm border">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-400 sm:text-sm">
                          <PaymentLink />
                        </span>
                      </div>
                      <input
                        type="text"
                        name={"payment-link"}
                        id={"payment-link"}
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-16 sm:pl-14 sm:text-sm border-gray-300 rounded-md p-2"
                        placeholder="Stripe, Paystack, Flutterwave etc"
                      />
                    </div>
                  </div>
                </div>
              </form>
              <div className="pt-6 flex justify-end">
                <button
                  type="button"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Store */}

        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Delete Store
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                No longer want to use this store? You can delete your store
                here. This action is not reversible. All information related to
                this store will be deleted permanently.
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Delete Store
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StoreSettingsForm;
