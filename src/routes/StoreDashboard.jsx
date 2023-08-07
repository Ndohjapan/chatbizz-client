import { Route, Routes } from "react-router-dom";
import StoreOverview from "../pages/Store";
import { useState } from "react";
import StoreSideBar from "../components/layout/StoreSideBar";
import StoreHeader from "../components/layout/StoreHeader";
import StoreNotFound from "../pages/StoreNotFound";
import NewProduct from "../pages/NewProduct";
import ProductDetail from "../pages/ProductDetail";

const StoreDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div>
        <StoreSideBar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <div className="md:pl-64 flex flex-col flex-1">
          <StoreHeader setSidebarOpen={setSidebarOpen} />
          <Routes>
            <Route path="/" element={<StoreOverview />} />
            <Route path="/product/draft/:draftId" element={<NewProduct />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route
              path="*"
              element={
                <>
                  <StoreNotFound />
                </>
              }
            />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default StoreDashboard;
