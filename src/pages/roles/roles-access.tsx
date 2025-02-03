import type { FC } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { Button, Checkbox,} from "flowbite-react";
import { useState, useEffect } from "react";
import {
  getModuleGrouplist,
  getModulelist,
  getModuleAcesslist,
  SaveRolesAccesslist,
} from "../../Store/actions";
import { Card, CardHeader,  CardBody,  CardFooter,} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ExampleBreadcrumb from "../../components/breadcrumb";


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

  let Name = "Role Access List";
  let Searchplaceholder = "Search For Module (Name)";
  let ParentName = "Role List";
  let ParentLink = "/roles/list";


  return (
    <>
      <NavbarSidebarLayout isFooter={false} isSidebar={true} isNavbar={true} isRightSidebar={true} >
     
        <ExampleBreadcrumb  Name={Name} ParentName={ParentName} ParentLink={ParentLink} Searchplaceholder={Searchplaceholder}/>

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
