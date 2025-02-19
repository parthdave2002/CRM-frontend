import { FC, useEffect, useState } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import ExampleBreadcrumb from "../../components/breadcrumb";
import { useSelector } from "react-redux";
import ImageUploadPreview from "../../components/imageuploader";

const ProfilePage : FC = function () {

    const [file1, setFile1] = useState<File | null>(null);
    console.log("file1 >>>>>>", file1);
    
    const [UserDataList, setUserDataList] = useState([]);

    // ------------- Get  Data From Reducer Code Start --------------
        const { UserList } = useSelector((state: any) => ({
            UserList: state.User.UserList,
        }));

        useEffect(() => {
            setUserDataList(UserList. pulledData ? UserList. pulledData  : null);
        }, [UserList]);
    //  ------------- Get  Data From Reducer Code end --------------

    let Name = "Profile";

    return (
        <>  
            <NavbarSidebarLayout isFooter={false}  isSidebar={true} isNavbar={true} isRightSidebar={true}>
                <ExampleBreadcrumb  Name={Name}  />
                <div className="mt-[2rem] bg-white dark:bg-gray-800 p-4">
                    <div className="flex flex-col ">

                        <ImageUploadPreview onFileSelect={setFile1} />

                        <div>
                            <div className="flex justify-around dark:text-gray-50 w-full">
                                <div> Name : Parth Dave </div>
                                <div> Email : Parth Dave </div>
                                <div> Contact : Parth Dave </div>
                            </div>
                        </div>
                    </div>
                </div>
            </NavbarSidebarLayout>
        </>
    );
}

export default ProfilePage;