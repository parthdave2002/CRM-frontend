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
import { AddCompanylist, ResetCompanylist } from "../../Store/actions";

const CompanyAddPage : FC = function () {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        description:"",
        status: "",
    });

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
    
        validationSchema: Yup.object({
          name: Yup.string().required("Please enter company name"),
          description: Yup.string().required("Please enter company description")
        }),
        
        onSubmit: (values) => {
          {selectedactiveid == 0 ? setValidateactive(1) : setValidateactive(0) }

          let requserdata = {
            name: values?.name,
            description: values?.description,
            is_active: selectedactiveid,
          };
          dispatch(AddCompanylist(requserdata));
        },
    });

    const isactiveoption =[
        {
            label :"Active",
            value : true
        },
        {
            label :"Inactive",
            value : false
        }
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

    let Name = "Company Add";
    let ParentName = "Company List";
    let ParentLink = "/company/list";

    return (
        <>  
            <NavbarSidebarLayout isFooter={false}  isSidebar={true} isNavbar={true} isRightSidebar={true}>
                <ExampleBreadcrumb  Name={Name} ParentName={ParentName} ParentLink={ParentLink}  />
                <div className="mt-[2rem] bg-white dark:bg-gray-800 p-4">
                    <Form onSubmit={(e) => { e.preventDefault(); validation.handleSubmit(); return false; }} >
                        <div>
                            <Label htmlFor="Name">Name</Label>
                            <div className="mt-1">
                            <Input
                                id="name"
                                name="name"
                                className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                placeholder="Company name"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.name || ""}
                                invalid={ validation.touched.name && validation.errors.name ? true : false}
                            />
                            {validation.touched.name && validation.errors.name ? ( <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.name} </FormFeedback> ) : null}
                            </div>
                        </div>

                        <div className="mt-[1rem]">
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
                                value={validation.values.description || ""}
                                invalid={ validation.touched.description && validation.errors.description ? true : false}
                            />
                            {validation.touched.description && validation.errors.description ? ( <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.description} </FormFeedback> ) : null}
                            </div>
                        </div>

                        <div className="mt-[1rem]">
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

                        <div className="flex gap-x-3 justify-end mt-[1rem]">
                            <Button className="bg-addbutton hover:bg-addbutton dark:bg-addbutton dark:hover:bg-addbutton" type="submit" > Add Company </Button>
                            <Button className="bg-deletebutton hover:bg-deletebutton dark:bg-deletebutton dark:hover:bg-deletebutton" onClick={() => navigate(ParentLink)}>  Close </Button>
                        </div>
                    </Form>
                </div>
            </NavbarSidebarLayout>
        </>
    );
}

export default CompanyAddPage;