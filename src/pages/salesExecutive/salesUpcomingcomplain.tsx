import { FC, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa6";
import  userimage from "../../img/group.jpg"

interface PropsData{
    setDatactive :any;
}

const SalesUpcomingComplainPage : FC <PropsData> = function ({ setDatactive})  {
    const DashboardCall = (data:string) => setDatactive(data)


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
        {
            "name": "Priyanka Thakar",
            "type" : "high",
            "description": "this is a demo complain",
            "created": "17-02-2025",
            "mobile": "1234567890",
            "product": "Amaze-X"
        },
        {
            "name": "Priyanka Thakar",
            "type" : "high",
            "description": "this is a demo complain",
            "created": "17-02-2025",
            "mobile": "1234567890",
            "product": "Amaze-X"
        },
        {
            "name": "Priyanka Thakar",
            "type" : "high",
            "description": "this is a demo complain",
            "created": "17-02-2025",
            "mobile": "1234567890",
            "product": "Amaze-X"
        },
        {
            "name": "Priyanka Thakar",
            "type" : "high",
            "description": "this is a demo complain",
            "created": "17-02-2025",
            "mobile": "1234567890",
            "product": "Amaze-X"
        },
    ]

    return (
        <>  
            <div >
                <div className="text-[0.9rem] text-blue-500 flex gap-x-3 cursor-pointer w-fit " onClick={() => DashboardCall("Dashboard")}> <FaArrowLeft style={{alignSelf:"center"}} /> Back to Dashboard</div>
                <div className="text-[2rem] font-semibold text-gray-900 dark:text-gray-100"> Total Complain (10) </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-[2rem]">
                {ComplainData && ComplainData.map((item:any) =>(
                    <div className=" bg-white dark:bg-gray-700 dark:hover:bg-gray-600 p-4 rounded-xl relative">
                        <div> {item.type && <div className={`absolute left-3 top-4 bottom-4 w-1 rounded-md ${item.type === "high" ? "bg-red-400" :  item.type === "medium" ? "bg-yellow-400" :  item.type === "low" ? "bg-blue-400" : ""}`} />} </div>
                        
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
                            <div className="text-gray-500 dark:text-gray-50 text-[0.7rem] text-center border border-gray-500 rounded-md size-fit px-2 cursor-pointer self-center "> View </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default SalesUpcomingComplainPage;