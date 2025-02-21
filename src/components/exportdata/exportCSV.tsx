import React, { FC, useState, useEffect } from "react";
import {  Dropdown } from "flowbite-react";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import * as XLSX from "xlsx";
interface IExportDataModalProps {
  data: any;
  name: string;
  endpoint?: string;
  status?:string;
  startDate?:string | null;
  endDate?:string | null;
}

interface Payload {
  page?: number;
  limit?: number;
}

const ExportDataModal: FC<IExportDataModalProps> = ({
  data,
  name,
  status,
  startDate,
  endDate,
  ...rest
}) => {
  const [download, setDownload] = useState<string>("");

  const exportdata: any = data;

  const formatDataModuleWise=(exportData:any,name:string)=>{
    let arr:any=[];
    if(name=="user"){
      exportData.map((data:any)=>{
        arr.push({
          "Name":(data && data?.name)?data?.name:'N/A',
          "Email":(data && data?.email) ? data?.email:'N/A',
          "Gender":(data && data?.gender) ? data?.gender:'N/A',
          "Mobile No":(data && data?.mobile_no) ? data?.mobile_no:'N/A',
          "Date of joining":(data && data?.date_of_joining) ? data?.date_of_joining:'N/A',
          "Date of birth":(data && data?.date_of_birth) ? data?.date_of_birth:'N/A',
          "Status":(data && data?.is_active) ? data?.is_active:'N/A',
          "Created at":(data && data?.created_at) ? data?.created_at:'N/A',
        })
      })
    } else if(name=="customer"){
        exportData.map((data:any)=>{
          arr.push({
            "Name":(data && data?.name)?data?.name:'N/A',
            "Role Details":(data && data?.description)?data?.description:'N/A',
            "Status":(data && data?.status) ? data?.status:'N/A',
            "Created at":(data && data?.created_at) ? data?.created_at:'N/A',
          })
        })
    } else if(name=="product"){
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
            "Name":(data && data?.name)?data?.name:'N/A',
            "Email":(data && data?.email) ? data?.email:'N/A',
            "Role":(data && data?.role_details?.name) ? data?.role_details?.name:'N/A',
            "Status":(data && data?.status) ? data?.status:'N/A',
            "Last login":(data && data?.last_logged) ? data?.last_logged:'N/A',
          })
        })
    } 
    return arr;
  }
  
  useEffect(() => {
    if (exportdata?.data?.length && Array.isArray(exportdata?.data)) {
      if (download === "csv") {
        const data= formatDataModuleWise(exportdata?.data,name)
        const csv = Papa.unparse(data); // Use Redux data directly
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        saveAs(blob, `${name}.csv`);
      } else if (download === "excel") {
        const data= formatDataModuleWise(exportdata?.data,name)
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
        XLSX.writeFile(workbook, `${name}.xlsx`);
      }
      setDownload(""); 
    }
  }, [exportdata, download]); 

  const fetchData = async (method = "") => {
    setDownload(method); // Set the download type
  };

  return (
    <>
        <Dropdown inline label="Export">
          <Dropdown.Item onClick={() => fetchData("csv")}>Export CSV</Dropdown.Item>
          <Dropdown.Item onClick={() => fetchData("excel")}>Export Excel</Dropdown.Item>  
        </Dropdown>
    </>
  );
};

export default ExportDataModal;
