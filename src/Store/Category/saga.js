import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  getCategorylistSuccess,
  getCategorylistFail,
  AddCategorylistSuccess,
  AddCategorylistFail,
  DeleteCategorylistSuccess,
  DeleteCategorylistFail,
  ResetCategorylist,
  ResetCategorylistSuccess,
  ResetCategorylistFail
} from "./action";
import {
  GET_CATEGORY_LIST,
  ADD_CATEGORY_LIST,
  DELETE_CATEGORY_LIST,
  RESET_CATEGORY_LIST
} from "./actionType";
import { CategorylistApi, AddCategorylistApi, DelCategorylistApi,} from "../../helper/Demo_helper";
import { toast } from "react-toastify";

function* onGetCategoryList({ payload: requstuser }) {
  try {
    const response = yield call(CategorylistApi, requstuser);
    yield put(getCategorylistSuccess(GET_CATEGORY_LIST, response));
  } catch (error) {
    yield put(getCategorylistFail(error));
  }
}

function* onAddCategoryList({ payload: requstuser }) {
  try {
    const response = yield call(AddCategorylistApi, requstuser);
    yield put(AddCategorylistSuccess(ADD_CATEGORY_LIST, response));
  } catch (error) {
    yield put(AddCategorylistFail(error));
  }
}

function* onDelCategoryList({ payload: requstuser }) {
  try {
    const response = yield call(DelCategorylistApi, requstuser);
    yield put(DeleteCategorylistSuccess(DELETE_CATEGORY_LIST, response));
     
    if(response.success === true || response.success === "true"){
      toast.success(response?.msg)
      const newresponse = yield call(CategorylistApi);
      yield put(getCategorylistSuccess(GET_CATEGORY_LIST, newresponse));
    }
  } catch (error) {
    yield put(DeleteCategorylistFail(error));
  }
}

function* onResetCategoryList({ payload: requstuser }) {
    const response = yield call(ResetCategorylist);
    yield put(ResetCategorylistSuccess(RESET_CATEGORY_LIST, response));
}

function* CategorySaga() {
  yield takeEvery(GET_CATEGORY_LIST, onGetCategoryList);
  yield takeEvery(ADD_CATEGORY_LIST, onAddCategoryList);
  yield takeEvery(DELETE_CATEGORY_LIST, onDelCategoryList);
  yield takeEvery(RESET_CATEGORY_LIST, onResetCategoryList);
}
export default CategorySaga;
