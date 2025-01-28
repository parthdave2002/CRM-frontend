import type { FC } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import {
  Breadcrumb,
  Button,
  Checkbox,
  Label,
  Table,
  TextInput,
} from "flowbite-react";
import { useState, useEffect } from "react";
import {
  getModuleGrouplist,
  getModulelist,
  getModuleAcesslist,
  SaveRolesAccesslist,
} from "../../Store/actions";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import {
  HiChevronLeft,
  HiChevronRight,
  HiCog,
  HiDocumentDownload,
  HiDotsVertical,
  HiExclamationCircle,
  HiHome,
  HiTrash,
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const RolesAccessPage: FC = function () {
  const dispatch = useDispatch();
  const location = useLocation();

  // const [Module_group_name, setModule_group_name] = useState([]);
  const [Role_id, set_Role_id] = useState("");
  // const [Access_id, setAccess_id] = useState([]);
  const [Access_name, setAccess_name] = useState("");

  const AccessIds = (id: any) => {
    setAccess_id(id._id);
    setAccess_name(id.access_name);
  };
  const [Access_id, setAccess_id] = useState<string[]>([]);

  // Function to handle checkbox change
  const handleCheckboxChange = (item:any) => {
    setAccess_name(item.access_name);
    // Check if the checkbox is already in the array
    if (Access_id.includes(item._id)) {
      // If checked, remove it
      setAccess_id((prevIds) => prevIds.filter((id) => id !== item._id));
    } else {
      // If unchecked, add it
      setAccess_id((prevIds:any) => [...prevIds, item._id]);
    }
  };

  const [ActiveCard, setActiveCard] = useState(false);
  // Current Module Group Code Start
  const [Currentmodule, setCurrentmodule] = useState("");
  const [Currentmoduleid, setCurrentmoduleid] = useState([]);

  // Current Sub Module Code Start
  const [CurrentSubmodule, setCurrentSubmodule] = useState("");
  const [CurrentSubmoduleid, setCurrentSubmoduleid] = useState([]);

  useEffect(() => {
    if (location.state) {
      set_Role_id(location.state.id);
    }
  }, [location]);

  const [ModuleGroupdataList, setModuleGroupdataList] = useState([]);
  const [ModuledataList, setModuledataList] = useState([]);
  const [RoleAcsessList, setRoleAcsessList] = useState([]);

  const { ModuleAccesslist, ModuleGroupData, ModuleData } = useSelector(
    (state:any) => ({
      ModuleGroupData: state.Modules.ModuleGroupData,
      ModuleData: state.Modules.ModuleData,
      ModuleAccesslist: state.ModuleAccess.ModuleAccesslist,
    })
  );

  useEffect(() => {
    let requserdatagroup = {
      size: 100,
      type: "Module-Group-view",
    };
    dispatch(getModuleGrouplist(requserdatagroup));
  }, [dispatch]);

  useEffect(() => {
    setModuleGroupdataList(ModuleGroupData ? ModuleGroupData.data : null);
    setModuledataList(ModuleData ? ModuleData.modules : null);
    setRoleAcsessList(ModuleAccesslist ? ModuleAccesslist : null);
  }, [ModuleGroupData, ModuleData, ModuleAccesslist]);

  // console.log("Role_id ==========>>>>>>>>>>>>>>", ModuleAccesslist);
  // console.log("Access_id ==========>>>>>>>>>>>>>>", ModuledataList);
  // console.log("Module_group_name ==========>>>>>>>>>>>>>>", Currentmoduleid);
  // console.log("Access_name ==========>>>>>>>>>>>>>>", Access_name);

  const SaveFuncall = () => {
    let rqeuserdata = {
      access_name: Access_name,
      is_active: true,
      module_id: Currentmoduleid,
      sub_module_id: CurrentSubmoduleid,
      role_id: Access_id,
      // type: "Role-Access-Add",
      id: "0",
    };
    dispatch(SaveRolesAccesslist(rqeuserdata));
    set_Role_id("");
  };

  const Accesstypedata = (item:any) => {
    setCurrentmodule(item.module_group);
    setCurrentmoduleid(item._id);

    let requserdata = {
      id: item._id,
      type: "Module-List-View",
      sub_module_id: "64cb9eccfa4b3d167429b29e",
    };
    dispatch(getModulelist(requserdata));

    if (Currentmodule != null) {
      setActiveCard(true);
    } else {
      setActiveCard(false);
    }
  };

  const selectModule = (item:any) => {
    setCurrentSubmoduleid(item._id);
    setCurrentSubmodule(item);

    let requserdata = {
      id: item._id,
      type: "Module-Access-List-View",
    };
    dispatch(getModuleAcesslist(requserdata));
  };

  return (
    <>
      <NavbarSidebarLayout
        isFooter={false}
        isSidebar={true}
        isNavbar={true}
        isRightSidebar={true}
      >
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
                <Breadcrumb.Item>
                  {" "}
                  <Link to="/roles/list"> Roles</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Access List</Breadcrumb.Item>
              </Breadcrumb>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                Role Access List
              </h1>
            </div>
            <div className="sm:flex">
              <div className="mb-3 hidden items-center dark:divide-gray-700 sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100">
                <form className="lg:pr-3">
                  <Label htmlFor="users-search" className="sr-only">
                    Search
                  </Label>
                  <div className="relative mt-1 lg:w-64 xl:w-96">
                    <TextInput
                      id="users-search"
                      name="users-search"
                      placeholder="Search for role"
                    />
                  </div>
                </form>
                <div className="mt-3 flex space-x-1 pl-0 sm:mt-0 sm:pl-2">
                  <a
                    href="#"
                    className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
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
                <Button color="gray">
                  <div className="flex items-center gap-x-3">
                    <HiDocumentDownload className="text-xl" />
                    <span>Export</span>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden shadow">
                <div className="flex mt-4">
                  <Card
                    variant="gradient"
                    className="w-full max-w-[20rem] p-8 dark:bg-CardColor dark:text-white dark:border-gray-700  ml-5"
                  >
                    <CardBody className="p-0">
                      {ModuleGroupdataList &&
                        ModuleGroupdataList.map((item:any, k) => (
                          <>
                            <Button
                              key={k}
                              onClick={() => {
                                Accesstypedata(item);
                              }}
                              className="text-black bg-Gainsboro hover:bg-Gainsboro  min-w-[80%] max-w-[80%] dark:bg-Backgroundcolor dark:hover:bg-Backgroundcolor dark:text-white dark:hover:text-indigo-600 mt-6"
                            >
                              {item.module_group}
                            </Button>
                          </>
                        ))}
                    </CardBody>
                  </Card>

                  {ActiveCard == true ? (
                    <Card
                      variant="gradient"
                      className="w-full max-w-full p-8 pl-0 ml-4 dark:bg-CardColor dark:text-white dark:border-gray-700"
                    >
                      <CardBody className="p-0">
                        {ModuledataList &&
                          ModuledataList.map((item:any, k) => (
                            <>
                              <div key={k}>
                                <Button
                                  onClick={() => {
                                    selectModule(item);
                                  }}
                                  className="text-black  bg-Gainsboro hover:bg-Gainsboro ml-20 min-w-[50%] max-w-[50%] dark:bg-Backgroundcolor dark:hover:bg-Backgroundcolor dark:text-white dark:hover:text-indigo-600 mt-6"
                                >
                                  {item.module_name}
                                </Button>
                              </div>
                            </>
                          ))}
                      </CardBody>
                    </Card>
                  ) : null}

                  {ActiveCard == true ? (
                    <Card
                      variant="gradient"
                      className="w-full max-w-full p-8 pl-0 ml-4 dark:bg-CardColor dark:text-white dark:border-gray-700"
                    >
                      <CardBody className="p-0">
                        {RoleAcsessList &&
                          RoleAcsessList.map((item:any, k) => (
                            <div key={k} className="p-4" style={{ minWidth: "7vw" }} >
                              {/* <Checkbox  id={item._id} className="mr-3" onChange={() => { AccessIds(item) }} checked={Access_id.includes(item._id)}/> */}
                              <Checkbox
                                id={item._id}
                                className="mr-3"
                                onChange={() => handleCheckboxChange(item)}
                                checked={Access_id.includes(item._id)}
                              />
                              {item.access_name}
                            </div>
                          ))}
                      </CardBody>
                      <CardFooter>
                        <div className="float-right mt-4">
                          <Button onClick={() => SaveFuncall()}>Save</Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </NavbarSidebarLayout>
    </>
  );
};

export default RolesAccessPage;
