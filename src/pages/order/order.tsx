import { FC, useEffect, useRef, useState } from "react";
import logo from "../../img/logo.webp";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import ExamplePagination from "../../components/pagination";
import ExampleBreadcrumb from "../../components/breadcrumb";
import LoaderPage from "../../components/loader";
import { Button,  Checkbox, Table, Modal} from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderChangelist, getOrderlist } from "../../Store/actions";
import { useNavigate } from "react-router";
import moment from "moment";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Cookies from "js-cookie";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import ToastMessage from "../../components/ToastMessage";

const OrderListPage : FC = function () {
      const navigate = useNavigate();
      const dispatch = useDispatch();
      const role = Cookies.get("role");
      const invoiceRef = useRef<HTMLDivElement>(null);

    // ----------- next Button  Code Start -------------
      const [UserDataList, setUserDataList] = useState<any[]>([]);
      const [PageNo, setPageNo] = useState(1);
      const [RoePerPage, setRoePerPage] = useState(5);
      const [loader, setLoader] = useState(false);
    
      const RowPerPage = (event: any) => {
        const value = Number(event)
         setRoePerPage(value);
         setPageNo(1)
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
        let requserdata: { page: number; size: number; search?: string; warehouse?:boolean } = {
            page: PageNo,
            size: RoePerPage
        };
        if (searchData) requserdata.search = searchData;  
        if(role == "685c305069eaa1084c92c5fe" )  requserdata.warehouse = true;
        dispatch(getOrderlist(requserdata));
        setLoader(true)
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
      
        let listArray: any[] = [];
        const maybeData = Orderlist?.data ? Orderlist.data : Orderlist;
        if (Array.isArray(maybeData)) {
          listArray = maybeData;
        } else if (maybeData) {
          // unexpected payload, leave existing list or convert one-item
          console.warn("Orderlist is not an array", maybeData);
          listArray = [];
        }
        setUserDataList(listArray);
        setTotalListData(TotalOrderData ? TotalOrderData : 0);
        setCurrentPageNo(CurrentPage ? CurrentPage : 1);
        setLoader(false)
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

    // ================== Update Order Status Code Start ==================
        const [ isOpenConfirmModel, setisOpenConfirmModel ] = useState(false);
        const [ isUpdateOrderStatus, setIsUpdateOrderStatus ] = useState("");
        const [ isUpdateOrderId, setIsUpdateOrderId ] = useState("");
        const [ currentOrderStatus, setCurrentOrderStatus ] = useState("");
        const [ driverName, setDriverName ] = useState("");
        const [ trackingNumber, setTrackingNumber ] = useState("");
    
        const UpdateOrderStatusCall = () =>{
          setisOpenConfirmModel(false)
          const payload: any = { orderId : isUpdateOrderId, status : isUpdateOrderStatus };
          
          // Add driver name and tracking number for dispatch from ready to ship
          if(currentOrderStatus === "ready to ship" && isUpdateOrderStatus === "in transit") {
            payload.name = driverName;
            payload.tracking_number = trackingNumber;
          }
          
          dispatch(getOrderChangelist(payload));
          setDriverName("");
          setTrackingNumber("");
        }

        const UpdateCall =(id: string, data:string, currentStatus?: string) =>{
          setIsUpdateOrderStatus(data)
          setIsUpdateOrderId(id)
          setCurrentOrderStatus(currentStatus || "")
          setisOpenConfirmModel(true)
        }
    // ================== Update Order Status Code End ==================

    const [ parcelModal, setparcelModal ] = useState(false);
    const [ parcelModalData, setparcelModalData ] = useState<any>({});
    const OpenParcelModal = (id:any, call: boolean) =>{
      if(call)  dispatch(getOrderChangelist({ orderId : id?._id, status : "ready to ship" }))
      setparcelModalData(id)
      setparcelModal(true)
    }

  const Downloadcall = async () => {
    const input = invoiceRef.current;
    if (!input) return;

    const canvas = await html2canvas(input, {
      scale: 3,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = 210;
    const pageHeight = 297;

    // Half A4 size
    const targetWidth = pageWidth / 2; // 105mm
    const targetHeight = (canvas.height * targetWidth) / canvas.width;

    // Center horizontally, top aligned
    const x = (pageWidth - targetWidth) / 2;
    const y = 10;

    pdf.addImage(imgData, "PNG", x, y, targetWidth, targetHeight);
    pdf.save("COD_Parcel.pdf");
  };

  const printPDF = async () => {
    const input = invoiceRef.current;
    if (!input) return;

    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = 210;
    const pageHeight = 297;

    const targetWidth = pageWidth / 2; // Half A4
    const targetHeight = (canvas.height * targetWidth) / canvas.width;

    const x = (pageWidth - targetWidth) / 2;
    const y = 10;

    pdf.addImage(imgData, "PNG", x, y, targetWidth, targetHeight);

    const blobUrl = pdf.output("bloburl");
    window.open(blobUrl, "_blank");
  };

    // const Downloadcall = async () => {
    //   const input = invoiceRef.current;
    //   if (!input) return;

    //   const canvas = await html2canvas(input, {
    //     scale: 3,            // HIGH quality
    //     useCORS: true,
    //     allowTaint: false,
    //   });

    //   const imgData = canvas.toDataURL("image/jpeg", 1.0);

    //   const pdfWidth = canvas.width * 0.264583;  // px to mm
    //   const pdfHeight = canvas.height * 0.264583;

    //   const pdf = new jsPDF("p", "mm", [pdfWidth, pdfHeight]);

    //   pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
    //   pdf.save("COD_Parcel.pdf");
    // };

      // const printPDF = async () => {
      //   if (!invoiceRef.current) return;
    
      //   const input = invoiceRef.current;
    
      //   // Capture the div as image
      //   const canvas = await html2canvas(input, {
      //     scale: 2, // improves quality
      //     useCORS: true,
      //   });
    
      //   const imgData = canvas.toDataURL("image/png");
      //   const pdf = new jsPDF("p", "px", "a4"); // px is better for html2canvas
    
      //   const pdfWidth = pdf.internal.pageSize.getWidth();
      //   const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      //   pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      //   const blob = pdf.output("blob");
      //   const blobUrl = URL.createObjectURL(blob);
      //   window.open(blobUrl, "_blank");
      // }

    return (
        <>  
            <NavbarSidebarLayout isFooter={false}  isSidebar={true} isNavbar={true} isRightSidebar={true}>
             {loader ? <LoaderPage /> :   
                <>
                <ExampleBreadcrumb  Name={Name} Searchplaceholder={Searchplaceholder} searchData={searchData} Changename= {Changename} />
                <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 ">
                    <Table.Head className="bg-gray-100 dark:bg-gray-700">
                        <Table.HeadCell> <Checkbox id="select-all" name="select-all" /> </Table.HeadCell>
                        <Table.HeadCell>Order id</Table.HeadCell>
                        <Table.HeadCell> Advisor Name </Table.HeadCell>
                        <Table.HeadCell>COD Amt</Table.HeadCell>
                        <Table.HeadCell>Order Type</Table.HeadCell>
                        <Table.HeadCell> Order Status</Table.HeadCell>
                        <Table.HeadCell> Delivery Type</Table.HeadCell>
                        <Table.HeadCell> Delivery Status</Table.HeadCell>
                        <Table.HeadCell>Created At</Table.HeadCell>
                        <Table.HeadCell>Action</Table.HeadCell>
                    </Table.Head>

                    <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                        {Array.isArray(UserDataList) && UserDataList.map((item: any, k:number) => (
                            <Table.Row  key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700" >
                                <Table.Cell className="w-4 py-0" style={{ paddingTop: "1", paddingBottom: "1" }}>  <Checkbox  value={item?._id} onClick={() => {CheckData(item?._id)}}/>  </Table.Cell>
                                <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0 cursor-pointer" onClick={() => OrderDetailsCall(item._id)}>  {item.order_id} </Table.Cell>
                                <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.advisor_name?.name} </Table.Cell>
                                <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">₹ {Math.round(item?.total_amount)} </Table.Cell>
                                <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.order_type.charAt(0).toUpperCase() + item?.order_type.slice(1).toLowerCase() } </Table.Cell>
                                <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.status ? item?.status.charAt(0).toUpperCase() + item?.status.slice(1).toLowerCase()  : "-"} </Table.Cell>
                                <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.delivery_through ? item?.delivery_through.charAt(0).toUpperCase() + item?.delivery_through.slice(1).toLowerCase() : "-"} </Table.Cell>
                                <Table.Cell className="whitespace-nowrap text-md font-medium text-gray-900 dark:text-white py-0">
                                  <div className='flex flex-col'>
                                    <div>  {item?.delivery_by ? item?.delivery_by.charAt(0).toUpperCase() + item?.delivery_by.slice(1).toLowerCase() : "-"}  </div>
                                    <div>  {item?.tracking_number ? item?.tracking_number : "-"} </div>
                                  </div>
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {moment(item?.added_at).format("DD-MM-YYYY hh:mm:ss")} </Table.Cell>
                                <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> 
                                    {item?.status && item?.status === "confirm" ?   <Button onClick={() => UpdateCall(item?._id, "packing", item?.status)}> In Packing </Button> : 
                                    item?.status && item?.status === "packing" ?    <Button onClick={() => OpenParcelModal(item, true)}> Parcel cover </Button> :
                                    item?.status && item?.status === "ready to ship" ?
                                    <div className="flex gap-x-5"> 
                                        <Button onClick={() => OpenParcelModal(item, false)}> Parcel cover </Button>
                                        <Button onClick={() => UpdateCall(item?._id, "in transit", item?.status)}> In Transit </Button> 
                                    </div>
                                    :
                                    item?.status && item?.status === "in transit" ?  
                                    <div className="flex gap-x-5">
                                      <Button className="w-[8rem]" onClick={() => OpenParcelModal(item, false)}> Parcel cover </Button>
                                      <Button className="w-[8rem]" onClick={() => UpdateCall(item?._id, "delivered", item?.status)}> Delivered </Button>
                                      <Button className="w-[8rem]" onClick={() => UpdateCall(item?._id, "loss", item?.status)}> Loss </Button>
                                      <Button className="w-[8rem]" onClick={() => UpdateCall(item?._id, "return", item?.status)}> Return </Button>
                                    </div>

                                    : item?.status && item?.status === "delivered"  ||  item?.status && item?.status === "loss"  ||  item?.status && item?.status === "return" ?  
                                      <Button className="w-[8rem]" onClick={() => OpenParcelModal(item, false)}> Parcel cover </Button>
                                    :   "-" }
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
                <ExamplePagination PageData={PageDataList} RowPerPage={RowPerPage}   RowsPerPageValue={RoePerPage}  PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData}/> 
                </>
              } 
            </NavbarSidebarLayout>

            <Modal onClose={() => setparcelModal(false)} show={parcelModal} size="xl" dismissible>
              <Modal.Header className="flex justify-between items-center px-6 py-3 border-b border-gray-200 ">
                <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold">COD Parcel Invoice</h2>
                <button   onClick={Downloadcall}   className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-3 py-1.5 rounded hover:bg-blue-700 transition" >   Download  </button>
                <button   onClick={printPDF}   className="inline-flex items-center gap-2 bg-green-600 text-white text-sm font-medium px-6 py-1.5 rounded hover:bg-green-700 transition" >   Print  </button>
                </div>
              </Modal.Header>

              <Modal.Body className="px-6 py-4 bg-gray-50 max-h-[30rem] overflow-scroll">
                <div
                  ref={invoiceRef}
                  className="bg-white shadow-md rounded-lg overflow-hidden p-6 text-sm text-black font-[sans-serif] mx-auto max-w-2xl"
                >
                  {/* Top Notice */}
                  <div className="text-red-600 mb-4 text-[0.9rem] space-y-1 font-semibold">
                    <p>[1] ગ્રાહક બહારગામ હોય તો પાર્સલ 7 દિવસ સુધી હોલ્ડ માં રાખવું.</p>
                    <p>[2] કોઈ પણ સંજોગોમાં ગ્રાહક જોડેથી COD કરતા વધુ ચાર્જ લેવો નહિં.</p>
                    <p>[3] ગ્રાહકને પાર્સલ ઘર સુધી પહોંચાડવું અને ફરજીયાત ફોન કરવો.</p>
                  </div>

                  {/* Header */}
                  <div className="border-y border-black py-2 text-center">
                    <p className="font-bold text-base">COD Book Parcel - Under Business Parcel BNPL Service</p>
                  </div>

                  {/* COD Info */}
                  <div className="border-b border-black py-3 space-y-1">
                    <p className="font-bold text-xl ">COD Amount: ₹ {Math.round(parcelModalData?.total_amount)}</p>
                    <div className="flex justify-between text-[1rem]">
                      <p><span className="font-bold">Biller ID:</span> 1675499490 </p>
                      <p><span className="font-bold">Date:</span> {moment(parcelModalData?.added_at).format("DD-MM-YYYY")}</p>
                    </div>
                  </div>

                  {/* Delivery Address */}
              <div className="border-b border-black py-3 space-y-1 text-[1rem] font-bold">
                <p className="underline">Delivery Address :</p>
                <p><span className="">TO : </span> {parcelModalData?.customer?.firstname} {parcelModalData?.customer?.middlename}  {parcelModalData?.customer?.lastname} </p>
                <p><span className="">MO :</span> {parcelModalData?.customer?.mobile_number}  {parcelModalData?.customer?.alternate_number ? ` / ${parcelModalData.customer.alternate_number}` : null}</p>
                <p><span className="">ADDRESS  : </span> {parcelModalData?.customer?.address}</p>

                <p><span className="font-semibold">AT :</span> {parcelModalData?.customer?.village?.name}</p>
                <p><span className="font-semibold">TA :</span> {parcelModalData?.customer?.taluka?.name}</p>
                <p><span className="font-semibold">DIST :</span> {parcelModalData?.customer?.district?.name} - {parcelModalData?.customer?.pincode}</p>
                <p><span className="font-semibold">POST :</span> {parcelModalData?.customer?.post_office}</p>
              </div>

                  {/* Sender Info */}
                  <div className="py-3 space-y-1">
                    <p className="font-semibold underline">FROM : AGRI BHARAT</p>
                    <p><span className="font-semibold">MO : </span>  9100029429 / 9100029329 / 9624696200 </p>
                    <p><span className="font-semibold">POST OFFICE :</span> Nikol (S.O)</p>
                    <p><span className="font-semibold">OFFICE ADDRESS :</span> Shop No-26, Ground Floor,Arth Business Center (ABC), S.P Ring Road, Nikol, Ahmedabad-382350</p>
                    

                    {/* Logo aligned to right */}
                    <div className="flex justify-end mt-3">
                      <img src={logo} alt="Logo" className="w-24 h-auto" />
                    </div>
                  </div>
                </div>
              </Modal.Body>
            </Modal>

        <Modal onClose={() => {setisOpenConfirmModel(false); setDriverName(""); setTrackingNumber("");}} show={isOpenConfirmModel} size="xl">
          <Modal.Header className="px-6 pt-6 pb-0"> <span className="sr-only"> Confirmation  </span></Modal.Header>
          <Modal.Body className="px-6 pt-0 pb-6">
            <div className="flex flex-col items-center gap-y-6 "> <HiOutlineExclamationCircle className="text-7xl text-red-500" />
              <p className="text-xl text-gray-500"> Are you sure you want to Update order status ? </p>

                  {currentOrderStatus === "ready to ship" && isUpdateOrderStatus === "in transit" && (
                    <div className="w-full space-y-4">
                      <div> 
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-100"> Name : </label>
                        <input 
                          type="text" 
                          placeholder="Dispatch Through" 
                          value={driverName}
                          onChange={(e) => setDriverName(e.target.value)}
                          className="border border-gray-300 rounded px-2 py-1 w-full" 
                        />
                      </div>
                      <div> 
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-100"> Tracking Number : </label>
                        <input 
                          type="text" 
                          placeholder="Enter Tracking Details"
                          value={trackingNumber}
                          onChange={(e) => setTrackingNumber(e.target.value)}
                          className="border border-gray-300 rounded px-2 py-1 w-full" 
                        />
                      </div>
                    </div>
                  )}
              

              <div className="flex items-center gap-x-3">
                <Button color="failure" onClick={() => UpdateOrderStatusCall()}>  Yes, I'm sure </Button>
                <Button color="gray" onClick={() => {setisOpenConfirmModel(false); setDriverName(""); setTrackingNumber("");}}> No, cancel </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        <ToastMessage />
        </>
    );
}

export default OrderListPage;