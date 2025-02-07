import { combineReducers } from "redux";

import Login from "./Login/reducer";
import User from "./User/reducer";
import Modules from "./Modules/reducer";
import Role from "./Roles/reducer";
import RoleAccess from "./RoleAccess/reducer";
import ModuleAccess from "./Module_access/reducer";

import PackingType from "./Packing/Packing type/reducer";
import Packing from "./Packing/Packing/reducer";

import Category from "./Category/reducer";
import Company from "./Company/reducer";
import Product from "./Product/reducer";
import Banner from "./Banner/reducer";
import Taglog from "./Taglog/reducer";

const rootReducer = combineReducers({
    // public
    Login,
    User,
    Modules,
    Role,
    RoleAccess,
    ModuleAccess,

    PackingType,
    Packing,
    Category,
    Company,
    Product,
    Banner,
    Taglog
});

export default rootReducer;