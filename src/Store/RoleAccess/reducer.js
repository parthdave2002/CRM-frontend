import {
  GET_ROLES_ACCESS_LIST,
  GET_ROLES_ACCESS_LIST_SUCCESS,
  GET_ROLES_ACCESS_LIST_ERROR,
} from "./actionType";

const INIT_STATE = {
  RolesAccesslist: [],
  error: {},
};

const RoleAccess = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ROLES_ACCESS_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case GET_ROLES_ACCESS_LIST:
          return {
            ...state,
            RolesAccesslist: action.payload.data,
          };
      }
    case GET_ROLES_ACCESS_LIST_ERROR:
      switch (action.payload.actionType) {
        case GET_ROLES_ACCESS_LIST:
          // console.log("CREATE_GROUP_SUCCESS =====>", action.payload);
          return {
            ...state,
            error: action.payload,
          };

        default:
          return { ...state };
      }

    default:
      return state;
  }
};

export default RoleAccess;
