import React, { FC, useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getProductlist } from '../../Store/actions';

interface PropsData{
    setDatactive :any;
}
const SalesProduct : FC <PropsData> = function ({ setDatactive})  {

    const dispatch =useDispatch();
    const [ProductData, setProductData] = useState([]);
    const [searchData, setSearchData] = useState(null);
    const Changename = (data:any) =>{
        setSearchData(data)
    }

     useEffect(() => {
        let requserdata ={
            searchData : searchData
        }
          dispatch(getProductlist(requserdata));
    }, [dispatch, searchData]);

    const { Productlist } = useSelector((state: any) => ({
        Productlist: state.Product.Productlist,
    }));

    useEffect(() => {
        setProductData(Productlist?.data);
    }, [Productlist]);

  const DashboardCall = (data:string) => setDatactive(data)

  return (
    <>
      <div>
        <div  className="text-[0.9rem] text-blue-500 flex gap-x-3 cursor-pointer w-fit "  onClick={() => DashboardCall("Dashboard")}  >  <FaArrowLeft style={{ alignSelf: "center" }} /> Back to Dashboard  </div>
        <div className="text-[2rem] font-semibold text-gray-900 dark:text-gray-100"> Products   </div>
      </div>

      <div className="md:grid grid-cols-4 gap-4 mt-[2rem]">
            {ProductData && ProductData.map((item:any, k:any) =>(
                <div key={k} className='bg-white dark:bg-gray-700 dark:hover:bg-gray-600 p-4 rounded-xl cursor-pointer dark:hover:text-gray-50'>
                       <div className='flex flex-col'>
                        <span className='dark:text-gray-100 '> {item?.name?.englishname}  ( {item?.name?.gujaratiname})</span>
                        <span className='dark:text-gray-100 '> {item?.categories?.name_eng}   ( {item?.categories?.name_guj} ) </span>
                        <span className='dark:text-gray-100 font-bold text-[1.2rem] '> ₹ {item?.price} </span>
                       </div>
                </div>
            ))}
      </div>
    </>
  );
}

export default SalesProduct