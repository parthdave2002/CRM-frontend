import React, { FC, useState } from 'react'
import {  FaPowerOff } from 'react-icons/fa'
import SalesAddFarmer from './salesAddFarmer';
import LogoutModal from '../../components/modal/logoutModal';

interface PropsData{
  setOpenProfile : (value: boolean) => void;
}

const SalesFarmerDashboard : FC<PropsData> = ( {setOpenProfile}) => {

  const [ farmedAdded, setFarmerAdded] = useState(false);

  
  //-------------- Logout modal Code start --------------
    const [ logoutModal, setLogoutModal] = useState(false);
    const LogOutCall = () =>  setLogoutModal(true)
    const handleClose = () =>  setLogoutModal(false)
    const handleAccept = () =>{
      setLogoutModal(false)
      setOpenProfile(false)
    }
  //-------------- Logout modal Code end --------------

  return (
    <>

      {farmedAdded == true ?
        <SalesAddFarmer  />
      :
        <>
            <div  className='flex justify-between'>
              <div className="text-[2rem] font-semibold text-gray-900 dark:text-gray-100">  Farmer's Profile </div>
              <div className="text-[0.9rem] text-blue-500 flex gap-x-3 cursor-pointer w-fit self-center border dark:border-gray-100 px-3 py-2 rounded-full text-gray-100 bg-red-400 hover:bg-red-500 font-bold text-[1.2rem]" onClick={() => LogOutCall()}> <FaPowerOff style={{alignSelf:"center"}} /> Logout </div>
            </div>
          <LogoutModal openModal={logoutModal} handleClose={handleClose} handleAccept={handleAccept} />
        </>
      }
      
    </>
  )
}

export default SalesFarmerDashboard