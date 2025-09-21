import { FC, useEffect, useState } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import ExampleBreadcrumb from "../../components/breadcrumb";
const IMG_URL = import.meta.env["VITE_API_URL"];
import { useDispatch, useSelector } from "react-redux";
import ImageUploadPreview from "../../components/input/imageuploader";
import {ProfileUserdatalist, UpdatePassword, UpdateProfileUserdatalist }  from "../../Store/actions"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
const ProfilePage : FC = function () {
    const dispatch =useDispatch()
    interface RoleData{
        id:string;
        role_title:string;
    }
    interface UserData{
        name:string;
        email:string;
        role: RoleData;
        user_pic:string;
    }

    const [file1, setFile1] = useState<File | null>(null);
    const [userData, setuserData] = useState<UserData>();

    // ------------- Get  Data From Reducer Code Start --------------
        const Profileuserdata  = useSelector((state: any) => state.User.Profileuserdata);
        useEffect(() => {
            setuserData(Profileuserdata.data  ? Profileuserdata.data   : null);
        }, [ Profileuserdata]);
    //  ------------- Get  Data From Reducer Code end --------------

    useEffect(() =>{
        dispatch(ProfileUserdatalist())
    },[])

    useEffect(() =>{
        if(file1){
            const formData = new FormData();
            formData.append("user_pic", file1); 
            dispatch(UpdateProfileUserdatalist(formData))
        }
    },[file1])

    let Name = "Profile";

    return (
        <>  
            <NavbarSidebarLayout isFooter={false}  isSidebar={true} isNavbar={true} isRightSidebar={true}>
                <ExampleBreadcrumb  Name={Name}  />
                <div className="mt-[2rem] bg-white dark:bg-gray-800 p-4">
                    <div className="flex flex-col ">

                        <ImageUploadPreview onFileSelect={setFile1}  defaultImage={userData?.user_pic ? `${IMG_URL}/public/user/${userData?.user_pic}` : ""}  />

                        <div>
                                <div className="flex flex-col gap-y-3 dark:text-gray-50 w-full mt-[3rem]">
                                <div> Name : { userData ? userData?.name : "N/A"}</div>
                                <div> Email : { userData ? userData?.email : "N/A" } </div>
                                <div> Role : {   userData ? userData?.role?.role_title : "N/A"   } </div>
                            </div>
                        </div>

                        <div className="mt-8 w-full">
                                                    <Formik
                                                        initialValues={{
                                                            password: "",
                                                            confirmPassword: "",
                                                        }}
                                                        validationSchema={Yup.object({
                                                            password: Yup.string().required("New password is required"),
                                                            confirmPassword: Yup.string()
                                                                .oneOf([Yup.ref("password")], "Passwords must match")
                                                                .required("Confirm password is required"),
                                                        })}
                                                        onSubmit={(values, { resetForm }) => {
                                                             dispatch(UpdatePassword(values))
                                                            // alert("Password changed successfully!\n" + JSON.stringify(values, null, 2));
                                                            resetForm();
                                                        }}
                                                    >
                                                        {({ isSubmitting }) => {
                                                            const [showNew, setShowNew] = useState(false);
                                                            const [showConfirm, setShowConfirm] = useState(false);
                                                            return (
                                                                <Form className=" bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow">
                                                                   <div className="flex gap-x-3">
                                                                        <div className="flex-1">
                                                                            <label className="block text-sm font-medium mb-1" htmlFor="password">New Password</label>
                                                                            <div className="relative">
                                                                                <Field  name="password"  placeholder="New Password"  type={showNew ? "text" : "password"}   className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"  />
                                                                                <button type="button" onClick={() => setShowNew(v => !v)}
                                                                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300">
                                                                                    {showNew ? <FaRegEyeSlash size={20} />  :   <FaRegEye size={20} />}
                                                                                </button>
                                                                            </div>
                                                                            <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                                                                        </div>
                                                                        <div  className="flex-1">
                                                                            <label className="block text-sm font-medium mb-1" htmlFor="confirmPassword">Confirm Password</label>
                                                                            <div className="relative">
                                                                                <Field
                                                                                    name="confirmPassword"
                                                                                    placeholder="Confirm password"
                                                                                    type={showConfirm ? "text" : "password"}
                                                                                    className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                                                                                />
                                                                                <button type="button" onClick={() => setShowConfirm(v => !v)}
                                                                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300">
                                                                                    {showConfirm ?  <FaRegEyeSlash size={20} />  :   <FaRegEye size={20} /> }
                                                                                </button>
                                                                            </div>
                                                                            <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs mt-1" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex justify-end">
                                                                    <button type="submit" className="flex justify-end py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow mt-4 disabled:opacity-60"  disabled={isSubmitting}  > {isSubmitting ? "Changing..." : "Change Password"} </button>
                                                                    </div>
                                                                </Form>
                                                            );
                                                        }}
                                                    </Formik>
                        </div>

                    </div>
                </div>
            </NavbarSidebarLayout>
        </>
    );
}

export default ProfilePage;