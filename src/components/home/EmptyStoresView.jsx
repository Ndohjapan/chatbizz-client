import { PlusCircleIcon } from "@heroicons/react/outline";

function EmptyStoresView() {
  return (
    <>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-4 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex justify-center items-center flex-col">
              <PlusCircleIcon className="text-gray-100 h-48 w-48" />
              <h3 className="text-gray-100 text-xl font-bold">
                Create a store
              </h3>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default EmptyStoresView;
