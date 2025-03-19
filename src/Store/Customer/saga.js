import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  getCustomerDatalistSuccess,
  getCustomerDatalistFail,
  AddCustomerDatalistSuccess,
  AddCustomerDatalistFail,
  DeleteCustomerDatalistSuccess,
  DeleteCustomerDatalistFail,
  ResetCustomerDatalist,
  ResetCustomerDatalistSuccess,
  ResetCustomerDatalistFail,
  BlockCustomer,
  BlockCustomerSuccess,
  BlockCustomerFail,
  CheckCustomerExist,
  CheckCustomerExistSuccess,
  CheckCustomerExistFail
} from "./action";
import {
  GET_CUSTOMER_DATA_LIST,
  ADD_CUSTOMER_DATA_LIST,
  DELETE_CUSTOMER_DATA_LIST,
  REST_CUSTOMER_DATA_LIST,
  BLOCK_CUSTOMER_DATA_LIST,
  CHECK_CUSTOMER_EXIST_LIST
} from "./actionType";
import { CustomerlistApi, AddCustomerlistApi, DelCustomerlistApi, BlockCustomerlistApi, CheckCustomerApi} from "../../helper/Demo_helper";
import { toast } from "react-toastify";

function* onGetCustomerDatalist({ payload: requstuser }) {
  try {
    const response = yield call(CustomerlistApi, requstuser);
    yield put(getCustomerDatalistSuccess(GET_CUSTOMER_DATA_LIST, response));
  } catch (error) {
    yield put(getCustomerDatalistFail(error));
  }
}

function* onAddCustomerList({ payload: requstuser }) {
  try {
    const response = yield call(AddCustomerlistApi, requstuser);
    yield put(AddCustomerDatalistSuccess(ADD_CUSTOMER_DATA_LIST, response));
  } catch (error) {
    yield put(AddCustomerDatalistFail(error));
  }
}

function* onDelCustomerList({ payload: requstuser }) {
  try {
    const response = yield call(DelCustomerlistApi, requstuser);
    yield put(DeleteCustomerDatalistSuccess(DELETE_CUSTOMER_DATA_LIST, response));

    if(response.success === true || response.success === "true"){
      const newresponse = yield call(CustomerlistApi);
    yield put(getCustomerDatalistSuccess(GET_CUSTOMER_DATA_LIST, newresponse));
    }
  } catch (error) {
    yield put(DeleteCustomerDatalistFail(error));
  }
}

function* onResetCustomerList() {
    const response = yield call(ResetCustomerDatalist);
    yield put(ResetCustomerDatalistSuccess(REST_CUSTOMER_DATA_LIST, response)); 
}


function* onBlockCustomerList({ payload: requstuser }) {
  try {
    const response = yield call(BlockCustomerlistApi, requstuser);
    yield put(BlockCustomerSuccess(BLOCK_CUSTOMER_DATA_LIST, response));

    if(response.success === true || response.success === "true"){
      toast.success(response?.msg);
      const newresponse = yield call(CustomerlistApi);
      yield put(getCustomerDatalistSuccess(GET_CUSTOMER_DATA_LIST, newresponse));
    }
  } catch (error) {
    yield put(BlockCustomerFail(error));
  }
}

function* onCheckCustomerList({ payload: requstuser }) {
  try {
    const response = yield call(CheckCustomerApi, requstuser);
    yield put(CheckCustomerExistSuccess(CHECK_CUSTOMER_EXIST_LIST, response));
  } catch (error) {
    yield put(CheckCustomerExistFail(error));
  }
}

function* CustomerSaga() {
  yield takeEvery(GET_CUSTOMER_DATA_LIST, onGetCustomerDatalist);
  yield takeEvery(ADD_CUSTOMER_DATA_LIST, onAddCustomerList);
  yield takeEvery(DELETE_CUSTOMER_DATA_LIST, onDelCustomerList);
  yield takeEvery(REST_CUSTOMER_DATA_LIST, onResetCustomerList);
  yield takeEvery(BLOCK_CUSTOMER_DATA_LIST, onBlockCustomerList);
  yield takeEvery(CHECK_CUSTOMER_EXIST_LIST, onCheckCustomerList);

}
export default CustomerSaga;
