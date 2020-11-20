import axiosDefault from "../helpers/axiosDefault";
import axios from "axios";
import {
  REGISTER,
  LOGIN,
  LOGOUT,
  ERROR_LOGIN,
  CLEAR_ERROR,
} from "../reducers/types";

export const register = (data) => async (dispatch) => {
  try {
    const res = await axios.post("/api/createuser", data);
    
    localStorage.setItem("token", res.data.token);
    axiosDefault(res.data.token);
    dispatch({ type: REGISTER, payload: res.data.user,token:res.data.token });
  } catch (error) {
    dispatch({ type: ERROR_LOGIN, payload: error.response?.data.error });
  }
};

export const login = (data) => async (dispatch) => {
  try {
    const res = await axios.post("/api/auth/login", data);
    localStorage.setItem("token", res.data.token);
    axiosDefault(res.data.token);
    dispatch({ type: LOGIN, payload: res.data });
  } catch (error) {
    dispatch({ type: ERROR_LOGIN, payload: error.response?.data.error });
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  return {
    type: LOGOUT,
  };
};

export const loadUser = (token) => async (dispatch) => {
  try {
    const res = await axios.get("/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    axiosDefault(token);
    dispatch({ type: LOGIN, payload: { token, user: res.data.data } });
  } catch (error) {
    dispatch({
      type: ERROR_LOGIN,
      payload: "Please check your email/password",
    });
  }
};

export const clearError = () => {
  return {
    type: CLEAR_ERROR,
  };
};
