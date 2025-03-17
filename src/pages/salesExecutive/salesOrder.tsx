import React, { FC } from 'react'
import { FaArrowLeft } from 'react-icons/fa'

interface PropsData{
  setDatactive :any;
}
const SalesOrder : FC <PropsData> = function ({ setDatactive})  {
  const DashboardCall = (data:string) => setDatactive(data)

  return (
    <>
              <div>
                <div  className="text-[0.9rem] text-blue-500 flex gap-x-3 cursor-pointer w-fit "  onClick={() => DashboardCall("Dashboard")}  >  <FaArrowLeft style={{ alignSelf: "center" }} /> Back to Dashboard  </div>
                <div className="text-[2rem] font-semibold text-gray-900 dark:text-gray-100"> Orders (10) </div>
              </div>
    </>
  )
}

export default SalesOrder