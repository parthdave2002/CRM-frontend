import { all, fork } from "redux-saga/effects";

//  >>>>>>>>>>>>>>>>>>>>>>> Node Api <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
import LoginSaga from "./Login/saga";
import UserSaga from "./User/saga";
import ModuleSaga from "./Modules/saga";
import RoleSaga from "./Roles/saga";
import RoleAccessSaga from "./RoleAccess/saga";
import ModuleAccessSaga from "./Module_access/saga";

import PackingSaga from "./Packing/saga";


export default function* rootSaga() {
  yield all([
    //public
    fork(LoginSaga),
    fork(UserSaga),
    fork(ModuleSaga),
    fork(RoleSaga),
    fork(RoleAccessSaga),
    fork(ModuleAccessSaga),

    fork(PackingSaga)
  ]);
}
