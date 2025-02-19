

import type { FC } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerDatalist  } from "../../Store/actions";
import {  useEffect, useState,   } from "react";
import ExampleBreadcrumb from "../../components/breadcrumb";
import { useParams } from "react-router";
import moment from "moment";

const CustomerDetailsPage: FC = function () {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if(id){
      let requserdata = { id: id };
      dispatch(getCustomerDatalist(requserdata))
    }
  },[id])

  const [UserDataList, setUserDataList] = useState([]);
  const { Customerlist } = useSelector((state: any) => ({
    Customerlist: state.Customer.Customerlist,
  }));

  useEffect(() => {
    setUserDataList(Customerlist. pulledData ? Customerlist. pulledData  : null);
  }, [Customerlist]);
  //  ------------- Get User Data From Reducer Code Start --------------

  const SingleUserDataList = [
    {
      "is_active": true,
      "_id": "67ab2c70371d4b1e04ef3514",
      "customer_name": "serus",
      "mobile_number": 858,
      "alternate_number" : 12356,
      "smart_phone": true,
      "land_area" : 5,
      "land_type": 'acre',
      "irrigation_source": "barwell",
      "irrigation_type": "flood",
      "crops":[],
      "heard_about_agribharat":"newspaper",
      "address":  "demo address",
      "district":  "demo district",
      "taluka":  "demo taluka",
      "village": "demo village",
      "pincode": "123456890",
      "created_at": "1997-01-12",
      "created_by": "Demo Sales executive",
    }
  ]

  let Name = "Customer Details";
  let ParentName = "Customer List";
  let ParentLink = "/customer/list";

  return (
    <>
      <NavbarSidebarLayout isFooter={false}  isSidebar={true} isNavbar={true} isRightSidebar={true}>
        <ExampleBreadcrumb  Name={Name} ParentName={ParentName} ParentLink ={ParentLink} />
        <div className="mt-[2rem] bg-white dark:bg-gray-800 p-4">
            <div>
            {SingleUserDataList &&  SingleUserDataList.map((data: any, index: number) => (
              <div key={index} className="grid grid-cols-3 gap-6">
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Name</h3>
                  <p className="text-gray-900 dark:text-white">{data?.customer_name || "N/A"}</p>
                </div>

                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Mobile Number</h3>
                  <p className="text-gray-900 dark:text-white">{data?.mobile_number || "N/A"}</p>
                </div>

                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Alternate Mobile Number</h3>
                  <p className="text-gray-900 dark:text-white">{data?.alternate_number || "N/A"}</p>
                </div>

                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Alternate Mobile Number</h3>
                  <p className="text-gray-900 dark:text-white"> {data?.smart_phone === true ? "Yes" : data?.smart_phone === false ? "No" : "N/A"}</p>
                </div>

                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold"> Land Area</h3>
                  <p className="text-gray-900 dark:text-white">{data?.land_area || "N/A"} {data?.land_type || "N/A"}</p>
                </div>

                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Irrigation source</h3>
                  <p className="text-gray-900 dark:text-white">{data?.irrigation_source || "N/A"}</p>
                </div>

                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Irrigation type</h3>
                  <p className="text-gray-900 dark:text-white">{data?.irrigation_type || "N/A"}</p>
                </div>
                
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Heard_about agribharat</h3>
                  <p className="text-gray-900 dark:text-white">{data?.heard_about_agribharat || "N/A"}</p>
                </div>

                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Address</h3>
                  <p className="text-gray-900 dark:text-white">{data?.address || "N/A"} </p>
                </div>

                {/* Address */}

                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold">District</h3>
                  <p className="text-gray-900 dark:text-white">{data?.district || "N/A"}</p>
                </div>

                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Taluka</h3>
                  <p className="text-gray-900 dark:text-white">{data?.taluka || "N/A"}</p>
                </div>
                
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Village</h3>
                  <p className="text-gray-900 dark:text-white">{data?.village || "N/A"}</p>
                </div>

                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Pincode</h3>
                  <p className="text-gray-900 dark:text-white">{data?.pincode || "N/A"} </p>
                </div>

                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Created Date</h3>
                  <p className="text-gray-900 dark:text-white">
                    {data?.created_at ? moment(data.created_at).format("DD-MM-YYYY HH:mm:ss") : "N/A"}
                  </p>
                </div>

                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Created By</h3>
                  <p className="text-gray-900 dark:text-white">
                    {data?.created_by || "N/A"}
                  </p>
                </div>

                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Status</h3>
                  <p className="text-white text-sm font-bold py-1 px-3 rounded-lg">
                    {data?.is_active ? "Active" : "Inactive"}
                  </p>
                </div>
              </div>
            ))}
            </div>
        </div>
      </NavbarSidebarLayout>
    </>
  );
};

export default CustomerDetailsPage;