import { FC, useEffect, useState } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import ExampleBreadcrumb from "../../components/breadcrumb";
import { Label, Button } from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { Form, Input, FormFeedback } from "reactstrap";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AddUserlist, getRoleslist, ResetUserdatalist } from "../../Store/actions";
import { toast } from "react-toastify";
import ImageUploadPreview from "../../components/imageuploader";
import moment from "moment";

const AddUserPage : FC = function () {

    const dispatch = useDispatch();
    const [file, setFile] = useState<File | null>(null);

    //---------------- Role option code start ----------------
        const [selectedRoleOption, setSelectedRoleOption] = useState(null);
        const [selectedRoleid, setSelectedRoleid] = useState<string | null>(null);;
        const [ValidateRoleid, setValidateRoleid] = useState(0);

        const IsActiveRoledata = (data: any) => {
        if (!data) {
            setValidateRoleid(1);
            setSelectedRoleid(null);
            setSelectedRoleOption(null);
        } else {
            setValidateRoleid(0);
            setSelectedRoleid(data.value);
            setSelectedRoleOption(data);
        }
        };
    //---------------- Role option code end ----------------


    const genderoption =[
        { label : "Male", value : "male"},
        { label : "Female", value : "female"},
        { label : "Other", value : "other"},
    ]

    const Dropdownoption =[
        { label :"Yes", value : true },
        { label :"No", value : false }
    ]

    const isactiveoption =[
        {label :"Active", value : true},
        { label :"Inactive", value : false}
    ]

    //---------------- Gender option code start ----------------
        const [selectedGenderOption, setSelectedGenderOption] = useState(null);
        const [selectedGenderid, setSelectedGenderid] = useState<string | null>(null);
        const [ValidateGenderid, setValidateGenderid] = useState(0);

        const IsActiveGenderdata = (data: any) => {
        if (!data) {
            setValidateGenderid(1)
            setSelectedGenderid(null);
            setSelectedGenderOption(null);
        } else {
            setValidateGenderid(0)
            setSelectedGenderid(data.value);
            setSelectedGenderOption(data);
        }
        };
    //---------------- Gender option code end ----------------

    //---------------- Satus option code start ----------------
        const [selectedStatusOption, setSelectedStatusOption] = useState(null);
        const [selectedStatusid, setSelectedStatusid] = useState<boolean | null>(null);
        const [ValidateStatusid, setValidateStatusid] = useState(0);

        const IsActivedata = (data:any) => {
        if (!data) {
            setValidateStatusid(1)
            setSelectedStatusid(null);
            setSelectedStatusOption(null);
        } else {
            setValidateStatusid(0)
            setSelectedStatusid(!!data.value);
            setSelectedStatusOption(data);
        }
        };
    //---------------- Satus option code end ----------------

    //---------------- Aadhar option code start ----------------
        const [selectedAadharOption, setSelectedAadharOption] = useState(null);
        const [selectedAadharid, setSelectedAadharid] = useState<boolean | null>(null);
        const [ValidateAadharStatusid, setValidateAadharStatusid] = useState(0);

        const IsActiveAadhardata = (data: any) => {
        if (!data) {
            setValidateAadharStatusid(1);
            setSelectedAadharid(null);
            setSelectedAadharOption(null);
        } else {
            setValidateAadharStatusid(0);
            setSelectedAadharid(data.value);
            setSelectedAadharOption(data);
        }
        };
    //---------------- Aadhar option code end ----------------

    //---------------- pan card option code start ----------------
        const [selectedpancardOption, setSelectedpancardOption] = useState(null);
        const [selectedPancardid, setSelectedPancardid] = useState<null | boolean>(null);
        const [ValidatePanStatusid, setValidatePanStatusid] = useState(0);
    
        const IsActivePancarddata = (data: any) => {
        if (!data) {
            setValidatePanStatusid(1);
            setSelectedPancardid(null);
            setSelectedpancardOption(null);
        } else {
            setValidatePanStatusid(0);
            setSelectedPancardid(data.value);
            setSelectedpancardOption(data);
        }
        };
    //---------------- pan card option code end ----------------

    //---------------- Bank passbook option code start ----------------
        const [selectedBankPassbookOption, setSelectedBankPassbookOption] = useState(null);
        const [selectedBankPassbookid, setSelectedBankPassbookid] = useState<null | boolean>(null);
        const [ValidatePassbookStatusid, setValidatePassbookStatusid] = useState(0);

        const IsActiveBankPassbookdata = (data: any) => {
        if (!data) {
            setValidatePassbookStatusid(1);
            setSelectedBankPassbookid(null);
            setSelectedBankPassbookOption(null);
        } else {
            setValidatePassbookStatusid(0);
            setSelectedBankPassbookid(data.value);
            setSelectedBankPassbookOption(data);
        }
        };
    //---------------- Bank passbook option code end ----------------

    const navigate = useNavigate();
    const [initialValues, setinitialValues] = useState({
        user_name: "",
        email:"",
        gender:"",
        role:"",
        password:"",
        mobile_no:"",
        address:"",
        date_of_birth:"",
        date_of_joining:"",
        is_active:"",
        emergency_mobile_no:"",
        emergency_contact_person:"",
        aadhar_card:"",
        pan_card:"",
        bank_passbook :""
    });
    
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        
        validationSchema: Yup.object({
            user_name: Yup.string().required("Please Enter User Name"),
            email: Yup.string().required("Please Enter Email")
            .matches(/^[^@]+@[^@]+$/, "Email must contain exactly one '@'") // Ensures exactly one '@'
            .matches(/@[^@]+\.[^@]+$/, "Email must contain exactly one '.' after '@'") // Ensures '.' after '@'
            .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"), // General email validation,
            password: Yup.string().required("Please Enter Password")
            .min(5, "Password must be at least 5 characters long")
            .max(10, "Password must be at most 10 characters long")
            .matches(/[A-Z]/, "Password must contain at least one uppercase letter (A-Z)")
            .matches(/\d/, "Password must contain at least one numeric digit (0-9)")
            .matches(/[@$!%*?&]/, "Password must contain at least one special character (@$!%*?&)"),
            mobile_no: Yup.string().required("Please Enter Mobile Number")
            .matches(/^\d{10}$/, "Mobile number must be 10 digits"),
            address: Yup.string().required("Please Enter Address"),
            emergency_mobile_no: Yup.string().required("Please Enter Emergency Mobile Number")
            .matches(/^\d{10}$/, "Mobile number must be 10 digits"),
            emergency_contact_person: Yup.string().required("Please Enter Emergency Contact Person"),
            date_of_birth: Yup.string().required("Please Enter Date of birth"),
            date_of_joining: Yup.string().required("Please Enter Date of joining"),
        }), 
        
        onSubmit: (values) => { 
            if (selectedGenderid  == null) return setValidateGenderid(1);
            if (selectedRoleid  == null) return setValidateRoleid(1);
            if (selectedStatusid  == null) return setValidateStatusid(1);
            if (selectedAadharid == null) return setValidateAadharStatusid(1);
            if (selectedPancardid  == null) return setValidatePanStatusid(1);
            if (selectedBankPassbookid  == null) return setValidatePassbookStatusid(1);

            const formData = new FormData();
            formData.append("name", values.user_name);
            formData.append("email", values.email);
            formData.append("password", values.password);
            formData.append("gender", selectedGenderid);
            formData.append("mobile_no", values.mobile_no);
            formData.append("date_of_joining", moment(values?.date_of_joining).format("DD-MM-YYYY"));
            formData.append("date_of_birth", moment(values.date_of_birth).format("DD-MM-YYYY"));
            formData.append("emergency_mobile_no", values.emergency_mobile_no);
            formData.append("emergency_contact_person", values.emergency_contact_person);
            formData.append("address", values.address);
            formData.append("aadhar_card", JSON.stringify(selectedAadharid));
            formData.append("pan_card", JSON.stringify(selectedPancardid));
            formData.append("bank_passbook",JSON.stringify(selectedBankPassbookid));
            formData.append("is_active", JSON.stringify(selectedStatusid));
            formData.append("role", selectedRoleid);
            if (file) {
                formData.append("user_pic", file); 
            }
            dispatch(AddUserlist(formData));
        },
    });

    //  -------------- Get Role Data list -------------------
        const RolesList = useSelector((state: any) => state.Role.Roleslist?.pulledData || []);
        const roleoption = RolesList && RolesList.map((role : any) => ({  label: role.role_title,  value: role._id  }));
        
        useEffect(() =>{
        dispatch(getRoleslist());
        },[])
    //  -------------- Get Role Data list -------------------

     //  -------------- Get Role Data list -------------------
     const UserAddedList = useSelector((state: any) => state.User.AddUserlistdata || []);

     useEffect(() =>{
        if(UserAddedList?.success == true){
            validation.resetForm();
            toast.success(UserAddedList?.msg);
            dispatch(ResetUserdatalist());
            setTimeout(() =>{
            navigate(ParentLink)
            },5000)
        }
     },[UserAddedList])
 //  -------------- Get Role Data list -------------------


    let Name = "User Add";
    let ParentName = "User List";
    let ParentLink = "/users/list";

    return (
        <>  
            <NavbarSidebarLayout isFooter={false}  isSidebar={true} isNavbar={true} isRightSidebar={true}>
                <ExampleBreadcrumb  Name={Name} ParentName={ParentName} ParentLink={ParentLink}  />
                <div className="mt-[2rem] bg-white dark:bg-gray-800 p-4">
                    <Form onSubmit={(e) => { e.preventDefault(); validation.handleSubmit(); return false; }} >
                       

                        <ImageUploadPreview onFileSelect={setFile}/>

                        <div className="md:flex gap-x-[2rem]">
                            <div className="flex-1 mt-[1rem]">
                                <Label htmlFor="UserName">User Name</Label>
                                <div className="mt-1">
                                <Input
                                    id="user_name"
                                    name="user_name"
                                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                    placeholder="User Name"
                                    type="text"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.user_name || ""}
                                    invalid={validation.touched.user_name && validation.errors.user_name ? true : false }
                                />
                                {validation.touched.user_name && validation.errors.user_name ? (
                                    <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.user_name}  </FormFeedback>
                                ) : null}
                                </div>
                            </div>

                            <div  className="flex-1 mt-[1rem]">
                                <Label htmlFor="email">Email</Label>
                                <div className="mt-1">
                                <Input
                                    id="email"
                                    name="email"
                                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                    placeholder="User email"
                                    type="email"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.email || ""}
                                    invalid={validation.touched.email && validation.errors.email ? true : false }
                                />
                                {validation.touched.email && validation.errors.email ? (
                                    <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.email}  </FormFeedback>
                                ) : null}
                                </div>
                            </div>

                            <div  className="flex-1 mt-[1rem]">
                                <Label htmlFor="email">Gender</Label>
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
                                        value={selectedGenderOption}
                                        onChange={(e) => { IsActiveGenderdata(e) }}
                                        options={genderoption}
                                        isClearable={true}
                                    />
                                    {ValidateGenderid == 1 ?  <FormFeedback type="invalid" className="text-Red text-sm"> Please select gender  </FormFeedback> : null}
                                </div>
                            </div>
                        </div>

                        <div className="md:flex  gap-x-[2rem]">
                            
                            <div className="flex-1 mt-[1rem]">
                                <Label htmlFor="UserName">Role</Label>
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
                                        value={selectedRoleOption}
                                        onChange={(e) => { IsActiveRoledata(e) }}
                                        options={roleoption}
                                        isClearable={true}
                                    />
                                    {ValidateRoleid == 1 ?  <FormFeedback type="invalid" className="text-Red text-sm"> Please select role  </FormFeedback> : null}
                                </div>
                            </div>
                            
                            <div className="flex-1 mt-[1rem]">
                                <Label htmlFor="password">Password</Label>
                                <div className="mt-1">
                                <Input
                                    id="password"
                                    name="password"
                                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                    placeholder="Password"
                                    type="password"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.password || ""}
                                    invalid={validation.touched.password && validation.errors.password ? true : false }
                                />
                                {validation.touched.password && validation.errors.password ? (
                                    <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.password}  </FormFeedback>
                                ) : null}
                                </div>
                            </div>

                            <div  className="flex-1 mt-[1rem]">
                                <Label htmlFor="mobile_no"> Mobile Number</Label>
                                <div className="mt-1">
                                <Input
                                    id="mobile_no"
                                    name="mobile_no"
                                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                    placeholder="User Mobile Number"
                                    type="number"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.mobile_no || ""}
                                    invalid={validation.touched.mobile_no && validation.errors.mobile_no ? true : false }
                                />
                                {validation.touched.mobile_no && validation.errors.mobile_no ? (
                                    <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.mobile_no}  </FormFeedback>
                                ) : null}
                                </div>
                            </div>
                        </div>

                        <div className="md:flex gap-x-[2rem]">
                            
                            <div className="flex-1 mt-[1rem]">
                                <Label htmlFor="address">Address</Label>
                                <div className="mt-1">
                                <Input
                                    id="address"
                                    name="address"
                                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                    placeholder="User Address"
                                    type="text"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.address || ""}
                                    invalid={ validation.touched.address && validation.errors.address ? true : false }
                                />
                                {validation.touched.address && validation.errors.address ? (
                                    <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.address} </FormFeedback>
                                ) : null}
                                </div>
                            </div>
                            
                            <div className="flex-1 mt-[1rem]">
                                <Label htmlFor="date_of_birth">Date of Birth</Label>
                                <div className="mt-1">
                                <Input
                                    id="date_of_birth"
                                    name="date_of_birth"
                                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                    placeholder="date_of_birth"
                                    type="date"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.date_of_birth || ""}
                                    invalid={validation.touched.date_of_birth && validation.errors.date_of_birth ? true : false }
                                />
                                {validation.touched.date_of_birth && validation.errors.date_of_birth ? (
                                    <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.date_of_birth}  </FormFeedback>
                                ) : null}
                                </div>
                            </div>

                            <div  className="flex-1 mt-[1rem]">
                                <Label htmlFor="date_of_joining">Date of Joining</Label>
                                <div className="mt-1">
                                <Input
                                    id="date_of_joining"
                                    name="date_of_joining"
                                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                    placeholder="User date_of_joining"
                                    type="date"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.date_of_joining || ""}
                                    invalid={validation.touched.date_of_joining && validation.errors.date_of_joining ? true : false }
                                />
                                {validation.touched.date_of_joining && validation.errors.date_of_joining ? (
                                    <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.date_of_joining}  </FormFeedback>
                                ) : null}
                                </div>
                            </div>
                        </div>

                        <div className="md:flex gap-x-[2rem] ">
                            <div  className="flex-1 mt-[1rem]">
                                <Label htmlFor="email"> Status</Label>
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
                                        value={selectedStatusOption}
                                        onChange={(e) => { IsActivedata(e) }}
                                        options={isactiveoption}
                                        isClearable={true}
                                    />
                                    {ValidateStatusid == 1 ?  <FormFeedback type="invalid" className="text-Red text-sm"> Please select status  </FormFeedback> : null}
                                </div>
                            </div>

                            <div  className="flex-1 mt-[1rem]">
                                <Label htmlFor="emergency_contact_person">Emergency contact person</Label>
                                <div className="mt-1">
                                <Input
                                    id="emergency_contact_person"
                                    name="emergency_contact_person"
                                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                    placeholder="Emergency contact person name"
                                    type="text"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.emergency_contact_person || ""}
                                    invalid={validation.touched.emergency_contact_person && validation.errors.emergency_contact_person ? true : false }
                                />
                                {validation.touched.emergency_contact_person && validation.errors.emergency_contact_person ? (
                                    <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.emergency_contact_person}  </FormFeedback>
                                ) : null}
                                </div>
                            </div>

                            <div className="flex-1 mt-[1rem]">
                                <Label htmlFor="emergency_mobile_no">Emergency mobile no</Label>
                                <div className="mt-1">
                                <Input
                                    id="emergency_mobile_no"
                                    name="emergency_mobile_no"
                                    className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                    placeholder="Emergency contact person mobile number"
                                    type="number"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.emergency_mobile_no || ""}
                                    invalid={validation.touched.emergency_mobile_no && validation.errors.emergency_mobile_no ? true : false }
                                />
                                {validation.touched.emergency_mobile_no && validation.errors.emergency_mobile_no ? (
                                    <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.emergency_mobile_no}  </FormFeedback>
                                ) : null}
                                </div>
                            </div>
                        </div>
                        
                        <div className="md:flex gap-x-[2rem]">
                            <div className="flex-1  mt-[1rem]">
                                <Label htmlFor="password">Aadhar card</Label>
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
                                        value={selectedAadharOption}
                                        onChange={(e) => { IsActiveAadhardata(e) }}
                                        options={Dropdownoption}
                                        isClearable={true}
                                    />
                                    {ValidateAadharStatusid == 1 ?  <FormFeedback type="invalid" className="text-Red text-sm"> Please select aadhar card status  </FormFeedback> : null}
                                </div>
                            </div>

                            <div className="flex-1  mt-[1rem]">
                                <Label htmlFor="pan_card">Pan card</Label>
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
                                        value={selectedpancardOption}
                                        onChange={(e) => { IsActivePancarddata(e) }}
                                        options={Dropdownoption}
                                        isClearable={true}
                                    />
                                    {ValidatePanStatusid == 1 ?  <FormFeedback type="invalid" className="text-Red text-sm"> Please select pan card status  </FormFeedback> : null}
                                </div>
                            </div>

                            <div className="flex-1  mt-[1rem]">
                                <Label htmlFor="bank_passbook">Bank passbook</Label>
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
                                        value={selectedBankPassbookOption}
                                        onChange={(e) => { IsActiveBankPassbookdata(e) }}
                                        options={Dropdownoption}
                                        isClearable={true}
                                    />
                                    {ValidatePassbookStatusid == 1 ?  <FormFeedback type="invalid" className="text-Red text-sm"> Please select passbook status  </FormFeedback> : null}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-x-3 justify-end mt-[3rem]">
                            <Button className="bg-addbutton hover:bg-addbutton dark:bg-addbutton dark:hover:bg-addbutton" type="submit"> Add User </Button>
                            <Button className="bg-deletebutton hover:bg-deletebutton dark:bg-deletebutton dark:hover:bg-deletebutton" onClick={() => navigate(ParentLink)}>  Close </Button>
                        </div>
                    </Form>
                </div>
            </NavbarSidebarLayout>
        </>
    );
}

export default AddUserPage;