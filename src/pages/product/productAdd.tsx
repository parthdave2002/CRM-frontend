import { FC, useEffect, useState } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import ExampleBreadcrumb from "../../components/breadcrumb";
import { Label, Button } from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { HiTrash} from "react-icons/hi";
import { Form, Input, FormFeedback } from "reactstrap";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AddProductlist, getCategorylist, getCompanylist, getPackingTypelist, GetProductViewlist, ResetProductlist, UpdateProductlist } from "../../Store/actions";
import MultiImageUploadPreview from "../../components/multiimageuploader";
import { toast } from "react-toastify";
  interface DescriptionData {
    id: string;
    englishHeader: string;
    englishValue: string;
    gujaratiHeader: string;
    gujaratiValue: string;
  }
  
  interface TechName {
    gujarati_tech_name: string;
    english_tech_name: string;
  }
  
  interface CompanyData {
    _id: string;
    name_eng: string;
    name_guj: string;
  }

  interface Category {
    _id: string;
    name_eng: string;
    name_guj: string;
  }
  
  interface PackingType {
    _id : string;
    type_eng: string;
    type_guj: string;
  }
  
  interface Name {
    gujaratiname: string;
    englishname: string;
  }

  interface ProductDetails {
    _id: string;
    added_at: string;
    name: Name;
    tech_name: TechName;
    avl_qty: number | string;
    batch_no: number | string;
    hsn_code: number | string;
    c_gst: number | string;
    s_gst: number | string;
    company: CompanyData;
    categories: Category;
    price: number | string;
    discount: number;
    packaging: number | string;
    packagingtype: PackingType;
    description: DescriptionData[];
    product_pics: any[];
    rating: any;
    is_active: boolean;
    is_deleted: boolean;
  }

