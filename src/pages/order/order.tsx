import { FC, useEffect, useRef, useState } from "react";
import logo from "../../img/logo.webp";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import ExamplePagination from "../../components/pagination";
import ExampleBreadcrumb from "../../components/breadcrumb";
import { Button,  Checkbox, Table, Modal} from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderlist } from "../../Store/actions";
import { useNavigate } from "react-router";
import moment from "moment";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const OrderListPage : FC = function () {
      const navigate = useNavigate();
      const dispatch = useDispatch();
      const invoiceRef = useRef<HTMLDivElement>(null);

    // ----------- next Button  Code Start -------------
      const [UserDataList, setUserDataList] = useState([]);
      const [PageNo, setPageNo] = useState(1);
      const [RoePerPage, setRoePerPage] = useState(5);
    
      const RowPerPage = (event: any) => {
        const value = Number(event)
         setRoePerPage(value);
       };
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
      const [CurrentPageNo, setCurrentPageNo] = useState(0);
      
      useEffect(() => {
        setUserDataList(Orderlist?.data ? Orderlist?.data  : Orderlist);
        setTotalListData(TotalOrderData ? TotalOrderData : 0);
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

    const [ parcelModal, setparcelModal ] = useState(false);
    const [ parcelModalData, setparcelModalData ] = useState<any>({});
    const OpenParcelModal = (id:any) =>{
      setparcelModalData(id)
      setparcelModal(true)
    }
    console.log("parcelModalData",parcelModalData);
    

    const Downloadcall = async () => {
      const input = invoiceRef.current;
      if (!input) return;

      const canvas = await html2canvas(input, {
        scale: 3,            // HIGH quality
        useCORS: true,
        allowTaint: false,
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);

      const pdfWidth = canvas.width * 0.264583;  // px to mm
      const pdfHeight = canvas.height * 0.264583;

      const pdf = new jsPDF("p", "mm", [pdfWidth, pdfHeight]);

      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("COD_Parcel.pdf");
    };


    return (
        <>  
            <NavbarSidebarLayout isFooter={false}  isSidebar={true} isNavbar={true} isRightSidebar={true}>
                <ExampleBreadcrumb  Name={Name} Searchplaceholder={Searchplaceholder} searchData={searchData} Changename= {Changename} />
                <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 ">
                    <Table.Head className="bg-gray-100 dark:bg-gray-700">
                        <Table.HeadCell> <Checkbox id="select-all" name="select-all" /> </Table.HeadCell>
                        <Table.HeadCell>Order id</Table.HeadCell>
                        <Table.HeadCell> Advisor Name </Table.HeadCell>
                        <Table.HeadCell>COD Amt</Table.HeadCell>
                        <Table.HeadCell>Type</Table.HeadCell>
                        <Table.HeadCell>Status</Table.HeadCell>
                        <Table.HeadCell>Created At</Table.HeadCell>
                        <Table.HeadCell>Action</Table.HeadCell>
                    </Table.Head>

                    <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                        {UserDataList && UserDataList.map((item: any, k:number) => (
                            <Table.Row  key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700" >
                                <Table.Cell className="w-4 py-0" style={{ paddingTop: "1", paddingBottom: "1" }}>  <Checkbox  value={item?._id} onClick={() => {CheckData(item?._id)}}/>  </Table.Cell>
                                <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0 cursor-pointer" onClick={() => OrderDetailsCall(item._id)}>  {item.order_id} </Table.Cell>
                                <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.advisor_name?.name} </Table.Cell>
                                <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">₹ {item?.total_amount.toFixed(2)} </Table.Cell>
                                <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.order_type.charAt(0).toUpperCase() + item?.order_type.slice(1).toLowerCase() } </Table.Cell>
                                <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.status ? item?.status.charAt(0).toUpperCase() + item?.status.slice(1).toLowerCase()  : "-"} </Table.Cell>
                                <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {moment(item?.added_at).format("DD-MM-YYYY hh:mm:ss")} </Table.Cell>
                                <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  <Button onClick={() => OpenParcelModal(item) }> Parcel cover </Button></Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
                <ExamplePagination PageData={PageDataList} RowPerPage={RowPerPage}   RowsPerPageValue={RoePerPage}  PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData}/>  
            </NavbarSidebarLayout>

            <Modal onClose={() => setparcelModal(false)} show={parcelModal} size="xl" dismissible >
              <Modal.Header className="p-2 pb-0">  <Button  className="text-lg font-semibold" onClick={Downloadcall} > Download</Button >   </Modal.Header>
              <Modal.Body className="px-6 py-3"  >
                <div className="text-sm px-4  text-black font-[sans-serif] mx-auto" ref={invoiceRef}  style={{
                    width: "100%",               // Take full available width
                    maxWidth: "fit-content",     // Prevent overflow
                    padding: "24px",
                    margin: "0 auto",            // Center it
                    backgroundColor: "white",
                    fontSize: "14px",
                    color: "#000",
                    fontFamily: "Arial, sans-serif",
                  }}>
                  <div className="text-red-600 my-2 text-[0.9rem] font-semibold">
                    <p>[1] ગ્રાહક બહારગામ હોય તો પાર્સલ 7 દિવસ સુધી હોલ્ડ માં રાખવું.</p>
                    <p>[2] કોઈ પણ સંજોગોમાં ગ્રાહક જોડેથી COD કરતા વધુ ચાર્જ લેવો નહિં.</p>
                    <p>[3] ગ્રાહકને પાર્સલ ઘર સુધી પહોંચાડવું અને ફરજીયાત ફોન કરવો.</p>
                  </div>

                  <div className="border-t border-b border-black py-2 ">
                    <p className="font-bold text-[1rem] text-center">COD Book Parcel - Under Business Parcel BNPL Service</p>
                  </div>

                  <div className=" border-b border-black py-2 text-[1rem] ">
                    <p><strong>COD Amount - Rs:</strong> {parcelModalData?.total_amount}</p>
                    <div className="flex justify-between">
                       <p><strong>Biller ID:</strong> {parcelModalData?.order_id}</p>
                      <p><strong>Date:</strong> {moment(parcelModalData?.added_at).format("DD-MM-YYYY")}</p>
                    </div>
                  </div>

                  <div className="border-b border-black py-1">
                    <p className="font-semibold">DELIVERY ADDRESS:</p>
                      <p><strong>To:</strong>{parcelModalData?.customer?.customer_name}</p>
                      <p><strong>Mo.:</strong> {parcelModalData?.customer?.mobile_number} / {parcelModalData?.customer?.alternate_number}</p>     
                    <p><strong>Address:</strong> {parcelModalData?.customer?.address} </p>
                    <p><strong> AT: </strong> {parcelModalData?.customer?.village_name}</p>
                    <p><strong> TA:  </strong> {parcelModalData?.customer?.taluka_name}</p>
                    <p><strong> Dist: </strong> {parcelModalData?.customer?.district_name} - {parcelModalData?.customer?.pincode}</p>
                    <p><strong>Post: </strong> {parcelModalData?.customer?.post_office}</p>
                  </div>

                  <div className="py-1">
                    <p className="font-semibold">FROM : AGRI BHARAT</p>
                    <p><strong>Phone:  </strong> 9100029429 / 7990987972 / 9624696200</p>
                    <p><strong>Post Office: </strong> Una Branch</p>
                    <p><strong>Office Address: </strong> Warehouse No:1, Olvan Road, Near Market Paldi</p>
                   
                    <div className="flex justify-between ">
                       <p><strong>AT: </strong> Paldi (Post - Delwada)</p>
                        <p> <strong>TA: </strong> Una</p>
                        <p> <strong>Dist: </strong> Gir Somnath - 362510</p>
                    </div>
                    <div className="flex-end justify-items-end">  <img src={logo} alt="Logo" className="w-28" style={{ width: "100px", height: "auto" }} /> </div>
                  </div>
                </div>
              </Modal.Body>
            </Modal>

        </>
    );
}

export default OrderListPage;