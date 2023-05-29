import { useReducer } from "react";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import setAuthToken from "../../utils/SetAuthToken";
import {
  AUTH_FAILED,
  LOGOUT,
  USER_LOADED,
  LOGIN_SUCCESS,
  GET_COMPLAINS,
  GET_COMPLAIN,
} from "../type";
import axios from "axios";

const AuthState = (prop) => {
  const initialState = {
    user: null,
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    complains: [],
    complain: {},
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // GET USERS COMPLAINS
  const getComplains = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/complains");

      dispatch({ type: GET_COMPLAINS, payload: res.data });
    } catch (error) {
      console.log("failing");
      console.log(error.response.data.msg);
    }
  };

  // GET ONE COMPLAIN
  const getComplain = async (id) => {
    try {
      const res = await axios.get(`http://localhost:4000/api/complains/${id}`);

      dispatch({ type: GET_COMPLAIN, payload: res.data.complain });
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  // SEND MESSAGE
  const sendMessage = async (id, formData) => {
    try {
      const res = await axios.patch(
        `http://localhost:4000/api/complains/${id}`,
        formData
      );

      dispatch({ type: GET_COMPLAIN, payload: res.data.newCom });
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  // GET ADMIN COMPLAIN
  const getAdminComplains = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/adminComplains");
      console.log("admin", res);

      dispatch({ type: GET_COMPLAINS, payload: res.data });
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const loadUser = async () => {
    if (state.token) {
      setAuthToken(localStorage.getItem("token"));
    }

    try {
      const res = await axios.get("http://localhost:4000/api/auth");

      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (err) {
      dispatch({ type: AUTH_FAILED });
    }
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
    complains: state.complains,
    complain: state.complain,
    isAuthenticated: state.isAuthenticated,
    authSuccess,
    authError,
    loadUser,
    logOutUser,
    getAdminComplains,
    getComplains,
    getComplain,
    sendMessage,
  };

  return (
    <AuthContext.Provider value={values}>{prop.children}</AuthContext.Provider>
  );
};

export default AuthState;
