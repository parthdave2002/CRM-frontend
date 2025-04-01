import React, { FC, useEffect, useState } from 'react'
import {  Button, Table} from "flowbite-react";
const IMG_URL = import.meta.env["VITE_API_URL"];
import { getProductlist } from '../../Store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { FaCartArrowDown } from 'react-icons/fa';

interface PorductData  {
    searchData ?: string;
    ProductDetailsCall : (value: string ) => void;
    isLoggedin : boolean;
    AddtoCartCall : (value: any) => void;
}

const Salesproductlist : FC <PorductData> = ({searchData, ProductDetailsCall, isLoggedin, AddtoCartCall}) => {

    const dispatch =useDispatch();
    const [ProductData, setProductData] = useState([]);

    useEffect(() => {
        let requserdata: any = {};
        if (searchData) requserdata.search = searchData;
        dispatch(getProductlist(requserdata));
    }, [dispatch, searchData]);
  
    const Productlist = useSelector((state: any) => state.Product.Productlist);
    useEffect(() => {
      setProductData(Productlist?.data);
    }, [Productlist]);

  return (
    <div className="mt-[2rem]">
      <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 ">
        <Table.Head className="bg-gray-100 dark:bg-gray-700">
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Packing size</Table.HeadCell>
          <Table.HeadCell>price (RS.)</Table.HeadCell>
          <Table.HeadCell>discount (RS.)</Table.HeadCell>
          <Table.HeadCell>final price	</Table.HeadCell>
          {isLoggedin ? <Table.HeadCell> action</Table.HeadCell> : null}
        </Table.Head>

        <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
          {ProductData && ProductData.map((item: any, k) => (
            <Table.Row key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700" >
              <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0 cursor-pointer" onClick={() => ProductDetailsCall(item?._id)} >
                <div className='flex gap-x-2'>
                  <img className='w-[3rem] h-[3rem] flex self-center rounded-md' src={`${IMG_URL}/public/product/${item.product_pics?.[0]}`} alt='product' />
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
              {isLoggedin ? <Table.Cell className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-white py-0"> <Button className=' bg-gradient-to-br from-green-400 to-blue-600 text-white hover:bg-gradient-to-bl border-0' onClick={() => AddtoCartCall(item)} > <div className="flex items-center gap-x-3"> <FaCartArrowDown className='text-xl'  /> Add to Cart </div> </Button> </Table.Cell> : null}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}

export default Salesproductlist