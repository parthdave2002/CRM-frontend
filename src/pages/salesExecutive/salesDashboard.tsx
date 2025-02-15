import { FC, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import  userimage from "../../img/group.jpg"


const SalesDashboardPage : FC = function () {
    return (
        <>  
            <div >
                <div className="text-[0.9rem] text-gray-500"> Welcome back, Parth!</div>
                <div className="text-[2.5rem] font-semibold text-gray-900">  Dashboard </div>
            </div>

            <div className="my-[2rem]">

                <div className="bg-white rounded-xl p-4 ">
                        <div className="flex justify-between  "> 
                            <div className="text-[1.3rem] font-semibold text-gray-900"> Farmer Profile </div>
                            <div className="flex  self-center align-center text-blue-500 hover:text-blue-800 cursor-pointer"> <div> View all  </div>  <MdKeyboardArrowRight style={{alignSelf:"center"}}/></div>
                        </div>


                        <div className="flex gap-x-3 my-3"> 
                            <div className="bg-[#f4f9fd] px-[2.5rem] py-[1rem] rounded-xl flex flex-col gap-y-1">
                                    <img src={userimage} alt="" className="h-16 w-16 rounded-full self-center border-2 border-blue-600 p-1"  />
                                    <div className="text-gray-500 text-[0.9rem] text-center">Parth Dave </div>
                                    <div className="text-gray-500 text-[0.9rem] text-center"> 9904764781</div>
                                    <div className="text-gray-500 text-[0.8rem] text-center border border-gray-500 rounded-md size-fit px-2 cursor-pointer self-center "> View </div>
                            </div>

                            <div className="bg-[#f4f9fd] px-[2.5rem] py-[1rem] rounded-xl flex flex-col gap-y-1">
                                    <img src={userimage} alt="" className="h-16 w-16 rounded-full self-center border-2 border-blue-600 p-1"  />
                                    <div className="text-gray-500 text-[0.9rem] text-center">Parth Dave </div>
                                    <div className="text-gray-500 text-[0.9rem] text-center"> 9904764781</div>
                                    <div className="text-gray-500 text-[0.8rem] text-center border border-gray-500 rounded-md size-fit px-2 cursor-pointer self-center "> View </div>
                            </div>

                            <div className="bg-[#f4f9fd] px-[2.5rem] py-[1rem] rounded-xl flex flex-col gap-y-1">
                                    <img src={userimage} alt="" className="h-16 w-16 rounded-full self-center border-2 border-blue-600 p-1"  />
                                    <div className="text-gray-500 text-[0.9rem] text-center">Parth Dave </div>
                                    <div className="text-gray-500 text-[0.9rem] text-center"> 9904764781</div>
                                    <div className="text-gray-500 text-[0.8rem] text-center border border-gray-500 rounded-md size-fit px-2 cursor-pointer self-center "> View </div>
                            </div>

                            <div className="bg-[#f4f9fd] px-[2.5rem] py-[1rem] rounded-xl flex flex-col gap-y-1">
                                    <img src={userimage} alt="" className="h-16 w-16 rounded-full self-center border-2 border-blue-600 p-1"  />
                                    <div className="text-gray-500 text-[0.9rem] text-center">Parth Dave </div>
                                    <div className="text-gray-500 text-[0.9rem] text-center"> 9904764781</div>
                                    <div className="text-gray-500 text-[0.8rem] text-center border border-gray-500 rounded-md size-fit px-2 cursor-pointer self-center "> View </div>
                            </div>
                        </div>

                        <div className="flex gap-x-3 "> 
                                <div className="bg-[#f4f9fd] px-[2.5rem] py-[1rem] rounded-xl flex flex-col gap-y-1">
                                    <img src={userimage} alt="" className="h-16 w-16 rounded-full self-center border-2 border-blue-600 p-1"  />
                                    <div className="text-gray-500 text-[0.9rem] text-center">Parth Dave </div>
                                    <div className="text-gray-500 text-[0.9rem] text-center"> 9904764781</div>
                                    <div className="text-gray-500 text-[0.8rem] text-center border border-gray-500 rounded-md size-fit px-2 cursor-pointer self-center "> View </div>
                                </div>

                                <div className="bg-[#f4f9fd] px-[2.5rem] py-[1rem] rounded-xl flex flex-col gap-y-1">
                                    <img src={userimage} alt="" className="h-16 w-16 rounded-full self-center border-2 border-blue-600 p-1"  />
                                    <div className="text-gray-500 text-[0.9rem] text-center">Parth Dave </div>
                                    <div className="text-gray-500 text-[0.9rem] text-center"> 9904764781</div>
                                    <div className="text-gray-500 text-[0.8rem] text-center border border-gray-500 rounded-md size-fit px-2 cursor-pointer self-center "> View </div>
                                </div>

                                <div className="bg-[#f4f9fd] px-[2.5rem] py-[1rem] rounded-xl flex flex-col gap-y-1">
                                    <img src={userimage} alt="" className="h-16 w-16 rounded-full self-center border-2 border-blue-600 p-1"  />
                                    <div className="text-gray-500 text-[0.9rem] text-center">Parth Dave </div>
                                    <div className="text-gray-500 text-[0.9rem] text-center"> 9904764781</div>
                                    <div className="text-gray-500 text-[0.8rem] text-center border border-gray-500 rounded-md size-fit px-2 cursor-pointer self-center "> View </div>
                                </div>

                                <div className="bg-[#f4f9fd] px-[2.5rem] py-[1rem] rounded-xl flex flex-col gap-y-1">
                                    <img src={userimage} alt="" className="h-16 w-16 rounded-full self-center border-2 border-blue-600 p-1"  />
                                    <div className="text-gray-500 text-[0.9rem] text-center">Parth Dave </div>
                                    <div className="text-gray-500 text-[0.9rem] text-center"> 9904764781</div>
                                    <div className="text-gray-500 text-[0.8rem] text-center border border-gray-500 rounded-md size-fit px-2 cursor-pointer  self-center "> View </div>
                            </div>
                        </div>
                </div>

            </div>

            <div>
                        <div className="flex justify-between  "> 
                            <div className="text-[1.3rem] font-semibold text-gray-900"> Products  </div>
                            <div className="flex  self-center align-center text-blue-500 hover:text-blue-800 cursor-pointer"> <div> View all  </div>  <MdKeyboardArrowRight style={{alignSelf:"center"}}/></div>
                        </div>
            </div>


            <div className="my-[2rem]">

                <div className="bg-white rounded-xl p-4 ">
                        <div className="flex justify-between  "> 
                            <div className="text-[1.3rem] font-semibold text-gray-900"> Farmer Profile </div>
                            <div className="flex  self-center align-center text-blue-500 hover:text-blue-800 cursor-pointer"> <div> View all  </div>  <MdKeyboardArrowRight style={{alignSelf:"center"}}/></div>
                        </div>


                        <div className="flex gap-x-3 my-3"> 
                            <div className="bg-[#f4f9fd] px-[2.5rem] py-[1rem] rounded-xl flex flex-col gap-y-1">
                                    <img src={userimage} alt="" className="h-16 w-16 rounded-full self-center border-2 border-blue-600 p-1"  />
                                    <div className="text-gray-500 text-[0.9rem] text-center">Parth Dave </div>
                                    <div className="text-gray-500 text-[0.9rem] text-center"> 9904764781</div>
                                    <div className="text-gray-500 text-[0.8rem] text-center border border-gray-500 rounded-md size-fit px-2 cursor-pointer self-center "> View </div>
                            </div>

                            <div className="bg-[#f4f9fd] px-[2.5rem] py-[1rem] rounded-xl flex flex-col gap-y-1">
                                    <img src={userimage} alt="" className="h-16 w-16 rounded-full self-center border-2 border-blue-600 p-1"  />
                                    <div className="text-gray-500 text-[0.9rem] text-center">Parth Dave </div>
                                    <div className="text-gray-500 text-[0.9rem] text-center"> 9904764781</div>
                                    <div className="text-gray-500 text-[0.8rem] text-center border border-gray-500 rounded-md size-fit px-2 cursor-pointer self-center "> View </div>
                            </div>

                            <div className="bg-[#f4f9fd] px-[2.5rem] py-[1rem] rounded-xl flex flex-col gap-y-1">
                                    <img src={userimage} alt="" className="h-16 w-16 rounded-full self-center border-2 border-blue-600 p-1"  />
                                    <div className="text-gray-500 text-[0.9rem] text-center">Parth Dave </div>
                                    <div className="text-gray-500 text-[0.9rem] text-center"> 9904764781</div>
                                    <div className="text-gray-500 text-[0.8rem] text-center border border-gray-500 rounded-md size-fit px-2 cursor-pointer self-center "> View </div>
                            </div>

                            <div className="bg-[#f4f9fd] px-[2.5rem] py-[1rem] rounded-xl flex flex-col gap-y-1">
                                    <img src={userimage} alt="" className="h-16 w-16 rounded-full self-center border-2 border-blue-600 p-1"  />
                                    <div className="text-gray-500 text-[0.9rem] text-center">Parth Dave </div>
                                    <div className="text-gray-500 text-[0.9rem] text-center"> 9904764781</div>
                                    <div className="text-gray-500 text-[0.8rem] text-center border border-gray-500 rounded-md size-fit px-2 cursor-pointer self-center "> View </div>
                            </div>
                        </div>

                        <div className="flex gap-x-3 "> 
                                <div className="bg-[#f4f9fd] px-[2.5rem] py-[1rem] rounded-xl flex flex-col gap-y-1">
                                    <img src={userimage} alt="" className="h-16 w-16 rounded-full self-center border-2 border-blue-600 p-1"  />
                                    <div className="text-gray-500 text-[0.9rem] text-center">Parth Dave </div>
                                    <div className="text-gray-500 text-[0.9rem] text-center"> 9904764781</div>
                                    <div className="text-gray-500 text-[0.8rem] text-center border border-gray-500 rounded-md size-fit px-2 cursor-pointer self-center "> View </div>
                                </div>

                                <div className="bg-[#f4f9fd] px-[2.5rem] py-[1rem] rounded-xl flex flex-col gap-y-1">
                                    <img src={userimage} alt="" className="h-16 w-16 rounded-full self-center border-2 border-blue-600 p-1"  />
                                    <div className="text-gray-500 text-[0.9rem] text-center">Parth Dave </div>
                                    <div className="text-gray-500 text-[0.9rem] text-center"> 9904764781</div>
                                    <div className="text-gray-500 text-[0.8rem] text-center border border-gray-500 rounded-md size-fit px-2 cursor-pointer self-center "> View </div>
                                </div>

                                <div className="bg-[#f4f9fd] px-[2.5rem] py-[1rem] rounded-xl flex flex-col gap-y-1">
                                    <img src={userimage} alt="" className="h-16 w-16 rounded-full self-center border-2 border-blue-600 p-1"  />
                                    <div className="text-gray-500 text-[0.9rem] text-center">Parth Dave </div>
                                    <div className="text-gray-500 text-[0.9rem] text-center"> 9904764781</div>
                                    <div className="text-gray-500 text-[0.8rem] text-center border border-gray-500 rounded-md size-fit px-2 cursor-pointer self-center "> View </div>
                                </div>

                                <div className="bg-[#f4f9fd] px-[2.5rem] py-[1rem] rounded-xl flex flex-col gap-y-1">
                                    <img src={userimage} alt="" className="h-16 w-16 rounded-full self-center border-2 border-blue-600 p-1"  />
                                    <div className="text-gray-500 text-[0.9rem] text-center">Parth Dave </div>
                                    <div className="text-gray-500 text-[0.9rem] text-center"> 9904764781</div>
                                    <div className="text-gray-500 text-[0.8rem] text-center border border-gray-500 rounded-md size-fit px-2 cursor-pointer  self-center "> View </div>
                            </div>
                        </div>
                </div>

            </div>
        </>
    );
}

export default SalesDashboardPage;