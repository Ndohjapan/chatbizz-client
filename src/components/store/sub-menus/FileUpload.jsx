/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { TrashIcon } from "@heroicons/react/outline";
import ImageUploadIcon from "../../../assets/ImageUploadIcon";
import { useDispatch } from "react-redux";
import { showToast } from "../../../slices/authSlice";
import errors from "../../../assets/error.json"
const fileLimit = {"Products": {
  maxFilesLimit: 7, 
  maxFileSize: 5242880,
}, "Testimonials": {
  maxFilesLimit: 7,
  maxFileSize: 1048576
}}

function FileUpload({isDragActive, setIsDragActive, selectedFiles, setSelectedFiles, setPercentages, FileLimit}) {
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

  const maxFilesLimit = fileLimit[FileLimit].maxFilesLimit;
  const maxFileSize = fileLimit[FileLimit].maxFileSize;

  const dispatch = useDispatch();

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
    if (files.length > maxFilesLimit) {
        dispatch(showToast({title: errors["title-error"], message: errors["error-max-file"]}));
        return;
      }
      
      const invalidFiles = files.filter((file) => file.size > maxFileSize);
      if (invalidFiles.length > 0) {
        dispatch(showToast({title: errors["title-error"], message: errors["error-file-size"]+ ` ${maxFileSize/1048576}MB: ` +invalidFiles.map(file => file.name).join(", ")}));
        return;
      }

    setSelectedFiles([...selectedFiles, ...files]);
    setIsDragActive(false);
    const sum = files.length + selectedFiles.length
    setPercentages(Array(sum).fill(0))
  };

  const handleFileInput = (event) => {
    const files = event.target.files;
    const fileArray = Array.from(files);

    if (fileArray.length > maxFilesLimit) {
      dispatch(showToast({title: errors["title-error"], message: errors["error-max-file"]}));
      return;
    }
    
    const invalidFiles = fileArray.filter((file) => file.size > maxFileSize);
    if (invalidFiles.length > 0) {
      dispatch(showToast({title: errors["title-error"], message: errors["error-file-size"]+` ${maxFileSize/1048576}MB: `+invalidFiles.map(file => file.name).join(", ")}));
      return;
    }

    setSelectedFiles([...selectedFiles, ...files]);
    const sum = files.length + selectedFiles.length
    setPercentages(Array(sum).fill(0))
  };

  const handleClearSelection = () => {
    setSelectedFiles([]);
    setPercentages([]);
  };

  const handleUnselectFile = (file) => {
    const updatedSelectedFiles = selectedFiles.filter((selectedFile) => selectedFile !== file)
    setSelectedFiles(updatedSelectedFiles);
    setPercentages(Array(updatedSelectedFiles.length).fill(0))
  };


  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-4">
      <div>
        <h1 className="text-base font-medium text-gray-900">Upload files</h1>
        <div
          className={`mt-4 border-dashed border-4 ${
            isDragActive
              ? "border-indigo-500 ring-2 ring-indigo-500"
              : "border-gray-300"
          } rounded-lg p-6 flex flex-col items-center cursor-pointer focus:outline-none `}
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
            <div className="mt-2 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-3 w-full max-h-96" id="file-container">
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
