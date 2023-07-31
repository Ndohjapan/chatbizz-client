import React, { useState } from "react";
import {Image} from "cloudinary-react"

const ImageUpload = () => {
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState([]);
  const maxFilesLimit = 5;
  const maxFileSize = 5242880; // 5 MB in bytes

  // myImage.resize(fill().width(250).height(250));

  const uploadImage = async () => {
    setLoading(true);
    console.log(images);

    try {
      const uploadPromises = images.map((file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
        data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
        data.append("folder", "Cloudinary-React");
        data.append("max_files", maxFilesLimit);

        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open(
            "POST",
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
            true
          );

          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              const percentage = (event.loaded / event.total) * 100;
              console.log(`Upload progress: ${percentage.toFixed(2)}%`);
            }
          };

          xhr.onload = () => {
            if (xhr.status === 200) {
              const response = JSON.parse(xhr.response);
              resolve(response);
            } else {
              reject(xhr.statusText);
            }
          };

          xhr.onerror = () => {
            reject(xhr.statusText);
          };

          xhr.send(data);
        });
      });

      const responses = await Promise.all(uploadPromises);

      setUrls(responses.map((res) => res.public_id));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleImageChange = (event) => {
    const files = event.target.files;
    const fileArray = Array.from(files);

    // Limit the number of files to upload
    if (fileArray.length > maxFilesLimit) {
      alert(`You can only upload up to ${maxFilesLimit} files.`);
      return;
    }

    // Check the size of each file before adding to the state
    const invalidFiles = fileArray.filter((file) => file.size > maxFileSize);
    if (invalidFiles.length > 0) {
      alert(`The following files exceed the maximum allowed size (${maxFileSize / 1024} KB): ${invalidFiles.map(file => file.name).join(", ")}`);
      return;
    }

    setImages(fileArray);

    fileArray.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        setPreview((prevPreview) => [...prevPreview, reader.result]);
      };
    });
  };

  const handleResetClick = () => {
    setPreview([]);
    setImages([]);
  };



  return (
    <div className="h-screen sm:px-8 md:px-16 sm:py-8">
      <div className="container mx-auto max-w-screen-lg h-full">
        <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
          <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
            <span>Click on Upload a File</span>&nbsp;
          </p>
          <input
            id="hidden-input"
            type="file"
            className="hidden"
            onChange={handleImageChange}
            accept="image/*"
            multiple
          />
          <label htmlFor="hidden-input" className="cursor-pointer">
            <div className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none">
              Upload a file
            </div>
          </label>

          <div className="flex justify-center items-center mt-5 mx-3 max-w-xs">
            {preview.map((previewImage, index) => (
              <img key={index} src={previewImage} alt={`preview ${index}`} className="w-full" />
            ))}
          </div>
        </header>
        <div className="flex justify-end pb-8 pt-6 gap-4">
          <button
            onClick={uploadImage}
            className="rounded-sm px-3 py-1 bg-blue-700 hover:bg-blue-500 text-white focus:shadow-outline focus:outline-none disabled:cursor-not-allowed"
            disabled={images.length === 0}
          >
            Upload now
          </button>
          <button
            onClick={handleResetClick}
            className="rounded-sm px-3 py-1 bg-red-700 hover:bg-red-500 text-white focus:shadow-outline focus:outline-none"
          >
            Reset
          </button>
        </div>
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-4 h-6 w-6"></div>
            <span>Processing...</span>
          </div>
        ) : (
          urls.length > 0 &&
          urls.map((url, index) => (
            <div key={index} className="pb-8 pt-4">
              <Image cloudName={import.meta.env.VITE_CLOUDINARY_CLOUD_NAME} publicId={url} />
            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default ImageUpload;
