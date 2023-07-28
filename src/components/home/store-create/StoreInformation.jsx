import info from "../../../assets/information.json"


function StoreInformation() {
    return (
        <div className="space-y-6">
          <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Basic store information.
                </p>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
                <form className="space-y-6" action="#" method="POST">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Store name
                      </label>
                      <div className="mt-1 flex rounded-md border-2 shadow-sm">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300 p-2"
                          placeholder={info.store.name}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Whatsapp Phone
                      </label>
                      <div className="mt-1 flex rounded-md border-2 shadow-sm">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300 p-2"
                          placeholder={info.store.number}
                        />
                      </div>
                    </div>
                  </div>
    
                  <div>
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                      About
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="about"
                        name="about"
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                        placeholder={info.store.about}
                        defaultValue={''}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">Briefly describe your store.</p>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      )
}

export default StoreInformation