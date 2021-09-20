import { combineReducers } from "redux";
import auth from "../reducers/auth";
import post from "../reducers/post";

export default combineReducers({ auth, post });
