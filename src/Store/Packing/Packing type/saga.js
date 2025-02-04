import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  getPackingTypelistSuccess,
  getPackingTypelistFail,

  AddPackingTypelistSuccess,
  AddPackingTypelistFail,

  DeletePackingTypelistSuccess,
  DeletePackingTypelistFail,

  ResetPackingTypelist,
  ResetPackingTypelistSuccess,
  ResetPackingTypelistFail
} from "./action";
import {
  GET_PACKING_TYPE_LIST,
  ADD_PACKING_TYPE_LIST,
  DELETE_PACKING_TYPE_LIST,
  RESET_PACKING_TYPE_LIST
} from "./actionType";
import { PackingTypelistApi, AddPackingTypelistApi, DelPackingTypelistApi,} from "../../../helper/Demo_helper";

function* onGetPackingTypeList({ payload: requstuser }) {
  try {
    const response = yield call(PackingTypelistApi, requstuser);
    yield put(getPackingTypelistSuccess(GET_PACKING_TYPE_LIST, response));
  } catch (error) {
    yield put(getPackingTypelistFail(error));
  }
}

function* onAddPackingTypeList({ payload: requstuser }) {
  try {
    const response = yield call(AddPackingTypelistApi, requstuser);
    yield put(AddPackingTypelistSuccess(ADD_PACKING_TYPE_LIST, response));
    
  } catch (error) {
    yield put(AddPackingTypelistFail(error));
  }
}

function* onDelPackingTypeList({ payload: requstuser }) {
  try {
    const response = yield call(DelPackingTypelistApi, requstuser);
    yield put(DeletePackingTypelistSuccess(DELETE_PACKING_TYPE_LIST, response));

    if(response.success === true || response.success === "true"){
      const newresponse = yield call(PackingTypelistApi, requstuser);
      yield put(getPackingTypelistSuccess(GET_PACKING_TYPE_LIST, newresponse));
    }
  } catch (error) {
    yield put(DeletePackingTypelistFail(error));
  }
}

function* onResetPackingTypeList() {
  const reponse = yield call(ResetPackingTypelist);
  yield put(ResetPackingTypelistSuccess(RESET_PACKING_TYPE_LIST, reponse));
}

function* PackingTypeSaga() {
  yield takeEvery(GET_PACKING_TYPE_LIST, onGetPackingTypeList);
  yield takeEvery(ADD_PACKING_TYPE_LIST, onAddPackingTypeList);
  yield takeEvery(DELETE_PACKING_TYPE_LIST, onDelPackingTypeList);
  yield takeEvery(RESET_PACKING_TYPE_LIST, onResetPackingTypeList);
}
export default PackingTypeSaga;
