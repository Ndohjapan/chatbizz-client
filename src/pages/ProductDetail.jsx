import React, { useEffect, useState } from "react";
import ProductDetailsHeader from "../components/product-detail/ProductDetailsHeader";
import ImagesAndVideo from "../components/product-detail/ImagesAndVideo";
import ProductInformation from "../components/product-detail/ProductInformation";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductMutation } from "../slices/userApiSlice";
import { logout, showToast } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import errors from "../assets/error.json";
import LoadingState from "../components/product-detail/LoadingState";

export default function ProductDetail() {
  const { productId } = useParams();

  const [getProductMutation, { isLoading }] = useGetProductMutation();
  const twk = useSelector((state) => state.auth.twk);
  const selectedStore = useSelector((state) => state.auth.selectedStore);
  const url = location.pathname.match(/store\/([^/]*)/);
  const [product, setProduct] = useState(undefined);

  const storeId = selectedStore ? selectedStore : url[1];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const updateProductFunc = async (update) => {
    try {
      const updatedProduct = {
        ...product,
        ...update,
      };

      setProduct(updatedProduct);

    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleGetProduct = async () => {
    try {
      const res = await getProductMutation({
        token: twk,
        product: productId,
        store: storeId,
      });
      if (res.error) throw Error(JSON.stringify(res.error));
      setProduct(res.data);
    } catch (error) {
      const message = JSON.parse(error.message);

      if (message.status === 401) {
        dispatch(logout());
        navigate("/login");
      }

      const errorMessage = message.data.message;
      dispatch(
        showToast({
          title: errors["title-error"],
          message: errorMessage,
        })
      );
    }
  };

  useEffect(() => {
    handleGetProduct();
  }, []);

  return (
    <>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto pb-16 pt-6 px-4 sm:pb-24 sm:pt-8 sm:px-6 lg:max-w-7xl lg:px-8">
          <ProductDetailsHeader />
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
            {!isLoading && product ? (
              <>
                <ImagesAndVideo
                  product={product}
                  updateProductFunction={updateProductFunc}
                />
                <ProductInformation
                  product={product}
                  updateProductFnc={updateProductFunc}
                />
              </>
            ) : (
              <>
                <LoadingState />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
