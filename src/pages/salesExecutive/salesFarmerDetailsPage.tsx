import { FC, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import  userimage from "../../img/group.jpg"

const SalesFarmerDetailsPage : FC = function () {

    const Farmerdata =[
        {
            name : "parth dave",
            mobile : "1234567890",
            total_order : 16.,
            total_complain : 10,
            total_return : 5,
        },
        {
            name : "parth dave",
            mobile : "1234567890",
            total_order : 16.,
            total_complain : 10,
            total_return : 5,
        },
        {
            name : "parth dave",
            mobile : "1234567890",
            total_order : 16.,
            total_complain : 10,
            total_return : 5,
        },
        {
            name : "parth dave",
            mobile : "1234567890",
            total_order : 16.,
            total_complain : 10,
            total_return : 5,
        },
        {
            name : "parth dave",
            mobile : "1234567890",
            total_order : 16.,
            total_complain : 10,
            total_return : 5,
        },
        {
            name : "parth dave",
            mobile : "1234567890",
            total_order : 16.,
            total_complain : 10,
            total_return : 5,
        },
        {
            name : "parth dave",
            mobile : "1234567890",
            total_order : 16.,
            total_complain : 10,
            total_return : 5,
        },
        {
            name : "parth dave",
            mobile : "1234567890",
            total_order : 16.,
            total_complain : 10,
            total_return : 5,
        }
    ]

    return (
        <>  
            <div >
                <div className="text-[2rem] font-semibold text-gray-900">  Farmer Details (09)</div>
            </div>

            {/* <div className="my-[2rem]">


                <div className="bg-white rounded-xl p-4 ">


                        <div className="lg:flex gap-x-3 my-3"> 
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

                        <div className="lg:flex gap-x-3 "> 
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
            </div> */}

          
            {Farmerdata && Farmerdata.map((item:any, k:number) =>(
                  <div className="flex flex-cols-4">
                    <div className=" bg-white p-2 rounded-lg my-2">
                            <div className="bg-[#f4f9fd] px-[2.5rem] py-[1rem] rounded-xl flex flex-col gap-y-1">
                                        <img src={userimage} alt="" className="h-16 w-16 rounded-full self-center border-2 border-blue-600 p-1"  />
                                        <div className="text-gray-500 text-[0.9rem] text-center"> {item.name} </div>
                                        <div className="text-gray-500 text-[0.9rem] text-center"> {item.mobile}</div>
                                        <div className="text-gray-500 text-[0.8rem] text-center border border-gray-500 rounded-md size-fit px-2 cursor-pointer self-center "> View </div>
                                </div>


                                <div className=" py-[1rem] rounded-xl flex  justify-around">
                                        <div className="text-gray-500 text-[1.2rem] text-center"> {item.total_complain} </div>
                                        <div className="text-gray-500 text-[1.2rem] text-center"> {item.total_order}</div>
                                        <div className="text-gray-500 text-[1.2rem] text-center"> {item.total_return}</div>
                                </div> 
                    </div>
                </div>  
            ))}
            
       

        </>
    );
}

export default SalesFarmerDetailsPage;