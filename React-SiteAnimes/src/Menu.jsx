/*  ******************************  */
/* ********  Menu ******* */
/*  ******************************  */

import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function Menu() {
    const { token, removeToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        removeToken();
        navigate("/");
    };

    return (
        <nav className="navbar is-link" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link className="navbar-item has-text-white" to="/" aria-label="TP2 Home">
                    TP2
                </Link>
            </div>

            <div className="navbar-menu">
                <div className="navbar-end">
                    {!token ? (
                        <>
                            <div className="navbar-item">
                                <Link to="/signup" className="has-text-white" aria-label="Sign Up">
                                    SignUp
                                </Link>
                            </div>
                            <div className="navbar-item">
                                <Link to="/login" className="has-text-white" aria-label="Login">
                                    Login
                                </Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="navbar-item">
                                <Link to="/history" className="has-text-white" aria-label="History">
                                    History
                                </Link>
                            </div>
                            <div className="navbar-item">
                                <Link to="/profile" className="has-text-white" aria-label="Profile">
                                    Profile
                                </Link>
                            </div>
                            <div className="navbar-item">
                                <button className="button is-link" onClick={handleLogout} aria-label="Logout">
                                    Logout
                                </button>
                            </div>
                        </>
                    )}
                    <div className="navbar-item">
                        <Link to="/about" className="has-text-white" aria-label="About">
                            About
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Menu;
