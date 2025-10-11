import { Footer } from "flowbite-react";
import type { FC, PropsWithChildren } from "react";
import Navbar from "../components/navbar";
import RightSidebar from "../components/rightsidebar";
import Sidebar from "../components/sidebar";

import { MdFacebook } from "react-icons/md";
import { FaDribbble, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";

interface NavbarSidebarLayoutProps {
  isFooter?: boolean;
  isSidebar?: boolean;
  isNavbar?: boolean;
  isAppbar?: boolean;
  isRightSidebar?: boolean;
}

const NavbarSidebarLayout: FC<PropsWithChildren<NavbarSidebarLayoutProps>> =
  function ({
    children,
    isFooter = true,
    isSidebar = false,
    isNavbar = true,
    isAppbar = false,
    isRightSidebar = false,
  }) {
    return (
      <>
          {isNavbar == true ? <Navbar isNavbar={isNavbar} isAppbar={isAppbar} /> :  null}
          <div className="flex">
              {isSidebar == true ?   <Sidebar    /> : null}
              <MainContent isFooter={isFooter}  >  {children} </MainContent>
              {isRightSidebar && <RightSidebar isRightSidebar={isRightSidebar} />}
          </div>
      </>
    );
  };

const MainContent: FC<PropsWithChildren<NavbarSidebarLayoutProps>> = function ({children, isFooter,}) {
  return (
        <main  className="relative h-full w-full overflow-y-auto bg-Cultured dark:bg-gray-900 px-4 pt-6 "  >
          {children}
        </main>
  );
};

export default NavbarSidebarLayout;