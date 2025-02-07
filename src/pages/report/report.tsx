import type { FC } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { Button, Checkbox, Label, Table,} from "flowbite-react";
import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import {  HiOutlinePencilAlt, HiTrash, HiKey,} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { getModuleGrouplist,  getSingleModuleGroup, AddModuleGrouplist, DeleteModuleGrouplist,} from "../../Store/actions";
import ExampleBreadcrumb from "../../components/breadcrumb";

const ReportPage: FC = function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  let Name = "Report Page";

  return (
    <>
      <NavbarSidebarLayout  isFooter={false} isSidebar={true} isNavbar={true} isRightSidebar={true} >
        <ExampleBreadcrumb  Name={Name} />
        <div className="dark:text-gray-50"> Report page</div>    
      </NavbarSidebarLayout>

    </>
  );
};

export default ReportPage;