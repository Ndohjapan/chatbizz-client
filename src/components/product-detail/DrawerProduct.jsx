import React from 'react'
import DrawerProductInfo from './DrawerProductInfo'
import DrawerImageAndVideo from './DrawerImageAndVideo'

export default function DrawerProduct({variant, updateVariantFnc}) {
  return (
    <>
    <DrawerImageAndVideo variant={variant} updateVariantFunction={updateVariantFnc}/>
    <DrawerProductInfo variant={variant} updateVariantFnc={updateVariantFnc}/>
    </>
  )
}
