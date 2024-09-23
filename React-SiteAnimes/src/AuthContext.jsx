/*  ******************************  */
/* ********  AuthContext ******* */
/*  ******************************  */
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthComponent = () => {
    return useContext(AuthContext);
};

export function AuthProvider({ children }) {
    /* Lors du chargement du component App, si un jeton est présent dans SessionStorage, 
    placez la valeur de ce jeton dans le contexte global. Ainsi, un rechargement de page 
    (touche F5) ne fait pas perdre le jeton à l'application. */
    const [token, setToken] = useState(sessionStorage.getItem("token") || null);


    const updateToken = (newToken) => {
        sessionStorage.setItem("token", newToken);
        setToken(newToken);
    };

    const removeToken = () => {
        sessionStorage.removeItem("token");
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, updateToken, removeToken }}>
            {children}
        </AuthContext.Provider>
    );
}
