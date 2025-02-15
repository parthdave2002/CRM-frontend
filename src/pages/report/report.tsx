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


  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const handleApply = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setStartDate(null);
    setEndDate(null);
    setIsOpen(false);
  };




  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");
  // const [isOpen, setIsOpen] = useState(false)

  let Name = "Report Page";

  return (
    <>
      <NavbarSidebarLayout  isFooter={false} isSidebar={true} isNavbar={true} isRightSidebar={true} >
        <ExampleBreadcrumb  Name={Name} />
           <div className="bg-white dark:bg-gray-800 p-4">
                  Hello Report page
            </div>

            <div className="mt-[2rem] bg-white dark:bg-gray-800 p-4">
            Hello Report page
            </div>
      </NavbarSidebarLayout>

    </>
  );
};

export default ReportPage;