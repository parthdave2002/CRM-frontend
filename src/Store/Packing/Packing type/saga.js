import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  getPackingTypelistSuccess,
  getPackingTypelistFail,

  AddPackingTypelistSuccess,
  AddPackingTypelistFail,

  DeletePackingTypelistSuccess,
  DeletePackingTypelistFail,

} from "./action";
import {
  GET_PACKING_TYPE_LIST,
  ADD_PACKING_TYPE_LIST,
  DELETE_PACKING_TYPE_LIST,
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
  } catch (error) {
    yield put(DeletePackingTypelistFail(error));
  }
}

function* PackingTypeSaga() {
  yield takeEvery(GET_PACKING_TYPE_LIST, onGetPackingTypeList);
  yield takeEvery(ADD_PACKING_TYPE_LIST, onAddPackingTypeList);
  yield takeEvery(DELETE_PACKING_TYPE_LIST, onDelPackingTypeList);
}
export default PackingTypeSaga;
