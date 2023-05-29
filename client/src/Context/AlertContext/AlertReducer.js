import { ADD_ALERT, CLEAR_ALERT } from "../type";

export default (state, action) => {
  switch (action.type) {
    case ADD_ALERT:
      return {
        ...state,
        alert: [...state.alert, action.payload],
      };
      break;
    case CLEAR_ALERT:
      return {
        ...state,
        alert: state.alert.filter((ale) => ale.id !== action.payload),
      };
      break;
  }
};