const ProductAddPage : FC = function () {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [file, setFile] = useState<File[] | null>(null);

    useEffect(() =>{
        if(CompanyListData.length == 0) dispatch(getCompanylist()); 
        if (PackingTypeListData.length == 0) dispatch(getPackingTypelist());
        if (CategoryListData.length == 0) dispatch(getCategorylist());
    },[])

    // ------------- Company Get Data From Reducer Code Start --------------
        const [ CompanyListData, setCompanyListData] = useState([]);
        const Companylist = useSelector((state: any) => state.Company.Companylist,);
        const companyoption = CompanyListData ?.filter((item: any) => item.is_active)  .map((item: any) => ({ label: item.name_eng, value: item._id }));
        const [selectedCompanyOption, setSelectedCompanyOption] = useState<{label: string, value:string} | null>(null);
        const [selectedCompanyid, setSelectedCompanyid] = useState<string | null>(null);
        const [validateCompany, setValidateCompany] = useState(0);
  
        useEffect(() => {        
            setCompanyListData(Companylist? Companylist : []);
        },[Companylist]);

        const IsCompanydata = (data: any) => {
          if (!data) {
            setSelectedCompanyid("");
            setSelectedCompanyOption(null);
            setValidateCompany(1)
          } else {
            setSelectedCompanyid(data.value);
            setSelectedCompanyOption(data);
            setValidateCompany(0)
          }
        };
    //  ------------- Company Get Data From Reducer Code end --------------
  
    // ------------- Packing Type Get Data From Reducer Code Start --------------
        const [PackingTypeListData, setPackingTypeListData] = useState([]);
        const Packingtypelist  = useSelector((state: any) => state.PackingType.Packingtypelist,);
        const packingtypeoption = PackingTypeListData && PackingTypeListData ?.filter((item: any) => item.is_active)  .map((item: any) => ({ label: item.type_eng, value: item._id }));
        const [selectedpackingTypeOption, setSelectedpackingTypeOption] = useState<{label: string, value:string} | null>(null);
        const [selectedpackingTypeid, setSelectedpackingTypeid] = useState<string | null>(null);
        const [validatepackingType, setValidatepackingType] = useState(0);

        useEffect(() => {
            setPackingTypeListData(Packingtypelist ? Packingtypelist : []);
        }, [Packingtypelist]);
      
        const IspackingTypedata = (data: any) => {
          if (!data) {
            setSelectedpackingTypeid("");
            setSelectedpackingTypeOption(null);
            setValidatepackingType(1)
          } else {
            setSelectedpackingTypeid(data.value);
            setSelectedpackingTypeOption(data);
            setValidatepackingType(0)
          }
        };
    //  ------------- Packing Type Get Data From Reducer Code end --------------

    // ------------- Category Get Data From Reducer Code Start --------------
        const [CategoryListData, setCategoryListData] = useState([]);
        const  Categorylist  = useSelector((state: any) => state.Category.Categorylist,);
        const categoryoption = CategoryListData && CategoryListData?.filter((item: any) => item.is_active).map((item: any) => ({ label: item.name_eng, value: item._id }));
        const [selectedCategoryOption, setSelectedCategoryOption] = useState<{ label: string, value: string } | null>(null);
        const [selectedCategoryid, setSelectedCategoryid] = useState<string | null>(null);
        const [validateCategory, setValidateCategory] = useState(0);

        useEffect(() => {
            setCategoryListData(Categorylist ? Categorylist : []);
        }, [Categorylist]);

        const IsCategorydata = (data: any) => {
            if (!data) {
                setSelectedCategoryid("");
                setSelectedCategoryOption(null);
                setValidateCategory(1)
            } else {
                setSelectedCategoryid(data.value);
                setSelectedCategoryOption(data);
                setValidateCategory(0)
            }
        };
    //  ------------- Category Get Data From Reducer Code end --------------

    // -------------------- product description code start -----------------
        const [inputs, setInputs] = useState<DescriptionData[]>([   { id: "", gujaratiHeader: "", englishHeader: "", gujaratiValue: "", englishValue: "" }]);
        const handleChange = (id: string, field: keyof DescriptionData, newValue: string) => {
            setInputs((prev) =>
                prev.map((item) => (item.id === id ? { ...item, [field]: newValue } : item))
            );
        };

        const handleAddField = () => {
            setInputs([...inputs, { id: String(Date.now()), gujaratiHeader: "", englishHeader: "", gujaratiValue: "", englishValue: "" }]);
        };

        const handleRemoveField = (id: string) => {
            setInputs((prev) => prev.filter((item) => item.id !== id));
        };
    // -------------------- product description code end -----------------

    // ------ status code start ------
        const [selectedactiveOption, setSelectedactiveOption] = useState(null);
        const [selectedactiveid, setSelectedactiveid] = useState("");
        const [validateactive, setValidateactive] = useState(0);
    
        const IsActivedata = (data: any) => {
        if (!data) {
            setSelectedactiveid("");
            setSelectedactiveOption(null);
            setValidateactive(1)
        } else {
            setSelectedactiveid(data.value);
            setSelectedactiveOption(data);
            setValidateactive(0)
        }
        };
    // ------ status code end ------

    const [initialValues, setinitialValues] = useState<ProductDetails>({
        added_at: '',
        avl_qty: '',
        batch_no: '',
        c_gst: 0,
        company: {
            _id: '',
            name_eng: '',
            name_guj: ''
        },
        categories: {
            _id: '',   
            name_eng: '',
            name_guj: ''
        },
        description: [],
        discount: 0,
        hsn_code: '',
        is_active: true,
        is_deleted: false,
        name: {
            gujaratiname: '',
            englishname: ''
        },
        packaging: '',
        packagingtype: {
            _id : '',
            type_eng: '',
            type_guj: ''
        },
        price: '',
        product_pics: [],
        rating: null,
        s_gst: 0,
        tech_name: {
            gujarati_tech_name: '',
            english_tech_name: ''
        },
        _id: ''
    });

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
    
        validationSchema: Yup.object({
            name: Yup.object({
                englishname: Yup.string().required("Please enter english product name"),
                gujaratiname: Yup.string().required("Please enter gujarati product name"),
            }),
            tech_name: Yup.object({
                english_tech_name: Yup.string().required("Please enter english product technical name"),
                gujarati_tech_name: Yup.string().required("Please enter gujarati product technical  name"),
            }),
          packaging: Yup.string().required("Please enter product packing"),
          avl_qty: Yup.string().required("Please enter product qty"),
          price: Yup.string().required("Please enter product price"),
          discount: Yup.string().required("Please enter product discount"),
          batch_no: Yup.string().required("Please enter product batch number"),
          hsn_code: Yup.string().required("Please enter product hsn code"),
          c_gst: Yup.string().required("Please enter product cgst"),
          s_gst: Yup.string().required("Please enter product sgst"),
        }),
        
        onSubmit: (values) => {
            if(selectedactiveid == ""){
                setValidateactive(1)
                return;
            }

            if(selectedCategoryid == null){
                setValidateCategory(1)
                return;
            }

            if(selectedpackingTypeid == null){
                setValidatepackingType(1)
                return;
            }

            if(selectedCompanyid == null){
                setValidateCompany(1)
                return;
            }

            const formData = new FormData();
            formData.append("name[gujaratiname]", values?.name?.gujaratiname);
            formData.append("name[englishname]", values?.name?.englishname);
            formData.append("tech_name[gujarati_tech_name]", values?.tech_name?.gujarati_tech_name);
            formData.append("tech_name[english_tech_name]", values?.tech_name?.english_tech_name);
            formData.append("packaging", JSON.stringify(values?.packaging));
            formData.append("price", JSON.stringify(values?.price));
            formData.append("discount", values?.discount?.toString() ?? "0");
            formData.append("packagingtype",  String(selectedpackingTypeid));
            formData.append("company", String(selectedCompanyid));
            formData.append("categories", String(selectedCategoryid));
            formData.append("batch_no", JSON.stringify(values?.batch_no));
            formData.append("hsn_code", JSON.stringify(values?.hsn_code));
            formData.append("c_gst",  JSON.stringify(values?.c_gst));
            formData.append("s_gst",  JSON.stringify(values?.s_gst));
            formData.append("avl_qty",  JSON.stringify(values?.avl_qty));
            formData.append("description", JSON.stringify(inputs));
            formData.append("is_active", selectedactiveid);
            if (file) {
                file.forEach((f) => {
                    formData.append("product_pics", f);
                });
            }
            if(id){
                formData.append("id", id);
                console.log("Calll");
                
                dispatch(UpdateProductlist(formData));
            }
            else{
                dispatch(AddProductlist(formData));
            }
        
        },
    });

    const isactiveoption =[
        { label :"Active", value : true },
        { label :"Inactive", value : false }
    ]

    // ------------- Get  Data From Reducer Code Start --------------
        const AddCompanyDatalist  = useSelector((state: any) =>  state.Product.AddProductlist );
        const UpdateProductlistdata  = useSelector((state: any) =>  state.Product.UpdateProductlist );


        useEffect(() => {  
            if(AddCompanyDatalist?.success == true || UpdateProductlistdata?.success == true){
                if(AddCompanyDatalist?.success ){
                    toast.success(AddCompanyDatalist?.msg)
                }else if(UpdateProductlistdata?.success){
                    toast.success(UpdateProductlistdata?.msg)
                }
                dispatch(ResetProductlist())
                navigate(ParentLink)
                validation.resetForm();
                setSelectedactiveid("");
                setSelectedactiveOption(null);
                setValidateactive(1)
            }
        }, [AddCompanyDatalist, UpdateProductlistdata]);
    //  ------------- Get Data From Reducer Code end --------------

    // -------------  Sigle Data from reducer --------------
    useEffect(() => {
        dispatch(ResetProductlist())
        if (id) {
            let requserdata = { id: id };
            dispatch(GetProductViewlist(requserdata))
        }
    }, [id])

    const [ProductList, setProductList] = useState<ProductDetails>();
    const  Productlist  = useSelector((state: any) => state.Product.singleProductlist);

    useEffect(() => {
        setProductList(Productlist?.data);
    }, [Productlist]);

    useEffect(() => {
        validation.values.name.englishname = ProductList?.name?.englishname ?? "";
        validation.values.name.gujaratiname = ProductList?.name?.gujaratiname ?? "";
        validation.values.tech_name.english_tech_name = ProductList?.tech_name?.english_tech_name ?? "";
        validation.values.tech_name.gujarati_tech_name = ProductList?.tech_name?.gujarati_tech_name ?? "";
        validation.values.packaging = ProductList?.packaging ?? "";
        validation.values.avl_qty = ProductList?.avl_qty ?? "";
        validation.values.price = ProductList?.price ?? "";
        validation.values.discount = ProductList?.discount ?? 0;
        validation.values.batch_no = ProductList?.batch_no ?? "";
        validation.values.hsn_code = ProductList?.hsn_code ?? "";
        validation.values.c_gst = ProductList?.c_gst ?? "";
        validation.values.s_gst = ProductList?.s_gst ?? "";
        if (ProductList?.description) {
            const formattedDescription = ProductList?.description.map((desc) => ({
              id: desc.id,
              englishHeader: desc.englishHeader,
              englishValue: desc.englishValue,
              gujaratiHeader: desc.gujaratiHeader,
              gujaratiValue: desc.gujaratiValue,
            }));
      
            setInputs(formattedDescription);
        }
        if (ProductList?.company && companyoption.length > 0) {
            const selectedRole = companyoption.find((role: any) => role.value === ProductList?.company?._id);
            setSelectedCompanyOption(selectedRole || null);
            setSelectedCompanyid(selectedRole?.value);
        }
        if (ProductList?.packagingtype && packingtypeoption.length > 0) {
            const selectedGender = packingtypeoption.find((gender: any) => gender.value === ProductList.packagingtype?._id);
            setSelectedpackingTypeOption(selectedGender || null);
            setSelectedpackingTypeid(selectedGender ? String(selectedGender.value) : "");
        }

        if (ProductList?.is_active !== undefined && ProductList?.is_active !== null && isactiveoption.length > 0) {
            const selectedSatus: any = isactiveoption.find((gender: any) => gender.value === ProductList.is_active);
            setSelectedactiveOption(selectedSatus);
            setSelectedactiveid(selectedSatus?.value ?? null);
        }

        if (ProductList?.categories && categoryoption.length > 0) {
            const selectedCategory: any = categoryoption.find((dropdown: any) => dropdown.value === ProductList.categories?._id);
            setSelectedCategoryOption(selectedCategory || null);
            setSelectedCategoryid(selectedCategory?.value);
        }
    }, [ProductList]);
    // -------------  Sigle Data from reducer --------------

    let Name =  id ? "Update Product" : "Product Add";
    let ParentName = "Product List";
    let ParentLink = "/product/list";

    return (
        <>  
            <NavbarSidebarLayout isFooter={false}  isSidebar={true} isNavbar={true} isRightSidebar={true}>
                <ExampleBreadcrumb  Name={Name} ParentName={ParentName} ParentLink={ParentLink}  />
                <div className="mt-[2rem] bg-white dark:bg-gray-800 p-4">
                    <Form onSubmit={(e) => { e.preventDefault(); 
                        validation.handleSubmit(); 
                        return false; 
                        }} >
                        
                        <div>
                            <label className="dark:text-gray-100 text-[1.2rem]"> Product Image : </label>
                            <MultiImageUploadPreview onFileSelect={setFile} />
                        </div>
                        
                      
                        <div className="dark:bg-gray-800 flex-1 p-4 rounded-lg border border-gray-300 dark:border-gray-500 space-y-3 mb-4">
                            <div className="text-[1.2rem] font-bold dark:text-gray-100"> Product Name</div>
                            <div className="flex-1 mt-[1rem] ">
                                <Label htmlFor="Name">Name ( Eng )</Label>
                                <div className="mt-1">
                                    <Input
                                        id="englishname"
                                        name="name.englishname"
                                        className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                        placeholder="Product english name"
                                        type="text"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values?.name?.englishname || ""}
                                        invalid={validation.touched?.name?.englishname && validation.errors?.name?.englishname ? true : false}
                                    />
                                    {validation.touched.name?.englishname && validation.errors?.name?.englishname ? (<FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors?.name?.englishname} </FormFeedback>) : null}
                                </div>
                            </div>

                            <div className="flex-1 mt-[1rem] ">
                                <Label htmlFor="Name">Name ( Guj )</Label>
                                <div className="mt-1">
                                    <Input
                                        id="gujaratiname"
                                        name="name.gujaratiname"
                                        className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                        placeholder="Product gujarati name"
                                        type="text"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values?.name?.gujaratiname || ""}
                                        invalid={validation.touched?.name?.gujaratiname && validation.errors?.name?.gujaratiname ? true : false}
                                    />
                                    {validation.touched?.name?.gujaratiname && validation.errors?.name?.gujaratiname ? (<FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors?.name?.gujaratiname} </FormFeedback>) : null}
                                </div>
                            </div>
                        </div>
                            
                        <div className="dark:bg-gray-800  flex-1 p-4 rounded-lg border border-gray-300  dark:border-gray-500 space-y-3 mb-4">
                            <div className="text-[1.2rem] font-bold dark:text-gray-100"> Technical Name</div>
                            <div className="flex-1 mt-[1rem] ">
                                <Label htmlFor="tech_name">Technical Name ( Eng )</Label>
                                <div className="mt-1">
                                    <Input
                                        id="tech_name_eng"
                                        name="tech_name.english_tech_name"
                                        className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                        placeholder="Product technical name"
                                        type="text"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values?.tech_name?.english_tech_name || ""}
                                        invalid={validation.touched?.tech_name?.english_tech_name && validation.errors?.tech_name?.english_tech_name ? true : false}
                                    />
                                    {validation.touched?.tech_name?.english_tech_name && validation.errors?.tech_name?.english_tech_name ? (<FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors?.tech_name?.english_tech_name} </FormFeedback>) : null}
                                </div>
                            </div>

                            <div className="flex-1 mt-[1rem] ">
                                <Label htmlFor="Name">Technical Name ( Guj )</Label>
                                <div className="mt-1">
                                    <Input
                                        id="gujarati_tech_name"
                                        name="tech_name.gujarati_tech_name"
                                        className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                        placeholder="Product technical  name"
                                        type="text"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={validation.values?.tech_name?.gujarati_tech_name || ""}
                                        invalid={validation.touched?.tech_name?.gujarati_tech_name && validation.errors?.tech_name?.gujarati_tech_name ? true : false}
                                    />
                                    {validation.touched?.tech_name?.gujarati_tech_name && validation.errors?.tech_name?.gujarati_tech_name ? (<FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors?.tech_name?.gujarati_tech_name} </FormFeedback>) : null}
                                </div>
                            </div>
                        </div>

                        <div className="md:flex gap-x-[2rem]">
                            <div className="flex-1 mt-[1rem]">
                                <Label htmlFor="packaging">Packing</Label>
                                <div className="mt-1">
                                <Input
                                    id="packaging"
                                    name="packaging"
                                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                    placeholder="Product packing"
                                    type="number"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.packaging ?? ""}
                                    invalid={ validation.touched.packaging && validation.errors.packaging ? true : false}
                                />
                                {validation.touched.packaging && validation.errors.packaging ? ( <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.packaging} </FormFeedback> ) : null}
                                </div>
                            </div>

                            <div className="flex-1 mt-[1rem]">
                                <Label htmlFor="Status">Packing Type</Label>
                                <div className="mt-1">
                                <Select
                                    className="w-full dark:text-white"
                                    classNames={{
                                        control: () => "react-select__control",
                                        singleValue: () => "react-select__single-value",
                                        menu: () => "react-select__menu",
                                        option: ({ isSelected }) =>
                                            isSelected ? "react-select__option--is-selected" : "react-select__option",
                                        placeholder: () => "react-select__placeholder",
                                    }}
                                    value={selectedpackingTypeOption}
                                    onChange={(e) => { IspackingTypedata(e) }}
                                    options={packingtypeoption}
                                    isClearable={true}
                                />
                                {validatepackingType == 1 ? (
                                    <FormFeedback type="invalid" className="text-Red text-sm"> Please Select packing type </FormFeedback>
                                ) : null}
                                </div>
                            </div>

                            <div className="flex-1 mt-[1rem]">
                                <Label htmlFor="Status">Category</Label>
                                <div className="mt-1">
                                <Select
                                    className="w-full dark:text-white"
                                    classNames={{
                                        control: () => "react-select__control",
                                        singleValue: () => "react-select__single-value",
                                        menu: () => "react-select__menu",
                                        option: ({ isSelected }) =>
                                            isSelected ? "react-select__option--is-selected" : "react-select__option",
                                        placeholder: () => "react-select__placeholder",
                                    }}
                                    value={selectedCategoryOption}
                                    onChange={(e) => { IsCategorydata(e) }}
                                    options={categoryoption}
                                    isClearable={true}
                                />
                                {validateCategory == 1 ? (
                                    <FormFeedback type="invalid" className="text-Red text-sm"> Please Select category </FormFeedback>
                                ) : null}
                                </div>
                            </div>
                        </div>

                        <div className="md:flex gap-x-[2rem]">

                            <div className="flex-1 mt-[1rem]">
                                <Label htmlFor="qty"> QTY</Label>
                                <div className="mt-1">
                                <Input
                                    id="avl_qty"
                                    name="avl_qty"
                                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                    placeholder="Product QTY"
                                    type="number"
                                    min="0"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.avl_qty ?? ""}
                                    invalid={ validation.touched.avl_qty && validation.errors.avl_qty ? true : false}
                                />
                                {validation.touched.avl_qty && validation.errors.avl_qty ? ( <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.avl_qty} </FormFeedback> ) : null}
                                </div>
                            </div>

                            <div className="flex-1 mt-[1rem]">
                                <Label htmlFor="price"> Price</Label>
                                <div className="mt-1">
                                <Input
                                    id="price"
                                    name="price"
                                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                    placeholder="Product Price"
                                    type="number"
                                    min="0"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.price ?? ""}
                                    invalid={ validation.touched.price && validation.errors.price ? true : false}
                                />
                                {validation.touched.price && validation.errors.price ? ( <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.price} </FormFeedback> ) : null}
                                </div>
                            </div>

                            <div className="flex-1 mt-[1rem]">
                                <Label htmlFor="discount"> Discount</Label>
                                <div className="mt-1">
                                <Input
                                    id="discount"
                                    name="discount"
                                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                    placeholder="Product discount"
                                    type="number"
                                    min="0" 
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.discount ?? ""}
                                    invalid={ validation.touched.discount && validation.errors.discount ? true : false}
                                />
                                {validation.touched.discount && validation.errors.discount ? ( <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.discount} </FormFeedback> ) : null}
                                </div>
                            </div>

                        </div>

                        <div className="md:flex gap-x-[2rem]">

                            <div className="flex-1 mt-[1rem] ">
                                <Label htmlFor="Status">Company</Label>
                                <div className="mt-1">
                                <Select
                                    className="w-full dark:text-white"
                                    classNames={{
                                        control: () => "react-select__control",
                                        singleValue: () => "react-select__single-value",
                                        menu: () => "react-select__menu",
                                        option: ({ isSelected }) =>
                                            isSelected ? "react-select__option--is-selected" : "react-select__option",
                                        placeholder: () => "react-select__placeholder",
                                    }}
                                    value={selectedCompanyOption}
                                    onChange={(e) => { IsCompanydata(e) }}
                                    options={companyoption}
                                    isClearable={true}
                                />
                                {validateCompany == 1 ? (
                                    <FormFeedback type="invalid" className="text-Red text-sm"> Please Select company  </FormFeedback>
                                ) : null}
                                </div>
                            </div>

                            <div className="flex-1 mt-[1rem]">
                                <Label htmlFor="batch_no"> Batch No</Label>
                                <div className="mt-1">
                                <Input
                                    id="batch_no"
                                    name="batch_no"
                                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                    placeholder="Product batch no"
                                    type="text"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.batch_no}
                                    invalid={ validation.touched.batch_no && validation.errors.batch_no ? true : false}
                                />
                                {validation.touched.batch_no && validation.errors.batch_no ? ( <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.batch_no} </FormFeedback> ) : null}
                                </div>
                            </div>

                            <div className="flex-1 mt-[1rem]">
                                <Label htmlFor="hsn_code"> HSN code</Label>
                                <div className="mt-1">
                                <Input
                                    id="hsn_code"
                                    name="hsn_code"
                                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                    placeholder="Product hsn code"
                                    type="text"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.hsn_code}
                                    invalid={ validation.touched.hsn_code && validation.errors.hsn_code ? true : false}
                                />
                                {validation.touched.hsn_code && validation.errors.hsn_code ? ( <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.hsn_code} </FormFeedback> ) : null}
                                </div>
                            </div>
                        </div>

                        <div className="md:flex gap-x-[2rem]">

                            <div className="flex-1 mt-[1rem] ">
                                <Label htmlFor="c_gst"> CGST</Label>
                                <div className="mt-1">
                                <Input
                                    id="c_gst"
                                    name="c_gst"
                                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                    placeholder="Product CGST"
                                    type="number"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.c_gst}
                                    invalid={ validation.touched.c_gst && validation.errors.c_gst ? true : false}
                                />
                                {validation.touched.c_gst && validation.errors.c_gst ? ( <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.c_gst} </FormFeedback> ) : null}
                                </div>
                            </div>

                            <div className="flex-1 mt-[1rem] ">
                                <Label htmlFor="s_gst"> SGST</Label>
                                <div className="mt-1">
                                <Input
                                    id="s_gst"
                                    name="s_gst"
                                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                    placeholder="Product SGST"
                                    type="number"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.s_gst }
                                    invalid={ validation.touched.s_gst && validation.errors.s_gst ? true : false}
                                />
                                {validation.touched.s_gst && validation.errors.s_gst ? ( <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.s_gst} </FormFeedback> ) : null}
                                </div>
                            </div>

                            <div className="flex-1 mt-[1rem] ">
                            <Label htmlFor="Status">Status</Label>
                            <div className="mt-1">
                            <Select
                                className="w-full dark:text-white"
                                classNames={{
                                    control: () => "react-select__control",
                                    singleValue: () => "react-select__single-value",
                                    menu: () => "react-select__menu",
                                    option: ({ isSelected }) =>
                                        isSelected ? "react-select__option--is-selected" : "react-select__option",
                                    placeholder: () => "react-select__placeholder",
                                }}
                              
                                value={selectedactiveOption}
                                onChange={(e) => { IsActivedata(e) }}
                                options={isactiveoption}
                                isClearable={true}
                            />
                            {validateactive == 1 ? (
                                <FormFeedback type="invalid" className="text-Red text-sm"> Please Select status </FormFeedback>
                            ) : null}
                            </div>
                            </div>
                        </div>

                        <div className=" text-white r w-full mt-[2rem] mx-auto">
                            <div className="flex justify-between">
                            <div className="mb-4 dark:text-gray-100 text-gray-900 text-[1.5rem] font-semibold"> Product Description</div>
                            <div onClick={handleAddField} className="mb-4 px-4 py-1 w-[8rem] text-center bg-blue-500 hover:bg-blue-600 text-white rounded-lg cursor-pointer"> Add Field </div>
                            </div>

                            {inputs.map((item, index) => (
                                <div key={item.id} className="dark:bg-gray-800 p-4 rounded-lg border border-gray-300  dark:ring-gray-500 space-y-3 mb-4">
                                    <div className="grid lg:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1 dark:text-gray-100 text-gray-700">English Header</label>
                                            <Input
                                                type="text"
                                                placeholder="Header"
                                                value={item.englishHeader}
                                                onChange={(e) => handleChange(item.id, "englishHeader", e.target.value)}
                                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white  bg-gray-200 text-gray-700"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-1 dark:text-gray-100 text-gray-700">Gujarati Header</label>
                                            <Input
                                                type="text"
                                                placeholder="Header"
                                                value={item.gujaratiHeader}
                                                onChange={(e) => handleChange(item.id, "gujaratiHeader", e.target.value)}
                                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white  bg-gray-200 text-gray-700"
                                            />
                                        </div>  
                                    </div>

                                    <div className="grid lg:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1 dark:text-gray-100 text-gray-700">English Value</label>
                                            <Input
                                                type="textarea"
                                                placeholder="Value"
                                                value={item.englishValue}
                                                onChange={(e) => handleChange(item.id, "englishValue", e.target.value)}
                                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white bg-gray-200 text-gray-800"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-1 dark:text-gray-100 text-gray-700">Gujarati Value</label>
                                            <Input
                                                type="textarea"
                                                placeholder="Value"
                                                value={item.gujaratiValue}
                                                onChange={(e) => handleChange(item.id, "gujaratiValue", e.target.value)}
                                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white bg-gray-200 text-gray-800"
                                            />
                                        </div>
                                    </div>

                                    {index > 0 && (

                                            <div onClick={() => handleRemoveField(item.id)} className="text-red-500 hover:text-red-600 text-right justify-items-end">
                                                <HiTrash size={20} />
                                            </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-x-3 justify-end mt-[1rem]">
                            <Button className="bg-addbutton hover:bg-addbutton dark:bg-addbutton dark:hover:bg-addbutton" type="submit" > {id ? "Update Product": "Add Product"} </Button>
                            <Button className="bg-deletebutton hover:bg-deletebutton dark:bg-deletebutton dark:hover:bg-deletebutton" onClick={() => navigate(ParentLink)}>  Close </Button>
                        </div>
                    </Form>
                </div>
            </NavbarSidebarLayout>
        </>
    );
}

export default ProductAddPage;