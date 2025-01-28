import { call, put, takeEvery } from "redux-saga/effects";
import {
  getRolesAccesslist,
  getRolesAccesslistSuccess,
  getRolesAccesslistFail,

  SaveRolesAccesslist,
  SaveRolesAccesslistSuccess,
  SaveRolesAccesslistFail,
} from "./action";
import {
  GET_ROLES_ACCESS_LIST,
  GET_ROLES_ACCESS_LIST_SUCCESS,
  GET_ROLES_ACCESS_LIST_ERROR,
  SAVE_ROLES_ACCESS_LIST,
  SAVE_ROLES_ACCESS_LIST_ERROR,
  SAVE_ROLES_ACCESS_LIST_SUCCESS
} from "./actionType";
import { RoleAccesslistApi, PostRoleAccesslistApi } from "../../helper/Demo_helper";

function* onGetRolesList({ payload: requstuser }) {
  try {
    const reponse = yield call(RoleAccesslistApi, requstuser);
    yield put(getRolesAccesslistSuccess(GET_ROLES_ACCESS_LIST, reponse));
  } catch (error) {
    yield put(getRolesAccesslistFail(error));
  }
}


function* onSaveRolesList({ payload: requstuser }) {
  try {
    const reponse = yield call(PostRoleAccesslistApi, requstuser);
    yield put(SaveRolesAccesslistSuccess(SAVE_ROLES_ACCESS_LIST, reponse));
  } catch (error) {
    yield put(SaveRolesAccesslistFail(error));
  }
}

function* RoleAccessSaga() {
  yield takeEvery(GET_ROLES_ACCESS_LIST, onGetRolesList);
  yield takeEvery(SAVE_ROLES_ACCESS_LIST, onSaveRolesList);  
}
export default RoleAccessSaga;
