/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button,  Checkbox, Label,  Modal,  Table} from "flowbite-react";
import type { FC } from "react";
import Select from "react-select";
import {  HiOutlineExclamationCircle, HiOutlinePencilAlt, HiTrash} from "react-icons/hi";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getUserlist, getUserView, UpdateUserdatalist, AddUserlist, DeleteUserlist, getRoleslist,  } from "../../Store/actions";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Input, FormFeedback } from "reactstrap";
import ExamplePagination from "../../components/pagination";
import ExampleBreadcrumb from "../../components/breadcrumb";

const UserListPage: FC = function () {
  const dispatch = useDispatch();

  const [isOpenUserAddModel, setisOpenUserAddModel] = useState(false);
  const [User_id, setUser_id] = useState(0);
  const [edit_id, set_edu_id] = useState(0);
  const [isOpenDelteModel, setisOpenDelteModel] = useState(false);
  const [isOpenAddModel, setisOpenAddModel] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [UserDataList, setUserDataList] = useState([]);
  const [AgentDataList, setAgentDataList] = useState([]);
  const [UserDataListView, setUserDataListView] = useState([]);
  const [RoleList, setRoleList] = useState([]);
 
  
  // Access Data Code start
  const [AccessList, setAccessList] = useState([]);
  const [AccessCommon, setAccessCommon] = useState([]);
  const AccessDataList = AccessList && AccessList.map((item: any) => ({ value: item.access_name }));
  const AccessData = AccessCommon && AccessCommon.map((item: any) => ({ value: item.access_name }));
  // Access Data Code end

  // ------------- Password Visivle Code Start --------------
  const [Visible, setVisible] = useState(false);
  const showpassword = () => {
    setVisible(!Visible);
  };
  // ---------------- Password Visivle Code End --------------------

  //------------ Stustus Code Start-------------
  const [statusidFeed, setstatusidFeed] = useState(0);
  const [selectedStatusOption, setSelectedStatusOption] = useState(null);
  const [selectedStatusid, setSelectedStatusid] = useState([]);

  const statusoptions = [
    { value: "true", label: "Active" },
    { value: "false", label: "Deactive" },
  ];

  const Statusdata = (data: any) => {
    if (!data) {
      setstatusidFeed(1);
      setSelectedStatusid([]);
      setSelectedStatusOption(null);
      return 0;
    } else {
      setstatusidFeed(0);
    }

    if (!data) {
      setSelectedStatusid([]);
      setSelectedStatusOption(null);
    } else {
      setSelectedStatusid(data.value);
      setSelectedStatusOption(data);
    }
  };
  // ----------------- Stustus Code End -----------------

  const options = RoleList && RoleList.map((item: any) => ({ value: item._id, label: item.role_title }));

  const { UserList, UserView, UserListSize, TotalUserListData, CurrentPage, Roleslist } = useSelector((state: any) => ({
      UserList: state.User.UserList,
      UserView: state.User.UserView,
      UserListSize: state.User.UserListSize,
      TotalUserListData: state.User.TotalUserListData,
      CurrentPage: state.User.CurrentPage,
      Roleslist: state.Role.Roleslist,
    }));

  // ----------- next Button  Code Start -------------
  const [TotalPage, setTotalPage] = useState(0);
  const [PageNo, setPageNo] = useState(1);
  const [RoePerPage, setRoePerPage] = useState(5);

  const RowPerPage = (value: any) => { setRoePerPage(value)};
  const PageDataList = (data:any) =>{ setPageNo(data)}
  // ------------- Nect button Code End -------------

  // ---------------- Search User code start ----------------
  const [searchData, setSearchData] = useState(null);
  const Changename = (data:any) =>{
    setSearchData(data)
  }
  // ---------------- Search User code end ----------------

  // ------------- Get User Data From Reducer Code Start --------------
  const rolecalled = () =>{
    dispatch(getRoleslist());
  }

  useEffect(() => {
    let requserdata = {
      page: PageNo,
      size: RoePerPage,
      search: searchData
    };
    dispatch(getUserlist(requserdata));

  }, [dispatch, PageNo, RoePerPage, searchData]);

  const [TotalListData, setTotalListData] = useState(0);
  const [CurrentUserListSize, setCurrentUserListSize] = useState();
  const [CurrentPageNo, setCurrentPageNo] = useState(0);


  
  useEffect(() => {
    setUserDataListView(UserView ? UserView.data : null);
    setUserDataList(UserList ? UserList : null);
    setAgentDataList(UserList ? UserList.Agentdata : null);
    setAccessList(UserList.AccessData ? UserList.AccessData.list : []);
    setAccessCommon(UserList.AccessData ? UserList.AccessData.common : []);
    setTotalListData(TotalUserListData ? TotalUserListData : 0);
    setCurrentUserListSize(UserListSize ? UserListSize : 0);
    setCurrentPageNo(CurrentPage ? CurrentPage : 1);
    setRoleList(Roleslist ? Roleslist.pulledData : null);
  }, [UserList, UserView, TotalUserListData, UserListSize, CurrentPage, Roleslist]);
  //  ------------- Get User Data From Reducer Code Start --------------

  // ------------- Get User Data Code Start --------------
  const getUserData = (id: any) => {
    set_edu_id(id);
    setisOpenAddModel(true);
    let rqeuserdata = { id: id };
    dispatch(getUserView(rqeuserdata));
  };
  // -----------Get Module Data Code End -------------------

  // ------------  Delete Module Data Code Start ------------
  const [Delete_id, set_Delete_id] = useState(0);
  const DeleteFuncall = (id: any) => {
    set_Delete_id(id);
    setisOpenDelteModel(true);
  };

  const DelRole = () => {
    let rqeuserdata = { id: Delete_id };
    dispatch(DeleteUserlist(rqeuserdata));
    setisOpenDelteModel(false);
  };
  // -------  Delete Module Data Code End ---------------

  // -----------  Selectize Data Code Start --------------
  const [roleidFeed, setroleidFeed] = useState(0); // for Validation of selectize
  const [UserRoleid, setUserRoleid] = useState([]);
  const Roledata = (data: any) => {
    if (!data) {
      setroleidFeed(1);
      setSelectedOption(null);
      setUserRoleid([]);
      return 0;
    } else {
      setroleidFeed(0);
    }

    if (!data) {
      setUserRoleid([]);
      setSelectedOption(null);
    } else {
      setUserRoleid(data.value);
      setSelectedOption(data);
    }
  };
  // --------------  Selectize Data Code End  --------------

  interface UserData {
    id: string;
    username: string;
    bio: string;
    email: string;
    is_active: string[];
    name: string;
    password: string;
    roles: string[];
}
  const [initialValues, setinitialValues] = useState<UserData>({
    id: edit_id.toString(),
    username:"",
    bio: "",
    email: "",
    is_active: [],
    name: "",
    password: "",
    roles: [],
  });

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: initialValues,

    validationSchema: Yup.object({
      username: Yup.string().required("Please Enter Username"),
      bio: Yup.string().required("Please Enter Bio"),
      email: Yup.string().email("Emter Valid Email id").required("Please Enter Email"),
      name: Yup.string().required("Please Enter Name"),
      // password: Yup.string().required("Please Enter Password"),
    }),

    onSubmit: async (values) => {

      try {
        const userData = {
          id: edit_id,
          bio: values.bio,
          email: values.email,
          is_active: values.is_active,
          username: values.username,
          name: values.name,
          password: values.password,
          roles: values.roles,
        };
    
        if (edit_id !== 0) {
          userData.roles = UserRoleid;
          userData.is_active = selectedStatusid;
          dispatch(UpdateUserdatalist(userData));
        } else {
          userData.roles = UserRoleid;
          userData.is_active = selectedStatusid;
          dispatch(AddUserlist(userData));
        }
    
        validation.resetForm();
        setisOpenAddModel(false);
        validation.values.username = "";
        validation.values.bio = "";
        validation.values.email = "";
        validation.values.name = "";
        validation.values.password = "";
        validation.values.roles = [];
        validation.values.is_active = [];
        set_edu_id(0);
        setUserRoleid([]);
        setSelectedOption(null);
        setSelectedStatusid([]);
        setSelectedStatusOption(null);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  });

  // ---------------- Add Agent Code Start  -----------------

  const AddAgentData = (id: any) => {
    setUser_id(id);
    setisOpenUserAddModel(true);
  };

  const [AgentDataid, setAgentDataid] = useState([]);
  const [SelectedAgent, setSelectedAgent] = useState(null);

  const AgnetStatusdata = (data: any) => {
    if (!data) {
      setAgentDataid([]);
      setSelectedAgent(null);
    } else {
      setAgentDataid(data.value);
      setSelectedAgent(data);
    }
  };

  const Statusoptions = [
    { value: "Active", label: "Active" },
    { value: "Deactive", label: "Deactive" },
  ];

  
  const [AddUserinitialValues, setAddUserinitialValues] = useState({
    id: 0,
    extention: "",
    extention_password: "",
    user_id: [],
    conference_no: "",
    group_no: "",
    status: [],
    permissions: "",
    time_permission: "",
    sip_phone: "",
  });


  // ----------------- Add Agent Code End -----------------------


  // --------- Checkbox Code start ------------
    const CheckData = (data:any) =>{
      console.log(data)
    }
  // --------- Checkbox Code end ------------

  const OpenAddModel = () =>{
    setisOpenAddModel(true);
    validation.values.username = "";
    validation.values.bio = "";
    validation.values.email = "";
    validation.values.name = "";
    validation.values.password = "";
    validation.values.roles = [];
    validation.values.is_active = [];
    set_edu_id(0);
    setUserRoleid([]);
    setSelectedOption(null);
    setSelectedStatusid([]);
    setSelectedStatusOption(null);
  }

  let Name = "User List";
  let Searchplaceholder = "Search For Users (Name)";
  let AddAccess = "user-add";

  return (
    <>
      <NavbarSidebarLayout isFooter={false}  isSidebar={true} isNavbar={true} isRightSidebar={true}>

        <ExampleBreadcrumb  Name={Name} Searchplaceholder={Searchplaceholder} searchData={searchData} Changename= {Changename} isOpenAddModel= {OpenAddModel} AddAccess={AddAccess}/>
    
          <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600 ">
              <Table.Head className="bg-gray-100 dark:bg-gray-700">
                <Table.HeadCell> <Checkbox id="select-all" name="select-all" /> </Table.HeadCell>
                <Table.HeadCell>User Name</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
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
                              {/* {AccessDataList && AccessDataList.map((data) => data.value === "user-edit" ? ( */}
                                  <Button gradientDuoTone="greenToBlue" onClick={() => getUserData(item._id)} > <div className="flex items-center gap-x-2">  <HiOutlinePencilAlt className="text-lg" />  Edit User  </div></Button>
                              {/* ) : null)}  */}
       
                              {/* {AccessDataList &&  AccessDataList.map((data) =>  data.value === "user-delete" ? (  */}
                                  <Button  gradientDuoTone="purpleToPink" onClick={() => DeleteFuncall(item._id)}><div className="flex items-center gap-x-2 deletebutton"> <HiTrash className="text-lg" />  Delete user  </div> </Button>
                              {/* ) : null )}   */}
                            </div>
                          </Table.Cell>

                        </Table.Row>
                  ))}
              </Table.Body>
          </Table>
          
        <ExamplePagination PageData={PageDataList} RowPerPage={RowPerPage}  PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData}/>
      </NavbarSidebarLayout>

      {/* Add Model  */}
      <Modal onClose={() => setisOpenAddModel(false)} show={isOpenAddModel} className="backdrop-blur-sm">
        <Form  onSubmit={(e) => { e.preventDefault(); validation.handleSubmit();  return false;}} >
          <Modal.Header className="border-b border-gray-200 px-6 pt-0 py-2 dark:border-gray-700"> {edit_id == 0  ? <strong>Add New User</strong>  :  <strong>Edit User</strong>}  </Modal.Header>

          <Modal.Body className="p-1 max-h-[27rem] overflow-scroll">

            <div>
              <Label htmlFor="username">Username</Label>
              <div className="mt-1">
                <Input id="username" name="username" className="userinput" placeholder="username" type="text" onChange={validation.handleChange} onBlur={validation.handleBlur}  value={validation.values.username || ""} invalid={validation.touched.username && validation.errors.username ? true  : false}/>
                {validation.touched.username && validation.errors.username ? <FormFeedback type="invalid" className="text-Red"> {validation.errors.username}  </FormFeedback> : null}
              </div>
            </div>

            <div className="mt-3">
              <Label htmlFor="email">Email</Label>
              <div className="mt-1">
                <Input id="email" name="email" className="userinput" placeholder="Email" type="text" onChange={validation.handleChange} onBlur={validation.handleBlur}  value={validation.values.email || ""} invalid={validation.touched.email && validation.errors.email ? true  : false}/>
                {validation.touched.email && validation.errors.email ? <FormFeedback type="invalid" className="text-Red"> {validation.errors.email}  </FormFeedback> : null}
              </div>
            </div>

            <div className="mt-3">
              <Label htmlFor="lastName"> Name </Label>
              <div className="mt-1">
                <Input id="name" name="name" className="userinput" placeholder="Name" type="text" onChange={validation.handleChange} onBlur={validation.handleBlur} value={validation.values.name || ""} invalid={validation.touched.name && validation.errors.name ? true : false } />
                {validation.touched.name && validation.errors.name ? <FormFeedback type="invalid" className="text-Red">  {validation.errors.name} </FormFeedback> : null}
              </div>
            </div>

            <div className="mt-3">
              <Label htmlFor="bio">Bio</Label>
              <div className="mt-1">
                <Input id="bio" name="bio" className="userinput" placeholder="Bio" type="text"  onChange={validation.handleChange} onBlur={validation.handleBlur}  value={validation.values.bio || ""} invalid={ validation.touched.bio && validation.errors.bio  ? true : false } />
                {validation.touched.bio && validation.errors.bio ? <FormFeedback type="invalid" className="text-Red"> {validation.errors.bio} </FormFeedback> : null}
              </div>
            </div>

            <div className="mt-3" onClick={() => {rolecalled()}}>
              <Label htmlFor="Roles">Roles</Label>
              <div className="mt-1"> <Select isClearable={true} isMulti={false} value={selectedOption}  onChange={(e) => {Roledata(e)}} options={options}/> </div>
              <FormFeedback  type="invalid" style={{ display: roleidFeed == 0 ? "none" : "block" }} className="text-red-600"> Please Select Role </FormFeedback>
            </div>
            

            <div className="mt-3">
              <Label htmlFor="password">New Password</Label>
              <div className="mt-1">
                  <Input  id="password" name="password" className="userinput"  placeholder="Password" type={Visible == true ? "text" : "password"} onChange={validation.handleChange} onBlur={validation.handleBlur}  value={validation.values.password || ""}  invalid={ validation.touched.password && validation.errors.password ? true : false}/>
                  {validation.touched.password && validation.errors.password ? <FormFeedback type="invalid" className="text-Red">  {validation.errors.password} </FormFeedback> : null}
              </div>
              {validation.values.password && validation.values.password.length > 0 ? <Button  size="sm" className="nextbtn"  onClick={() => {  showpassword() }} > View Password </Button> : null}
            </div>

            <div className="mt-3">
              <Label htmlFor="Status">Status</Label>
              <div className="mt-1"> <Select isClearable={true} isMulti={false} value={selectedStatusOption}  onChange={(e) => { Statusdata(e);}}  options={statusoptions}  /></div>
              <FormFeedback type="invalid"  style={{ display: statusidFeed == 0 ? "none" : "block"}}  > Please Select Status </FormFeedback>
            </div>
          </Modal.Body>

          <Modal.Footer className="justify-end p-2 ">
              {edit_id == 0  ? 
                <Button size="sm"  type="submit" className="bg-addbutton hover:bg-addbutton dark:bg-addbutton dark:hover:bg-addbutton"> Add user </Button>
                :<Button size="sm"  type="submit" className="bg-addbutton hover:bg-addbutton dark:bg-addbutton dark:hover:bg-addbutton"> Update User </Button>
              }
              <Button size="sm" className="ml-4 bg-deletebutton hover:bg-deletebutton dark:bg-deletebutton dark:hover:bg-deletebutton"  onClick={() => setisOpenAddModel(false)} > Close </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Delete  Model */}
      <Modal onClose={() => setisOpenDelteModel(false)} show={isOpenDelteModel} size="md" >
        <Modal.Header className="px-6 pt-6 pb-0"> <span className="sr-only">Delete user</span> </Modal.Header>
        <Modal.Body className="px-6 pt-0 pb-6">
          <div className="flex flex-col items-center gap-y-6 text-center"> 
            <HiOutlineExclamationCircle className="text-7xl text-red-500" /> <p className="text-xl text-gray-500">  Are you sure you want to delete this user?</p>
            <div className="flex items-center gap-x-3"> <Button color="failure" onClick={() => DelRole()}>  Yes, I'm sure </Button> <Button color="gray" onClick={() => setisOpenDelteModel(false)}> No, cancel </Button></div>
          </div>
        </Modal.Body>
      </Modal>

    </>
  );
};

export default UserListPage;