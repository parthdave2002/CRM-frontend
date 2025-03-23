import React, { useEffect, useState } from 'react'
import { FaPencilAlt } from 'react-icons/fa';
import { MdKeyboardArrowDown, MdKeyboardArrowRight, MdKeyboardArrowUp } from 'react-icons/md'
import { useSelector } from 'react-redux';


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

const FarmeDashboard = () => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => {
    setExpanded(!expanded);
  };


   const CheckCustomerExistlist = useSelector((state: any) =>  state.Customer.CheckCustomerExistlist);
const [ data, setData] = useState<ProfileInfo>()
  useEffect(() =>{
    if(CheckCustomerExistlist?.data){
      setData(CheckCustomerExistlist?.data)
    }
  },[CheckCustomerExistlist])
  // const data={
  //   "name": "Parth Dave",
  //   "mobile_no": 1234567890,
  //   "secoundry_mobile_no": 1234567890,
  //   "address" : "Shushil Nagar society, near indian oil petrol pump, memnagar, ahmedabad, gujarat - 380013",
  //   "land_area" : 5,
  //   "lany_type"  : "Acre",
  //   "irrigation_source" : "Canal",
  //   "irrigation_type" : "Sprinkler",
  //   "smart_phone_user" : true,
  //   "crops" : "Potato, Tomtao, Apple",
  //   "my_farmer" :  true,
  //   "heard_about_platform" : "Youtube",
  // }

  return (
    <div className='mt-3 border dark:border-gray-600 rounded-xl w-full py-2 px-4 transition-all duration-800 ease-in-out'> 
        <div>
        <div className='flex'>
          <div className='flex-1 dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] '>  <div className="w-[10rem]" > Name</div> <div> :  {data?.customer_name} </div>   </div>
            <div className='flex-1  flex  justify-end '> <div className='border border-indigo-500 text-indigo-500 dark:text-white hover:text-gray-100 font-semibold px-6 py-2 rounded-full  gap-3 hover:bg-indigo-800 transition flex text-center w-[13rem] cursor-pointer  transition-all duration-500 ease-in-out'> <FaPencilAlt className='self-center h-5 w-5'  /> Edit  Customer </div> </div>
          </div>
          <div className='flex'>
            <div className='flex-1 dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] '>  <div className="w-[10rem]" > Mobile No</div>  <div> :  {data?.mobile_number} </div>  </div>
            <div className='flex-1 dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] '>  <div > Alternate No  </div>    <div> :  {data?.alternate_number} </div>  </div>
          </div>
          <div className='dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] '>  <div className="w-[10rem]" > Address </div> <div> :    {data?.address}</div>   </div>

          {expanded && (
            <>
              <div className="dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] ">  <div className="w-[10rem]" >Land area </div> <div>: {data?.land_area}  {data?.land_type}</div>   </div>
              <div className="dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] ">  <div className="w-[10rem]" >Irrigation Source </div>   <div>: {data?.irrigation_source}</div>   </div>
              <div className="dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] ">  <div className="w-[10rem]" >Irrigation type </div>  <div> : {data?.irrigation_type}</div>    </div>
              <div className="dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] ">  <div className="w-[10rem]" >Smart phone user</div>  <div> : {data?.smart_phone == true ? "Yes" : "No"}</div>   </div>
              <div className="dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] ">  <div className="w-[10rem]"  >Crops </div>  <div>: {data?.crops}</div>   </div>
              <div className="dark:text-gray-200 flex gap-x-3 mt-2 text-[1.1rem] ">  <div className="w-[10rem]" >Heard about us </div> <div>: {data?.heard_about_agribharat} </div>   </div>
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