import { Sidebar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiShoppingBag, HiCube, HiPuzzle, HiUsers, HiChartPie, HiLibrary } from "react-icons/hi";
import type { FC, PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";

interface NavbarSidebarLayoutProps {
  isSidebar?: boolean;
  isNavbar?: boolean;
}

const LeftSidebar: FC<PropsWithChildren<NavbarSidebarLayoutProps>> = function () {
  const [currentPage, setCurrentPage] = useState("");
  useEffect(() => {
    const newPage = window.location.pathname;
    setCurrentPage(newPage);
  }, []);

  // Updated to use actual icon components
  const ViewDraftOrder = [
    {
      name: "Dashboard",
      icon: HiChartPie, // Reference the actual icon component
      to: "/dashboard",
    },
    {
      name: "Users List",
      icon: HiUsers,
      to: "/users/list",
    },
    {
      name: "Roles List",
      icon: HiPuzzle,
      to: "/roles/list",
    },
    {
      name: "Modules Group",
      icon: HiLibrary,
      to: "/module-group",
    },
  ];

  const MaterMenu = [
    {
      name: "Packing Type",
      icon:   HiCube,
      to: "/packing-type/list",
    }
  ]

  return (
    <div className="hidden lg:block">
      <Sidebar>
        <Sidebar.Items className="pb-[6rem]">
          <Sidebar.ItemGroup>
            {ViewDraftOrder.map((item, k) => (
              <NavLink to={item.to} key={k}>
                <Sidebar.Item icon={item.icon}  className={item.to === currentPage ? "dark:bg-gray-700" : ""} >  {item.name} </Sidebar.Item>
              </NavLink>
            ))}
          </Sidebar.ItemGroup>

          <Sidebar.ItemGroup>
            {/* <h4 className={"dark:text-white"}> Master:</h4> */}
            <Sidebar.Collapse icon={HiShoppingBag} label="Master">
              {MaterMenu.map((item, k) => (
                <NavLink to={item.to} key={k}>
                  <Sidebar.Item icon={item.icon}  className={item.to === currentPage ? "dark:bg-gray-700" : ""} >  {item.name} </Sidebar.Item>
                </NavLink>
              ))}
            </Sidebar.Collapse>
          </Sidebar.ItemGroup>
       

          {/* <Sidebar.ItemGroup>
            <h4 className={"dark:text-white"}>Design View only:</h4>
            <NavLink to="/e-commerce/products">
              <Sidebar.Item
                icon={HiShoppingBag}
                className={
                  "/e-commerce/products" === currentPage ? "dark:bg-gray-700" : ""
                }
              >
                Products
              </Sidebar.Item>
            </NavLink>
          </Sidebar.ItemGroup> */}
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default LeftSidebar;
