import { Sidebar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiShoppingBag, HiCube, HiPuzzle, HiUsers, HiChartPie, HiLibrary } from "react-icons/hi";
import { MdLeaderboard } from "react-icons/md"; 
import { TbReportSearch } from "react-icons/tb";
import { FaUser, FaTags  } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";
import { BsBuildingsFill, BsCloudArrowUpFill  } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
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
      name: "Customer List",
      icon: FaUser,
      to: "/customer/list",
    },
    {
      name: "Product List",
      icon: HiLibrary,
      to: "/product/list",
    },
    {
      name: "Order List",
      icon: FaSackDollar,
      to: "/order/list",
    },
    {
      name: "Lead List",
      icon: TbReportSearch,
      to: "/lead/list",
    },
    {
      name: "Report",
      icon: MdLeaderboard,
      to: "/report",
    },
  ];

  const SubMasterMenu = [
    {
      name: "Packing Type",
      icon:   HiCube,
      to: "/packing-type/list",
    },
    // {
    //   name: "Packing",
    //   icon:  LuPackageOpen,
    //   to: "/packing/list",
    // },
    // {
    //   name: "Company",
    //   icon:  BsBuildingsFill,
    //   to: "/company/list",
    // },
    {
      name: "Category List",
      icon:  BiCategoryAlt,
      to: "/category/list",
    },
    {
      name: "Banner List",
      icon:  BsCloudArrowUpFill ,
      to: "/banner/list",
    },
    {
      name: "Taglog List",
      icon:  FaTags,
      to: "/taglog/list",
    },
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
              {SubMasterMenu.map((item, k) => (
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
