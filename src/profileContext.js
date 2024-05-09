import React, { createContext, useReducer, useContext, useCallback } from "react";
import axios from "axios";

// Requests
const GET_PROFILE_REQUEST = "GET_PROFILE_REQUEST";
const GET_PROFILES_REQUEST = "GET_PROFILES_REQUEST";
const CREATE_UPDATE_PROFILE_REQUEST = "CREATE_UPDATE_PROFILE_REQUEST";
const DELETE_EXPERIENCE_REQUEST = "DELETE_EXPERIENCE_REQUEST";
const DELETE_EDUCATION_REQUEST = "DELETE_EDUCATION_REQUEST";
const GET_PROFILE_BY_ID_REQUEST = "GET_PROFILE_BY_ID_REQUEST";

// Successes
const GET_PROFILE_SUCCESS = "GET_PROFILE_SUCCESS";
const GET_PROFILES_SUCCESS = "GET_PROFILES_SUCCESS";
const CREATE_UPDATE_PROFILE_SUCCESS = "CREATE_UPDATE_PROFILE_SUCCESS";
const DELETE_EXPERIENCE_SUCCESS = "DELETE_EXPERIENCE_SUCCESS";
const DELETE_EDUCATION_SUCCESS = "DELETE_EDUCATION_SUCCESS";
const GET_PROFILE_BY_ID_SUCCESS = "GET_PROFILE_BY_ID_SUCCESS";

// Failures
const GET_PROFILE_FAIL = "GET_PROFILE_FAIL";
const GET_PROFILES_FAIL = "GET_PROFILES_FAIL";
const CREATE_UPDATE_PROFILE_FAIL = "CREATE_UPDATE_PROFILE_FAIL";
const DELETE_EXPERIENCE_FAIL = "DELETE_EXPERIENCE_FAIL";
const DELETE_EDUCATION_FAIL = "DELETE_EDUCATION_FAIL";
const GET_PROFILE_BY_ID_FAIL = "GET_PROFILE_BY_ID_FAIL";

// Clear or additional actions
const GET_PROFILE_BY_ID_CLEAR = "GET_PROFILE_BY_ID_CLEAR";

// Initial state for profiles
const initialState = {
  profile: null,
  profiles: [],
  loading: false,
  error: null,
};

// Reducer for handling profile actions
const profileReducer = (state, action) => {
  switch (action.type) {
    case GET_PROFILE_REQUEST:
    case GET_PROFILES_REQUEST:
    case CREATE_UPDATE_PROFILE_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_PROFILE_SUCCESS:
    case GET_PROFILE_BY_ID_SUCCESS:
    case CREATE_UPDATE_PROFILE_SUCCESS:
      return { ...state, profile: action.payload, loading: false };
    case GET_PROFILES_SUCCESS:
      return { ...state, profiles: action.payload, loading: false };
    case GET_PROFILE_FAIL:
    case GET_PROFILES_FAIL:
    case GET_PROFILE_BY_ID_FAIL:
    case CREATE_UPDATE_PROFILE_FAIL:
      return { ...state, error: action.payload, loading: false, profile: null };
    default:
      return state;
  }
};

// Create context
const ProfileContext = createContext();

// Provider component
export const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, initialState);

  // Profile action creators as context methods
  const getCurrentProfile = useCallback(async () => {
    dispatch({ type: GET_PROFILE_REQUEST });
    try {
      const { data } = await axios.get("http://localhost:5000/api/profile/me");
      dispatch({ type: GET_PROFILE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_PROFILE_FAIL, payload: error.response?.data.msg || error.message });
    }
  }, []);

  const getAllProfiles = useCallback(async () => {
    dispatch({ type: GET_PROFILES_REQUEST });
    try {
      const { data } = await axios.get("http://localhost:5000/api/profile");
      dispatch({ type: GET_PROFILES_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_PROFILES_FAIL, payload: error.response?.data.msg || error.message });
    }
  }, []);

  const getProfileById = useCallback(async (id) => {
    dispatch({ type: GET_PROFILE_BY_ID_REQUEST });
    try {
      const { data } = await axios.get(`http://localhost:5000/api/profile/user/${id}`);
      dispatch({ type: GET_PROFILE_BY_ID_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_PROFILE_BY_ID_FAIL, payload: error.response?.data.msg || error.message });
    }
  }, []);

  const createUpdateProfile = useCallback(async (profileData) => {
    dispatch({ type: CREATE_UPDATE_PROFILE_REQUEST });
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post("http://localhost:5000/api/profile", profileData, config);
      dispatch({ type: CREATE_UPDATE_PROFILE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: CREATE_UPDATE_PROFILE_FAIL, payload: error.response?.data.errors || error.message });
    }
  }, []);

  // Value provided to the context
  const value = {
    ...state,
    getCurrentProfile,
    getAllProfiles,
    getProfileById,
    createUpdateProfile,
  };

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};

// Hook to use the profile context
export const useProfile = () => useContext(ProfileContext);
