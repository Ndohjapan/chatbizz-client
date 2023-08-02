import SpinnerIcon from "../../../assets/SpinnerIcon";

// eslint-disable-next-line react/prop-types
function ProgressBar({ percentage }) {
    const SpinnerSVGIcon = (
      <SpinnerIcon/>
    );
    const CheckMark = (
      <div className="w-12 h-12 rounded-full border-2 border-green-500 mx-auto relative">
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
    );
  
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="flex flex-col items-center justify-center">
          <div>
            <>{percentage > 99 ? CheckMark : SpinnerSVGIcon}</>
          </div>
          <div className="mt-3">
            <h4 className="sr-only">Status</h4>
            <p className="text-sm font-medium text-gray-900 text-center">
              {percentage > 99 ? "Upload Complete" : "Uploading Image(s).."}
            </p>
            <div className="mt-2" aria-hidden="true">
              <div className="w-52 bg-gray-200 rounded-full overflow-hidden md:w-96">
                <div
                  className="h-2 bg-indigo-600 rounded-full"
                  style={{ width: percentage + "%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default ProgressBar;
  