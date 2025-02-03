import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  getCategorylistSuccess,
  getCategorylistFail,
  AddCategorylistSuccess,
  AddCategorylistFail,
  DeleteCategorylistSuccess,
  DeleteCategorylistFail,
} from "./action";
import {
  GET_CATEGORY_LIST,
  ADD_CATEGORY_LIST,
  DELETE_CATEGORY_LIST,
} from "./actionType";
import { CategorylistApi, AddCategorylistApi, DelCategorylistApi,} from "../../helper/Demo_helper";

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
  } catch (error) {
    yield put(DeleteCategorylistFail(error));
  }
}

function* CategorySaga() {
  yield takeEvery(GET_CATEGORY_LIST, onGetCategoryList);
  yield takeEvery(ADD_CATEGORY_LIST, onAddCategoryList);
  yield takeEvery(DELETE_CATEGORY_LIST, onDelCategoryList);
}
export default CategorySaga;
