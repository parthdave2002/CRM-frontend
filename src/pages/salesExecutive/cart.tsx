import React, { FC, useEffect, useState } from 'react'
import { Table } from "flowbite-react";
import { FaGhost, FaPhoneVolume, FaUserAlt, FaWindowClose } from 'react-icons/fa'
import { HiTrash } from 'react-icons/hi';
import { FaCartShopping } from 'react-icons/fa6';
import SuccessErrorModalPage from '../../components/modal/successErrorModal';
import ConfirmationModalPage from '../../components/modal/confirmationModal';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from 'reactstrap';
import { AddOrderlist, getUpdateOrderlist, ResetOrderlist } from '../../Store/actions';
import { toast } from 'react-toastify';
import { BsCartXFill } from 'react-icons/bs';

interface Cartprops{
  setCartOpen : (value : boolean) => void;
  handleRemoveCall  : (value : boolean) => void;
  CartData ?: any;
  setCartItem: (value : any) => void;
  cartOrderid ?: any;
  setCartOrderid: (value : any) => void;
}

interface ProfileInfo{
  crops: [];
  is_deleted:  boolean;
  _id: string;
  customer_name : string; 
  mobile_number:  number;
  land_area: number;
  land_type: string;
  irrigation_source: string;
  irrigation_type:  string;
  heard_about_agribharat:  string;
  address: string;
  district:  string;
  taluka:  string;
  village:  string;
  pincode:  number;
  created_by:  string;
  __v: number;
  alternate_number: number;
  added_at:  string;
  smart_phone: boolean;
}

