import {
  GET_PACKING_TYPE_LIST,
  GET_PACKING_TYPE_LIST_SUCCESS,
  GET_PACKING_TYPE_LIST_ERROR,

  ADD_PACKING_TYPE_LIST,
  ADD_PACKING_TYPE_LIST_SUCCESS,
  ADD_PACKING_TYPE_LIST_ERROR,
  
  DELETE_PACKING_TYPE_LIST,
  DELETE_PACKING_TYPE_LIST_SUCCESS,
  DELETE_PACKING_TYPE_LIST_ERROR,
} from "./actionType";

export const getPackingTypelist = (requserdata) => ({
  type: GET_PACKING_TYPE_LIST,
  payload: requserdata,
});

export const getPackingTypelistSuccess = (actionType, data) => ({
  type: GET_PACKING_TYPE_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getPackingTypelistFail = (actionType, error) => ({
  type: GET_PACKING_TYPE_LIST_ERROR,
  payload: { actionType, error },
});

export const AddPackingTypelist = (requserdata) => ({
  type: ADD_PACKING_TYPE_LIST,
  payload: requserdata,
});

export const AddPackingTypelistSuccess = (actionType, data) => ({
  type: ADD_PACKING_TYPE_LIST_SUCCESS,
  payload: { actionType, data },
});

export const AddPackingTypelistFail = (actionType, error) => ({
  type: ADD_PACKING_TYPE_LIST_ERROR,
  payload: { actionType, error },
});

export const DeletePackingTypelist = (requserdata) => ({
  type: DELETE_PACKING_TYPE_LIST,
  payload: requserdata,
});

export const DeletePackingTypelistSuccess = (actionType, data) => ({
  type: DELETE_PACKING_TYPE_LIST_SUCCESS,
  payload: { actionType, data },
});

export const DeletePackingTypelistFail = (actionType, error) => ({
  type: DELETE_PACKING_TYPE_LIST_ERROR,
  payload: { actionType, error },
});
