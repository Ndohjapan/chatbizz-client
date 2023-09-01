import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setSelectedStore } from "../../slices/authSlice";


// eslint-disable-next-line react/prop-types
function ListStoresView({ stores }) {

  const dispatch = useDispatch();

  return (
    <>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-4 sm:px-0">
            <ul
              role="list"
              className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
            >
              {stores.map((store) => (
                <div
                  key={store._id}
                  className="bg-white overflow-hidden shadow rounded-lg cursor-pointer"
                >
                  <Link to={`/store/${store._id}`} onClick={ () => {dispatch(setSelectedStore(store._id))}}>
                    <div className="px-4 py-5 sm:p-6">
                      <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                        <img
                          src={store.image}
                          alt={store.name}
                          className="object-cover pointer-events-none group-hover:opacity-75"
                        />
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-4 sm:px-6">
                      <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
                        {store.name}

                        {store.whatsappConnected ? (
                          <span className="ml-3 inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                            Connected
                          </span>
                        ) : (
                          <span className="ml-3 inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                            Disconnected
                          </span>
                        )}
                      </p>
                      <p className="block text-sm font-medium text-gray-500 pointer-events-none">
                        {store.storeType}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}

export default ListStoresView;
