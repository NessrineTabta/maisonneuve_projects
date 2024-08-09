/*  ******************************  */
/* ********  Login ******* */
/*  ******************************  */
import { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { svrURL } from "./constants";

function Login() {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState([]);
    const { updateToken } = useContext(AuthContext);
    const navigate = useNavigate();
    const errorMessageRef = useRef(null);
    const [showDescription, setShowDescription] = useState(false); // Ajout de l'état pour contrôler l'affichage de la description

    useEffect(() => {
        if (errorMessage.length !== 0 && errorMessageRef && errorMessageRef.current) {
            errorMessageRef.current.focus();
            setShowDescription(true); // Afficher la description en cas d'erreur
        } else {
            setShowDescription(false); // Cacher la description si aucune erreur
        }
    }, [errorMessage]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password } = formData;
        const errors = {};

        if (!username.trim()) {
            errors.username = "Le nom d'utilisateur est obligatoire";
        }
        if (!password.trim()) {
            errors.password = "Le mot de passe est obligatoire";
        }

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            setErrorMessage(Object.values(errors));
            return;
        }

        
        try {
            const response = await fetch(`${svrURL}/auth/token`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });
            if (response.ok) {
                const data = await response.json();
                updateToken(data.token);
                navigate("/");
            } else {
                console.log("Mauvaise authentification");
                setErrorMessage(["Nom d'utilisateur ou mot de passe incorrect"]);
                
            }
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
            setErrorMessage(["Une erreur s'est produite lors de la connexion."]);
        }
    };

    const handleCancel = () => {
        navigate("/");
    };

    return (
        <div className="container">
            <h2 className="title is-3 has-text-centered m-2">Login</h2>
            {errorMessage.length !== 0 && (
                <div className="block" role="alert">
                    <div className="title is-3" tabIndex="0" ref={errorMessageRef}>
                        {errorMessage.map((error, index) => (
                            <span key={index} style={{border: "1px solid red", padding: "5px", margin: "5px"}}>{error}</span>
                        ))}
                    </div>
                   
                </div>
            )}
            <form onSubmit={handleSubmit} aria-labelledby="loginForm">
                <div className="field">
                    <label className="label" htmlFor="username">Nom d'utilisateur:</label>
                    <div className="control">
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className={`input ${errors.username ? "is-danger" : ""}`}
                            required
                            id="username"
                            aria-label="Nom d'utilisateur"
                            aria-describedby={errors.username ? "usernameError descriptionUsername" : "descriptionUsername"}
                            aria-required="true"
                        />
                    </div>
                    {errors.username && <p className="help is-danger" id="usernameError">{errors.username}</p>}
                    {/* Affichage de la description uniquement en cas d'erreur */}
                    {showDescription && (
                        <span id="descriptionUsername" className="is-visually-hidden">Le format du matricule est un "e" suivi de 7 chiffres.</span>
                    )}
                </div>
                <div className="field">
                    <label className="label" htmlFor="password">Mot de passe:</label>
                    <div className="control">
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`input ${errors.password ? "is-danger" : ""}`}
                            required
                            id="password"
                            aria-label="Mot de passe"
                            aria-describedby="passwordError"
                            aria-required="true"
                        />
                    </div>
                    {errors.password && <p className="help is-danger" id="passwordError">{errors.password}</p>}
                </div>
                <div className="field">
                    <div className="control">
                        <button type="submit" className="button is-primary m-1">Connexion</button>
                        <button type="button" className="button is-danger m-1" onClick={handleCancel}>Annuler</button>
                    </div>
                    {errors.auth && <p className="help is-danger">{errors.auth}</p>}
                </div>
            </form>
        </div>
    );
}

export default Login;
