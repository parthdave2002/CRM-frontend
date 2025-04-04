import { FC, useEffect, useRef, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import  userimage from "../../img/group.jpg"
import { FaHandHoldingDollar } from "react-icons/fa6";
import { FaAngleDown, FaRupeeSign, FaUser } from "react-icons/fa";
import SalesFarmerDashboard from "./salesFarmerDashboard";
import { DarkThemeToggle } from "flowbite-react";
import userphoto from "../../img/profile-picture-3.jpg";
import { FiLogOut } from "react-icons/fi";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getsalesDashboard, resetinsertlogin } from "../../Store/actions";
import moment from "moment";

interface PropsData{
    setDatactive :any;
    openProfile : boolean;
    setOpenProfile : (value : boolean) => void;
  }

  interface DashboardCount {
    daily:number;
    monthly:number;
    weekly: number;
   }

const SalesDashboardPage : FC <PropsData> = function ({ setDatactive,  openProfile,setOpenProfile})  {

  const dispatch = useDispatch();
  const navigate = useNavigate();

   //---------    Get Dashboard data  start--------- 
      const [ComplainData, setComplainData] = useState([])
      const [FarmerData, setFarmerData] = useState([])
      const [TotalRevenue, setTotalRevenue] = useState<DashboardCount>()
      const [TotalOrder, setTotalOrder] = useState<DashboardCount>()
      const [TotalFutureOrder, setTotalFutureOrder] = useState<DashboardCount>()
      const [TotalReturnOrder, setTotalReturnOrder] = useState<DashboardCount>()

      const  DashboardDataList  = useSelector((state: any) => state.SalesDashboard.DashboardDataList?.data );
  
      useEffect(( ) => {
          dispatch (getsalesDashboard())
      }, [])
  
      useEffect(() =>{
          if(DashboardDataList?.data){
              setComplainData(DashboardDataList?.data?.complain)
              setFarmerData(DashboardDataList?.data?.customers);
              setTotalRevenue(DashboardDataList?.data?.totalRevenue)
              setTotalOrder(DashboardDataList?.data?.totalOrder)
              setTotalFutureOrder(DashboardDataList?.data?.totalFutureOrder)
              setTotalReturnOrder(DashboardDataList?.data?.totalReturnOrder)
          } 
      },[DashboardDataList])
    //---------    Get Dashboard data end--------- 
    const ViweAllCall = (data:string) => setDatactive(data)

    const CloseProfileCall = () => {
      setOpenProfile(false);
      setDatactive("Farmer")
    }

    const handleClickCall = () => {
      setOpenProfile(true);
    }

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
      useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);

        const handleClick = () => {
          const darkModeButton = document.querySelector('[data-testid="dark-theme-toggle"]') as HTMLButtonElement;
          if (darkModeButton) {
            darkModeButton.click();
          }
        };

        const Logoutfun = () => {
          Cookies.remove("token");
          Cookies.remove("username");
          Cookies.remove("access");
          Cookies.remove("role");
          navigate("/login");
          dispatch(resetinsertlogin());
        };

          const [selectedOrderframe, setSelectedOrderframe] = useState("");
          const OrderDropDownCall =  (e:any) =>{
            setSelectedOrderframe(e.target.value)
          }

          const [selectedfutureOrderframe, setSelectedfutureOrderframe] = useState("");
          const FutureOrderDropDownCall =  (e:any) =>{
            setSelectedfutureOrderframe(e.target.value)
          }    

          const [selectedRevenueframe, setSelectedRevenueframe] = useState("");
          const RevenueDropDownCall =  (e:any) =>{
            setSelectedRevenueframe(e.target.value)
          }

          const [selectedReturnframe, setSelectedReturnframe] = useState("");
          const RetrunDropDownCall =  (e:any) =>{
            setSelectedReturnframe(e.target.value)
          }

    return (
        <> 
        
        {openProfile == true ?
          <SalesFarmerDashboard setOpenProfile={CloseProfileCall} />
          :
          <>

            <div className="flex justify-between">
                                <div className="flex flex-col self-center mt-3">
                                <div className="text-[0.9rem] text-gray-500 dark:text-gray-100 dark:text-gray-200"> Welcome back, Parth!</div>
                                <div className="text-[2.5rem] font-semibold text-gray-900 dark:text-gray-100">  Dashboard </div>
                                </div>
                            

                                <div className="relative flex ">
                                    <button onClick={() => setIsOpen(!isOpen)}  className="flex items-center text-sm px-3 py-0.5 font-medium text-gray-900 hover:text-blue-600 md:me-0  dark:text-white  dark:hover:text-gray-100"   type="button"  >
                                      <img  className="w-8 h-8 me-2 rounded-full"   src={userphoto}   alt="user photo"   />
                                      <span>Parth Dave  </span>
                                      <FaAngleDown className="w-4 h-4 ms-3" />
                                    </button>

                                    {isOpen && (
                                        <div   ref={dropdownRef}   className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600 right-0 mt-[4rem]" >
                                            <div  onClick={handleClick}  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex gap-x-2 cursor-pointer  text-sm text-gray-700 dark:text-gray-200"  >
                                            <DarkThemeToggle  className="hover:bg-gray-100 dark:hover:bg-gray-700 "    style={{ padding: "0" }}  />
                                            <div className="self-center">Dark mode</div>
                                            </div>

                                            <div className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white flex gap-x-2" onClick={() => Logoutfun()}>
                                                <FiLogOut   size={20}   className="text-gray-600 dark:text-gray-400"   />
                                            <div className="self-center"> Sign out </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
            </div>

            <div className="md:flex  flex-wrap gap-3 my-[2rem]">
              <div className="flex-1  mt-[1.5rem] md:mt-0">
                <div className="h-24 p-3 rounded-xl w-full flex flex-wrap justify-between transition-all bg-red-200 dark:bg-gray-700 dark:text-gray-50">
                  <div className="flex w-full justify-between items-start">
                    <div className="p-3 rounded-full bg-purple-500 self-center">
                      <FaRupeeSign className="text-white w-6 h-6" />
                    </div>
                    <div className="self-center">
                      <select className="border border-gray-300 rounded-full px-2 py-1 text-sm dark:bg-gray-800 dark:text-gray-50"defaultValue="daily" onChange={(e) =>RevenueDropDownCall(e)}>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                    <div className="text-center self-center items-start">
                      <p className="text-md font-bold"> Revenue</p>
                      <p className="text-lg font-bold text-center mt-2"> { selectedRevenueframe == "weekly" ? TotalRevenue?.weekly   : selectedRevenueframe == "monthly" ?  TotalRevenue?.monthly :    TotalRevenue?.daily}</p>
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
                      <select className="border border-gray-300 rounded-full px-2 py-1 text-sm dark:bg-gray-800 dark:text-gray-50" defaultValue="daily" onChange={(e) => OrderDropDownCall(e)}>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>

                    <div className="text-center self-center items-start ">
                      <p className="text-md font-bold">Total Order</p>
                      <p className="text-lg font-bold text-center mt-2"> { selectedOrderframe == "weekly" ? TotalOrder?.weekly   : selectedOrderframe == "monthly" ?  TotalOrder?.monthly :    TotalOrder?.daily}</p>
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
                      <select className="border border-gray-300 rounded-full px-2 py-1 text-sm dark:bg-gray-800 dark:text-gray-50" defaultValue="daily"  onChange={(e) => FutureOrderDropDownCall(e)}>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                    <div className="text-center self-center items-start">
                      <p className="text-md font-bold"> Future Order</p>
                      <p className="text-lg font-bold text-center mt-2">  { selectedfutureOrderframe == "weekly" ? TotalFutureOrder?.weekly   : selectedfutureOrderframe == "monthly" ?  TotalFutureOrder?.monthly :    TotalFutureOrder?.daily}</p>
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
                      <select className="border border-gray-300 rounded-full px-2 py-1 text-sm dark:bg-gray-800 dark:text-gray-50" defaultValue="daily"  onChange={(e) => RetrunDropDownCall(e)} >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                    <div className="text-center self-center items-start">
                      <p className="text-md font-bold"> Return order</p>
                      <p className="text-lg font-bold text-center mt-2">{ selectedReturnframe == "weekly" ? TotalReturnOrder?.weekly   : selectedReturnframe == "monthly" ?  TotalReturnOrder?.monthly :    TotalReturnOrder?.daily}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" flex flex-col xl:flex-row gap-[1rem]  justify-between">
              <div className="bg-[#ffff] dark:bg-gray-800 rounded-xl p-4 ">
                <div className="flex gap-x-4 ">
                  <div className="text-[1.4rem] font-semibold text-gray-900 dark:text-gray-200"> Farmer Profile </div>
                  <div className="flex  self-center align-center text-blue-500 hover:text-blue-800 cursor-pointer" onClick={() => ViweAllCall("Farmer")}> <div> View all  </div>  <MdKeyboardArrowRight style={{ alignSelf: "center" }} /></div>
                </div>

                <div className="grid grid-cols-2  xl:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-3">
                  {FarmerData && FarmerData.map((item: any, k: number) => (
                    <div className="bg-[#f4f9fd] dark:bg-gray-700 px-[2.8rem] py-3 rounded-xl flex flex-col gap-y-2" key={k}>
                      <img src={userimage} alt="" className="h-16 w-16 rounded-full self-center border-2 border-blue-600 p-1" />
                      <div className="text-gray-500 dark:text-gray-100 text-[0.9rem] text-center"> {item.customer_name} </div>
                      <div className="text-gray-500 dark:text-gray-100 text-[0.9rem] text-center"> {item.mobile_number}</div>
                      <div className="text-gray-500 dark:text-gray-100 text-[0.8rem] text-center border border-gray-500 rounded-md size-fit px-2 cursor-pointer self-center" onClick={() => handleClickCall() }> View </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#ffff] dark:bg-gray-900 rounded-xl py-3 px-5  w-[20rem] ">
                <div className="flex justify-between">
                  <div className="text-[1.3rem] font-semibold text-gray-900 dark:text-gray-200"> Complain </div>
                  <div className="flex  self-center align-center text-blue-500 hover:text-blue-800 cursor-pointer" onClick={() => ViweAllCall("Complain")}> <div> View all  </div>  <MdKeyboardArrowRight style={{ alignSelf: "center" }} /></div>
                </div>

                {ComplainData && ComplainData.map((item: any, k: number) => (
                  <div className="bg-white dark:bg-gray-700 dark:hover:bg-gray-600 p-5 rounded-xl  relative my-4" key={k}>
                    <div> {item?.priority && <div className={`absolute left-3 top-4 bottom-4 w-1 rounded-md ${item?.priority === "high" ? "bg-red-400" : item?.priority == "medium" ? "bg-yellow-400" : item?.priority === "low" ? "bg-blue-400" : ""}`} />} </div>

                    <div className="pl-3 flex flex-col gap-y-1">
                        <div className="truncate text-gray-500 dark:text-gray-100 dark:text-gray-50 lg:max-w-[15rem]"> {item?.title} </div>
                        <div className="text-[0.7rem] xl:text-[0.9rem] text-gray-500 dark:text-gray-100 dark:text-gray-50"> {item?.customer_id?.customer_name}</div>
                        <div className="text-gray-500 dark:text-gray-100 dark:text-gray-50 text-[0.9rem]"> {item?.customer_id?.mobile_number}  </div>
                        <div className="text-gray-500 dark:text-gray-100 dark:text-gray-50 text-[0.9rem]"> {moment(item?.created_at).format("DD-MM-YYYY")}  </div>
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