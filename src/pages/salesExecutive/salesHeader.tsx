import { FC, useEffect, useRef, useState } from "react";
import userphoto from "../../img/profile-picture-3.jpg";
import { MdGridView} from "react-icons/md";
import {  FaAngleDown } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { DarkThemeToggle } from "flowbite-react";

const SalesHeaderPage : FC = function () {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

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
            <>  
                <div className="relative flex justify-end">
                    <button onClick={() => setIsOpen(!isOpen)} className="flex items-center text-sm px-3 py-0.5 font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:me-0 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-gray-700 dark:text-white bg-white dark:bg-gray-500 dark:hover:text-gray-400" type="button" >
                        <img  className="w-8 h-8 me-2 rounded-full" src={userphoto} alt="user photo" />
                        Parth Dave <FaAngleDown  className="w-4 h-4 ms-3" />
                    </button>

                    {isOpen && (
                        
                        <div ref={dropdownRef} className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600 right-0 mt-[2.5rem]">
                    
                        <ul className=" text-sm text-gray-700 dark:text-gray-200">
                            <div> <div className="cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex gap-x-2"> <MdGridView size={20} className="text-gray-600 dark:text-gray-400"/>  <div className="self-center">Dashboard </div> </div> </div>
                            <div onClick={handleClick} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex gap-x-2 cursor-pointer" >
                                <DarkThemeToggle className="hover:bg-gray-100 dark:hover:bg-gray-700 " style={{"padding":"0"}} />
                                <div className="self-center">Dark mode</div>
                            </div>
                        </ul>
                        <div className="">
                            <div className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white flex gap-x-2" >  <FiLogOut  size={20} className="text-gray-600 dark:text-gray-400"/>  <div className="self-center"> Sign out </div> </div>
                        </div>
                        </div>
                    )}
                </div>
            </>
    );
}

export default SalesHeaderPage;