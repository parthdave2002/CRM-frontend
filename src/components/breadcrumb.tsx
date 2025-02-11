import { useState, type FC ,type PropsWithChildren } from "react";
import {  Breadcrumb,  Button,} from "flowbite-react";
import { Input } from "reactstrap";
import {  HiCog, HiDotsVertical, HiExclamationCircle, HiHome, HiDocumentDownload, HiPlus, HiTrash} from "react-icons/hi";
import { Link } from "react-router-dom";
import ExportDataModal from "./exportdata/exportCSV";

interface NavbarSidebarLayoutProps {
  Name?: any;
  Searchplaceholder?: any;
  searchData?: any;
  Changename ?: any;
  AcccessData ?: any;
  isOpenAddModel ?: any;
  AddAccess?: String;
  ParentName?: String;
  ParentLink?: any;
}

const ExampleBreadcrumb: FC<PropsWithChildren<NavbarSidebarLayoutProps>> = function ({Name, Searchplaceholder, searchData, Changename, AcccessData, isOpenAddModel, AddAccess, ParentName, ParentLink }) {


  const DataChange = (e:any) =>{
    Changename(e.target.value)
  }

  const OpenAddModel = () =>{
    isOpenAddModel(true)
  }

  const [data, setData] = useState([]);

  return (
    <>
     <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
          <div className="mb-1 w-full">
            <div className="mb-3">
              <Breadcrumb className="mb-4">
                <Breadcrumb.Item>
                  <Link to="/dashboard">
                    <div className="flex items-center gap-x-3">
                      <HiHome className="text-xl" />
                      <span className="dark:text-white">Home</span>
                    </div>
                  </Link>
                </Breadcrumb.Item>

                {ParentName && ParentLink ?
                  <Breadcrumb.Item>
                  <Link to={ParentLink}>
                    <div className="flex items-center gap-x-3">
                      <span className="dark:text-white">{ParentName}</span>
                    </div>
                  </Link>
                  </Breadcrumb.Item>
                : null
                }
               
                <Breadcrumb.Item>{Name}</Breadcrumb.Item>
              </Breadcrumb>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl"> {Name}  </h1>
            </div>
            <div className="sm:flex">
              {Searchplaceholder && 
                <div className="mb-3 hidden items-center dark:divide-gray-700 sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100">
                <form className="lg:pr-3">
                  
                  <div className="relative mt-1 lg:w-64 xl:w-96">
                    <Input
                      id="Search_Module"
                      name="Search_Module"
                      className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                      placeholder={Searchplaceholder}
                      type="text"
                      onChange={(e) => {
                        DataChange(e);
                      }}
                       value={searchData}
                    />
                  </div>
                </form>
                <div className="mt-3 flex space-x-1 pl-0 sm:mt-0 sm:pl-2">
                  <a
                    href="#"
                    className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span className="sr-only">Configure</span>
                    <HiCog className="text-2xl" />
                  </a>
                  <a
                    href="#"
                    className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span className="sr-only">Delete</span>
                    <HiTrash className="text-2xl" />
                  </a>
                  <a
                    href="#"
                    className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span className="sr-only">Purge</span>
                    <HiExclamationCircle className="text-2xl" />
                  </a>
                  <a
                    href="#"
                    className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span className="sr-only">Settings</span>
                    <HiDotsVertical className="text-2xl" />
                  </a>
                </div>
              </div>
              }
              
               <div className="ml-auto flex items-center space-x-2 sm:space-x-3">
                {/* {AcccessData && AcccessData.map((item:any) => item.value == AddAccess ? ( 
                    <Button color="primary" onClick={() => OpenAddModel()} ><div className="flex items-center gap-x-3"> <HiPlus className="text-xl " />  Add {Name}  </div> </Button>
                ) : null)}  */}

                 {AddAccess  ? 
                      <Button color="primary" onClick={() => OpenAddModel()} ><div className="flex items-center gap-x-3"> <HiPlus className="text-xl " />  Add {Name}  </div> </Button>
                 : null } 

                 {/* {AcccessData && AcccessData.map((item:any) => item.value == AddAccess ? (  */}
                    {/* <Button color="gray"> <div className="flex items-center gap-x-3"> <HiDocumentDownload className="text-xl" /> <span>Export</span> </div>  </Button> */}

                    <ExportDataModal data={data} name="user-data" />
                 {/* ) : null )}  */}
              </div>
            </div>
          </div>
        </div>

      
    </>
  );
};

export default ExampleBreadcrumb;