const CartList : FC<Cartprops> = ({setCartOpen,CartData, handleRemoveCall, setCartItem, cartOrderid, setCartOrderid}) => {
  const dispatch = useDispatch();
  
  const [cartItems, setCartItems] = useState(CartData || [])

  // ----------- Customer data getcode start ----------------
    const CheckCustomerExistlist = useSelector((state: any) => state.Customer.CheckCustomerExistlist);
    const [data, setData] = useState<ProfileInfo>()
    useEffect(() => {
      if (CheckCustomerExistlist?.data) {
        setData(CheckCustomerExistlist?.data)
      }
    }, [CheckCustomerExistlist])
  // ----------- Customer data getcode end ----------------

  // ----------- Product Qty Change data getcode start ----------------
    const [productQty, setProductQty] = useState<{ [key: string]: number }>({});
    const ProductQtychange  = (id: string, value: number) => {
      const updatedCart = cartItems.map((item: any) =>
        item._id === id ? { ...item, quantity: value } : item
      );
      setCartItems(updatedCart)
    
      setProductQty((prev) => ({
        ...prev,
        [id]: value,
      }));
    };
  // ----------- Product Qty Change data getcode start ----------------

  // ---------------- Place Order code start ----------------
    const [isOpenSuccessOrderModel, setisOpenSuccessOrderModel ] = useState(false);
    const [isOpenConfirmModel, setisOpenConfirmModel ] = useState(false);
    const [isOrderTypeModel, setisOrderTypeModel ] = useState("confirm");
    const [SelectedFutureDate, setSelectedFutureDate ] = useState("");

    const OrderplaceCall = (data:string) =>{
      setisOpenConfirmModel(true);
      setisOrderTypeModel(data)
    }

    const PlaceCall = () =>{
      const productsArray = Object.entries(productQty).map(([id, quantity]) => ({ id, quantity}));
      let requser :any = {
        products : productsArray,
        customer : "67c0b0e7749eda2a24d948d4",
        order_type : isOrderTypeModel,
        total_amount : grandTotal.toFixed(2),
      }
      if (isOrderTypeModel === "future")  requser.future_order_date = SelectedFutureDate;

      if(cartOrderid){
        requser.order_id =  cartOrderid
        dispatch(getUpdateOrderlist(requser))
      } else{
        dispatch(AddOrderlist(requser))
      }   
      setisOpenConfirmModel(false);
    }
  // ---------------- Place Order code end ----------------

  // ---------------- Calculation Logic ----------------
    const calculateOrderSummary = () => {
      let totalSubtotal = 0;
      let totalGST = 0;
      let totalDiscount = 0;

      CartData?.forEach((item: any) => {
        const price = item?.price || 0;
        const discount = item?.discount || 0;
        const gstRate = item?.s_gst || 0;
        const quantity = productQty[item._id] || 1;

        const discountedPrice = (price - discount) * quantity;
        const gstAmount = (discountedPrice * gstRate * 2) / 100;

        totalSubtotal += discountedPrice;
        totalDiscount += discount * quantity;
        totalGST += gstAmount;
      });

      return { totalSubtotal, totalDiscount, totalGST, grandTotal: totalSubtotal + totalGST };
    };

    const { totalSubtotal, totalDiscount, totalGST, grandTotal } = calculateOrderSummary();
  // ---------------- Calculation Logic End ----------------

    useEffect(() => {
      setCartItems(CartData || []);
      const updatedQty: { [key: string]: number } = {};
      CartData?.forEach((item: any) => {
        updatedQty[item._id] = 1;
      });
      setProductQty(updatedQty);
    }, [CartData]);

  // --------------- Add Order Suucess/ error code start ----------------
    const AddOrderdatalist = useSelector((state: any) => state.Order.AddOrderdatalist);
    useEffect(() => {
      if (AddOrderdatalist?.success) {
        setisOpenSuccessOrderModel(true);
        dispatch(ResetOrderlist());
        setCartItems([]);
        setCartItem([])
      } else {
        toast.error(AddOrderdatalist?.msg)
      }
    }, [AddOrderdatalist])
  // --------------- Add Order Suucess/ error code start ----------------

  const CloseCall = () =>{
    setCartOpen(false);
    setCartItem([])
    setCartOrderid(null)
  }

  return (
    <>
      <div className='flex justify-between'>
        <div className="text-[2rem] font-semibold text-gray-900 dark:text-gray-100"> Cart : {cartOrderid}</div>
        {cartOrderid ?  <div className="flex border border-indigo-500 text-indigo-500 dark:text-white hover:text-gray-100 font-semibold px-6 py-2 rounded-full gap-3 hover:bg-indigo-800 transition flex text-center cursor-pointer transition-all duration-500 ease-in-out text-center self-center"  onClick={() => setCartOpen(false)} > <FaCartShopping className="self-center h-5 w-5" /> Countine Shopping </div>  :  null}
        <div className="text-[2rem] font-semibold text-gray-900 dark:text-gray-100 flex self-center cursor-pointer " onClick={() => CloseCall()}> <FaWindowClose /> </div>
      </div>

      <div className="flex flex-col xl:flex-row h-screen  mt-4  gap-x-3">
          {cartItems.length ?
          <>
            <div className=" h-full flex flex-col shadow shadow-indigo-500/50 rounded-xl p-3 xl:w-[65rem] ">
              <div className="w-full  overflow-y-auto">
                <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                  <Table.Head className="bg-gray-100 dark:bg-gray-700">
                    <Table.HeadCell className='text-center'>Item</Table.HeadCell>
                    <Table.HeadCell className='text-center'>Rate</Table.HeadCell>
                    <Table.HeadCell className='text-center'>Discount</Table.HeadCell>
                    <Table.HeadCell className='text-center'>Qty</Table.HeadCell>
                    <Table.HeadCell className='text-center'>Sub Total</Table.HeadCell>
                    <Table.HeadCell className='text-center'>GST</Table.HeadCell>
                    <Table.HeadCell className='text-center'>Total Amount</Table.HeadCell>
                    <Table.HeadCell className='text-center'>Remove</Table.HeadCell>
                  </Table.Head>

                  <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                    {cartItems && cartItems.map((item: any, k: any) => (
                      <Table.Row key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700 py-2">
                        <Table.Cell style={{ padding: "10px" }} className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white w-[18rem] max-w-[18rem] truncate">
                          <div> {item?.name?.englishname}  </div>
                          <div className='text-[0.8rem] mt-1'>( {item?.packaging} {item?.packagingtype?.type_eng} ) </div>
                        </Table.Cell>
                        <Table.Cell style={{ padding: "10px" }} className="whitespace-nowrap font-normal text-gray-900 dark:text-white text-center"> {item?.price} </Table.Cell>
                        <Table.Cell style={{ padding: "10px" }} className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-center"> {item?.discount} </Table.Cell>
                        <Table.Cell style={{ padding: "10px" }} className="whitespace-nowrap font-normal text-gray-900 dark:text-white text-center"> <Input className='w-[3rem] px-2 py-2 rounded-xl dark:bg-gray-800' value={productQty[item._id] || 1} onChange={(e) => ProductQtychange(item._id, Number(e.target.value))} />   </Table.Cell>
                        <Table.Cell style={{ padding: "10px" }} className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-center"> {((item.price - item.discount) * (productQty[item._id] || 1)).toFixed(2)}  </Table.Cell>
                        <Table.Cell style={{ padding: "10px" }} className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-center"> {(((item.price - item.discount) * (productQty[item._id] || 1)) * (item?.s_gst * 2 / 100)).toFixed(2)}  </Table.Cell>
                        <Table.Cell style={{ padding: "10px" }} className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-center"> {(((item.price - item.discount) * (productQty[item._id] || 1)) + (((item.price - item.discount) * (productQty[item._id] || 1)) * (item?.s_gst * 2 / 100))).toFixed(2)} </Table.Cell>
                        <Table.Cell style={{ padding: "10px" }} className="space-x-2 whitespace-nowrap"> <div className="flex items-center gap-x-2 bg-red-500 hover:bg-red-600 text-gray-200 px-1 py-1 rounded-lg cursor-pointer" onClick={() => handleRemoveCall(item?._id)}>  <HiTrash className="text-lg" /> Remove </div>  </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>

              <div className="border border-gray-300 dark:border-gray-600 dark:bg-gray-800 my-4 p-4 rounded-xl w-full mt-auto">
                <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-8">Order Summary</div>

                <div className="flex flex-col items-end space-y-1">
                  <div className="text-[1rem] font-semibold text-gray-500 dark:text-gray-300 flex justify-between w-full max-w-xs"> <span>Total Subtotal</span> <span>: {totalSubtotal.toFixed(2)} Rs.</span> </div>
                  <div className="text-[1rem] font-semibold text-gray-500 dark:text-gray-300 flex justify-between w-full max-w-xs">  <span>Total Discount</span> <span>: {totalDiscount.toFixed(2)} Rs.</span> </div>
                  <div className="text-[1rem] font-semibold text-gray-500 dark:text-gray-300 flex justify-between w-full max-w-xs"> <span>Total GST</span> <span>: {totalGST.toFixed(2)} Rs.</span>  </div>
                </div>

                <div className="flex justify-end items-center text-xl font-semibold text-gray-500 dark:text-gray-300 mt-4 gap-x-4">
                  <span className="text-[1.5rem]">Grand Total</span>
                  <span className="min-w-[11rem] text-end">: {grandTotal.toFixed(2)} Rs.</span>
                </div>
              </div>

              <div className="flex gap-x-3 justify-end mt-6 mb-4">
                {cartOrderid ?<div className="flex border border-indigo-500 text-indigo-500 dark:text-white hover:text-gray-100 font-semibold px-6 py-2 rounded-full gap-3 hover:bg-indigo-800 transition flex text-center cursor-pointer transition-all duration-500 ease-in-out" onClick={() => OrderplaceCall("cancel")}> <BsCartXFill   className="self-center h-5 w-5" /> Cancel Order </div> : null}
                <div className="flex border border-indigo-500 text-indigo-500 dark:text-white hover:text-gray-100 font-semibold px-6 py-2 rounded-full gap-3 hover:bg-indigo-800 transition flex text-center cursor-pointer transition-all duration-500 ease-in-out" onClick={() => OrderplaceCall("future")}> <FaGhost className="self-center h-5 w-5" /> Future Order </div>
                <div className="flex border border-indigo-500 text-indigo-500 dark:text-white hover:text-gray-100 font-semibold px-6 py-2 rounded-full gap-3 hover:bg-indigo-800 transition flex text-center cursor-pointer transition-all duration-500 ease-in-out" onClick={() => OrderplaceCall("confirm")}> <FaCartShopping className="self-center h-5 w-5" /> Place Order </div>
              </div>
            </div>

            <div className="flex-1 md:w-[20rem] w-full flex flex-col gap-4 mt-4 lg:mt-0">
            <div className="border dark:border-gray-600 dark:bg-gray-800 p-3 rounded-xl w-full flex flex-col gap-y-3">
              <div className='dark:text-gray-300 text-[1.2rem] font-semibold'>Customer</div>
              <div className='dark:text-gray-300 flex gap-x-3'><FaUserAlt className='self-center h-7-w-7' />  <span> {data?.customer_name} </span> </div>
            </div>

            <div className="border dark:border-gray-600 dark:bg-gray-800 p-3 rounded-xl w-full flex flex-col gap-y-3">
              <div className='dark:text-gray-300 text-[1.2rem] font-semibold'>Contact Information</div>
              <div className='dark:text-gray-300 flex gap-x-3'><FaPhoneVolume className='self-center h-7-w-7' />  <span> {data?.mobile_number}, {data?.alternate_number} </span> </div>
            </div>

            <div className="border dark:border-gray-600 dark:bg-gray-800 p-3 rounded-xl w-full flex flex-col gap-y-3">
              <div className='dark:text-gray-300 text-[1.2rem] font-semibold'>Shipping Address</div>
              <div className='dark:text-gray-300 '>  {data?.address} </div>
              <div className='dark:text-gray-300'> District :   {data?.district} </div>
              <div className='dark:text-gray-300'> Taluka :  {data?.taluka} </div>
              <div className='dark:text-gray-300'> Village :  {data?.village} </div>
              <div className='dark:text-gray-300'> Pincode : {data?.pincode} </div>
            </div>
            </div> 
          </>
          :
            <div className=" h-full flex flex-col text-center bg-no-repeat bg-center bg-contain w-[65rem]" style={{ backgroundImage: "url('/images/products/empty-cart.png')" }} > </div>
          }
      </div> 

      <SuccessErrorModalPage isOpenSuccessOrderModel={isOpenSuccessOrderModel} setisOpenSuccessOrderModel={setisOpenSuccessOrderModel} message="Order placed sucessfully" />
      <ConfirmationModalPage isOpenConfirmModel={isOpenConfirmModel} setisOpenConfirmModel={setisOpenConfirmModel} isOrderTypeModel={isOrderTypeModel} PlaceCall={PlaceCall} setSelectedFutureDate={setSelectedFutureDate}  />
    </>
  )
}

export default CartList