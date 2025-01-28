/* eslint-disable jsx-a11y/anchor-is-valid */
import type { FC } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import LOGO from "/public/images/authentication/404-error-page.jpg"

const PageNotFound: FC = function () {
  return (
    <>
      <NavbarSidebarLayout isFooter={false}  isSidebar={false} isNavbar={false}  isRightSidebar={false}>
        <div className="block items-center justify-between p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
          {/* <div className="mb-1 w-full">Sorry, the page you are looking for could not be found.</div> */}
          <img alt="Flowbite logo" src={LOGO} style={{"height":"85vh", "width":"80vw"}}  />
        </div>

      </NavbarSidebarLayout>
    </>
  );
};

export default PageNotFound;
