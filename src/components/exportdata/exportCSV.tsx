import React, { FC, useState, useEffect } from "react";
import {  Dropdown } from "flowbite-react";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getExportDatalist,ResetExportDatalist } from "../../Store/actions";
interface IExportDataModalProps {
  data: any;
  name: string;
  endpoint?: string;
  status?:string;
  startDate?:string | null;
  endDate?:string | null;
}

const ExportDataModal: FC<IExportDataModalProps> = ({
  data,
  name,
  status,
  startDate,
  endDate,
  ...rest
}) => {
  const dispatch = useDispatch()
  const [download, setDownload] = useState<string>("");

    const  exportdata  = useSelector((state: any) => state.ExportData.ExportDatalist);

  const formatDataModuleWise=(exportData:any,name:string)=>{
    let arr:any=[];
    if(name === "advisor"){
      exportData.map((data:any)=>{
        arr.push({
          "Name":(data && data?.name)?data?.name:'N/A',
          "Email":(data && data?.email) ? data?.email:'N/A',
          "Gender":(data && data?.gender) ? data?.gender:'N/A',
          "Mobile No":(data && data?.mobile_no) ? data?.mobile_no:'N/A',
          "Role":(data && data?.role?.role_title) ? data?.role?.role_title:'N/A',
          "Date of joining":(data && data?.date_of_joining) ? data?.date_of_joining:'N/A',
          "Date of birth":(data && data?.date_of_birth) ? data?.date_of_birth:'N/A',
          "Address": (data && data?.address ) ? data?.address : 'N/A',
          "Emergency contact person":(data && data?.emergency_contact_person) ? data?.emergency_contact_person : 'N/A',
          "Emergency mobile": (data && data?.emergency_mobile_no) ? data?.emergency_mobile_no : 'N/A',
          "Addhar card": (data && data?.aadhar_card) ? data?.aadhar_card == true ?  "Yes" : "No" : 'N/A',
          "Pan card": (data && data?.pan_card) ? data?.pan_card == true ?  "Yes" : "No" : 'N/A',
          "Bank Passbook": (data && data?.bank_passbook) ? data?.bank_passbook == true ?  "Yes" : "No" : 'N/A',
          "Status":(data && data?.is_active) ? data?.is_active == true ? "Active" : "Deactive" :'N/A',
          "Created Date":(data && data?.added_at) ?  moment(data?.added_at).format("DD-MM-YYYY") : 'N/A',
        })
      })
    } else if(name=="farmer"){
        exportData.map((data:any)=>{
          arr.push({
            "Name":(data && data?.firstname)? [data.firstname, data.middlename, data.lastname].filter(Boolean).join(' ') : 'N/A',
            "Mobile":(data && data?.mobile_number) ? data?.mobile_number : 'N/A',
            "Alternate mobile":(data && data?.alternate_number) ? data?.alternate_number : 'N/A',
            "Crop":(data && data?.crops) ? data.crops.map((crop:any) => crop.name_eng).join(', ') : 'N/A',
            "Address":(data && data?.address) ? data?.address : 'N/A',
            "District":(data && data?.district?.name) ? data?.district?.name : 'N/A',
            "Taluka":(data && data?.taluka?.name) ? data?.taluka?.name : 'N/A',
            "Village":(data && data?.village?.name) ? data?.village?.name : 'N/A',
            "Pincode":(data && data?.pincode) ? data?.pincode : 'N/A',
            "Postoffice":(data && data?.post_office) ? data?.post_office : 'N/A',
            "Land area":(data && data?.land_area)?data?.land_area : 'N/A',
            "Land type":(data && data?.land_type)?data?.land_type : 'N/A',
            "Irrigation source":(data && data?.irrigation_source) ? data?.irrigation_source : 'N/A',
            "Irrigation type":(data && data?.irrigation_type) ? data?.irrigation_type : 'N/A',
            "Heard about agribharat":(data && data?.heard_about_agribharat) ? data?.heard_about_agribharat : 'N/A',
            "Refrence":(data && data?.ref_name) ? data?.ref_name : 'N/A',
            "Created Date":(data && data?.added_at) ? moment(data?.added_at).format("DD-MM-YYYY") : 'N/A',
            "Created by":(data && data?.created_by?.name) ? data?.created_by?.name:'N/A',
          })
        })
    } else if(name=="lead"){
        exportData.map((data:any)=>{
          arr.push({
            "Title":(data && data?.title)?data?.title:'N/A',
            "Status":(data && data?.status) ? data?.status:'N/A',
            "Created at":(data && data?.created_at) ? data?.created_at:'N/A',
          })
        })
    } else if(name=="order"){
        exportData.map((data:any)=>{
          arr.push({
            "Order id":(data && data?.order_id)? data?.order_id : '-',
            "Farmer name": data && data.customer ? [  data.customer.firstname,  data.customer.middlename,  data.customer.lastname ].filter(Boolean).join(" ")  : '-',
            "Address":(data && data?.customer?.address) ? data?.customer?.address : '-',
            "District":(data && data?.customer?.district?.name) ? data?.customer?.district?.name : '-',
            "Taluka":(data && data?.customer?.taluka?.name) ? data?.customer?.taluka?.name : '-',
            "Village":(data && data?.customer?.village?.name) ? data?.customer?.village?.name : '-',
            "Pincode":(data && data?.customer?.pincode) ? data?.customer?.pincode : '-',
            "Post office":(data && data?.customer?.post_office) ? data?.customer?.post_office : '-',
            "Mobile":(data && data?.customer?.mobile_number) ? data?.customer?.mobile_number : '-',
            "Alternate Mobile":(data && data?.customer?.alternate_number) ? data?.customer?.alternate_number : '-',
            "Products / Packing / Quantity":(data &&  data?.products?.length) ?  
            data.products
                .map((p:any) => {
                  const name = p?.id?.name?.englishname || '';
                  const pack = p?.id?.packaging || '';
                  const packType = p?.id?.packagingtype?.type_eng || '';
                  return `${name} (${pack} ${packType})`;
                })
                .join(', ') 
            : '-',
            "Coupon code":(data && data?.coupon?.name) ? data?.coupon?.name : '-',
            "Discount amount":(data && data?.coupon?.amount) ? data?.coupon?.amount : '-',
            "Final  amount ":(data && data?.total_amount) ? data?.total_amount : '-',
            "Advisor Name":(data && data?.advisor_name?.name) ? data?.advisor_name?.name : '-',
            "Status":(data && data?.status) ? data?.status : '-',
            "Order date":(data && data?.added_at) ?  moment(data?.added_at).format("DD-MM-YYYY") : 'N/A',
          })
        })
    } 
    return arr;
  }
  
  useEffect(() => {
    if (exportdata?.length && Array.isArray(exportdata)) {
      if (download === "csv") {
        const data= formatDataModuleWise(exportdata,name)
        const csv = Papa.unparse(data); // Use Redux data directly
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        saveAs(blob, `${name}.csv`);
      } else if (download === "excel") {
        const data= formatDataModuleWise(exportdata,name)
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "advisor");
        XLSX.writeFile(workbook, `${name}.xlsx`);
      }
      setDownload(""); 
      dispatch(ResetExportDatalist());
    }
  }, [exportdata, download]); 

  const fetchData = async (method = "") => {

     const reqUserData = {
          ...(endDate && { endDate: endDate }),
          ...(startDate && { startDate: startDate }),
          type: name,
      };

    dispatch(getExportDatalist(reqUserData));
    setDownload(method); // Set the download type
  };

  return (
    <>
        <Dropdown inline={false} label="Export" className="bg-blue-600 text-white font-medium rounded-lg  focus:ring-2 focus:ring-blue-400">
          <Dropdown.Item onClick={() => fetchData("csv")}>Export CSV</Dropdown.Item>
          <Dropdown.Item onClick={() => fetchData("excel")}>Export Excel</Dropdown.Item>  
        </Dropdown>
    </>
  );
};

export default ExportDataModal;
