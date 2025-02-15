import type { FC } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { Button, } from "flowbite-react";
import { useState, useEffect } from "react";
import {  ResetRolesAccesslist, SaveRolesAccesslist, getRolesAccesslist } from "../../Store/actions";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate, useParams } from "react-router-dom";
import ExampleBreadcrumb from "../../components/breadcrumb";


const RolesAccessPage: FC = function () {
  const dispatch = useDispatch();
  const { id }= useParams();
  const navigate = useNavigate();

  const [selectedPermissions, setSelectedPermissions] = useState<{ [key: string]: { [key: string]: boolean } }>({});

  useEffect(() =>{
    let reqUser={
      id: id
    }
    dispatch(getRolesAccesslist(reqUser))
  },[])

  // ------------- Get  Data From Reducer Code Start --------------
    const { SaveDatalist, GetDatalist } = useSelector((state: any) => ({
      SaveDatalist: state.RoleAccess.SaveRolesAccesslist,
      GetDatalist: state.RoleAccess.GetRolesAccesslist,
    }));
      
    useEffect(() => {  
      if(SaveDatalist?.success == true){
        dispatch(ResetRolesAccesslist())
        navigate(ParentLink)
      }
    }, [SaveDatalist]);

    useEffect(() => {
      if (Array.isArray(GetDatalist?.data)) {
        const formattedData: { [key: string]: { [key: string]: boolean } } = {};
        GetDatalist?.data.forEach((module:any) => {
          formattedData[module.module_name] = module.permissions;
        });
        setSelectedPermissions(formattedData);
      }
    }, [GetDatalist]);
  //  ------------- Get Data From Reducer Code end --------------

  const getFormattedData = () => {
    const modules = Object.entries(selectedPermissions || {}).map(([module, permissions]) => ({  module_name: module,  permissions }));
    return modules
  };

  const handleCheckboxChange = (role: string, permission: string) => {
    setSelectedPermissions((prevState:any) => ({
      ...prevState,
      [role]: {
        ...prevState[role],
        [permission]: !prevState[role]?.[permission], // Toggle value
      },
    }));
  };

  const SaveFuncall = async () => {
    const permissionData = await getFormattedData();
    let rqeuserdata = {
      role_id : id,
      modules: permissionData
    };
    dispatch(SaveRolesAccesslist(rqeuserdata));
  };

  const permissions = ["view", "add", "edit", "delete"];
  const roles = ["Dashboard", "User", "Roles", "Customer", "Product", "Order", "Lead", "Report", "Packing Type", "Category", "Banner", "Taglog"];

  let Name = "Role Access List";
  let ParentName = "Role List";
  let ParentLink = "/roles/list";

  return (
      <NavbarSidebarLayout isFooter={false} isSidebar={true} isNavbar={true} isRightSidebar={true} >
        <ExampleBreadcrumb  Name={Name} ParentName={ParentName} ParentLink={ParentLink} />
          <div className="mt-[2rem] bg-white dark:bg-gray-800 p-4">  
   
            <div className="overflow-x-auto">
              <table className="w-full border-none dark:bg-gray-800 rounded-lg shadow-md dark:text-gray-50">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800 text-left">
                    <th className="p-3 border border-gray-200 dark:border-gray-700">Name</th>
                    {permissions.map((perm) => (
                      <th key={perm} className="p-3 border border-gray-200 dark:border-gray-700 text-center">
                        {perm}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {roles.map((role:string, index:number) => (
                    <tr key={role} className={index % 2 === 0 ? "bg-gray-50 dark:bg-gray-800" : "bg-white dark:bg-gray-800"}>
                      <td className="p-3 border border-gray-200 dark:border-gray-700">{role}</td>
                      {permissions.map((perm, permIndex) => (
                        <td key={permIndex} className="p-3 border border-gray-200 dark:border-gray-700 text-center">
                          <input   type="checkbox"  className="w-5 h-5 border-gray-300 focus:ring-0 focus:border-none rounded-md"  checked={!!selectedPermissions[role]?.[perm]}  onChange={() => handleCheckboxChange(role, perm)} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>


              <div className="flex gap-x-3 justify-end mt-[3rem]">
                <Button className="bg-addbutton hover:bg-addbutton dark:bg-addbutton dark:hover:bg-addbutton" onClick={() => SaveFuncall()}>  Save Permission </Button>
                <Button className="bg-deletebutton hover:bg-deletebutton dark:bg-deletebutton dark:hover:bg-deletebutton" onClick={() => navigate("/roles/list")}>  Close </Button>
              </div>
          </div>
      </NavbarSidebarLayout>
  );
};

export default RolesAccessPage;
