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
import CartList from './cart';
import OrderDetails from '../../components/salesComponent/orderDetails';
import { toast } from 'react-toastify';
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
    else {
      setFarmerAdded(true)
    }
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
    const ProductCLoseCall = () =>  setProductDetails(null);

    const [searchData, setSearchData] = useState("");
    const handleChange = (data: any) => setSearchData(data)
    const handleClickCall = () => console.log("callll");

  // -------- Cart open/close code start ----------
    const [ cartOpen, setCartOpen] = useState(false); 
    const [ cartItem, setCartItem] = useState<any[]>([]); 
    const [ cartOrderid, setCartOrderid] = useState(null); 

    const OpenCartCall = () => setCartOpen(true);    

    const AddtoCartCall = (data: any) => {
      setCartItem((prevItems) => {
        const isProductInCart = prevItems.some((item) => item._id === data._id);
        
        if (isProductInCart) {
          toast.error("Product already in cart")
          return prevItems; 
        }
        window.scrollTo({
          top: 0,
          behavior: "smooth", 
        });
    
        return [...prevItems, data];
      });
    }

    const handleRemoveCall = (data: any) =>{
      setCartItem((prevItems) => prevItems.filter((item) => item._id !== data));
    }
  // -------- Cart open/close code end ----------

  // -------------- Order Details open/close code start --------------------
    const [openDetailsmodal, setOpenDetailsmodal] = useState(false);
    const [openDetailId, setOpenDetailId] = useState< null | string>(null)
    const [openDetailIData, setOpenDetailIData] = useState(null)

    const closeOrderDetail = () =>{
      setOpenDetailsmodal(false)
    }
  // -------- Order Details open/close code end ----------


  return (
    <>

      {farmedAdded == true ?
        <SalesAddFarmer isEditFarmer={isEditFarmer} setFarmerAdded={setFarmerAdded}  />
      :
        <>
          {cartOpen == true ?
            <div>  <CartList setCartOpen={setCartOpen} setCartItem={setCartItem} CartData={cartItem} handleRemoveCall={handleRemoveCall} cartOrderid={cartOrderid} /> </div>
            : openDetailsmodal == true?
              <OrderDetails orderId={openDetailId} closeOrderDetail={closeOrderDetail} openDetailIData={openDetailIData} /> 
            :
            <div className='flex flex-col'>
              <div className='flex justify-end gap-x-[2rem] my-3'>
                <div className="relative cursor-pointer flex gap-x-3 items-center dark:text-gray-100 font-bold text-lg" onClick={() => OpenCartCall()}>
                  <div>
                    <TiShoppingCart className="h-8 w-8 dark:text-white relative text-indigo-500" />
                    <div className="absolute top-0 right-12 transform translate-x-2 -translate-y-2 bg-indigo-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md"> {cartItem?.length} </div>
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
                  <ProductDetailData ProductDetails={ProductDetails} ProductCLoseCall={ProductCLoseCall} />
                  :
                  <>
                    <div className='flex mt-[2rem] mb-2'>
                      <div className='flex-1 flex text-[2rem] dark:text-gray-400 font-bold self-end '> Personal Info</div>
                      <div className='flex-1 flex justify-end  self-end '> <div className='border border-indigo-500 text-indigo-500 dark:text-white hover:text-gray-100 font-semibold px-6 py-2 rounded-full  gap-3 hover:bg-indigo-800 transition flex text-center cursor-pointer  transition-all duration-500 ease-in-out' onClick={() => EditFarmerCall()}> <FaPencilAlt className='self-center h-5 w-5' /> Edit Customer </div> </div>
                    </div>
                    <FarmeDashboard viewButton={true} classData="border dark:border-gray-600 rounded-xl w-full py-2 px-4 transition-all duration-800 ease-in-out" />

                    <div className='mt-[2rem] text-[2rem] dark:text-gray-400 font-bold'> History </div>
                    <FarmerHistory setOpenDetailId={setOpenDetailId} setOpenDetailIData={setOpenDetailIData}  setOpenDetailsmodal={setOpenDetailsmodal}  AddtoCartCall={AddtoCartCall} setCartOrderid={setCartOrderid} />

                    <div className='flex mt-[1rem]'>
                      <div className='flex-1 self-end text-[2rem] dark:text-gray-400 font-bold'> Products Data</div>
                      <SalesMobileInput datatype='text' mainclassname="flex self-center mt-[3rem] justify-end gap-x-3 border-0" className="py-2 px-6 border-0  rounded-xl text-[1.5rem] text-gray-500 font-normal relative  dark:bg-gray-700 dark:text-gray-100" buttonCss="px-[2rem] py-[0.5rem] bg-gray-800 dark:bg-gray-700 rounded-r-full text-[1.6rem] text-gray-50 absolute  dark:text-gray-400" value={searchData} handleChange={(data) => handleChange(data)} handleClickCall={handleClickCall} placeholder="Search Product" />
                    </div>
                    <Salesproductlist searchData={searchData} ProductDetailsCall={ProductDetailsCall} isLoggedin={true}  AddtoCartCall={AddtoCartCall}/>
                  </>
                }
              </div>
            </div>
          }

          <LogoutModal openModal={logoutModal} handleClose={handleClose} handleAccept={handleAccept} />
        </>
      }
      
    </>
  )
}

export default SalesFarmerDashboard