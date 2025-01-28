import type { FC } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { Breadcrumb, Button, Checkbox, Label, Modal, Table} from "flowbite-react";
import { useEffect, useState } from "react";
import { HiCog, HiDocumentDownload, HiDotsVertical, HiExclamationCircle, HiHome,HiOutlineExclamationCircle, HiOutlinePencilAlt, HiPlus, HiTrash, HiKey,} from "react-icons/hi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Input, FormFeedback } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getRoleslist, getSingleRoleslist,  AddRoleslist, DeleteRoleslist,} from "../../Store/actions";
import ExamplePagination from "../../components/pagination";
import { Link, useNavigate } from "react-router-dom";

const RolesPage: FC = function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpenAddModel, setisOpenAddModel] = useState(false);
  const [isOpenDelteModel, setisOpenDelteModel] = useState(false);

  //------------ Stustus Code Start-------------
  const [selectedStatusOption, setSelectedStatusOption] = useState(null);
  const [isActive, setisActive] = useState(null);

  const statusoptions = [
    { value: true , label: "Active" },
    { value: false, label: "Deactive" },
  ];

  const Statusdata = (data: any) => {

    if (!data) {
      setisActive(null);
      setSelectedStatusOption(null);
    } else {
      setisActive(data.value);
      setSelectedStatusOption(data);
    }
  };
  // ----------------- Stustus Code End -----------------

  // ----------------- Search Code Start  -----------------
  const [searchData, setSearchData] = useState(null);
  const searchdata = (data:any) =>{
    setSearchData(data.target.value)
  }
  // ----------------- Search Code end -----------------

  // ----------------- Access Data Code start  -----------------
  const [AccessList, setAccessList] = useState([]);
  const [AccessCommon, setAccessCommon] = useState([]);
  const AccessDataList = AccessList && AccessList.map((item: any) => ({ value: item.access_name }));
  const AccessData = AccessCommon && AccessCommon.map((item: any) => ({ value: item.access_name }));
  // ----------------- Access Data Code end  -----------------
 
 //  ----------------- next Button  Code Start  -----------------
 const [TotalPage, setTotalPage] = useState(0);
 const [PageNo, setPageNo] = useState(1);
 const [RoePerPage, setRoePerPage] = useState(5);

 const RowPerPage = (value: any) => {
   setRoePerPage(value);
 };

 const PageDataList = (data:any) =>{
   setPageNo(data)
 }
 // ----------------- Nect button Code End  -----------------

  const [TotalListData, setTotalListData] = useState(0);
  const [CurrentUserListSize, setCurrentUserListSize] = useState();
  const [CurrentPageNo, setCurrentPageNo] = useState(0);

  const [RolesList, setRoleList] = useState([]);
  const [RolesListView, setRolesListView] = useState([]);

  const { Roleslist, RolesSinglelist, RoleListSize, TotalRoleListData, CurrentPage,} = useSelector((state: any) => ({
    Roleslist: state.Role.Roleslist,
    RolesSinglelist: state.Role.RolesSinglelist,
    RoleListSize: state.Role.RoleListSize,
    TotalRoleListData: state.Role.TotalRoleListData,
    CurrentPage: state.Role.CurrentPage,
  }));

  useEffect(() => {
    let requserdata = {
      find_role_title: "",
      page: PageNo,
      size: RoePerPage,
      search:searchData
    };
    dispatch(getRoleslist(requserdata));
  }, [dispatch, PageNo, RoePerPage,searchData]);

  useEffect(() => {
    setRoleList(Roleslist ? Roleslist.pulledData : null);
    setAccessList(Roleslist.AccessData ? Roleslist.AccessData.list : []);
    setAccessCommon(Roleslist.AccessData ? Roleslist.AccessData.common : []);
    setRolesListView(RolesSinglelist ? RolesSinglelist.data : null);
    setTotalListData(TotalRoleListData ? TotalRoleListData : 0);
    setCurrentPageNo(CurrentPage ? CurrentPage : 1);
  }, [Roleslist, RolesSinglelist, TotalRoleListData, CurrentPage]);

  // Get User Data Code Start
  const [edit_id, set_edu_id] = useState(0);
  const getUnderGuidedata = (id:any) => {
    setisOpenAddModel(true);
    let rqeuserdata = { id: id};
    dispatch(getSingleRoleslist(rqeuserdata));
    set_edu_id(id);
  };
  // Get User Data Code End

  // Delete Role Data Code Start
  const [id, set_Delete_id] = useState(0);
  const DeleteFuncall = (id:any) => {
    set_Delete_id(id);
    setisOpenDelteModel(true);
  };

  const DelRole = () => {
    let rqeuserdata = { id: id, type: "Role-Delete" };
    dispatch(DeleteRoleslist(rqeuserdata));
    setisOpenDelteModel(false);
  };

  // Delete Role Data Code End
  const [initialValues, setinitialValues] = useState({
    id: edit_id,
    role_title: "",
    description: "",
    is_active: true,
  });

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: initialValues,

    validationSchema: Yup.object({
      role_title: Yup.string().required("Please Enter Role Title"),
      description: Yup.string().required("Please Enter Description"),
    }),

    onSubmit: (values) => {
      const userData = {
        id: edit_id,
        role_title: values.role_title,
        description: values.description,
        is_active: isActive,
      };
      dispatch(AddRoleslist(userData));
      validation.resetForm();
      setisOpenAddModel(false);
      setSelectedStatusOption(null);
      setisActive(null)
    },
  });


  const ModuleListFuncall = (id: any) => {
    navigate("/roles/access", { state: { id: id._id } });
  };

  return (
    <>
      <NavbarSidebarLayout isFooter={false} isSidebar={true} isNavbar={true} isRightSidebar={true} >
        <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
          <div className="mb-1 w-full">
            <div className="mb-4">
              <Breadcrumb className="mb-4">
                <Breadcrumb.Item>  <Link to="/dashboard"> <div className="flex items-center gap-x-3"> <HiHome className="text-xl" /> <span className="dark:text-white">Home</span> </div> </Link>  </Breadcrumb.Item>
                <Breadcrumb.Item>Role List</Breadcrumb.Item>
              </Breadcrumb>
              
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl"> Role List</h1>
            </div>
            <div className="sm:flex">
              <div className="mb-3 hidden items-center dark:divide-gray-700 sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100">
                
                  <div className="relative mt-1 lg:w-64 xl:w-96">
                    <Input  id="Search_Module" name="Search_Module" className="userinput" placeholder="Search for Roles (Title)" type="text" onChange={(e) => { searchdata(e) }} />
                  </div>

                <div className="mt-3 flex space-x-1 pl-0 sm:mt-0 sm:pl-2">
                  <a href="#" className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" >
                    <span className="sr-only">Configure</span>  <HiCog className="text-2xl" />
                  </a>

                  <a href="#" className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <span className="sr-only">Delete</span>  <HiTrash className="text-2xl" />
                  </a>

                  <a href="#" className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" >
                    <span className="sr-only">Purge</span> <HiExclamationCircle className="text-2xl" />
                  </a>

                  <a href="#" className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" >
                    <span className="sr-only">Settings</span> <HiDotsVertical className="text-2xl" />
                  </a>
                </div>
              </div>
              <div className="ml-auto flex items-center space-x-2 sm:space-x-3">
                {AccessData && AccessData.map((item:any) => item.value === "role-add" ? ( <Button color="primary" onClick={() => setisOpenAddModel(true)} > <div className="flex items-center gap-x-3"> <HiPlus className="text-xl" />  Add Role  </div> </Button> ) : null)}
                {/* {AcccessData && AcccessData.map((item) => item.value === "Role-Add" ?  <Button color="gray"> <div className="flex items-center gap-x-3"> <HiDocumentDownload className="text-xl" /> <span>Export</span> </div> </Button> : null)} */} 
              </div>
            </div>
          </div>
        </div>
 
          
        <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
          <Table.Head className="bg-gray-100 dark:bg-gray-700">
                    <Table.HeadCell> <Checkbox id="select-all" name="select-all" /></Table.HeadCell>
                    <Table.HeadCell>Title</Table.HeadCell>
                    <Table.HeadCell>Description</Table.HeadCell>
                    <Table.HeadCell>Status</Table.HeadCell>
                    <Table.HeadCell className="text-center">  Actions </Table.HeadCell>
                    <Table.HeadCell>Role Access</Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
            {RolesList && RolesList.map((item: any, k:any) => (
                <Table.Row key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700" >
                  <Table.Cell className="w-4 py-0" style={{ paddingTop: "1", paddingBottom: "1" }} > <Checkbox /> </Table.Cell>
                  <Table.Cell className="whitespace-nowraptext-base font-medium text-gray-900 dark:text-white py-0">  {item.role_title}  </Table.Cell>
                  <Table.Cell className="whitespace-nowraptext-base font-medium text-gray-900 dark:text-white py-0">  {item.description}  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
                    {item.is_active == true ? 
                        <div className="flex items-center"><div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400"></div> Active </div>
                      : <div className="flex items-center"> <div className="mr-2 h-2.5 w-2.5 rounded-full bg-Red"></div> Deactive </div>
                    }
                  </Table.Cell>
                  <Table.Cell className="space-x-2 whitespace-nowrap py-0">
                    <div className="flex items-center gap-x-3 justify-evenly">
                      {AccessDataList && AccessDataList.map((data) => data.value === "role-edit" ? (  <Button  gradientDuoTone="greenToBlue" onClick={() => getUnderGuidedata(item._id)}><div className="flex items-center gap-x-2"> <HiOutlinePencilAlt className="text-lg" /> Edit Role </div> </Button>  ) : null)} 
                      {AccessDataList && AccessDataList.map((data) => data.value === "role-delete" ? ( <Button gradientDuoTone="purpleToPink" onClick={() => DeleteFuncall(item._id)} > <div className="flex items-center gap-x-2"> <HiTrash className="text-lg" />  Delete Role </div> </Button> ) : null)} 
                    </div>
                  </Table.Cell>
                  <Table.Cell>  
                    {AccessDataList && AccessDataList.map((data) => data.value === "roleaccess-view" ? (  
                    <Button color="primary" className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-dark"  onClick={() => ModuleListFuncall(item)}> <div className="flex items-center gap-x-2"> <HiKey className="text-lg" /> Role Access List </div>  </Button>  
                    ) : null)}  
                    </Table.Cell>
                </Table.Row>
            ))}
          </Table.Body>
        </Table>

        <ExamplePagination PageData={PageDataList} RowPerPage={RowPerPage}  PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData}/>
      </NavbarSidebarLayout>

      {/* Delete Role */}
      <Modal onClose={() => setisOpenDelteModel(false)} show={isOpenDelteModel} size="md" >
        <Modal.Header className="px-6 pt-6 pb-0"> <span className="sr-only">Delete Role</span></Modal.Header>
        <Modal.Body className="px-6 pt-0 pb-6">
          <div className="flex flex-col items-center gap-y-6 text-center"> <HiOutlineExclamationCircle className="text-7xl text-red-500" /> <p className="text-xl text-gray-500"> Are you sure you want to delete this Role? </p> 
          <div className="flex items-center gap-x-3"><Button color="failure" onClick={() => DelRole()}>  Yes, I'm sure </Button> <Button color="gray" onClick={() => setisOpenDelteModel(false)}> No, cancel </Button> </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RolesPage;