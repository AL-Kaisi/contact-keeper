import React, { useReducer } from "react";
import AlertReducer from "./AlertReducer";
import AlertContext from "./AlertContext";
import uuid from "uuid";

import { SET_ALERT, REMOVE_ALERT } from "../types";

const AlertState = (props) => {
  const initalState = [];

  const [state, dispatch] = useReducer(AlertReducer, initalState);

  //set Alert
  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuid.v4();
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id },
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
