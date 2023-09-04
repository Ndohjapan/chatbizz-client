import React from 'react'
import DrawerProductInfo from './DrawerProductInfo'
import DrawerImageAndVideo from './DrawerImageAndVideo'

export default function DrawerProduct({variant}) {
  return (
    <>
    <DrawerImageAndVideo variant={variant}/>
    <DrawerProductInfo variant={variant}/>
    </>
  )
}
