import { call, put, takeEvery } from "redux-saga/effects";
import { ToastContainer, toast } from "react-toastify";
import {
  getsalesDashboard,
  getsalesDashboardSuccess,
  getsalesDashboardFail,

  getCallbackdata,
  getCallbackdataSuccess,
  getCallbackdataFail,

  getResetsalesDashboard,
  getResetsalesDashboardSuccess,
  getResetsalesDashboardFail,
} from "./action";
import {
  GET_SALES_DASHBOARD_DATA,
  GET_CALLBACK_DATA,
  GET_SALES_DASHBOARD_RESET_DATA
} from "./actionType";

import { SalesExcutiveDashboardlistApi, SalesExcutiveCallbacklistApi } from "../../../helper/Demo_helper";

function* onGetsalesDashboard({ payload: requstuserlist }) {
  try {
    const reponse = yield call(SalesExcutiveDashboardlistApi, requstuserlist);
    yield put(getsalesDashboardSuccess(GET_SALES_DASHBOARD_DATA, reponse));
  } catch (error) {
    yield put(getsalesDashboardFail(error));
  }
}

function* onGetsalesCallback({ payload: requstuserlist }) {
  try {
    const reponse = yield call(SalesExcutiveCallbacklistApi, requstuserlist);
    yield put(getCallbackdataSuccess(GET_CALLBACK_DATA, reponse));
  } catch (error) {
    yield put(getCallbackdataFail(error));
  }
}


function* onGetResetsalesDashboard() {
    const response = yield call(getResetsalesDashboard);
    yield put(getResetsalesDashboardSuccess(GET_SALES_DASHBOARD_RESET_DATA, response)); 
}


function* SalesDashboardSaga() {
  yield takeEvery(GET_SALES_DASHBOARD_DATA, onGetsalesDashboard);
  yield takeEvery(GET_CALLBACK_DATA, onGetsalesCallback);
  yield takeEvery(GET_SALES_DASHBOARD_RESET_DATA, onGetResetsalesDashboard);

}

export default SalesDashboardSaga;
