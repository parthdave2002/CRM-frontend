import type { FC, PropsWithChildren } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { DarkThemeToggle, Navbar } from "flowbite-react";
import { Menu, Transition } from "@headlessui/react";
import Appbar from "../components/appbar";
import TabNavbar from "../components/tabnavbar";
import Notification from "../components/notification";
import logo from "../img/logo.png";
import { Modal } from "flowbite-react";
import userphoto from "../img/profile-picture-3.jpg";
import { Button } from "reactstrap";
import Header from "../components/header";

interface NavbarSidebarLayoutProps {
  isNavbar?: boolean;
  isAppbar?: boolean;
}

const ExampleNavbar: FC<PropsWithChildren<NavbarSidebarLayoutProps>> =
  function ({ isNavbar, isAppbar }) {
    const navigation = useNavigate();
    const [isOpen, setOpen] = useState(false);

    const Logoutfun = () => {
      localStorage.clear();
      navigation("/login");
    };

    return (
      <Navbar fluid>

        {/*Sub Header  */}
        {/* {isOpenHeaderOption == true ? (
          <Header isOpenHeader={headerData} />
        ) : null} */}


        <div className="w-full ">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/dashboard">
                <Navbar.Brand>
                  <img alt="" src={logo} className="mr-3 h-6 sm:h-10 ml-16" />
                </Navbar.Brand>
              </Link>
            </div>

            <form
              action="#"
              method="GET"
              className="hidden md:block md:pl-2 flex-auto ml-12"
            >
              <label className="sr-only">Search</label>
              <div className="relative md:w-64 md:w-96">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  // name="search"
                  id="topbar-search "
                  className=" border border-gray-300  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Search "
                  onClick={() => {
                    setOpen(true);
                  }}
                />
              </div>
            </form>

            {/* <div className="mr-14">
              <TabNavbar />
            </div> */}
            <div className="flex items-center gap-3">
              <Notification />

              {isAppbar == true ? <Appbar isAppbar={isAppbar} /> : null}

        
              <Menu as="div" className="relative">
                <div>
                  <Menu.Button className="flex rounded-full  text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <button
                      id="dropdownUserAvatarButton"
                      data-dropdown-toggle="dropdownAvatar"
                      className="flex text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                      type="button"
                    >
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="w-8 h-8 rounded-full"
                        src={userphoto}
                        alt="user photo"
                      />
                    </button>
                  </Menu.Button>
                </div>
                {/* <Transition
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                > */}
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none  dark:bg-black">
                    {/* <Menu.Item>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200  dark:hover:text-white"
                      >
                        Dashboard
                      </Link>
                    </Menu.Item>

                    
                    <Menu.Item>
                      <Link
                        to="/modules"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200  dark:hover:text-white"
                      >
                        Module Group
                      </Link>
                    </Menu.Item>

                    <Menu.Item>
                      <Link
                        to="/campaign"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200  dark:hover:text-white"
                      >
                        Campaign
                      </Link>
                    </Menu.Item> */}
                    <Menu.Item>
                      <Button
                        onClick={() => {
                          Logoutfun();
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  min-w-full text-start dark:hover:bg-gray-600 dark:text-gray-200  dark:hover:text-white"
                      >
                        Sign out
                      </Button>
                    </Menu.Item>
                  </Menu.Items>
                {/* </Transition> */}
              </Menu>

              <DarkThemeToggle />
            </div>
          </div>
        </div>

        <Modal
          className="min-h-full max-h-40 backdrop-blur-sm  bg-black text-blue-500  "
          onClose={() => setOpen(false)}
          show={isOpen}
        >
          <form>
            <div className="relative shadow-2xl">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Mockups, Logos..."
                required
              />

              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                }}
                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      </Navbar>
    );
  };

export default ExampleNavbar;
