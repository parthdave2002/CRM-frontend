import React, { FC, useState } from 'react'
import { Button, Modal } from "flowbite-react";
import { FaWindowClose } from 'react-icons/fa';

interface ProfileData{
  setFarmerAdded : (value: boolean) => void;
}

const SalesAddFarmer: FC<ProfileData> = ({setFarmerAdded}) => {

  return (
   <>
      <div className='flex justify-between'>
        <div className="text-[2rem] font-semibold text-gray-900 dark:text-gray-100"> Add Farmer </div>
        <div className="text-[2rem] font-semibold text-gray-900 dark:text-gray-100 flex self-center cursor-pointer " onClick={() => setFarmerAdded(false)}> <FaWindowClose /> </div>
      </div>
      
   </>
  )
}

export default SalesAddFarmer