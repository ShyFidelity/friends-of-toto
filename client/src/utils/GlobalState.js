import React, { createContext, useContext, useState } from "react";

const ProfileContext = createContext();
const { Provider } = ProfileContext;

const ProfileProvider = ({ value = [], ...props }) => {
  const [state, setState] = useState({
    profilePic: ''
  });

  return <Provider value={[state, setState]} {...props} />;
};

const useProfileContext = () => {
  return useContext(ProfileContext);
};

export { ProfileProvider, useProfileContext };
