import { combineReducers } from "redux";

// Node Reducer
import Login from "./Login/reducer";
import User from "./User/reducer";
import Modules from "./Modules/reducer";
import Role from "./Roles/reducer";
import RoleAccess from "./RoleAccess/reducer";
import ModuleAccess from "./Module_access/reducer";

import Packing from "./Packing/reducer";


const rootReducer = combineReducers({
    // public
    Login,
    User,
    Modules,
    Role,
    RoleAccess,
    ModuleAccess,

    Packing
});

export default rootReducer;