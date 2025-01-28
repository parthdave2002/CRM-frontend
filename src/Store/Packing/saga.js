import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  getPackingTypelist,
  getPackingTypelistSuccess,
  getPackingTypelistFail,
  AddPackingTypelist,
  AddPackingTypelistSuccess,
  AddPackingTypelistFail,
  DeletePackingTypelist,
  DeletePackingTypelistSuccess,
  DeletePackingTypelistFail,

} from "./action";
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
import { PackingTypelistApi, AddPackingTypelistApi, DelPackingTypelistApi,} from "../../helper/Demo_helper";

function* onGetRolesList({ payload: requstuser }) {
  try {
    const reponse = yield call(PackingTypelistApi, requstuser);
    yield put(getPackingTypelistSuccess(GET_PACKING_TYPE_LIST, reponse));
   
  } catch (error) {
    yield put(getPackingTypelistFail(error));
  }
}

function* onAddRolesList({ payload: requstuser }) {
  try {
    const reponse = yield call(AddPackingTypelistApi, requstuser);
    yield put(AddPackingTypelistSuccess(ADD_PACKING_TYPE_LIST, reponse));
  } catch (error) {
    yield put(AddPackingTypelistFail(error));
  }
}

function* onDelRolesList({ payload: requstuser }) {
  try {
    const reponse = yield call(DelPackingTypelistApi, requstuser);
    yield put(DeletePackingTypelistSuccess(DELETE_PACKING_TYPE_LIST, reponse));
  } catch (error) {
    yield put(DeletePackingTypelistFail(error));
  }
}

function* PackingSaga() {
  yield takeEvery(GET_PACKING_TYPE_LIST, onGetRolesList);
  yield takeEvery(ADD_PACKING_TYPE_LIST, onAddRolesList);
  yield takeEvery(DELETE_PACKING_TYPE_LIST, onDelRolesList);
}
export default PackingSaga;
