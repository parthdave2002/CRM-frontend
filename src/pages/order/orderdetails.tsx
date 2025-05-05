import type { FC } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getOrderlist  } from "../../Store/actions";
import {  useEffect, useRef, useState,   } from "react";
import ExampleBreadcrumb from "../../components/breadcrumb";
import { useParams } from "react-router";
import moment from "moment";
import { MdFileDownload } from "react-icons/md";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import logo from "../../img/logo.webp";
import { Button } from "flowbite-react";
import { FaFacebookSquare, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";

const OrdererDetailsPage: FC = function () {
  const dispatch = useDispatch();
  const { id } = useParams();
  const invoiceRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if(id){
      let requserdata = { id: id };
      dispatch(getOrderlist(requserdata))
    }
  },[id])

  interface CustomerData {
    address: string;
    customer_name : string;
    district_name: string;
    mobile_number : number;
    alternate_number : number;
    pincode : string;
    taluka_name:string;
    village_name : string;
  }

  interface ProductData {
    name: string ; 
    hsn_code : number;
    discount :number;
    batch_no : number;
    price : number;
    c_gst : number;
    s_gst : number;
    quantity : number;
  }
  
  interface OrderDetailsType {
    added_at : string;
    order_id: string
    customer: CustomerData;
    products :  ProductData[];
    status: string;
    total_amount : number;
  }

  const [UserDataList, setUserDataList] = useState<OrderDetailsType | null>( null);
  const { Orderlist } = useSelector((state: any) => ({
    Orderlist: state.Order.Orderlist,
  }));

  useEffect(() => {
    setUserDataList(Orderlist ? Orderlist[0] : null);
  }, [Orderlist]);
  //  ------------- Get User Data From Reducer Code Start --------------

  const finalsubtotal = (UserDataList?.products ?? []).reduce( (sum, item:any) => sum + item?.quantity * item?.id?.price,  0 );
  const finaldiscount = (UserDataList?.products ?? []).reduce( (sum, item:any) => sum + item?.id?.discount,  0 );
  const finalgst = (UserDataList?.products ?? []).reduce( (sum, item:any) => sum + (item?.quantity * item?.id?.price - item?.id?.discount) * ((item?.id?.c_gst * 2) / 100), 0 );
  const total = finalsubtotal - finaldiscount + finalgst;

  let Name = "Order Details";
  let ParentName = "Order List";
  let ParentLink = "/order/list";

  const downloadPDF = async () => {
    const input = invoiceRef.current;
    if (!input) return;

    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save(`Invoice_${UserDataList?.order_id}.pdf`);
  };

  return (
    <>
      <NavbarSidebarLayout isFooter={false}  isSidebar={true} isNavbar={true}     isRightSidebar={true}  >
        <ExampleBreadcrumb  Name={Name}  ParentName={ParentName}  ParentLink={ParentLink}  />
        <div className="mt-[2rem] bg-gray-100 dark:bg-gray-800 p-4">
          <div className="mb-4 flex justify-end">
            <Button color="primary" onClick={downloadPDF}>   <MdFileDownload className="w-6 h-6" /> Download PDF  </Button>
          </div>


          <div className="w-[794px] h-[1123px] mx-auto bg-white shadow-lg p-6 rounded-lg flex flex-col justify-between  font-sans"  ref={invoiceRef} >
              <div className="flex flex-col">
                <div className="flex-1 text-center"> 
                   <h6 className="text-[0.9rem]  text-gray-500 ">  એગ્રી ભારત કંપનીમાંથી 100% ખાતરીબંધ બ્રાન્ડેડ કૃષિ પ્રોડક્ટ ઘરે બેઠા ઓર્ડર કરવા અને ખેતીને લગતી વધુ માહિતી માટે  </h6>
                    <h6 className="text-[0.9rem]  text-gray-500 ">  હેલ્પલાઇન નંબર 9100029429/9100029329 પર સંપર્ક કરો!!!  જય કિસાન  </h6>
                 </div>

                <div className="flex justify-between">
                  <div className="flex-1">  <img src={logo} alt="Company Logo" className="w-24" />  </div>
                  <div className="flex-1 text-right">  <h1 className="text-3xl font-bold text-gray-800 ">INVOICE</h1> </div>
                </div>
                <div className="flex justify-between items-center mb-2  border-b pb-2">
                  <div>
                    <h2 className="text-xl font-bold mt-2">Agri Bharat</h2>
                    <p className="text-gray-500">Location 1: Shop-1, Ravi Shopping Center, </p>
                    <p className="text-gray-500">Opp. New Bus Stand, Kapadwanj - 387620</p>
                    <p className="text-gray-500">  Dist.: Kheda, Gujarat </p>
                    <p className="text-gray-500">  GST :  </p>

                  </div>

                  <div className="flex-1 text-right align-end self-end">
                  <p className="text-gray-500 text-sm"> Dispatched from: Kapadvanj / Una warehouse </p>
                    <p className="text-gray-500 text-sm"><strong> Pesticide Lic No: </strong>  KHF/FP1240001586/2024-25</p>
                    <p className="text-gray-500 text-sm"><strong> Seeds Lic No: </strong>  KHF/FSR240001647/2024-25	 </p>
                    <p className="text-gray-500 text-sm"> <strong> Ferlitizer Lic No: </strong> KHF/FFR240001682/2024-25 </p>
                    <p className="text-gray-500 text-sm">  Contact : 91000 29329/91000 29429 </p>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6  border-b pb-4">
                  <div>
                    <p className="text-gray-500">Location 2: Warehouse-1, Diu Road, </p>
                    <p className="text-gray-500">At: Kesariya - 362560, Ta.: Una,</p>
                    <p className="text-gray-500">  Dist.: Gir Somnath, Gujarat </p>
                    <p className="text-gray-500">  GST :  </p>

                  </div>

                  <div className="flex-1 text-right align-end self-end">
                    <p className="text-gray-500 text-sm"><strong> Pesticide Lic No: </strong> GRS/FP1230000664/2023-24 </p>
                    <p className="text-gray-500 text-sm"><strong> Seeds Lic No: </strong>  GRS/FSR230000774/2023-24	 </p>
                    <p className="text-gray-500 text-sm"> <strong> Ferlitizer Lic No: </strong> GRS/FFR230000775/2023-24 </p>
                    <p className="text-gray-500 text-sm"> E-mail: agribharat2023@gmail.com</p>
                  </div>
                </div>



                <div className="mb-6 grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold">Bill To:</p>
                    <p>{UserDataList?.customer?.customer_name}</p>
                    <p className="text-gray-600">  {UserDataList?.customer?.address}   </p>
                    <p className="text-gray-600">  {UserDataList?.customer?.district_name}, {UserDataList?.customer?.taluka_name}, {UserDataList?.customer?.village_name}  </p>
                    <p className="text-gray-600">  Contact : {UserDataList?.customer?.mobile_number}, {UserDataList?.customer?.alternate_number} </p>
                  </div>
                  <div className="text-right">
                    <p> <strong>Invoice :</strong> {UserDataList?.order_id}  </p>
                    <p> <strong>Invoice Date:</strong>  {moment(UserDataList?.added_at).format("DD-MM-YYYY")} </p>
                    {/* <p><strong>Due Date:</strong> {invoiceData.dueDate}</p> */}
                  </div>
                </div>
            </div>

            <div>
            <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-700 text-white">
                  <th className="border p-2 text-[0.9rem] text-left">Item Description</th>
                  <th className="border p-2 text-[0.9rem]">HSN</th>
                  <th className="border p-2 text-[0.9rem]">Batch</th>
                  <th className="border p-2 text-[0.9rem]">Rate</th>
                  <th className="border p-2 text-[0.9rem]">Qty</th>
                  <th className="border p-2 text-[0.9rem]">Amount</th>
                  <th className="border p-2 text-[0.9rem]">Dis</th>
                  <th className="border p-2 text-[0.9rem]">GST</th>
                  <th className="border p-2 text-[0.9rem]">Total</th>
                </tr>
              </thead>
              <tbody>
                {(UserDataList?.products ?? []).map((item: any, k: number) => (
                  <tr  key={k} className="border text-center bg-gray-50 hover:bg-gray-100 transition-all"  >
                    <td className="border p-2 text-[0.8rem] text-left w-[18rem] max-w-[18rem] whitespace-normal break-words"> <p> {item?.id?.name?.englishname} {item?.id?.packaging} {item?.id?.packagingtype?.type_eng} </p> <p>( {item?.id?.name?.gujaratiname}  {item?.id?.packaging} {item?.id?.packagingtype?.type_guj} )</p> </td>
                    <td className="border p-2 text-[0.8rem]">{item?.hsn_code}</td>
                    <td className="border p-2 text-[0.8rem]">{item?.batch_no}</td>
                    <td className="border p-2 text-[0.8rem]">{item?.price}</td>
                    <td className="border p-2 text-[0.8rem]">{item?.quantity}</td>
                    <td className="border p-2 text-[0.8rem]"> {item?.quantity * item?.price}  </td>
                    <td className="border p-2 text-[0.8rem]">{item?.discount}</td>
                    <td className="border p-2 text-[0.8rem]"> {((item?.quantity * item?.price - item?.discount) *  (item?.c_gst*2 / 100)).toFixed(2) } </td> 
                    <td className="border p-2 text-[0.8rem]"> {item?.quantity * item?.price -item?.discount   + (item?.quantity * item?.price -  item?.discount) *  (item?.c_gst*2 / 100)} </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-6  text-gray-700 flex ">
                <div className="flex-1">
                    <p className="text-[0.8rem]"> A/c Holder : AGRI BHARAT</p>   
                    <p className="text-[0.8rem]"> A/c No: 50200102495365   </p> 
                    <p className="text-[0.8rem]"> Bank: HDFC BANK   Branch: KAPADWANJ GUJARAT  </p>
                    <p className="text-[0.8rem]"> IFSC Code: HDFC0000748 </p>
                </div>
                <div className="flex-1 text-right">
                  <p className="text-lg">  <strong>Total Amout: </strong> ₹{finalsubtotal?.toFixed(2) ?? "0.00"}  </p>
                  <p className="text-lg"> <strong>Total Discount:</strong> ₹{finaldiscount?.toFixed(2) ?? "0.00"} </p>
                  <p className="text-lg"> <strong>Total gst :</strong> ₹{finalgst ? finalgst.toFixed(2): 0} </p>
                </div>
            </div>
            <p className="text-2xl font-bold bg-gray-700 text-white p-3 mt-3 text-right self-center"> Grand Total: ₹{total?.toFixed(2) ?? "0.00"}  </p>
            </div>

            <div className="mt-6 text-left text-gray-700">
              <p className="text-md">   <strong>Terms & Condition:</strong>  </p>
              <p className="text-[0.8rem]">  (1) All products are intended for lawful agricultural use only. </p>
              <p className="text-[0.8rem]">  (2) Product performance depends on factors like weather, soil, etc…, beyond our control. We are not accepting any liability for crop failure or reduced yield or quality. </p>
              <p className="text-[0.8rem]">  (3) The battery Pump and Torch have a limited warranty of 6 months for battery only. Do not use electric items while charging, use original adaptor and avoid overcharge or charge in low voltage as it may damage battery.  </p>
              <p className="text-[0.8rem]">  (4) All disputes are subject to the jurisdiction of Una or Kapadvanj. E & O.E  </p>

              <div className="flex-1 mt-5 "> 
                   <h6 className="text-[1.2rem]  text-gray-500 text-center">  🙏એગ્રી ભારતમાંથી ખરીદી કરવા બદલ આભાર ! 🙏 </h6>
                  <h6 className="text-[0.9rem]  text-gray-500 text-center flex justify-center gap-x-2 items-center "> Follow us on  <FaFacebookSquare />  <FaInstagram  />   <FaYoutube  /> <FaWhatsapp /> </h6>
              </div>
            </div>
            
          </div>

        </div>
      </NavbarSidebarLayout>
    </>
  );
};

export default OrdererDetailsPage;