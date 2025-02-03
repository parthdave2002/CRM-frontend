import { FC, useState } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import ExampleBreadcrumb from "../../components/breadcrumb";
import { Label, Button } from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Input, FormFeedback } from "reactstrap";
import { useNavigate } from "react-router";

const AddUserPage : FC = function () {

    const navigate = useNavigate();
    const [initialValues, setinitialValues] = useState({
        id: 0,
        user_name: "",
        description: "",
        email:"",
        password:"",
    });
    
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        
        validationSchema: Yup.object({
            user_name: Yup.string().required("Please Enter User Name"),
            description: Yup.string().required("Please Enter Description"),
            email: Yup.string().required("Please Enter Email"),
            password: Yup.string().required("Please Enter Password"),
        }),
        
        onSubmit: (values) => {
            //   dispatch(AddModulelist(values));
            validation.resetForm();
            initialValues.user_name = "";
            initialValues.description = "";
        },
    });

    let Name = "User Add";
    let ParentName = "User List";
    let ParentLink = "/users/list";

    return (
        <>  
            <NavbarSidebarLayout isFooter={false}  isSidebar={true} isNavbar={true} isRightSidebar={true}>
                <ExampleBreadcrumb  Name={Name} ParentName={ParentName} ParentLink={ParentLink}  />
                <div className="mt-[2rem] bg-white dark:bg-gray-800 p-4">
                    <Form onSubmit={(e) => { e.preventDefault(); validation.handleSubmit(); return false; }} >
                        <div>
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

                        <div  className="mt-[1rem]">
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

                        <div className="mt-[1rem]">
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

                        <div className="mt-[1rem]">
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
                                invalid={ validation.touched.description && validation.errors.description ? true : false }
                            />
                            {validation.touched.description && validation.errors.description ? (
                                <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors.description} </FormFeedback>
                            ) : null}
                            </div>
                        </div>

                        <div className="flex gap-x-3 justify-end mt-[3rem]">
                            <Button className="bg-addbutton hover:bg-addbutton dark:bg-addbutton dark:hover:bg-addbutton" type="submit"> Add User </Button>
                            <Button className="bg-deletebutton hover:bg-deletebutton dark:bg-deletebutton dark:hover:bg-deletebutton" onClick={() => navigate("/users/list")}>  Close </Button>
                        </div>
                    </Form>
                </div>
            </NavbarSidebarLayout>
        </>
    );
}

export default AddUserPage;