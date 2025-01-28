import {
  GET_USER_LIST,
  GET_USER_LIST_SUCCESS,
  GET_USER_LIST_ERROR,

  GET_USER_VIEW,
  GET_USER_VIEW_ERROR,
  GET_USER_VIEW_SUCCESS,

  ADD_USER_LIST,
  ADD_USER_LIST_ERROR,
  ADD_USER_LIST_SUCCESS,

  DELETE_USER_LIST,
  DELETE_USER_LIST_ERROR,
  DELETE_USER_LIST_SUCCESS,

  UPDATE_USER_DATA_LIST,
  UPDATE_USER_DATA_LIST_ERROR,
  UPDATE_USER_DATA_LIST_SUCCESS
} from "./actionType";

export const getUserlist = (requserdata) => ({
  type: GET_USER_LIST,
  payload: requserdata,
});

export const getUserlistSuccess = (actionType, data) => ({
  type: GET_USER_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getUserlistFail = (actionType, error) => ({
  type: GET_USER_LIST_ERROR,
  payload: { actionType, error },
});

//  get Single Array
export const getUserView = (requserdata) => ({
  type: GET_USER_VIEW,
  payload: requserdata,
});

export const getUserViewSuccess = (actionType, data) => ({
  type: GET_USER_VIEW_SUCCESS,
  payload: { actionType, data },
});

export const getUserViewFail = (actionType, error) => ({
  type: GET_USER_VIEW_ERROR,
  payload: { actionType, error },
});

// Adad User 
export const AddUserlist = (requserdata) => ({
  type: ADD_USER_LIST,
  payload: requserdata,
});

export const AddUserlistSuccess = (actionType, data) => ({
  type: ADD_USER_LIST_SUCCESS,
  payload: { actionType, data },
});

export const AddUserlistFail = (actionType, error) => ({
  type: ADD_USER_LIST_ERROR,
  payload: { actionType, error },
});

// Delete user
export const DeleteUserlist = (requserdata) => ({
  type: DELETE_USER_LIST,
  payload: requserdata,
});

export const DeleteUserlistSuccess = (actionType, data) => ({
  type: DELETE_USER_LIST_SUCCESS,
  payload: { actionType, data },
});

export const DeleteUserlistFail = (actionType, error) => ({
  type: DELETE_USER_LIST_ERROR,
  payload: { actionType, error },
});

// Update user
export const UpdateUserdatalist = (requserdata) => ({
  type: UPDATE_USER_DATA_LIST,
  payload: requserdata,
});

export const UpdateUserdatalistSuccess = (actionType, data) => ({
  type: UPDATE_USER_DATA_LIST_SUCCESS,
  payload: { actionType, data },
});

export const UpdateUserdatalistFail = (actionType, error) => ({
  type: UPDATE_USER_DATA_LIST_ERROR,
  payload: { actionType, error },
});