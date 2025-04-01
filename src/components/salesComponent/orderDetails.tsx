import { Badge, Button } from 'flowbite-react';
import React, { FC, useState } from 'react'
import { FaExclamationTriangle, FaPhoneVolume, FaSeedling, FaTruck, FaUserAlt, FaWindowClose } from 'react-icons/fa';
import ComplainCreate from './complainCreate';
import ReturnOrderModalPage from '../../components/modal/returnOrderModal';
const IMG_URL = import.meta.env["VITE_API_URL"];
interface OrderDetailsProps{
  orderId : string | null;
  closeOrderDetail : ( value: boolean ) => void;
} 

const OrderDetails : FC <OrderDetailsProps> = ({orderId, closeOrderDetail}) => {

  const Closecall = () =>{
    closeOrderDetail(false)
  }

  const orderData=[
    {
      product_id  : "67dfc02665d4b8493051f2e0",
      product_img : "1739819438429-1480216168955.jpg",
      product_name : {
        englishname : "Agrostart Pump",
        gujaratiname : "એગ્રોસ્ટાર્ટ પંપ"
      },
      tech_name :{
        gujarati_tech_name : "This is a tech name in guj",
        english_tech_name : "This is a tech name in English"
      },
      amount : 500,
      qty : 2,
      totalamount : 1000,
    },
    {
      product_id  : "67eb83b07c74dded8c98be2d",
      product_img : "1739819438429-1480216168955.jpg",
      product_name : {
        englishname : "Agrostart Tadpatri",
        gujaratiname : "એગ્રોસ્ટાર્ટ Tadpatri"
      },
      tech_name :{
        gujarati_tech_name : "This is new tech name in guj",
        english_tech_name : "This is new tech name in guj"
      },
      amount : 1000,
      qty : 2,
      totalamount : 2000,
    }
  ]

  const data= {
    customerName : "John Doe",
    customerPhone : 9876543210,
    customeralternatenumber : 1234567890,
    customerAddress : "H-34/503 Aandand nagar society, Near Akhbarnagar",
    village : "Ahmedabad",
    taluka : "Ahmedabad",
    district : "Ahmedabad",
    state : "Gujarat",
    pincode : 380013,
    orderDate : "2022-03-15",
  }

  const packingtypeoption = orderData && orderData.map((item: any) => ({ label: item?.product_name?.englishname, value: item.product_id }));

  // -------------- complain modal open/close code start ----------
  const [isOpenComplainCreateModel, setisOpenComplainCreateModel] = useState(false);
  const [ complainProductId, setComplainProductId] = useState("");

  const CreateComplainCall = () => {
    setComplainProductId("");
    setisOpenComplainCreateModel(true);
  }

  const CompainCall = (data:any) =>{
    setComplainProductId(data);
    setisOpenComplainCreateModel(true);
  }
  // -------------- complain modal open/close code end ----------
  
  // --------------  Return Order modal open/close code start ----------
  const [isOpenReturnOrderModel, setisOpenReturnOrderModel] = useState(false);
  const ReturnComplainCall = () => {
    setisOpenReturnOrderModel(true);
  }

  const ReturnCall = () =>{
    console.log("calll");
  }
  // --------------  Return Order  modal open/close code end ----------

  return (
    <>
      <div className='flex justify-between'>
        <div className="flex gap-x-5"> 
          <span className='text-[2rem] font-semibold text-gray-900 dark:text-gray-100'> Order ID :  {orderId}  </span> 
          <Badge  color="warning" size="md" className=' self-center '>  Confirm  </Badge>
        </div>
        <div className="text-[2rem] font-semibold text-gray-900 dark:text-gray-100 flex self-center cursor-pointer " onClick={() => Closecall()}> <FaWindowClose /> </div>
      </div>

      <div className="flex flex-col md:flex-row min-w-full justify-between gap-4">
        {/* Left Section (Order Details) */}
        <div className="md:flex-1">
          <div className="border dark:border-gray-600 dark:bg-gray-800 my-4 p-3 rounded-xl w-full">
            <div className="text-[1.2rem] font-semibold text-gray-900 dark:text-gray-100"> Order Item  </div>

            <div className='my-3 flex flex-col gap-y-8'>
              {orderData && orderData.map((data:any , k:number) =>(
                <div key={k} className='flex justify-between gap-x-4 my-4'>
                  <div className='flex gap-x-3'>
                    <div> <img className='w-[3rem] h-[3rem]' src={`${IMG_URL}/public/product/${data?.product_img}` } alt='product image' /> </div>
                    <div>
                      <div className='truncate text-gray-600 dark:text-gray-300'> {data?.product_name?.englishname} </div>
                      <div className='truncate text-gray-600 text-[0.8rem] dark:text-gray-300'> {data?.tech_name?.english_tech_name} </div>
                    </div>
                  </div>

                  <div className='flex gap-x-3'> 
                    <div className='py-1 px-4 border rounded-xl self-center dark:text-gray-300'> 2 X 500 </div>
                    <div className='text-center self-center dark:text-gray-300'> - 100 </div>
                    <div className='text-center self-center dark:text-gray-300'> = 900 </div>
                  </div>
                  
                  <div className='text-center self-center  bg-indigo-600 hover:bg-indigo-700 text-gray-100 rounded-lg cursor-pointer flex gap-x-2 px-3 py-1.5' onClick={() => CompainCall(data?.product_id)}> <FaExclamationTriangle className='self-center text-xl'  /> Complain </div>

                </div>
              ))}
            </div>
          </div>

          <div className="border dark:border-gray-600 dark:bg-gray-800 my-4 p-4 rounded-xl w-full">
            <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-8"> Order Summary </div>

            <div className="flex flex-col items-end space-y-3">
              <div className="text-lg font-semibold text-gray-500 dark:text-gray-300 flex justify-between w-full max-w-xs"> <span>Total Subtotal </span> <span > : 100000 Rs.</span></div>
              <div className="text-lg font-semibold text-gray-500 dark:text-gray-300 flex justify-between w-full max-w-xs"> <span>Total Discount </span> <span >: 100 Rs.</span> </div>
              <div className="text-lg font-semibold text-gray-500 dark:text-gray-300 flex justify-between w-full max-w-xs"> <span>Total GST </span> <span > : 50 Rs.</span> </div>
            </div>

            <div className="flex justify-end items-center text-xl font-semibold text-gray-500 dark:text-gray-300 mt-4 gap-x-4 "> <span className='text-[1.5rem]'>Grand Total</span> <span className='min-w-[11rem] text-end'> : 950 Rs.</span> </div>
          </div>

          <div className='flex justify-end gap-x-4'>
            <div className='text-center self-center  bg-red-600 border border-red-600 hover:bg-red-600 hover:border-red-500 rounded-lg cursor-pointer flex gap-x-2 px-4 py-2 text-gray-100'  onClick={() => ReturnComplainCall()}  > <FaTruck className='self-center h-6 w-6' /> Return </div>
            <div className='text-center self-center  bg-indigo-600 hover:bg-indigo-700 text-gray-100 rounded-lg cursor-pointer  flex gap-x-2 px-4 py-2' onClick={() => CreateComplainCall()}> <FaExclamationTriangle className='self-center '  /> Complain </div>
          </div>
        </div>
        
        <div className="md:w-[20rem] w-full flex flex-col gap-4 mt-5">
          <div className="border dark:border-gray-600 dark:bg-gray-800 p-3 rounded-xl w-full flex flex-col gap-y-3">
            <div className='dark:text-gray-300 text-[1.2rem] font-semibold'>Invoice</div>  
          </div>

          <div className="border dark:border-gray-600 dark:bg-gray-800 p-3 rounded-xl w-full flex flex-col gap-y-3">
            <div className='dark:text-gray-300 text-[1.2rem] font-semibold'>Customer</div>
            <div className='dark:text-gray-300 flex gap-x-3'><FaUserAlt className='self-center h-7-w-7'  />  <span> jaydev Lalitbhai Panchal </span> </div>
          </div>

          <div className="border dark:border-gray-600 dark:bg-gray-800 p-3 rounded-xl w-full flex flex-col gap-y-3">
            <div className='dark:text-gray-300 text-[1.2rem] font-semibold'>Contact Information</div>
            <div className='dark:text-gray-300 flex gap-x-3'><FaPhoneVolume className='self-center h-7-w-7' />  <span> 9904764781, 9904764781 </span> </div>
          </div>

          <div className="border dark:border-gray-600 dark:bg-gray-800 p-3 rounded-xl w-full flex flex-col gap-y-3">
            <div className='dark:text-gray-300 text-[1.2rem] font-semibold'>Shipping Address</div>
            <div className='dark:text-gray-300 '>  {data?.customerAddress } </div>
            <div className='dark:text-gray-300'> District :   {data?.district } </div>
            <div className='dark:text-gray-300'> Taluka :  {data?.taluka } </div>
            <div className='dark:text-gray-300'> Village :  {data?.village } </div>
            <div className='dark:text-gray-300'> Pincode : {data?.pincode } </div>
          </div>
        </div>
      </div>

      <ComplainCreate isOpenComplainCreateModel={isOpenComplainCreateModel}  setisOpenComplainCreateModel={setisOpenComplainCreateModel}  orderId={orderId} product_id={complainProductId} orderItem={packingtypeoption} />
      <ReturnOrderModalPage  isOpenReturnOrderModel={isOpenReturnOrderModel}  setisOpenReturnOrderModel={setisOpenReturnOrderModel} ReturnCall={ReturnCall} /> 
    </>
  )
}

export default OrderDetails