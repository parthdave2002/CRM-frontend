import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  getTagloglistSuccess,
  getTagloglistFail,
  AddTagloglistSuccess,
  AddTagloglistFail,
  DeleteTagloglistSuccess,
  DeleteTagloglistFail,
  ResetTagloglist,
  ResetTagloglistSuccess,
  ChangeStatusTagloglistSuccess,
  ChangeStatusTagloglistFail,
} from "./action";
import {
  GET_TAGLOG_LIST,
  ADD_TAGLOG_LIST,
  CHANGE_STATUS_TAGLOG_LIST,
  DELETE_TAGLOG_LIST,
  REST_TAGLOG_LIST
} from "./actionType";
import { TagloglistApi, AddTagloglistApi, DelTagloglistApi, StatusTagloglistApi,} from "../../helper/Demo_helper";
import { toast } from "react-toastify";

function* onGetTaglogList({ payload: requstuser }) {
  try {
    const response = yield call(TagloglistApi, requstuser);
    yield put(getTagloglistSuccess(GET_TAGLOG_LIST, response));
  } catch (error) {
    toast.error(error?.msg);
    yield put(getTagloglistFail(error));
  }
}

function* onAddTaglogList({ payload: requstuser }) {
  try {
    const response = yield call(AddTagloglistApi, requstuser);
    yield put(AddTagloglistSuccess(ADD_TAGLOG_LIST, response));
  } catch (error) {
    toast.error(error?.msg);
    yield put(AddTagloglistFail(error));
  }
}

function* onDelTaglogList({ payload: requstuser }) {
  try {
    const response = yield call(DelTagloglistApi, requstuser);
    yield put(DeleteTagloglistSuccess(DELETE_TAGLOG_LIST, response));

    if(response.success === true || response.success === "true"){
       toast.success(response?.msg);
      const newresponse = yield call(TagloglistApi);
      yield put(getTagloglistSuccess(GET_TAGLOG_LIST, newresponse));
    }
  } catch (error) {
    toast.error(error?.msg);
    yield put(DeleteTagloglistFail(error));
  }
}

function* onStatusTaglogList({ payload: requstuser }) {
  try {
    const response = yield call(StatusTagloglistApi, requstuser);
    yield put(ChangeStatusTagloglistSuccess(CHANGE_STATUS_TAGLOG_LIST, response));

    if(response.success === true || response.success === "true"){
       toast.success(response?.msg);
      const newresponse = yield call(TagloglistApi);
      yield put(getTagloglistSuccess(GET_TAGLOG_LIST, newresponse));
    }
  } catch (error) {
    toast.error(error?.msg);
    yield put(ChangeStatusTagloglistFail(error));
  }
}

function* onResetTaglogList() {
    const response = yield call(ResetTagloglist);
    yield put(ResetTagloglistSuccess(REST_TAGLOG_LIST, response)); 
}

function* TaglogSaga() {
  yield takeEvery(GET_TAGLOG_LIST, onGetTaglogList);
  yield takeEvery(ADD_TAGLOG_LIST, onAddTaglogList);
  yield takeEvery(CHANGE_STATUS_TAGLOG_LIST, onStatusTaglogList);
  yield takeEvery(DELETE_TAGLOG_LIST, onDelTaglogList);
  yield takeEvery(REST_TAGLOG_LIST, onResetTaglogList);
}
export default TaglogSaga;
