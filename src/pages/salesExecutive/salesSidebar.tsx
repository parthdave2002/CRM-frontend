import { FC, useState } from "react";
import { MdGridView, MdEventNote  } from "react-icons/md";
import { FaLayerGroup, FaUser  } from "react-icons/fa";

const SalesSidebarPage : FC = function () {

    const [active, setActive] = useState("Dashboard");

    const menuItems = [
      { name: "Dashboard", icon: <MdGridView size={20} className="text-blue-600" /> },
      { name: "Farmer", icon: <FaLayerGroup size={20} className="text-gray-500" /> },
      { name: "Products", icon: <MdEventNote  size={20} className="text-gray-500" /> },
      { name: "Order", icon: <FaUser  size={20} className="text-gray-500" /> },
      { name: "Complain", icon: <FaUser  size={20} className="text-gray-500" /> },
    ];

    return (
        <>  
                <div className="w-[15rem] h-screen bg-white shadow-md p-4 flex flex-col border-r  rounded-xl">
                    <ul>
                        {menuItems.map((item) => (
                        <li
                            key={item.name}
                            className={`relative flex items-center gap-3 p-3 pr-6 rounded-lg cursor-pointer transition-all font-medium text-sm ${
                            active === item.name ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"
                            }`}
                            onClick={() => setActive(item.name)}
                        >
                            {item.icon}
                            <span>{item.name}</span>
                            {active === item.name && <div className="absolute right-0 top-2 bottom-2 w-1 bg-blue-400 rounded-md" />}
                        </li>
                        ))}
                    </ul>
                </div>
        </>
    );
}

export default SalesSidebarPage;