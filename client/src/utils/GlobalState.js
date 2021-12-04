import React, { createContext, useContext } from "react";
import { useProfileReducer } from './reducers'

const ProfileContext = createContext();
const { Provider } = ProfileContext;

const ProfileProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useProfileReducer({
    profilePic: '',
    personalPosts: [],
    friendPost: []
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useProfileContext = () => {
  return useContext(ProfileContext);
};

export { ProfileProvider, useProfileContext };
