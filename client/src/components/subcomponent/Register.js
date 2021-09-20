import { loadUser } from "./Login";
import axios from "axios";
import { REGISTER_FAIL, REGISTER_SUCCESS } from "../types";

export const register =
  ({ name, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ name, password });

    try {
      const res = await axios.post("/api/users", body, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;

      console.log(errors);

      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };
