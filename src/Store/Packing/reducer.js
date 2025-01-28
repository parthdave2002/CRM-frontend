import {
  GET_PACKING_TYPE_LIST,
  GET_PACKING_TYPE_LIST_SUCCESS,
  GET_PACKING_TYPE_LIST_ERROR,
} from "./actionType";

const INIT_STATE = {
  Packingtypelist: [],
  PackingtypelistSize:0,
  TotalPackingtypeData:0,
  CurrentPage:1,
  error: {},
};

const PackingType = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PACKING_TYPE_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case GET_PACKING_TYPE_LIST:
  
          return {
            ...state,
            Packingtypelist: action.payload.data.data,
            PackingtypelistSize: action.payload.data.size,
            TotalPackingtypeData: action.payload.data.totalData,
            CurrentPage: action.payload.data.page,
          };
      }
    case GET_PACKING_TYPE_LIST_ERROR:
      switch (action.payload.actionType) {
        case GET_PACKING_TYPE_LIST:
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

export default PackingType;
