import {
  LOGIN_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  CLEAR_PROFILE,
  LOGOUT,
} from "../types";
import axios from "axios";
import { useState } from "react";
import setAuthToken from "../../utils/setAuthToken";

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    console.log("hello");
    const res = await axios.get("api/auth");
    console.log("hello over");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    console.log("auth errror from load user component!");
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const login = (name, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  };

  const body = JSON.stringify({
    name,
    password,
  });

  try {
    const res = await axios.post("/api/auth", body, config);

    // const [res, setRes] = useState();

    // axios
    //   .post("/api/auth", body, config)
    //   .then((res) => {
    //     console.log(res);
    //     setRes(res);
    //   })
    //   .catch((err) => console.log("Login: ", err));

    console.log("HIHIHIHIHIHIHIH");

    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ name: name, password: password }),
    // };

    // const res = await fetch("/api/auth", requestOptions);

    // console.log("hi??????");
    // console.log(res.data);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    console.log("hi");
    console.log(err.message);
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
