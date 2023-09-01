import StoresHeader from "../components/home/StoresHeader";
import EmptyStoresView from "../components/home/EmptyStoresView";
import ListStoresView from "../components/home/ListStoresView";
import { useEffect, useState } from "react";
import { useGetStoresMutation } from "../slices/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, showToast } from "../slices/authSlice";
import errors from "../assets/error.json";
import { ImSpinner8 } from "react-icons/im";

function Home() {
  const [stores, setStores] = useState([]);
  const [getStoresMutation, { isLoading }] = useGetStoresMutation();
  const twk = useSelector((state) => state.auth.twk);
  const newStoreAlert = useSelector((state) => state.auth.newStoreAlert);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGetStores = async () => {
    try {
      const res = await getStoresMutation({ token: twk });
      if (res.error) throw Error(JSON.stringify(res.error));
      setStores(res.data);
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

    handleGetStores();

  }, [newStoreAlert]);

  return (
    <>
      <StoresHeader />
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
          {stores?.length ? (
            <ListStoresView stores={stores} />
          ) : (
            <EmptyStoresView />
          )}
        </>
      )}
    </>
  );
}

export default Home;
