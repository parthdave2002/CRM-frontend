import { FC, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import SalesFarmerDashboard from "./salesFarmerDashboard";
import SalesMobileInput from "../../components/input/salesMobileInput";
import { useDispatch, useSelector } from "react-redux";
import { getFarmerComplainlist } from "../../Store/actions";

interface PropsData{
    setDatactive :any;
    openProfile : boolean;
    setOpenProfile : (value : boolean) => void;
}

const SalesUpcomingComplainPage : FC <PropsData> = function ({ setDatactive, openProfile, setOpenProfile})  {
    
    const dispatch = useDispatch()
    
    const DashboardCall = (data:string) => setDatactive(data)
    const CloseProfileCall = () => {
        setOpenProfile(false);
        setDatactive("Farmer")
    }

    const [loginUser, setLoginUser] = useState("");
    const login = useSelector((state:any) => state.Login.Logincode);
  
    useEffect(() => {
      setLoginUser(login ? login?.data?.id : null);
    }, [login]);
    
    const ComplainData = [
        {
            "name": "Priyanka Thakar",
            "type" : "high",
            "description": "this is a demo complain.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "created": "17-02-2025",
            "mobile": "1234567890",
            "product": "Amaze-X wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
        },
    ]

    const ViewCall = (data: string) => setOpenProfile(true)
    const [searchComplainData, setSearchComplainData] = useState<string>("");
    const handleChange = (data: string) => setSearchComplainData(data);
    const handleClickCall = () => console.log("callll");


    useEffect(() =>{
        let requser = {
            sales_id : loginUser
        }
        dispatch(getFarmerComplainlist(requser))
    },[])

    const [UserComplainDataList, setUserComplainDataList] = useState([]);
    const Complainlist = useSelector((state: any) => state.Complain.SinglefarmerComplainlist?.data);
    useEffect(() => {
        setUserComplainDataList(Complainlist ? Complainlist : [])
    }, [Complainlist]);
    console.log("UserComplainDataList >>>>>>>>",UserComplainDataList);

    return (
        <>  
            {openProfile == true ?
                <SalesFarmerDashboard setOpenProfile={CloseProfileCall} />
                : 
                <>
                    <div className='flex justify-between'>
                        <div className='flex flex-col self-center'>
                            <div className="text-[0.9rem] text-blue-500 flex gap-x-3 cursor-pointer w-fit " onClick={() => DashboardCall("Dashboard")}> <FaArrowLeft style={{ alignSelf: "center" }} /> Back to Dashboard</div>
                            <div className="text-[2rem] font-semibold text-gray-900 dark:text-gray-100"> Total Complain (10) </div>
                        </div>
                        <SalesMobileInput placeholder="Search Complain" className="py-2 px-6 border-0  rounded-full text-[2rem] text-gray-500 font-bold relative shadow-xl dark:shadow-xl  shadow-inner shadow-indigo-200  dark:shadow-gray-500/50 dark:bg-gray-700 dark:text-gray-100" value={searchComplainData} handleClickCall={handleClickCall} handleChange={handleChange} />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mt-[2rem]">
                        {ComplainData && ComplainData.map((item: any, k:number) => (
                            <div className=" bg-white dark:bg-gray-700 dark:hover:bg-gray-600 p-4 rounded-xl relative" key={k}>
                                <div> {item.type && <div className={`absolute left-3 top-4 bottom-4 w-1 rounded-md ${item.type === "high" ? "bg-red-400" : item.type === "medium" ? "bg-yellow-400" : item.type === "low" ? "bg-blue-400" : ""}`} />} </div>

                                <div className="pl-3 lg:flex justify-between">
                                    <div className="flex-1 overflow-hidden text-gray-500 dark:text-gray-50 truncate whitespace-nowrap"> {item.product} </div>
                                    <div className="lg:flex justify-end flex-1">
                                        <div className="text-[0.7rem] xl:text-[0.8rem] text-gray-500 dark:text-gray-50"> {item.name} | {item.mobile} </div>
                                    </div>
                                </div>

                                <div className="pl-3 flex justify-between my-2">
                                    <div className="text-gray-500 dark:text-gray-50 text-[0.8rem] truncate"> {item.description} </div>
                                </div>

                                <div className="pl-3 flex justify-between">
                                    <div className="text-gray-500 dark:text-gray-50 text-[0.8rem]  text-center self-end"> {item.created} | {item.type} </div>
                                    <div className="text-gray-500 dark:text-gray-50 text-[1rem] text-center border border-gray-500 rounded-md size-fit px-[4rem] cursor-pointer self-center" onClick={() => ViewCall(item.mobile)}> View </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            }
        </>
    );
}

export default SalesUpcomingComplainPage;