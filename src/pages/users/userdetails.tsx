
import { Button,  Checkbox, Table} from "flowbite-react";
import type { FC } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getUserlist  } from "../../Store/actions";
import { lazy, useEffect, useState, Suspense  } from "react";
import ExampleBreadcrumb from "../../components/breadcrumb";

const UserDetailsPage: FC = function () {

  let Name = "User Details";
  let ParentName = "User List";
  let ParentLink = "/users/list";

  return (
    <>
      <NavbarSidebarLayout isFooter={false}  isSidebar={true} isNavbar={true} isRightSidebar={true}>
        <ExampleBreadcrumb  Name={Name} ParentName={ParentName} ParentLink ={ParentLink} />
        <div> User Details Page </div>
      </NavbarSidebarLayout>
    </>
  );
};

export default UserDetailsPage;