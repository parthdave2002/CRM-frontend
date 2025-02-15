import type { FC } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { Button, Checkbox,} from "flowbite-react";
import { useState, useEffect } from "react";
import {  SaveRolesAccesslist } from "../../Store/actions";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate, useParams } from "react-router-dom";
import ExampleBreadcrumb from "../../components/breadcrumb";


const RolesAccessPage: FC = function () {
  const dispatch = useDispatch();
  const { id }= useParams();
  const navigate = useNavigate();

  const [Role_id, set_Role_id] = useState("");
  useEffect(() => { if (id)  set_Role_id(id) }, [id]);

  const [selectedPermissions, setSelectedPermissions] = useState<{ [key: string]: { [key: string]: boolean } }>({});
  const handleCheckboxChange = (role: string, permission: string) => {
    setSelectedPermissions((prevState) => ({
      ...prevState,
      [role]: {
        ...prevState[role],
        [permission]: !prevState[role]?.[permission], // Toggle value
      },
    }));
  };

  const SaveFuncall = () => {
    // let rqeuserdata = {
    //   is_active: true,
    //   role-id : Role_id,
    //   id: "0",
    // };
    console.log("Selected Permissions:", selectedPermissions);
    // dispatch(SaveRolesAccesslist());
  };

  const permissions = ["View", "Add", "Edit", "Delete"];
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
                          <input   type="checkbox"  className="w-5 h-5 border-gray-300 focus:ring-0 focus:border-none rounded-md" onChange={() => handleCheckboxChange(role, perm)} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div > Save Permission </div>

              <div className="flex gap-x-3 justify-end mt-[3rem]">
                <Button className="bg-addbutton hover:bg-addbutton dark:bg-addbutton dark:hover:bg-addbutton" onClick={() => SaveFuncall()}>  Save Permission </Button>
                <Button className="bg-deletebutton hover:bg-deletebutton dark:bg-deletebutton dark:hover:bg-deletebutton" onClick={() => navigate("/roles/list")}>  Close </Button>
              </div>
          </div>
      </NavbarSidebarLayout>
  );
};

export default RolesAccessPage;
