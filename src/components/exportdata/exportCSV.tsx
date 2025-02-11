import React, { FC, useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import {  Dropdown } from "flowbite-react";
// import { Button, Tooltip, Dropdown } from "antd";
import Tooltips from "../../components/tooltip";
import ExportUser from "../../assests/images/export-csv.svg";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { ResetExportDatalist, getExportDatalist } from "../../Store/actions";
import { useSelector, useDispatch } from "react-redux";
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
  const dispatch: any = useDispatch();

  const exportdata: any = useSelector(
    (state: any) => state?.exportdatalist?.data?.data || []
  );

  const formatDataModuleWise=(exportData:any,name:string)=>{
    let arr:any=[];
    if(name=="user-data"){
      exportData.map((data:any)=>{
        arr.push({
          "Name":(data && data?.name)?data?.name:'N/A',
          "Email":(data && data?.email) ? data?.email:'N/A',
          "Phone":(data && data?.mobile_number) ? data?.mobile_number:'N/A',
          "City":(data && data?.search_address?.city) ? data?.search_address?.city:'N/A',
          "Country Code":(data && data?.country_code) ? data?.country_code:'N/A',
          "Status":(data && data?.status) ? data?.status:'N/A',
          "Created at":(data && data?.created_at) ? data?.created_at:'N/A',
        })
      })
    } else if(name=="role-data"){
        exportData.map((data:any)=>{
          arr.push({
            "Name":(data && data?.name)?data?.name:'N/A',
            "Role Details":(data && data?.description)?data?.description:'N/A',
            "Status":(data && data?.status) ? data?.status:'N/A',
            "Created at":(data && data?.created_at) ? data?.created_at:'N/A',
          })
        })
    } else if(name=="cms"){
        exportData.map((data:any)=>{
          arr.push({
            "Title":(data && data?.title)?data?.title:'N/A',
            "Status":(data && data?.status) ? data?.status:'N/A',
            "Created at":(data && data?.created_at) ? data?.created_at:'N/A',
          })
        })
    } else if(name=="subadmin-data"){
        exportData.map((data:any)=>{
          arr.push({
            "Name":(data && data?.name)?data?.name:'N/A',
            "Email":(data && data?.email) ? data?.email:'N/A',
            "Role":(data && data?.role_details?.name) ? data?.role_details?.name:'N/A',
            "Status":(data && data?.status) ? data?.status:'N/A',
            "Last login":(data && data?.last_logged) ? data?.last_logged:'N/A',
          })
        })
    } else if(name=="questionnaire-data"){
        exportData.map((data:any)=>{
          arr.push({
            "Name":(data && data?.name)?data?.name:'N/A',
            "Created at":(data && data?.created_at) ? data?.created_at:'N/A',
          })
        })
    } else if(name=="block-reason-data"){
      exportData.map((data:any)=>{
        arr.push({
          "Title":(data && data?.title)?data?.title:'N/A',
          "Description":(data && data?.description) ? data?.description:'N/A',
          "Severity Level":(data && data?.security_level) ? data?.security_level:'N/A',
          "Status":(data && data?.status) ? data?.status:'N/A',
        })
      })
    } else if(name=="contact-request-data"){
      exportData.map((data:any)=>{
        arr.push({
          "Name":(data && data?.first_name )?data?.first_name +' '+data?.last_name:'N/A',
          "Email":(data && data?.email) ? data?.email:'N/A',
          "Message":(data && data?.message) ? data?.message:'N/A',
          "Inquiry date":(data && data?.created_at) ? data?.created_at:'N/A',
        })
      })
    } else if(name=="notification-setting-data"){
      exportData.map((data:any)=>{
        arr.push({
          "Title":(data && data?.title )?data?.title :'N/A',
          "Body":(data && data?.message) ? data?.message:'N/A',
          "Type":(data && data?.type) ? data?.type:'N/A',
          "Frequency":(data && data?.frequency) ? data?.frequency:'N/A',
        })
      }) 
    }
    else if(name=="user-report-data"){
      exportData.map((data:any)=>{
        arr.push({
          "Name":(data && data?.name)?data?.name:'N/A',
          "Email":(data && data?.email) ? data?.email:'N/A',
          "Phone":(data && data?.mobile_number) ? data?.mobile_number:'N/A',
          "Status":(data && data?.status) ? data?.status:'N/A',
          "Created at":(data && data?.created_at) ? data?.created_at:'N/A',
        })
      }) 
    }
    else if(name=="reported-user-data"){
        exportData?.map((item:any)=>{
          arr.push({
              "From User Name":item?.from_user?.name,
              "From User Email":item?.from_user?.email,
              "From User Phonenumber":item?.from_user?.mobile_number,
              "To User Name":item?.to_user?.name,
              "ToUser Email":item?.to_user?.email,
              "To User Phonenumber":item?.to_user?.mobile_number,
              "Description":item?.description,
              "Created at":item?.created_at,
            })
      })
    }
    return arr;
  }
  
  // fetch data and set it when the redux store updates
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
      setDownload(""); // reset download state
      // dispatch(exportAction.exportSliceReset())
    }
  }, [exportdata, download]); // ensure effect re-runs when exportdata or download changes

  const fetchData = async (method = "") => {
    let payload: Payload = {
      page: 1,
      limit: 10000000000,
      ...(name=="user-report-data" || name=="reported-user-data")? { start_date: startDate? startDate: null} : {},
      ...(name=="user-report-data" || name=="reported-user-data")? { end_date: endDate? endDate: null} : {},
      ...(name=="user-report-data" || name=="reported-user-data")? { user_type:name=="reported-user-data"?"reported_users":"users" } : {},
      ...(name=="user-report-data")? { status } : {},
    };
     dispatch(ResetExportDatalist())
    setDownload(method); // Set the download type
    await dispatch(getExportDatalist(payload, name)); // Trigger Redux action
  };

  const items = [
    {
      key: "1",
      label: "Export CSV",
       // Add onClick directly
    },
    {
      key: "2",
      label: "Export Excel",
      onClick: () => fetchData("excel"), // Add onClick directly
    },
  ];
  

  return (
    <Tooltips tooltip="Export User">
        <Dropdown inline label="Export">
          <Dropdown.Item onClick={() => fetchData("csv")}>Export CSV</Dropdown.Item>
          <Dropdown.Item onClick={() => fetchData("excel")}>Export Excel</Dropdown.Item>  
        </Dropdown>
      {/* <Dropdown menu={{ items }} placement="bottom" arrow>
        <Button className="addSetterBtn">
          <Image src={ExportUser} alt="plusIcon" /> Export
        </Button>
      </Dropdown> */}
    </Tooltips>
  );
};

export default ExportDataModal;
