import {
  GET_ROLES_LIST,
  GET_ROLES_LIST_SUCCESS,
  GET_ROLES_LIST_ERROR,

  GET_SINGLE_ROLES_LIST,
  GET_SINGLE_ROLES_LIST_ERROR,
  GET_SINGLE_ROLES_LIST_SUCCESS,

  ADD_ROLES_LIST,
  ADD_ROLES_LIST_SUCCESS,
  ADD_ROLES_LIST_ERROR,
  
  DELETE_ROLES_LIST,
  DELETE_ROLES_LIST_SUCCESS,
  DELETE_ROLES_LIST_ERROR,

  GET_SEARCH_ROLES_LIST,
  GET_SEARCH_ROLES_LIST_ERROR,
  GET_SEARCH_ROLES_LIST_SUCCESS
} from "./actionType";


// Get Role  
export const getRoleslist = (requserdata) => ({
  type: GET_ROLES_LIST,
  payload: requserdata,
});

export const getRoleslistSuccess = (actionType, data) => ({
  type: GET_ROLES_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getRoleslistFail = (actionType, error) => ({
  type: GET_ROLES_LIST_ERROR,
  payload: { actionType, error },
});


// Get Single Role  
export const getSingleRoleslist = (requserdata) => ({
  type: GET_SINGLE_ROLES_LIST,
  payload: requserdata,
});

export const getSingleRoleslistSuccess = (actionType, data) => ({
  type: GET_SINGLE_ROLES_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getSingleRoleslistFail = (actionType, error) => ({
  type: GET_SINGLE_ROLES_LIST_ERROR,
  payload: { actionType, error },
});


// Add Role
export const AddRoleslist = (requserdata) => ({
  type: ADD_ROLES_LIST,
  payload: requserdata,
});

export const AddRoleslistSuccess = (actionType, data) => ({
  type: ADD_ROLES_LIST_SUCCESS,
  payload: { actionType, data },
});

export const AddRoleslistFail = (actionType, error) => ({
  type: ADD_ROLES_LIST_ERROR,
  payload: { actionType, error },
});

// Delete Role
export const DeleteRoleslist = (requserdata) => ({
  type: DELETE_ROLES_LIST,
  payload: requserdata,
});

export const DeleteRoleslistSuccess = (actionType, data) => ({
  type: DELETE_ROLES_LIST_SUCCESS,
  payload: { actionType, data },
});

export const DeleteRoleslistFail = (actionType, error) => ({
  type: DELETE_ROLES_LIST_ERROR,
  payload: { actionType, error },
});

// Search Role
export const SearchRoleslist = (requserdata) => ({
  type: GET_SEARCH_ROLES_LIST,
  payload: requserdata,
});

export const SearchRoleslistSuccess = (actionType, data) => ({
  type: GET_SEARCH_ROLES_LIST_SUCCESS,
  payload: { actionType, data },
});

export const SearchRoleslistFail = (actionType, error) => ({
  type: GET_SEARCH_ROLES_LIST_ERROR,
  payload: { actionType, error },
});