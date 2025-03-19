import SalesMobileInput from '../../components/input/salesMobileInput';
import React, { FC, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import SalesFarmerDashboard from './salesFarmerDashboard';

interface PropsData{
  setDatactive :any;
}
const SalesOrder : FC <PropsData> = function ({ setDatactive})  {
  const DashboardCall = (data:string) => setDatactive(data)
  const [ order_id, set_Order_id] = useState("");
  const [ openProfile, setOpenProfile] = useState(false);
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
          
        </>
      }
    </>
  )
}

export default SalesOrder