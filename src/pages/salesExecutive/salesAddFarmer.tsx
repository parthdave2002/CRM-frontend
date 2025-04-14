import React, { FC, useEffect, useState } from 'react';
import { Label, Button } from "flowbite-react";
import { FaUser, FaWindowClose } from 'react-icons/fa';
import { Form, Input, FormFeedback } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import Select from "react-select";
import { toast } from 'react-toastify';
import { AddCustomerDatalist, getCroplist, getdistrictdata, getstatedatalist, gettalukadata, getvillagedata, ResetCustomerDatalist } from '../../Store/actions';

interface ProfileData{
  isEditFarmer ?: boolean;
  setFarmerAdded : (value: boolean) => void;
}

const SalesAddFarmer: FC<ProfileData> = ({setFarmerAdded, isEditFarmer}) => {
  const dispatch = useDispatch();

  // ------------- State Get Data From Reducer Code Start --------------
  useEffect(() =>{
    dispatch(getstatedatalist())
  },[])

  const stateoption = useSelector((state: any) => state.Location.Statedatalist?.data)?.map(
    (item: any) => ({
      label: item.name,
      value: item._id
    })
  );
  const districtoption = useSelector((state: any) => state.Location.Districtdatalist?.data)?.map(
    (item: any) => ({
      label: item.name,
      value: item._id
    }));

  const talukaoption = useSelector((state: any) => state.Location.Talukadatalist?.data)?.map(
    (item: any) => ({
      label: item.name,
      value: item._id
    })
  );

  const villageoption = useSelector((state: any) => state.Location.Villagedatalist?.data)?.map(
    (item: any) => ({
      label: item.name,
      value: item._id
    })
  );

    const [selectedStateOption, setSelectedStateOption] = useState<{ label: string, value: string } | null>(null);
    const [selectedStateid, setSelectedStateid] = useState<string | null>(null);
    const [validateState, setValidateState] = useState(0);

    const IsStatedata = (data: any) => {
      if (!data) {
        setSelectedStateid("");
        setSelectedStateOption(null);
        setValidateState(1)
        setSelectedDistrictid("");
        setSelectedDistrictOption(null);
        setValidateDistrict(1)
        setSelectedTalukaid("");
        setSelectedTalukaOption(null);
        setValidateTaluka(1);
        setSelectedVillageid("");
        setSelectedVillageOption(null);
        setValidateVaillage(1)
      } else {
        setSelectedStateid(data.value);
        setSelectedStateOption(data);
        setValidateState(0);
        setSelectedDistrictid("");
        setSelectedDistrictOption(null);
        setValidateDistrict(1)
        setSelectedTalukaid("");
        setSelectedTalukaOption(null);
        setValidateTaluka(1);
        setSelectedVillageid("");
        setSelectedVillageOption(null);
        setValidateVaillage(1)
      }
    };
  //  ------------- State Get Data From Reducer Code end --------------

  // ------------- District Get Data From Reducer Code Start --------------
  useEffect(() =>{
    if(selectedStateid){
      let requser ={  stateId: selectedStateid }
      dispatch(getdistrictdata(requser))
    }
  },[selectedStateid])
  
    const [selectedDistrictOption, setSelectedDistrictOption] = useState<{ label: string, value: string } | null>(null);
    const [selectedDistrictid, setSelectedDistrictid] = useState<string | null>(null);
    const [validateDistrict, setValidateDistrict] = useState(0);

    const IsDistrictdata = (data: any) => {
      if (!data) {
        setSelectedDistrictid("");
        setSelectedDistrictOption(null);
        setValidateDistrict(1)
        setSelectedTalukaid("");
        setSelectedTalukaOption(null);
        setValidateTaluka(1);
        setSelectedVillageid("");
        setSelectedVillageOption(null);
        setValidateVaillage(1)
      } else {
        setSelectedDistrictid(data.value);
        setSelectedDistrictOption(data);
        setValidateDistrict(0)
        setSelectedTalukaid("");
        setSelectedTalukaOption(null);
        setValidateTaluka(1);
        setSelectedVillageid("");
        setSelectedVillageOption(null);
        setValidateVaillage(1)
      }
    };
  //  ------------- District Get Data From Reducer Code end --------------

  // ------------- Taluka Get Data From Reducer Code Start --------------
  useEffect(() =>{
    if(selectedDistrictid){
    let requser ={ stateId: selectedStateid ,  districtId: selectedDistrictid }
    dispatch(gettalukadata(requser))
    }
  },[selectedDistrictid])

    const [selectedTalukaOption, setSelectedTalukaOption] = useState<{ label: string, value: string } | null>(null);
    const [selectedTalukaid, setSelectedTalukaid] = useState<string | null>(null);
    const [validateTaluka, setValidateTaluka] = useState(0);
  
    const IsTalukadata = (data: any) => {
      if (!data) {
        setSelectedTalukaid("");
        setSelectedTalukaOption(null);
        setValidateTaluka(1)
        setSelectedVillageid("");
        setSelectedVillageOption(null);
        setValidateVaillage(1)
      } else {
        setSelectedTalukaid(data.value);
        setSelectedTalukaOption(data);
        setValidateTaluka(0)
        setSelectedVillageid("");
        setSelectedVillageOption(null);
        setValidateVaillage(1)
      }
    };
  //  ------------- Taluka Get Data From Reducer Code end --------------
  
  // ------------- Village Get Data From Reducer Code Start --------------
  useEffect(() =>{
    if(selectedTalukaid){
      let requser ={ stateId: selectedStateid ,  districtId: selectedDistrictid,  talukaId: selectedTalukaid }
      dispatch(getvillagedata(requser))
    }
  },[selectedTalukaid]) 
  
    const [selectedVillageOption, setSelectedVillageOption] = useState<{ label: string, value: string } | null>(null);
    const [selectedVillageid, setSelectedVillageid] = useState<string | null>(null);
    const [validateVaillage, setValidateVaillage] = useState(0);
  
    const IsVillagedata = (data: any) => {
      if (!data) {
        setSelectedVillageid("");
        setSelectedVillageOption(null);
        setValidateVaillage(1)
      } else {
        setSelectedVillageid(data.value);
        setSelectedVillageOption(data);
        setValidateVaillage(0)
      }
    };
  //  ------------- Village Get Data From Reducer Code end --------------
  
  const [initialValues, setinitialValues] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    mobile_number: "",
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
      mobile_number: Yup.string().required("Please enter mobile no").matches(/^\d{10}$/, "Please enter valid mobile number"),
      address: Yup.string().required("Please enter address"),
      pincode: Yup.string().required("Please enter pincode"),
      landarea: Yup.string().required("Please enter land area")
    }),

    onSubmit: (values) => {
      let requserData = {
        firstname: values?.firstname,
        middlename: values?.middlename,
        lastname: values?.lastname,
        mobile_number: values?.mobile_number,
        alternate_mobile_no: values?.alternate_mobile_no,
        address: values?.address,
        state : selectedStateid,
        district : selectedDistrictid,
        taluka : selectedTalukaid,
        village : selectedVillageid,
        pincode : values?.pincode,
        land_area : values?.landarea,
        land_type : selectedlandtypeid,
        irrigation_source : selectedirrigationsourceid,
        irrigation_type : selectedirrigationtypeid,
        heard_about_agribharat : selectedheaderaboutid,
        smart_phone: true,
        crops:selectedcropid,
        ref_name : values?.refname
      }
      dispatch(AddCustomerDatalist(requserData));
    },
  });

  // -------------- Header about code start ---------
  const HeardAboutOprions= [
    { label :"Newspaper", value : "newspaper"},
    { label :"TV Ad", value : "tv add"},
    { label :"Magazine", value : "magazine"},
    { label :"Van campaign", value : "van campaign"},
    { label :"Instagram", value : "instagram"},
    { label :"Facebook", value : "facebook"},
    { label :"What's App", value : "whatsapp"},
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

   // -------------- Header about code start ---------  

      const  CropOprions= useSelector((state: any) => state.Crop.Cropdatalist )?.map(
        (item: any) => ({
          label: item.name_eng,
          value: item._id
        }));

  useEffect(() =>{
    dispatch(getCroplist() )
  },[])

  const [selectedcropOption, setSelectedcropOption] = useState<{ label: string, value: string } | null>(null);
  const [selectedcropid, setSelectedcropid] = useState<string | []>([]);
  const [validatecrop, setValidatecrop] = useState(0);

  const Iscropdata = (data: any) => {
    if (!data || data.length === 0) {
      setSelectedcropid([]);
      setSelectedcropOption(null);
      setValidatecrop(1)
    } else {
      const selectedIds = data.map((item: any) => item.value); 
      setSelectedcropid(selectedIds);
      setSelectedcropOption(data);
      setValidatecrop(0)
    }
  };
  // -------------- Header about code end ---------

  // -------------- Irrigation source code start ---------
  const IrrigationSourceOptions= [
    { label :"Well", value : "well"},
    { label :"Borwell", value : "borwell"},
    { label :"Canal", value : "canal"},
    { label :"Other", value : "other"},
    { label :"No source", value : "no source"},
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
    { label :"Drip", value : "drip"},
    { label :"Sprinkler", value : "sprinkler"},
    { label :"Flood", value : "flood"},
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

  const CloseCall = () =>{
    if(validation?.values?.firstname){
      setFarmerAdded(false)
    }
    else{
      setFarmerAdded(false)
    }
  }

  // ------------- Get  Data From Reducer Code Start --------------
    const  AddCustomerlist = useSelector((state: any) => state.Customer.AddCustomerlist)
    const [ userAddedData, setUserAddedData] = useState<any>(null)
    
    useEffect(() => {
      setUserAddedData(AddCustomerlist ? AddCustomerlist  : null);
    }, [AddCustomerlist]);

    useEffect(() =>{  
      console.log("userAddedData", userAddedData);
      
      if(userAddedData?.success == true ){
        toast.success(userAddedData?.msg);
        validation.resetForm();
        setFarmerAdded(false);
        dispatch(ResetCustomerDatalist())
      }
    },[userAddedData])
  //  ------------- Get  Data From Reducer Code end --------------

  return (
   <div className='mt-[2rem]'>
      <div className='flex justify-between'>
        <div className="text-[2rem] font-semibold text-gray-900 dark:text-gray-100"> {isEditFarmer == true ? "Update Farmer"  : "Add Farmer" }  </div>
        <div className="text-[2rem] font-semibold text-gray-900 dark:text-gray-100 flex self-center cursor-pointer " onClick={() => CloseCall()}> <FaWindowClose /> </div>
      </div>

      <Form onSubmit={(e) => {  
        e.preventDefault(); 
        validation.handleSubmit(); 
        if (!selectedheaderaboutOption) setValidateheaderabout(1) 
        if (!selectedirrigationtypeOption) setValidateirrigationtype(1) 
        if (!selectedirrigationsourceOption) setValidateirrigationsource(1)
        if (!selectedlandtypeOption) setValidatelandtype(1)
        if (!selectedVillageOption) setValidateVaillage(1)
        if (!selectedTalukaOption) setValidateTaluka(1)
        if (!selectedDistrictOption) setValidateDistrict(1)
        if (!selectedStateOption) setValidateState(1)
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
                id="mobile_number"
                name="mobile_number"
                className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                placeholder="Enter mobile"
                type="text"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values?.mobile_number || ""}
                invalid={validation.touched?.mobile_number && validation.errors?.mobile_number ? true : false}
              />
              {validation.touched?.mobile_number && validation.errors?.mobile_number ? (<FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors?.mobile_number} </FormFeedback>) : null}
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
                value={selectedStateOption}
                onChange={(e) => { IsStatedata(e) }}
                options={stateoption}
                isClearable={true}
              />
              {validateState == 1 ? ( <FormFeedback type="invalid" className="text-Red text-sm"> Please select state </FormFeedback> ) : null}
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
                value={selectedDistrictOption}
                onChange={(e) => { IsDistrictdata(e) }}
                options={districtoption}
                isClearable={true}
              />
              {validateDistrict == 1 ? ( <FormFeedback type="invalid" className="text-Red text-sm"> Please select district </FormFeedback> ) : null}
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
                value={selectedTalukaOption}
                onChange={(e) => { IsTalukadata(e) }}
                options={talukaoption}
                isClearable={true}
              />
              {validateTaluka == 1 ? ( <FormFeedback type="invalid" className="text-Red text-sm"> Please select taluka </FormFeedback> ) : null}
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
                value={selectedVillageOption}
                onChange={(e) => { IsVillagedata(e) }}
                options={villageoption}
                isClearable={true}
              />
              {validateVaillage == 1 ? ( <FormFeedback type="invalid" className="text-Red text-sm"> Please select village </FormFeedback> ) : null}
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
            <Label htmlFor="heard_aboutus"> Heard About us <span className='text-red-500'>*</span></Label>
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
            <Label htmlFor="heard_aboutus"> Crops <span className='text-red-500'>*</span></Label>
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
                value={selectedcropOption}
                onChange={(e) => { Iscropdata(e) }}
                options={CropOprions}
                isClearable={true}
                isMulti={true}
              />
              {validatecrop == 1 ? (<FormFeedback type="invalid" className="text-Red text-sm"> Please select crop </FormFeedback>) : null}
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
                type="number"
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