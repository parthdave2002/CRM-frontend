import { call, put, takeEvery } from "redux-saga/effects";
import {
  getModulelist,
  getModulelistSuccess,
  getModulelistFail,

  getSingleModulelist,
  getSingleModulelistSuccess,
  getSingleModulelistFail,

  AddModulelist,
  AddModulelistSuccess,
  AddModulelistFail,

  DeleteModulelist,
  DeleteModulelistSuccess,
  DeleteModulelistFail,

  getModuleGrouplist,
  getModuleGrouplistSuccess,
  getModuleGrouplistFail,

  getSingleModuleGroup,
  getSingleModuleGroupSuccess,
  getSingleModuleGroupFail,

  AddModuleGrouplist,
  AddModuleGrouplistSuccess,
  AddModuleGrouplistFail,

  DeleteModuleGrouplist,
  DeleteModuleGrouplistSuccess,
  DeleteModuleGrouplistFail,

  getSearchData,
  getSearchDataSuccess,
  getSearchDataFail,

  getSearchGroupData,
  getSearchGroupDataSuccess,
  getSearchGroupDataFail
} from "./action";
import {
  GET_MODULE_LIST,
  GET_MODULE_LIST_SUCCESS,
  GET_MODULE_LIST_ERROR,
  UPDATE_MODULE_LIST,
  UPDATE_MODULE_LIST_ERROR,
  UPDATE_MODULE_LIST_SUCCESS,
  ADD_MODULE_LIST,
  ADD_MODULE_LIST_ERROR,
  ADD_MODULE_LIST_SUCCESS,
  DELETE_MODULE_LIST,
  DELETE_MODULE_LIST_ERROR,
  DELETE_MODULE_LIST_SUCCESS,
  GET_MODULE_GROUP_LIST,
  GET_MODULE_GROUP_LIST_ERROR,
  GET_MODULE_GROUP_LIST_SUCCESS,
  UPDATE_MODULE_GROUP_LIST,
  UPDATE_MODULE_GROUP_LIST_ERROR,
  UPDATE_MODULE_GROUP_LIST_SUCCESS,
  ADD_MODULE_GROUP_LIST,
  ADD_MODULE_GROUP_LIST_ERROR,
  ADD_MODULE_GROUP_LIST_SUCCESS,
  DELETE_MODULE_GROUP_LIST,
  DELETE_MODULE_GROUP_LIST_ERROR,
  DELETE_MODULE_GROUP_LIST_SUCCESS,
  GET_SEARCH_LIST,
  GET_SEARCH_LIST_ERROR,
  GET_SEARCH_LIST_SUCCESS,

  GET_SEARCH_GROUP_LIST,
  GET_SEARCH_GROUP_LIST_ERROR,
  GET_SEARCH_GROUP_LIST_SUCCESS
} from "./actionType";
import {
  ModulelistApi,
  UpdateModulelistApi,
  UpdateModuleGrouplistApi,
  AddModulelistApi,
  DelModulelistApi,
  ModuleGrouplistApi,
  AddModuleGrouplistApi,
  DelModuleGrouplistApi,
  SearchModulelistApi,
  SearchModuleGrouplistApi
} from "../../helper/Demo_helper";

function* onGetModuleList({ payload: requstuser }) {
  try {
    const reponse = yield call(ModulelistApi, requstuser);
    yield put(getModulelistSuccess(GET_MODULE_LIST, reponse));
  } catch (error) {
    yield put(getModulelistFail(error));
  }
}

function* onGetSingleModuleList({ payload: requstuser }) {
  try {
    const reponse = yield call(UpdateModulelistApi, requstuser);
    yield put(getSingleModulelistSuccess(UPDATE_MODULE_LIST, reponse));
  } catch (error) {
    yield put(getSingleModulelistFail(error));
  }
}

function* onAddModuleList({ payload: requstuser }) {
  try {
    const reponse = yield call(AddModulelistApi, requstuser);
    yield put(AddModulelistSuccess(ADD_MODULE_LIST, reponse));

    if (reponse.success == true) {
      let requserdataGet = {
        id: requstuser.module_group,
        type: "Module-List-View",
        sub_module_id: "64cb9eccfa4b3d167429b29e",
        page: 1,
        size: 5
      };
      const reponse = yield call(ModulelistApi, requserdataGet);
      yield put(getModulelistSuccess(GET_MODULE_LIST, reponse));
    }
  } catch (error) {
    yield put(AddModulelistFail(error));
  }
}

