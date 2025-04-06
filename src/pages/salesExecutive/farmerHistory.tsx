import React, { FC, useEffect, useState } from 'react';
import { Button, Table } from "flowbite-react";
import { BsCartCheckFill } from 'react-icons/bs';
import { FaRegClock } from 'react-icons/fa';
import { MdReport } from 'react-icons/md';
import moment from 'moment';
import ComplainDetails from '../../components/salesComponent/complainDetails';
import ExamplePagination from '../../components/pagination';
import { getFarmerComplainlist, getFarmerOrderlist } from '../../Store/actions';
import { useDispatch, useSelector } from 'react-redux';

interface FarmerHistoryProps{
  setOpenDetailId : ( value : any) => void;
  setOpenDetailsmodal : ( value : boolean) => void;
  setOpenDetailIData : ( value : any) => void;
  AddtoCartCall : ( value : any) => void;
  setCartOrderid : ( value : any) => void;
}

const FarmerHistory : FC <FarmerHistoryProps> = ({setOpenDetailId, setOpenDetailsmodal, setOpenDetailIData, AddtoCartCall, setCartOrderid}) => {
  const dispatch = useDispatch()

  useEffect(() =>{
    let requser ={
      customer_id : "67c0b0e7749eda2a24d948d4"
    }
    dispatch(getFarmerOrderlist(requser));
    dispatch(getFarmerComplainlist(requser))
  },[])

  // ------------- Get  Data From Reducer Code Start --------------
    const Orderlist = useSelector((state: any) => state.Order.SingleFarmerOrderlist?.data );
    const Complainlist = useSelector((state: any) => state.Complain.SinglefarmerComplainlist?.data );

    const [UserOrderDataList, setUserOrderDataList] = useState([]);
    const [UserComplainDataList, setUserComplainDataList] = useState([]);

    useEffect(() => {
      setUserOrderDataList(Orderlist? Orderlist : []);
      setUserComplainDataList(  Complainlist  ? Complainlist  : [])
    }, [Orderlist, Complainlist]);

  //  ------------- Get  Data From Reducer Code end --------------

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
  const OderDetailsCall = ( id:string , data:any) => {
    setOpenDetailId(id);
    setOpenDetailIData(data);
    setOpenDetailsmodal(true)
  }
  // -------------  Order  Details Call end -------------------

  // -------------  Future Order  to Cart Call start -------------------
  const FuturaOrderCall = ( id:string , data:any) => {
    const productIds = data?.products?.map((item: any) => item?.id);
    AddtoCartCall(productIds);
    setCartOrderid(id);
  }
  // -------------  Future Order  to Cart Call end -------------------
  
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

  // ----------- next Button  Code Start -------------
    const [TotalListData, setTotalListData] = useState(0);
    const [CurrentUserListSize, setCurrentUserListSize] = useState();
    const [CurrentPageNo, setCurrentPageNo] = useState(0);
    const [PageNo, setPageNo] = useState(1);
    const [RoePerPage, setRoePerPage] = useState(10);

    const RowPerPage = (value: any) => { setRoePerPage(value)};
    const PageDataList = (data:any) =>{ setPageNo(data)}
  // ------------- Next button Code End -------------


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
                       <Table.HeadCell>Callback Date</Table.HeadCell>
                      <Table.HeadCell>COD Amt</Table.HeadCell>
                      <Table.HeadCell>Created By</Table.HeadCell>
                      <Table.HeadCell>Status</Table.HeadCell>
                      <Table.HeadCell> Action</Table.HeadCell>
                    </Table.Head>

                    <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                      {UserOrderDataList && UserOrderDataList.map((item: any, k:number) => (
                        <Table.Row key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700" >
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0 cursor-pointer" onClick={() => OderDetailsCall(item?.order_id, item)}>  {item?.order_id} </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {moment(item?.added_at).format("DD-MM-YYYY hh:mm:ss")} </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.order_type == "future" ? moment(item?.future_order_date).format("DD-MM-YYYY") : "N/A"} </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.total_amount.toFixed(2)} </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.advisor_name?.name} </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.order_type.charAt(0).toUpperCase() + item?.order_type.slice(1).toLowerCase()} </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.order_type == "future" ?   
                            <Button className='bg-gradient-to-br from-purple-700 to-blue-400 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800 border-0 ' onClick={() => FuturaOrderCall(item?.order_id, item)}> Confirm Order</Button>
                          : "N/A"} 
                          </Table.Cell>
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
                      {UserComplainDataList && UserComplainDataList.map((item: any, k: number) => (
                        <Table.Row key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700" >
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0 cursor-pointer" onClick={() => ComplainCall(item?.complain_id)}>  {item?.complain_id} </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {moment(item?.created_at).format("DD-MM-YYYY hh:mm:ss")} </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">{item?.product_id?.map((product :any, index:number) => (  <div key={index}>{product?.name?.englishname}</div> ))}</Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.resolution.charAt(0).toUpperCase() + item?.resolution.slice(1).toLowerCase()} </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.priority.charAt(0).toUpperCase() + item?.priority.slice(1).toLowerCase()} </Table.Cell>
                          <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.created_by?.name} </Table.Cell>
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

            <ExamplePagination PageData={PageDataList} RowPerPage={RowPerPage}  PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData}/>
          </div>

          <ComplainDetails  setisOpenComplainModel={() => setisOpenComplainModel(false)} isOpenComplainModel={isOpenComplainModel} />
    </>
  )
}

export default FarmerHistory