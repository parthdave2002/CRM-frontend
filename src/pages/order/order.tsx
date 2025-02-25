import { FC, useEffect, useState } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import ExamplePagination from "../../components/pagination";
import ExampleBreadcrumb from "../../components/breadcrumb";
import { Button,  Checkbox, Table} from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderlist } from "../../Store/actions";
import { useNavigate } from "react-router";
import moment from "moment";

const OrderListPage : FC = function () {
      const navigate = useNavigate();
      const dispatch = useDispatch();

    // ----------- next Button  Code Start -------------
      const [UserDataList, setUserDataList] = useState([]);
      const [TotalPage, setTotalPage] = useState(0);
      const [PageNo, setPageNo] = useState(1);
      const [RoePerPage, setRoePerPage] = useState(5);
    
      const RowPerPage = (value: any) => { setRoePerPage(value)};
      const PageDataList = (data:any) =>{ setPageNo(data)}
    // ------------- Next button Code End -------------
    
    // ---------------- Search User code start ----------------
       const [searchData, setSearchData] = useState(null);
       const Changename = (data:any) =>{
           setSearchData(data)
       }
   // ---------------- Search User code end ----------------

    useEffect(() => {
        let requserdata: { page: number; size: number; search?: string } = {
            page: PageNo,
            size: RoePerPage
        };
        if (searchData) requserdata.search = searchData;
        dispatch(getOrderlist(requserdata));
    }, [dispatch, PageNo, RoePerPage, searchData]);
 
    // ------------- Get  Data From Reducer Code Start --------------
      const { Orderlist,  OrderlistSize, TotalOrderData, CurrentPage } = useSelector((state: any) => ({
          Orderlist: state.Order.Orderlist,
          OrderlistSize: state.Order.OrderlistSize,
          TotalOrderData: state.Order.TotalOrderData,
          CurrentPage: state.Order.CurrentPage,
        }));

      const [TotalListData, setTotalListData] = useState(0);
      const [CurrentOrderlistSize, setCurrentUserListSize] = useState();
      const [CurrentPageNo, setCurrentPageNo] = useState(0);
      
      useEffect(() => {
        setUserDataList(Orderlist ? Orderlist  : null);
        setTotalListData(TotalOrderData ? TotalOrderData : 0);
        setCurrentUserListSize(OrderlistSize ? OrderlistSize : 0);
        setCurrentPageNo(CurrentPage ? CurrentPage : 1);
      }, [Orderlist, TotalOrderData, OrderlistSize, CurrentPage]);
    //  ------------- Get  Data From Reducer Code end --------------
    
    // --------- Checkbox Code start ------------
      const CheckData = (data:any) =>{
        console.log(data)
      }
    // --------- Checkbox Code end ------------
  

    let Name = "Order List";
    let Searchplaceholder = "Search For Orders";

    const OrderDetailsCall = (data:any) =>{
        navigate(`/order/details/${data}`)
    }

    return (
        <>  
            <NavbarSidebarLayout isFooter={false}  isSidebar={true} isNavbar={true} isRightSidebar={true}>
                <ExampleBreadcrumb  Name={Name} Searchplaceholder={Searchplaceholder} searchData={searchData} Changename= {Changename} />
                <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 ">
                    <Table.Head className="bg-gray-100 dark:bg-gray-700">
                        <Table.HeadCell> <Checkbox id="select-all" name="select-all" /> </Table.HeadCell>
                        <Table.HeadCell>Order id</Table.HeadCell>
                        <Table.HeadCell>Advisor Name </Table.HeadCell>
                        <Table.HeadCell>Created At</Table.HeadCell>
                        {/* <Table.HeadCell>COD Amt</Table.HeadCell> */}
                        <Table.HeadCell>Status</Table.HeadCell>
                    </Table.Head>

                    <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                        {UserDataList && UserDataList.map((item: any, k:number) => (
                            <Table.Row  key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700" >
                                <Table.Cell className="w-4 py-0" style={{ paddingTop: "1", paddingBottom: "1" }}>  <Checkbox  value={item._id} onClick={() => {CheckData(item._id)}}/>  </Table.Cell>
                                <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0 cursor-pointer" onClick={() => OrderDetailsCall(item._id)}>  {item._id} </Table.Cell>
                                <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item.email} </Table.Cell>
                                <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {moment(item.createdAt).format("DD-MM-YYYY hh:mm:ss")} </Table.Cell>
                                {/* <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item.totalAmount} </Table.Cell> */}
                                <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item.status} </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
                <ExamplePagination PageData={PageDataList} RowPerPage={RowPerPage}  PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData}/>
            </NavbarSidebarLayout>
        </>
    );
}

export default OrderListPage;