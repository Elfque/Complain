import { useReducer } from "react";
import AlertContext from "./AlertContext";
import AlertReducer from "./AlertReducer";
import { ADD_ALERT, CLEAR_ALERT } from "../type";
import { v4 } from "uuid";

const AlertState = (prop) => {
  const initialState = {
    alert: [],
  };

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const addAlert = (text) => {
    const id = v4();

    dispatch({ type: ADD_ALERT, payload: { id: id, text: text } });

    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT, payload: id });
    }, 3000);
  };

  const values = {
    alert: state.alert,
    addAlert,
  };
  return (
    <AlertContext.Provider value={values}>
      {prop.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
