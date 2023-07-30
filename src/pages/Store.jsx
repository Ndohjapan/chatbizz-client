import { useEffect, useState } from "react";
import EmptyProductTable from "../components/store/EmptyProductTable";
import ProductsHeader from "../components/store/ProductsHeaders";
import ProductsTable from "../components/store/ProductsTable";

function Store() {

  const [viewProducts, setViewProducts] = useState(0);
  useEffect(() => {
    setViewProducts(new Date().getMilliseconds() % 2);
  }, []);

  return (
    <>
      <ProductsHeader />
      {viewProducts ? (
        <EmptyProductTable/>
      ) : (
        <ProductsTable/>
      )}
    </>
  );
}

export default Store;
