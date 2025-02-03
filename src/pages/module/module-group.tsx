import type { FC } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { Button, Checkbox, Label, Table,} from "flowbite-react";
import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { HiOutlineExclamationCircle, HiOutlinePencilAlt, HiTrash, HiKey,} from "react-icons/hi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getModuleGrouplist,  getSingleModuleGroup, AddModuleGrouplist, DeleteModuleGrouplist,} from "../../Store/actions";
import ExamplePagination from "../../components/pagination";
import ExampleBreadcrumb from "../../components/breadcrumb";

const ModulegroupPage: FC = function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [edit_id, set_edu_id] = useState(0);                                                                                                
  const [isOpenDelteModel, setisOpenDelteModel] = useState(false);
  const [isOpenAddModel, setisOpenAddModel] = useState(false);

  // ---------------- Access Data Code start --------------
    const [AccessList, setAccessList] = useState([]);
    const [AccessCommon, setAccessCommon] = useState([]);
    const AccessDataList = AccessList && AccessList.map((item: any) => ({ value: item.access_name }));
    const AccessData = AccessCommon && AccessCommon.map((item: any) => ({ value: item.access_name }));
  // -------------- Access Data Code End --------------

  // ----------- Search Api Code Satrt ------------------
    const [searchData, setSearchData] = useState(null);
    const Changename = (data:any) =>{
      setSearchData(data)
    }
  // ------------  search api code End --------------------

  // ----------  next Button  Code Start --------------------
    const [TotalPage, setTotalPage] = useState(0);
    const [PageNo, setPageNo] = useState(1);
    const [RoePerPage, setRoePerPage] = useState(5);
    
    const RowPerPage = (value: any) => {setRoePerPage(value)};
    const PageDataList = (data:any) => { setPageNo(data)};
  // -------------------- Nect button Code End --------------------

  const [TotalListData, setTotalListData] = useState(0);
  const [CurrentUserListSize, setCurrentUserListSize] = useState();
  const [CurrentPageNo, setCurrentPageNo] = useState(0);
  const [ModuledataList, setModuledataList] = useState([]);
  const [SinlgeModuledataList, setSinlgeModuledataList] = useState([]);


  useEffect(() => {
      let requserdatagroup ={
        page: PageNo,
        size: RoePerPage,
        search:searchData
      };
      dispatch(getModuleGrouplist(requserdatagroup));
  }, [dispatch, PageNo, RoePerPage, searchData]);


  // ------------------ Node Code Start ------------------
    const { ModuleData, SingleModuleGroupData, ModuleGroupListSize, TotalModuleGroupListData,  CurrentPage, } = useSelector((state:any) => ({
      ModuleData: state.Modules.ModuleGroupData,
      SingleModuleGroupData: state.Modules.SingleModuleGroupData,
      ModuleGroupListSize: state.Modules.ModuleGroupListSize,
      TotalModuleGroupListData: state.Modules.TotalModuleGroupListData,
      CurrentPage: state.Modules.CurrentPage,
    }));

    useEffect(() => {
      setModuledataList(ModuleData ? ModuleData.data : null);
      setAccessList(ModuleData.AccessData ? ModuleData.AccessData.list : []);
      setAccessCommon(ModuleData.AccessData ? ModuleData.AccessData.common : []);
      setSinlgeModuledataList( SingleModuleGroupData ? SingleModuleGroupData.data : null );
      setTotalListData(TotalModuleGroupListData ? TotalModuleGroupListData : 0);
      setCurrentUserListSize(ModuleGroupListSize ? ModuleGroupListSize : 0);
      setCurrentPageNo(CurrentPage ? CurrentPage : 1);
    }, [ ModuleData, SingleModuleGroupData, ModuleGroupListSize,  CurrentPage,  TotalModuleGroupListData, ]);
  
    // ------- Get Module Data Code Start ------
    const getModuledata = (id:any) => {
      setisOpenAddModel(true);
      let rqeuserdata = { id: id};
      dispatch(getSingleModuleGroup(rqeuserdata));
      set_edu_id(id);
    };
    //------- Get Module Data Code End -------
  
    //------- Delete Module Data Code Start -------
    const [Delete_id, set_Delete_id] = useState(0);
    const DeleteFuncall = (id:any) => {
      set_Delete_id(id);
      setisOpenDelteModel(true);
    };

    //------- Delete Module Data Code End -------

  
  // ------------------ Node Code End  ------------------

  const ModuleListFuncall = (id: any) => {
    navigate("/module-manage", {
      state: { id: id._id, name: id.module_group },
    });
  };

  // ------- Add Modal Open code start ------
  const OpenAddModel = () =>{ setisOpenAddModel(true)}
  //-------  Add Modal Open code end -----

  let Name = "Module Group";
  let Searchplaceholder = "Search For Module";
  let AddAccess = "Module-Group-Add";

  return (
    <>
      <NavbarSidebarLayout  isFooter={false} isSidebar={true} isNavbar={true} isRightSidebar={true} >
        <ExampleBreadcrumb  Name={Name} Searchplaceholder = {Searchplaceholder} searchData= {searchData} Changename= {Changename}  isOpenAddModel= {OpenAddModel} AddAccess={AddAccess}/>
       
        <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
          <Table.Head className="bg-gray-100 dark:bg-gray-700">
            <Table.HeadCell> <Label htmlFor="select-all" className="sr-only"> Select all </Label> <Checkbox id="select-all" name="select-all" /> </Table.HeadCell>
            <Table.HeadCell>Module Group</Table.HeadCell>
            <Table.HeadCell>Order</Table.HeadCell>
            <Table.HeadCell>Description</Table.HeadCell>
            <Table.HeadCell className="text-center"> Actions  </Table.HeadCell>
            <Table.HeadCell>module List</Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">       
            {ModuledataList && ModuledataList.map((item: any, k:any) => (
              <Table.Row key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <Table.Cell className="w-4 py-0" style={{ paddingTop: "1", paddingBottom: "1" }} > <Checkbox /> </Table.Cell>
                <Table.Cell className="whitespace-nowraptext-base font-medium text-gray-900 dark:text-white py-0"> {item.module_group} </Table.Cell>
                <Table.Cell className="whitespace-nowraptext-base font-medium text-gray-900 dark:text-white py-0"> {item.order} </Table.Cell>
                <Table.Cell className="whitespace-nowraptext-base font-medium text-gray-900 dark:text-white py-0"> {item.description} </Table.Cell>
                <Table.Cell className="space-x-2 whitespace-nowrap py-0">
                  <div className="flex items-center gap-x-3 justify-evenly">
                    {AccessDataList && AccessDataList.map((data) => data.value === "modulegroup-edit" ? (   <Button gradientDuoTone="greenToBlue" onClick={() => getModuledata(item._id)} > <div className="flex items-center gap-x-2"> <HiOutlinePencilAlt className="text-lg" /> Edit Module </div> </Button>  ) : null)} 
                    {AccessDataList && AccessDataList.map((data) => data.value === "modulegroup-deleted" ? (    <Button gradientDuoTone="purpleToPink" onClick={() => DeleteFuncall(item._id)} > <div className="flex items-center gap-x-2"> <HiTrash className="text-lg" /> Delete Module</div> </Button>  ) : null)} 
                  </div>
                </Table.Cell>
                <Table.Cell> {AccessDataList && AccessDataList.map((data) => data.value === "modulelist-view" ? (    <Button color="primary"  onClick={() => ModuleListFuncall(item)} > <div className="flex items-center gap-x-2"> <HiKey className="text-lg" /> Module List </div> </Button> ) : null)}  </Table.Cell>
              </Table.Row>
            ))}         
          </Table.Body>
        </Table>
             
        <ExamplePagination PageData={PageDataList} RowPerPage={RowPerPage}  PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData}/>
      </NavbarSidebarLayout>

    </>
  );
};

export default ModulegroupPage;