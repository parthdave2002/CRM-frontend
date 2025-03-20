import SalesMobileInput from '../../components/input/salesMobileInput';
import React, { FC, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import  farmerimage from "../../../public/images/users/farmer-2.png"
import SalesFarmerDashboard from './salesFarmerDashboard';
import moment from 'moment';

interface PropsData{
  setDatactive :any;
  openProfile : boolean;
  setOpenProfile : (value : boolean) => void;
}
const SalesOrder : FC <PropsData> = function ({ setDatactive, openProfile,setOpenProfile })  {
  const DashboardCall = (data:string) => setDatactive(data)
  const [ order_id, set_Order_id] = useState("");

  const handleClickCall = () => {
    setOpenProfile(true);
  }

  const handleChange = (data: string) => {
    set_Order_id(data)
  }

  const CloseProfileCall = () => {
    setOpenProfile(false);
    setDatactive("Farmer")
  }

  const CallBackCall = (data :string) => {
    set_Order_id(data);
  }

  const Farmerdata = [
    {
      name: "Kisharbhai kishorbhai ",
      mobile: "9904764781",
      order_date: "2025-03-20T09:25:37.041Z",
      future_order_date: "2025-03-20T09:25:37.041Z",
      total_order: 16,
      total_complain: 10,
      total_return: 5,
    },
    {
      name: "parth dave",
      mobile: "1234567890",
      order_date: "2025-03-20T09:25:37.041Z",
      future_order_date: "2025-03-20T09:25:37.041Z",
      total_order: 16.,
      total_complain: 10,
      total_return: 5,
    },
  ]

  return (
    <>

      {openProfile == true ?
            <SalesFarmerDashboard setOpenProfile={CloseProfileCall} />
        :
        <>
          <div className='flex justify-between'>
            <div className='flex flex-col self-center'>
              <div className="text-[0.9rem] text-blue-500 flex gap-x-3 cursor-pointer w-fit " onClick={() => DashboardCall("Dashboard")}  >  <FaArrowLeft style={{ alignSelf: "center" }} /> Back to Dashboard  </div>
              <div className="text-[2rem] font-semibold text-gray-900 dark:text-gray-100">Future Orders  </div>
            </div>
            <SalesMobileInput placeholder="Search Order" className="py-2 px-6 border-0  rounded-full text-[2rem] text-gray-500 font-bold relative shadow-xl dark:shadow-xl  shadow-inner shadow-indigo-200  dark:shadow-gray-500/50 dark:bg-gray-700 dark:text-gray-100" value={order_id} handleClickCall={handleClickCall} handleChange={handleChange} />
          </div>

          <div className="grid  xl:grid-cols-4 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Farmerdata &&   Farmerdata.map((item: any, k: number) => (
                    <div className="bg-white dark:bg-gray-900 p-2 rounded-[3rem] my-2" key={k}>
                        <div className={`${k % 2 === 0 ? "bg-[#fdf6e4]" : "bg-[#f4f9fd]"} dark:bg-gray-800 px-[0.8rem] py-[1rem] rounded-t-[3rem] flex flex-col gap-y-1 relative`}>
                          {k % 2 === 0 && (
                            <>
                              <div className="absolute lg:top-[2rem] lg:left-[6.5rem]   md:top-[2.5rem] md:left-[8rem]   xl:top-[3rem] xl:left-[6.5rem] text-yellow-500 text-[0.7rem] font-bold">Z</div>
                              <div className="absolute lg:top-[1rem] lg:left-[5rem]   md:top-[1.5rem] md:left-[7rem]  xl:top-[2rem] xl:left-[5rem] text-yellow-500 text-[0.9rem] font-bold">Z</div>
                              <div className="absolute lg:top-1 lg:left-[7rem]   md:top-[0.5rem] md:left-[8rem]     xl:top-2 xl:left-[6rem] text-yellow-500 text-[1.2rem] font-bold">Z</div>
                              <div className="absolute lg:top-[1rem] lg:right-[7rem]   md:top-[1.2rem] md:right-[8.5rem]  xl:top-[1rem] xl:right-[7.3rem] text-yellow-500 text-[0.7rem] font-bold">Z</div>
                              <div className="absolute lg:top-1 lg:right-[5.5rem]   md:top-1 md:right-[7rem]  xl:top-1 xl:right-[5.5rem] text-yellow-500 text-xl font-bold">Z</div>
                              <div className="absolute lg:top-[2rem] lg:right-[6rem]   md:top-[2rem] md:right-[7.5rem]  xl:top-[1.8rem] xl:right-[6.5rem] text-yellow-500 text-[0.9rem] font-bold">Z</div>
                            </>
                          )}
                          <img src={farmerimage} alt="" className={` h-16 w-16 rounded-full self-center border-2 ${k % 2 === 0 ? "border-[#ffdd85]" : "border-blue-600"}  p-1`} />
                          
                          <div className="flex justify-between mt-3">
                            <div className="text-gray-700 dark:text-gray-100 text-[1rem] truncate flex-1">   {item.name}  </div>
                            <div className="text-gray-700 dark:text-gray-100  text-[1rem] text-end flex-1 ">   {item.mobile}   </div>
                          </div>

                          <div className="flex justify-between mt-2">
                            <div className="text-gray-700 dark:text-gray-100  text-[1rem]  flex-1 ">  Created Date    </div>
                            <div className="text-gray-700 dark:text-gray-100 text-[1rem] truncate flex-1 text-end">   {moment(item.order_date).format("DD-MM-YYYY")}  </div>
                          </div>

                          <div className="flex justify-between mt-2">
                            <div className="text-gray-700 dark:text-gray-100 text-[1rem] truncate flex-1">  Followup Date  </div>
                            <div className="text-gray-700 dark:text-gray-100  text-[1rem] text-end flex-1 ">   {moment(item.future_order_date).format("DD-MM-YYYY")}   </div>
                          </div>

                          <div className="text-gray-500 mt-3 text-[1.2rem] text-center border border-gray-500 rounded-md size-fit px-2 cursor-pointer self-center px-[4rem]" onClick={() => CallBackCall(item.mobile)}>   Call    </div>
                        </div>

                        <div className="py-[0.5rem] rounded-xl flex justify-around">
                        <div className="text-gray-600 dark:text-gray-100  text-center  flex flex-col">
                                <span className="text-[1rem]"> Complain </span>
                                <span className="text-[1.4rem] text-gray-900 dark:text-gray-100 font-bold"> {item.total_complain}   </span>
                            </div>
                            <div className="text-gray-600 dark:text-gray-100  text-center  flex flex-col">
                                <span className="text-[1rem]"> Order </span>
                                <span className="text-[1.4rem] text-gray-900 dark:text-gray-100 font-bold"> {item.total_order}   </span>
                            </div>
                            <div className="text-gray-600 dark:text-gray-100  text-center  flex flex-col">
                                <span className="text-[1rem]"> Return </span>
                                <span className="text-[1.4rem] text-gray-900 dark:text-gray-100 font-bold"> {item.total_return}   </span>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
          
        </>
      }
    </>
  )
}

export default SalesOrder