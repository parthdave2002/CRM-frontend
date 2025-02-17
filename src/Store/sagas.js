import { all, fork } from "redux-saga/effects";

//  >>>>>>>>>>>>>>>>>>>>>>> Node Api <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
import LoginSaga from "./Login/saga";
import UserSaga from "./User/saga";
import RoleSaga from "./Roles/saga";
import RoleAccessSaga from "./RoleAccess/saga";
import PackingSaga from "./Packing/Packing/saga";
import PackingTypeSaga from "./Packing/Packing type/saga";

import CategorySaga from "./Category/saga";
import CompanySaga from "./Company/saga";
import ProductSaga from "./Product/saga";
import BannerSaga from "./Banner/saga";
import TaglogSaga from "./Taglog/saga";

import ExportDataSaga from "./ExportData/saga";
import CustomerSaga from "./Customer/saga";

export default function* rootSaga() {
  yield all([
    //public
    fork(LoginSaga),
    fork(UserSaga),
    fork(RoleSaga),
    fork(RoleAccessSaga),
    fork(PackingTypeSaga),
    fork(PackingSaga),
    fork(CategorySaga),
    fork(CompanySaga),
    fork(ProductSaga),
    fork(BannerSaga),
    fork(TaglogSaga),
    fork(CustomerSaga),
    fork(ExportDataSaga)
  ]);
}
