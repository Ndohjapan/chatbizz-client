/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { TrashIcon } from "@heroicons/react/outline";
import ImageUploadIcon from "../assets/ImageUploadIcon";
const maxFilesLimit = 10;
const maxFileSize = 5242880;

function FileUpload({isDragActive, setIsDragActive, selectedFiles, setSelectedFiles, setPercentages}) {
  useEffect(() => {
    // Recalculate the container height on selectedFiles change
    const container = document.getElementById("file-container");
    if (container) {
      const containerHeight = container.offsetHeight;
      if (containerHeight >= 384) {
        container.classList.add("overflow-y-scroll");
      } else {
        container.classList.remove("overflow-y-scroll");
      }
    }
  }, [selectedFiles]);

  const handleDragEnter = (event) => {
    event.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragActive(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    setSelectedFiles([...selectedFiles, ...files]);
    setIsDragActive(false);
    const sum = files.length + selectedFiles.length
    setPercentages(Array(sum).fill(0))
  };

  const handleFileInput = (event) => {
    const files = event.target.files;
    const fileArray = Array.from(files);

    if (fileArray.length > maxFilesLimit) {
      alert(`You can only upload up to ${maxFilesLimit} files.`);
      return;
    }

    const invalidFiles = fileArray.filter((file) => file.size > maxFileSize);
    if (invalidFiles.length > 0) {
      alert(`The following files exceed the maximum allowed size (${(maxFileSize / 1024)/1024} MB): ${invalidFiles.map(file => file.name).join(", ")}`);
      return;
    }

    setSelectedFiles([...selectedFiles, ...files]);
    const sum = files.length + selectedFiles.length
    setPercentages(Array(sum).fill(0))
  };

  const handleClearSelection = () => {
    console.log(selectedFiles);
    setSelectedFiles([]);
    setPercentages([]);
  };

  const handleUnselectFile = (file) => {
    const updatedSelectedFiles = selectedFiles.filter((selectedFile) => selectedFile !== file)
    setSelectedFiles(updatedSelectedFiles);
    setPercentages(Array(updatedSelectedFiles.length).fill(0))
  };

  const isOverflowing = selectedFiles.length > 6; // Adjust this number based on your requirement

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-4">
      <div>
        <h1 className="text-base font-medium text-gray-900">Upload files</h1>
        <div
          id="file-container"
          className={`mt-4 border-dashed border-4 ${
            isDragActive
              ? "border-indigo-500 ring-2 ring-indigo-500"
              : "border-gray-300"
          } rounded-lg p-6 flex flex-col items-center cursor-pointer focus:outline-none ${
            isOverflowing ? "max-h-96 overflow-y-scroll" : "max-h-96"
          }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {selectedFiles.length === 0 ? (
            <>
              <ImageUploadIcon />
              <p className="mt-2 block text-sm font-medium text-gray-900 text-center">
                Drag and drop your files here or{" "}
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span>click to browse</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleFileInput}
                    multiple
                    accept=".jpg, .jpeg, .png"
                  />
                </label>
              </p>
            </>
          ) : (
            <div className={`mt-2 grid grid-cols-2 gap-3 md:grid-cols-6 md:gap-2 w-full ${
              isOverflowing ? "grid-rows-1" : ""
            }`}>
              {selectedFiles.map((file, index) => (
                <div key={index} className="text-sm text-gray-500 relative">
                  <button
                    type="button"
                    className="absolute -right-2 -top-2 md:right-4 md:top-0 text-red-500 hover:text-red-600 focus:outline-none"
                    onClick={() => handleUnselectFile(file)}
                  >
                    <TrashIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        {selectedFiles.length > 0 && (
          <button
            type="button"
            className="mt-4 w-full border-2 border-indigo-500 rounded-lg p-4 text-center hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleClearSelection}
          >
            Clear Selection
          </button>
        )}
      </div>
    </div>
  );
}

export default FileUpload;
