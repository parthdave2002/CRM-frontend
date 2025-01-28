/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button,  Checkbox, Label,  Modal,  Table} from "flowbite-react";
import type { FC } from "react";
import {  HiOutlineExclamationCircle, HiOutlinePencilAlt, HiTrash} from "react-icons/hi";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getPackingTypelist, DeletePackingTypelist } from "../../Store/actions";
import { useEffect, useState } from "react";
import ExamplePagination from "../../components/pagination";
import ExampleBreadcrumb from "../../components/breadcrumb";

const PackinTypeListPage: FC = function () {
  const dispatch = useDispatch();
  const [isOpenDelteModel, setisOpenDelteModel] = useState(false);
  const [UserDataList, setUserDataList] = useState([]);
  
  // Access Data Code start
  const [AccessList, setAccessList] = useState([]);
  const [AccessCommon, setAccessCommon] = useState([]);
  const AccessDataList = AccessList && AccessList.map((item: any) => ({ value: item.access_name }));
  const AccessData = AccessCommon && AccessCommon.map((item: any) => ({ value: item.access_name }));
  // Access Data Code end

    const { Packingtypelist,  PackingtypelistSize, TotalPackingtypeData, CurrentPage } = useSelector((state: any) => ({
      Packingtypelist: state.Packing.Packingtypelist,
      PackingtypelistSize: state.Packing.PackingtypelistSize,
      TotalPackingtypeData: state.Packing.TotalPackingtypeData,
      CurrentPage: state.Packing.CurrentPage,
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
    dispatch(getPackingTypelist());

  }, [dispatch, PageNo, RoePerPage, searchData]);

  const [TotalListData, setTotalListData] = useState(0);
  const [CurrentUserListSize, setCurrentUserListSize] = useState();
  const [CurrentPageNo, setCurrentPageNo] = useState(0);

  useEffect(() => {
    setUserDataList(Packingtypelist ? Packingtypelist : null);
    // setAccessList(UserList.AccessData ? UserList.AccessData.list : []);
    // setAccessCommon(UserList.AccessData ? UserList.AccessData.common : []);
    setTotalListData(TotalPackingtypeData ? TotalPackingtypeData : 0);
    setCurrentUserListSize(PackingtypelistSize ? PackingtypelistSize : 0);
    setCurrentPageNo(CurrentPage ? CurrentPage : 1);
  }, [Packingtypelist,  PackingtypelistSize, TotalPackingtypeData, CurrentPage]);
  //  ------------- Get User Data From Reducer Code Start --------------

  // ------------  Delete Module Data Code Start ------------
  const [Delete_id, set_Delete_id] = useState(0);
  const DeleteFuncall = (id: any) => {
    set_Delete_id(id);
    setisOpenDelteModel(true);
  };

  const DelRole = () => {
    let rqeuserdata = { id: Delete_id };
    dispatch(DeletePackingTypelist(rqeuserdata));
    setisOpenDelteModel(false);
  };
  // -------  Delete Module Data Code End ---------------

  // --------- Checkbox Code start ------------
    const CheckData = (data:any) =>{
      console.log(data)
    }
  // --------- Checkbox Code end ------------

  const OpenAddModel = () =>{
    console.log("calll");
  }

  let Name = "Packing Type List";
  let Searchplaceholder = "Search For Packing Types (Name)";
  let AddAccess = "user-add";

  return (
    <>
      <NavbarSidebarLayout isFooter={false}  isSidebar={true} isNavbar={true} isRightSidebar={true}>
        <ExampleBreadcrumb  Name={Name} Searchplaceholder={Searchplaceholder} searchData={searchData} Changename= {Changename} isOpenAddModel= {OpenAddModel} AddAccess={AddAccess}/>
    
          <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 ">
              <Table.Head className="bg-gray-100 dark:bg-gray-700">
                <Table.HeadCell> <Checkbox id="select-all" name="select-all" /> </Table.HeadCell>
                <Table.HeadCell>Type</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>Created At</Table.HeadCell>
                <Table.HeadCell>Actions</Table.HeadCell>
               
              </Table.Head>

              <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                  {UserDataList && UserDataList.map((item: any, k) => (
                        <Table.Row  key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700" >
                          <Table.Cell className="w-4 py-0" style={{ paddingTop: "1", paddingBottom: "1" }}>  <Checkbox  value={item._id} onClick={() => {CheckData(item._id)}}/>  </Table.Cell>
                          <Table.Cell className="whitespace-nowraptext-base font-medium text-gray-900 dark:text-white py-0">  {item.type} </Table.Cell>
                        
                          <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
                            {item.is_active == true ? <div className="flex items-center">  <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400"></div> Active  </div>
                            : <div className="flex items-center">  <div className="mr-2 h-2.5 w-2.5 rounded-full bg-Red"></div> Deactive  </div>}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowraptext-base font-medium text-gray-900 dark:text-white py-0"> {item.createdAt} </Table.Cell>
                          <Table.Cell className="space-x-2 whitespace-nowrap py-0">
                            <div className="flex items-center gap-x-3">
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

      {/* Delete  Model */}
      <Modal onClose={() => setisOpenDelteModel(false)} show={isOpenDelteModel} size="md" >
        <Modal.Header className="px-6 pt-6 pb-0"> <span className="sr-only">Delete user</span> </Modal.Header>
        <Modal.Body className="px-6 pt-0 pb-6">
          <div className="flex flex-col items-center gap-y-6 text-center"> 
            <HiOutlineExclamationCircle className="text-7xl text-red-500" /> <p className="text-xl text-gray-500">  Are you sure you want to delete this user?</p>
            <div className="flex items-center gap-x-3"> <Button color="failure" onClick={() => DelRole()}>  Yes, I'm sure </Button> <Button color="gray" onClick={() => setisOpenDelteModel(false)}> No, cancel </Button></div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PackinTypeListPage;