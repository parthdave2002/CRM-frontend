import type { FC } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { Button, Checkbox, Label, Table,} from "flowbite-react";
import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import Select from "react-select";
import {  HiOutlinePencilAlt, HiTrash, HiKey,} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
// import { ,} from "../../Store/actions";
import ExampleBreadcrumb from "../../components/breadcrumb";

const ReportPage: FC = function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const handleApply = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setStartDate("");
    setEndDate("");
    setIsOpen(false);
  };

    //---------------- Satus option code start ----------------
    const [selectedStatusOption, setSelectedStatusOption] = useState(null);
    const [selectedStatusid, setSelectedStatusid] = useState<boolean | null>(null);
    const [validateStatusid, setvalidateStatusid] = useState(0);


    const IsActivedata = (data: any) => {
    if (!data) {
        setvalidateStatusid(1);
        setSelectedStatusid(null);
        setSelectedStatusOption(null);
    } else {
        setvalidateStatusid(0);
        setSelectedStatusid(data.value);
        setSelectedStatusOption(data);
    }
    };

    const isactiveoption = [
      { label : "User", value:"user" },
      { label : "Customer", value:"customer" },
      { label : "Product", value:"product" },
      { label : "Order", value:"order" }

    ]
//---------------- Satus option code end ----------------


  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");
  // const [isOpen, setIsOpen] = useState(false)

  let Name = "Report Page";

  return (
    <>
      <NavbarSidebarLayout  isFooter={false} isSidebar={true} isNavbar={true} isRightSidebar={true} >
        <ExampleBreadcrumb  Name={Name} />
           <div className="bg-white dark:bg-gray-800 p-4">

                <Select
                  className="w-[15rem] dark:text-white"
                                        classNames={{
                                            control: () => "react-select__control",
                                            singleValue: () => "react-select__single-value",
                                            menu: () => "react-select__menu",
                                            option: ({ isSelected }) =>
                                                isSelected ? "react-select__option--is-selected" : "react-select__option",
                                            placeholder: () => "react-select__placeholder",
                                        }}
                                        value={selectedStatusOption}
                                        onChange={(e) => { IsActivedata(e) }}
                                        options={isactiveoption}
                  isClearable={true}
                  />
            </div>

            <div className="mt-[2rem] bg-white dark:bg-gray-800 p-4">
            Hello Report page
            </div>
      </NavbarSidebarLayout>

    </>
  );
};

export default ReportPage;