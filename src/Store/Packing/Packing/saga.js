import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  getPackinglistSuccess,
  getPackinglistFail,
  AddPackinglistSuccess,
  AddPackinglistFail,
  DeletePackinglistSuccess,
  DeletePackinglistFail,

} from "./action";
import {
  GET_PACKING_LIST,
  ADD_PACKING_LIST,
  DELETE_PACKING_LIST,
} from "./actionType";
import { PackinglistApi, AddPackinglistApi, DelPackinglistApi,} from "../../../helper/Demo_helper";

function* onGetPackingList({ payload: requstuser }) {
  try {
    const response = yield call(PackinglistApi, requstuser);
    yield put(getPackinglistSuccess(GET_PACKING_LIST, response));
   
  } catch (error) {
    yield put(getPackinglistFail(error));
  }
}

function* onAddPackingList({ payload: requstuser }) {
  try {
    const response = yield call(AddPackinglistApi, requstuser);
    yield put(AddPackinglistSuccess(ADD_PACKING_LIST, response));
  } catch (error) {
    yield put(AddPackinglistFail(error));
  }
}

function* onDelPackingList({ payload: requstuser }) {
  try {
    const response = yield call(DelPackinglistApi, requstuser);
    yield put(DeletePackinglistSuccess(DELETE_PACKING_LIST, response));
  } catch (error) {
    yield put(DeletePackinglistFail(error));
  }
}

function* PackingSaga() {
  yield takeEvery(GET_PACKING_LIST, onGetPackingList);
  yield takeEvery(ADD_PACKING_LIST, onAddPackingList);
  yield takeEvery(DELETE_PACKING_LIST, onDelPackingList);
}
export default PackingSaga;
