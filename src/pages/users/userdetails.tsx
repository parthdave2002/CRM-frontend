
import { Button,  Checkbox, Table} from "flowbite-react";
import type { FC } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getUserlist  } from "../../Store/actions";
import { lazy, useEffect, useState, Suspense  } from "react";
import ExampleBreadcrumb from "../../components/breadcrumb";
import { useParams } from "react-router";
import moment from "moment";

const UserDetailsPage: FC = function () {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if(id){
      let requserdata = {
        id: id
      };
      dispatch(getUserlist(requserdata))
    }
  },[id])

  const [UserDataList, setUserDataList] = useState([]);
  const { UserList } = useSelector((state: any) => ({
    UserList: state.User.UserList,
  }));

  useEffect(() => {
    setUserDataList(UserList. pulledData ? UserList. pulledData  : null);
  }, [UserList]);
  //  ------------- Get User Data From Reducer Code Start --------------

  const SingleUserDataList = [
    {
      "is_active": true,
      "_id": "67ab2c70371d4b1e04ef3514",
      "name": "serus",
      "email": "diguqypo@mailinator.com",
      "password": "$2a$10$APIed3Aa6UOeJg2xp0Re6e.20fQA6rMEdJFtlUHEbGmcJvJ7kh9J2",
      "gender": "male",
      "mobile_no": 858,
      "date_of_joining": "1997-01-12",
      "role": "67a9c77c3022e8352c60d5b9"
    }
  ]

  let Name = "User Details";
  let ParentName = "User List";
  let ParentLink = "/users/list";

  return (
    <>
      <NavbarSidebarLayout isFooter={false}  isSidebar={true} isNavbar={true} isRightSidebar={true}>
        <ExampleBreadcrumb  Name={Name} ParentName={ParentName} ParentLink ={ParentLink} />
        <div className="mt-[2rem] bg-white dark:bg-gray-800 p-4">
            <div>
            {SingleUserDataList &&  SingleUserDataList.map((data: any, index: number) => (
              <div key={index} className="grid grid-cols-3 gap-6">
                {/* Name */}
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Name</h3>
                  <p className="text-gray-900 dark:text-white">{data?.name || "N/A"}</p>
                </div>

                {/* Email */}
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Email</h3>
                  <p className="text-gray-900 dark:text-white">{data?.email || "N/A"}</p>
                </div>

                {/* Gender */}
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Gender</h3>
                  <p className="text-gray-900 dark:text-white">{data?.gender || "N/A"}</p>
                </div>

                {/* Mobile Number */}
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Mobile Number</h3>
                  <p className="text-gray-900 dark:text-white">{data?.mobile_no || "N/A"}</p>
                </div>

                {/* Date of Joining */}
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Date of Joining</h3>
                  <p className="text-gray-900 dark:text-white">{data?.date_of_joining || "N/A"}</p>
                </div>

                {/* Role */}
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Role</h3>
                  <p className="text-gray-900 dark:text-white">{data?.role || "N/A"}</p>
                </div>

                {/* Created Date */}
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Created Date</h3>
                  <p className="text-gray-900 dark:text-white">
                    {data?.created_at ? moment(data.created_at).format("DD-MM-YYYY HH:mm:ss") : "N/A"}
                  </p>
                </div>

                {/* Status */}
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

export default UserDetailsPage;