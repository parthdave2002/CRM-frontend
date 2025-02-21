import type { FC } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { Suspense, useCallback, useEffect, useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { getReportDatalist } from "../../Store/actions";
import ExampleBreadcrumb from "../../components/breadcrumb";
import moment from "moment";
import { Button , Checkbox, Table} from "flowbite-react";
import ExportDataModal from "../../components/exportdata/exportCSV";

const ReportPage: FC = function () {
  const dispatch = useDispatch();

  const { GetReportDatalist } = useSelector((state: any) => ({
    GetReportDatalist: state.AdminDashboard.GetReportDatalist,
  }));

  //---------------- Satus option code start ----------------
    const [selectedStatusOption, setSelectedStatusOption] = useState(null);
    const [selectedStatusid, setSelectedStatusid] = useState<string>("");
    const IsActivedata = (data: any) => {
      if (!data) {
          setSelectedStatusid("");
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
    dispatch(getReportDatalist(requserData))
  }

  const ExportUserdata ={
    data:[
      {
        "is_active": true,
        "_id": "67ab2c70371d4b1e04ef3514",
        "name": "serus",
        "email": "diguqypo@mailinator.com",
        "password": "$2a$10$APIed3Aa6UOeJg2xp0Re6e.20fQA6rMEdJFtlUHEbGmcJvJ7kh9J2",
        "gender": "male",
        "mobile_no": 858,
        "date_of_joining": "1997-01-12",
        "date_of_birth": "1997-01-12",
        "role": "67a9c77c3022e8352c60d5b9",
        "created_at": "20-02-25"
      }
    ]
  } 

  const ExportCustomerdata ={
    data:[
      {
        "_id": "67ab2c70371d4b1e04ef3514",
        "name": "serus",
        "mobile_no":1324657890,
        "address":"Ahmadabad Road",
        "village":"Ahmadabad",
        "city":"Ahmadabad",
        "created_at": "20-02-25"
      }
    ]
  } 

  const ExportProductdata ={
    data:[
      {
        "_id": "67ab2c70371d4b1e04ef3514",
        "name": "serus",
        "avl_qty": 12,
        "cgst":"18%",
        "sgst":"18%",
        "price": 100,
        "discount":"10%", 
        "caetgory":"Ahmadabad",
        "created_at": "20-02-25"
      }
    ]
  } 

  const ExportRoledata ={
    data: [
      {
        "is_active": true,
        "_id": "67ab2c70371d4b1e04ef3514",
        "role_title": "serus",
        "description": "diguqypo@mailinator.com",
        "created_at": "20-02-25"
      }
    ] 
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

            <div className="flex-1 justify-items-end self-center">
              <Suspense fallback={<div>Loading...</div>}>
                <ExportDataModal data={ExportUserdata} name={selectedStatusid} />
              </Suspense>
            </div>
          </div>

          <div className="mt-[2rem] bg-white dark:bg-gray-800 p-4">
          
            {selectedStatusid == "user" ?

              <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                <Table.Head className="bg-gray-100 dark:bg-gray-700">
                  <Table.HeadCell> <Checkbox id="select-all" name="select-all" /></Table.HeadCell>
                  <Table.HeadCell>Name</Table.HeadCell>
                  <Table.HeadCell>email</Table.HeadCell>
                  <Table.HeadCell>role</Table.HeadCell>
                  <Table.HeadCell>gender</Table.HeadCell>
                  <Table.HeadCell>mobile no</Table.HeadCell>
                  <Table.HeadCell>date of joining</Table.HeadCell>
                  <Table.HeadCell>date of birth</Table.HeadCell>
                  <Table.HeadCell>Status</Table.HeadCell>
                </Table.Head>

                <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                  {ExportUserdata?.data && ExportUserdata?.data.map((item: any, k: any) => (
                    <Table.Row key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700" >
                      <Table.Cell className="w-4 py-0" style={{ paddingTop: "1", paddingBottom: "1" }} > <Checkbox /> </Table.Cell>
                      <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item.name}  </Table.Cell>
                      <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item.email}  </Table.Cell>
                      <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item.role}  </Table.Cell>
                      <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item.gender}  </Table.Cell>
                      <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item.mobile_no}  </Table.Cell>
                      <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item.date_of_joining}  </Table.Cell>
                      <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item.date_of_birth}  </Table.Cell>
                     
                      <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
                        {item.is_active == true ?
                          <div className="flex items-center"><div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400"></div> Active </div>
                          : <div className="flex items-center"> <div className="mr-2 h-2.5 w-2.5 rounded-full bg-Red"></div> Deactive </div>
                        }
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>

            : selectedStatusid == "customer" ?

                <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                  <Table.Head className="bg-gray-100 dark:bg-gray-700">
                    <Table.HeadCell> <Checkbox id="select-all" name="select-all" /></Table.HeadCell>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Mobile</Table.HeadCell>
                    <Table.HeadCell>address</Table.HeadCell>
                    <Table.HeadCell>village</Table.HeadCell>
                    <Table.HeadCell>city</Table.HeadCell>
                    <Table.HeadCell>created at</Table.HeadCell>
                  </Table.Head>

                  <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                    {ExportCustomerdata?.data && ExportCustomerdata?.data.map((item: any, k: any) => (
                      <Table.Row key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700" >
                        <Table.Cell className="w-4 py-0" style={{ paddingTop: "1", paddingBottom: "1" }} > <Checkbox /> </Table.Cell>
                        <Table.Cell className="whitespace-nowraptext-base font-medium text-gray-900 dark:text-white py-0">  {item.name}  </Table.Cell>
                        <Table.Cell className="whitespace-nowraptext-base font-medium text-gray-900 dark:text-white py-0">  {item.mobile_no}  </Table.Cell>
                        <Table.Cell className="whitespace-nowraptext-base font-medium text-gray-900 dark:text-white py-0">  {item.address}  </Table.Cell>
                        <Table.Cell className="whitespace-nowraptext-base font-medium text-gray-900 dark:text-white py-0">  {item.village}  </Table.Cell>
                        <Table.Cell className="whitespace-nowraptext-base font-medium text-gray-900 dark:text-white py-0">  {item.city}  </Table.Cell>
                        <Table.Cell className="whitespace-nowraptext-base font-medium text-gray-900 dark:text-white py-0">  {item.created_at}  </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>

            : selectedStatusid == "product" ?

                <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                    <Table.Head className="bg-gray-100 dark:bg-gray-700">
                      <Table.HeadCell> <Checkbox id="select-all" name="select-all" /></Table.HeadCell>
                      <Table.HeadCell>Name</Table.HeadCell>
                      <Table.HeadCell>Qty</Table.HeadCell>
                      <Table.HeadCell>cgst</Table.HeadCell>
                      <Table.HeadCell>sgst</Table.HeadCell>
                      <Table.HeadCell>price</Table.HeadCell>
                      <Table.HeadCell>discount</Table.HeadCell>
                      <Table.HeadCell>caetgory</Table.HeadCell>
                      <Table.HeadCell>created at</Table.HeadCell>
                    </Table.Head>

                    <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                      {ExportProductdata?.data && ExportProductdata?.data.map((item: any, k: any) => (
                        <Table.Row key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700" >
                          <Table.Cell className="w-4 py-0" style={{ paddingTop: "1", paddingBottom: "1" }} > <Checkbox /> </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item.name}  </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item.avl_qty}  </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item.cgst}  </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item.sgst}  </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item.price}  </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item.discount}  </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item.caetgory}  </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item.created_at}  </Table.Cell>
                         
                        </Table.Row>
                      ))}
                    </Table.Body>
                </Table>

            : selectedStatusid == "order" ?

                <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                      <Table.Head className="bg-gray-100 dark:bg-gray-700">
                        <Table.HeadCell> <Checkbox id="select-all" name="select-all" /></Table.HeadCell>
                        <Table.HeadCell>Title</Table.HeadCell>
                        <Table.HeadCell>Description</Table.HeadCell>
                        <Table.HeadCell>Status</Table.HeadCell>
                      </Table.Head>

                      <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                        {ExportRoledata?.data && ExportRoledata?.data.map((item: any, k: any) => (
                          <Table.Row key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700" >
                            <Table.Cell className="w-4 py-0" style={{ paddingTop: "1", paddingBottom: "1" }} > <Checkbox /> </Table.Cell>
                            <Table.Cell className="whitespace-nowraptext-base font-medium text-gray-900 dark:text-white py-0">  {item.role_title}  </Table.Cell>
                            <Table.Cell className="whitespace-nowraptext-base font-medium text-gray-900 dark:text-white py-0">  {item.description}  </Table.Cell>
                            <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
                              {item.is_active == true ?
                                <div className="flex items-center"><div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400"></div> Active </div>
                                : <div className="flex items-center"> <div className="mr-2 h-2.5 w-2.5 rounded-full bg-Red"></div> Deactive </div>
                              }
                            </Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                </Table>

            :null
            }
          
            
          </div>
      </NavbarSidebarLayout>

    </>
  );
};

export default ReportPage;