import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  getComplainlistSuccess,
  getComplainlistFail,
  getComplainDetailslistSuccess,
  getComplainDetailslistFail,
  AddComplainlistSuccess,
  AddComplainlistFail,
  UpdateComplainlistSuccess,
  UpdateComplainlistFail,
  DeleteComplainlistSuccess,
  DeleteComplainlistFail,
  ResetComplainlist,
  ResetComplainlistSuccess,
  ResetComplainlistFail
} from "./action";
import {
  GET_COMPLAIN_LIST,
  GET_COMPLAIN_DETAILS_LIST,
  ADD_COMPLAIN_LIST,
  DELETE_COMPLAIN_LIST,
  REST_COMPLAIN_LIST,
  UPDATE_COMPLAIN_LIST
} from "./actionType";
import { ComplainlistApi, AddComplainlistApi, DelComplainlistApi, UpdateComplainlistApi, ComplainDetailslistApi } from "../../helper/Demo_helper";
import { toast } from "react-toastify";

function* onGetComplainList({ payload: requstuser }) {
  try {
    const response = yield call(ComplainlistApi, requstuser);
    yield put(getComplainlistSuccess(GET_COMPLAIN_LIST, response));
  } catch (error) {
    toast.error(error.msg);
    yield put(getComplainlistFail(error));
  }
}

function* onGetComplainDetailsList({ payload: requstuser }) {
  try {
    const response = yield call(ComplainDetailslistApi, requstuser);
    yield put(getComplainDetailslistSuccess(GET_COMPLAIN_DETAILS_LIST, response));
  } catch (error) {
    toast.error(error.msg);
    yield put(getComplainDetailslistFail(error));
  }
}

function* onAddComplainList({ payload: requstuser }) {
  try {
    const response = yield call(AddComplainlistApi, requstuser);
    yield put(AddComplainlistSuccess(ADD_COMPLAIN_LIST, response));
  } catch (error) {
    toast.error(error?.msg);
    yield put(AddComplainlistFail(error));
  }
}

function* onDelComplainList({ payload: requstuser }) {
  try {
    const response = yield call(DelComplainlistApi, requstuser);
    yield put(DeleteComplainlistSuccess(DELETE_COMPLAIN_LIST, response));

    if(response.success === true || response.success === "true"){
      toast.success(response?.msg)
      const newresponse = yield call(ComplainlistApi);
      yield put(getComplainlistSuccess(GET_COMPLAIN_LIST, newresponse));
    }
  } catch (error) {
    toast.error(error.msg);
    yield put(DeleteComplainlistFail(error));
  }
}

function* onUpdateComplainList({ payload: requstuser }) {
  try {
    const response = yield call(UpdateComplainlistApi, requstuser);
    yield put(UpdateComplainlistSuccess(UPDATE_COMPLAIN_LIST, response));
    if(response.success === true || response.success === "true"){
      toast.success(response?.msg)
      const newresponse = yield call(ComplainlistApi);
      yield put(getComplainlistSuccess(GET_COMPLAIN_LIST, newresponse));
    }
  } catch (error) {
    toast.error(error.msg);
    yield put(UpdateComplainlistFail(error));
  }
}

function* onResetComplainList() {
    const response = yield call(ResetComplainlist);
    yield put(ResetComplainlistSuccess(REST_COMPLAIN_LIST, response)); 
}

function* ComplainSaga() {
  yield takeEvery(GET_COMPLAIN_LIST, onGetComplainList);
  yield takeEvery(GET_COMPLAIN_DETAILS_LIST, onGetComplainDetailsList);
  yield takeEvery(ADD_COMPLAIN_LIST, onAddComplainList);
  yield takeEvery(UPDATE_COMPLAIN_LIST, onUpdateComplainList);
  yield takeEvery(DELETE_COMPLAIN_LIST, onDelComplainList);
  yield takeEvery(REST_COMPLAIN_LIST, onResetComplainList);
}
export default ComplainSaga;
