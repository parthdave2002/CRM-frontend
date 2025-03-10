import {
  GET_TAGLOG_LIST,
  GET_TAGLOG_LIST_SUCCESS,
  GET_TAGLOG_LIST_ERROR,

  ADD_TAGLOG_LIST,
  ADD_TAGLOG_LIST_SUCCESS,
  ADD_TAGLOG_LIST_ERROR,

  CHANGE_STATUS_TAGLOG_LIST,
  CHANGE_STATUS_TAGLOG_LIST_SUCCESS,
  CHANGE_STATUS_TAGLOG_LIST_ERROR,
  
  DELETE_TAGLOG_LIST,
  DELETE_TAGLOG_LIST_SUCCESS,
  DELETE_TAGLOG_LIST_ERROR,

  REST_TAGLOG_LIST,
  REST_TAGLOG_LIST_SUCCESS,
  REST_TAGLOG_LIST_ERROR
} from "./actionType";

export const getTagloglist = (requserdata) => ({
  type: GET_TAGLOG_LIST,
  payload: requserdata,
});

export const getTagloglistSuccess = (actionType, data) => ({
  type: GET_TAGLOG_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getTagloglistFail = (actionType, error) => ({
  type: GET_TAGLOG_LIST_ERROR,
  payload: { actionType, error },
});

export const AddTagloglist = (requserdata) => ({
  type: ADD_TAGLOG_LIST,
  payload: requserdata,
});

export const AddTagloglistSuccess = (actionType, data) => ({
  type: ADD_TAGLOG_LIST_SUCCESS,
  payload: { actionType, data },
});

export const AddTagloglistFail = (actionType, error) => ({
  type: ADD_TAGLOG_LIST_ERROR,
  payload: { actionType, error },
});

export const DeleteTagloglist = (requserdata) => ({
  type: DELETE_TAGLOG_LIST,
  payload: requserdata,
});

export const DeleteTagloglistSuccess = (actionType, data) => ({
  type: DELETE_TAGLOG_LIST_SUCCESS,
  payload: { actionType, data },
});

export const DeleteTagloglistFail = (actionType, error) => ({
  type: DELETE_TAGLOG_LIST_ERROR,
  payload: { actionType, error },
});

export const ChangeStatusTagloglist = (requserdata) => ({
  type: CHANGE_STATUS_TAGLOG_LIST,
  payload: requserdata,
});

export const ChangeStatusTagloglistSuccess = (actionType, data) => ({
  type: CHANGE_STATUS_TAGLOG_LIST_SUCCESS,
  payload: { actionType, data },
});

export const ChangeStatusTagloglistFail = (actionType, error) => ({
  type: CHANGE_STATUS_TAGLOG_LIST_ERROR,
  payload: { actionType, error },
});

export const ResetTagloglist = (requserdata) => ({
  type: REST_TAGLOG_LIST,
  payload: requserdata,
});

export const ResetTagloglistSuccess = (actionType, data) => ({
  type: REST_TAGLOG_LIST_SUCCESS,
  payload: { actionType, data },
});

export const ResetTagloglistFail = (actionType, error) => ({
  type: REST_TAGLOG_LIST_ERROR,
  payload: { actionType, error },
});
