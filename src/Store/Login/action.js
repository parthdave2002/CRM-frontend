import  {
  INSERT_LOGIN,
  INSERT_LOGIN_SUCCESS,
  INSERT_LOGIN_ERROR,

  RESET_INSERT_LOGIN,
  RESET_INSERT_LOGIN_ERROR,
  RESET_INSERT_LOGIN_SUCCESS,

  LOGOUT,
  LOGOUT_ERROR,
  LOGOUT_SUCCESS,

  RESET_INSERT_LOGOUT,
  RESET_INSERT_LOGOUT_SUCCESS

} from "./actionType"
  
    export const insertlogin = (requserdata) => ({
      type: INSERT_LOGIN,
      payload: requserdata
    });
    
    export const insertloginSuccess = (actionType,data) => ({
      type: INSERT_LOGIN_SUCCESS,
      payload: {actionType,data},
    });
    
    export const insertloginFail = (actionType,error) => ({
      type: INSERT_LOGIN_ERROR,
      payload: {actionType,error},
    });

    // Reset Login
    export const resetinsertlogin = (requserdata) => ({
      type: RESET_INSERT_LOGIN,
      payload: requserdata
    });
    
    export const resetinsertloginSuccess = (actionType,data) => ({
      type: RESET_INSERT_LOGIN_SUCCESS,
      payload: {actionType,data},
    });

// Logout
    export const logout = (requserdata) => ({
      type: LOGOUT,
      payload: requserdata
    });
    
    export const logoutSuccess = (actionType,data) => ({
      type: LOGOUT_SUCCESS,
      payload: {actionType,data},
    });
    
    export const logoutFail = (actionType,error) => ({
      type: LOGOUT_ERROR,
      payload: {actionType,error},
    });

    // Reset LogOut
    export const resetinsertlogout = (requserdata) => ({
      type: RESET_INSERT_LOGOUT,
      payload: requserdata
    });
    
    export const resetinsertLogoutSuccess = (actionType,data) => ({
      type: RESET_INSERT_LOGOUT_SUCCESS,
      payload: {actionType,data},
    });