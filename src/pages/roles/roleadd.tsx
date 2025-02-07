import { FC, useState } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import ExampleBreadcrumb from "../../components/breadcrumb";
import { Label, Button } from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { Form, Input, FormFeedback } from "reactstrap";
import { useNavigate } from "react-router";

const AddRolePage : FC = function () {
    const navigate = useNavigate();

    const isactiveoption =[
        {label :"Active", value : true},
        { label :"Inactive", value : false}
    ]

    //---------------- Satus option code start ----------------
        const [selectedStatusOption, setSelectedStatusOption] = useState(null);
        const [selectedStatusid, setSelectedStatusid] = useState(0);

        const IsActivedata = (data: any) => {
        if (!data) {
            setSelectedStatusid(0);
            setSelectedStatusOption(null);
        } else {
            setSelectedStatusid(data.value);
            setSelectedStatusOption(data);
        }
        };
    //---------------- Satus option code end ----------------

    const [initialValues, setinitialValues] = useState({
        id: 0,
        role_name: "",
        description: "",
    });

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
    
        validationSchema: Yup.object({
          role_name: Yup.string().required("Please Enter Role Name"),
          description: Yup.string().required("Please Enter Description"),
        }),
    
        onSubmit: (values) => {
        //   dispatch(AddModulelist(values));
          validation.resetForm();
          initialValues.role_name = "";
          initialValues.description = "";
        },
    });

    let Name = "Role Add";
    let ParentName = "Role List";
    let ParentLink = "/roles/list";

    return (
        <>  
            <NavbarSidebarLayout isFooter={false}  isSidebar={true} isNavbar={true} isRightSidebar={true}>
                <ExampleBreadcrumb  Name={Name} ParentName={ParentName} ParentLink={ParentLink}  />
                <div className="mt-[2rem] bg-white dark:bg-gray-800 p-4">
                    <Form onSubmit={(e) => { e.preventDefault(); validation.handleSubmit(); return false; }} >
                        <div>
                            <Label htmlFor="RoleName">Role Name</Label>
                            <div className="mt-1">
                            <Input
                                id="role_name"
                                name="role_name"
                                className="bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"
                                placeholder="Role Name"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.role_name || ""}
                                invalid={
                                validation.touched.role_name &&
                                validation.errors.role_name
                                    ? true
                                    : false
                                }
                            />
                            {validation.touched.role_name &&
                            validation.errors.role_name ? (
                                <FormFeedback type="invalid" className="text-Red text-sm">
                                {validation.errors.role_name}
                                </FormFeedback>
                            ) : null}
                            </div>
                        </div>

                        <div className="my-[1rem]">
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
                        
                        <div className="mb-[1rem]">
                            <Label htmlFor="Description"> Status </Label>
                            <div className="">
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
                            </div>
                        </div>

                        <div className="flex gap-x-3 justify-end">
                            <Button className="bg-addbutton hover:bg-addbutton dark:bg-addbutton dark:hover:bg-addbutton" type="submit" > Add Role </Button>
                            <Button className="bg-deletebutton hover:bg-deletebutton dark:bg-deletebutton dark:hover:bg-deletebutton" onClick={() => navigate("/roles/list")}>  Close </Button>
                        </div>
                    </Form>
                </div>
            </NavbarSidebarLayout>
        </>
    );
}

export default AddRolePage;