import type { FC, PropsWithChildren } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { DarkThemeToggle, Navbar } from "flowbite-react";
import { Menu, Transition } from "@headlessui/react";
import Appbar from "../components/appbar";
import TabNavbar from "../components/tabnavbar";
import Notification from "../components/notification";
import logo from "../img/logo.webp";
import { Modal } from "flowbite-react";
import userphoto from "../img/profile-picture-3.jpg";
import { Button } from "reactstrap";
import { IoIosSearch } from "react-icons/io";

interface NavbarSidebarLayoutProps {
  isNavbar?: boolean;
  isAppbar?: boolean;
}

const ExampleNavbar: FC<PropsWithChildren<NavbarSidebarLayoutProps>> =
  function () {
    const navigate = useNavigate();
    const [isOpen, setOpen] = useState(false);

    const Logoutfun = () => {
      localStorage.clear();
      navigate("/login");
    };

    const Prodilefun = () => {
      navigate("/profile")
    }

    return (
      <Navbar fluid className="px-4">
        <div className="w-full ">
          <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Link to="/dashboard">
                  <Navbar.Brand>
                    <img alt="" src={logo} className="mr-3 h-6 sm:h-10 ml-16" />
                  </Navbar.Brand>
                </Link>
              </div>

              <div className="relative md:w-64  hidden md:block md:pl-2 flex-auto ml-12">
                <div className="flex absolute inset-y-0 left-0 items-center pl-[1.2rem] pointer-events-none">
                  <IoIosSearch  className="w-5 h-5 text-gray-500 dark:text-gray-400 "   />
                </div>
                <input
                  type="text"
                  // name="search"
                  id="topbar-search "
                  className=" border border-gray-300  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-80 pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Search "
                  onClick={() => {  setOpen(true);  }}
                />
              </div>
          
              <div className="flex items-center gap-[1rem]">
                {/* <Notification /> */}
                {/* {isAppbar == true ? <Appbar isAppbar={isAppbar} /> : null} */}

                <DarkThemeToggle />
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
                        <img  className="w-8 h-8 rounded-full"  src={userphoto}  alt="user photo"  />
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
                      <Menu.Item>
                        <Button onClick={() => { Prodilefun()}} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  min-w-full text-start dark:hover:bg-gray-600 dark:text-gray-200  dark:hover:text-white" > Profile </Button>
                      </Menu.Item>
                      
                      <Menu.Item>
                        <Button onClick={() => { Logoutfun()}} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  min-w-full text-start dark:hover:bg-gray-600 dark:text-gray-200  dark:hover:text-white" > Sign out </Button>
                      </Menu.Item>
                    </Menu.Items>
                  {/* </Transition> */}
                </Menu>
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
                <IoIosSearch  className="w-5 h-5 text-gray-500 dark:text-gray-400 "   />
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
