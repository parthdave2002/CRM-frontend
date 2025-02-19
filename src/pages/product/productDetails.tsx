
import type { FC } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getPackingTypelist } from "../../Store/actions";
import { useEffect, useState, } from "react";
import ExampleBreadcrumb from "../../components/breadcrumb";
import { useParams } from "react-router";
import moment from "moment";

const ProductDetailsPage: FC = function () {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [PackingTypeList, setPackingTypeList] = useState([]);

  useEffect(() =>{
    if(id){
        // setLoading(true)
        dispatch(getPackingTypelist({ id : id}))   
    }
  },[id]);
  
  const { Packingtypelist } = useSelector((state: any) => ({
    Packingtypelist: state.PackingType.Packingtypelist,
  }));

  useEffect(() => {  
    setPackingTypeList(Packingtypelist ? Packingtypelist : null);
  }, [Packingtypelist]);

  const SingleUserDataList = [
    {
      "is_active": true,
      "_id": "67ab2c70371d4b1e04ef3514",
      "price": 1200,
      "product_pic": "1738220595224-js.webp",
      "avl_qty": 100,
      "name": "AgroStar Sayani F1 Okra",
      "description": "The information offered here is for reference only and depends exclusively on soil type and climatic conditions. Always refer to product labels and accompanying leaflets for complete product details and directions for use.",
      "category": "67908de5310002db47e9ae52",
      "created_at": "1997-01-12",
    }
  ]

  let Name = "Product Details";
  let ParentName = "Product List";
  let ParentLink = "/product/list";

  return (
    <>
      <NavbarSidebarLayout isFooter={false}  isSidebar={true} isNavbar={true} isRightSidebar={true}>
        <ExampleBreadcrumb  Name={Name} ParentName={ParentName} ParentLink ={ParentLink} />
        <div  className="mt-[2rem] bg-white dark:bg-gray-800 p-4"> 
           <div className="mt-[2rem] bg-white dark:bg-gray-800 p-4">
                      <div>
                      {SingleUserDataList &&  SingleUserDataList.map((data: any, index: number) => (
                        <div key={index} className="grid grid-cols-3 gap-6">
                          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                            <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Name</h3>
                            <p className="text-gray-900 dark:text-white">{data?.name || "N/A"}</p>
                          </div>
          
                          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                            <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Description</h3>
                            <p className="text-gray-900 dark:text-white">{data?.description || "N/A"}</p>
                          </div>
          
                          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                            <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Price</h3>
                            <p className="text-gray-900 dark:text-white">{data?.price || "N/A"}Rs.</p>
                          </div>
          
                          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                            <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Available Qty</h3>
                            <p className="text-gray-900 dark:text-white"> {data?.avl_qty || "N/A"}</p>
                          </div>
          
                          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                            <h3 className="text-gray-600 dark:text-gray-300 font-semibold"> Category</h3>
                            <p className="text-gray-900 dark:text-white">{data?.category || "N/A"} </p>
                          </div>
          
                          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                            <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Created Date</h3>
                            <p className="text-gray-900 dark:text-white">
                              {data?.created_at ? moment(data.created_at).format("DD-MM-YYYY HH:mm:ss") : "N/A"}
                            </p>
                          </div>
          
                          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                            <h3 className="text-gray-600 dark:text-gray-300 font-semibold">Status</h3>
                            <p className="text-white text-sm font-bold py-1 px-3 rounded-lg">
                              {data?.is_active ? "Active" : "Inactive"}
                            </p>
                          </div>
                        </div>
                      ))}
                      </div>
                  </div>
        </div>
      </NavbarSidebarLayout>
    </>
  );
};

export default ProductDetailsPage;