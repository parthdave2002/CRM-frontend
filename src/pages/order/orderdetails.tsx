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


 
const SingleData ={
    "success": true,
    "data": [
        {
            "_id": "67bf3fdd5cf3d06048080a1c",
            "products": [
                {
                    "quantity": 1,
                    "_id": "67bf3fdd5cf3d06048080a1d",
                    "id": {
                        "price": 1200,
                        "discount": 0,
                        "product_pic": null,
                        "batch_no": 0,
                        "hsn_code": 12345,
                        "s_gst": 0,
                        "c_gst": 0,
                        "avl_qty": 100,
                        "rating": 4,
                        "is_active": true,
                        "is_deleted": false,
                        "_id": "67b18c3c3345464ef8cee4bf",
                        "name": "AgroStar Sayani F1 Okra",
                        "description": "The information offered here is for reference only and depends exclusively on soil type and climatic conditions. Always refer to product labels and accompanying leaflets for complete product details and directions for use.",
                        "category": "67a6f5174a86d30a58c36be4",
                        "packaging": "6790b6d1de33ca5aa7416fc1",
                        "tech_name": "test",
                        "__v": 0,
                        "added_at": "2025-02-15T06:57:00.864Z"
                    }
                },
                {
                    "quantity": 1,
                    "_id": "67bf3fdd5cf3d06048080a1e",
                    "id": {
                        "price": 1200,
                        "discount": 0,
                        "product_pic": null,
                        "batch_no": 0,
                        "hsn_code": 12345,
                        "s_gst": 0,
                        "c_gst": 0,
                        "avl_qty": 100,
                        "rating": 4,
                        "is_active": true,
                        "is_deleted": false,
                        "_id": "67bcb98426bff3245039919d",
                        "name": "AgroStar Sayani F1 Okra test2",
                        "description": "The information offered here is for reference only and depends exclusively on soil type and climatic conditions. Always refer to product labels and accompanying leaflets for complete product details and directions for use.",
                        "category": "67a6f5174a86d30a58c36be4",
                        "packaging": "6790b6d1de33ca5aa7416fc1",
                        "tech_name": "test1",
                        "added_at": "2025-02-24T18:25:08.446Z",
                        "__v": 0
                    }
                }
            ],
            "customer": {
                "_id": "67b37415073f664ec018d91e",
                "customer_name": "Test"
            },
            "advisor_name": {
                "_id": "67b389afd593423df0e242a8",
                "name": "Akki kadiya"
            },
            "total_amount": 2400,
            "status": "confirmed",
            "order_id": "#AB-250226-0003",
            "added_at": "2025-02-26T16:22:53.707Z"
        }
    ],
    "msg": "Order data retrieved successfully"
}

  const invoiceData = {
    customerName: "Nagjibhai bhurabhai Chavda",
    customerAddress1: "9 sector-22A Aadarshnagar society,",
    customerAddress2 :"Gandhinagar, Gandhinagar, Ahmedabad, Gujarat, 381524",
    customercontact_no : "6351857907",
    invoiceNumber: "#AB-250226-0003",
    invoiceDate: "24-02-2025",
    dueDate: "Sep 04, 2021",
    // items: [
    //   {  description: "AgroStar Sayani F1 Okra test2", quantity: 2, gst:18 , rate: 1000, batch_no: 0, hsn_code: 12345, discount : 0  },
    //   {  description: "AgroStar Sayani F1 Okra test2", quantity: 1, gst: 18,  rate: 500, batch_no: 1000, hsn_code: 12345, discount : 1000 },
    // ],
    products: [
                {
                    "quantity": 1,
                    "_id": "67bf3fdd5cf3d06048080a1d",
                    "id": {
                        "price": 1200,
                        "discount": 100,
                        "product_pic": null,
                        "batch_no": 0,
                        "hsn_code": 12345,
                        "s_gst": 0,
                        "c_gst": 18,
                        "avl_qty": 100,
                        "rating": 4,
                        "is_active": true,
                        "is_deleted": false,
                        "_id": "67b18c3c3345464ef8cee4bf",
                        "name": "AgroStar Sayani F1 Okra",
                        "description": "The information offered here is for reference only and depends exclusively on soil type and climatic conditions. Always refer to product labels and accompanying leaflets for complete product details and directions for use.",
                        "category": "67a6f5174a86d30a58c36be4",
                        "packaging": "6790b6d1de33ca5aa7416fc1",
                        "tech_name": "test",
                        "__v": 0,
                        "added_at": "2025-02-15T06:57:00.864Z"
                    }
                },
                {
                    "quantity": 1,
                    "_id": "67bf3fdd5cf3d06048080a1e",
                    "id": {
                        "price": 1200,
                        "discount": 0,
                        "product_pic": null,
                        "batch_no": 0,
                        "hsn_code": 12345,
                        "s_gst": 0,
                        "c_gst": 18,
                        "avl_qty": 100,
                        "rating": 4,
                        "is_active": true,
                        "is_deleted": false,
                        "_id": "67bcb98426bff3245039919d",
                        "name": "AgroStar Sayani F1 Okra test2",
                        "description": "The information offered here is for reference only and depends exclusively on soil type and climatic conditions. Always refer to product labels and accompanying leaflets for complete product details and directions for use.",
                        "category": "67a6f5174a86d30a58c36be4",
                        "packaging": "6790b6d1de33ca5aa7416fc1",
                        "tech_name": "test1",
                        "added_at": "2025-02-24T18:25:08.446Z",
                        "__v": 0
                    }
                }
    ],
  
  };

  const finalsubtotal = invoiceData.products.reduce((sum, item) => sum + item.quantity * item?.id?.price , 0);
  const finaldiscount = invoiceData.products.reduce((sum, item) => sum +  item?.id?.discount , 0);
  const finalgst = invoiceData.products.reduce((sum, item) => sum +  (item?.quantity * item?.id?.price-item?.id?.discount)*(item?.id?.c_gst/100)  , 0);
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
          <div className="max-w-3xl min-h-[11.69rem] max-h-min-h-[11.69rem] mx-auto bg-white shadow-lg py-6 px-3 rounded-lg  font-sans" ref={invoiceRef}>
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <div>
                <img src={logo} alt="Company Logo" className="w-24" />
                <h2 className="text-xl font-bold mt-2">Agri Bharat</h2>
                <p className="text-gray-500">Shop-1, Ravi Shopping Center,</p>
                <p className="text-gray-500">Opp. New bus stand</p>
                <p className="text-gray-500">Kapadwanj, Kehda, Gujarat, 387620</p>
                <p className="text-gray-500">Contact : 9621696200, 9621696200</p>
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
                <p className="text-gray-600">Contact :{invoiceData.customercontact_no}</p>
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
                  <th className="border p-2">HSN</th>
                  <th className="border p-2">Batch</th>
                  <th className="border p-2">Rate</th>
                  <th className="border p-2">Qty</th>
                  <th className="border p-2">Amount</th>
                  <th className="border p-2">Dis.</th>
                  <th className="border p-2">GST</th>
                  <th className="border p-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.products.map((item:any, k:number) => (
                  <tr key={k} className="border text-center bg-gray-50 hover:bg-gray-100 transition-all">
                    <td className="border p-2 text-left w-[25rem] max-w-[25rem] whitespace-normal break-words">{item?.id?.name}</td>
                    <td className="border p-2">{item?.id?.hsn_code}</td>
                    <td className="border p-2">{item?.id?.batch_no}</td>
                    <td className="border p-2">{item?.id?.price}</td>
                    <td className="border p-2">{item?.quantity}</td>
                    <td className="border p-2">{(item?.quantity * item?.id?.price)}</td>
                    <td className="border p-2">{item?.id?.discount}</td>
                    <td className="border p-2">{(item?.quantity * item?.id?.price-item?.id?.discount)*(item?.id?.c_gst/100) }</td>
                    <td className="border p-2">₹{(item?.quantity * item?.id?.price) +  (item?.quantity * item?.id?.price-item?.id?.discount)*(item?.id?.c_gst/100)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-6 text-right text-gray-700">
              <p className="text-lg"><strong>Sub Total: </strong> ₹{finalsubtotal.toFixed(2)}</p>
              <p className="text-lg"><strong>Total Discount:</strong> ₹{finaldiscount.toFixed(2)}</p>
              <p className="text-lg"><strong>Total gst :</strong> ₹{finalgst.toFixed(2)}</p>
              <p className="text-2xl font-bold bg-gray-700 text-white p-3 mt-3">Grand Total: ₹{total.toFixed(2)}</p>
            </div>

            <div className="mt-6 text-left text-gray-700">
              <p className="text-md"><strong>Terms & Condition:</strong></p>
              <p className="text-[0.8rem]">(1) Pesticides and seeds are for agriculture use only.</p>
              <p className="text-[0.8rem]">(1) Pesticides and seeds are for agriculture use only.</p>
              <p className="text-[0.8rem]">(1) Pesticides and seeds are for agriculture use only.</p>
              <p className="text-[0.8rem]">(1) Pesticides and seeds are for agriculture use only.</p>
              <p className="text-[0.8rem]">(1) Pesticides and seeds are for agriculture use only.</p>


             
             
            </div>
          </div>
        </div>
      </NavbarSidebarLayout>
    </>
  );
};

export default OrdererDetailsPage;