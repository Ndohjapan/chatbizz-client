import React from 'react'

export default function ProductDetailsHeader() {
  return (
    <div className="pb-6 sm:pb-8 flex items-center justify-between">
    <h3 className="text-lg leading-6 font-medium text-gray-900">
      Product
    </h3>
    <div className="mt-3 flex sm:mt-0 sm:ml-4">
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Discard
      </button>
      <button
        type="button"
        className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Save
      </button>
    </div>
  </div>
  )
}
