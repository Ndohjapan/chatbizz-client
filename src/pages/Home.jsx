import StoresHeader from "../components/home/StoresHeader";
import EmptyStoresView from "../components/home/EmptyStoresView";
import ListStoresView from "../components/home/ListStoresView";
import { useEffect, useState } from "react";

const files = [
  {
    title: "Lavent Living",
    size: "Ecommerce",
    source:
      "https://res.cloudinary.com/lcu-feeding/image/upload/v1690489671/chatbizz/Screenshot_2023-07-27_211938_a9jgqm.png",
  },
  {
    title: "Expertnaire",
    size: "Digital",
    source:
      "https://res.cloudinary.com/lcu-feeding/image/upload/v1690493045/chatbizz/Screenshot_2023-07-27_220554_hi2ji0.png",
  },
  {
    title: "OHIC",
    size: "Digital",
    source:
      "https://res.cloudinary.com/lcu-feeding/image/upload/v1690494638/chatbizz/New_Project_1_g32wev.png",
  },
  {
    title: "Geel Geworden",
    size: "Ecommerce",
    source:
      "https://res.cloudinary.com/lcu-feeding/image/upload/v1690491349/chatbizz/Screenshot_2023-07-27_215317_x2qubf.png",
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
