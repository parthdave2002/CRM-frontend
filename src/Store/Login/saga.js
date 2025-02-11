import { call, put, takeEvery } from "redux-saga/effects";
import {
  insertlogin,
  insertloginSuccess,
  insertloginFail,
  resetinsertlogin,
  resetinsertloginSuccess,
  logout,
  logoutSuccess,
  logoutFail,
  resetinsertlogout,
  resetinsertLogoutSuccess
} from "./action";
import {
  INSERT_LOGIN,
  INSERT_LOGIN_SUCCESS,
  INSERT_LOGIN_ERROR,
  LOGOUT,
  LOGOUT_ERROR,
  LOGOUT_SUCCESS,
  RESET_INSERT_LOGIN,
  RESET_INSERT_LOGOUT,
} from "./actionType";
import { LoginApi,LogoutApi } from "../../helper/Demo_helper";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

function* onInsertLogin({ payload: requstuser }) {
  try {
    Cookies.set('token',"callled", { expires: 7 });
    const reponse = yield call(LoginApi, requstuser);
    yield put(insertloginSuccess(INSERT_LOGIN, reponse));

    if(reponse.success === false){
      toast.error(reponse.msg)
    }
    if (reponse.success === true) {
      localStorage.setItem("token", reponse.token);
      localStorage.setItem("user", JSON.stringify(reponse.data.roles));
      localStorage.setItem("authUser", JSON.stringify(reponse));
      localStorage.setItem("Username", reponse.data.name);
      localStorage.setItem("isLoggedIn", "true");
    }

  } catch (error) {
    yield put(insertloginFail(error));
  }
}

function* onResetInsertLogin() {
    const reponse = yield call(resetinsertlogin);
    yield put(resetinsertloginSuccess(RESET_INSERT_LOGIN, reponse));
 
}

function* onInsertLogout({ payload: requstuser }) {
  try {
    const reponse = yield call(LogoutApi, requstuser);
    yield put(logoutSuccess(LOGOUT, reponse));
  } catch (error) {
    yield put(logoutFail(error));
  }
}

function* onResetInsertLogout() {
  const reponse = yield call(resetinsertlogout);
  yield put(resetinsertLogoutSuccess(RESET_INSERT_LOGOUT, reponse));

}


function* LoginSaga() {
  yield takeEvery(INSERT_LOGIN, onInsertLogin);
  yield takeEvery(RESET_INSERT_LOGIN, onResetInsertLogin);
  yield takeEvery(LOGOUT, onInsertLogout);
  yield takeEvery(RESET_INSERT_LOGOUT, onResetInsertLogout);
}

export default LoginSaga;
