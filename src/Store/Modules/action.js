import {
  GET_MODULE_LIST,
  GET_MODULE_LIST_SUCCESS,
  GET_MODULE_LIST_ERROR,
  UPDATE_MODULE_LIST,
  UPDATE_MODULE_LIST_ERROR,
  UPDATE_MODULE_LIST_SUCCESS,
  ADD_MODULE_LIST,
  ADD_MODULE_LIST_ERROR,
  ADD_MODULE_LIST_SUCCESS,
  DELETE_MODULE_LIST,
  DELETE_MODULE_LIST_ERROR,
  DELETE_MODULE_LIST_SUCCESS,
  GET_MODULE_GROUP_LIST,
  GET_MODULE_GROUP_LIST_ERROR,
  GET_MODULE_GROUP_LIST_SUCCESS,
  UPDATE_MODULE_GROUP_LIST,
  UPDATE_MODULE_GROUP_LIST_ERROR,
  UPDATE_MODULE_GROUP_LIST_SUCCESS,
  ADD_MODULE_GROUP_LIST,
  ADD_MODULE_GROUP_LIST_ERROR,
  ADD_MODULE_GROUP_LIST_SUCCESS,
  DELETE_MODULE_GROUP_LIST,
  DELETE_MODULE_GROUP_LIST_ERROR,
  DELETE_MODULE_GROUP_LIST_SUCCESS,

  GET_SEARCH_LIST,
  GET_SEARCH_LIST_ERROR,
  GET_SEARCH_LIST_SUCCESS,

  GET_SEARCH_GROUP_LIST,
  GET_SEARCH_GROUP_LIST_ERROR,
  GET_SEARCH_GROUP_LIST_SUCCESS
} from "./actionType";

export const getModulelist = (requserdata) => ({
  type: GET_MODULE_LIST,
  payload: requserdata,
});

export const getModulelistSuccess = (actionType, data) => ({
  type: GET_MODULE_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getModulelistFail = (actionType, error) => ({
  type: GET_MODULE_LIST_ERROR,
  payload: { actionType, error },
});

// Single Array
export const getSingleModulelist = (requserdata) => ({
  type: UPDATE_MODULE_LIST,
  payload: requserdata,
});

export const getSingleModulelistSuccess = (actionType, data) => ({
  type: UPDATE_MODULE_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getSingleModulelistFail = (actionType, error) => ({
  type: UPDATE_MODULE_LIST_ERROR,
  payload: { actionType, error },
});



export const AddModulelist = (requserdata) => ({
  type: ADD_MODULE_LIST,
  payload: requserdata,
});

export const AddModulelistSuccess = (actionType, data) => ({
  type: ADD_MODULE_LIST_SUCCESS,
  payload: { actionType, data },
});

export const AddModulelistFail = (actionType, error) => ({
  type: ADD_MODULE_LIST_ERROR,
  payload: { actionType, error },
});

export const DeleteModulelist = (requserdata) => ({
  type: DELETE_MODULE_LIST,
  payload: requserdata,
});

export const DeleteModulelistSuccess = (actionType, data) => ({
  type: DELETE_MODULE_LIST_SUCCESS,
  payload: { actionType, data },
});

export const DeleteModulelistFail = (actionType, error) => ({
  type: DELETE_MODULE_LIST_ERROR,
  payload: { actionType, error },
});

// Module Group
export const getModuleGrouplist = (requserdata) => ({
  type: GET_MODULE_GROUP_LIST,
  payload: requserdata,
});

export const getModuleGrouplistSuccess = (actionType, data) => ({
  type: GET_MODULE_GROUP_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getModuleGrouplistFail = (actionType, error) => ({
  type: GET_MODULE_GROUP_LIST_ERROR,
  payload: { actionType, error },
});

// Single Group
export const getSingleModuleGroup = (requserdata) => ({
  type: UPDATE_MODULE_GROUP_LIST,
  payload: requserdata,
});

export const getSingleModuleGroupSuccess = (actionType, data) => ({
  type: UPDATE_MODULE_GROUP_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getSingleModuleGroupFail = (actionType, error) => ({
  type: UPDATE_MODULE_GROUP_LIST_ERROR,
  payload: { actionType, error },
});


export const AddModuleGrouplist = (requserdata) => ({
  type: ADD_MODULE_GROUP_LIST,
  payload: requserdata,
});

export const AddModuleGrouplistSuccess = (actionType, data) => ({
  type: ADD_MODULE_GROUP_LIST_SUCCESS,
  payload: { actionType, data },
});

export const AddModuleGrouplistFail = (actionType, error) => ({
  type: ADD_MODULE_GROUP_LIST_ERROR,
  payload: { actionType, error },
});

// Delete Role
export const DeleteModuleGrouplist = (requserdata) => ({
  type: DELETE_MODULE_GROUP_LIST,
  payload: requserdata,
});

export const DeleteModuleGrouplistSuccess = (actionType, data) => ({
  type: DELETE_MODULE_GROUP_LIST_SUCCESS,
  payload: { actionType, data },
});

export const DeleteModuleGrouplistFail = (actionType, error) => ({
  type: DELETE_MODULE_GROUP_LIST_ERROR,
  payload: { actionType, error },
});


// Search API 

export const getSearchData = (requserdata) => ({
  type: GET_SEARCH_LIST,
  payload: requserdata,
});

export const getSearchDataSuccess = (actionType, data) => ({
  type: GET_SEARCH_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getSearchDataFail = (actionType, error) => ({
  type: GET_SEARCH_LIST_ERROR,
  payload: { actionType, error },
});


export const getSearchGroupData = (requserdata) => ({
  type: GET_SEARCH_GROUP_LIST,
  payload: requserdata,
});

export const getSearchGroupDataSuccess = (actionType, data) => ({
  type: GET_SEARCH_GROUP_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getSearchGroupDataFail = (actionType, error) => ({
  type: GET_SEARCH_GROUP_LIST_ERROR,
  payload: { actionType, error },
});
