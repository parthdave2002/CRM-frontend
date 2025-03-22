import { FC, useState } from "react";
import SalesHeaderPage from "./salesHeader";
import SalesDashboardPage from "./salesDashboard";
import SalesUpcomingComplainPage from "./salesUpcomingcomplain";
import SalesFarmerDetailsPage from "./salesFarmer";
import SalesProduct from "./salesProduct";
import SalesOrder from "./salesOrder";

const SalesCRMPage : FC = function () {
    const [ openProfile, setOpenProfile] = useState(false);
    const [active, setActive] = useState("Dashboard");
    const ActiveData = (data:string) =>{
        setActive(data)
    }


    return (
        <>  
            <div className="p-3 bg-[#f4f9fd] dark:bg-gray-800 min-h-screen">
                <div className="py-2 px-4  shadow shadow-lg shadow-indigo-400/40 rounded-xl"> <SalesHeaderPage openProfile={openProfile} setDatactive={ActiveData} active={active} />  </div>
                    
                    <div className="flex flex-col p-3 "> 
                        {active ===  "Dashboard" ? 
                            <div> <SalesDashboardPage setDatactive={ActiveData} /> </div>
                        : active ===  "Farmer" ? 
                            <div> <SalesFarmerDetailsPage openProfile={openProfile} setOpenProfile={setOpenProfile} setDatactive={ActiveData}  /></div>
                        : active ===  "Products" ? 
                            <div> <SalesProduct setDatactive={ActiveData}  /></div>
                        : active ===  "Order" ? 
                            <div> <SalesOrder openProfile={openProfile} setOpenProfile={setOpenProfile}  setDatactive={ActiveData}  /></div>
                        : active ===  "Complain" ? 
                            <div> <SalesUpcomingComplainPage openProfile={openProfile} setOpenProfile={setOpenProfile}   setDatactive={ActiveData}  /> </div>
                        : null
                        }
                    </div>
            </div>
        </>
    );
}

export default SalesCRMPage;