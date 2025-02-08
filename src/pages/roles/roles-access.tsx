import type { FC } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { Button, Checkbox,} from "flowbite-react";
import { useState, useEffect } from "react";
import {  SaveRolesAccesslist } from "../../Store/actions";
import { useDispatch, useSelector } from "react-redux";
import {  useParams } from "react-router-dom";
import ExampleBreadcrumb from "../../components/breadcrumb";


const RolesAccessPage: FC = function () {
  const dispatch = useDispatch();
  const { id }= useParams();

  const [Role_id, set_Role_id] = useState("");
  const [Access_name, setAccess_name] = useState("");
  const [Access_id, setAccess_id] = useState<string[]>([]);
  const [Currentmoduleid, setCurrentmoduleid] = useState([]);
  const [CurrentSubmoduleid, setCurrentSubmoduleid] = useState([]);

  useEffect(() => { if (id)  set_Role_id(id) }, [id]);

  const SaveFuncall = () => {
    let rqeuserdata = {
      access_name: Access_name,
      is_active: true,
      module_id: Currentmoduleid,
      sub_module_id: CurrentSubmoduleid,
      role_id: Access_id,
      id: "0",
    };
    dispatch(SaveRolesAccesslist(rqeuserdata));
    set_Role_id("");
  };

  let Name = "Role Access List";
  let ParentName = "Role List";
  let ParentLink = "/roles/list";

  return (
      <NavbarSidebarLayout isFooter={false} isSidebar={true} isNavbar={true} isRightSidebar={true} >
        <ExampleBreadcrumb  Name={Name} ParentName={ParentName} ParentLink={ParentLink} />
          <div className="mt-[2rem] bg-white dark:bg-gray-800 p-4">  Role Acces Page </div>
      </NavbarSidebarLayout>
  );
};

export default RolesAccessPage;
