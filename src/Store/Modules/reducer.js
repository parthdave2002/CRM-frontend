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
  GET_SEARCH_GROUP_LIST_SUCCESS,
} from "./actionType";

export const INITSTATE = {
  ModuleData: [],
  ModuleListSize: 0,
  TotalModuleListData: 0,
  SingleModuleData: [],
  ModuleGroupData: [],
  SingleModuleGroupData: [],
  ModuleGroupListSize: 0,
  TotalModuleGroupListData: 0,
  CurrentPage: 1,
  SearchModuleData: [],
  SearchGroupModuleData: [],
  error: {},
};

const Module = (state = INITSTATE, action) => {
  switch (action.type) {
    case GET_MODULE_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case GET_MODULE_LIST:
          console.log("MOdule_SUCCESS   =====>", action.payload);
          return {
            ...state,
            ModuleData: action.payload.data.data,
            ModuleListSize: action.payload.data.size,
            TotalModuleListData: action.payload.data.totalData,
            CurrentPage: action.payload.data.page,
          };
      }
    case GET_MODULE_LIST_ERROR:
      switch (action.payload.actionType) {
        case GET_MODULE_LIST:
          return {
            ...state,
            error: action.payload,
          };

        default:
          return { ...state };
      }

    // Get Single Array
    case UPDATE_MODULE_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case UPDATE_MODULE_LIST:
          return {
            ...state,
            SingleModuleData: action.payload.data,
          };
      }
    case UPDATE_MODULE_LIST_ERROR:
      switch (action.payload.actionType) {
        case UPDATE_MODULE_LIST:
          // console.log("CREATE_GROUP_SUCCESS =====>", action.payload);
          return {
            ...state,
            error: action.payload,
          };

        default:
          return { ...state };
      }

    case ADD_MODULE_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case ADD_MODULE_LIST:
          return {
            ...state,
            ModuleData: action.payload.data,
          };
      }
    case ADD_MODULE_LIST_ERROR:
      switch (action.payload.actionType) {
        case ADD_MODULE_LIST:
          // console.log("CREATE_GROUP_SUCCESS =====>", action.payload);
          return {
            ...state,
            error: action.payload,
          };

        default:
          return { ...state };
      }

    case DELETE_MODULE_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case DELETE_MODULE_LIST:
          return {
            ...state,
            ModuleData: action.payload.data,
          };
      }
    case DELETE_MODULE_LIST_ERROR:
      switch (action.payload.actionType) {
        case DELETE_MODULE_LIST:
          // console.log("CREATE_GROUP_SUCCESS =====>", action.payload);
          return {
            ...state,
            error: action.payload,
          };

        default:
          return { ...state };
      }

    // Module Group
    case GET_MODULE_GROUP_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case GET_MODULE_GROUP_LIST:
          return {
            ...state,
            ModuleGroupData: action.payload.data.data,
            ModuleGroupListSize: action.payload.data.size,
            TotalModuleGroupListData: action.payload.data.totalData,
            CurrentPage: action.payload.data.page,
          };
      }
    case GET_MODULE_GROUP_LIST_ERROR:
      switch (action.payload.actionType) {
        case GET_MODULE_GROUP_LIST:
          // console.log("CREATE_GROUP_SUCCESS =====>", action.payload);
          return {
            ...state,
            error: action.payload,
          };

        default:
          return { ...state };
      }

    // Get Single Array
    case UPDATE_MODULE_GROUP_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case UPDATE_MODULE_GROUP_LIST:
          return {
            ...state,
            SingleModuleGroupData: action.payload.data,
          };
      }
    case UPDATE_MODULE_GROUP_LIST_ERROR:
      switch (action.payload.actionType) {
        case UPDATE_MODULE_GROUP_LIST:
          // console.log("CREATE_GROUP_SUCCESS =====>", action.payload);
          return {
            ...state,
            error: action.payload,
          };

        default:
          return { ...state };
      }

    case ADD_MODULE_GROUP_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case ADD_MODULE_GROUP_LIST:
          return {
            ...state,
            ModuleData: action.payload.data,
          };
      }
    case ADD_MODULE_GROUP_LIST_ERROR:
      switch (action.payload.actionType) {
        case ADD_MODULE_GROUP_LIST:
          // console.log("CREATE_GROUP_SUCCESS =====>", action.payload);
          return {
            ...state,
            error: action.payload,
          };

        default:
          return { ...state };
      }

    case DELETE_MODULE_GROUP_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case DELETE_MODULE_GROUP_LIST:
          console.log("Delete Module Group =====>", action.payload.data);
          return {
            ...state,
            ModuleData: action.payload.data,
          };
      }
    case DELETE_MODULE_GROUP_LIST_ERROR:
      switch (action.payload.actionType) {
        case DELETE_MODULE_GROUP_LIST:
          // console.log("CREATE_GROUP_SUCCESS =====>", action.payload);
          return {
            ...state,
            error: action.payload,
          };

        default:
          return { ...state };
      }

    // Search Api Redcer
    case GET_SEARCH_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case GET_SEARCH_LIST:
          return {
            ...state,
            SearchModuleData: action.payload.data,
          };
      }
    case GET_SEARCH_LIST_ERROR:
      switch (action.payload.actionType) {
        case GET_SEARCH_LIST:
          // console.log("CREATE_GROUP_SUCCESS =====>", action.payload);
          return {
            ...state,
            error: action.payload,
          };

        default:
          return { ...state };
      }

    // Search Group Api

    case GET_SEARCH_GROUP_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case GET_SEARCH_GROUP_LIST:
          return {
            ...state,
            SearchGroupModuleData: action.payload.data,
          };
      }
    case GET_SEARCH_GROUP_LIST_ERROR:
      switch (action.payload.actionType) {
        case GET_SEARCH_GROUP_LIST:
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

export default Module;
