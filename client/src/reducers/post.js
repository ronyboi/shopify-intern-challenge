import {
  GET_POSTS,
  DELETE_POST,
  ADD_POST,
  GET_POST,
} from "../components/types";

const initialState = {
  posts: [],
  post: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
      };
    default:
      return state;
  }
}
