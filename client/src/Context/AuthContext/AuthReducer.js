import {
  LOGIN_SUCCESS,
  REGISTER_FAILED,
  LOGIN_FAILED,
  AUTH_FAILED,
  LOGOUT,
  USER_LOADED,
  CLEAR_ERRORS,
} from "../type";

export default (state, action) => {
  switch (action.type) {
    // case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        token: localStorage.getItem("token"),
        user: action.payload.user,
      };
      break;
    case REGISTER_FAILED:
    case AUTH_FAILED:
    case LOGIN_FAILED:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
      break;
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload.user,
      };
      break;
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
      break;
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
      break;

    default:
      return state;
      break;
  }
};
