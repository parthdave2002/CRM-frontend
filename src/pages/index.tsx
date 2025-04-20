import { Badge, Dropdown, Table, useTheme } from "flowbite-react";
import { useEffect, useState, type FC } from "react";
import { FaUser, FaRupeeSign  } from "react-icons/fa";
import { FaHandHoldingDollar } from "react-icons/fa6";
import Chart from "react-apexcharts";
import NavbarSidebarLayout from "../layouts/navbar-sidebar";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
const IMG_URL = import.meta.env["VITE_API_URL"];
import moment from "moment";
import {getDashboarddatalist } from "../Store/actions";

const DashboardPage: FC = function () {

  const navigate = useNavigate()
 const dispatch = useDispatch()

 interface totalCustomer {
  daily:number;
  monthly:number;
  weekly: number;
 }

  const { DashboardDataList } = useSelector((state: any) => ({
    DashboardDataList: state.AdminDashboard.Dashboardlist
  }))

  const [total_revenueData , set_total_revenueData] = useState<totalCustomer>();
  const [total_userData , set_total_userData] = useState<totalCustomer>();
  const [total_orderData , set_total_orderData] = useState<totalCustomer>();

  const [selectedUserframe, setSelectedUserframe] = useState("");
  const [selectedOrderframe, setSelectedOrderframe] = useState("");
  const [selectedrevenueframe, setSelectedrevenueframe] = useState("");

  const [CustomerData , setCustomerData] = useState([]);
  const [OrderData , setOrderData] = useState([]);
  const [UserData , setUserData] = useState([]);
  const [ProductData, setProductData] =useState([]);
  
  useEffect(() =>{
    setCustomerData(DashboardDataList?.data?.customers);
    setOrderData(DashboardDataList?.data?.orders);
    setUserData(DashboardDataList?.data?.users);
    setProductData(DashboardDataList?.data?.products);
    set_total_revenueData(DashboardDataList?.data?.totalCustomers);
    set_total_orderData(DashboardDataList?.data?.totalProducts);
    set_total_userData(DashboardDataList?.data?.totalUsers);

  },[DashboardDataList])

  useEffect(() =>{
    dispatch(getDashboarddatalist())
  },[])
  
  // -------- Customer Data code start -----------------
    const ViewAllCall = (data:string) =>{
      navigate(`/${data}/list`)
    }

    const UserDropDownCall = (e:any) =>{
      setSelectedUserframe(e.target.value)
    }

    const OrderDropDownCall =  (e:any) =>{
      setSelectedOrderframe(e.target.value)
    }

    const revenueDropDownCall =  (e:any) =>{
      setSelectedrevenueframe(e.target.value)
    }

  return (
    <NavbarSidebarLayout isFooter={false}  isSidebar={true} isNavbar={true}  isRightSidebar={true} >
      <div>

        <div>
          <div className="md:flex flex-wrap gap-3">
            <div className="w-[calc(33%-6px)] md:w-[32%] w-full mt-[1.5rem] md:mt-0">
              <div className="h-24 p-3 rounded-xl w-full flex flex-wrap justify-between transition-all bg-red-200 dark:bg-gray-800 dark:text-gray-50">
                <div className="flex w-full justify-between items-start">
                  <div className="p-3 rounded-full bg-purple-500 self-center">
                    <FaHandHoldingDollar className="text-white w-6 h-6" />
                  </div>
                  <div className="self-center">
                    <select className="border border-gray-300 rounded-full px-2 py-1 text-sm dark:bg-gray-800 dark:text-gray-50" defaultValue="daily" onChange={(e) => OrderDropDownCall(e)}>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
               
                  <div className="text-center self-center items-start ">
                    <p className="text-md font-bold">Total Order</p>
                    <p className="text-lg font-bold text-center mt-2">{ selectedOrderframe == "weekly" ? total_orderData?.weekly   : selectedOrderframe == "monthly" ?  total_orderData?.monthly :    total_orderData?.daily}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[calc(33%-6px)] md:w-[32%] w-full mt-[1.5rem] md:mt-0">
              <div className="h-24 p-3 rounded-xl w-full flex flex-wrap justify-between transition-all bg-red-200 dark:bg-gray-800 dark:text-gray-50">
                <div className="flex w-full justify-between items-start">
                  <div className="p-3 rounded-full bg-purple-500 self-center">
                    <FaRupeeSign className="text-white w-6 h-6" />
                  </div>
                  <div className="self-center">
                    <select className="border border-gray-300 rounded-full px-2 py-1 text-sm dark:bg-gray-800 dark:text-gray-50" defaultValue="daily"  onChange={(e) => revenueDropDownCall(e)}>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  <div className="text-center self-center items-start">
                    <p className="text-md font-bold">Total Revenue</p>
                    <p className="text-lg font-bold text-center mt-2">{ selectedrevenueframe == "weekly" ? total_revenueData?.weekly   : selectedrevenueframe == "monthly" ?  total_revenueData?.monthly :    total_revenueData?.daily}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[calc(33%-6px)] md:w-[32%] w-full mt-[1.5rem] md:mt-0">
              <div className="h-24 p-3 rounded-xl w-full flex flex-wrap justify-between transition-all bg-red-200 dark:bg-gray-800 dark:text-gray-50">
                <div className="flex w-full justify-between items-start">
                  <div className="p-3 rounded-full bg-purple-500 self-center">
                    <FaUser className="text-white w-6 h-6" />
                  </div>
                  <div className="self-center">
                    <select className="border border-gray-300 rounded-full px-2 py-1 text-sm dark:bg-gray-800 dark:text-gray-50" defaultValue="daily"    onChange={(e) => UserDropDownCall(e)}>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  <div className="text-center self-center items-start">
                    <p className="text-md font-bold">Total User</p>
                    <p className="text-lg font-bold text-center mt-2">{ selectedUserframe == "weekly" ? total_userData?.weekly   : selectedUserframe == "monthly" ?  total_userData?.monthly :    total_userData?.daily}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-6 lg:grid  grid-flow-row gap-4 flex flex-col"> <SalesThisWeek /> </div>
        <div className="my-6 ">
          <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="mb-2 text-md lg:text-xl font-bold text-gray-900 dark:text-white"> Latest Transactions </div>
                <span className="text-base font-normal text-gray-600 dark:text-gray-400 hidden md:block"> This is a list of latest transactions </span>
              </div>
                <div className="inline-flex items-center rounded-lg p-2 text-sm font-medium text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700 cursor-pointer" onClick={() => ViewAllCall("order")}>  View all </div>
            </div>
            <div className="mt-8 flex flex-col">
              <div className="overflow-x-auto rounded-lg">
                <div className="inline-block min-w-full align-middle">
                  <div className="overflow-hidden shadow sm:rounded-lg">
                    <Table   striped  className="min-w-full divide-y divide-gray-200 dark:divide-gray-600"  >
                      <Table.Head className="bg-gray-50 dark:bg-gray-700">
                        <Table.HeadCell>Order id</Table.HeadCell>
                        <Table.HeadCell>Date &amp; Time</Table.HeadCell>
                        <Table.HeadCell>Customer Name</Table.HeadCell>
                        <Table.HeadCell>Sales  Executive </Table.HeadCell>
                        <Table.HeadCell>Amount</Table.HeadCell>
                        <Table.HeadCell>Status</Table.HeadCell>
                      </Table.Head>
                      <Table.Body className="bg-white dark:bg-gray-800">
                          {OrderData && OrderData.map((item:any, k:any) =>(
                            <Table.Row>
                            <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-gray-200">   <span className="font-semibold">{ item.order_id}</span> </Table.Cell>
                            <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-200">  {moment(item.added_at).format("DD-MM-YYYY hh:mm:ss")} </Table.Cell>
                            <Table.Cell className="whitespace-nowrap p-4 text-sm font-semibold text-gray-900 dark:text-gray-200"> {item?.customer?.customer_name}</Table.Cell>
                            <Table.Cell className="whitespace-nowrap p-4 text-sm font-semibold text-gray-900 dark:text-gray-200"> {item?.advisor_name?.name} </Table.Cell>
                            <Table.Cell className="whitespace-nowrap p-4 text-sm font-semibold text-gray-900 dark:text-gray-200"> ₹ { item?.total_amount}</Table.Cell>
                            <Table.Cell className="flex whitespace-nowrap p-4"> <Badge color="success">{item?.status}</Badge> </Table.Cell>
                          </Table.Row>
                          ))}
                      </Table.Body>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="my-6 lg:grid grid-cols-2 grid-flow-row gap-4">
            <div className="mb-4 h-full rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white"> Latest Customers </h3>
                  <div className="inline-flex items-center rounded-lg p-2 text-sm font-medium text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700 cursor-pointer" onClick={() => ViewAllCall("customer")}>  View all </div>
                </div>
                <div className="flow-root">
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {CustomerData && CustomerData.map((item:any, k:number) =>(
                      <li className="py-3 sm:py-4" key={k}>
                      <div className="flex justify-between items-center space-x-4">
                        <div className="min-w-0 ">
                          <p className="truncate text-sm font-medium text-gray-900 dark:text-white"> {item?.customer_name} </p>
                          <p className="truncate text-sm text-gray-500 dark:text-gray-400"> {item?.taluka}  </p>
                        </div>
                        {/* <div className="inline-flex items-center text-sm font-normal text-gray-900 dark:text-gray-300 text-center">{item.village}</div> */}
                        <div className="inline-flex items-center text-md font-normal text-gray-900 dark:text-gray-200">{item?.mobile_number}</div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-gray-400">{item?.is_deleted == false ?  <Badge color="success">Active</Badge>  :  <Badge color="danger">Deactive</Badge>}</div>
                      </div>
                      </li>
                    ))}
                  </ul>
                </div>
            </div>

          {/* User Data */}
            <div className="mb-4 h-full rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white"> Latest Users </h3>
                <div className="inline-flex items-center rounded-lg p-2 text-sm font-medium text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700 cursor-pointer" onClick={() => ViewAllCall("users")}>  View all </div>
              </div>
              <div className="flow-root">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {UserData && UserData.map((item:any, k:number) =>(
                    <li className="py-3 sm:py-4" key={k}>
                    <div className="flex items-center space-x-4">
                      <div className="shrink-0">
                        <img className="h-8 w-8 rounded-full"    src={`${IMG_URL}/public/user/${item.user_pic}`}  alt="" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900 dark:text-white"> {item.name} </p>
                        <p className="truncate text-sm text-gray-500 dark:text-gray-400"> {item.email}  </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-gray-400">{item.is_active == true ?  <Badge color="success">Active</Badge>  :  <Badge color="danger">Deactive</Badge>}</div>
                    </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
        </div>


        <div className=" my-6 rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="mb-2 text-md lg:text-xl font-bold text-gray-900 dark:text-white"> Latest Products </div>
              <span className="text-base font-normal text-gray-600 dark:text-gray-400 hidden md:block"> This is a list of latest products </span>
            </div>
            <div className="shrink-0">
              <div className="rounded-lg p-2 text-sm font-medium text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700 cursor-pointer" onClick={() =>ViewAllCall("product")}> View all  </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col">
            <div className="overflow-x-auto rounded-lg">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden shadow sm:rounded-lg">
                  <Table striped className="min-w-full divide-y divide-gray-200 dark:divide-gray-600" >
                    <Table.Head className="bg-gray-50 dark:bg-gray-700">
                      <Table.HeadCell>Eng Name</Table.HeadCell>
                      <Table.HeadCell>Guj Name</Table.HeadCell>
                      <Table.HeadCell>Category</Table.HeadCell>
                      <Table.HeadCell>Qty</Table.HeadCell>
                      <Table.HeadCell>HSN</Table.HeadCell>
                      <Table.HeadCell>Batch</Table.HeadCell>
                      <Table.HeadCell>Price</Table.HeadCell>
                      <Table.HeadCell>Date &amp; Time</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="bg-white dark:bg-gray-800">
                        {ProductData && ProductData.map((item:any ,k:number) =>(
                          <Table.Row key={k}>
                          <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white"><span className="font-semibold">{item?.name?.englishname}</span>  </Table.Cell>
                          <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white"><span className="font-semibold">{item?.name?.gujaratiname}</span>  </Table.Cell>
                          <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-300"> { item?.categories?.name_eng ? item?.categories?.name_eng : "N/A"}  </Table.Cell>
                          <Table.Cell className="whitespace-nowrap p-4 text-sm font-semibold text-gray-900 dark:text-gray-300"> {item?.avl_qty}  </Table.Cell>
                          <Table.Cell className="whitespace-nowrap p-4 text-sm font-semibold text-gray-900 dark:text-gray-300"> {item?.hsn_code}  </Table.Cell>
                          <Table.Cell className="whitespace-nowrap p-4 text-sm font-semibold text-gray-900 dark:text-gray-300"> {item?.batch_no}  </Table.Cell>
                          <Table.Cell className="whitespace-nowrap p-4 text-sm font-semibold text-gray-900 dark:text-gray-300"> {item?.price.toFixed(2)}  </Table.Cell>
                          <Table.Cell className="whitespace-nowrap p-4 text-sm font-semibold text-gray-900 dark:text-gray-300">   {moment(item.createdAt).format("DD-MM-YYYY hh:mm:ss")}   </Table.Cell>
                          </Table.Row>
                        ))}
                    </Table.Body>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
       
      </div>
    </NavbarSidebarLayout>
  );
};

const SalesThisWeek: FC = function () {
  return (
    <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
      <div className="mb-4 flex items-center justify-between">
        <div className="shrink-0">
          <span className="text-2xl font-bold leading-none text-gray-900 dark:text-white sm:text-3xl">
            $45,385
          </span>
          <h3 className="text-base font-normal text-gray-600 dark:text-gray-400">
            Sales this week
          </h3>
        </div>
        <div className="flex flex-1 items-center justify-end text-base font-bold text-green-600 dark:text-green-400">
          12.5%
          <svg
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <SalesChart />
     
    </div>
  );
};

const SalesChart: FC = function () {
  const { mode } = useTheme();
  const isDarkTheme = mode === "dark";

  const borderColor = isDarkTheme ? "#374151" : "#F3F4F6";
  const labelColor = isDarkTheme ? "#93ACAF" : "#6B7280";
  const opacityFrom = isDarkTheme ? 0 : 1;
  const opacityTo = isDarkTheme ? 0 : 1;

  const options: ApexCharts.ApexOptions = {
    stroke: {
      curve: "smooth",
    },
    chart: {
      type: "area",
      fontFamily: "Inter, sans-serif",
      foreColor: labelColor,
      toolbar: {
        show: false,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom,
        opacityTo,
        type: "vertical",
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      style: {
        fontSize: "14px",
        fontFamily: "Inter, sans-serif",
      },
    },
    grid: {
      show: true,
      borderColor: borderColor,
      strokeDashArray: 1,
      padding: {
        left: 35,
        bottom: 15,
      },
    },
    markers: {
      size: 5,
      strokeColors: "#ffffff",
      hover: {
        size: undefined,
        sizeOffset: 3,
      },
    },
    xaxis: {
      categories: [
        "01 Feb",
        "02 Feb",
        "03 Feb",
        "04 Feb",
        "05 Feb",
        "06 Feb",
        "07 Feb",
      ],
      labels: {
        style: {
          colors: [labelColor],
          fontSize: "14px",
          fontWeight: 500,
        },
      },
      axisBorder: {
        color: borderColor,
      },
      axisTicks: {
        color: borderColor,
      },
      crosshairs: {
        show: true,
        position: "back",
        stroke: {
          color: borderColor,
          width: 1,
          dashArray: 10,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: [labelColor],
          fontSize: "14px",
          fontWeight: 500,
        },
        formatter: function (value) {
          return "$" + value;
        },
      },
    },
    legend: {
      fontSize: "14px",
      fontWeight: 500,
      fontFamily: "Inter, sans-serif",
      labels: {
        colors: [labelColor],
      },
      itemMargin: {
        horizontal: 10,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          xaxis: {
            labels: {
              show: false,
            },
          },
        },
      },
    ],
  };
  const series = [
    {
      name: "Revenue",
      data: [6356, 6218, 6156, 6526, 6356, 6256, 6056],
      color: "#1A56DB",
    },
  ];

  return <Chart height={420} options={options} series={series} type="area" />;
};


export default DashboardPage;