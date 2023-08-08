import React from "react";
import ProductDetailsHeader from "../components/product-detail/ProductDetailsHeader";
import ImagesAndVideo from "../components/product-detail/ImagesAndVideo";
import ProductInformation from "../components/product-detail/ProductInformation";

export default function ProductDetail() {
  return (
    <>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto pb-16 pt-6 px-4 sm:pb-24 sm:pt-8 sm:px-6 lg:max-w-7xl lg:px-8">
          <ProductDetailsHeader />
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
            <ImagesAndVideo/>
            <ProductInformation/>
          </div>
        </div>
      </div>
    </>
  );
}
