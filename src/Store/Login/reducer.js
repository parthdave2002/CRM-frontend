import {
  INSERT_LOGIN,
  INSERT_LOGIN_SUCCESS,
  INSERT_LOGIN_ERROR,

  RESET_INSERT_LOGIN,
  RESET_INSERT_LOGIN_SUCCESS,

  LOGOUT,
  LOGOUT_ERROR,
  LOGOUT_SUCCESS,

  RESET_INSERT_LOGOUT,
  RESET_INSERT_LOGOUT_SUCCESS,
  } from "./actionType";
  
  const INIT_STATE = {
    Logincode: [],
    LoginRoles:[],
    Logoutcode:[],
    error: {},
  };
  
  const Login = (state = INIT_STATE, action) => {
    switch (action.type) {
      case INSERT_LOGIN_SUCCESS:
        switch (action.payload.actionType) {
          case INSERT_LOGIN:
            return {
              ...state,
              Logincode: action.payload.data,
              LoginRoles: action.payload.data.roles,
            };
        }
      case INSERT_LOGIN_ERROR:
        switch (action.payload.actionType) {
          case INSERT_LOGIN:
            return {
              ...state,
              error: action.payload,
            };
  
          default:
            return { ...state };
        }

        // Reset Login
        case RESET_INSERT_LOGIN_SUCCESS:
          switch (action.payload.actionType) {
            case RESET_INSERT_LOGIN:
             
              return {
                ...state,
                Logincode: [],
              };
          }


        // Logout
        case LOGOUT_SUCCESS:
        switch (action.payload.actionType) {
          case LOGOUT:
            return {
              ...state,
              Logoutcode: action.payload.data,
            };
        }
      case LOGOUT_ERROR:
        switch (action.payload.actionType) {
          case LOGOUT:
            // console.log("CREATE_GROUP_SUCCESS =====>", action.payload);
            return {
              ...state,
              error: action.payload,
            };
  
          default:
            return { ...state };
        }

        // Reset Logout
        case RESET_INSERT_LOGOUT_SUCCESS:
          switch (action.payload.actionType) {
            case RESET_INSERT_LOGOUT:
             
              return {
                ...state,
                Logoutcode: [],
              };
          }
  
     
      default:
        return state;
    }
  };
  
  export default Login;