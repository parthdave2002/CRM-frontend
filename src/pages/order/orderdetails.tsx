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

  const [UserDataList, setUserDataList] = useState([]);
  const { Orderlist } = useSelector((state: any) => ({
    Orderlist: state.Order.Orderlist,
  }));

  useEffect(() => {
    // setUserDataList(Orderlist ? Orderlist?.data[0] : null);
  }, [Orderlist]);
  //  ------------- Get User Data From Reducer Code Start --------------

  const invoiceData = {
    companyName: "Agri Bharat",
    companyAddress1: "Helmet circle, Memnagar",
    companyAddress2: "Ahmedabad, Gujarat,  380013",
    companyAddress3: "India",
    customerName: "Priyanka Patel",
    customerAddress1: "9 sector-22A Aadarshnagar society,",
    customerAddress2 :"Gandhinagar, Gujarat, 381524",
    customerAddress3 : "India",
    invoiceNumber: "INV-12",
    invoiceDate: "24-02-2025",
    dueDate: "Sep 04, 2021",
    items: [
      {  description: "AgroStar Roztam (Azoxystrobin 11% + Tebuconazole 18.3% SC) 250 ml", quantity: 2,gst: 180, rate: 1000 },
      {  description: "Humic Power 8X250 g (Humic & Fulvic Acid 50% min.) 2 kg Bucket", quantity: 1, gst: 90, rate: 500 },
    ],
  
  };

  const finalsubtotal = invoiceData.items.reduce((sum, item) => sum + item.quantity * item.rate , 0);
  const finalgst = invoiceData.items.reduce((sum, item) => sum + item.gst , 0);
  const total = finalsubtotal + finalgst;

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
    pdf.save(`Invoice_${invoiceData.invoiceNumber}.pdf`);
  };

  return (
    <>
      <NavbarSidebarLayout isFooter={false}  isSidebar={true} isNavbar={true} isRightSidebar={true}>
        <ExampleBreadcrumb  Name={Name} ParentName={ParentName} ParentLink ={ParentLink} />
        <div className="mt-[2rem] bg-gray-100 dark:bg-gray-800 p-4" >
        <div className="mb-4 flex justify-end">  <Button color="primary"  onClick={downloadPDF}>  <MdFileDownload  className="w-6 h-6"/> Download PDF </Button> </div>
          <div className="max-w-3xl mx-auto bg-white shadow-lg p-6 rounded-lg  font-sans" ref={invoiceRef}>
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <div>
                <img src={logo} alt="Company Logo" className="w-24" />
                <h2 className="text-xl font-bold mt-2">{invoiceData.companyName}</h2>
                <p className="text-gray-500">{invoiceData.companyAddress1}</p>
                <p className="text-gray-500">{invoiceData.companyAddress2}</p>
                <p className="text-gray-500">{invoiceData.companyAddress3}</p>

              </div>
              <h1 className="text-3xl font-bold text-gray-800">INVOICE</h1>
            </div>

            {/* Billing Information */}
            <div className="mb-6 grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Bill To:</p>
                <p>{invoiceData.customerName}</p>
                <p className="text-gray-600">{invoiceData.customerAddress1}</p>
                <p className="text-gray-600">{invoiceData.customerAddress2}</p>
                <p className="text-gray-600">{invoiceData.customerAddress3}</p>
              </div>
              <div className="text-right">
                <p><strong>Invoice#:</strong> {invoiceData.invoiceNumber}</p>
                <p><strong>Invoice Date:</strong> {invoiceData.invoiceDate}</p>
                {/* <p><strong>Due Date:</strong> {invoiceData.dueDate}</p> */}
              </div>
            </div>

            {/* Items Table */}
            <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-700 text-white">
                  <th className="border p-2 text-left">Item Description</th>
                  <th className="border p-2">Rate</th>
                  <th className="border p-2">Qty</th>
                  <th className="border p-2">Amount</th>
                  <th className="border p-2">GST</th>
                  <th className="border p-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.items.map((item:any, k:number) => (
                  <tr key={k} className="border text-center bg-gray-50 hover:bg-gray-100 transition-all">
                    <td className="border p-2 text-left w-[25rem] max-w-[25rem] whitespace-normal break-words">{item.description}</td>
                    <td className="border p-2">₹{item.rate.toFixed(2)}</td>
                    <td className="border p-2">{item.quantity}</td>
                    <td className="border p-2">₹{(item.quantity * item.rate).toFixed(2)}</td>
                    <td className="border p-2">₹{item.gst.toFixed(2)}</td>
                    <td className="border p-2">₹{(item.quantity * item.rate + item.gst).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Summary */}
            <div className="mt-6 text-right text-gray-700">
              <p className="text-lg"><strong>Sub Total:</strong> ₹{finalsubtotal.toFixed(2)}</p>
              <p className="text-lg"><strong>Total gst :</strong> ₹{finalgst.toFixed(2)}</p>
              <p className="text-2xl font-bold bg-gray-700 text-white p-3 mt-3">Grand Total: ₹{total.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </NavbarSidebarLayout>
    </>
  );
};

export default OrdererDetailsPage;