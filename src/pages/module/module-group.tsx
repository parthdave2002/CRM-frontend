import type { FC } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { Button, Checkbox, Label, Modal, Table,} from "flowbite-react";
import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { HiOutlineExclamationCircle, HiOutlinePencilAlt, HiTrash, HiKey,} from "react-icons/hi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Input, FormFeedback } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getModuleGrouplist,  getSingleModuleGroup, AddModuleGrouplist, DeleteModuleGrouplist,} from "../../Store/actions";
import ExamplePagination from "../../components/pagination";
import ExampleBreadcrumb from "../../components/breadcrumb";

const ModulegroupPage: FC = function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [edit_id, set_edu_id] = useState(0);                                                                                                
  const [isOpenDelteModel, setisOpenDelteModel] = useState(false);
  const [isOpenAddModel, setisOpenAddModel] = useState(false);

  // ---------------- Access Data Code start --------------
    const [AccessList, setAccessList] = useState([]);
    const [AccessCommon, setAccessCommon] = useState([]);
    const AccessDataList = AccessList && AccessList.map((item: any) => ({ value: item.access_name }));
    const AccessData = AccessCommon && AccessCommon.map((item: any) => ({ value: item.access_name }));
  // -------------- Access Data Code End --------------

  // ----------- Search Api Code Satrt ------------------
    const [searchData, setSearchData] = useState(null);
    const Changename = (data:any) =>{
      setSearchData(data)
    }
  // ------------  search api code End --------------------

  // ----------  next Button  Code Start --------------------
    const [TotalPage, setTotalPage] = useState(0);
    const [PageNo, setPageNo] = useState(1);
    const [RoePerPage, setRoePerPage] = useState(5);
    
    const RowPerPage = (value: any) => {setRoePerPage(value)};
    const PageDataList = (data:any) => { setPageNo(data)};
  // -------------------- Nect button Code End --------------------

  const [TotalListData, setTotalListData] = useState(0);
  const [CurrentUserListSize, setCurrentUserListSize] = useState();
  const [CurrentPageNo, setCurrentPageNo] = useState(0);
  const [ModuledataList, setModuledataList] = useState([]);
  const [SinlgeModuledataList, setSinlgeModuledataList] = useState([]);

  const menu = localStorage.getItem("Menu");
  useEffect(() => {
    if(menu == "Dialer"){
      let requserdatagroup ={
        page: PageNo,
        size: RoePerPage,
        search:searchData
      };
      dispatch(getModuleGrouplist(requserdatagroup));
    }
    else if(menu == "Default"){
      let requserdata = {  action: "module-index" };
      // dispatch(getLaravelMainModule(requserdata));
    }
  }, [dispatch, PageNo, RoePerPage, searchData]);

  // ------------------ Laravel Code Start ------------------
  const { ModuleDatalist, ModuleListSize, TotalModuleListData,Currentpage  } = useSelector((state:any) => ({
    ModuleDatalist: state.LaravelModule.ModuleDatalist,
    ModuleListSize: state.LaravelModule.ModuleListSize,
    TotalModuleListData: state.LaravelModule.TotalModuleListData,
    Currentpage: state.LaravelModule.CurrentPage,
  }));

  useEffect(() => {
    setModuledataList(ModuleDatalist ? ModuleDatalist : null);
    setCurrentUserListSize(ModuleListSize? ModuleListSize: 0);
    setTotalListData(TotalModuleListData? TotalModuleListData: 0);
    setCurrentPageNo(Currentpage? Currentpage: 1);
  }, [ModuleDatalist, Currentpage, TotalModuleListData,ModuleListSize ]);
  // ------------------ Laravel Code End ------------------

  // ------------------ Node Code Start ------------------
    const { ModuleData, SingleModuleGroupData, ModuleGroupListSize, TotalModuleGroupListData,  CurrentPage, } = useSelector((state:any) => ({
      ModuleData: state.Modules.ModuleGroupData,
      SingleModuleGroupData: state.Modules.SingleModuleGroupData,
      ModuleGroupListSize: state.Modules.ModuleGroupListSize,
      TotalModuleGroupListData: state.Modules.TotalModuleGroupListData,
      CurrentPage: state.Modules.CurrentPage,
    }));

    useEffect(() => {
      setModuledataList(ModuleData ? ModuleData.data : null);
      setAccessList(ModuleData.AccessData ? ModuleData.AccessData.list : []);
      setAccessCommon(ModuleData.AccessData ? ModuleData.AccessData.common : []);
      setSinlgeModuledataList( SingleModuleGroupData ? SingleModuleGroupData.data : null );
      setTotalListData(TotalModuleGroupListData ? TotalModuleGroupListData : 0);
      setCurrentUserListSize(ModuleGroupListSize ? ModuleGroupListSize : 0);
      setCurrentPageNo(CurrentPage ? CurrentPage : 1);
    }, [ ModuleData, SingleModuleGroupData, ModuleGroupListSize,  CurrentPage,  TotalModuleGroupListData, ]);
  
    // ------- Get Module Data Code Start ------
    const getModuledata = (id:any) => {
      setisOpenAddModel(true);
      let rqeuserdata = { id: id};
      dispatch(getSingleModuleGroup(rqeuserdata));
      set_edu_id(id);
    };
    //------- Get Module Data Code End -------
  
    //------- Delete Module Data Code Start -------
    const [Delete_id, set_Delete_id] = useState(0);
    const DeleteFuncall = (id:any) => {
      set_Delete_id(id);
      setisOpenDelteModel(true);
    };
  
    const DelRole = () => {
      let rqeuserdata = { id: Delete_id};
      dispatch(DeleteModuleGrouplist(rqeuserdata));
      setisOpenDelteModel(false);
    };
    //------- Delete Module Data Code End -------

    // --------- Edit Time set defult value Code start ---------------
    useEffect(() =>{
      if (SinlgeModuledataList) {
        setinitialValues({
          id:SinlgeModuledataList._id || "",
          module_group: SinlgeModuledataList.module_group || "",
          description: SinlgeModuledataList.description || "",
          order: SinlgeModuledataList.order || "",
        });
      }
    },[SinlgeModuledataList])
    // --------- Edit Time set defult value Code end ---------------
  // ------------------ Node Code End  ------------------


  const [initialValues, setinitialValues] = useState({
    id: 0,
    module_group: "",
    description: "",
    order: ""
  });
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: initialValues,

    validationSchema: Yup.object({
      module_group: Yup.string().required("Please Enter Module Name"),
      description: Yup.string().required("Please Enter Description"),
    }),

    onSubmit: (values) => {
      if (edit_id != 0) {
        setinitialValues({
          id: edit_id,
          module_group: values.module_group,
          order: values.order,
          description: values.description,
        });
      }

      dispatch(AddModuleGrouplist(values));
      validation.resetForm()
      validation.values.module_group = "";
      validation.values.description = "";
      validation.values.order = "";
      setisOpenAddModel(false);
    },
  });

  const ModuleListFuncall = (id: any) => {
    navigate("/module-manage", {
      state: { id: id._id, name: id.module_group },
    });
  };

  // ------- Add Modal Open code start ------
  const OpenAddModel = () =>{ setisOpenAddModel(true)}
  //-------  Add Modal Open code end -----

  let Name = "Module Group";
  let Searchplaceholder = "Search For Module";
  let AddAccess = "Module-Group-Add";

  return (
    <>
      <NavbarSidebarLayout  isFooter={false} isSidebar={true} isNavbar={true} isRightSidebar={true} >

        <ExampleBreadcrumb  Name={Name} Searchplaceholder = {Searchplaceholder} searchData= {searchData} Changename= {Changename}  isOpenAddModel= {OpenAddModel} AddAccess={AddAccess}/>
       
        <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
          <Table.Head className="bg-gray-100 dark:bg-gray-700">
            <Table.HeadCell> <Label htmlFor="select-all" className="sr-only"> Select all </Label> <Checkbox id="select-all" name="select-all" /> </Table.HeadCell>
            <Table.HeadCell>Module Group</Table.HeadCell>
            <Table.HeadCell>Order</Table.HeadCell>
            <Table.HeadCell>Description</Table.HeadCell>
            <Table.HeadCell className="text-center"> Actions  </Table.HeadCell>
            <Table.HeadCell>module List</Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">       
            {ModuledataList && ModuledataList.map((item: any, k:any) => (
              <Table.Row key={k} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <Table.Cell className="w-4 py-0" style={{ paddingTop: "1", paddingBottom: "1" }} > <Checkbox /> </Table.Cell>
                <Table.Cell className="whitespace-nowraptext-base font-medium text-gray-900 dark:text-white py-0"> {item.module_group} </Table.Cell>
                <Table.Cell className="whitespace-nowraptext-base font-medium text-gray-900 dark:text-white py-0"> {item.order} </Table.Cell>
                <Table.Cell className="whitespace-nowraptext-base font-medium text-gray-900 dark:text-white py-0"> {item.description} </Table.Cell>
                <Table.Cell className="space-x-2 whitespace-nowrap py-0">
                  <div className="flex items-center gap-x-3 justify-evenly">
                    {AccessDataList && AccessDataList.map((data) => data.value === "modulegroup-edit" ? (   <Button gradientDuoTone="greenToBlue" onClick={() => getModuledata(item._id)} > <div className="flex items-center gap-x-2"> <HiOutlinePencilAlt className="text-lg" /> Edit Module </div> </Button>  ) : null)} 
                    {AccessDataList && AccessDataList.map((data) => data.value === "modulegroup-deleted" ? (    <Button gradientDuoTone="purpleToPink" onClick={() => DeleteFuncall(item._id)} > <div className="flex items-center gap-x-2"> <HiTrash className="text-lg" /> Delete Module</div> </Button>  ) : null)} 
                  </div>
                </Table.Cell>
                <Table.Cell> {AccessDataList && AccessDataList.map((data) => data.value === "modulelist-view" ? (    <Button color="primary"  onClick={() => ModuleListFuncall(item)} > <div className="flex items-center gap-x-2"> <HiKey className="text-lg" /> Module List </div> </Button> ) : null)}  </Table.Cell>
              </Table.Row>
            ))}         
          </Table.Body>
        </Table>
             
        <ExamplePagination PageData={PageDataList} RowPerPage={RowPerPage}  PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData}/>
      </NavbarSidebarLayout>

      {/* Add Module Group */}
      <Modal onClose={() => setisOpenAddModel(false)} show={isOpenAddModel}>
        <Form onSubmit={(e) => {  e.preventDefault(); validation.handleSubmit(); return false }} >
          <Modal.Header className="border-b border-gray-200 p-2 dark:border-gray-700"> { edit_id == 0 ? <strong>Add New Module Group</strong> :  <strong>Edit Module Group</strong>}   </Modal.Header>
          <Modal.Body>
            <div>

              <div>
                <Label htmlFor="ModuleGroup"> Module Group</Label>
                <div className="mt-1">
                  <Input id="module_group" name="module_group" className="userinput"  placeholder="Module Group" type="text"  onChange={validation.handleChange} onBlur={validation.handleBlur} value={validation.values.module_group || ""} invalid={ validation.touched.module_group && validation.errors.module_group ? true : false } />
                  {validation.touched.module_group && validation.errors.module_group ? ( <FormFeedback type="invalid" className="text-Red text-sm">  {validation.errors.module_group} </FormFeedback>  ) : null}
                </div>
              </div>

              <div className="mt-3">
                <Label htmlFor="Order">Order</Label>
                <div className="mt-1">
                  <Input id="order" name="order" className="userinput" placeholder="order" type="text" onChange={validation.handleChange} onBlur={validation.handleBlur} value={validation.values.order || ""} invalid={ validation.touched.order && validation.errors.order ? true : false } />
                  {validation.touched.order && validation.errors.order ? ( <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.order}  </FormFeedback> ) : null}
                </div>
              </div>

              <div className="mt-3">
                <Label htmlFor="Description">Description</Label>
                <div className="mt-1">
                  <Input id="description" name="description" className="userinput" placeholder="Description" type="text" onChange={validation.handleChange} onBlur={validation.handleBlur} value={validation.values.description || ""} invalid={ validation.touched.description && validation.errors.description ? true : false } />
                  {validation.touched.description && validation.errors.description ? ( <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.description} </FormFeedback>  ) : null}
                </div>
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer className="justify-end p-2">
              {edit_id == 0  ?
                <Button size="sm" type="submit" className="bg-addbutton hover:bg-addbutton dark:bg-addbutton dark:hover:bg-addbutton" > Add Module </Button>
              : <Button size="sm" type="submit" className="bg-addbutton hover:bg-addbutton dark:bg-addbutton dark:hover:bg-addbutton" > Update Module </Button>
              }  
              <Button size="sm" className="ml-4 bg-deletebutton hover:bg-deletebutton dark:bg-deletebutton dark:hover:bg-deletebutton" onClick={() => setisOpenAddModel(false)} > Close  </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Delete model */}
      <Modal
        onClose={() => setisOpenDelteModel(false)}
        show={isOpenDelteModel}
        size="md"
      >
        <Modal.Header className="px-6 pt-6 pb-0">
          <span className="sr-only">Delete Module</span>
        </Modal.Header>
        <Modal.Body className="px-6 pt-0 pb-6">
          <div className="flex flex-col items-center gap-y-6 text-center">
            <HiOutlineExclamationCircle className="text-7xl text-red-500" />
            <p className="text-xl text-gray-500">
              Are you sure you want to delete this Module?
            </p>
            <div className="flex items-center gap-x-3">
              <Button color="failure" onClick={() => DelRole()}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setisOpenDelteModel(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModulegroupPage;