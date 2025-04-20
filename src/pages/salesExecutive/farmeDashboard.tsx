import React, { FC, useEffect, useState } from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowRight, MdKeyboardArrowUp } from 'react-icons/md'
import Cookies from 'js-cookie';

interface DashboardProps{
  classData ?: string;
  viewButton : boolean;
}

interface ProfileInfo{
    crops: [];
    is_deleted:  boolean;
    _id: string;
    customer_name : string; 
    mobile_number:  number;
    land_area: number;
    land_type: string;
    irrigation_source: string;
    irrigation_type:  string;
    heard_about_agribharat:  string;
    address: string;
    district:  string;
    taluka:  string;
    village:  string;
    pincode:  number;
    created_by:  string;
    __v: number;
    alternate_number: number;
    added_at:  string;
    smart_phone: boolean;
}

const FarmeDashboard : FC <DashboardProps> = ({classData, viewButton}) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const [data, setData] = useState<ProfileInfo>()  
    //  -------------Farmer Data get  code start ----------------------
        useEffect(() => {
          const customerDataString = Cookies.get("customer_data");
          const customerData = customerDataString ? JSON.parse(customerDataString) : []    
          setData(customerData ? customerData  : null);
        },[]);
    //  -------------Farmer Data get  code end  ----------------------

  return (
    <div className={classData}> 
        <div>
          <div className=' dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] '> <div className="w-[10rem]" > Name</div> <div> :  {data?.customer_name} </div>   </div>
          <div className='dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] '>  <div className="w-[10rem]" > Mobile No</div>  <div> :  {data?.mobile_number} </div>  </div>
          <div className='dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] '>  <div className="w-[10rem]"> Alternate No  </div>  <div> :  {data?.alternate_number} </div>  </div>
          <div className='dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] '>  <div className="w-[10rem]" > Address </div> <div> :    {data?.address}</div>   </div>
          <div className='dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] '>  <div className="w-[10rem]" > District </div> <div> :   {data?.district}</div>   </div>
          <div className='dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] '>  <div className="w-[10rem]" > Taluka </div> <div> :     {data?.taluka}</div>   </div>
          <div className='dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] '>  <div className="w-[10rem]" > Village </div> <div> :    {data?.village}</div>   </div>
          <div className='dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] '>  <div className="w-[10rem]" > Pincode </div> <div> :    {data?.pincode}</div>   </div>

          {expanded && (
            <>
              <div className="dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] ">  <div className="w-[10rem]" >Land area </div> <div>: {data?.land_area}  {data?.land_type}</div>   </div>
              <div className="dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] ">  <div className="w-[10rem]" >Irrigation Source </div>   <div>: {data?.irrigation_source}</div>   </div>
              <div className="dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] ">  <div className="w-[10rem]" >Irrigation type </div>  <div> : {data?.irrigation_type}</div>    </div>
              <div className="dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] ">  <div className="w-[10rem]" >Smart phone user</div>  <div> : {data?.smart_phone == true ? "Yes" : "No"}</div>   </div>
              {/* <div className="dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] ">  <div className="w-[10rem]"  >Crops </div>  <div>: {data?.crops}</div>   </div> */}
              <div className="dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] ">  <div className="w-[10rem]" >Heard about us </div> <div>: {data?.heard_about_agribharat} </div>   </div>
            </>
          )}
        </div>
        
        {viewButton ?
          <div className='flex justify-end'>
            <div className="group  border border-indigo-500 text-indigo-500 dark:text-white hover:text-gray-100 font-semibold px-6 py-2 rounded-full  gap-2 hover:bg-indigo-800 transition flex  justify-end text-center w-[12rem] cursor-pointer  transition-all duration-500 ease-in-out" onClick={toggleExpand}>   {expanded ? "VIEW LESS" : "VIEW MORE"}
              {expanded ?
                <MdKeyboardArrowUp className="h-6 w-6 self-center " />
                :
                <> <MdKeyboardArrowRight className="h-6 w-6 self-center group-hover:hidden" />   <MdKeyboardArrowDown className="h-6 w-6 self-center hidden group-hover:block" />   </>
              }
            </div>
          </div>
        : null}
       
    </div>
  )
}

export default FarmeDashboard