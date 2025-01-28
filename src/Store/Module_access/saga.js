import { call, put, takeEvery } from "redux-saga/effects";
import {
  getModuleAcesslist,
  getModuleAcesslistSuccess,
  getModuleAcesslistFail,

  AddModuleAcesslist,
  AddModuleAcesslistSuccess,
  AddModuleAcesslistFail,

  SearchModuleAccesslist,
  SearchModuleAccesslistSuccess,
  SearchModuleAccesslistFail
} from "./action";
import {
  GET_MODULE_ACCESS_LIST,
  GET_MODULE_ACCESS_LIST_SUCCESS,
  GET_MODULE_ACCESS_LIST_ERROR,

  ADD_MODULE_ACCESS_LIST,
  ADD_MODULE_ACCESS_LIST_ERROR,
  ADD_MODULE_ACCESS_LIST_SUCCESS,

  GET_SEARCH_MODULE_ACCESS_LIST,
  GET_SEARCH_MODULE_ACCESS_LIST_ERROR,
  GET_SEARCH_MODULE_ACCESS_LIST_SUCCESS
} from "./actionType";
import {ModuleAcesslistApi, SearchModuleAccesslistApi, AddModuleAcesslistApi } from "../../helper/Demo_helper";

function* onGetRolesList({ payload: requstuser }) {
  try {
    const reponse = yield call(ModuleAcesslistApi, requstuser);
    yield put(getModuleAcesslistSuccess(GET_MODULE_ACCESS_LIST, reponse.data));
  } catch (error) {
    yield put(getModuleAcesslistFail(error));
  }
}


function* onGetAddModuleAccesslist({ payload: requstuser }) {
  try {
    const reponse = yield call(AddModuleAcesslistApi, requstuser);
    yield put(AddModuleAcesslistSuccess(ADD_MODULE_ACCESS_LIST, reponse));

    if (reponse.success == true) {
      let reqdatauser = {
        type: "Module-Access-List-View",
      };
      const reponse = yield call(ModuleAcesslistApi,reqdatauser);
      yield put(getModuleAcesslistSuccess(GET_MODULE_ACCESS_LIST, reponse));
    }
  } catch (error) {
    yield put(AddModuleAcesslistFail(error));
  }
}

function* onGetSearchModuleAccesslist({ payload: requstuser }) {
  try {
    const reponse = yield call(SearchModuleAccesslistApi, requstuser);
    yield put(SearchModuleAccesslistSuccess(GET_SEARCH_MODULE_ACCESS_LIST, reponse));
  } catch (error) {
    yield put(SearchModuleAccesslistFail(error));
  }
}

function*  ModuleAccessSaga() {
  yield takeEvery(GET_MODULE_ACCESS_LIST, onGetRolesList);
  yield takeEvery(GET_SEARCH_MODULE_ACCESS_LIST, onGetSearchModuleAccesslist);
  yield takeEvery(ADD_MODULE_ACCESS_LIST, onGetAddModuleAccesslist);
 
}
export default ModuleAccessSaga;
