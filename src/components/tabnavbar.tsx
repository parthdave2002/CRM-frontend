import type { FC } from "react";
import { useEffect, useState } from "react";
import { Tabs, TabsHeader, Tab } from "@material-tailwind/react";
// import { getMenuItemlist } from "../Store/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ExampleTabNavbar: FC = function () {
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState();
  const [MainMenuList, setMainMenuList] = useState([]);

  const { MenuItemlist } = useSelector((state:any) => ({
    MenuItemlist: state.Menu.MenuItemlist,
  }));

  // useEffect(() => {
  //   let requserdata = {
  //     id: "64af88a898cc6a43f423bcee",
  //     type: "Menu-item-View",
  //   };
  //   dispatch(getMenuItemlist(requserdata));
  // }, [dispatch]);

  console.log("MenuItemlist >>>>>>>>>>>>",MenuItemlist);
  const Menuicon =  MainMenuList && MainMenuList.map((item:any) => ( item.icon ));

  
  useEffect(() => {
    setMainMenuList(MenuItemlist ? MenuItemlist.data : null);
  }, [MenuItemlist]);

  const groupoptions =
    MainMenuList &&
    MainMenuList.map((item:any) => ({
      value: item.target,
      label: item.name,
    }));

  return (
    <>
      <Tabs value={activeTab}>
        <TabsHeader
          className="rounded-none border-b border-blue-gray-50 bg-transparent p-0 dark:text-white-200 "
          indicatorProps={{
            className:
              "bg-transparent border-b-2 border-blue-500 shadow-none rounded-none  dark:text-white-200",
          }}
        >
          {groupoptions.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              onClick={() => setActiveTab(value)}
              className={
                activeTab === value
                  ? "text-blue-500"
                  : "text-black dark:text-white dark:hover:text-indigo-600"
              }
            >
               <Link to={value}>
              {label}
              </Link>
            </Tab>
          ))}
        </TabsHeader>
       
      </Tabs>

      {/* <div className=" border-b border-gray-200 dark:border-gray-700 dark:text-white ">
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center"
          id="myTab"
          data-tabs-toggle="#myTabContent"
          role="tablist"
        >
          <li className="mr-2" role="presentation">
            <button
              className="inline-block p-4 border-b-2 rounded-t-lg dark:hover:text-indigo-500"
              id="profile-tab"
              data-tabs-target="#profile"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >
              Profile
            </button>
          </li>



          <li className="mr-2" role="presentation">
            <button
              className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-indigo-500"
              id="dashboard-tab"
              data-tabs-target="#dashboard"
              type="button"
              role="tab"
              aria-controls="dashboard"
              aria-selected="false"
            >
              Dashboard
            </button>
          </li>


          <li className="mr-2" role="presentation">
            <button
              className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-indigo-500"
              id="settings-tab"
              data-tabs-target="#settings"
              type="button"
              role="tab"
              aria-controls="settings"
              aria-selected="false"
            >
              Settings
            </button>
          </li>

          <li role="presentation">
            <button
              className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-indigo-500"
              id="contacts-tab"
              data-tabs-target="#contacts"
              type="button"
              role="tab"
              aria-controls="contacts"
              aria-selected="false"
            >
              Contacts
            </button>
          </li>

        </ul>
      </div>




      <div id="myTabContent">
        <div
          className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This is some placeholder content the{" "}
            <strong className="font-medium text-gray-800 dark:text-white">
              Profile tab's associated content
            </strong>
            . Clicking another tab will toggle the visibility of this one for
            the next. The tab JavaScript swaps classNamees to control the
            content visibility and styling.
          </p>
        </div>
        <div
          className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
          id="dashboard"
          role="tabpanel"
          aria-labelledby="dashboard-tab"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This is some placeholder content the{" "}
            <strong className="font-medium text-gray-800 dark:text-white">
              Dashboard tab's associated content
            </strong>
            . Clicking another tab will toggle the visibility of this one for
            the next. The tab JavaScript swaps classNamees to control the
            content visibility and styling.
          </p>
        </div>
        <div
          className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
          id="settings"
          role="tabpanel"
          aria-labelledby="settings-tab"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This is some placeholder content the{" "}
            <strong className="font-medium text-gray-800 dark:text-white">
              Settings tab's associated content
            </strong>
            . Clicking another tab will toggle the visibility of this one for
            the next. The tab JavaScript swaps classNamees to control the
            content visibility and styling.
          </p>
        </div>
        <div
          className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
          id="contacts"
          role="tabpanel"
          aria-labelledby="contacts-tab"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This is some placeholder content the{" "}
            <strong className="font-medium text-gray-800 dark:text-white">
              Contacts tab's associated content
            </strong>
            . Clicking another tab will toggle the visibility of this one for
            the next. The tab JavaScript swaps classNamees to control the
            content visibility and styling.
          </p>
        </div>
      </div> */}
    </>
  );
};

export default ExampleTabNavbar;
