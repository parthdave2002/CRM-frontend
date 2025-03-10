import { FC, useState } from "react";
import SalesHeaderPage from "./salesHeader";
import SalesDashboardPage from "./salesDashboard";
import SalesUpcomingComplainPage from "./salesUpcomingcomplain";
import SalesFarmerDetailsPage from "./salesFarmerDetailsPage";

const SalesCRMPage : FC = function () {

    return (
        <>  
            <div className="p-4 bg-[#f4f9fd] dark:bg-gray-800">
                    <div className="flex flex-col"> 
                        <div className="h-[3rem]"> <SalesHeaderPage />  </div>
                        <div> <SalesDashboardPage /> </div>
                        <div> <SalesUpcomingComplainPage /> </div>
                        {/* <div> <SalesFarmerDetailsPage /></div> */}
                    </div>
            </div>
        </>
    );
}

export default SalesCRMPage;