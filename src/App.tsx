import { useState, type FC, lazy, Suspense } from "react";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import LoaderPage from "./components/loader";

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
const CategoryListPage = lazy(() => import("./pages/category/categoryList"));
const CategoryAddPage = lazy(() => import("./pages/category/categoryAdd"));
const CategoryDetailsPage = lazy(() => import("./pages/category/categoryDetails"));
const CustomerListPage = lazy(() => import("./pages/customer/customerlist"));
const ProfilePage = lazy(() => import("./pages/profile/profile"));
const PageNotFound = lazy(() => import("./pages/pagenotfound/pagenotfound"));
const BannerListPage = lazy(() => import("./pages/banner/bannerList"));
const BannerAddPage = lazy(() => import("./pages/banner/bannerAdd"));
const BannerDetailsPage = lazy(() => import("./pages/banner/bannerDetails"));
const ProductAddPage = lazy(() => import("./pages/product/productAdd"));
const ProductListPage = lazy(() => import("./pages/product/productList"));
const ProductDetailsPage = lazy(() => import("./pages/product/productDetails"));
const OrderListPage = lazy(() => import("./pages/order/order"));
const LeadListPage = lazy(() => import("./pages/lead/lead"));
const TaglogListPage = lazy(() => import("./pages/taglog/taglogList"));
const TaglogAddPage = lazy(() => import("./pages/taglog/taglogAdd"));
const TaglogDetailsPage = lazy(() => import("./pages/taglog/taglogDetails"));
const ReportPage = lazy(() => import("./pages/report/report"));

const SalesCRMPage = lazy(() => import("./pages/salesExecutive"));

const App: FC = function () {
  const [isAuthenticate, setisAuthenticate] = useState(true);

  return (
    <Suspense fallback={<div> <LoaderPage /> </div>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoute isAuthenticated={isAuthenticate} />}>

          {/* Admin Routes */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/users/list" element={<UserListPage />} />
            <Route path="/users/add" element={<AddUserPage />} />
            <Route path="/users/:id" element={<AddUserPage />} />
            <Route path="/users/details" element={<UserDetailsPage />} />
            <Route path="/roles/list" element={<RolesPage />} />
            <Route path="/roles/add" element={<AddRolePage />} />
            <Route path="/roles/:id" element={<AddRolePage />} />
            <Route path="/roles/details" element={<RoleDetailsPage />} />
            <Route path="/roles-access/:id" element={<RolesAccessPage />} />
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
            <Route path="/category/list" element={<CategoryListPage />} />
            <Route path="/category/add" element={<CategoryAddPage />} />
            <Route path="/category/:id" element={<CategoryAddPage />} />
            <Route path="/category/details/:id" element={<CategoryDetailsPage />} />
            <Route path="/customer/list" element={<CustomerListPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/banner/list" element={<BannerListPage />} />
            <Route path="/banner/add" element={<BannerAddPage />} />
            <Route path="/banner/:id" element={<BannerAddPage />} />
            <Route path="/banner/details/:id" element={<BannerDetailsPage />} />
            <Route path="/taglog/list" element={<TaglogListPage />} />
            <Route path="/taglog/add" element={<TaglogAddPage />} />
            <Route path="/taglog/:id" element={<TaglogAddPage />} />
            <Route path="/taglog/details/:id" element={<TaglogDetailsPage />} />
            <Route path="/product/list" element={<ProductListPage />} />
            <Route path="/product/add" element={<ProductAddPage />} />
            <Route path="/product/:id" element={<ProductAddPage />} />
            <Route path="/product/details/:id" element={<ProductDetailsPage />} />
            <Route path="/order/list" element={<OrderListPage />} />
            <Route path="/lead/list" element={<LeadListPage />} />

            <Route path="/report" element={<ReportPage />} />

            {/* Sales Routes */}
            <Route path="/sales-crm" element={<SalesCRMPage />} />
          </Route>

          <Route path="/login" element={<SignInPage />} index />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
