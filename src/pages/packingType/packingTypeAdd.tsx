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
import { AddPackingTypelist, ResetPackingTypelist } from "../../Store/actions";
import { toast } from "react-toastify";

const AddpackingTypePage : FC = function () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // ------ status code start ------
    const [selectedactiveOption, setSelectedactiveOption] = useState(null);
    const [selectedactiveid, setSelectedactiveid] = useState<boolean | null>(null);
    const [validateactive, setValidateactive] = useState(0);
  
    const IsActivedata = (data: any) => {
      if (!data) {
        setSelectedactiveid(null);
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
        packing_type: "",
        status: "",
    });

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
    
        validationSchema: Yup.object({
          packing_type: Yup.string().required("Please enter packing type"),
        }),
        
        onSubmit: (values) => {
          if(selectedactiveid == null) return setValidateactive(1);
          let requserdata = {
            type: values?.packing_type,
            is_active: selectedactiveid,
          };
          dispatch(AddPackingTypelist(requserdata));
        },
    });

    const isactiveoption =[
        {  label :"Active",   value : true  },
        {  label :"Inactive",  value : false }
    ]

    // ------------- Get  Data From Reducer Code Start --------------
        const { AddPackingtypelist } = useSelector((state: any) => ({
            AddPackingtypelist: state.PackingType.AddPackingtypelist,

        }));

        useEffect(() => {  
            if(AddPackingtypelist?.success == true){
                dispatch(ResetPackingTypelist())
                toast.success(AddPackingtypelist?.msg);
                navigate(ParentLink)
                validation.resetForm();
                initialValues.packing_type = "";
                setSelectedactiveid(null);
                setSelectedactiveOption(null);
                setValidateactive(1)
            }
        }, [AddPackingtypelist]);
    //  ------------- Get Data From Reducer Code end --------------

    let Name = "Packing type Add";
    let ParentName = "Packing type List";
    let ParentLink = "/packing-type/list";

    return (
        <>  
            <NavbarSidebarLayout isFooter={false}  isSidebar={true} isNavbar={true} isRightSidebar={true}>
                <ExampleBreadcrumb  Name={Name} ParentName={ParentName} ParentLink={ParentLink}  />
                <div className="mt-[2rem] bg-white dark:bg-gray-800 p-4">
                    <Form onSubmit={(e) => { e.preventDefault(); validation.handleSubmit(); return false; }} >
                        <div>
                            <Label htmlFor="PackingType">Packing Type</Label>
                            <div className="mt-1">
                            <Input
                                id="packing_type"
                                name="packing_type"
                                className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                placeholder="Packing Type"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.packing_type || ""}
                                invalid={
                                validation.touched.packing_type &&
                                validation.errors.packing_type
                                    ? true
                                    : false
                                }
                            />
                            {validation.touched.packing_type &&
                            validation.errors.packing_type ? (
                                <FormFeedback type="invalid" className="text-Red text-sm">
                                {validation.errors.packing_type}
                                </FormFeedback>
                            ) : null}
                            </div>
                        </div>

                        <div className="my-[1rem]">
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
                            {validateactive == 1 ?  <FormFeedback type="invalid" className="text-Red text-sm"> Please select status </FormFeedback> : null}
                            </div>
                        </div>

                        <div className="flex gap-x-3 justify-end">
                            <Button className="bg-addbutton hover:bg-addbutton dark:bg-addbutton dark:hover:bg-addbutton" type="submit" > Add packing type </Button>
                            <Button className="bg-deletebutton hover:bg-deletebutton dark:bg-deletebutton dark:hover:bg-deletebutton" onClick={() => navigate(ParentLink)}>  Close </Button>
                        </div>
                    </Form>
                </div>
            </NavbarSidebarLayout>
        </>
    );
}

export default AddpackingTypePage;