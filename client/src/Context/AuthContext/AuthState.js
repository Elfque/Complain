import { useReducer } from "react";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import setAuthToken from "../../utils/SetAuthToken";
import { AUTH_FAILED, LOGOUT, USER_LOADED, LOGIN_SUCCESS } from "../type";

const AuthState = (prop) => {
  const initialState = {
    user: null,
    token: localStorage.getItem("token"),
    isAuthenticated: false,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const loadUser = async () => {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }

    // try {
    //   const res = await axios.get("http://localhost:4000/api/auth", {
    //     headers: {
    //       authorize: localStorage.getItem("token"),
    //     },
    //   });
    //   dispatch({ type: USER_LOADED, payload: res.data });
    // } catch (err) {
    //   dispatch({ type: AUTH_FAILED });
    // }
  };

  // REGISTER/LOGIN FAILED
  const authError = (error) =>
    dispatch({ type: AUTH_FAILED, payload: error.response.data.msg });

  // LOGIN SUCCESS / TOKEN GENERATED
  const authSuccess = (res) => {
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    loadUser();
  };

  const logOutUser = () => {
    dispatch({ type: LOGOUT });
  };

  const values = {
    token: state.token,
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    authSuccess,
    authError,
    loadUser,
    logOutUser,
  };

  return (
    <AuthContext.Provider value={values}>{prop.children}</AuthContext.Provider>
  );
};

export default AuthState;
