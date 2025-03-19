import { FC, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import  userimage from "../../img/group.jpg"
import { FaHandHoldingDollar } from "react-icons/fa6";
import { FaRupeeSign, FaUser } from "react-icons/fa";
import SalesFarmerDashboard from "./salesFarmerDashboard";

interface PropsData{
    setDatactive :any;
  }
const SalesDashboardPage : FC <PropsData> = function ({ setDatactive})  {

    const ComplainData = [
        {
            "name": "Priyanka Thakar",
            "type" : "high",
            "description": "this is a demo complain.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "created": "17-02-2025",
            "mobile": "1234567890",
            "product": "Amaze-X wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
        },
        {
            "name": "Priyanka Thakar",
            "type" : "medium",
            "description": "this is a demo complain",
            "created": "17-02-2025",
            "mobile": "1234567890",
            "product": "Amaze-X"
        },
        {
            "name": "Priyanka Thakar",
            "type" : "low",
            "description": "this is a demo complain",
            "created": "17-02-2025",
            "mobile": "1234567890",
            "product": "Amaze-X"
        },
    ]

    const FarmerData=[
        {
            name : "Parth Dave",
            number : 9907464781,
        },
        {
            name : "Parth Dave",
            number : 9907464781,
        },
        {
            name : "Parth Dave",
            number : 9907464781,
        },
        {
            name : "Parth Dave",
            number : 9907464781,
        },
        {
            name : "Parth Dave",
            number : 9907464781,
        },
        {
            name : "Parth Dave",
            number : 9907464781,
        },
        {
            name : "Parth Dave",
            number : 9907464781,
        },
        {
            name : "Parth Dave",
            number : 9907464781,
        },
        {
            name : "Parth Dave",
            number : 9907464781,
        },
        {
            name : "Parth Dave",
            number : 9907464781,
        }
    ]

    const ViweAllCall = (data:string) => setDatactive(data)

    const [ openProfile, setOpenProfile] = useState(false);
    
    const CloseProfileCall = () => {
      setOpenProfile(false);
      setDatactive("Farmer")
    }

    const handleClickCall = () => {
      setOpenProfile(true);
    }

    return (
        <> 
        
        {openProfile == true ?
          <SalesFarmerDashboard setOpenProfile={CloseProfileCall} />
          :
          <>
            <div>
              <div className="text-[0.9rem] text-gray-500 dark:text-gray-100 dark:text-gray-200"> Welcome back, Parth!</div>
              <div className="text-[2.5rem] font-semibold text-gray-900 dark:text-gray-100">  Dashboard </div>
            </div>

            <div className="md:flex  flex-wrap gap-3 my-[2rem]">
              <div className="flex-1  mt-[1.5rem] md:mt-0">
                <div className="h-24 p-3 rounded-xl w-full flex flex-wrap justify-between transition-all bg-red-200 dark:bg-gray-700 dark:text-gray-50">
                  <div className="flex w-full justify-between items-start">
                    <div className="p-3 rounded-full bg-purple-500 self-center">
                      <FaRupeeSign className="text-white w-6 h-6" />
                    </div>
                    <div className="self-center">
                      <select className="border border-gray-300 rounded-full px-2 py-1 text-sm dark:bg-gray-800 dark:text-gray-50" defaultValue="daily">
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                    <div className="text-center self-center items-start">
                      <p className="text-md font-bold"> Revenue</p>
                      <p className="text-lg font-bold text-center mt-2"> 50,000</p>
                    </div>
                  </div>
                </div>
              </div>
 
              <div className="flex-1  mt-[1.5rem] md:mt-0">
                <div className="h-24 p-3 rounded-xl w-full flex flex-wrap justify-between transition-all bg-red-200 dark:bg-gray-700 dark:text-gray-50">
                  <div className="flex w-full justify-between items-start">
                    <div className="p-3 rounded-full bg-purple-500 self-center">
                      <FaRupeeSign className="text-white w-6 h-6" />
                    </div>
                    <div className="self-center">
                      <select className="border border-gray-300 rounded-full px-2 py-1 text-sm dark:bg-gray-800 dark:text-gray-50" defaultValue="daily">
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                    <div className="text-center self-center items-start">
                      <p className="text-md font-bold"> Future Order</p>
                      <p className="text-lg font-bold text-center mt-2"> 50,000</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1  mt-[1.5rem] md:mt-0">
                <div className="h-24 p-3 rounded-xl w-full flex flex-wrap justify-between transition-all bg-red-200 dark:bg-gray-700 dark:text-gray-50">
                  <div className="flex w-full justify-around items-start">
                    <div className="p-3 rounded-full bg-purple-500 self-center">
                      <FaHandHoldingDollar className="text-white w-6 h-6" />
                    </div>
                    <div className="">
                      <select className="border border-gray-300 rounded-full px-2 py-1 text-sm dark:bg-gray-800 dark:text-gray-50" defaultValue="daily" >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>

                    <div className="text-center self-center items-start ">
                      <p className="text-md font-bold"> Order</p>
                      <p className="text-lg font-bold text-center mt-2"> 5</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1  mt-[1.5rem] md:mt-0">
                <div className="h-24 p-3 rounded-xl w-full flex flex-wrap justify-between transition-all bg-red-200 dark:bg-gray-700 dark:text-gray-50">
                  <div className="flex w-full justify-between items-start">
                    <div className="p-3 rounded-full bg-purple-500 self-center">
                      <FaUser className="text-white w-6 h-6" />
                    </div>
                    <div className="self-center">
                      <select className="border border-gray-300 rounded-full px-2 py-1 text-sm dark:bg-gray-800 dark:text-gray-50" defaultValue="daily" >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                    <div className="text-center self-center items-start">
                      <p className="text-md font-bold"> Return order</p>
                      <p className="text-lg font-bold text-center mt-2">2</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" flex flex-col xl:flex-row gap-[1rem] xl:gap-x-6 px-3  ">
              <div className="bg-[#ffff] dark:bg-gray-900 rounded-xl p-4 ">
                <div className="flex justify-between ">
                  <div className="text-[1.3rem] font-semibold text-gray-900 dark:text-gray-200"> Farmer Profile </div>
                  <div className="flex  self-center align-center text-blue-500 hover:text-blue-800 cursor-pointer" onClick={() => ViweAllCall("Farmer")}> <div> View all  </div>  <MdKeyboardArrowRight style={{ alignSelf: "center" }} /></div>
                </div>

                <div className="grid grid-cols-2  xl:grid-cols-5 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {FarmerData && FarmerData.map((item: any, k: number) => (
                    <div className="bg-[#f4f9fd] dark:bg-gray-700 px-[2.8rem] py-3 rounded-xl flex flex-col gap-y-2" key={k}>
                      <img src={userimage} alt="" className="h-16 w-16 rounded-full self-center border-2 border-blue-600 p-1" />
                      <div className="text-gray-500 dark:text-gray-100 text-[0.9rem] text-center"> {item.name} </div>
                      <div className="text-gray-500 dark:text-gray-100 text-[0.9rem] text-center"> {item.number}</div>
                      <div className="text-gray-500 dark:text-gray-100 text-[0.8rem] text-center border border-gray-500 rounded-md size-fit px-2 cursor-pointer self-center" onClick={() => handleClickCall() }> View </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#ffff] dark:bg-gray-900 rounded-xl py-3 px-5  ">
                <div className="flex justify-between">
                  <div className="text-[1.3rem] font-semibold text-gray-900 dark:text-gray-200"> Complain </div>
                  <div className="flex  self-center align-center text-blue-500 hover:text-blue-800 cursor-pointer" onClick={() => ViweAllCall("Complain")}> <div> View all  </div>  <MdKeyboardArrowRight style={{ alignSelf: "center" }} /></div>
                </div>

                {ComplainData && ComplainData.map((item: any, k: number) => (
                  <div className="bg-white dark:bg-gray-700 dark:hover:bg-gray-600 p-5 rounded-xl  relative my-4" key={k}>
                    <div> {item.type && <div className={`absolute left-3 top-4 bottom-4 w-1 rounded-md ${item.type === "high" ? "bg-red-400" : item.type === "medium" ? "bg-yellow-400" : item.type === "low" ? "bg-blue-400" : ""}`} />} </div>

                    <div className="pl-3">
                      <div className="truncate text-gray-500 dark:text-gray-100 dark:text-gray-50 lg:max-w-[15rem]"> {item.product} </div>
                      <div className="text-[0.7rem] xl:text-[0.8rem] text-gray-500 dark:text-gray-100 dark:text-gray-50"> {item.name} | {item.mobile} </div>
                    </div>

                    <div className="pl-3 flex justify-between">
                      <div className="text-gray-500 dark:text-gray-100 dark:text-gray-50 text-[0.8rem]  text-center self-end"> {item.created} | {item.type} </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>

        }
        </>
    );
}

export default SalesDashboardPage;