import { useReducer } from "react";
import {
  UPDATE_PERSONAL_POSTS,
  UPDATE_PROFILE_PIC
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_PERSONAL_POSTS:
      return {
        ...state,
        posts: [...action.posts],
      };
    case UPDATE_PROFILE_PIC:
      return {
        ...state,
        profilePic: action.profilePic
      };
    default:
      return state;
  }
};

export function useProfileReducer(initialState) {
  return useReducer(reducer, initialState)
}