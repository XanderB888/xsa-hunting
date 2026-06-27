import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    
    const login = () => {
        setUser({ id: 1, username: 'Xander' });   // fake user for now
        };

    const logout = () => {
        setUser(null);
        };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;
export { useAuth };