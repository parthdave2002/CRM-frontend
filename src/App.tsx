import { useState, type FC, lazy, Suspense } from "react";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";


const DashboardPage = lazy(() => import("./pages"));
const SignInPage = lazy(() => import("./pages/authentication/sign-in"));

const UserListPage = lazy(() => import("./pages/users/list"));
const AddUserPage = lazy(() => import("./pages/users/useradd"));
const UserDetailsPage = lazy(() => import("./pages/users/userdetails"));

const RolesPage = lazy(() => import("./pages/roles/roles"));
const AddRolePage = lazy(() => import("./pages/roles/roleadd"));
const RoleDetailsPage = lazy(() => import("./pages/roles/roledeatails"));
const RolesAccessPage = lazy(() => import("./pages/roles/roles-access"));

const ModulesPage = lazy(() => import("./pages/module/modules"));
const ModulegroupPage = lazy(() => import("./pages/module/module-group"));

const PackingTypeListPage = lazy(() => import("./pages/packingType/packingType"));
const AddpackingTypePage = lazy(() => import("./pages/packingType/packingTypeAdd"));
const PackingTypeDetailsPage = lazy(() => import("./pages/packingType/packingTypeDetails"));

const PackingListPage = lazy(() => import("./pages/packing/packing"));
const AddpackingPage = lazy(() => import("./pages/packing/packingAdd"));
const PackingDetailsPage = lazy(() => import("./pages/packing/packingDetails"));


const CompanyListPage = lazy(() => import("./pages/company/companyList"));
const CompanyAddPage = lazy(() => import("./pages/company/companyAdd"));
const CompanyDetailsPage = lazy(() => import("./pages/company/companyDetails"));

const PageNotFound = lazy(() => import("./pages/pagenotfound/pagenotfound"));

const App: FC = function () {
  const [isAuthenticate, setisAuthenticate] = useState(true);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoute isAuthenticated={isAuthenticate} />}>
            <Route path="/dashboard" element={<DashboardPage />} />

            <Route path="/users/list" element={<UserListPage />} />
            <Route path="/users/add" element={<AddUserPage />} />
            <Route path="/users/:id" element={<AddUserPage />} />
            <Route path="/users/details" element={<UserDetailsPage />} />

            <Route path="/roles/list" element={<RolesPage />} />
            <Route path="/roles/add" element={<AddRolePage />} />
            <Route path="/roles/:id" element={<AddRolePage />} />
            <Route path="/roles/details" element={<RoleDetailsPage />} />

            <Route path="/roles/access" element={<RolesAccessPage />} />

            <Route path="/module-manage" element={<ModulesPage />} />
            <Route path="/module-group" element={<ModulegroupPage />} />

            <Route path="/packing-type/list" element={<PackingTypeListPage />} />
            <Route path="/packing-type/add" element={<AddpackingTypePage />} />
            <Route path="/packing-type/:id" element={<AddpackingTypePage />} />
            <Route path="/packing-type/details/:id" element={<PackingTypeDetailsPage />} />

            <Route path="/packing/list" element={<PackingListPage />} />
            <Route path="/packing/add" element={<AddpackingPage />} />
            <Route path="/packing/:id" element={<AddpackingPage />} />
            <Route path="/packing/details/:id" element={<PackingDetailsPage />} />

            <Route path="/company/list" element={<CompanyListPage />} />
            <Route path="/company/add" element={<CompanyAddPage />} />
            <Route path="/company/:id" element={<CompanyAddPage />} />
            <Route path="/company/details/:id" element={<CompanyDetailsPage />} />

            <Route path="/customer/list" element={<PackingTypeListPage />} />
          </Route>

          <Route path="/login" element={<SignInPage />} index />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
