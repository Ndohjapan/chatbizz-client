import React, { useState } from 'react'
import Drawer from './Drawer'
import VariantsImageUpload from '../components/store/VariantsImageUpload';

function Example() {
    const [open, setOpen] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
  const [IsDrawerOpen, setIsDrawerOpen] = useState(false);
  const [variantDisplayImages, setVariantDisplayImages] = useState([]);

  const updateDisplayImages = (images) => {
    setVariantDisplayImages(images);
  };


  const toggleModal = (toggle) => {
    setIsModalOpen(toggle);
  };

  const toggleDrawer = (toggle) => {
    setIsDrawerOpen(toggle);
  };

  return (
    <>
    <div className='w-64 h-64 flex items-center justify-center border border-dashed border-gray-500'>
    <button className='border bg-indigo-600 text-white p-2 hover:bg-indigo-700 text-2xl rounded-sm' onClick={() => setIsDrawerOpen(true)}>Click Me</button>
    </div>
    {IsDrawerOpen ? (
        <Drawer
          IsDrawerOpen={IsDrawerOpen}
          toggleDrawer={toggleDrawer}
          isModalOpen={isModalOpen}
          open={open}
          setIsModalOpen={setIsModalOpen}
          setOpen={setOpen}
          toggleModal={toggleModal}
          variantDisplayImages={variantDisplayImages}
        />
      ) : (
        <></>
      )}
            {isModalOpen ? (
        <VariantsImageUpload
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
          updateDisplayImages={updateDisplayImages}
          displayImages={variantDisplayImages}
        />
      ) : (
        <></>
      )}
    </>
    

  )
}

export default Example