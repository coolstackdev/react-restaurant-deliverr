import React, { useReducer, createContext, useContext } from "react";

const initialState = {
  orders: [],
  error: null
};

export const AppContext = createContext({
  appState: initialState,
  dispatch: () => null,
  setOrders: () => null,
  addOrder: () => null,
  setError: () => null
});

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_ORDERS":
      return {
        ...state,
        orders: action.payload
      };
    case "ADD_ORDER":
      return {
        ...state,
        orders: [...state.orders, action.payload]
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export const AppStateProvider = (props) => {
  const [appState, dispatch] = useReducer(reducer, initialState);

  const setOrders = (payload) => {
    return dispatch({ type: "SET_ORDERS", payload });
  };

  const addOrder = (payload) => {
    return dispatch({ type: "ADD_ORDER", payload });
  };

  const setError = (payload) => {
    return dispatch({ type: "SET_ERROR", payload });
  };

  return (
    <AppContext.Provider
      value={{ appState, dispatch, setOrders, addOrder, setError }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export const useAppState = () => useContext(AppContext);
