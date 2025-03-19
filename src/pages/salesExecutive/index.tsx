import { FC, useState } from "react";
import SalesHeaderPage from "./salesHeader";
import SalesDashboardPage from "./salesDashboard";
import SalesUpcomingComplainPage from "./salesUpcomingcomplain";
import SalesFarmerDetailsPage from "./salesFarmerDetailsPage";
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
            <div className="p-4 bg-[#f4f9fd] dark:bg-gray-800">
                    <div className="flex flex-col"> 
                        <div className="h-[3rem]"> <SalesHeaderPage openProfile={openProfile} setDatactive={ActiveData} active={active} />  </div>
                        {active ===  "Dashboard" ? 
                            <div> <SalesDashboardPage setDatactive={ActiveData} /> </div>
                        : active ===  "Farmer" ? 
                            <div> <SalesFarmerDetailsPage openProfile={openProfile} setOpenProfile={setOpenProfile} setDatactive={ActiveData}  /></div>
                        : active ===  "Products" ? 
                            <div> <SalesProduct setDatactive={ActiveData}  /></div>
                        : active ===  "Order" ? 
                            <div> <SalesOrder  setDatactive={ActiveData}  /></div>
                        : active ===  "Complain" ? 
                            <div> <SalesUpcomingComplainPage   setDatactive={ActiveData}  /> </div>
                        : null
                        }
                    </div>
            </div>
        </>
    );
}

export default SalesCRMPage;