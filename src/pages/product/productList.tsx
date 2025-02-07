/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Checkbox, Table} from "flowbite-react";
import type { FC } from "react";
import { HiTrash} from "react-icons/hi";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { useDispatch, useSelector } from "react-redux";
import { DeleteCompanylist,  getCompanylist } from "../../Store/actions";
import { lazy, Suspense, useEffect, useState } from "react";
import ExamplePagination from "../../components/pagination";
import ExampleBreadcrumb from "../../components/breadcrumb";
import { useNavigate } from "react-router";
import moment from "moment";
const DeleteModalPage = lazy(() => import("../../components/modal/deleteModal"));

const ProductListPage: FC = function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpenDelteModel, setisOpenDelteModel] = useState(false);
  const [PackingTypeList, setPackingTypeList] = useState([]);
  
  //------------ Access Data Code start------------
  const [AccessList, setAccessList] = useState([]);
  const [AccessCommon, setAccessCommon] = useState([]);
  const AccessDataList = AccessList && AccessList.map((item: any) => ({ value: item.access_name }));
  const AccessData = AccessCommon && AccessCommon.map((item: any) => ({ value: item.access_name }));
  //--------- Access Data Code end------------------
  
    const { Companylist,  CompanylistSize, TotalCompanyData, CurrentPage } = useSelector((state: any) => ({
      Companylist: state.Company.Companylist,
      CompanylistSize: state.Company.CompanylistSize,
      TotalCompanyData: state.Company.TotalCompanyData,
      CurrentPage: state.Company.CurrentPage,
    }));
    
  // ----------- next Button  Code Start -------------
    const [TotalListData, setTotalListData] = useState(0);
    const [CurrentUserListSize, setCurrentUserListSize] = useState();
    const [CurrentPageNo, setCurrentPageNo] = useState(0);
    const [PageNo, setPageNo] = useState(1);
    const [RoePerPage, setRoePerPage] = useState(5);

    const RowPerPage = (value: any) => { setRoePerPage(value)};
    const PageDataList = (data:any) =>{ setPageNo(data)}
  // ------------- Next button Code End -------------

  // ---------------- Search code start ----------------
    const [searchData, setSearchData] = useState(null);
    const Changename = (data:any) =>{
      setSearchData(data)
    }
  // ---------------- Search code end ----------------

  // ------------- Get  Data From Reducer Code Start --------------
    useEffect(() => {
      let requserdata = {
        page: PageNo,
        size: RoePerPage,
        search: searchData
      };
      dispatch(getCompanylist());
    }, [dispatch, PageNo, RoePerPage, searchData]);

    useEffect(() => {        
      setPackingTypeList(Companylist?.pulledData);
      // setAccessList(UserList.AccessData ? UserList.AccessData.list : []);
      // setAccessCommon(UserList.AccessData ? UserList.AccessData.common : []);
      setTotalListData(TotalCompanyData ? TotalCompanyData : 0);
      setCurrentUserListSize(CompanylistSize ? CompanylistSize : 0);
      setCurrentPageNo(CurrentPage ? CurrentPage : 1);
    }, [Companylist,  CompanylistSize, TotalCompanyData, CurrentPage]);
  //  ------------- Get Data From Reducer Code end --------------

  // ------------  Delete Code Start ------------
    const [Delete_id, set_Delete_id] = useState(0);
    const DeleteFuncall = (id: any) => {
      set_Delete_id(id);
      setisOpenDelteModel(true);
    };

    const DeletepackingType = () => {
      let rqeuserdata = { id: Delete_id };
      dispatch(DeleteCompanylist(rqeuserdata));
      setisOpenDelteModel(false);
    };
  // -------  Delete Code End ---------------

  // --------- Checkbox Code start ------------
    const CheckData = (data:any) =>{
      console.log(data)
    }
  // --------- Checkbox Code end ------------

  const OpenAddModel = () =>{
    navigate("/product/add")
  }

  const DetailsPageCall = (id:any) =>{
    navigate(`/product/details/${id}`)
  }

  let Name = "Product List";
  let Searchplaceholder = "Search For Product (Name)";
  let AddAccess = "Product-add";

  return (
    <>
      <NavbarSidebarLayout isFooter={false}  isSidebar={true} isNavbar={true} isRightSidebar={true}>
        <ExampleBreadcrumb  Name={Name} Searchplaceholder={Searchplaceholder} searchData={searchData} Changename= {Changename} isOpenAddModel= {OpenAddModel} AddAccess={AddAccess}/>
    
          <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 ">
              <Table.Head className="bg-gray-100 dark:bg-gray-700">
                <Table.HeadCell> <Checkbox id="select-all" name="select-all" /> </Table.HeadCell>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Description</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>Created At</Table.HeadCell>
                <Table.HeadCell>Actions</Table.HeadCell>
              </Table.Head>

              <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                  {PackingTypeList && PackingTypeList.map((item: any, k) => (
                        <Table.Row  key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700" >
                          <Table.Cell className="w-4 py-0" style={{ paddingTop: "1", paddingBottom: "1" }}>  <Checkbox  value={item._id} onClick={() => {CheckData(item._id)}}/>  </Table.Cell>
                          <Table.Cell className="whitespace-nowraptext-base font-medium text-gray-900 dark:text-white py-0">  {item.name} </Table.Cell>
                          <Table.Cell className="whitespace-nowraptext-base font-medium text-gray-900 dark:text-white py-0">  {item.description} </Table.Cell>
                          <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
                            {item.is_active == true ? <div className="flex items-center">  <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400"></div> Active  </div>
                            : <div className="flex items-center">  <div className="mr-2 h-2.5 w-2.5 rounded-full bg-Red"></div> Deactive  </div>}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowraptext-base font-medium text-gray-900 dark:text-white py-0"> {moment(item.createdAt).format("DD-MM-YYYY hh:mm:ss")} </Table.Cell>
                          <Table.Cell className="space-x-2 whitespace-nowrap py-0">
                            <div className="flex items-center gap-x-3">
                             
                              {/* {AccessDataList &&  AccessDataList.map((data) =>  data.value === "user-delete" ? (  */}
                                  <Button  gradientDuoTone="purpleToPink" onClick={() => DeleteFuncall(item._id)}><div className="flex items-center gap-x-2 deletebutton"> <HiTrash className="text-lg" />  Delete </div> </Button>
                              {/* ) : null )}   */}

                               {/* {AccessDataList &&  AccessDataList.map((data) =>  data.value === "user-delete" ? (  */}
                                  <Button  gradientDuoTone="pinkToOrange" onClick={() => DetailsPageCall(item._id)}><div className="flex items-center gap-x-2 deletebutton"> <HiTrash className="text-lg" />  Details </div> </Button>
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
            <DeleteModalPage  isOpenDelteModel={isOpenDelteModel}  name={"Company"} setisOpenDelteModel={setisOpenDelteModel}  DelCall={DeletepackingType} />
          </Suspense>
        )}
                  
    </>
  );
};

export default ProductListPage;