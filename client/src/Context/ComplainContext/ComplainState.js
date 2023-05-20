import { useReducer } from "react";
import ComplainContext from "./ComplainContext";
import ComplainReducer from "./ComplainReducer";

const ComplainState = (prop) => {
  const initialState = {
    complain: [],
  };

  const [state, dispatch] = useReducer(ComplainReducer, initialState);

  const values = {
    complain: state.complain,
  };

  return (
    <ComplainContext.Provider value={values}>
      {prop.children}
    </ComplainContext.Provider>
  );
};

export default ComplainState;
