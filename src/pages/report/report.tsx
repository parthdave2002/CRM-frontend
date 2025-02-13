import type { FC } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { Button, Checkbox, Label, Table,} from "flowbite-react";
import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import {  HiOutlinePencilAlt, HiTrash, HiKey,} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { getModuleGrouplist,  getSingleModuleGroup, AddModuleGrouplist, DeleteModuleGrouplist,} from "../../Store/actions";
import ExampleBreadcrumb from "../../components/breadcrumb";

const ReportPage: FC = function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isOpen, setIsOpen] = useState(false)

  let Name = "Report Page";

  return (
    <>
      <NavbarSidebarLayout  isFooter={false} isSidebar={true} isNavbar={true} isRightSidebar={true} >
        <ExampleBreadcrumb  Name={Name} />
        <div className="relative w-72">
      {/* Display Field (Button) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-4 py-2 border rounded-lg bg-white shadow-md focus:ring-2 focus:ring-blue-500"
      >
        {startDate && endDate ? (
          <span className="text-gray-700">
            {startDate} - {endDate}
          </span>
        ) : (
          <span className="text-gray-400">Select date range</span>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5 text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 15.75L12 19.5m0 0l3.75-3.75M12 19.5V4.5"
          />
        </svg>
      </button>

      {/* Date Picker Inputs (Dropdown) */}
      {isOpen && (
        <div className="absolute mt-2 z-10 w-full bg-white border shadow-lg rounded-lg p-4 flex flex-col space-y-4">
          {/* Start Date */}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-medium">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* End Date */}
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-medium">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min={startDate} // Prevent selecting a date before startDate
            />
          </div>

          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="w-full mt-2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Done
          </button>
        </div>
      )}
    </div>
      </NavbarSidebarLayout>

    </>
  );
};

export default ReportPage;