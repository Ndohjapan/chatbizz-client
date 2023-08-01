// eslint-disable-next-line react/prop-types
function ProgressBar({ percentage }) {
  const SpinnerIcon = (
    <svg
      version="1.2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="48"
      height="48"
      className="animate-spin"
    >
      <title>spinner</title>
      <defs>
        <image
          width="512"
          height="439"
          id="img1"
          href="data:image/png;base64,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"
        />
      </defs>
      <style></style>
      <use id="Background" href="#img1" x="0" y="73" />
    </svg>
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

  console.log(percentage);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-4">
      <div className="flex flex-col items-center justify-center">
        <div>
          <>{percentage > 99 ?  CheckMark  :  SpinnerIcon }</>
        </div>
        <div className="mt-3">
          <h4 className="sr-only">Status</h4>
          <p className="text-sm font-medium text-gray-900 text-center">
            {percentage > 99 ? ("Upload Complete") : ("Uploading Image(s)..")}
          </p>
          <div className="mt-2" aria-hidden="true">
            <div className="w-52 bg-gray-200 rounded-full overflow-hidden md:w-96">
              <div
                className="h-2 bg-indigo-600 rounded-full"
                style={{ width: percentage+"%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
