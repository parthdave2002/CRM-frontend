import {
  GET_CATEGORY_LIST,
  GET_CATEGORY_LIST_SUCCESS,
  GET_CATEGORY_LIST_ERROR,

  ADD_CATEGORY_LIST,
  ADD_CATEGORY_LIST_SUCCESS,
  ADD_CATEGORY_LIST_ERROR,
  
  DELETE_CATEGORY_LIST,
  DELETE_CATEGORY_LIST_SUCCESS,
  DELETE_CATEGORY_LIST_ERROR,
} from "./actionType";

export const getCategorylist = (requserdata) => ({
  type: GET_CATEGORY_LIST,
  payload: requserdata,
});

export const getCategorylistSuccess = (actionType, data) => ({
  type: GET_CATEGORY_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getCategorylistFail = (actionType, error) => ({
  type: GET_CATEGORY_LIST_ERROR,
  payload: { actionType, error },
});

export const AddCategorylist = (requserdata) => ({
  type: ADD_CATEGORY_LIST,
  payload: requserdata,
});

export const AddCategorylistSuccess = (actionType, data) => ({
  type: ADD_CATEGORY_LIST_SUCCESS,
  payload: { actionType, data },
});

export const AddCategorylistFail = (actionType, error) => ({
  type: ADD_CATEGORY_LIST_ERROR,
  payload: { actionType, error },
});

export const DeleteCategorylist = (requserdata) => ({
  type: DELETE_CATEGORY_LIST,
  payload: requserdata,
});

export const DeleteCategorylistSuccess = (actionType, data) => ({
  type: DELETE_CATEGORY_LIST_SUCCESS,
  payload: { actionType, data },
});

export const DeleteCategorylistFail = (actionType, error) => ({
  type: DELETE_CATEGORY_LIST_ERROR,
  payload: { actionType, error },
});
