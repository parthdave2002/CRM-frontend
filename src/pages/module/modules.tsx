import type { FC } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import {
  Breadcrumb,
  Button,
  Checkbox,
  Label,
  Modal,
  Table,
  TextInput,
} from "flowbite-react";
import { useEffect, useState } from "react";
import {
  HiChevronLeft,
  HiChevronRight,
  HiCog,
  HiDocumentDownload,
  HiDotsVertical,
  HiExclamationCircle,
  HiHome,
  HiOutlineExclamationCircle,
  HiOutlinePencilAlt,
  HiPlus,
  HiTrash,
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {
  getModulelist,
  getSingleModulelist,
  getModuleGrouplist,
  getSearchData,
  AddModulelist,
  DeleteModulelist,
} from "../../Store/actions";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Input, FormFeedback } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import ExamplePagination from "../../components/pagination";
import ExampleBreadcrumb from "../../components/breadcrumb";

const ModulesPage: FC = function () {
  const location = useLocation();
  const [Module_id, set_Module_id] = useState(0);
  const [Module_group, set_Module_group] = useState("");

  useEffect(() => {
    if (location.state) {
      set_Module_id(location.state.id);
      set_Module_group(location.state.name);
    }
  }, [location]);

  const dispatch = useDispatch();
  const [edit_id, set_edu_id] = useState(0);
  const [isOpenDelteModel, setisOpenDelteModel] = useState(false);
  const [isOpenAddModel, setisOpenAddModel] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [SingleModule, setSingleModule] = useState([]);
  const [ProductList, setProductList] = useState([]);

  // Access Data Code start
  const [AccessList, setAccessList] = useState([]);
  const AcccessData =
    AccessList && AccessList.map((item:any) => ({ value: item.access_name }));
  // Access Data Code start

  // next Button  Code Start
  const [TotalPage, setTotalPage] = useState(0);
  const [PageNo, setPageNo] = useState(1);
  const [RoePerPage, setRoePerPage] = useState(5);

  const RowPerPage = (value: any) => {
    setRoePerPage(value);
  };

  const PageDataList = (data:any) =>{
    setPageNo(data)
  }
  // Nect button Code End

  const [SearchDataList, setSearchDataList] = useState([]);
  const {
    ModuleData,
    SingleModuleData,
    SearchModuleData,
    TotalModuleListData,
    CurrentPage,
    ModuleListSize,
    LaravelSubModulelist,
    ModuleListsize,
    TotalModuleListDat,
    Currentpage
  } = useSelector((state:any) => ({
    ModuleData: state.Modules.ModuleData,
    SingleModuleData: state.Modules.SingleModuleData,
    SearchModuleData: state.Modules.SearchModuleData,

    ModuleListSize: state.Modules.ModuleListSize,
    CurrentPage: state.Modules.CurrentPage,
    TotalModuleListData: state.Modules.TotalModuleListData,

    // laravel Code
    LaravelSubModulelist: state.LaravelModule.LaravelSubModulelist,
    ModuleListsize: state.LaravelModule.ModuleListSize,
    TotalModuleListDat: state.LaravelModule.TotalModuleListData,
    Currentpage: state.LaravelModule.CurrentPage,
  }));

  useEffect(() => {
    if (Module_id != 0) {
      const menu = localStorage.getItem("Menu");
      if(menu == "Dialer"){
        let requserdata = {
          id: Module_id,
          type: "Module-List-View",
          sub_module_id: "64cb9eccfa4b3d167429b29e",
          page: PageNo,
          size: RoePerPage,
        };
  
        let requserdatagroup = {
          // size: 100,
          type: "Module-Group-view",
        };
        dispatch(getModulelist(requserdata));
        dispatch(getModuleGrouplist(requserdatagroup));
      }
      else if(menu == "Default"){
        let requserdata = {  action: "module-child", module_id:Module_id };
        // dispatch(getLaravelSubModule(requserdata));
      }
    }
  }, [Module_id, PageNo, RoePerPage]);

  const [TotalListData, setTotalListData] = useState(0);
  const [CurrentUserListSize, setCurrentUserListSize] = useState();
  const [CurrentPageNo, setCurrentPageNo] = useState(0);

  useEffect(() => {
    setProductList(ModuleData && ModuleData.modules ? ModuleData.modules : LaravelSubModulelist  || null);
    setAccessList(ModuleData ? ModuleData.AccessData : null);
    setSingleModule(SingleModuleData ? SingleModuleData.data : null);

    setTotalListData(TotalModuleListData ? TotalModuleListData  : 0);
    setCurrentUserListSize(ModuleListSize ? ModuleListSize : 0);
    setCurrentPageNo(CurrentPage ? CurrentPage : 1);

  // Laravel Code
    // setProductList( ? LaravelSubModulelist : null);
    setTotalListData(TotalModuleListDat ? TotalModuleListDat  : 0);
    setCurrentUserListSize(ModuleListsize ? ModuleListsize : 0);
    setCurrentPageNo(Currentpage ? Currentpage : 1);
    
  }, [ ModuleData, SingleModuleData, TotalModuleListData, ModuleListSize, CurrentPage, LaravelSubModulelist, ModuleListsize,  TotalModuleListDat, Currentpage]);

  useEffect(() => {
    setSearchDataList(SearchModuleData ? SearchModuleData.data : null);
  }, [SearchModuleData]);

  // Get Module Data Code Start
  const getModuledata = (id:any) => {
    setOpen(true);
    let rqeuserdata = { id: id, type: "Module-List-Edit",module_group:  Module_id };
    dispatch(getSingleModulelist(rqeuserdata));
    set_edu_id(id);
  };
  // Get Module Data Code End

  // Delete Module Data Code Start
  const [Delete_id, set_Delete_id] = useState(0);
  const DeleteFuncall = (id:any) => {
    set_Delete_id(id);
    setisOpenDelteModel(true);
  };

  const DelRole = () => {
    let rqeuserdata = { id: Delete_id, type: "Module-List-Delete",module_group:  Module_id};
    dispatch(DeleteModulelist(rqeuserdata));
    setisOpenDelteModel(false);
  };

  // Delete Module Data Code End

  const [initialValues, setinitialValues] = useState({
    id: 0,
    module_name: "",
    description: "",
    module_group: Module_id,
    type: "Module-List-Add",
  });

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: initialValues,

    validationSchema: Yup.object({
      module_name: Yup.string().required("Please Enter Module Name"),
      description: Yup.string().required("Please Enter Description"),
    }),

    onSubmit: (values) => {
      if (edit_id != 0) {
        setinitialValues({
          id: edit_id,
          module_name: values.module_name,
          description: values.description,
          type: "Module-List-Edit",
          module_group: Module_id,
        });
      }
      dispatch(AddModulelist(values));
      validation.resetForm();
      initialValues.module_name = "";
      initialValues.description = "";
      setOpen(false);
      setisOpenAddModel(false);
    },
  });

  useEffect(() => {
    initialValues.module_group = Module_id;
  }, [Module_id]);

  const Editfuncall = () => {
    validation.handleSubmit();
  };

  useEffect(() => {
    if (edit_id != 0) {
      setinitialValues({
        id: edit_id,
        type: "Module-List-Edit",
      });
    }
  }, [edit_id]);

  // Search Code Start
  const [searchData, setSearchData] = useState(null);
  useEffect(() => {
    if (searchData != null) {
      let requserdata = {
        key: searchData,
      };
      dispatch(getSearchData(requserdata));
    }
  }, [searchData]);
  // Search Code end

  return (
    <>
      <NavbarSidebarLayout  isFooter={false} isSidebar={true}  isNavbar={true}  isRightSidebar={true}>
        <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
          <div className="mb-1 w-full">
            <div className="mb-4">
              <Breadcrumb className="mb-4">
                <Breadcrumb.Item>
                  <Link to="/dashboard">
                    <div className="flex items-center gap-x-3">
                      <HiHome className="text-xl" />
                      <span className="dark:text-white">Home</span>
                    </div>
                  </Link>
                </Breadcrumb.Item>

                <Breadcrumb.Item>
                  <Link to="/module_list">Module-group</Link>
                </Breadcrumb.Item>

                <Breadcrumb.Item>Module List</Breadcrumb.Item>
              </Breadcrumb>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                {Module_group} Module List
              </h1>
            </div>
            <div className="sm:flex">
              <div className="mb-3 hidden items-center dark:divide-gray-700 sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100">
                <Form>
                  <Label htmlFor="users-search" className="sr-only">
                    Search
                  </Label>
                  <div className="relative mt-1 lg:w-64 xl:w-96">
                    <Input
                      id="Search_Module"
                      name="Search_Module"
                      className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                      placeholder="Search Module"
                      type="text"
                      onChange={(e) => {
                        setSearchData(e.target.value);
                      }}
                      value={searchData}
                    />
                  </div>
                </Form>
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
              <div className="ml-auto flex items-center space-x-2 sm:space-x-3">
                {AcccessData &&
                  AcccessData.map((item) =>
                    item.value === "Module-List-Add" ? (
                      <Button
                        color="primary"
                        onClick={() => setisOpenAddModel(true)}
                      >
                        <div className="flex items-center gap-x-3">
                          <HiPlus className="text-xl" />
                          Add Module
                        </div>
                      </Button>
                    ) : null
                  )}

                {AcccessData &&
                  AcccessData.map((item) =>
                    item.value === "Module-List-Add" ? (
                      <Button color="gray">
                        <div className="flex items-center gap-x-3">
                          <HiDocumentDownload className="text-xl" />
                          <span>Export</span>
                        </div>
                      </Button>
                    ) : null
                  )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden shadow">
                <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                  <Table.Head className="bg-gray-100 dark:bg-gray-700">
                    <Table.HeadCell>
                      <Label htmlFor="select-all" className="sr-only">
                        Select all
                      </Label>
                      <Checkbox id="select-all" name="select-all" />
                    </Table.HeadCell>
                    <Table.HeadCell>Module Group</Table.HeadCell>
                    <Table.HeadCell>Module Name</Table.HeadCell>
                    <Table.HeadCell>Description</Table.HeadCell>
                    <Table.HeadCell className="text-center">
                      Actions
                    </Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                    {ProductList &&
                      ProductList.map((item: any, k) => (
                        <Table.Row
                          key={k}
                          className="hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <Table.Cell
                            className="w-4 py-0"
                            style={{ paddingTop: "1", paddingBottom: "1" }}
                          >
                            <Checkbox />
                          </Table.Cell>

                          <Table.Cell className="whitespace-nowraptext-base font-medium text-gray-900 dark:text-white py-0">
                            {Module_group}
                            {/* {item && item ? item.path.map(({ id, access_type }: any) => (
                                  <div key={id}>{access_type}</div>
                                ))
                              : null} */}
                          </Table.Cell>

                          <Table.Cell className="whitespace-nowraptext-base font-medium text-gray-900 dark:text-white py-0">
                            {item.module_name}
                          </Table.Cell>

                          <Table.Cell className="whitespace-nowraptext-base font-medium text-gray-900 dark:text-white py-0">
                            {item.description}
                          </Table.Cell>

                          <Table.Cell className="space-x-2 whitespace-nowrap py-0">
                            <div className="flex items-center gap-x-3 justify-evenly">
                              {AcccessData &&
                                AcccessData.map((data) =>
                                  data.value === "Module-List-Edit" ? (
                                    <Button
                                      gradientDuoTone="greenToBlue"
                                      onClick={() => getModuledata(item._id)}
                                    >
                                      <div className="flex items-center gap-x-2">
                                        <HiOutlinePencilAlt className="text-lg" />
                                        Edit Module
                                      </div>
                                    </Button>
                                  ) : null
                                )}

                              {AcccessData &&
                                AcccessData.map((data) =>
                                  data.value === "Module-List-Delete" ? (
                                    <Button
                                      gradientDuoTone="purpleToPink"
                                      onClick={() => DeleteFuncall(item._id)}
                                    >
                                      <div className="flex items-center gap-x-2">
                                        <HiTrash className="text-lg" />
                                        Delete Module
                                      </div>
                                    </Button>
                                  ) : null
                                )}
                            </div>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                  </Table.Body>
                </Table>
              </div>
            </div>
          </div>
        </div>

        <ExamplePagination PageData={PageDataList} RowPerPage={RowPerPage}  PageNo={PageNo} CurrentPageNo={CurrentPageNo} TotalListData={TotalListData}/>
      </NavbarSidebarLayout>

      {/* Add module */}

      <Modal onClose={() => setisOpenAddModel(false)} show={isOpenAddModel}>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}
        >
          <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
            <strong>Add New Module</strong>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div>
                <Label htmlFor="ModuleName">Module Name</Label>
                <div className="mt-1">
                  <Input
                    id="module_name"
                    name="module_name"
                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                    placeholder="Module Name"
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.module_name || ""}
                    invalid={
                      validation.touched.module_name &&
                      validation.errors.module_name
                        ? true
                        : false
                    }
                  />
                  {validation.touched.module_name &&
                  validation.errors.module_name ? (
                    <FormFeedback type="invalid" className="text-Red text-sm">
                      {validation.errors.module_name}
                    </FormFeedback>
                  ) : null}
                </div>
              </div>

              <div className="mt-3">
                <Label htmlFor="Description">Description</Label>
                <div className="mt-1">
                  <Input
                    id="description"
                    name="description"
                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                    placeholder="Description"
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.description || ""}
                    invalid={
                      validation.touched.description &&
                      validation.errors.description
                        ? true
                        : false
                    }
                  />
                  {validation.touched.description &&
                  validation.errors.description ? (
                    <FormFeedback type="invalid" className="text-Red text-sm">
                      {validation.errors.description}
                    </FormFeedback>
                  ) : null}
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="justify-end">
            <div className="flex">
              <Button
                size="sm"
                type="submit"
                className="bg-addbutton hover:bg-addbutton dark:bg-addbutton dark:hover:bg-addbutton"
              >
                Add Module
              </Button>

              <Button
                size="sm"
                className="ml-4 bg-deletebutton hover:bg-deletebutton dark:bg-deletebutton dark:hover:bg-deletebutton"
                onClick={() => setisOpenAddModel(false)}
              >
                Close
              </Button>
            </div>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Edit module */}
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Edit Module</strong>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>
              <Label htmlFor="ModuleName">Module Name</Label>
              <div className="mt-1">
                <Input
                  id="module_name"
                  name="module_name"
                  className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                  placeholder="Module Name"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  defaultValue={SingleModule ? SingleModule.module_name : null}
                  invalid={
                    validation.touched.module_name &&
                    validation.errors.module_name
                      ? true
                      : false
                  }
                />
                {validation.touched.module_name &&
                validation.errors.module_name ? (
                  <FormFeedback type="invalid" className="text-Red">
                    {validation.errors.module_name}
                  </FormFeedback>
                ) : null}
              </div>
            </div>

            <div className="mt-3">
              <Label htmlFor="Description">Description</Label>
              <div className="mt-1">
                <Input
                  id="description"
                  name="description"
                  className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                  placeholder="description"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  defaultValue={SingleModule ? SingleModule.description : null}
                  invalid={
                    validation.touched.description &&
                    validation.errors.description
                      ? true
                      : false
                  }
                />
                {validation.touched.description &&
                validation.errors.description ? (
                  <FormFeedback type="invalid" className="text-Red">
                    {validation.errors.description}
                  </FormFeedback>
                ) : null}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-end">
          <div className="flex">
            <Button
              className="bg-addbutton hover:bg-addbutton dark:bg-addbutton dark:hover:bg-addbutton"
              onClick={() => Editfuncall()}
            >
              Update Module
            </Button>
            <Button
              size="sm"
              className="ml-4 bg-deletebutton hover:bg-deletebutton dark:bg-deletebutton dark:hover:bg-deletebutton"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      {/* Delete module */}
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



export default ModulesPage;
