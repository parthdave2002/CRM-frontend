import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  getCompanylistSuccess,
  getCompanylistFail,
  AddCompanylistSuccess,
  AddCompanylistFail,
  DeleteCompanylistSuccess,
  DeleteCompanylistFail,
  ResetCompanylist,
  ResetCompanylistSuccess,
  ResetCompanylistFail
} from "./action";
import {
  GET_COMPANY_LIST,
  ADD_COMPANY_LIST,
  DELETE_COMPANY_LIST,
  REST_COMPANY_LIST
} from "./actionType";
import { CompanylistApi, AddCompanylistApi, DelCompanylistApi,} from "../../helper/Demo_helper";

function* onGetCompanyList({ payload: requstuser }) {
  try {
    const response = yield call(CompanylistApi, requstuser);
    yield put(getCompanylistSuccess(GET_COMPANY_LIST, response));
  } catch (error) {
    yield put(getCompanylistFail(error));
  }
}

function* onAddCompanyList({ payload: requstuser }) {
  try {
    const response = yield call(AddCompanylistApi, requstuser);
    yield put(AddCompanylistSuccess(ADD_COMPANY_LIST, response));
  } catch (error) {
    yield put(AddCompanylistFail(error));
  }
}

function* onDelCompanyList({ payload: requstuser }) {
  try {
    const response = yield call(DelCompanylistApi, requstuser);
    yield put(DeleteCompanylistSuccess(DELETE_COMPANY_LIST, response));

    if(response.success === true || response.success === "true"){
      const newresponse = yield call(CompanylistApi);
    yield put(getCompanylistSuccess(GET_COMPANY_LIST, newresponse));
    }
  } catch (error) {
    yield put(DeleteCompanylistFail(error));
  }
}

function* onRestetCompanyList() {
    const response = yield call(ResetCompanylist);
    yield put(ResetCompanylistSuccess(REST_COMPANY_LIST, response)); 
}

function* CategorySaga() {
  yield takeEvery(GET_COMPANY_LIST, onGetCompanyList);
  yield takeEvery(ADD_COMPANY_LIST, onAddCompanyList);
  yield takeEvery(DELETE_COMPANY_LIST, onDelCompanyList);
  yield takeEvery(REST_COMPANY_LIST, onRestetCompanyList);
}
export default CategorySaga;
