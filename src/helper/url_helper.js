// Login/Logout Api
export const INSERT_LOGIN = "/api/user/login";
export const LOGOUT ="/api/user/logout";

//   >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Dialer Apis <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// User Api
export const GET_USER_LIST = "/api/user";
export const GET_USER_VIEW = "/api/user/detailview";
export const ADD_USER_LIST = "/api/user/change";
export const DELETE_USER_LIST = "/api/user/deluser";
export const UPDATE_USER_DATA_LIST = "/api/user/update";

// Role Api
export const GET_ROLES_LIST = "/api/role/role";
export const UPDATE_ROLES_LIST = "/api/role/roleview";
export const ADD_ROLES_LIST = "/api/role/role";
export const DELETE_ROLES_LIST = "/api/role/delrole";
export const GET_SEARCH_ROLES_LIST = "/api/role/role-search";

// Module Api
export const GET_SEARCH_LIST = "/api/role/module-search";
export const GET_MODULE_LIST = "/api/role/module";
export const UPDATE_MODULE_LIST = "/api/role/module-view";
export const ADD_MODULE_LIST ="/api/role/module";
export const DELETE_MODULE_LIST ="/api/role/delmodule";

// Module Group  Api
export const GET_SEARCH_GROUP_LIST = "/api/role/module-group-search";
export const GET_MODULE_GROUP_LIST = "/api/role/module-group";
export const UPDATE_MODULE_GROUP_LIST = "/api/role/module-group-view";
export const ADD_MODULE_GROUP_LIST = "/api/role/module-group";
export const DELETE_MODULE_GROUP_LIST = "/api/role/delmodule-group";

// Role access Api
export const GET_ROLES_ACCESS_LIST = "/api/role/module-hierarchy";
export const SAVE_ROLES_ACCESS_LIST = "/api/role/access/role";


// Packingtype
export const GET_PACKING_TYPE_LIST = "/api/product/get-packing-type";
export const ADD_PACKING_TYPE_LIST = "/api/product/add-packing-type";
export const DELETE_PACKING_TYPE_LIST = "/api/product/remove-packing-type";
