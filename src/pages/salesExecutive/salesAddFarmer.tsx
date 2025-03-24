import React, { FC, useEffect, useState } from 'react';
import { Label, Button } from "flowbite-react";
import { FaWindowClose } from 'react-icons/fa';
import { Form, Input, FormFeedback } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import Select from "react-select";
import { useParams } from 'react-router';

interface ProfileData{
  isEditFarmer ?: boolean;
  setFarmerAdded : (value: boolean) => void;
}

const SalesAddFarmer: FC<ProfileData> = ({setFarmerAdded, isEditFarmer}) => {
  const dispatch = useDispatch();

  // ------------- Packing Type Get Data From Reducer Code Start --------------
  const [PackingTypeListData, setPackingTypeListData] = useState([]);
  const Packingtypelist = useSelector((state: any) => state.PackingType.Packingtypelist,);
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
    name: "",
    mobile: "",
    address:"",
    alternate_mobile_no: "",
    state : "",
    district : "",
    taluka : "",
    village : "",
    pincode : "",
    land_area : "",
    land_type : "",
    irrigation_source : "",
    irrigation_type : "",
    smart_phone : "",
    crop : [],
    heard_about : ""
  });

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,

    validationSchema: Yup.object({
      name: Yup.string().required("Please enter name"),
      mobile: Yup.string().required("Please enter mobile no"),
      alternate_mobile_no: Yup.string().required("Please enter alternate mobile no"),
      address: Yup.string().required("Please enter address"),
      pincode: Yup.string().required("Please enter pincode"),
    }),

    onSubmit: (values) => {
      let requserData = {
        name: values.name,
        mobile: values.mobile,
        alternate_mobile_no: values.alternate_mobile_no,
        address: values.address,
      }

      console.log("mobile", requserData);
      // dispatch(AddRoleslist(requserData));
      validation.resetForm();
    },
  });

  return (
   <div className='mt-[2rem]'>
      <div className='flex justify-between'>
        <div className="text-[2rem] font-semibold text-gray-900 dark:text-gray-100"> {isEditFarmer == true ? "Update Farmer"  : "Add Farmer" }  </div>
        <div className="text-[2rem] font-semibold text-gray-900 dark:text-gray-100 flex self-center cursor-pointer " onClick={() => setFarmerAdded(false)}> <FaWindowClose /> </div>
      </div>

      <Form onSubmit={(e) => {  e.preventDefault(); validation.handleSubmit(); return false;  }} >
        <div className="dark:bg-gray-800 p-4 rounded-lg border border-gray-300 dark:border-gray-500 space-y-3  md:grid grid-cols-2 gap-[1rem]">
          <div>
            <Label htmlFor="Name">Name </Label>
            <div className="mt-1">
              <Input
                id="name"
                name="name"
                className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                placeholder="Enter name"
                type="text"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values?.name|| ""}
                invalid={validation.touched?.name && validation.errors?.name ? true : false}
              />
              {validation.touched.name && validation.errors?.name ? (<FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors?.name} </FormFeedback>) : null}
            </div>
          </div>

          <div >
            <Label htmlFor="Name"> Mobile No</Label>
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
            <Label htmlFor="alternate mobile"> Alternate Mobile No </Label>
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
            <Label htmlFor="address"> Address </Label>
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
            <Label htmlFor="Status"> State </Label>
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
            <Label htmlFor="district"> District </Label>
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
            <Label htmlFor="taluka"> Taluka </Label>
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
            <Label htmlFor="village"> Village </Label>
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
            <Label htmlFor="pincode"> Pincode </Label>
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
              <Label htmlFor="land_area"> Land Area </Label>
              <div className="mt-1">
                <Input
                  id="land_area"
                  name="land_area"
                  className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                  placeholder="Enter land area"
                  type="number"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values?.land_area|| ""}
                  invalid={validation.touched?.land_area && validation.errors?.land_area ? true : false}
                />
                {validation.touched.land_area && validation.errors?.land_area ? (<FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors?.land_area} </FormFeedback>) : null}
              </div>
            </div>

            <div className='flex-1'>
              <Label htmlFor="land_type"> Laynd Type </Label>
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
          </div>
        
          <div>
            <Label htmlFor="land_area"> Irrigation Source </Label>
            <div className="mt-1">
              <Input
                id="land_area"
                name="land_area"
                className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                placeholder="Enter land area"
                type="number"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values?.land_area || ""}
                invalid={validation.touched?.land_area && validation.errors?.land_area ? true : false}
              />
              {validation.touched.land_area && validation.errors?.land_area ? (<FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors?.land_area} </FormFeedback>) : null}
            </div>
          </div>

          <div>
            <Label htmlFor="land_type"> Irrigation Type </Label>
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
              {validatepackingType == 1 ? (<FormFeedback type="invalid" className="text-Red text-sm"> Please Select packing type </FormFeedback>) : null}
            </div>
          </div>

          <div>
            <Label htmlFor="heard_aboutus"> Heard Aboutus </Label>
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
              {validatepackingType == 1 ? (<FormFeedback type="invalid" className="text-Red text-sm"> Please Select packing type </FormFeedback>) : null}
            </div>
          </div>
       
        </div>

        <div className="flex gap-x-3 justify-end mt-[1rem]">
            <Button className="bg-addbutton hover:bg-addbutton dark:bg-addbutton dark:hover:bg-addbutton" type="submit" > {isEditFarmer == true ? "Update Customer" : "Add Customer"} </Button>
            {/* <Button className="bg-deletebutton hover:bg-deletebutton dark:bg-deletebutton dark:hover:bg-deletebutton" onClick={() => navigate(ParentLink)}>  Close </Button> */}
          </div>
      </Form>
      
   </div>
  )
}

export default SalesAddFarmer