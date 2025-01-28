import {
  GET_ROLES_LIST,
  GET_ROLES_LIST_SUCCESS,
  GET_ROLES_LIST_ERROR,
  GET_SINGLE_ROLES_LIST,
  GET_SINGLE_ROLES_LIST_ERROR,
  GET_SINGLE_ROLES_LIST_SUCCESS,
  GET_SEARCH_ROLES_LIST,
  GET_SEARCH_ROLES_LIST_ERROR,
  GET_SEARCH_ROLES_LIST_SUCCESS,
} from "./actionType";

const INIT_STATE = {
  Roleslist: [],
  RoleListSize:0,
  TotalRoleListData:0,
  CurrentPage:1,
  RolesSinglelist: [],
  SearchRoleslist: [],
  error: {},
};

const Role = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ROLES_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case GET_ROLES_LIST:
  
          return {
            ...state,
            Roleslist: action.payload.data.data,
            RoleListSize: action.payload.data.size,
            TotalRoleListData: action.payload.data.totalData,
            CurrentPage: action.payload.data.page,
          };
      }
    case GET_ROLES_LIST_ERROR:
      switch (action.payload.actionType) {
        case GET_ROLES_LIST:
          // console.log("CREATE_GROUP_SUCCESS =====>", action.payload);
          return {
            ...state,
            error: action.payload,
          };

        default:
          return { ...state };
      }

    // Get Single Array Response
    case GET_SINGLE_ROLES_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case GET_SINGLE_ROLES_LIST:
          return {
            ...state,
            RolesSinglelist: action.payload.data,
          };
      }
    case GET_SINGLE_ROLES_LIST_ERROR:
      switch (action.payload.actionType) {
        case GET_SINGLE_ROLES_LIST:
          // console.log("CREATE_GROUP_SUCCESS =====>", action.payload);
          return {
            ...state,
            error: action.payload,
          };

        default:
          return { ...state };
      }

    // Search Role
    case GET_SEARCH_ROLES_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case GET_SEARCH_ROLES_LIST:
          return {
            ...state,
            SearchRoleslist: action.payload.data,
          };
      }
    case GET_SEARCH_ROLES_LIST_ERROR:
      switch (action.payload.actionType) {
        case GET_SEARCH_ROLES_LIST:
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

export default Role;
