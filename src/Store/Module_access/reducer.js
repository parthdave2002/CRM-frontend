import {
  GET_MODULE_ACCESS_LIST,
  GET_MODULE_ACCESS_LIST_SUCCESS,
  GET_MODULE_ACCESS_LIST_ERROR,

  ADD_MODULE_ACCESS_LIST,
  ADD_MODULE_ACCESS_LIST_SUCCESS,
  ADD_MODULE_ACCESS_LIST_ERROR,

  GET_SEARCH_MODULE_ACCESS_LIST,
  GET_SEARCH_MODULE_ACCESS_LIST_ERROR,
  GET_SEARCH_MODULE_ACCESS_LIST_SUCCESS
} from "./actionType";

const INIT_STATE = {
  ModuleAccesslist: [],
  SearchCdrlist:[],
  error: {},
};

const ModuleAccess = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_MODULE_ACCESS_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case GET_MODULE_ACCESS_LIST:
                    return {
            ...state,
            ModuleAccesslist: action.payload.data,
          };
      }
    case GET_MODULE_ACCESS_LIST_ERROR:
      switch (action.payload.actionType) {
        case GET_MODULE_ACCESS_LIST:
          // console.log("CREATE_GROUP_SUCCESS =====>", action.payload); 
          return {
            ...state,
            error: action.payload,
          };

        default:
          return { ...state };
      }

      // Search CDR
      case GET_SEARCH_MODULE_ACCESS_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case GET_SEARCH_MODULE_ACCESS_LIST:
          return {
            ...state,
            SearchCdrlist: action.payload.data,
          };
      }
    case GET_SEARCH_MODULE_ACCESS_LIST_ERROR:
      switch (action.payload.actionType) {
        case GET_SEARCH_MODULE_ACCESS_LIST:
          // console.log("CREATE_GROUP_SUCCESS =====>", action.payload);
          return {
            ...state,
            error: action.payload,
          };

        default:
          return { ...state };
      }

      // Add MOdule
      case ADD_MODULE_ACCESS_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case ADD_MODULE_ACCESS_LIST:
          return {
            ...state,
            SearchCdrlist: action.payload.data,
          };
      }
    case ADD_MODULE_ACCESS_LIST_ERROR:
      switch (action.payload.actionType) {
        case ADD_MODULE_ACCESS_LIST:
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

export default ModuleAccess;
