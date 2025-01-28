import { useState, type FC, lazy, Suspense } from "react";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";

const DashboardPage = lazy(() => import("./pages"));
const SignInPage = lazy(() => import("./pages/authentication/sign-in"));
const EcommerceAddProductsPage = lazy(() => import("./pages/e-commerce/addproduct"));
const EcommerceProductsPage = lazy(() => import("./pages/e-commerce/products"));
const UserListPage = lazy(() => import("./pages/users/list"));
const RolesPage = lazy(() => import("./pages/roles/roles"));
const ModulesPage = lazy(() => import("./pages/module/modules"));
const ModulegroupPage = lazy(() => import("./pages/module/module-group"));
const RolesAccessPage = lazy(() => import("./pages/roles/roles-access"));
const PackinTypeListPage = lazy(() => import("./pages/packingType/packingType"));
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
            <Route path="/packing-type/list" element={<PackinTypeListPage />} />

            <Route path="/roles/list" element={<RolesPage />} />
            <Route path="/roles/access" element={<RolesAccessPage />} />

            <Route path="/module-manage" element={<ModulesPage />} />
            <Route path="/module_list" element={<ModulegroupPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
          <Route path="/login" element={<SignInPage />} index />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
