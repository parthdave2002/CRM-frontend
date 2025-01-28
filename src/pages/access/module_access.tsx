/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Breadcrumb,
  Button,
  Checkbox,
  Label,
  Modal,
  Table,
} from "flowbite-react";
import Select from "react-select";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Input, FormFeedback } from "reactstrap";
import type { FC } from "react";
import {
  HiCog,
  HiExclamationCircle,
  HiDotsVertical ,
  HiHome,
  HiPlus,
  HiTrash,
} from "react-icons/hi";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  getModuleAcesslist,
  getMainMenulist,
  AddModuleAcesslist,
  getModuleGrouplist,
  getModulelist,
  SearchModuleAccesslist,
  getLaravelModuleAccessList
} from "../../Store/actions";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ExamplePagination from "../../components/pagination";
import ExampleBreadcrumb from "../../components/breadcrumb";


const AccessListPage: FC = function () {
  const dispatch = useDispatch();
  const [isOpenAddModel, setisOpenAddModel] = useState(false);

  // Access Data Code start
  const [AccessList, setAccessList] = useState([]);
  const AcccessData = AccessList && AccessList.map((item:any) => ({ value: item.access_name }));
  // Access Data Code end

  // next Button  Code Start
    const [TotalPage, setTotalPage] = useState(0);
    const [PageNo, setPageNo] = useState(1);
    const [RoePerPage, setRoePerPage] = useState(5);
      
    const RowPerPage = (value: any) => {
      setRoePerPage(value);
    };
      
    const PageDataList = (data:any) =>{
      setPageNo(data)
    }
  // Nect button Code End
  
  const [TotalListData, setTotalListData] = useState(0);
  const [CurrentUserListSize, setCurrentUserListSize] = useState();
  const [CurrentPageNo, setCurrentPageNo] = useState(0);
  const [AgentList, setAgentList] = useState([]);
  const [MainMenuList, setMainMenuList] = useState([]);
  useEffect(() => {
  const menu = localStorage.getItem("Menu");
    
    if(menu == "Dialer"){
      let reqdatauser = {
        type: "Module-Access-List-View",
        sub_module_id: "64cc7daf2167a41d9c8f781e",
        page: PageNo,
        size: RoePerPage,
      };
  
      dispatch(getModuleAcesslist(reqdatauser));
      dispatch(getMainMenulist(reqdatauser));
    }
    else if(menu == "Default"){
      let requserdata = {  action: "module-permissions",  page: PageNo,  perPage: RoePerPage};
      dispatch(getLaravelModuleAccessList(requserdata));
    }
  }, [dispatch, PageNo, RoePerPage]);

  // Node Code Start
  const { Agentlist,  MainMenulist,  UserListSize, TotalUserListData,  CurrentPage,LaravelMenuAccesslist} = useSelector((state: any) => ({
    Agentlist: state.ModuleAccess.ModuleAccesslist,
    MainMenulist: state.Menu.MainMenulist,
    UserListSize: state.Menu.UserListSize,
    TotalUserListData: state.Menu.TotalUserListData,
    CurrentPage: state.Menu.CurrentPage,
    LaravelMenuAccesslist: state.LaravelModule.LaravelMenuAccesslist,
  }));

  useEffect(() => {
    setAgentList(Agentlist && Agentlist.module ? Agentlist.module : LaravelMenuAccesslist ||null);
    setAccessList(Agentlist ? Agentlist.AccessData : null);
    setMainMenuList(MainMenulist ? MainMenulist.menu : null);
    setTotalListData(TotalUserListData ? TotalUserListData : 0);
    setCurrentUserListSize(UserListSize ? UserListSize : 0);
    setCurrentPageNo(CurrentPage ? CurrentPage : 1);
  }, [Agentlist, MainMenulist, TotalUserListData, UserListSize, CurrentPage, LaravelMenuAccesslist]);
  // Node Code End

  // Module Group Code start
   const [ModuledataList, setModuledataList] = useState([]);
   const { ModuleData } = useSelector((state: any) => ({ ModuleData: state.Modules.ModuleGroupData, }));
 
   useEffect(() => {
     const getData = () => {
       let requserdatagroup = {
         size: 100,
         type: "Module-Group-view",
       };
       dispatch(getModuleGrouplist(requserdatagroup));
     };
     getData();
   }, []);
 
   useEffect(() => {
     setModuledataList(ModuleData ? ModuleData.data : null);
   }, [ModuleData]);
 
   const groupoptions =  ModuledataList && ModuledataList.map((item: any) => ({ value: item._id, label: item.module_group,  }));
   const [selectedModuleGroupOption, setSelectedModuleGroupOption] = useState(null);
   const [selectedModuleid, setSelectedModuleid] = useState(0);
 
   const Modulegtoupdata = (data: any) => {
     if (!data) {
       setSelectedModuleid(0);
       setSelectedModuleGroupOption(null);
     } else {
       setSelectedModuleid(data.value);
       setSelectedModuleGroupOption(data);
     }
   };
 // Module Group Code End

  // Sub Module Group Code start
    const [ProductList, setProductList] = useState([]);
    const { SubModuleData } = useSelector((state: any) => ({ SubModuleData: state.Modules.ModuleData }));
    useEffect(() => {
      if (selectedModuleid != 0) {
        let requserdata = {
          id: selectedModuleid,
          type: "Module-List-View",
        };
        dispatch(getModulelist(requserdata));
      }
    }, [selectedModuleid]);

    useEffect(() => {
      setProductList(SubModuleData ? SubModuleData.modules : null);
    }, [SubModuleData]);

    const submoduleoptions = ProductList && ProductList.map((item: any) => ({ value: item._id, label: item.module_name }));
    const [selectedsubModuleOption, setSelectedsubModuleOption] = useState(null);
    const [selectedSubModuleid, setSelectedSubModuleid] = useState(0);

    const SubModuledata = (data: any) => {
      if (!data) {
        setSelectedSubModuleid(0);
        setSelectedsubModuleOption(null);
      } else {
        setSelectedSubModuleid(data.value);
        setSelectedsubModuleOption(data);
      }
    };
  // Sub moDule Group Code End


  // Risticted Menu Code Start
  const menuoptions =  MainMenuList && MainMenuList.map((item: any) => ({  value: item._id, label: item.location,}));
  const [selectedModuleOption, setSelectedModuleOption] = useState(null);
  const [selectedResModuleid, setSelectedResModuleid] = useState([]);
  const Moduledata = (data: any) => {
    let department = "";
    for (let i = 0; i < data.length; i++) {
      if (i == 0) {
        department = data[i]["value"];
      } else {
        department = department + "," + data[i]["value"];
      }
      console.log("selectedResModuleid", department);
      setSelectedResModuleid(department);
    }
    setSelectedModuleOption(data);
  };
  // Risticted Menu Code End

  // Stustus Code Start
  const [selectedStatusOption, setSelectedStatusOption] = useState(null);
  const [selectedStatusid, setSelectedStatusid] = useState([]);

  const statusoptions = [
    { value: "true", label: "Active" },
    { value: "false", label: "Deactive" },
  ];

  const Statusdata = (data: any) => {
    if (!data) {
      setSelectedStatusid([]);
      setSelectedStatusOption(null);
    } else {
      setSelectedStatusid(data.value);
      setSelectedStatusOption(data);
    }
  };
  // Stustus Code End

  const [initialValues, setinitialValues] = useState({
    id: 0,
    access_name: "",
    client_route: "",
    is_active: [],
    module_id: "",
    sub_module_id: "",
    restricted_menu: "",
    type: "Module-Access-List-Add",
  });

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: initialValues,

    validationSchema: Yup.object({
      access_name: Yup.string().required("Please Enter access_name"),
      client_route: Yup.string().required("Please Enter client_route"),
    }),
    onSubmit: (values: any) => {
      values.is_active = selectedStatusid;
      values.module_id = selectedModuleid;
      values.sub_module_id = selectedSubModuleid;
      values.restricted_menu = selectedResModuleid;

      dispatch(AddModuleAcesslist(values));
      validation.resetForm();
      setisOpenAddModel(false);
    },
  });


  // Menu Drag And Drop Code Start
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.dataTransfer.setData("text/plain", String(index));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    targetIndex: number
  ) => {
    e.preventDefault();
    const sourceIndex = Number(e.dataTransfer.getData("text/plain"));
    const updatedItems = [...AgentList];
    const [draggedItem] = updatedItems.splice(sourceIndex, 1);
    updatedItems.splice(targetIndex, 0, draggedItem);
    setAgentList(updatedItems);
  };
  // Menu Drag And Drop Code End


  // Search Data COde Start
    const [searchData, setSearchData] = useState(null);
    useEffect(() => {
      if(searchData != null){
        let requserdata = {
          key: searchData,
        };
        dispatch(SearchModuleAccesslist(requserdata));
      }
    }, [searchData]);
  // Search Data COde end



  return (
    <>
      <NavbarSidebarLayout  isFooter={false}  isSidebar={true}  isNavbar={true}  isRightSidebar={true} >
        <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
          <div className="mb-1 w-full">
            <div className="mb-4">
              <Breadcrumb className="mb-4">
                <Breadcrumb.Item>
                  <Link to="/dashboard">
                    <div className="flex items-center gap-x-3">
                      <HiHome className="text-xl" />
                      <span className="dark:text-white">Home</span>
                    </div>
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Module Access List</Breadcrumb.Item>
              </Breadcrumb>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                Module Access List
              </h1>
            </div>
            <div className="sm:flex">
              <div className="mb-3 hidden items-center dark:divide-gray-700 sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100">
                <form className="lg:pr-3">
                  <Label htmlFor="users-search" className="sr-only">
                    Search
                  </Label>
                  <div className="relative mt-1 lg:w-64 xl:w-96">
                    <Input
                      id="Search_Module"
                      name="Search_Module"
                      className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                      placeholder="Search for Module (Extension)"
                      type="text"
                      onChange={(e) => {
                        setSearchData(e.target.value);
                      }}
                      value={searchData}
                    />
                  </div>
                </form>
                <div className="mt-3 flex space-x-1 pl-0 sm:mt-0 sm:pl-2">

                  <a  href="#" className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" >
                    <span className="sr-only">Configure</span>
                    <HiCog className="text-2xl" />
                  </a>

                  <a
                    href="#"
                    className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span className="sr-only">Delete</span>
                    <HiTrash className="text-2xl" />
                  </a>
                  <a
                    href="#"
                    className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span className="sr-only">Purge</span>
                    <HiExclamationCircle className="text-2xl" />
                  </a>
                  <a
                    href="#"
                    className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span className="sr-only">Settings</span>
                    <HiDotsVertical className="text-2xl" />
                  </a>
                </div>
              </div>

              <div className="ml-auto flex items-center space-x-2 sm:space-x-3">
                {/* {AcccessData && AcccessData.map((item) => item.value === "Module-Access-List-Add" ? ( */}
                      <Button color="primary" onClick={() => setisOpenAddModel(true)} >
                        <div className="flex items-center gap-x-3">  <HiPlus className="text-xl" />  Add Module Access </div>
                      </Button>
                    {/* ) : null )} */}

                {/* {AcccessData && AcccessData.map((item) => item.value === "Module-Access-List-Add" ? (
                      <Button color="gray"> 
                        <div className="flex items-center gap-x-3"> <HiDocumentDownload className="text-xl" /> <span>Export</span> </div> 
                      </Button>
                    ) : null
                  )} */}
              </div>

            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden shadow">

                <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">

                  <Table.Head className="bg-gray-100 dark:bg-gray-700">
                    <Table.HeadCell> <Checkbox id="select-all" name="select-all" /> </Table.HeadCell>
                    <Table.HeadCell>access_name</Table.HeadCell>
                    <Table.HeadCell>Resticted Menu</Table.HeadCell>
                    <Table.HeadCell>client_route</Table.HeadCell>
                    <Table.HeadCell>is_active</Table.HeadCell>
                  </Table.Head>

                  <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                    {AgentList &&  AgentList.map((item: any, index) => (
                        
                        <Table.Row key={index}  className="hover:bg-gray-100 dark:hover:bg-gray-700" draggable={true} onDragStart={(e) => handleDragStart(e, index)}  onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, index)} >
                          <Table.Cell className="w-4 py-0"  style={{ paddingTop: "1", paddingBottom: "1" }} >
                            <Checkbox />
                          </Table.Cell>

                          <Table.Cell className="whitespace-nowraptext-base font-medium text-gray-900 dark:text-white py-0">
                            {item.access_name ? item.access_name :  <div> -</div> }
                          </Table.Cell>

                          <Table.Cell className="whitespace-nowraptext-base font-medium text-gray-900 dark:text-white py-0">
                            {item.restricted_menu ? item.restricted_menu  :  <div> -</div> }
                          </Table.Cell>

                          <Table.Cell className="whitespace-nowraptext-base font-medium text-gray-900 dark:text-white py-0">
                            {item.client_route ?  item.client_route  :  <div> -</div> }
                          </Table.Cell>

                          <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
                            {item.is_active == true ? 
                              <div className="flex items-center">  <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400"></div> Active  </div>
                             : 
                              <div className="flex items-center"> <div className="mr-2 h-2.5 w-2.5 rounded-full bg-Red"></div> Deactive </div>
                            }
                          </Table.Cell>
                        </Table.Row>

                      ))}
                  </Table.Body>

                </Table>
              </div>
            </div>
          </div>
        </div>

        <ExamplePagination PageData={PageDataList} RowPerPage={RowPerPage}  PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData}/>
      </NavbarSidebarLayout>

      {/* Add MOdel  */}
      <Modal onClose={() => setisOpenAddModel(false)} show={isOpenAddModel}>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}
        >
          <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
            <strong>Add Module Access</strong>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="mb-3">
                <Label htmlFor="">Module Group</Label>
                <div className="mt-1">
                  <Select
                    className="w-full"
                    value={selectedModuleGroupOption}
                    onChange={(e) => {
                      Modulegtoupdata(e);
                    }}
                    options={groupoptions}
                    isClearable={true}
                  />
                </div>
              </div>

              <div className="mb-3">
                <Label htmlFor="">Sub-Module</Label>
                <div className="mt-1">
                  <Select
                    className="w-full"
                    value={selectedsubModuleOption}
                    onChange={(e) => {
                      SubModuledata(e);
                    }}
                    options={submoduleoptions}
                    isClearable={true}
                  />
                </div>
              </div>

              <div className="mb-3">
                <Label htmlFor="access_name">access_name</Label>
                <div className="mt-1">
                  <Input
                    id="access_name"
                    name="access_name"
                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                    placeholder="Enter access_name"
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.access_name || ""}
                    invalid={
                      validation.touched.access_name &&
                      validation.errors.access_name
                        ? true
                        : false
                    }
                  />
                  {validation.touched.access_name &&
                  validation.errors.access_name ? (
                    <FormFeedback type="invalid" className="text-Red">
                      {validation.errors.access_name}
                    </FormFeedback>
                  ) : null}
                </div>
              </div>

              <div className="mb-3">
                <Label htmlFor="client_route">client_route</Label>
                <div className="mt-1">
                  <Input
                    id="client_route"
                    name="client_route"
                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                    placeholder="Enter client_route"
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.client_route || ""}
                    invalid={
                      validation.touched.client_route &&
                      validation.errors.client_route
                        ? true
                        : false
                    }
                  />

                  {validation.touched.client_route &&
                  validation.errors.client_route ? (
                    <FormFeedback type="invalid" className="text-Red">
                      {validation.errors.client_route}
                    </FormFeedback>
                  ) : null}
                </div>
              </div>

              <div>
                <Label htmlFor="">Risticted Menu</Label>
                <div className="mt-1">
                  <Select
                    isClearable={true}
                    isMulti={true}
                    value={selectedModuleOption}
                    onChange={(e) => {
                      Moduledata(e);
                    }}
                    options={menuoptions}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="">Status</Label>
                <div className="mt-1">
                  <Select
                    className="w-full"
                    value={selectedStatusOption}
                    onChange={(e) => {
                      Statusdata(e);
                    }}
                    options={statusoptions}
                    isClearable={true}
                  />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" color="primary">
              Add Module Access
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

     
    </>
  );
};


export default AccessListPage;
