import StoresHeader from "../components/home/StoresHeader";
import EmptyStoresView from "../components/home/EmptyStoresView";
import ListStoresView from "../components/home/ListStoresView";
import { useEffect, useState } from "react";
import images from "../assets/images.json"

const files = [
  {
    title: "Lavent Living",
    size: "Ecommerce",
    source:
      images.illustration.ecommerce[(new Date).getMilliseconds() % 4],
  },
  {
    title: "Expertnaire",
    size: "Digital",
    source:
    images.illustration["digital-product"][(new Date).getMilliseconds() % 4],
  },
  {
    title: "OHIC",
    size: "Digital",
    source:
    images.illustration["digital-product"][(new Date).getMilliseconds() % 4],
  },
  {
    title: "Geel Geworden",
    size: "Ecommerce",
    source:
    images.illustration.ecommerce[(new Date).getMilliseconds() % 4],
  },
];

function Home() {
  const [viewStores, setViewStores] = useState(0);
  useEffect(() => {
    setViewStores(new Date().getMilliseconds() % 2);
  }, []);

  return (
    <>
      <StoresHeader />
      {viewStores ? <ListStoresView files={files} /> : <EmptyStoresView />}
    </>
  );
}

export default Home;
