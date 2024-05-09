import React, { createContext, useReducer, useContext, useCallback } from "react";
import axios from "axios";
import setAuthToken from "./utils/setAuthToken";

// Constants
const USER_REGISTER_REQUEST = "USER_REGISTER_REQUEST";
const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
const USER_REGISTER_FAIL = "USER_REGISTER_FAIL";
const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
const USER_LOGIN_FAIL = "USER_LOGIN_FAIL";
const USER_LOGOUT = "USER_LOGOUT";
const LOAD_USER_REQUEST = "LOAD_USER_REQUEST";
const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS";
const LOAD_USER_FAIL = "LOAD_USER_FAIL";
const UNLOAD_USER = "UNLOAD_USER";

// Initial state
const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: false,
  user: null,
  error: null,
};

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true };
    case LOAD_USER_REQUEST:
      return { ...state, loading: true };
    case USER_LOGIN_SUCCESS:
    case USER_REGISTER_SUCCESS:
      return { ...state, isAuthenticated: true, loading: false, token: action.payload };
    case LOAD_USER_SUCCESS:
      return { ...state, isAuthenticated: true, loading: false, user: action.payload };
    case USER_LOGIN_FAIL:
    case USER_REGISTER_FAIL:
    case LOAD_USER_FAIL:
      localStorage.removeItem("token");
      return { ...state, token: null, isAuthenticated: false, loading: false, user: null, error: action.payload };
    case USER_LOGOUT:
      return { ...state, token: null, isAuthenticated: false, loading: false, user: null };

    case UNLOAD_USER:
      localStorage.removeItem("token");
      return { ...state, token: null, isAuthenticated: false, loading: false, user: null };
    default:
      return state;
  }
};

// Context creation
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Action creators as methods
  const loadUser = useCallback(async () => {
    try {
      if (localStorage.getItem("token")) {
        setAuthToken(localStorage.token);
      }

      dispatch({ type: LOAD_USER_REQUEST });
      const { data } = await axios.get("http://localhost:5000/api/users/me");
      dispatch({ type: LOAD_USER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: LOAD_USER_FAIL, payload: error.response && error.response.data.errors ? error.response.data.errors : error.message });
    }
  }, []);

  const register = useCallback(
    async (name, email, password) => {
      dispatch({ type: USER_REGISTER_REQUEST });
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.post("http://localhost:5000/api/users", { name, email, password }, config);
        localStorage.setItem("token", data.token);
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data.token });

        // Optionally load the user right after registering
        loadUser();
      } catch (error) {
        dispatch({
          type: USER_REGISTER_FAIL,
          payload: error.response && error.response.data.errors ? error.response.data.errors : error.message,
        });
      }
    },
    [loadUser]
  );

  const login = useCallback(
    async (email, password) => {
      dispatch({ type: USER_LOGIN_REQUEST });
      try {
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post("http://localhost:5000/api/users/login", { email, password }, config);
        localStorage.setItem("token", data.token);
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data.token });
        loadUser();
      } catch (error) {
        console.log(error.response?.data.errors);
        dispatch({ type: USER_LOGIN_FAIL, payload: error.response?.data.errors || error.message });
      }
    },
    [loadUser]
  );

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    dispatch({ type: USER_LOGOUT });
  }, []);

  // Provider value
  const value = { ...state, login, register, logout, loadUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);
