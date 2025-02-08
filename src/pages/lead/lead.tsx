import { FC, useEffect, useState } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import ExamplePagination from "../../components/pagination";
import ExampleBreadcrumb from "../../components/breadcrumb";
import { Button,  Checkbox, Table} from "flowbite-react";
import { useSelector } from "react-redux";
import { HiTrash } from "react-icons/hi";

const LeadListPage : FC = function () {

    // ----------- next Button  Code Start -------------
      const [UserDataList, setUserDataList] = useState([]);
      const [TotalPage, setTotalPage] = useState(0);
      const [PageNo, setPageNo] = useState(1);
      const [RoePerPage, setRoePerPage] = useState(5);
    
      const RowPerPage = (value: any) => { setRoePerPage(value)};
      const PageDataList = (data:any) =>{ setPageNo(data)}
    // ------------- Next button Code End -------------
    
    // ---------------- Search User code start ----------------
        const [searchData, setSearchData] = useState(null);
        const Changename = (data:any) =>{
            setSearchData(data)
        }
    // ---------------- Search User code end ----------------

    // ------------- Get  Data From Reducer Code Start --------------
      const { UserList,  UserListSize, TotalUserListData, CurrentPage } = useSelector((state: any) => ({
          UserList: state.User.UserList,
          UserListSize: state.User.UserListSize,
          TotalUserListData: state.User.TotalUserListData,
          CurrentPage: state.User.CurrentPage,
        }));

      const [TotalListData, setTotalListData] = useState(0);
      const [CurrentUserListSize, setCurrentUserListSize] = useState();
      const [CurrentPageNo, setCurrentPageNo] = useState(0);
      
      useEffect(() => {
        // setUserDataList(UserList. pulledData ? UserList. pulledData  : null);
        // setAccessList(UserList.AccessData ? UserList.AccessData.list : []);
        // setAccessCommon(UserList.AccessData ? UserList.AccessData.common : []);
        setTotalListData(TotalUserListData ? TotalUserListData : 0);
        setCurrentUserListSize(UserListSize ? UserListSize : 0);
        setCurrentPageNo(CurrentPage ? CurrentPage : 1);
      }, [UserList,  TotalUserListData, UserListSize, CurrentPage]);
    //  ------------- Get  Data From Reducer Code end --------------
    
    // --------- Checkbox Code start ------------
      const CheckData = (data:any) =>{
        console.log(data)
      }
    // --------- Checkbox Code end ------------
  

    let Name = "Lead List";
    let Searchplaceholder = "Search For Lead";

    return (
        <>  
            <NavbarSidebarLayout isFooter={false}  isSidebar={true} isNavbar={true} isRightSidebar={true}>
                <ExampleBreadcrumb  Name={Name} Searchplaceholder={Searchplaceholder} searchData={searchData} Changename= {Changename} />
                <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 ">
                    <Table.Head className="bg-gray-100 dark:bg-gray-700">
                        <Table.HeadCell> <Checkbox id="select-all" name="select-all" /> </Table.HeadCell>
                        <Table.HeadCell>Name</Table.HeadCell>
                        <Table.HeadCell>Phone</Table.HeadCell>
                        <Table.HeadCell>Email</Table.HeadCell>
                        <Table.HeadCell>State</Table.HeadCell>
                        <Table.HeadCell>City</Table.HeadCell>
                        <Table.HeadCell>Status</Table.HeadCell>
                        <Table.HeadCell>Created At</Table.HeadCell>
                        <Table.HeadCell>Actions</Table.HeadCell>
                    </Table.Head>

                    <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                        {UserDataList && UserDataList.map((item: any, k) => (
                                <Table.Row  key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700" >
                                <Table.Cell className="w-4 py-0" style={{ paddingTop: "1", paddingBottom: "1" }}>  <Checkbox  value={item._id} onClick={() => {CheckData(item._id)}}/>  </Table.Cell>
                                <Table.Cell className="whitespace-nowraptext-base font-medium text-gray-900 dark:text-white py-0">  {item.name} </Table.Cell>
                                <Table.Cell className="whitespace-nowraptext-base font-medium text-gray-900 dark:text-white py-0"> {item.email} </Table.Cell>
                                <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
                                    {item.is_active == true ? <div className="flex items-center">  <div className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400"></div> Active  </div>
                                    : <div className="flex items-center">  <div className="mr-2 h-2.5 w-2.5 rounded-full bg-Red"></div> Deactive  </div>}
                                </Table.Cell>
                                <Table.Cell className="space-x-2 whitespace-nowrap py-0">
                                    <div className="flex items-center gap-x-3">
                                  
                                    {/* {AccessDataList &&  AccessDataList.map((data) =>  data.value === "user-delete" ? (  */}
                                        <Button  gradientDuoTone="purpleToPink" ><div className="flex items-center gap-x-2 deletebutton"> <HiTrash className="text-lg" />  Delete </div> </Button>
                                    {/* ) : null )}   */}
                                    </div>
                                </Table.Cell>

                                </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
                <ExamplePagination PageData={PageDataList} RowPerPage={RowPerPage}  PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData}/>
            </NavbarSidebarLayout>
        </>
    );
}

export default LeadListPage;