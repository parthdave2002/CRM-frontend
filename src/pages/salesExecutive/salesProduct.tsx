import React, { FC, useEffect, useState } from 'react'
import { FaArrowLeft, FaWindowClose } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getProductlist } from '../../Store/actions';
import ProductCarousel from '../../components/carousel/carousel';
import ProductDetailData from '../../components/productdetails/productDetails';
interface PropsData{
    setDatactive :any;
}
const SalesProduct : FC <PropsData> = function ({ setDatactive})  {

    const dispatch =useDispatch();
    const [ProductDetails, setProductDetails] = useState<null | string>(null);
    const [ProductData, setProductData] = useState([]);
    const [searchData, setSearchData] = useState(null);
    const Changename = (data:any) => setSearchData(data)
    
     useEffect(() => {
        let requserdata ={ searchData : searchData}
          dispatch(getProductlist(requserdata));
    }, [dispatch, searchData]);

    const  Productlist  = useSelector((state: any) => state.Product.Productlist );
    useEffect(() => {
        setProductData(Productlist?.data);
    }, [Productlist]);

  const ProductDetailsCall = (data:string) =>  setProductDetails(data);
  const ProductCLoseCall = () => setProductDetails(null);
  const DashboardCall = (data:string) => setDatactive(data)

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
          <div>
            <div className="text-[0.9rem] text-blue-500 flex gap-x-3 cursor-pointer w-fit " onClick={() => DashboardCall("Dashboard")}  >  <FaArrowLeft style={{ alignSelf: "center" }} /> Back to Dashboard  </div>
            <div className="text-[2rem] font-semibold text-gray-900 dark:text-gray-100"> Products   </div>
          </div>

          <div className="md:grid grid-cols-3 gap-4 mt-[2rem]">
            {ProductData && ProductData.map((item: any, k: any) => (
              <div key={k} className='bg-white dark:bg-gray-700 dark:hover:bg-gray-600 p-4 rounded-xl cursor-pointer dark:hover:text-gray-50 h-[25rem] mt-3' onClick={() => ProductDetailsCall(item._id)}>
                <div className='flex flex-col'>
                  <div className='h-[18rem]'> <ProductCarousel /> </div>
                  <span className='dark:text-gray-100 md:text-[1rem] text-[0.8rem] '> {item?.name?.englishname}  ( {item?.name?.gujaratiname})</span>
                  <span className='dark:text-gray-100 md:text-[1rem] text-[0.8rem]'> {item?.categories?.name_eng}   ( {item?.categories?.name_guj} ) </span>
                  <span className='dark:text-gray-100 font-bold md:text-[1.2rem]   text-[0.8rem]'> ₹ {item?.price} </span>
                </div>
              </div>
            ))}
          </div>
        </>
      }
    </>
  );
}

export default SalesProduct