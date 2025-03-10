import { FC, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import  userimage from "../../img/group.jpg"


const SalesDashboardPage : FC = function () {

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

    return (
        <>  
            <div >
                <div className="text-[0.9rem] text-gray-500 dark:text-gray-100 dark:text-gray-200"> Welcome back, Parth!</div>
                <div className="text-[2.5rem] font-semibold text-gray-900 dark:text-gray-100">  Dashboard </div>
            </div>

            <div className="mt-[1.5rem] lg:flex gap-x-6 px-3">
                <div className="bg-[#ffff] dark:bg-gray-900 rounded-xl p-4 ">
                        <div className="flex justify-between "> 
                            <div className="text-[1.3rem] font-semibold text-gray-900 dark:text-gray-200"> Farmer Profile </div>
                            <div className="flex  self-center align-center text-blue-500 hover:text-blue-800 cursor-pointer"> <div> View all  </div>  <MdKeyboardArrowRight style={{alignSelf:"center"}}/></div>
                        </div>


                        <div className="flex gap-x-3 my-3"> 
                            <div className="bg-[#f4f9fd] dark:bg-gray-700 px-[2.8rem] py-3 rounded-xl flex flex-col gap-y-2">
                                    <img src={userimage} alt="" className="h-16 w-16 rounded-full self-center border-2 border-blue-600 p-1"  />
                                    <div className="text-gray-500 dark:text-gray-100 text-[0.9rem] text-center">Parth Dave </div>
                                    <div className="text-gray-500 dark:text-gray-100 text-[0.9rem] text-center"> 9904764781</div>
                                    <div className="text-gray-500 dark:text-gray-100 text-[0.8rem] text-center border border-gray-500 rounded-md size-fit px-2 cursor-pointer self-center "> View </div>
                            </div>

                            <div className="bg-[#f4f9fd] dark:bg-gray-700 px-[2.8rem] py-3 rounded-xl flex flex-col gap-y-2">
                                    <img src={userimage} alt="" className="h-16 w-16 rounded-full self-center border-2 border-blue-600 p-1"  />
                                    <div className="text-gray-500 dark:text-gray-100 text-[0.9rem] text-center">Parth Dave </div>
                                    <div className="text-gray-500 dark:text-gray-100 text-[0.9rem] text-center"> 9904764781</div>
                                    <div className="text-gray-500 dark:text-gray-100 text-[0.8rem] text-center border border-gray-500 rounded-md size-fit px-2 cursor-pointer self-center "> View </div>
                            </div>

                            <div className="bg-[#f4f9fd] dark:bg-gray-700 px-[2.8rem] py-3 rounded-xl flex flex-col gap-y-2">
                                    <img src={userimage} alt="" className="h-16 w-16 rounded-full self-center border-2 border-blue-600 p-1"  />
                                    <div className="text-gray-500 dark:text-gray-100 text-[0.9rem] text-center">Parth Dave </div>
                                    <div className="text-gray-500 dark:text-gray-100 text-[0.9rem] text-center"> 9904764781</div>
                                    <div className="text-gray-500 dark:text-gray-100 text-[0.8rem] text-center border border-gray-500 rounded-md size-fit px-2 cursor-pointer self-center "> View </div>
                            </div>

                            <div className="bg-[#f4f9fd] dark:bg-gray-700 px-[2.8rem] py-3 rounded-xl flex flex-col gap-y-2">
                                    <img src={userimage} alt="" className="h-16 w-16 rounded-full self-center border-2 border-blue-600 p-1"  />
                                    <div className="text-gray-500 dark:text-gray-100 text-[0.9rem] text-center">Parth Dave </div>
                                    <div className="text-gray-500 dark:text-gray-100 text-[0.9rem] text-center"> 9904764781</div>
                                    <div className="text-gray-500 dark:text-gray-100 text-[0.8rem] text-center border border-gray-500 rounded-md size-fit px-2 cursor-pointer self-center "> View </div>
                            </div>

                            <div className="bg-[#f4f9fd] dark:bg-gray-700 px-[2.8rem] py-3 rounded-xl flex flex-col gap-y-2">
                                    <img src={userimage} alt="" className="h-16 w-16 rounded-full self-center border-2 border-blue-600 p-1"  />
                                    <div className="text-gray-500 dark:text-gray-100 text-[0.9rem] text-center">Parth Dave </div>
                                    <div className="text-gray-500 dark:text-gray-100 text-[0.9rem] text-center"> 9904764781</div>
                                    <div className="text-gray-500 dark:text-gray-100 text-[0.8rem] text-center border border-gray-500 rounded-md size-fit px-2 cursor-pointer self-center "> View </div>
                            </div>
                        </div>

                        <div className="flex gap-x-3 "> 
                                <div className="bg-[#f4f9fd] dark:bg-gray-700 px-[2.8rem] py-3 rounded-xl flex flex-col gap-y-2">
                                    <img src={userimage} alt="" className="h-16 w-16 rounded-full self-center border-2 border-blue-600 p-1"  />
                                    <div className="text-gray-500 dark:text-gray-100 text-[0.9rem] text-center">Parth Dave </div>
                                    <div className="text-gray-500 dark:text-gray-100 text-[0.9rem] text-center"> 9904764781</div>
                                    <div className="text-gray-500 dark:text-gray-100 text-[0.8rem] text-center border border-gray-500 rounded-md size-fit px-2 cursor-pointer self-center "> View </div>
                                </div>

                                <div className="bg-[#f4f9fd] dark:bg-gray-700 px-[2.8rem] py-3 rounded-xl flex flex-col gap-y-2">
                                    <img src={userimage} alt="" className="h-16 w-16 rounded-full self-center border-2 border-blue-600 p-1"  />
                                    <div className="text-gray-500 dark:text-gray-100 text-[0.9rem] text-center">Parth Dave </div>
                                    <div className="text-gray-500 dark:text-gray-100 text-[0.9rem] text-center"> 9904764781</div>
                                    <div className="text-gray-500 dark:text-gray-100 text-[0.8rem] text-center border border-gray-500 rounded-md size-fit px-2 cursor-pointer self-center "> View </div>
                            </div>

                                <div className="bg-[#f4f9fd] dark:bg-gray-700 px-[2.8rem] py-3 rounded-xl flex flex-col gap-y-2">
                                    <img src={userimage} alt="" className="h-16 w-16 rounded-full self-center border-2 border-blue-600 p-1"  />
                                    <div className="text-gray-500 dark:text-gray-100 text-[0.9rem] text-center">Parth Dave </div>
                                    <div className="text-gray-500 dark:text-gray-100 text-[0.9rem] text-center"> 9904764781</div>
                                    <div className="text-gray-500 dark:text-gray-100 text-[0.8rem] text-center border border-gray-500 rounded-md size-fit px-2 cursor-pointer self-center "> View </div>
                                </div>

                                <div className="bg-[#f4f9fd] dark:bg-gray-700 px-[2.8rem] py-3 rounded-xl flex flex-col gap-y-2">
                                    <img src={userimage} alt="" className="h-16 w-16 rounded-full self-center border-2 border-blue-600 p-1"  />
                                    <div className="text-gray-500 dark:text-gray-100 text-[0.9rem] text-center">Parth Dave </div>
                                    <div className="text-gray-500 dark:text-gray-100 text-[0.9rem] text-center"> 9904764781</div>
                                    <div className="text-gray-500 dark:text-gray-100 text-[0.8rem] text-center border border-gray-500 rounded-md size-fit px-2 cursor-pointer self-center "> View </div>
                                </div>

                                <div className="bg-[#f4f9fd] dark:bg-gray-700 px-[2.8rem] py-3 rounded-xl flex flex-col gap-y-2">
                                    <img src={userimage} alt="" className="h-16 w-16 rounded-full self-center border-2 border-blue-600 p-1"  />
                                    <div className="text-gray-500 dark:text-gray-100 text-[0.9rem] text-center">Parth Dave </div>
                                    <div className="text-gray-500 dark:text-gray-100 text-[0.9rem] text-center"> 9904764781</div>
                                    <div className="text-gray-500 dark:text-gray-100 text-[0.8rem] text-center border border-gray-500 rounded-md size-fit px-2 cursor-pointer  self-center "> View </div>
                            </div>
                        </div>
                </div>

                <div className="bg-[#ffff] dark:bg-gray-900 rounded-xl py-3 px-5  ">
                        <div className="flex justify-between"> 
                            <div className="text-[1.3rem] font-semibold text-gray-900 dark:text-gray-200"> Complain </div>
                            <div className="flex  self-center align-center text-blue-500 hover:text-blue-800 cursor-pointer"> <div> View all  </div>  <MdKeyboardArrowRight style={{alignSelf:"center"}}/></div>
                        </div> 

                        {ComplainData && ComplainData.map((item:any, k:number) =>(
                            <div className="bg-white dark:bg-gray-700 dark:hover:bg-gray-600 p-5 rounded-xl  relative my-4" key={k}>
                                <div> {item.type && <div className={`absolute left-3 top-4 bottom-4 w-1 rounded-md ${item.type === "high" ? "bg-red-400" :  item.type === "medium" ? "bg-yellow-400" :  item.type === "low" ? "bg-blue-400" : ""}`} />} </div>
                                
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
    );
}

export default SalesDashboardPage;