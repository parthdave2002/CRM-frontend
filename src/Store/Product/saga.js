import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  getRelatedProductlistSuccess,
  getRelatedProductlistFail,
  getProductlistSuccess,
  getProductlistFail,
  AddProductlistSuccess,
  AddProductlistFail,
  DeleteProductlistSuccess,
  DeleteProductlistFail,
} from "./action";
import {
  GET_RELATED_PRODUCT_LIST,
  GET_PRODUCT_LIST,
  ADD_PRODUCT_LIST,
  DELETE_PRODUCT_LIST,
} from "./actionType";
import { RelatedProductlistApi,ProductlistApi,  AddProductlistApi, DelProductlistApi,} from "../../helper/Demo_helper";


function* onGetRelatedProductList({ payload: requstuser }) {
  try {
    const response = yield call(RelatedProductlistApi, requstuser);
    yield put(getRelatedProductlistSuccess(GET_RELATED_PRODUCT_LIST, response));
  } catch (error) {
    yield put(getRelatedProductlistFail(error));
  }
}

function* onGetProductList({ payload: requstuser }) {
  try {
    const response = yield call(ProductlistApi, requstuser);
    yield put(getProductlistSuccess(GET_PRODUCT_LIST, response));
  } catch (error) {
    yield put(getProductlistFail(error));
  }
}

function* onAddProductlist({ payload: requstuser }) {
  try {
    const response = yield call(AddProductlistApi, requstuser);
    yield put(AddProductlistSuccess(ADD_PRODUCT_LIST, response));
  } catch (error) {
    yield put(AddProductlistFail(error));
  }
}

function* onDelProductList({ payload: requstuser }) {
  try {
    const response = yield call(DelProductlistApi, requstuser);
    yield put(DeleteProductlistSuccess(DELETE_PRODUCT_LIST, response));
  } catch (error) {
    yield put(DeleteProductlistFail(error));
  }
}

function* CategorySaga() {
  yield takeEvery(GET_RELATED_PRODUCT_LIST, onGetRelatedProductList);
  yield takeEvery(GET_PRODUCT_LIST, onGetProductList);
  yield takeEvery(ADD_PRODUCT_LIST, onAddProductlist);
  yield takeEvery(DELETE_PRODUCT_LIST, onDelProductList);
}
export default CategorySaga;
