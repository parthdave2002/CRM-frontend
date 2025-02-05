import { FC, useEffect, useState } from "react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import ExampleBreadcrumb from "../../components/breadcrumb";
import { useSelector } from "react-redux";

const ProfilePage : FC = function () {
     
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
                    <div> Profile Page</div>
                </div>
                
            </NavbarSidebarLayout>
        </>
    );
}

export default ProfilePage;