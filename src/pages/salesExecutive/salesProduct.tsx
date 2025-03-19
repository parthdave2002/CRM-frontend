import React, { FC, useEffect, useState } from 'react'
import { FaArrowLeft, FaWindowClose } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getProductlist } from '../../Store/actions';
import {  Table} from "flowbite-react";
const IMG_URL = import.meta.env["VITE_API_URL"];
import ProductDetailData from '../../components/productdetails/productDetails';
import SalesMobileInput from '../../components/input/salesMobileInput';
interface PropsData{
    setDatactive :any;
}
const SalesProduct : FC <PropsData> = function ({ setDatactive})  {

    const dispatch =useDispatch();
    const [ProductDetails, setProductDetails] = useState<null | string>(null);
    const [ProductData, setProductData] = useState([]);
    const [searchData, setSearchData] = useState("");
    const handleChange = (data:any) => setSearchData(data)
    
    console.log("ProductData >>>>>>>>.", ProductData);
    
     useEffect(() => {
      let requserdata: any = {};

       if (searchData) {
        requserdata.search = searchData;
       }
          dispatch(getProductlist(requserdata));
    }, [dispatch, searchData]);

    const  Productlist  = useSelector((state: any) => state.Product.Productlist );
    useEffect(() => {
        setProductData(Productlist?.data);
    }, [Productlist]);

  const ProductDetailsCall = (data:string) =>  setProductDetails(data);
  const ProductCLoseCall = () => setProductDetails(null);
  const DashboardCall = (data:string) => setDatactive(data)

  const handleClickCall = () => {
    console.log("callll");
  }

  return (
    <>
      {ProductDetails != null ?
        <>
          <div className='flex justify-between px-4'>
            <div className="text-[2rem] font-semibold text-gray-900 dark:text-gray-100"> Product Details   </div>
            <div className="text-[2rem] font-semibold text-gray-900 dark:text-gray-100 flex self-center cursor-pointer " onClick={() => ProductCLoseCall()}> <FaWindowClose /> </div>
          </div>

          <ProductDetailData ProductDetails={ProductDetails}  />
        </>
      :
        <>

          <div className='flex justify-between'>
            <div className='flex flex-col self-center'>
              <div className="text-[0.9rem] text-blue-500 flex gap-x-3 cursor-pointer w-fit " onClick={() => DashboardCall("Dashboard")}  >  <FaArrowLeft style={{ alignSelf: "center" }} /> Back to Dashboard  </div>
              <div className="text-[2rem] font-semibold text-gray-900 dark:text-gray-100"> Products   </div>
            </div>
            <SalesMobileInput datatype='text' className="py-2 px-6 border-0  rounded-full text-[2rem] text-gray-500 font-bold relative shadow-xl dark:shadow-xl  shadow-inner shadow-indigo-200  dark:shadow-gray-500/50 dark:bg-gray-700 dark:text-gray-100"  value={searchData} handleChange={(data) =>handleChange(data)} handleClickCall={handleClickCall} placeholder="Search Product"  />
          </div>
          
          <div className="mt-[2rem]">
            <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 ">
                          <Table.Head className="bg-gray-100 dark:bg-gray-700">
                            <Table.HeadCell>Name</Table.HeadCell>
                            <Table.HeadCell>Packing size</Table.HeadCell>
                            <Table.HeadCell>price (RS.)</Table.HeadCell>
                            <Table.HeadCell>discount (RS.)</Table.HeadCell>
                            <Table.HeadCell>final price	</Table.HeadCell>
                          </Table.Head>
            
                          <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                              {ProductData && ProductData.map((item: any, k) => (
                                    <Table.Row  key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700"  onClick={() => ProductDetailsCall(item?._id)} >
                                      <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0 cursor-pointer" >
                                          <div className='flex gap-x-2'>
                                            <img className='w-[3rem] h-[3rem] flex self-center rounded-md' src={`${IMG_URL}/public/product/${item.product_pics?.[0]}` }alt='product' />
                                            <div className='flex flex-col'>
                                                <span>{item?.name?.englishname}  ( {item?.company?.name_eng} )  </span>
                                                <span className='dark:text-gray-400  text-gray-500 text-[0.9rem]'>{item?.tech_name?.english_tech_name} </span>
                                            </div>
                                          </div>
                                          </Table.Cell>
                                      <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.packaging} {item?.packagingtype?.type_eng} </Table.Cell> 
                                      <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0">  {item?.price} </Table.Cell>
                                      <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item?.discount}</Table.Cell>
                                      <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> {item.price - item.discount}  </Table.Cell>
                                    </Table.Row>
                              ))}
                          </Table.Body>
                      </Table>
          </div>
        </>
      }
    </>
  );
}

export default SalesProduct