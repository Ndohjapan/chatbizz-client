function XMark() {
  return (
    <>
      <div className="flex flex-col item-center justify-center">
        <div className="w-40 h-40 rounded-full border-2 border-red-500 mx-auto my-5 relative">
          <svg
            className="w-full h-full absolute top-0 left-0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              className="text-red-600 xmark__circle stroke-current fill-none stroke-2 stroke-miter-10"
              cx="26"
              cy="26"
              r="25"
            />
            <path
              className="text-red-600 xmark__cross transform origin-center stroke-current fill-none stroke-2 stroke-miter-10"
              d="M16 16 36 36 M36 16 16 36"
            />
          </svg>
        </div>
        <div>
        <h1 className="text-center text-gray-700 font-medium">Scan Failed! {" "}           <a
            className="text-center mt-2 text-indigo-600 hover:underline cursor-pointer"
          >try again</a></h1>
        </div>
      </div>
    </>
  );
}

export default XMark;
