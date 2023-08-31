import { useEffect, useState } from "react";
import EmptyProductTable from "../components/store/EmptyProductTable";
import ProductsHeader from "../components/store/ProductsHeaders";
import ProductsTable from "../components/store/ProductsTable";
import { useGetProductsMutation } from "../slices/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { logout, showToast } from "../slices/authSlice";
import errors from "../assets/error.json";
import { ImSpinner8 } from "react-icons/im";

function Store() {
  const [products, setProducts] = useState([]);
  const [getProductsMutation, { isLoading }] = useGetProductsMutation();
  const twk = useSelector((state) => state.auth.twk);
  const selectedStore = useSelector((state) => state.auth.selectedStore);
  const location = useLocation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGetProducts = async (storeId) => {
    try {
      const res = await getProductsMutation({
        token: twk,
        store: storeId,
      });
      if (res.error) throw Error(JSON.stringify(res.error));
      setProducts(res.data);
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
    const url = location.pathname.match(/store\/([^/]*)/);

    const storeId = selectedStore ? selectedStore : url[1];

    console.log(storeId);

    handleGetProducts(storeId);
  }, []);

  return (
    <>
      <ProductsHeader />
      {isLoading ? (
        <>
          <main>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <div className="px-4 py-4 sm:px-0">
                <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex justify-center items-center flex-col">
                  <ImSpinner8 className="text-7xl animate-spin text-gray-400" />
                </div>
              </div>
            </div>
          </main>
        </>
      ) : (
        <>
          {products ? (
            <ProductsTable products={products} />
          ) : (
            <EmptyProductTable />
          )}
        </>
      )}
    </>
  );
}

export default Store;
