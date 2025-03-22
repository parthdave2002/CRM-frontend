import React, { FC, useState } from 'react'
import {  FaPowerOff } from 'react-icons/fa'
import SalesAddFarmer from './salesAddFarmer';
import LogoutModal from '../../components/modal/logoutModal';
import FarmerHistory from './farmerHistory';
import FarmeDashboard from './farmeDashboard';
import { FaCartShopping } from 'react-icons/fa6';
import Salesproductlist from '../../components/productdetails/salesproductlist';
import ProductDetailData from '../../components/productdetails/salesproductDetails';
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

    const [ProductDetails, setProductDetails] = useState<null | string>(null);
    const ProductDetailsCall = (data:string) =>  setProductDetails(data);
    const ProductCLoseCall = () => {
      setProductDetails(null);
    }
  return (
    <>

      {farmedAdded == true ?
        <SalesAddFarmer setFarmerAdded={setFarmerAdded}  />
      :
        <div className='flex flex-col h-[85vh]'>
            <div  className='flex justify-end gap-x-3 my-3'>
                      <div className='flex gap-x-3 cursor-pointer  border dark:border-gray-100 px-[2rem] py-1 rounded-xl w-[10rem] text-gray-100 bg-green-500 hover:bg-red-600 font-bold text-[1.2rem]'> <FaCartShopping  className='self-center' /> Cart</div>
                      <div className="flex gap-x-3 cursor-pointer  border dark:border-gray-100 px-[2rem] py-1 rounded-xl w-[10rem] text-gray-100 bg-red-500 hover:bg-red-600 font-bold text-[1.2rem]" onClick={() => LogOutCall()}> <FaPowerOff  className='self-center' /> Logout </div>
            </div>
            <div className="flex flex-col">
              
                  {ProductDetails != null ?
                    <ProductDetailData ProductDetails={ProductDetails} ProductCLoseCall={ProductCLoseCall}  />
                    :
                    <>
                      <FarmeDashboard />
                      <FarmerHistory />
                      <Salesproductlist ProductDetailsCall={ProductDetailsCall} />
                    </>
                  }
            </div>

          <LogoutModal openModal={logoutModal} handleClose={handleClose} handleAccept={handleAccept} />
        </div>
      }
      
    </>
  )
}

export default SalesFarmerDashboard