function* onDelModuleList({ payload: requstuser }) {
  try {
    const reponse = yield call(DelModulelistApi, requstuser);
    yield put(DeleteModulelistSuccess(DELETE_MODULE_LIST, reponse));

    if (reponse.success == true) {
      let requserdataGet = {
        id: requstuser.module_group,
        type: "Module-List-View",
        sub_module_id: "64cb9eccfa4b3d167429b29e",
        page: 1,
        size: 5,
        namne:"Parth"
      };
      const reponse = yield call(ModulelistApi, requserdataGet);
      yield put(getModulelistSuccess(GET_MODULE_LIST, reponse));
    }

  } catch (error) {
    yield put(DeleteModulelistFail(error));
  }
}


// Get Module Group List

function* onGetModuleGroupList({ payload: requstuser }) {
  try {
    const reponse = yield call(ModuleGrouplistApi, requstuser);
    yield put(getModuleGrouplistSuccess(GET_MODULE_GROUP_LIST, reponse));
  } catch (error) {
    yield put(getModuleGrouplistFail(error));
  }
}

function* onGetSingleModuleGroup({ payload: requstuser }) {
  try {
    const reponse = yield call(UpdateModuleGrouplistApi, requstuser);
    yield put(getSingleModuleGroupSuccess(UPDATE_MODULE_GROUP_LIST, reponse));
  } catch (error) {
    yield put(getSingleModuleGroupFail(error));
  }
}

function* onAddModuleGroup({ payload: requstuser }) {
  try {
    const reponse = yield call(AddModuleGrouplistApi, requstuser);
    yield put(AddModuleGrouplistSuccess(ADD_MODULE_GROUP_LIST, reponse));

    if (reponse.success == true) {
      let requserdata = {
        page: 1,
        size: 5
      };
      const reponse = yield call(ModuleGrouplistApi, requserdata);
      yield put(getModuleGrouplistSuccess(GET_MODULE_GROUP_LIST, reponse));
    }
  } catch (error) {
    yield put(AddModuleGrouplistFail(error));
  }
}

function* onDelModuleGroup({ payload: requstuser }) {
  try {
    const reponse = yield call(DelModuleGrouplistApi, requstuser);
    yield put(DeleteModuleGrouplistSuccess(DELETE_MODULE_GROUP_LIST, reponse));

    if (reponse.success == true) {
      let requserdata = {
        page: 1,
        size: 5
      };
      const reponse = yield call(ModuleGrouplistApi, requserdata);
      yield put(getModuleGrouplistSuccess(GET_MODULE_GROUP_LIST, reponse));
    }
  } catch (error) {
    yield put(DeleteModuleGrouplistFail(error));
  }
}

function* onGetSearchData({ payload: requstuser }) {
  try {
    const reponse = yield call(SearchModulelistApi, requstuser);
    yield put(getSearchDataSuccess(GET_SEARCH_LIST, reponse));
  } catch (error) {
    yield put(getSearchDataFail(error));
  }
}

function* onGetSearchGroupData({ payload: requstuser }) {
  try {
    const reponse = yield call(SearchModuleGrouplistApi, requstuser);
    yield put(getSearchGroupDataSuccess(GET_SEARCH_GROUP_LIST, reponse));
  } catch (error) {
    yield put(getSearchGroupDataFail(error));
  }
}

function* ModuleSaga() {
  yield takeEvery(GET_MODULE_LIST, onGetModuleList);
  yield takeEvery(UPDATE_MODULE_LIST, onGetSingleModuleList);
  yield takeEvery(ADD_MODULE_LIST, onAddModuleList);
  yield takeEvery(DELETE_MODULE_LIST, onDelModuleList);

  yield takeEvery(GET_MODULE_GROUP_LIST, onGetModuleGroupList);
  yield takeEvery(UPDATE_MODULE_GROUP_LIST, onGetSingleModuleGroup);
  yield takeEvery(ADD_MODULE_GROUP_LIST, onAddModuleGroup);
  yield takeEvery(DELETE_MODULE_GROUP_LIST, onDelModuleGroup);

  yield takeEvery(GET_SEARCH_LIST, onGetSearchData);
  yield takeEvery(GET_SEARCH_GROUP_LIST, onGetSearchGroupData);
}

export default ModuleSaga;
