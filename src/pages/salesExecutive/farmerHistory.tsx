import React, { FC, useState } from 'react';
import { Table } from "flowbite-react";
import { BsCartCheckFill } from 'react-icons/bs';
import { FaRegClock } from 'react-icons/fa';
import { MdReport } from 'react-icons/md';
import moment from 'moment';
import ComplainDetails from '../../components/salesComponent/complainDetails';

interface FarmerHistoryProps{
  setOpenDetailId : ( value : any) => void;
  setOpenDetailsmodal : ( value : boolean) => void;
}

const FarmerHistory : FC <FarmerHistoryProps> = ({setOpenDetailId, setOpenDetailsmodal}) => {

  const Orderdata = [
    {
      order_id: "#AB-240325-001",
      sales_executive: "Demo sales executive",
      amt: 5000,
      status : "Confirm",
      created_at: "2025-03-20T09:25:37.041Z",
    },
    {
      order_id: "#AB-240325-002",
      sales_executive: "Demo sales executive",
      amt: 2000,
      status : "Return",
      created_at: "2025-03-20T09:25:37.041Z",
    },
  ]

  const ComplainData = [
    {
      complain_id: "#AB_123456",
      product: "Amaze-X 123456780",
      description: "this is a demo complain.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      type: "High",
      created_at: "2025-03-20T09:25:37.041Z",
      created_by : "Priyanka Thakkar",
      status : "Resolved",
    },
    {
      complain_id : "#AB_123456",
      product: "Amaze-X 123456780",
      type: "High",
      description: "this is a demo complain.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      created_at: "2025-03-20T09:25:37.041Z",
      created_by : "Priyanka Thakkar",
      status : "Resolved",
    },
  ]

  const Taglogdata =[
    {
      created_at : "2025-03-20T09:25:37.041Z",
      taglog : "CallBack",
      comment : "we have to call him on 31st march for order confirmation"
    },
    {
      created_at : "2025-03-20T09:25:37.041Z",
      taglog : "Busy",
      comment : "Farmer is on another call"
    },
    {
      created_at : "2025-03-20T09:25:37.041Z",
      taglog : "Not Pickup",
      comment : "Farmer not pickup the call"
    }
  ]

  // -------------  Order  Details Call start -------------------
 

  const OderDetailsCall = (data:string) => {
    setOpenDetailId(data)
    setOpenDetailsmodal(true)
  }
  // -------------  Order  Details Call end -------------------
  
  // ----------- Tabnavbar code start --------------------
    const [selectedTabbar, setselectedTabbar] = useState("Order");

    const TabData = [
      { title: "Order", icon: <BsCartCheckFill  size={20} /> },
      { title: "Complain", icon: <MdReport  size={20} /> },
      { title: "Taglog", icon: <FaRegClock  size={20} /> },
    ]

    const TabSelection = (data: string) => {
      setselectedTabbar(data)
    }
  // ----------- Tabnavbar code end --------------------

  // ------------complain details page ------------------
      const [isOpenComplainModel , setisOpenComplainModel ]  = useState(false);
    const ComplainCall = (data: any) =>{
      setisOpenComplainModel(true);
    }
  // ------------complain details page ------------------

  return (
    <>
     
          <div className='mt-3 border dark:border-gray-600 rounded-xl w-full py-2 px-5'>
            <div className="flex items-center gap-x-6 bg-gray-100 dark:bg-gray-900 p-3 rounded-xl">
              <ul className="flex items-center gap-x-6">
                {TabData.map((data:any, k:number) => (
                  <li key={k} className={`relative flex flex-col items-center justify-center gap-1 py-2 px-2 cursor-pointer transition-all duration-300 ease-in-out font-medium text-sm ${selectedTabbar === data.title ? "text-blue-500 font-semibold" : "text-gray-500 dark:text-gray-400"  }`} onClick={() => TabSelection(data.title)} >
                    <span className="flex items-center text-[1rem] font-semibold gap-x-4">{data.icon} {data.title}</span>
                    {selectedTabbar === data.title && ( <span className="px-2 absolute bottom-[-4px] left-0 w-full h-[2px] bg-blue-500"></span> )}
                  </li>
                ))}
              </ul>
            </div>

            <div className='mt-[1.5rem] px-4'>
              {selectedTabbar == "Order" ?
                <>
                  <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 ">
                    <Table.Head className="bg-gray-100 dark:bg-gray-700">
                      <Table.HeadCell>Order id</Table.HeadCell>
                      <Table.HeadCell>Order Date</Table.HeadCell>
                      <Table.HeadCell>COD Amt</Table.HeadCell>
                      <Table.HeadCell>Created By</Table.HeadCell>
                      <Table.HeadCell>Status</Table.HeadCell>
                    </Table.Head>

                    <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                      {Orderdata && Orderdata.map((item: any, k:number) => (
                        <Table.Row key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700" >
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0 cursor-pointer" onClick={() => OderDetailsCall(item.order_id)}>  {item.order_id} </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {moment(item.created_at).format("DD-MM-YYYY hh:mm:ss")} </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item.amt} </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item.sales_executive} </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item.status} </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </>

                : selectedTabbar == "Complain" ?
                  <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 ">
                    <Table.Head className="bg-gray-100 dark:bg-gray-700">
                      <Table.HeadCell>Complain id</Table.HeadCell>
                      <Table.HeadCell>Complain Date</Table.HeadCell>
                      <Table.HeadCell> Product </Table.HeadCell>
                      <Table.HeadCell> Status </Table.HeadCell>
                      <Table.HeadCell> Type </Table.HeadCell>
                      <Table.HeadCell>Created By</Table.HeadCell>
                    </Table.Head>

                    <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                      {ComplainData && ComplainData.map((item: any, k: number) => (
                        <Table.Row key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700" >
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0 cursor-pointer" onClick={() => ComplainCall(item?.complain_id)}>  {item?.complain_id} </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {moment(item.created_at).format("DD-MM-YYYY hh:mm:ss")} </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item.product} </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item.status} </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item.type} </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item.created_by} </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                  
                : selectedTabbar == "Taglog" ?
                    <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 ">
                      <Table.Head className="bg-gray-100 dark:bg-gray-700">
                        <Table.HeadCell> Taglog </Table.HeadCell>
                        <Table.HeadCell> Comment </Table.HeadCell>
                        <Table.HeadCell>Created Date</Table.HeadCell>
                      </Table.Head>

                      <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                        {Taglogdata && Taglogdata.map((item: any, k: number) => (
                          <Table.Row key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700" >
                            <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item.taglog} </Table.Cell>
                            <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item.comment} </Table.Cell>
                            <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {moment(item.created_at).format("DD-MM-YYYY hh:mm:ss")} </Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table>
                
                : null
              }
            </div>
          </div>

          <ComplainDetails  setisOpenComplainModel={() => setisOpenComplainModel(false)} isOpenComplainModel={isOpenComplainModel} />
    </>
  )
}

export default FarmerHistory