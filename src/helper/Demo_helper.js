import { useEffect } from "react";
import { APIClient, setAuthorization } from "./api_helper";
import * as url from "./url_helper";
import axios from "axios";

const api = new APIClient();

// Gets the logged in user data from local session
export const getLoggedInUser = () => {
  const user = localStorage.getItem("authUser");
  if (user) {
    return JSON.parse(user);
  }
  return null;
};

if (localStorage.getItem("token")) {
  const users = localStorage.getItem("token");
  setAuthorization(users);
}

// //is user is logged in
export const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

// ----- Login page redirect-----
const token = localStorage.getItem("token");
  if (token == "null") {
    localStorage.clear();
    window.location.pathname = "/login";
  }
// ----- Login page redirect-----

// Register Method
export const postJwtRegister = (url, data) => {
  return api.create(url, data).catch((err) => {
    var message;
    if (err.response && err.response.status) {
      switch (err.response.status) {
        case 404:
          message = "Sorry! the page you are looking for could not be found";
          break;
        case 500:
          message =
            "Sorry! something went wrong, please contact our support team";
          break;
        case 401:
          window.location.pathname = "/login";
          message = "Invalid credentials";
          break;
        default:
          message = err[1];
          break;
      }
    }
    throw message;
  });
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Node Apis <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//Login
export const LoginApi = (requserdata) => api.create(url.INSERT_LOGIN, requserdata);
export const LogoutApi = (requserdata) => api.get(url.LOGOUT, requserdata);

// User Api
export const UserlistApi = (requserdata) => api.get(url.GET_USER_LIST, requserdata);
export const UserlistViewApi = (requserdata) => api.get(url.GET_USER_VIEW, requserdata);
export const AddUserlistApi = async (requserdata) => await api.create(url.ADD_USER_LIST, requserdata);
export const DelUserlistApi = async (requserdata) => await api.get(url.DELETE_USER_LIST, requserdata);
export const UpdateUserdatalistApi = async (requserdata) => await api.create(url.UPDATE_USER_DATA_LIST, requserdata);

// Roles Api
export const RolelistApi = async (requserdata) => await api.get(url.GET_ROLES_LIST, requserdata);
export const UpdatelistApi = async (requserdata) => await api.get(url.UPDATE_ROLES_LIST,requserdata);
export const AddRolelistApi = async (requserdata) => await api.create(url.ADD_ROLES_LIST,requserdata);
export const DelRolelistApi =  async (requserdata) => await  api.delete(url.DELETE_ROLES_LIST,requserdata);
export const SearchRolelistApi = async (requserdata) => await api.get(url.GET_SEARCH_ROLES_LIST, requserdata);

// Module Api
export const SearchModulelistApi = async (requserdata) => await api.get(url.GET_SEARCH_LIST, requserdata);
export const ModulelistApi = async (requserdata) => await api.get(url.GET_MODULE_LIST, requserdata);
export const UpdateModulelistApi = async (requserdata) => await api.get(url.UPDATE_MODULE_LIST,requserdata);
export const AddModulelistApi = async (requserdata) => await api.create(url.ADD_MODULE_LIST, requserdata);
export const DelModulelistApi = async (requserdata) => await api.get(url.DELETE_MODULE_LIST, requserdata);

// Module Group  Api
export const SearchModuleGrouplistApi = async (requserdata) => await api.get(url.GET_SEARCH_GROUP_LIST, requserdata);
export const ModuleGrouplistApi = (requserdata) => api.get(url.GET_MODULE_GROUP_LIST, requserdata);
export const UpdateModuleGrouplistApi = async (requserdata) => await api.get(url.UPDATE_MODULE_GROUP_LIST,requserdata);
export const AddModuleGrouplistApi = async (requserdata) => await api.create(url.ADD_MODULE_GROUP_LIST, requserdata);
export const DelModuleGrouplistApi = async (requserdata) => await api.get(url.DELETE_MODULE_GROUP_LIST, requserdata);

// Module Acess List api
export const ModuleAcesslistApi = async (requserdata) => await api.get(url.GET_MODULE_ACCESS_LIST, requserdata);
export const SearchModuleAccesslistApi = async (requserdata) => await api.get(url.GET_SEARCH_MODULE_ACCESS_LIST, requserdata);
export const AddModuleAcesslistApi = async (requserdata) => await api.create(url.ADD_MODULE_ACCESS_LIST, requserdata);


// Role Access Api
export const RoleAccesslistApi = async (requserdata) => await api.get(url.GET_ROLES_ACCESS_LIST, requserdata);
export const PostRoleAccesslistApi = async (requserdata) => await api.create(url.SAVE_ROLES_ACCESS_LIST, requserdata);

// Packing Type API
export const PackingTypelistApi = (requserdata) => api.get(url.GET_PACKING_TYPE_LIST, requserdata);
export const AddPackingTypelistApi = async (requserdata) => await api.create(url.ADD_PACKING_TYPE_LIST, requserdata);
export const DelPackingTypelistApi = async (requserdata) => await api.delete(url.DELETE_PACKING_TYPE_LIST, requserdata);

// Packing API
export const PackinglistApi = (requserdata) => api.get(url.GET_PACKING_LIST, requserdata);
export const AddPackinglistApi = async (requserdata) => await api.create(url.ADD_PACKING_LIST, requserdata);
export const DelPackinglistApi = async (requserdata) => await api.delete(url.DELETE_PACKING_LIST, requserdata);

// Category API
export const CategorylistApi = (requserdata) => api.get(url.GET_CATEGORY_LIST, requserdata);
export const AddCategorylistApi = async (requserdata) => await api.create(url.ADD_CATEGORY_LIST, requserdata);
export const DelCategorylistApi = async (requserdata) => await api.delete(url.DELETE_CATEGORY_LIST, requserdata);

// Company API
export const CompanylistApi = (requserdata) => api.get(url.GET_COMPANY_LIST, requserdata);
export const AddCompanylistApi = async (requserdata) => await api.create(url.ADD_COMPANY_LIST, requserdata);
export const DelCompanylistApi = async (requserdata) => await api.delete(url.DELETE_COMPANY_LIST, requserdata);

// Product API
export const RelatedProductlistApi = (requserdata) => api.get(url.GET_RELATED_PRODUCT_LIST, requserdata);
export const ProductlistApi = (requserdata) => api.get(url.GET_PRODUCT_LIST, requserdata);
export const AddProductlistApi = async (requserdata) => await api.create(url.ADD_PRODUCT_LIST, requserdata);
export const DelProductlistApi = async (requserdata) => await api.delete(url.DELETE_PRODUCT_LIST, requserdata);

// Banner API
export const BannerlistApi = (requserdata) => api.get(url.GET_BANNER_LIST, requserdata);
export const AddBannerlistApi = async (requserdata) => await api.create(url.ADD_BANNER_LIST, requserdata);
export const DelBannerlistApi = async (requserdata) => await api.delete(url.DELETE_BANNER_LIST, requserdata);

// Taglog API
export const TagloglistApi = (requserdata) => api.get(url.GET_TAGLOG_LIST, requserdata);
export const AddTagloglistApi = async (requserdata) => await api.create(url.ADD_TAGLOG_LIST, requserdata);
export const DelTagloglistApi = async (requserdata) => await api.delete(url.DELETE_TAGLOG_LIST, requserdata);