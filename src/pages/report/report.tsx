
import type { FC } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { getReportDatalist, ResetReportDatalist } from "../../Store/actions";
import ExampleBreadcrumb from "../../components/breadcrumb";
import moment from "moment";
import { Button, Checkbox, Table } from "flowbite-react";
import ExportDataModal from "../../components/exportdata/exportCSV";
import ExamplePagination from "../../components/pagination";
import LoaderPage from "../../components/loader";

enum ReportType {
  Advisor = "advisor",
  Farmer = "farmer",
  Lead = "lead",
  Order = "order"
}

const statusOptions = [
  { label: "Advisor", value: ReportType.Advisor },
  { label: "Farmer", value: ReportType.Farmer },
  // { label: "Lead", value: ReportType.Lead },
  { label: "Order", value: ReportType.Order }
];

const ReportPage: FC = () => {
  const dispatch = useDispatch();

  const [exportData, setExportData] = useState<any[]>([]);
  const [showReportData, setShowReportData] = useState(false);
  const [selectedStatusOption, setSelectedStatusOption] = useState<any>(null);
  const [selectedStatusId, setSelectedStatusId] = useState<string>("");
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDateData, setStartDateData] = useState<string | null>(null);
  const [endDateData, setEndDateData] = useState<string | null>(null);
  const [totalListData, setTotalListData] = useState(0);
  const [currentPageNo, setCurrentPageNo] = useState(0);
  const [pageNo, setPageNo] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(5);
  const [loader, setLoader] = useState(false);

  const  GetReportDatalist  = useSelector((state: any) => state.AdminDashboard.GetReportDatalist,);

  // Memoize data for current report type
  const reportData = useMemo(() => {
    if (!GetReportDatalist?.data) return [];
    switch (selectedStatusId) {
      case ReportType.Advisor:
        return GetReportDatalist.data;
      case ReportType.Farmer:
        return GetReportDatalist.data;
      case ReportType.Lead:
        return GetReportDatalist.data;
      case ReportType.Order:
        return GetReportDatalist.data;
      default:
        return [];
    }
  }, [GetReportDatalist, selectedStatusId]);

  useEffect(() => {
    setLoader(false);
    setTotalListData(GetReportDatalist?.totalData || 0);
    setCurrentPageNo(GetReportDatalist?.page || 0);
    setRowPerPage(GetReportDatalist?.size || 5);
    setExportData(GetReportDatalist?.data || []);
    setShowReportData(!!selectedStatusId && !!GetReportDatalist?.data);
  }, [GetReportDatalist, selectedStatusId]);


  // Status option change handler
  const handleStatusChange = useCallback((data: any) => {
    if (!data || data === null) {
      setSelectedStatusId("");
      setSelectedStatusOption(null);
      setShowReportData(false);
      setStartDateData("");
      setEndDateData("");
      setTotalListData(0);
      setDateRange([null, null]);
      dispatch(ResetReportDatalist())
    } else {
      dispatch(ResetReportDatalist())
      setSelectedStatusId(data.value);
      setSelectedStatusOption(data);
      setShowReportData(false);
    }
  }, []);


  const [startDate, endDate] = dateRange;

  // Update formatted date state whenever the date range changes
  useEffect(() => {
    setShowReportData(false);
    setStartDateData(startDate ? moment(startDate).format("YYYY-MM-DD") : null);
    setEndDateData(endDate ? moment(endDate).format("YYYY-MM-DD") : null);
  }, [startDate, endDate]);

  // Handle date selection
  const handleDateChange = useCallback((update: [Date | null, Date | null]) => {
    setDateRange(update);
  }, []);


  const getDataCall = useCallback(() => {
    if(startDateData &&  endDateData){
         const reqUserData = {
          ...(startDateData && { startDate: startDateData }),
          ...(endDateData && { endDate: endDateData }),
          type: selectedStatusId,
          page: pageNo,
          size: rowPerPage
      };
      dispatch(getReportDatalist(reqUserData));
      setLoader(true);
    }
  }, [startDateData, endDateData, selectedStatusId, pageNo, rowPerPage, dispatch]);

  // Pagination handlers
  const handleRowsPerPage = useCallback((event: any) => {
    const value = Number(event);
    setRowPerPage(value);
    setPageNo(1); // Reset to first page when changing rows per page
  }, []);

  const handlePageChange = useCallback((data: any) => {
    setPageNo(data);
  }, []);

  // Call API when pageNo or rowPerPage changes
  useEffect(() => {
    if (selectedStatusId) {
      getDataCall();
    }
  }, [pageNo, rowPerPage, getDataCall, selectedStatusId]);


  // let Name = "Report Page";
  const pageTitle = "Report Page";

  // Table renderers for each report type
  const renderTable = () => {
    if (!showReportData || !selectedStatusId) return null;
    switch (selectedStatusId) {
      case ReportType.Advisor:
        return (
          <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
            <Table.Head className="bg-gray-100 dark:bg-gray-700">
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Gender</Table.HeadCell>
              <Table.HeadCell>Mobile No</Table.HeadCell>
              <Table.HeadCell>Role</Table.HeadCell>
              <Table.HeadCell>Date of Joining</Table.HeadCell>
              <Table.HeadCell>Date of Birth</Table.HeadCell>
              <Table.HeadCell>Address</Table.HeadCell>
              <Table.HeadCell>Emergency Contact Person</Table.HeadCell>
              <Table.HeadCell>Emergency Mobile No</Table.HeadCell>
              <Table.HeadCell>Aadhar Card</Table.HeadCell>
              <Table.HeadCell>Pan Card</Table.HeadCell>
              <Table.HeadCell>Bank Passbook</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Created Date</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
              {reportData.map((item: any, k: number) => (
                <Table.Row key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{item?.name}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{item?.email}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{item?.gender}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{item?.mobile_no}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{item?.role?.role_title}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{item?.date_of_joining}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{item?.date_of_birth}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{item?.address}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{item?.emergency_contact_person}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{item?.emergency_mobile_no}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{item?.aadhar_card ? "Yes" : "No"}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{item?.pan_card ? "Yes" : "No"}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{item?.bank_passbook ? "Yes" : "No"}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
                    {item.is_active ? (
                      <div className="flex items-center"><div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400"></div>Active</div>
                    ) : (
                      <div className="flex items-center"><div className="mr-2 h-2.5 w-2.5 rounded-full bg-red-500"></div>Deactive</div>
                    )}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{moment(item.added_at).format("DD-MM-YYYY hh:mm:ss")}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        );
      case ReportType.Farmer:
        return (
          <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
            <Table.Head className="bg-gray-100 dark:bg-gray-700">
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Mobile</Table.HeadCell>
              <Table.HeadCell>Alternate Mobile</Table.HeadCell>
              <Table.HeadCell>Land Area</Table.HeadCell>
              <Table.HeadCell>Land Type</Table.HeadCell>
              <Table.HeadCell>Irrigation Source</Table.HeadCell>
              <Table.HeadCell>Irrigation Type</Table.HeadCell>
              <Table.HeadCell>Heard About Agribharat</Table.HeadCell>
              <Table.HeadCell>Address</Table.HeadCell>
              <Table.HeadCell>District</Table.HeadCell>
              <Table.HeadCell>Taluka</Table.HeadCell>
              <Table.HeadCell>Village</Table.HeadCell>
              <Table.HeadCell>Pincode</Table.HeadCell>
              <Table.HeadCell>Post Office</Table.HeadCell>
              <Table.HeadCell>Reference</Table.HeadCell>
              <Table.HeadCell>Created At</Table.HeadCell>
              <Table.HeadCell>Created By</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
              {reportData.map((item: any, k: number) => (
                <Table.Row key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{item?.firstname} {item?.middlename} {item?.lastname}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{item?.mobile_number}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{item?.alternate_number || "-"}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{item?.land_area}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{item?.land_type}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{item?.irrigation_source}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{item?.irrigation_type}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{item?.heard_about_agribharat}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{item?.address}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{item?.district?.name}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{item?.taluka?.name}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{item?.village?.name}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{item?.pincode}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{item?.post_office}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{item?.ref_name || "-"}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{moment(item.added_at).format("DD-MM-YYYY hh:mm:ss")}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{item?.created_by?.name}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        );
      case ReportType.Lead:
        return (
          <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
            <Table.Head className="bg-gray-100 dark:bg-gray-700">
              <Table.HeadCell><Checkbox id="select-all" name="select-all" /></Table.HeadCell>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Company</Table.HeadCell>
              <Table.HeadCell>Qty</Table.HeadCell>
              <Table.HeadCell>CGST</Table.HeadCell>
              <Table.HeadCell>SGST</Table.HeadCell>
              <Table.HeadCell>Price</Table.HeadCell>
              <Table.HeadCell>Discount</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Created At</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
              {reportData.map((item: any, k: number) => (
                <Table.Row key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Table.Cell className="w-4 py-0"><Checkbox /></Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{item.name}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{item?.company?.name}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{item.avl_qty}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{item.c_gst}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{item.s_gst}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{item.price}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{item.discount}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{item.categories?.name}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{moment(item.added_at).format("DD-MM-YYYY hh:mm:ss")}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        );
      case ReportType.Order:
        return (
          <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
            <Table.Head className="bg-gray-100 dark:bg-gray-700">
              <Table.HeadCell>Order ID</Table.HeadCell>
              <Table.HeadCell>Farmer Name</Table.HeadCell>
              <Table.HeadCell>Address</Table.HeadCell>
              <Table.HeadCell>District</Table.HeadCell>
              <Table.HeadCell>Taluka</Table.HeadCell>
              <Table.HeadCell>Village</Table.HeadCell>
              <Table.HeadCell>Post Office</Table.HeadCell>
              <Table.HeadCell>Pincode</Table.HeadCell>
              <Table.HeadCell>Mobile</Table.HeadCell>
              <Table.HeadCell>Alternate Mobile</Table.HeadCell>
              <Table.HeadCell>Products / Packing / Quantity</Table.HeadCell>
              <Table.HeadCell>Coupon Code</Table.HeadCell>
              <Table.HeadCell>Discount Amount</Table.HeadCell>
              <Table.HeadCell>Final Amount</Table.HeadCell>
              <Table.HeadCell>Advisor Name</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Order Date</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
              {reportData.map((item: any, k: number) => (
                <Table.Row key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{item?.order_id}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{item?.customer?.firstname} {item?.customer?.middlename} {item?.customer?.lastname}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{item?.customer?.address}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{item?.customer?.district?.name}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{item?.customer?.taluka?.name}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{item?.customer?.village?.name}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{item?.customer?.post_office}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{item?.customer?.pincode}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{item?.customer?.mobile_number}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{item?.customer?.alternate_number || "-"}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">
                    {item?.products?.length
                      ? item.products
                          .map((p: any) => {
                            const name = p?.id?.name?.englishname || '';
                            const pack = p?.id?.packaging || '';
                            const packType = p?.id?.packagingtype?.type_eng || '';
                            return `${name} (${pack} ${packType})`;
                          })
                          .join(', ')
                      : "-"}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">{item?.coupon?.name || "-"}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">{item?.coupon?.amount || "-"}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">{item?.total_amount}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">{item?.advisor_name?.name}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">{item?.status ? item?.status.charAt(0).toUpperCase() + item?.status.slice(1).toLowerCase() : "-"}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{moment(item.added_at).format("DD-MM-YYYY")}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        );
      default:
        return null;
    }
  };

  return (
    <NavbarSidebarLayout isFooter={false} isSidebar isNavbar isRightSidebar>
       {loader ? <LoaderPage /> :
          <div className="min-h-screen">
            <ExampleBreadcrumb Name={pageTitle} />
            <div className="bg-white dark:bg-gray-800 p-4 flex gap-x-4 flex-wrap">
              <div>
                <Select
                  className="w-[15rem] dark:text-white"
                  classNames={{
                    control: () => "react-select__control",
                    singleValue: () => "react-select__single-value",
                    menu: () => "react-select__menu",
                    option: ({ isSelected }) =>
                      isSelected
                        ? "react-select__option--is-selected"
                        : "react-select__option",
                    placeholder: () => "react-select__placeholder",
                  }}
                  value={selectedStatusOption}
                  onChange={handleStatusChange}
                  options={statusOptions}
                  isClearable
                />
              </div>
              <div className="relative">
                <DatePicker
                  selectsRange
                  startDate={startDate}
                  endDate={endDate}
                  onChange={handleDateChange}
                  isClearable
                  maxDate={new Date()}
                  popperPlacement="bottom-start"
                  popperModifiers={[
                    {
                      name: 'preventOverflow',
                      options: {
                        boundary: 'viewport',
                      },
                    },
                  ] as any}
                  className="w-full pl-10 py-2 px-5 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-300 text-gray-700 dark:bg-gray-800 dark:text-gray-200"
                  placeholderText="Select Date Range"
                />
                <IoCalendarNumberSharp className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
              {selectedStatusId && (
                <Button gradientDuoTone="purpleToPink" onClick={getDataCall}>
                  <div className="flex items-center gap-x-3 w-[5rem] text-center">
                    <FaSearch /> Submit
                  </div>
                </Button>
              )}
              {selectedStatusId && showReportData && (
                <div className="flex-1 justify-items-end self-center">
                  <Suspense fallback={<div>Loading...</div>}>
                    <ExportDataModal data={exportData} startDate={startDateData} endDate={endDateData} name={selectedStatusId} />
                  </Suspense>
                </div>
              )}
            </div>
            <div className="mt-8 bg-white dark:bg-gray-800 p-4">
              {renderTable()}
            </div>
            {Array.isArray(reportData) && reportData.length > 0 && (
              <ExamplePagination
                PageData={handlePageChange}
                RowPerPage={handleRowsPerPage}
                RowsPerPageValue={rowPerPage}
                PageNo={pageNo}
                CurrentPageNo={currentPageNo}
                TotalListData={totalListData}
              />
            )}
          </div>
        }
    </NavbarSidebarLayout>
  );
};

export default ReportPage;