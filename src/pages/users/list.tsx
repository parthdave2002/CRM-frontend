/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button,  Checkbox, Table} from "flowbite-react";
import type { FC } from "react";
import {  HiOutlineExclamationCircle, HiOutlinePencilAlt, HiTrash} from "react-icons/hi";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getUserlist, DeleteUserlist,   } from "../../Store/actions";
import { lazy, useEffect, useState, Suspense  } from "react";
import ExamplePagination from "../../components/pagination";
import ExampleBreadcrumb from "../../components/breadcrumb";
import { useNavigate } from "react-router";
const DeleteModalPage = lazy(() => import("../../components/modal/deleteModal"));

const UserListPage: FC = function () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpenDelteModel, setisOpenDelteModel] = useState(false);
  const [UserDataList, setUserDataList] = useState([]);

  // Access Data Code start
  const [AccessList, setAccessList] = useState([]);
  const [AccessCommon, setAccessCommon] = useState([]);
  const AccessDataList = AccessList && AccessList.map((item: any) => ({ value: item.access_name }));
  const AccessData = AccessCommon && AccessCommon.map((item: any) => ({ value: item.access_name }));
  // Access Data Code end

  const { UserList,  UserListSize, TotalUserListData, CurrentPage } = useSelector((state: any) => ({
      UserList: state.User.UserList,
      UserListSize: state.User.UserListSize,
      TotalUserListData: state.User.TotalUserListData,
      CurrentPage: state.User.CurrentPage,
    }));

  // ----------- next Button  Code Start -------------
  const [TotalPage, setTotalPage] = useState(0);
  const [PageNo, setPageNo] = useState(1);
  const [RoePerPage, setRoePerPage] = useState(5);

  const RowPerPage = (value: any) => { setRoePerPage(value)};
  const PageDataList = (data:any) =>{ setPageNo(data)}
  // ------------- Nect button Code End -------------

  // ---------------- Search User code start ----------------
  const [searchData, setSearchData] = useState(null);
  const Changename = (data:any) =>{
    setSearchData(data)
  }
  // ---------------- Search User code end ----------------

  // ------------- Get User Data From Reducer Code Start --------------

  useEffect(() => {
    let requserdata = {
      page: PageNo,
      size: RoePerPage,
      search: searchData
    };
    dispatch(getUserlist(requserdata));

  }, [dispatch, PageNo, RoePerPage, searchData]);

  const [TotalListData, setTotalListData] = useState(0);
  const [CurrentUserListSize, setCurrentUserListSize] = useState();
  const [CurrentPageNo, setCurrentPageNo] = useState(0);
  
  useEffect(() => {
    setUserDataList(UserList. pulledData ? UserList. pulledData  : null);
    setAccessList(UserList.AccessData ? UserList.AccessData.list : []);
    setAccessCommon(UserList.AccessData ? UserList.AccessData.common : []);
    setTotalListData(TotalUserListData ? TotalUserListData : 0);
    setCurrentUserListSize(UserListSize ? UserListSize : 0);
    setCurrentPageNo(CurrentPage ? CurrentPage : 1);
  }, [UserList,  TotalUserListData, UserListSize, CurrentPage]);
  //  ------------- Get User Data From Reducer Code Start --------------

  // ------------- Get User Data Code Start --------------
  const getUserData = (id: any) => {
   console.log(id);
  };
  // -----------Get Module Data Code End -------------------

  // ------------  Delete Module Data Code Start ------------
  const [Delete_id, set_Delete_id] = useState(0);
  const DeleteFuncall = (id: any) => {
    set_Delete_id(id);
    setisOpenDelteModel(true);
  };

  const DelRole = () => {
    let rqeuserdata = { id: Delete_id };
    dispatch(DeleteUserlist(rqeuserdata));
    setisOpenDelteModel(false);
  };
  // -------  Delete Module Data Code End ---------------

  // --------- Checkbox Code start ------------
    const CheckData = (data:any) =>{
      console.log(data)
    }
  // --------- Checkbox Code end ------------

  const OpenAddModel = () =>{
    navigate("/users/add")
  }

  let Name = "User List";
  let Searchplaceholder = "Search For Users (Name)";
  let AddAccess = "user-add";

  return (
    <>
      <NavbarSidebarLayout isFooter={false}  isSidebar={true} isNavbar={true} isRightSidebar={true}>
        <ExampleBreadcrumb  Name={Name} Searchplaceholder={Searchplaceholder} searchData={searchData} Changename= {Changename} isOpenAddModel= {OpenAddModel} AddAccess={AddAccess}/>
          <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 ">
              <Table.Head className="bg-gray-100 dark:bg-gray-700">
                <Table.HeadCell> <Checkbox id="select-all" name="select-all" /> </Table.HeadCell>
                <Table.HeadCell>User Name</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>Actions</Table.HeadCell>
              </Table.Head>

              <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                  {UserDataList && UserDataList.map((item: any, k) => (
                        <Table.Row  key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700" >
                          <Table.Cell className="w-4 py-0" style={{ paddingTop: "1", paddingBottom: "1" }}>  <Checkbox  value={item._id} onClick={() => {CheckData(item._id)}}/>  </Table.Cell>
                          <Table.Cell className="whitespace-nowraptext-base font-medium text-gray-900 dark:text-white py-0">  {item.name} </Table.Cell>
                          <Table.Cell className="whitespace-nowraptext-base font-medium text-gray-900 dark:text-white py-0"> {item.email} </Table.Cell>
                          <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
                            {item.is_active == true ? <div className="flex items-center">  <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400"></div> Active  </div>
                            : <div className="flex items-center">  <div className="mr-2 h-2.5 w-2.5 rounded-full bg-Red"></div> Deactive  </div>}
                          </Table.Cell>
                          <Table.Cell className="space-x-2 whitespace-nowrap py-0">
                            <div className="flex items-center gap-x-3">
                              {/* {AccessDataList && AccessDataList.map((data) => data.value === "user-edit" ? ( */}
                                  <Button gradientDuoTone="greenToBlue" onClick={() => getUserData(item._id)} > <div className="flex items-center gap-x-2">  <HiOutlinePencilAlt className="text-lg" />  Edit User  </div></Button>
                              {/* ) : null)}  */}
       
                              {/* {AccessDataList &&  AccessDataList.map((data) =>  data.value === "user-delete" ? (  */}
                                  <Button  gradientDuoTone="purpleToPink" onClick={() => DeleteFuncall(item._id)}><div className="flex items-center gap-x-2 deletebutton"> <HiTrash className="text-lg" />  Delete user  </div> </Button>
                              {/* ) : null )}   */}
                            </div>
                          </Table.Cell>

                        </Table.Row>
                  ))}
              </Table.Body>
          </Table>
        <ExamplePagination PageData={PageDataList} RowPerPage={RowPerPage}  PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData}/>
      </NavbarSidebarLayout>

  
      {isOpenDelteModel && (
          <Suspense fallback={<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"> <div className="text-white">Loading...</div> </div> }>
            <DeleteModalPage  isOpenDelteModel={isOpenDelteModel}  name={"user"} setisOpenDelteModel={setisOpenDelteModel}  DelCall={DelRole} />
          </Suspense>
      )}

    </>
  );
};

export default UserListPage;