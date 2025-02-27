import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  getCroplistSuccess,
  getCroplistFail,
  AddCroplistSuccess,
  AddCroplistFail,
  DeleteCroplistSuccess,
  DeleteCroplistFail,
  ResetCroplist,
  ResetCroplistSuccess,
} from "./action";
import {
  GET_CROP_LIST,
  ADD_CROP_LIST,
  DELETE_CROP_LIST,
  RESET_CROP_LIST
} from "./actionType";
import { CroplistApi, AddCroplistApi, DelCroplistApi,} from "../../helper/Demo_helper";
import { toast } from "react-toastify";

function* onGetCropList({ payload: requstuser }) {
  try {
    const response = yield call(CroplistApi, requstuser);
    yield put(getCroplistSuccess(GET_CROP_LIST, response));
  } catch (error) {
    yield put(getCroplistFail(error));
  }
}

function* onAddCropList({ payload: requstuser }) {
  try {
    const response = yield call(AddCroplistApi, requstuser);
    yield put(AddCroplistSuccess(ADD_CROP_LIST, response));
  } catch (error) {
    yield put(AddCroplistFail(error));
  }
}

function* onDelCropList({ payload: requstuser }) {
  try {
    const response = yield call(DelCroplistApi, requstuser);
    yield put(DeleteCroplistSuccess(DELETE_CROP_LIST, response));
     
    if(response.success === true || response.success === "true"){
      toast.success(response?.msg);
      const newresponse = yield call(CroplistApi);
      yield put(getCroplistSuccess(GET_CROP_LIST, newresponse));
    }
  } catch (error) {
    yield put(DeleteCroplistFail(error));
  }
}

function* onResetCropList({ payload: requstuser }) {
    const response = yield call(ResetCroplist);
    yield put(ResetCroplistSuccess(RESET_CROP_LIST, response));
}

function* CropSaga() {
  yield takeEvery(GET_CROP_LIST, onGetCropList);
  yield takeEvery(ADD_CROP_LIST, onAddCropList);
  yield takeEvery(DELETE_CROP_LIST, onDelCropList);
  yield takeEvery(RESET_CROP_LIST, onResetCropList);
}
export default CropSaga;
