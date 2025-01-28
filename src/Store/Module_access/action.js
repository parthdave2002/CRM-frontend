import {
  GET_MODULE_ACCESS_LIST,
  GET_MODULE_ACCESS_LIST_SUCCESS,
  GET_MODULE_ACCESS_LIST_ERROR,

  ADD_MODULE_ACCESS_LIST,
  ADD_MODULE_ACCESS_LIST_ERROR,
  ADD_MODULE_ACCESS_LIST_SUCCESS,

  GET_SEARCH_MODULE_ACCESS_LIST,
  GET_SEARCH_MODULE_ACCESS_LIST_ERROR,
  GET_SEARCH_MODULE_ACCESS_LIST_SUCCESS

} from "./actionType";


// Get CDR  
export const getModuleAcesslist = (requserdata) => ({
  type: GET_MODULE_ACCESS_LIST,
  payload: requserdata,
});

export const getModuleAcesslistSuccess = (actionType, data) => ({
  type: GET_MODULE_ACCESS_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getModuleAcesslistFail = (actionType, error) => ({
  type: GET_MODULE_ACCESS_LIST_ERROR,
  payload: { actionType, error },
});

// Add Module List
export const AddModuleAcesslist = (requserdata) => ({
  type: ADD_MODULE_ACCESS_LIST,
  payload: requserdata,
});

export const AddModuleAcesslistSuccess = (actionType, data) => ({
  type: ADD_MODULE_ACCESS_LIST_SUCCESS,
  payload: { actionType, data },
});

export const AddModuleAcesslistFail = (actionType, error) => ({
  type: ADD_MODULE_ACCESS_LIST_ERROR,
  payload: { actionType, error },
});

// Search Module List 
export const SearchModuleAccesslist = (requserdata) => ({
  type: GET_SEARCH_MODULE_ACCESS_LIST,
  payload: requserdata,
});

export const SearchModuleAccesslistSuccess = (actionType, data) => ({
  type: GET_SEARCH_MODULE_ACCESS_LIST_SUCCESS,
  payload: { actionType, data },
});

export const SearchModuleAccesslistFail = (actionType, error) => ({
  type: GET_SEARCH_MODULE_ACCESS_LIST_ERROR,
  payload: { actionType, error },
});