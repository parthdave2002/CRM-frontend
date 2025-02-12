import { FC, useEffect, useState } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import ExampleBreadcrumb from "../../components/breadcrumb";
import { Label, Button } from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { HiTrash} from "react-icons/hi";
import { Form, Input, FormFeedback } from "reactstrap";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AddCompanylist, ResetCompanylist } from "../../Store/actions";

interface KeyValue {
    id: number;
    header: string;
    value: string;
}

const ProductAddPage : FC = function () {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [inputs, setInputs] = useState<KeyValue[]>([{ id: 1, header: "", value: "" }]);

    // Handle input change
    const handleChange = (id: number, field: "header" | "value", newValue: string) => {
      setInputs((prev) =>
        prev.map((item) => (item.id === id ? { ...item, [field]: newValue } : item))
      );
    };
  
    // Add new input field
    const handleAddField = () => {
      setInputs([...inputs, { id: Date.now(), header: "", value: "" }]);
    };
  
    // Remove input field
    const handleRemoveField = (id: number) => {
      setInputs((prev) => prev.filter((item) => item.id !== id));
    };




    // ------ status code start ------
    const [selectedactiveOption, setSelectedactiveOption] = useState(null);
    const [selectedactiveid, setSelectedactiveid] = useState(0);
    const [validateactive, setValidateactive] = useState(0);
  
    const IsActivedata = (data: any) => {
      if (!data) {
        setSelectedactiveid(0);
        setSelectedactiveOption(null);
        setValidateactive(1)
      } else {
        setSelectedactiveid(data.value);
        setSelectedactiveOption(data);
        setValidateactive(0)
      }
    };
    // ------ status code end ------

    const [initialValues, setinitialValues] = useState({
        name: "",
        tech_name:"",
        packing: "",
        qty: "",
        price: "",
        discount:"",
        batch_number: "",
        hsn_code: "",
        cgst:"",
        sgst:"",
        status: "",
    });

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
    
        validationSchema: Yup.object({
          name: Yup.string().required("Please enter product name"),
          tech_name: Yup.string().required("Please enter product technical name"),
          packing: Yup.string().required("Please enter product packing"),
          qty: Yup.string().required("Please enter product qty"),
          price: Yup.string().required("Please enter product price"),
          discount: Yup.string().required("Please enter product discount"),
          batch_number: Yup.string().required("Please enter product batch number"),
          hsn_code: Yup.string().required("Please enter product hsn code"),
          cgst: Yup.string().required("Please enter product cgst"),
          sgst: Yup.string().required("Please enter product sgst"),
        }),
        
        onSubmit: (values) => {
          {selectedactiveid == 0 ? setValidateactive(1) : setValidateactive(0) }

          let requserdata = {
            name: values?.name,
            tech_name: values?.tech_name,
            packing: values?.packing,
            avl_qty : values.qty,
            price: values.price,
            discount: values?.discount,
            batch_number : values?.batch_number,
            hsn_code : values?.hsn_code,
            cgst: values?.cgst,
            sgst: values?.sgst,
            is_active: selectedactiveid,
          };
          dispatch(AddCompanylist(requserdata));
        },
    });

    const isactiveoption =[
        { label :"Active", value : true },
        { label :"Inactive", value : false }
    ]

    // ------------- Get  Data From Reducer Code Start --------------
        const { AddCompanyDatalist } = useSelector((state: any) => ({
            AddCompanyDatalist: state.Company.AddCompanylist,
        }));

        useEffect(() => {  
            if(AddCompanyDatalist?.success == true){
                dispatch(ResetCompanylist())
                navigate(ParentLink)
                validation.resetForm();
                setSelectedactiveid(0);
                setSelectedactiveOption(null);
                setValidateactive(1)
            }
        }, [AddCompanyDatalist]);
    //  ------------- Get Data From Reducer Code end --------------

    let Name = "Product Add";
    let ParentName = "Product List";
    let ParentLink = "/product/list";

    return (
        <>  
            <NavbarSidebarLayout isFooter={false}  isSidebar={true} isNavbar={true} isRightSidebar={true}>
                <ExampleBreadcrumb  Name={Name} ParentName={ParentName} ParentLink={ParentLink}  />
                <div className="mt-[2rem] bg-white dark:bg-gray-800 p-4">
                    <Form onSubmit={(e) => { e.preventDefault(); validation.handleSubmit(); return false; }} >
                        
                        <div className="flex gap-x-[2rem]">
                            <div className="flex-1">
                                <Label htmlFor="Name">Name</Label>
                                <div className="mt-1">
                                <Input
                                    id="name"
                                    name="name"
                                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                    placeholder="Product name"
                                    type="text"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.name || ""}
                                    invalid={ validation.touched.name && validation.errors.name ? true : false}
                                />
                                {validation.touched.name && validation.errors.name ? ( <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.name} </FormFeedback> ) : null}
                                </div>
                            </div>

                            <div className="flex-1">
                                <Label htmlFor="tech_name">Technical Name</Label>
                                <div className="mt-1">
                                <Input
                                    id="tech_name"
                                    name="tech_name"
                                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                    placeholder="Product technical name"
                                    type="text"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.tech_name || ""}
                                    invalid={ validation.touched.tech_name && validation.errors.tech_name ? true : false}
                                />
                                {validation.touched.tech_name && validation.errors.tech_name ? ( <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.tech_name} </FormFeedback> ) : null}
                                </div>
                            </div>

                            <div className="flex-1">
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

                        <div className="flex  mt-[1rem] gap-x-[2rem]">
                            
                            <div className="flex-1">
                                <Label htmlFor="packing">Packing</Label>
                                <div className="mt-1">
                                <Input
                                    id="packing"
                                    name="packing"
                                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                    placeholder="Product packing"
                                    type="text"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.packing || ""}
                                    invalid={ validation.touched.packing && validation.errors.packing ? true : false}
                                />
                                {validation.touched.packing && validation.errors.packing ? ( <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.packing} </FormFeedback> ) : null}
                                </div>
                            </div>

                            <div className="flex-1">
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

                            <div className="flex-1">
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

                        <div className="flex mt-[1rem] gap-x-[2rem]">

                            <div className="flex-1">
                                <Label htmlFor="qty"> QTY</Label>
                                <div className="mt-1">
                                <Input
                                    id="qty"
                                    name="qty"
                                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                    placeholder="Product QTY"
                                    type="number"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.qty || ""}
                                    invalid={ validation.touched.qty && validation.errors.qty ? true : false}
                                />
                                {validation.touched.qty && validation.errors.qty ? ( <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.qty} </FormFeedback> ) : null}
                                </div>
                            </div>

                            <div className="flex-1">
                                <Label htmlFor="price"> Price</Label>
                                <div className="mt-1">
                                <Input
                                    id="price"
                                    name="price"
                                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                    placeholder="Product Price"
                                    type="number"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.price || ""}
                                    invalid={ validation.touched.price && validation.errors.price ? true : false}
                                />
                                {validation.touched.price && validation.errors.price ? ( <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.price} </FormFeedback> ) : null}
                                </div>
                            </div>

                            <div className="flex-1">
                                <Label htmlFor="discount"> Discount</Label>
                                <div className="mt-1">
                                <Input
                                    id="discount"
                                    name="discount"
                                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                    placeholder="Product discount"
                                    type="text"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.discount || ""}
                                    invalid={ validation.touched.discount && validation.errors.discount ? true : false}
                                />
                                {validation.touched.discount && validation.errors.name ? ( <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.discount} </FormFeedback> ) : null}
                                </div>
                            </div>

                        </div>

                        <div className="flex mt-[1rem] gap-x-[2rem]">
                            <div className="flex-1">
                                <Label htmlFor="batch_number"> Batch No</Label>
                                <div className="mt-1">
                                <Input
                                    id="batch_number"
                                    name="batch_number"
                                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                    placeholder="Product batch number"
                                    type="text"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.batch_number || ""}
                                    invalid={ validation.touched.batch_number && validation.errors.batch_number ? true : false}
                                />
                                {validation.touched.batch_number && validation.errors.batch_number ? ( <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.batch_number} </FormFeedback> ) : null}
                                </div>
                            </div>

                            <div className="flex-1">
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
                                    value={validation.values.hsn_code || ""}
                                    invalid={ validation.touched.hsn_code && validation.errors.hsn_code ? true : false}
                                />
                                {validation.touched.hsn_code && validation.errors.hsn_code ? ( <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.hsn_code} </FormFeedback> ) : null}
                                </div>
                            </div>
                        </div>

                        <div className="flex mt-[1rem] gap-x-[2rem]">

                            <div className="flex-1">
                                <Label htmlFor="cgst"> CGST</Label>
                                <div className="mt-1">
                                <Input
                                    id="cgst"
                                    name="cgst"
                                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                    placeholder="Product CGST"
                                    type="number"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.cgst || ""}
                                    invalid={ validation.touched.cgst && validation.errors.cgst ? true : false}
                                />
                                {validation.touched.cgst && validation.errors.cgst ? ( <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.cgst} </FormFeedback> ) : null}
                                </div>
                            </div>

                            <div className="flex-1">
                                <Label htmlFor="sgst"> SGST</Label>
                                <div className="mt-1">
                                <Input
                                    id="sgst"
                                    name="sgst"
                                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                    placeholder="Product SGST"
                                    type="text"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.sgst || ""}
                                    invalid={ validation.touched.sgst && validation.errors.sgst ? true : false}
                                />
                                {validation.touched.sgst && validation.errors.sgst ? ( <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.sgst} </FormFeedback> ) : null}
                                </div>
                            </div>

                            <div className="flex-1">
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

                        <div className="space-y-4 my-[1rem]">
                            <Button  onClick={handleAddField} className="flex items-center gap-2">  {/* <Plus size={20} />  */} Add Field </Button>
                            {inputs.map((item, index) => (
                                <div key={item.id} className=" items-center gap-2">
                                        

                                        <div className=" ">
                                            <div className="flex">
                                                <div className="flex-1 flex gap-x-[1rem]">
                                                    <Label className="self-center" htmlFor="Header">Gujarati Header</Label>
                                                    <Input
                                                        type="text"
                                                        placeholder="Header"
                                                        value={item.header}
                                                        onChange={(e) => handleChange(item.id, "header", e.target.value)}
                                                        className="w-[15rem] p-1 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-50"
                                                    />
                                                </div>
                                                <div className="flex-1 flex gap-x-[1rem]">
                                                    <Label className="self-center" htmlFor="Header">English Header</Label>
                                                    <Input
                                                        type="text"
                                                        placeholder="Header"
                                                        value={item.header}
                                                        onChange={(e) => handleChange(item.id, "header", e.target.value)}
                                                        className="w-[15rem] p-1 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-50"
                                                    />
                                                </div>
                                            </div>
                                        
                                            <div className="flex gap-x-3">
                                                <div className="flex-1">
                                                <Label htmlFor="Header">Gujarati Value</Label>
                                                <Input
                                                    type="textarea"
                                                    placeholder="Value"
                                                    value={item.value}
                                                    onChange={(e) => handleChange(item.id, "value", e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-50"
                                                />
                                                </div>

                                                <div className="flex-1">
                                                <Label htmlFor="Header">English Value</Label>
                                                <Input
                                                    type="textarea"
                                                    placeholder="Value"
                                                    value={item.value}
                                                    onChange={(e) => handleChange(item.id, "value", e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-50"
                                                />
                                                </div>
                                            </div>
                                            <div className="">
                                                {index > 0 && (
                                                    <Button  onClick={() => handleRemoveField(item.id)} className="text-red-500">
                                                    <HiTrash size={20} />
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-x-3 justify-end mt-[1rem]">
                            <Button className="bg-addbutton hover:bg-addbutton dark:bg-addbutton dark:hover:bg-addbutton" type="submit" > Add Product </Button>
                            <Button className="bg-deletebutton hover:bg-deletebutton dark:bg-deletebutton dark:hover:bg-deletebutton" onClick={() => navigate(ParentLink)}>  Close </Button>
                        </div>
                    </Form>
                </div>
            </NavbarSidebarLayout>
        </>
    );
}

export default ProductAddPage;