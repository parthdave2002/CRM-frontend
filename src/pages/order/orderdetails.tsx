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
import { FaPrint } from "react-icons/fa6";

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
    firstname: string;
    middlename: string;
    lastname: string;
    customer_name : string;
    district_name: string;
    mobile_number : number;
    alternate_number : number;
    pincode : string;
    taluka_name:string;
    village_name : string;
    state :any;
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
    coupon : any;
  }

  const [UserDataList, setUserDataList] = useState<OrderDetailsType | null>( null);
  const  Orderlist  = useSelector((state: any) =>  state.Order.Orderlist);

  useEffect(() => {
    setUserDataList(Orderlist ? Orderlist[0] : null);
  }, [Orderlist]);
  //  ------------- Get User Data From Reducer Code Start --------------

  const finalsubtotal = (UserDataList?.products ?? []).reduce( (sum, item:any) => sum + item?.quantity *( item?.id?.price - item?.id?.discount ),  0 );
  const finaldiscount = (UserDataList?.products ?? []).reduce( (sum, item:any) => sum + (item?.id?.discount *  item?.quantity ),  0 );
  const finalgst = (UserDataList?.products ?? []).reduce( (sum, item:any) => sum + (item?.quantity * (item?.id?.price - item?.id?.discount)) * ((item?.id?.c_gst * 2) / 100), 0 );
  const grandtotal = finalsubtotal + finalgst;
  const totalBeforeCoupon = finalsubtotal + finalgst;
  const total = Math.max(0, totalBeforeCoupon - (UserDataList?.coupon?.amount ?? 0));
  // const total = finalsubtotal + finalgst - (UserDataList?.coupon?.amount )  ;

  let Name = "Order Details";
  let ParentName = "Order List";
  let ParentLink = "/order/list";

  // ---------- Invoice Pagination start ------------
  // Show exactly 6 products per page and generate new pages with the same layout
  const ITEMS_PER_PAGE = 6;

  const chunkProducts = (products: any[], pageSize: number) => {
    const chunks: any[] = [];
    for (let i = 0; i < products.length; i += pageSize) {
      chunks.push(products.slice(i, i + pageSize));
    }
    return chunks;
  };

  const products = UserDataList?.products || [];
  const productChunks = chunkProducts(products, ITEMS_PER_PAGE);

  // ---------- Invoice Pagination end ------------

  const downloadPDF = async () => {
    const input = invoiceRef.current;
    if (!input) return;
    // Capture each page element separately to avoid slicing/clipping issues
    const pages = Array.from(input.children) as HTMLElement[];
    if (pages.length === 0) return;

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidthMM = pdf.internal.pageSize.getWidth();

    for (let i = 0; i < pages.length; i++) {
      const pageEl = pages[i];
      // use a slightly higher scale for better quality, but keep size reasonable
      const pageCanvas = await html2canvas(pageEl, { scale: 2, useCORS: true, allowTaint: false });
      const imgData = pageCanvas.toDataURL('image/jpeg', 0.95);

      const pxPerMM = pageCanvas.width / pageWidthMM;
      const imgHeightMM = pageCanvas.height / pxPerMM;

      if (i > 0) pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, 0, pageWidthMM, imgHeightMM);
    }

    pdf.save(`Invoice_${UserDataList?.order_id}.pdf`);
};

  const printPDF = async () => {
    if (!invoiceRef.current) return;

    const input = invoiceRef.current;
    // Capture each page element separately and build a PDF
    const pages = Array.from(input.children) as HTMLElement[];
    if (pages.length === 0) return;

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidthMM = pdf.internal.pageSize.getWidth();

    for (let i = 0; i < pages.length; i++) {
      const pageEl = pages[i];
      const pageCanvas = await html2canvas(pageEl, { scale: 2, useCORS: true, allowTaint: false });
      const imgData = pageCanvas.toDataURL('image/png', 0.95);

      const pxPerMM = pageCanvas.width / pageWidthMM;
      const imgHeightMM = pageCanvas.height / pxPerMM;

      if (i > 0) pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, 0, pageWidthMM, imgHeightMM);
    }

    const blob = pdf.output('blob');
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, '_blank');
  }

  return (
    <>
      <NavbarSidebarLayout isFooter={false}  isSidebar={true} isNavbar={true} isRightSidebar={true}  >
        <ExampleBreadcrumb  Name={Name}  ParentName={ParentName}  ParentLink={ParentLink}  />
        <div className="mt-[2rem] bg-gray-100 dark:bg-gray-800 p-4">
          <div className="mb-4 flex justify-end gap-x-3">
            <Button color="primary" onClick={printPDF} >  <FaPrint  className="w-4 h-6 mx-2" /> <div className="text-[1rem]"> Print Invoice </div>   </Button>
            <Button color="primary" onClick={downloadPDF} >  <MdFileDownload className="w-6 h-6" /> <div className="text-[1rem]"> Download PDF </div>   </Button>
          </div>
         
          <div ref={invoiceRef}>
             {productChunks.map((productChunk, pageIndex) => {
               return(
              <div key={pageIndex}
                style={{ width: "794px", height: "1123px", pageBreakAfter: pageIndex === productChunks.length - 1 ? 'auto' : 'always' }}
                className="mx-auto bg-white shadow-lg p-6 rounded-lg flex flex-col justify-between font-sans page-break mt-3"
              >
                  {/* --- Static Top Content --- */}
                  <div className="flex flex-col">
                    <div className="text-center mb-2">
                      <h6 className="text-[0.9rem]  text-gray-500 ">  એગ્રી ભારત કંપનીમાંથી 100% ખાતરીબંધ બ્રાન્ડેડ કૃષિ પ્રોડક્ટ ઘરે બેઠા ઓર્ડર કરવા અને ખેતીને લગતી વધુ માહિતી માટે  </h6>
                      <h6 className="text-[0.9rem]  text-gray-500 ">  હેલ્પલાઇન નંબર 9100029429/9100029329 પર સંપર્ક કરો!!!  જય કિસાન  </h6>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                      <img src={logo} alt="Company Logo" className="w-24" />
                      <h1 className="text-3xl font-bold text-gray-800 text-right">INVOICE</h1>
                    </div>

                    <div className="flex justify-between items-center mb-4 border-b pb-4">
                      <div>
                        <p className="text-gray-500 text-[0.9rem]"> Warehouse-1, Diu Road, </p>
                        <p className="text-gray-500 text-[0.9rem]">At: Kesariya - 362560, Ta.: Una,</p>
                        <p className="text-gray-500 text-[0.9rem]">  Dist.: Gir Somnath, Gujarat </p>
                        <p className="text-gray-500 text-[0.9rem]">  GST :  </p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-500 text-sm"><strong> Pesticide Lic No: </strong> GRS/FP1230000664/2023-24 </p>
                        <p className="text-gray-500 text-sm"><strong> Seeds Lic No: </strong>  GRS/FSR230000774/2023-24	 </p>
                        <p className="text-gray-500 text-sm"> <strong> Ferlitizer Lic No: </strong> GRS/FFR230000775/2023-24 </p>
                        <p className="text-gray-500 text-sm"> E-mail: agribharat2023@gmail.com</p>
                        <p className="text-gray-500 text-sm"> Contact : 91000 29329/91000 29429 </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 mb-4">
                      <div>
                        <p className="font-semibold">Bill To:</p>
                        <p>{UserDataList?.customer?.firstname} {UserDataList?.customer?.middlename} {UserDataList?.customer?.lastname}</p>
                        <p className="text-gray-600 text-[0.9rem]">  {UserDataList?.customer?.address}   </p>
                        <p className="text-gray-600 text-[0.9rem]">  {UserDataList?.customer?.village_name}, {UserDataList?.customer?.taluka_name},  {UserDataList?.customer?.district_name},  </p>
                        <p className="text-gray-600 text-[0.9rem]">  {UserDataList?.customer?.state?.name} -  {UserDataList?.customer?.pincode}  </p>
                        <p className="text-gray-600 text-[0.9rem]">  Contact : {UserDataList?.customer?.mobile_number}, {UserDataList?.customer?.alternate_number} </p>
                      </div>
                      <div className="text-right">
                        <p><strong>Invoice:</strong> {UserDataList?.order_id}</p>
                        <p><strong>Date:</strong> {moment(UserDataList?.added_at).format("DD-MM-YYYY")}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 overflow-hidden">
                    <table className="w-full border border-gray-300">
                      <thead className="bg-gray-700 text-white">
                        <tr>
                          {["Item Description", "HSN", "Batch", "Rate", "Dis", "Qty", "Amount", "GST", "Total"].map((h, i) => (
                            <th key={i} className="border p-2 text-[0.8rem]">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {productChunk.map((item:any, k:any) => {
                          const amount = item?.quantity * (item?.price -  item?.discount) ;
                          const gst = ((amount) * (item?.c_gst * 2 / 100));
                          const total = amount + gst;
                          return (
                            <tr key={k} className="bg-gray-50 text-center text-[0.8rem]">
                              <td className="border p-2 text-left break-words">{item?.id?.name?.englishname} ({item?.id?.packaging} {item?.id?.packagingtype?.type_eng})</td>
                              <td className="border p-2">{item?.hsn_code}</td>
                              <td className="border p-2">{item?.batch_no}</td>
                              <td className="border p-2">{item?.price}</td>
                              <td className="border p-2">{item?.discount}</td>
                              <td className="border p-2">{item?.quantity}</td>
                              <td className="border p-2">{amount}</td>
                              <td className="border p-2">{Math.round(gst)}</td>
                              <td className="border p-2">{Math.round(total)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Terms & Conditions + signature/social block for non-last pages (footer). On last page it will render after totals. */}
                  {pageIndex !== productChunks.length - 1 && (
                    <>
                      <div className="mt-4 text-[0.8rem] text-gray-700">
                        <div className="flex justify-between"> 
                          <div className="text-[1.2rem]" ><strong>Terms & Conditions:</strong>  </div>
                          <img src="/images/authentication/signature.webp" className="mb-3 border-b border-dashed border-gray-400 pb-1 w-[8rem] h-[3rem]" /> 
                        </div>
                        <p className="text-[0.8rem]">  (1) All products are intended for lawful agricultural use only. </p>
                        <p className="text-[0.8rem]">  (2) Product performance depends on various external factors such as weather, soil conditions, and application methods. The company will not be responsible for crop failure, yield reduction, or quality issues and the company will not compensate for any losses. </p>
                        <p className="text-[0.8rem]">  (3) The battery Pump and Torch have a limited warranty of 6 months for only battery. Do not use electric items while in charging, use only the original adaptor, don't overcharge and avoid charging in low voltage as it may damage battery.  </p>
                        <p className="text-[0.8rem]">  (4) All disputes are subject to the jurisdiction of Una or Kapadvanj. E & O.E  </p>
                      </div>

                      <div className="mt-4 text-center text-gray-600">
                        <h6 className="text-[1rem] leading-none">
                            <span role="img" aria-label="pray" className="mr-1">🙏</span>
                            એગ્રી ભારતમાંથી ખરીદી કરવા બદલ આભાર !
                            <span role="img" aria-label="pray" className="ml-1">🙏</span>
                          </h6>
                        <div className="flex justify-center items-center gap-x-3 mt-3 text-[0.9rem]"> 
                          <img src="/images/products/facebook.png" className="w-5 h-5  align-middle" alt="Facebook" /> 
                          <img src="/images/products/instagram.png"  className="w-6 h-6  align-middle" alt="Insta" /> 
                          <img src="/images/products/whatsapp.png"  className="w-6 h-6  align-middle" alt="WhatsApp" /> 
                          <img src="/images/products/youtube.png"  className="w-6 h-6  align-middle" alt="Youtube" /> 
                          <img src="/images/products/website.png"   className="w-5 h-5  align-middle" alt="Website" />  
                        </div>
                      </div>
                    </>
                  )}

                  {/* Footer (only on last page) with account & totals */}
                  {pageIndex === productChunks.length - 1 && (
                    <>
                      <div className="mt-4 flex">
                        <div className="flex-1 text-[0.8rem]">
                          <p>A/c Holder: AGRI BHARAT</p>
                          <p>A/c No: 50200102495365</p>
                          <p>Bank: HDFC BANK, KAPADWANJ</p>
                          <p>IFSC: HDFC0000748</p>
                        </div>

                        <div className="flex-1 text-[1rem]">
                          <div className="space-y-1">
                            {/* Row */}
                            <div className="py-2">
                              <div className="flex justify-between">
                                <div className="flex">
                                  <p className="w-[6rem]"><strong> Discount</strong></p>
                                  <span className="mx-1">:</span>
                                </div>
                                <p>₹{Math.round(finaldiscount) ?? 0}</p>
                              </div>

                              <div className="flex justify-between">
                                <div className="flex">
                                  <p className="w-[6rem]"><strong>Sub Total</strong></p>
                                  <span className="mx-1">:</span>
                                </div>
                                <p>₹{Math.round(finalsubtotal) ?? 0}</p>
                              </div>

                              <div className="flex justify-between">
                                <div className="flex">
                                  <p className="w-[6rem]"><strong>Tax</strong></p>
                                  <span className="mx-1">:</span>
                                </div>
                                <p>+ ₹{Math.round(finalgst) ?? 0 }</p>
                              </div>
                            </div>

                            {/* Coupon Section */}
                            {UserDataList?.coupon && (
                              <div className="border-t border-dashed border-gray-400 py-2 space-y-1">
                                <div className="flex justify-between">
                                  <div className="flex">
                                    <p className="w-[6rem]"><strong>Grand Total</strong></p>
                                    <span className="mx-1">:</span>
                                  </div>
                                  <p>₹{Math.round(grandtotal) ?? 0 }</p>
                                </div>

                                <div className="flex justify-between">
                                  <div className="flex">
                                    <p className="w-[6rem]"><strong>Coupon</strong></p>
                                    <span className="mx-1">:</span>
                                  </div>
                                  <p>- ₹{UserDataList?.coupon?.amount ? Math.round(UserDataList?.coupon?.amount) : 0}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                      </div>

                      <div className="text-2xl font-bold bg-gray-700 text-white px-3 py-2  text-right  leading-tight antialiased">Total : ₹{total ? Math.round(total) : 0}</div>

                      {/* Terms & Conditions + signature/social block AFTER totals on last page */}
                      <div className="mt-4 text-[0.8rem] text-gray-700">
                        <div className="flex justify-between"> 
                          <div className="text-[1.2rem]" ><strong>Terms & Conditions:</strong>  </div>
                          <img src="/images/authentication/signature.webp" className="mb-3 border-b border-dashed border-gray-400 pb-1 w-[8rem] h-[3rem]" /> 
                        </div>
                        <p className="text-[0.8rem]">  (1) All products are intended for lawful agricultural use only. </p>
                        <p className="text-[0.8rem]">  (2) Product performance depends on various external factors such as weather, soil conditions, and application methods. The company will not be responsible for crop failure, yield reduction, or quality issues and the company will not compensate for any losses. </p>
                        <p className="text-[0.8rem]">  (3) The battery Pump and Torch have a limited warranty of 6 months for only battery. Do not use electric items while in charging, use only the original adaptor, don't overcharge and avoid charging in low voltage as it may damage battery.  </p>
                        <p className="text-[0.8rem]">  (4) All disputes are subject to the jurisdiction of Una or Kapadvanj. E & O.E  </p>
                      </div>

                      <div className="mt-4 text-center text-gray-600">
                        <h6 className="text-[1rem] leading-none">
                            <span role="img" aria-label="pray" className="mr-1">🙏</span>
                            એગ્રી ભારતમાંથી ખરીદી કરવા બદલ આભાર !
                            <span role="img" aria-label="pray" className="ml-1">🙏</span>
                          </h6>
                        <div className="flex justify-center items-center gap-x-3 mt-3 text-[0.9rem]"> 
                          <img src="/images/products/facebook.png" className="w-5 h-5  align-middle" alt="Facebook" /> 
                          <img src="/images/products/instagram.png"  className="w-6 h-6  align-middle" alt="Insta" /> 
                          <img src="/images/products/whatsapp.png"  className="w-6 h-6  align-middle" alt="WhatsApp" /> 
                          <img src="/images/products/youtube.png"  className="w-6 h-6  align-middle" alt="Youtube" /> 
                          <img src="/images/products/website.png"   className="w-5 h-5  align-middle" alt="Website" />  
                        </div>
                      </div>
                    </>
                  )}
                </div>
                )
              })}
          </div>

        </div>
      </NavbarSidebarLayout>
    </>
  );
};

export default OrdererDetailsPage;