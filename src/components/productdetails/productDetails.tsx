import React, { FC, useEffect, useState } from 'react'

interface PropsData{
    ProductDetails : string
}

const ProductDetailData : FC<PropsData> = ({ProductDetails}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const Product_data =
    {
        "name": {
            "englishname": "AgroStar Sayani F1 Okra",
            "gujaratiname": "એગ્રોસ્ટાર"
        },
        "tech_name": {
            "english_tech_name": "AgroStar Sayani F1 Okra",
            "gujarati_tech_name": "એગ્રોસ્ટાર"
        },
        "price": 1200,
        "discount": 0,
        "product_pics": [],
        "s_gst": 9,
        "c_gst": 9,
        "avl_qty": 100,
        "rating": 4,
        "is_active": true,
        "is_deleted": false,
        "_id": "67d91079353c824ae49279f9",
        "product_pic": [
            "/images/products/apple-imac-1.png",
            "/images/products/apple-imac-2.png",
            "/images/products/apple-imac-3.png",
        ],
        "batch_no": "123456789",
        "hsn_code": "12345",
        "description": [
            {
                "gujaratiHeader": "gujaratiHeader",
                "englishHeader": "englishHeader",
                "gujaratiValue": "gujaratiValue",
                "englishValue": "englishValue"
            },

            {
                "gujaratiHeader": "gujaratiHeader",
                "englishHeader": "englishHeader",
                "gujaratiValue": "gujaratiValue",
                "englishValue": "englishValue"
            },
            {
                "gujaratiHeader": "gujaratiHeader",
                "englishHeader": "englishHeader",
                "gujaratiValue": "gujaratiValue",
                "englishValue": "englishValue"
            }
        ],
        "packaging": 100,
        "createdAt": "2025-01-30T07:03:15.242Z",
        "packagingtype": {
            "_id": "67c54dba26d537374cfd78cf",
            "type_eng": "ml",
            "type_guj" : "મિલી"
        },
        "company": {
            "_id": "6799fd246f108a34ec4fd7a9"
        },
        "categories": {
            "_id": "67bf01010083e33734817a1a",
            "name_eng": "Demo Category",
            "name_guj": "Demo Category"
        },
        "added_at": "2025-03-18T06:30:43.836Z"
    }

    const autoPlay = true;
    const intervalTime = 3000;

    useEffect(() => {
        if (!autoPlay) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev === Product_data?.product_pic.length - 1 ? 0 : prev + 1));
        }, intervalTime);
        return () => clearInterval(interval);
    }, [currentIndex, autoPlay]);


    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

  return (
    <>
        {/* <div>ProductDetailData ,{ ProductDetails }</div> */}
        <div className='flex px-3 mt-[2rem]'>
            <div className='flex-1'>
                  <div className="relative w-full">
                      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                          {Product_data && Product_data?.product_pic.map((src, index) => (
                              <img
                                  key={index}
                                  src={src}
                                  alt={`Slide ${index + 1}`}
                                  className={`absolute block w-full transition-opacity duration-700 ease-in-out top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
                              />
                          ))}
                      </div>

                      <div className="absolute z-30 flex flex-col top-1/2 left-5 -translate-y-1/2 space-y-3">
                          {Product_data && Product_data?.product_pic.map((src, index) => (
                              <img
                                  key={index}
                                  src={src}
                                  alt={`Slide ${index + 1}`}
                                  onClick={() => goToSlide(index)}
                                  className={`w-24 h-24 rounded-full bg-white cursor-pointer ${index === currentIndex ? "opacity-100" : "opacity-50"}`}
                              />
                          ))}
                      </div>
                  </div>
            </div>

            <div className='flex-1'> 
                <div>
                    <div className='dark:text-gray-100 text-[2rem]'> { Product_data?.name?.englishname} ({ Product_data?.categories?.name_eng})</div>
                    <div className='dark:text-gray-100 text-[1.2rem]'> { Product_data?.name?.gujaratiname} ({ Product_data?.categories?.name_guj})</div>
                </div>

                <div className='flex gap-x-3'>
                    <div className='dark:text-gray-100 text-[1rem]'> Rs.{ Product_data?.price}</div>
                    <div className='dark:text-gray-100 text-[1rem]'> { Product_data?.discount}</div>
                </div>

                <div >
                    <div className='dark:text-gray-100 text-[1rem]'> { Product_data?.batch_no}</div>
                    <div className='dark:text-gray-100 text-[1rem]'> { Product_data?.hsn_code}</div>
                </div>
            </div> 
        </div>

          <div className="mt-12 px-3">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Description</h3>
              {Product_data?.description.map((data, index) => (
                  <div key={index} className="mb-4 p-4 rounded-lg shadow-sm">
                    
                      <div className="flex flex-col gap-2 md:grid grid-cols-2">
                        
                          <div><span className="font-medium text-gray-600">English Header:</span> {data.englishHeader} </div>
                          <div><span className="font-medium text-gray-600">Gujarati Header:</span> {data.gujaratiHeader} </div>
                          <div><span className="font-medium text-gray-600">English Value:</span> {data.englishValue} </div>
                          <div><span className="font-medium text-gray-600">Gujarati Value:</span> {data.gujaratiValue} </div>
                      </div>
                  </div>
              ))}
          </div>
    </> 
  )
}

export default ProductDetailData