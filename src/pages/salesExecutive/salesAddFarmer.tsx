import React, { FC, useEffect, useState } from 'react';
import { Label, Button } from "flowbite-react";
import { FaUser, FaWindowClose } from 'react-icons/fa';
import { Form, Input, FormFeedback } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import Select from "react-select";

interface ProfileData{
  isEditFarmer ?: boolean;
  setFarmerAdded : (value: boolean) => void;
}

const SalesAddFarmer: FC<ProfileData> = ({setFarmerAdded, isEditFarmer}) => {
  const dispatch = useDispatch();

  // ------------- Packing Type Get Data From Reducer Code Start --------------
  const [PackingTypeListData, setPackingTypeListData] = useState([]);
  const Packingtypelist = useSelector((state: any) => state.PackingType.Packingtypelist);
  const packingtypeoption = PackingTypeListData && PackingTypeListData?.filter((item: any) => item.is_active).map((item: any) => ({ label: item.type_eng, value: item._id }));
  const [selectedpackingTypeOption, setSelectedpackingTypeOption] = useState<{ label: string, value: string } | null>(null);
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

  const [initialValues, setinitialValues] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    mobile: "",
    address:"",
    alternate_mobile_no: "",
    state : "",
    district : "",
    taluka : "",
    village : "",
    pincode : "",
    landarea : "",
    land_type : "",
    irrigation_source : "",
    irrigation_type : "",
    smart_phone : "",
    crop : [],
    heard_about : "",
    refname : ""
  });

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,

    validationSchema: Yup.object({
      firstname: Yup.string().required("Please enter first name"),
      lastname: Yup.string().required("Please enter last name"),
      mobile: Yup.string().required("Please enter mobile no"),
      alternate_mobile_no: Yup.string().required("Please enter alternate mobile no"),
      address: Yup.string().required("Please enter address"),
      pincode: Yup.string().required("Please enter pincode"),
      landarea: Yup.string().required("Please enter land area"),
    }),

    onSubmit: (values) => {
      let requserData = {
        firstname: values.firstname,
        middlename: values.middlename,
        lastname: values.lastname,
        mobile: values.mobile,
        alternate_mobile_no: values.alternate_mobile_no,
        address: values.address,
      }

      console.log("mobile", requserData);
      // dispatch(AddRoleslist(requserData));
      validation.resetForm();
    },
  });

  // -------------- Header about code start ---------

  const HeardAboutOprions= [
    { label :"Newspaper", value : "newpaper"},
    { label :"TV Ad", value : "tv"},
    { label :"Magazine", value : "magazine"},
    { label :"Van campaign", value : "van campaign"},
    { label :"Instagram", value : "instagram"},
    { label :"Facebook", value : "facebook"},
    { label :"What's App", value : "what's app"},
    { label :"Linkedin", value : "linkedin"},
    { label :"Youtube", value : "youtube"},
    { label :"Brochure ", value : "brochure"},
    { label :"Agro shop", value : "shop"},
    { label :"Field office", value : "officer"},
    { label :"Other farmer", value : "other farmer"},
  ]

  const [selectedheaderaboutOption, setSelectedheaderaboutOption] = useState<{ label: string, value: string } | null>(null);
  const [selectedheaderaboutid, setSelectedheaderaboutid] = useState<string | null>(null);
  const [validateheaderabout, setValidateheaderabout] = useState(0);

  const Isheardaboutdata = (data: any) => {
    if (!data) {
      setSelectedheaderaboutid("");
      setSelectedheaderaboutOption(null);
      setValidateheaderabout(1)
    } else {
      setSelectedheaderaboutid(data.value);
      setSelectedheaderaboutOption(data);
      setValidateheaderabout(0)
    }
  };

  // -------------- Header about code end ---------

  // -------------- Irrigation source code start ---------
  const IrrigationSourceOptions= [
    { label :"Drip", value : "drip"},
    { label :"Sprinkler", value : "sprinkler"},
    { label :"Flood", value : "flood"},
  ]

  const [selectedirrigationsourceOption, setSelectedirrigationsourceOption] = useState<{ label: string, value: string } | null>(null);
  const [selectedirrigationsourceid, setSelectedirrigationsourceid] = useState<string | null>(null);
  const [validateirrigationsource, setValidateirrigationsource] = useState(0);

  const Isirrigationsourcedata = (data: any) => {
    if (!data) {
      setSelectedirrigationsourceid("");
      setSelectedirrigationsourceOption(null);
      setValidateirrigationsource(1)
    } else {
      setSelectedirrigationsourceid(data.value);
      setSelectedirrigationsourceOption(data);
      setValidateirrigationsource(0)
    }
  };
  
  // -------------- Irrigation source code end ---------

  // -------------- Irrigation type code start ---------
  const IrrigationTypeOptions= [
    { label :"Well", value : "well"},
    { label :"Borwell", value : "borwell"},
    { label :"Canal", value : "canal"},
    { label :"Other", value : "other"},
    { label :"No source", value : "no source"},
  ]

  const [selectedirrigationtypeOption, setSelectedirrigationtypeOption] = useState<{ label: string, value: string } | null>(null);
  const [selectedirrigationtypeid, setSelectedirrigationtypeid] = useState<string | null>(null);
  const [validateirrigationtype, setValidateirrigationtype] = useState(0);
  
  const Isirrigationtypedata = (data: any) => {
    if (!data) {
      setSelectedirrigationtypeid("");
      setSelectedirrigationtypeOption(null);
      setValidateirrigationtype(1)
    } else {
      setSelectedirrigationtypeid(data.value);
      setSelectedirrigationtypeOption(data);
      setValidateirrigationtype(0)
    }
  };
  // -------------- Irrigation type code end ---------

  // -------------- Land type code start ---------
  const LandTypeOptions= [
    { label :"Acre", value : "acre"},
    { label :"Bigha", value : "bigha"},
    { label :"Hacter", value : "hacter"},
  ]

  const [selectedlandtypeOption, setSelectedlandtypeOption] = useState<{ label: string, value: string } | null>(null);
  const [selectedlandtypeid, setSelectedlandtypeid] = useState<string | null>(null);
  const [validatelandtype, setValidatelandtype] = useState(0);
  
  const Islandypedata = (data: any) => {
    if (!data) {
      setSelectedlandtypeid("");
      setSelectedlandtypeOption(null);
      setValidatelandtype(1)
    } else {
      setSelectedlandtypeid(data.value);
      setSelectedlandtypeOption(data);
      setValidatelandtype(0)
    }
  };
  // -------------- Land type code end ---------

  return (
   <div className='mt-[2rem]'>
      <div className='flex justify-between'>
        <div className="text-[2rem] font-semibold text-gray-900 dark:text-gray-100"> {isEditFarmer == true ? "Update Farmer"  : "Add Farmer" }  </div>
        <div className="text-[2rem] font-semibold text-gray-900 dark:text-gray-100 flex self-center cursor-pointer " onClick={() => setFarmerAdded(false)}> <FaWindowClose /> </div>
      </div>

      <Form onSubmit={(e) => {  
        e.preventDefault(); 
        validation.handleSubmit(); 
        if (!selectedheaderaboutOption) setValidateheaderabout(1) 
        }} >
        <div className="dark:bg-gray-800 p-4 rounded-lg border border-gray-300 dark:border-gray-500 space-y-3  md:grid grid-cols-3 gap-[1rem]">
          <div className='mt-3'>
            <Label htmlFor="Name"> First Name <span className='text-red-500'>*</span> </Label>
            <div className="mt-1">
              <Input
                id="firstname"
                name="firstname"
                className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                placeholder="Enter firstname"
                type="text"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values?.firstname|| ""}
                invalid={validation.touched?.firstname && validation.errors?.firstname ? true : false}
              />
              {validation.touched.firstname && validation.errors?.firstname ? (<FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors?.firstname} </FormFeedback>) : null}
            </div>
          </div>

          <div>
            <Label htmlFor="middlename"> Middle Name </Label>
            <div className="mt-1">
              <Input
                id="middlename"
                name="middlename"
                className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                placeholder="Enter middlename"
                type="text"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values?.middlename|| ""}
                invalid={validation.touched?.middlename && validation.errors?.middlename ? true : false}
              />
              {validation.touched.middlename && validation.errors?.middlename ? (<FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors?.middlename} </FormFeedback>) : null}
            </div>
          </div>

          <div>
            <Label htmlFor="lastname"> Last Name <span className='text-red-500'>*</span></Label>
            <div className="mt-1">
              <Input
                id="lastname"
                name="lastname"
                className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                placeholder="Enter lastname"
                type="text"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values?.lastname|| ""}
                invalid={validation.touched?.lastname && validation.errors?.lastname ? true : false}
              />
              {validation.touched.lastname && validation.errors?.lastname ? (<FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors?.lastname} </FormFeedback>) : null}
            </div>
          </div>

          <div>
            <Label htmlFor="Name"> Mobile No <span className='text-red-500'>*</span></Label>
            <div className="mt-1">
              <Input
                id="mobile"
                name="mobile"
                className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                placeholder="Enter mobile"
                type="text"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values?.mobile || ""}
                invalid={validation.touched?.mobile && validation.errors?.mobile ? true : false}
              />
              {validation.touched?.mobile && validation.errors?.mobile ? (<FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors?.mobile} </FormFeedback>) : null}
            </div>
          </div>

          <div>
            <Label htmlFor="alternate mobile"> Alternate Mobile No  <span className='text-red-500'>*</span></Label>
            <div className="mt-1">
              <Input
                id="alternate_mobile_no"
                name="alternate_mobile_no"
                className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                placeholder="Enter alternate mobile no"
                type="text"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values?.alternate_mobile_no|| ""}
                invalid={validation.touched?.alternate_mobile_no && validation.errors?.alternate_mobile_no ? true : false}
              />
              {validation.touched.alternate_mobile_no && validation.errors?.alternate_mobile_no ? (<FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors?.alternate_mobile_no} </FormFeedback>) : null}
            </div>
          </div>

          <div>
            <Label htmlFor="address"> Address <span className='text-red-500'>*</span></Label>
            <div className="mt-1">
              <Input
                id="address"
                name="address"
                className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                placeholder="Enter address"
                type="text"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values?.address|| ""}
                invalid={validation.touched?.address && validation.errors?.address ? true : false}
              />
              {validation.touched.address && validation.errors?.address ? (<FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors?.address} </FormFeedback>) : null}
            </div>
          </div>

          <div>
            <Label htmlFor="Status"> State <span className='text-red-500'>*</span></Label>
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
              {validatepackingType == 1 ? ( <FormFeedback type="invalid" className="text-Red text-sm"> Please Select packing type </FormFeedback> ) : null}
            </div>
          </div>

          <div>
            <Label htmlFor="district"> District <span className='text-red-500'>*</span></Label>
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
              {validatepackingType == 1 ? ( <FormFeedback type="invalid" className="text-Red text-sm"> Please Select packing type </FormFeedback> ) : null}
            </div>
          </div>

          <div>
            <Label htmlFor="taluka"> Taluka <span className='text-red-500'>*</span></Label>
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
              {validatepackingType == 1 ? ( <FormFeedback type="invalid" className="text-Red text-sm"> Please Select packing type </FormFeedback> ) : null}
            </div>
          </div>

          <div>
            <Label htmlFor="village"> Village <span className='text-red-500'>*</span></Label>
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
              {validatepackingType == 1 ? ( <FormFeedback type="invalid" className="text-Red text-sm"> Please Select packing type </FormFeedback> ) : null}
            </div>
          </div>

          <div>
            <Label htmlFor="pincode"> Pincode <span className='text-red-500'>*</span></Label>
            <div className="mt-1">
              <Input
                id="pincode"
                name="pincode"
                className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                placeholder="Enter pincode"
                type="text"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values?.pincode|| ""}
                invalid={validation.touched?.pincode && validation.errors?.pincode ? true : false}
              />
              {validation.touched.pincode && validation.errors?.pincode ? (<FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors?.pincode} </FormFeedback>) : null}
            </div>
          </div>

          <div className='flex gap-x-3'>
            <div className='flex-1'>
              <Label htmlFor="landarea"> Land Area <span className='text-red-500'>*</span></Label>
              <div className="mt-1">
                <Input
                  id="landarea"
                  name="landarea"
                  className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                  placeholder="Enter land area"
                  type="number"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values?.landarea|| ""}
                  invalid={validation.touched?.landarea && validation.errors?.landarea ? true : false}
                />
                {validation.touched.landarea && validation.errors?.landarea ? (<FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors?.landarea} </FormFeedback>) : null}
              </div>
            </div>

            <div className='flex-1'>
              <Label htmlFor="land_type"> Land Type <span className='text-red-500'>*</span></Label>
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
                  value={selectedlandtypeOption}
                  onChange={(e) => { Islandypedata(e) }}
                  options={LandTypeOptions}
                  isClearable={true}
                />
                {validatelandtype == 1 ? ( <FormFeedback type="invalid" className="text-Red text-sm"> Please select land type </FormFeedback> ) : null}
              </div>
            </div>
          </div>
        
          <div>
            <Label htmlFor="landarea"> Irrigation Source <span className='text-red-500'>*</span></Label>
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
                value={selectedirrigationsourceOption}
                onChange={(e) => { Isirrigationsourcedata(e) }}
                options={IrrigationSourceOptions}
                isClearable={true}
              />
              {validateirrigationsource == 1 ? (<FormFeedback type="invalid" className="text-Red text-sm"> Please select Irrigation source </FormFeedback>) : null}
            </div>
          </div>

          <div>
            <Label htmlFor="land_type"> Irrigation Type <span className='text-red-500'>*</span></Label>
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
                value={selectedirrigationtypeOption}
                onChange={(e) => { Isirrigationtypedata(e) }}
                options={IrrigationTypeOptions}
                isClearable={true}
              />
              {validateirrigationtype == 1 ? (<FormFeedback type="invalid" className="text-Red text-sm"> Please select Irrigation type </FormFeedback>) : null}
            </div>
          </div>

          <div>
            <Label htmlFor="heard_aboutus"> Heard Aboutus <span className='text-red-500'>*</span></Label>
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
                value={selectedheaderaboutOption}
                onChange={(e) => { Isheardaboutdata(e) }}
                options={HeardAboutOprions}
                isClearable={true}
              />
              {validateheaderabout == 1 ? (<FormFeedback type="invalid" className="text-Red text-sm"> Please select Heard Aboutus </FormFeedback>) : null}
            </div>
          </div>

          <div>
            <Label htmlFor="refname"> Refrence Name </Label>
            <div className="mt-1">
              <Input
                id="refname"
                name="refname"
                className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                placeholder="Enter refname"
                type="text"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values?.refname|| ""}
                invalid={validation.touched?.refname && validation.errors?.refname ? true : false}
              />
              {validation.touched.refname && validation.errors?.refname ? (<FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors?.refname} </FormFeedback>) : null}
            </div>
          </div>
         
        </div>

          <div className="flex gap-x-3 justify-end flex-end self-end mt-[1rem]">
            <Button className="bg-gradient-to-br from-green-400 to-blue-600 text-white hover:bg-gradient-to-bl  border-0" type="submit" ><div className="flex items-center gap-x-3 text-[1.2rem]"> <FaUser className="text-xl" />  {isEditFarmer == true ? "Update Customer" : "Add Customer"} </div> </Button>
          </div>
      </Form>
      
   </div>
  )
}

export default SalesAddFarmer