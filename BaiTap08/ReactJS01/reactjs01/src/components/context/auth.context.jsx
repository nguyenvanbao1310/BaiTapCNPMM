import { createContext, useState, useContext } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  user: {
    _id: null,
    email: "",
    name: "",
  },
  appLoading: true,
});

export const AuthWrapper = (props) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: {
      _id: null,
      email: "",
      name: "",
    },
  });

  const [appLoading, setAppLoading] = useState(true);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        appLoading,
        setAppLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

// ✅ thêm hook này
export const useAuth = () => useContext(AuthContext);
