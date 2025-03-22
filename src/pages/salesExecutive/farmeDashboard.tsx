import React, { useState } from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowRight, MdKeyboardArrowUp } from 'react-icons/md'

const FarmeDashboard = () => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const data={
    "name": "Parth Dave",
    "mobile_no": 1234567890,
    "secoundry_mobile_no": 1234567890,
    "address" : "Shushil Nagar society, near indian oil petrol pump, memnagar, ahmedabad, gujarat - 380013",
    "land_area" : 5,
    "lany_type"  : "Acre",
    "irrigation_source" : "Canal",
    "irrigation_type" : "Sprinkler",
    "smart_phone_user" : true,
    "crops" : "Potato, Tomtao, Apple",
    "my_farmer" :  true,
    "heard_about_platform" : "Youtube",
  }

  return (
    <div className='my-3 border dark:border-gray-600 rounded-xl w-full py-2 px-4 transition-all duration-800 ease-in-out'> 
        <div>
          <div className='dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] '>  <div className="w-[10rem]" > Name</div> <div> :  {data.name} </div>   </div>
          <div className='flex'>
            <div className='flex-1 dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] '>  <div className="w-[10rem]" > Mobile No</div>  <div> :  {data.mobile_no} </div>  </div>
            <div className='flex-1 dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] '>  <div > Alternate No  </div>    <div> :  {data.secoundry_mobile_no} </div>  </div>
          </div>
          <div className='dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] '>  <div className="w-[10rem]" > Address </div> <div> :    {data.address}</div>   </div>

          {expanded && (
            <>
              <div className="dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] ">  <div className="w-[10rem]" >Land area </div> <div>: {data.land_area}  {data.lany_type}</div>   </div>
              <div className="dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] ">  <div className="w-[10rem]" >Irrigation Source </div>   <div>: {data.irrigation_source}</div>   </div>
              <div className="dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] ">  <div className="w-[10rem]" >Irrigation type </div>  <div> : {data.irrigation_type}</div>    </div>
              <div className="dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] ">  <div className="w-[10rem]" >Smart phone user</div>  <div> : {data.smart_phone_user == true ? "Yes" : "No"}</div>   </div>
              <div className="dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] ">  <div className="w-[10rem]"  >Crops </div>  <div>: {data.crops}</div>   </div>
              <div className="dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] ">  <div className="w-[10rem]" >My Farmer </div> <div>: {data.my_farmer == true ? "Yes" : "No"}  </div>   </div>
              <div className="dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] ">  <div className="w-[10rem]" >Heard about us </div> <div>: {data.heard_about_platform} </div>   </div>
            </>
          )}
        </div>

         <div className='flex justify-end'> 
              <div className="group  border border-indigo-500 text-indigo-500 dark:text-white hover:text-gray-100 font-semibold px-6 py-2 rounded-full  gap-2 hover:bg-indigo-800 transition flex  justify-end text-center w-[12rem] cursor-pointer  transition-all duration-500 ease-in-out"  onClick={toggleExpand}>   {expanded ? "VIEW LESS" : "VIEW MORE"}    
                  {expanded ?  <MdKeyboardArrowUp  className="h-6 w-6 self-center " />    : 
                    <>
                      <MdKeyboardArrowRight className="h-6 w-6 self-center group-hover:hidden" />   <MdKeyboardArrowDown  className="h-6 w-6 self-center hidden group-hover:block" />  
                    </>
                  }
              </div>
          </div>
    </div>
  )
}

export default FarmeDashboard