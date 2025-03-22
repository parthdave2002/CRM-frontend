import React, { useState } from 'react'

const FarmerHistory = () => {

  
    // ----------- Tabnavbar code start --------------------
    const [ selectedTabbar, setselectedTabbar] = useState("order");
  
    const TabData = [
      {title : "Order", value : "order", icon:"" },
      {title : "Complain", value : "complain", icon:"" },
      {title : "History", value : "history", icon:"" },
    ]
  
    
    const TabSelection = (data:string) => {
      setselectedTabbar(data)
    }
    // ----------- Tabnavbar code end --------------------
  

  return (
    <div className='my-4 border dark:border-gray-600 rounded-xl w-full py-2 px-4'>
      <div>FarmerHistory</div>

    </div>
  )
}

export default FarmerHistory