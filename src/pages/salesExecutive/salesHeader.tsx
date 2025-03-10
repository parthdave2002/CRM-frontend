import { FC, useEffect, useRef, useState } from "react";
import userphoto from "../../img/profile-picture-3.jpg";
import {  FaAccessibleIcon, FaAngleDown, FaCapsules } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdGridView, MdEventNote  } from "react-icons/md";
import { FaLayerGroup, FaUser, FaOpencart   } from "react-icons/fa";
import { DarkThemeToggle } from "flowbite-react";
import { BiShocked, BiWalk } from "react-icons/bi";

const SalesHeaderPage : FC = function () {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);


    const [active, setActive] = useState("Dashboard");

    const menuItems = [
      { name: "Dashboard", icon: <MdGridView size={20}  /> },
      { name: "Farmer", icon: <FaAccessibleIcon   size={20}  /> },
      { name: "Products", icon: <FaCapsules   size={20}  /> },
      { name: "Order", icon: <FaOpencart   size={20}  /> },
      { name: "Complain", icon: <BiShocked   size={20}  /> },
    ];

    useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
            // If the click is outside the dropdown menu, close it
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
            };

            document.addEventListener("mousedown", handleClickOutside);
            return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            };
    }, []);

    const handleClick = () => {
            const darkModeButton = document.querySelector('[data-testid="dark-theme-toggle"]') as HTMLButtonElement;
            if (darkModeButton) {
            darkModeButton.click(); 
            }
    };

    return (
      <div className="flex justify-end gap-x-[8rem]">
        <div className=" flex  gap-x-4  justify-center"  >
            {menuItems.map((item) => (
              <li  key={item.name}
                className={`relative flex items-center gap-3 py-2 px-4 rounded-lg cursor-pointer transition-all font-medium text-sm ${ active === item.name  ? "bg-blue-100 text-blue-600"   : "text-gray-600 dark:text-gray-100 dark:hover:text-blue-600 hover:bg-blue-100"  }`}
                onClick={() => setActive(item.name)}
              >
                {item.icon}
                <span className="text-[1rem]">{item.name}</span>
              </li>
            ))}
        </div>

        <div className="relative flex ">
          <button onClick={() => setIsOpen(!isOpen)}  className="flex items-center text-sm px-3 py-0.5 font-medium text-gray-900 rounded-full hover:text-blue-600 md:me-0 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-gray-700 dark:text-white bg-white dark:bg-gray-500 dark:hover:text-gray-100"   type="button"  >
            <img  className="w-8 h-8 me-2 rounded-full"   src={userphoto}   alt="user photo"   />
            <span>Parth Dave  </span>
             <FaAngleDown className="w-4 h-4 ms-3" />
          </button>

            {isOpen && (
                <div   ref={dropdownRef}   className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600 right-0 mt-[2.5rem]" >

                    <div  onClick={handleClick}  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex gap-x-2 cursor-pointer  text-sm text-gray-700 dark:text-gray-200"  >
                    <DarkThemeToggle  className="hover:bg-gray-100 dark:hover:bg-gray-700 "    style={{ padding: "0" }}  />
                    <div className="self-center">Dark mode</div>
                    </div>

                    <div className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white flex gap-x-2">
                        <FiLogOut   size={20}   className="text-gray-600 dark:text-gray-400"   />
                    <div className="self-center"> Sign out </div>
                    </div>
                </div>
            )}
        </div>
      </div>
    );
}

export default SalesHeaderPage;