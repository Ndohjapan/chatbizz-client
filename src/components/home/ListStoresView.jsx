import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function ListStoresView({files}) {
  return (
    <>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-4 sm:px-0">
            <ul
              role="list"
              className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
            >
              {files.map((file) => (
                <div
                  key={file.id}
                  className="bg-white overflow-hidden shadow rounded-lg cursor-pointer"
                >
                  <Link to="/store/1234">
                  <div className="px-4 py-5 sm:p-6">
                    {/* Content goes here */}
                    <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                    <img
                      src={file.source}
                      alt=""
                      className="object-cover pointer-events-none group-hover:opacity-75"
                    />
                  </div>

                  </div>
                  <div className="bg-gray-50 px-4 py-4 sm:px-6">
                  <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">{file.title}</p>
          <p className="block text-sm font-medium text-gray-500 pointer-events-none">{file.size}</p>
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
