import { Route, Routes } from "react-router-dom";
import StoreOverview from "../pages/Store"; // You'll need to create StoreOverview component
import { useState } from "react";
import StoreSideBar from "../components/layout/StoreSideBar";
import StoreHeader from "../components/layout/StoreHeader";
import StoreNotFound from "../pages/StoreNotFound";

const StoreDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
    
    <div>
      <StoreSideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="md:pl-64 flex flex-col">
        <StoreHeader setSidebarOpen={setSidebarOpen} />
        <Routes>
          <Route path="/" element={<StoreOverview />} />
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