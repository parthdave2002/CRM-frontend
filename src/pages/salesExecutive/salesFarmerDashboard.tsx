import React, { FC, useEffect, useState } from 'react'
import {  FaOpencart, FaPencilAlt, FaPowerOff } from 'react-icons/fa'
import SalesAddFarmer from './salesAddFarmer';
import LogoutModal from '../../components/modal/logoutModal';
import FarmerHistory from './farmerHistory';
import FarmeDashboard from './farmeDashboard';
import { TiShoppingCart } from "react-icons/ti";
import Salesproductlist from '../../components/productdetails/salesproductlist';
import ProductDetailData from '../../components/productdetails/salesproductDetails';
import SalesMobileInput from '../../components/input/salesMobileInput';
import { useSelector } from 'react-redux';
interface PropsData{
  setOpenProfile : (value: boolean) => void;
}

const SalesFarmerDashboard : FC<PropsData> = ( {setOpenProfile}) => {

  const [farmedAdded, setFarmerAdded] = useState(false);
  const [ isEditFarmer, setIsEditFarmer] = useState(false);

  const CheckCustomerExistlist = useSelector((state: any) => state.Customer.CheckCustomerExistlist);
  useEffect(() => {
    if (CheckCustomerExistlist?.success == true) {
      setFarmerAdded(false)
    }
    // else {
    //   setFarmerAdded(true)
    // }
  }, [CheckCustomerExistlist])

  const EditFarmerCall = () => {
    setFarmerAdded(true)
    setIsEditFarmer(true)
  }


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
  const ProductDetailsCall = (data: string) => setProductDetails(data);
  const ProductCLoseCall = () => {
    setProductDetails(null);
  }

  const [searchData, setSearchData] = useState("");
  const handleChange = (data: any) => setSearchData(data)
  const handleClickCall = () => {
    console.log("callll");
  }
  return (
    <>

      {farmedAdded == true ?
        <SalesAddFarmer isEditFarmer={isEditFarmer} setFarmerAdded={setFarmerAdded}  />
      :
        <div className='flex flex-col'>
          <div className='flex justify-end gap-x-[2rem] my-3'>
            <div className="relative cursor-pointer flex gap-x-3 items-center dark:text-gray-100 font-bold text-lg">
              <div>
                <TiShoppingCart className="h-8 w-8 dark:text-white relative text-indigo-500" />
                <div className="absolute top-0 right-12 transform translate-x-2 -translate-y-2 bg-indigo-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md"> 3 </div>
              </div>
              <div> Cart </div>
            </div>

            <div className=" cursor-pointer flex gap-x-3 items-center  text-red-500 dark:text-gray-100 font-bold text-lg" onClick={() => LogOutCall()}>
              <FaPowerOff className="h-6 w-6 dark:text-white " />
              <div> Logout </div>
            </div>
           
          </div>
            <div className="flex flex-col">
              
                  {ProductDetails != null ?
                    <ProductDetailData ProductDetails={ProductDetails} ProductCLoseCall={ProductCLoseCall}  />
                    :
                    <>
                      <div className='flex mt-[2rem]'>
                        <div className='flex-1  text-[2rem] dark:text-gray-400 font-bold'> Personal Info</div>
                        <div className='flex-1 flex justify-end  self-end '> <div className='border border-indigo-500 text-indigo-500 dark:text-white hover:text-gray-100 font-semibold px-6 py-2 rounded-full  gap-3 hover:bg-indigo-800 transition flex text-center cursor-pointer  transition-all duration-500 ease-in-out' onClick={() => EditFarmerCall()}> <FaPencilAlt className='self-center h-5 w-5' /> Edit  Customer </div> </div>
                      </div>
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