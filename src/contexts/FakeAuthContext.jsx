import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();
const initialState = {
  user: null,
  isAuthenticate: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { user: action.payload, isAuthenticate: true };
    case "logout":
      return { ...state, user: null, isAuthenticate: false };
    default:
      throw new Error("Unknown action type");
  }
}

const FAKE_USER = {
  name: "Priyanshu",
  email: "priyanshubelwal463@gmail.com",
  password: "imandharm",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
function AuthProvider({ children }) {
  const [{ user, isAuthenticate }, dispatach] = useReducer(
    reducer,
    initialState
  );
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatach({ type: "login", payload: FAKE_USER });
  }

  function logout() {
    dispatach({ type: "logout" });
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticate, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
