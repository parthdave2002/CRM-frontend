import type { FC } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { getReportDatalist } from "../../Store/actions";
import ExampleBreadcrumb from "../../components/breadcrumb";
import moment from "moment";
import { Button } from "flowbite-react";

const ReportPage: FC = function () {
  const dispatch = useDispatch();

  const { GetReportDatalist } = useSelector((state: any) => ({
    GetReportDatalist: state.AdminDashboard.GetReportDatalist,
  }));
  console.log("GetReportDatalist", GetReportDatalist);
  

  //---------------- Satus option code start ----------------
    const [selectedStatusOption, setSelectedStatusOption] = useState(null);
    const [selectedStatusid, setSelectedStatusid] = useState<boolean | null>(null);
    const IsActivedata = (data: any) => {
      if (!data) {
          setSelectedStatusid(null);
          setSelectedStatusOption(null);
      } else {
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

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;

  const [startDateData, setStartDateData] = useState<string | null>(null);
  const [endDateData, setEndDateData] = useState<string | null>(null);

  // Update formatted date state whenever the date range changes
  useEffect(() => {
    setStartDateData(startDate ? moment(startDate).format("DD-MM-YY") : null);
    setEndDateData(endDate ? moment(endDate).format("DD-MM-YY") : null);
  }, [startDate, endDate]);

  // Handle date selection
  const handleDateChange = useCallback((update: [Date | null, Date | null]) => {
    setDateRange(update);
  }, []);

  const GetdataCall = () =>{
    let requserData= {
      startDate: startDateData,
      endDate: endDateData,
      type : selectedStatusid
    }
    console.log("requserData", requserData);
    dispatch(getReportDatalist(requserData))
  }

  let Name = "Report Page";

  return (
    <>
      <NavbarSidebarLayout  isFooter={false} isSidebar={true} isNavbar={true} isRightSidebar={true} >
        <ExampleBreadcrumb  Name={Name} />
          <div className="bg-white dark:bg-gray-800 p-4 flex gap-x-4">
            
            <div className="relative">
              <DatePicker
                selectsRange
                startDate={startDate}
                endDate={endDate}
                onChange={handleDateChange}
                isClearable
                maxDate={new Date()}
                popperPlacement="bottom"
                className="w-full pl-10 py-2 px-5 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 text-gray-700 dark:bg-gray-800 dark:text-gray-200"
                placeholderText="Select Date Range"
              />
                <IoCalendarNumberSharp className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>

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

            {selectedStatusid != null && startDateData != null && endDate != null ?
              <Button gradientDuoTone="purpleToPink" onClick={() => GetdataCall()}> <div className="flex items-center gap-x-3 w-[5rem] text-center"> <FaSearch /> Submit </div> </Button>
              : null
            }
          </div>

          <div className="mt-[2rem] bg-white dark:bg-gray-800 p-4">
            Hello Report page
          </div>
      </NavbarSidebarLayout>

    </>
  );
};

export default ReportPage;