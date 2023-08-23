function CheckMark() {
    return (
        <>
          <div className="flex flex-col item-center justify-center">
            <div className="w-40 h-40 rounded-full border-2 border-green-500 mx-auto my-5 relative">
              <svg
                className="w-full h-full absolute top-0 left-0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 52 52"
              >
                <circle
                  className="text-green-600 checkmark__circle stroke-current fill-none stroke-2 stroke-miter-10"
                  cx="26"
                  cy="26"
                  r="25"
                />
                <path
                  className="text-green-600 checkmark__check transform origin-center stroke-current fill-none stroke-2 stroke-miter-10"
                  d="M14.1 27.2l7.1 7.2 16.7-16.8"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-center text-gray-700 font-medium">Click on the next button</h1>
            </div>
          </div>
        </>
      );
}

export default CheckMark