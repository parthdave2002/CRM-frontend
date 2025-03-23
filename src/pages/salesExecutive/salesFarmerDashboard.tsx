import React, { FC, useEffect, useState } from 'react'
import {  FaPowerOff } from 'react-icons/fa'
import SalesAddFarmer from './salesAddFarmer';
import LogoutModal from '../../components/modal/logoutModal';
import FarmerHistory from './farmerHistory';
import FarmeDashboard from './farmeDashboard';
import { FaCartShopping } from 'react-icons/fa6';
import Salesproductlist from '../../components/productdetails/salesproductlist';
import ProductDetailData from '../../components/productdetails/salesproductDetails';
import SalesMobileInput from '../../components/input/salesMobileInput';
import { useSelector } from 'react-redux';
interface PropsData{
  setOpenProfile : (value: boolean) => void;
}

const SalesFarmerDashboard : FC<PropsData> = ( {setOpenProfile}) => {

  const [ farmedAdded, setFarmerAdded] = useState(false);
  
      const CheckCustomerExistlist = useSelector((state: any) =>  state.Customer.CheckCustomerExistlist);
      useEffect(() =>{
        if(CheckCustomerExistlist?.success == true){
          setFarmerAdded(false)
        }
        else{
          setFarmerAdded(true)
        }
      },[CheckCustomerExistlist])
      
  
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

        const [searchData, setSearchData] = useState("");
        const handleChange = (data:any) => setSearchData(data)
        const handleClickCall = () => {
          console.log("callll");
        }
  return (
    <>

      {farmedAdded == true ?
        <SalesAddFarmer setFarmerAdded={setFarmerAdded}  />
      :
        <div className='flex flex-col'>
            <div  className='flex justify-end gap-x-3 my-3'>
                      <div className='flex gap-x-3 cursor-pointer  border dark:border-gray-100 px-[2rem] py-1 rounded-xl w-[10rem] text-gray-100 bg-green-500 hover:bg-red-600 font-bold text-[1.2rem]'> <FaCartShopping  className='self-center' /> Cart</div>
                      <div className="flex gap-x-3 cursor-pointer  border dark:border-gray-100 px-[2rem] py-1 rounded-xl w-[10rem] text-gray-100 bg-red-500 hover:bg-red-600 font-bold text-[1.2rem]" onClick={() => LogOutCall()}> <FaPowerOff  className='self-center' /> Logout </div>
            </div>
            <div className="flex flex-col">
              
                  {ProductDetails != null ?
                    <ProductDetailData ProductDetails={ProductDetails} ProductCLoseCall={ProductCLoseCall}  />
                    :
                    <>
                      <div className='mt-[2rem] text-[2rem] dark:text-gray-400 font-bold'> Personal Info</div>
                      <FarmeDashboard />

                      <div className='mt-[2rem] text-[2rem] dark:text-gray-400 font-bold'> History </div>
                      <FarmerHistory />

                      <div className='flex mt-[1rem]'>
                        <div className='flex-1 self-end text-[2rem] dark:text-gray-400 font-bold'> Products Data</div>
                        <SalesMobileInput datatype='text' mainclassname="flex self-center mt-[3rem] justify-end gap-x-3 border-0" className="py-2 px-6 border-0  rounded-xl text-[1.5rem] text-gray-500 font-normal relative  dark:bg-gray-700 dark:text-gray-100" buttonCss="px-[2rem] py-[0.5rem] bg-gray-800 dark:bg-gray-700 rounded-r-full text-[1.6rem] text-gray-50 absolute  dark:text-gray-400"  value={searchData} handleChange={(data) =>handleChange(data)} handleClickCall={handleClickCall} placeholder="Search Product"  />
                      </div>
                      <Salesproductlist searchData={searchData} ProductDetailsCall={ProductDetailsCall} />
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