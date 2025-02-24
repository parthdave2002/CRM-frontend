import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  getUpdateOrderlistSuccess,
  getUpdateOrderlistFail,
  getOrderlistSuccess,
  getOrderlistFail,
  AddOrderlistSuccess,
  AddOrderlistFail,
  DeleteOrderlistSuccess,
  DeleteOrderlistFail,
} from "./action";
import {
  GET_UPDATE_ORDER_LIST,
  GET_ORDER_LIST,
  ADD_ORDER_LIST,
  DELETE_ORDER_LIST,
} from "./actionType";
import { UpdateOrderlistApi,OrderlistApi, AddOrderlistApi, DelOrderlistApi,} from "../../helper/Demo_helper";


function* onGetUpdateOrderList({ payload: requstuser }) {
  try {
    const response = yield call(UpdateOrderlistApi, requstuser);
    yield put(getUpdateOrderlistSuccess(GET_UPDATE_ORDER_LIST, response));
  } catch (error) {
    yield put(getUpdateOrderlistFail(error));
  }
}

function* onGetOrderList({ payload: requstuser }) {
  try {
    const response = yield call(OrderlistApi, requstuser);
    yield put(getOrderlistSuccess(GET_ORDER_LIST, response));
  } catch (error) {
    yield put(getOrderlistFail(error));
  }
}

function* onAddOrderlist({ payload: requstuser }) {
  try {
    const response = yield call(AddOrderlistApi, requstuser);
    yield put(AddOrderlistSuccess(ADD_ORDER_LIST, response));
  } catch (error) {
    yield put(AddOrderlistFail(error));
  }
}

function* onDelOrderList({ payload: requstuser }) {
  try {
    const response = yield call(DelOrderlistApi, requstuser);
    yield put(DeleteOrderlistSuccess(DELETE_ORDER_LIST, response));

    if(response.success === true || response.success === "true"){
      const newresponse = yield call(OrderlistApi);
      yield put(getOrderlistSuccess(GET_ORDER_LIST, newresponse));
    }
  } catch (error) {
    yield put(DeleteOrderlistFail(error));
  }
}

function* OrderSaga() {
  yield takeEvery(GET_UPDATE_ORDER_LIST, onGetUpdateOrderList);
  yield takeEvery(GET_ORDER_LIST, onGetOrderList);
  yield takeEvery(ADD_ORDER_LIST, onAddOrderlist);
  yield takeEvery(DELETE_ORDER_LIST, onDelOrderList);
}
export default OrderSaga;
