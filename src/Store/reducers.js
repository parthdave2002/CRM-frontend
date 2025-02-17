import { combineReducers } from "redux";

import Login from "./Login/reducer";
import User from "./User/reducer";
import Role from "./Roles/reducer";
import RoleAccess from "./RoleAccess/reducer";
import PackingType from "./Packing/Packing type/reducer";
import Packing from "./Packing/Packing/reducer";
import Category from "./Category/reducer";
import Company from "./Company/reducer";
import Product from "./Product/reducer";
import Banner from "./Banner/reducer";
import Taglog from "./Taglog/reducer";
import ExportData from "./ExportData/reducer";
import Customer from "./Customer/reducer";

const rootReducer = combineReducers({
    // public
    Login,
    User,
    Role,
    RoleAccess,

    PackingType,
    Packing,
    Category,
    Company,
    Product,
    Banner,
    Taglog,
    ExportData,
    Customer
});

export default rootReducer;