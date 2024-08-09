/*  ******************************  */
/* ********     JouerEpisode    ******* */
/*  ******************************  */
import { useState, useEffect, useContext, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { svrURL } from "./constants";

function JouerEpisode() {
    const { episodeId } = useParams();
    const [episodeData, setEpisodeData] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [autoplay, setAutoplay] = useState(false);
    const { token } = useContext(AuthContext);
    const errorMessageRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!token) {
                setErrorMessage("Vous devez vous connecter pour accéder à cette page");
                return;
            }
            try {
                const response = await fetch(`${svrURL}/viewepisode?episodeId=${episodeId}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setEpisodeData(data);
                    setAutoplay(true);
                } else if (response.status === 401) {
                    console.log("Mauvaise authentification");
                    setErrorMessage("Vous devez vous connecter pour accéder à cette page");
                } else {
                    throw new Error("Failed to fetch episode data");
                }
            } catch (error) {
                console.error("Error fetching episode data:", error);
                setErrorMessage("Une erreur s'est produite lors de la récupération des données de l'épisode");
            }
        };

        fetchData();
    }, [episodeId, token]);

    useEffect(() => {
        if (errorMessageRef.current) {
            errorMessageRef.current.focus();
        }
    }, [errorMessage]);

    return (
        <div role="main" style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
            {errorMessage ? (
                <div
                    role="alert"
                    ref={errorMessageRef}
                    tabIndex="0"
                    style={{ border: "1px solid red", padding: "10px", textAlign: "center" }}
                >
                    <h1 className="title is-3">{errorMessage}</h1>
                    <Link to="/login" style={{ color: "blue" }}>Se connecter</Link>
                </div>
            ) : episodeData ? (
                <div>
                    <video
                        controls
                        autoPlay={autoplay}
                        style={{ width: "100%", height: "500px" }}
                        aria-label={`Video player for episode ${episodeData.title}`}
                    >
                        <source src={episodeData.videoURL} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            ) : (
                <p>Chargement de l'épisode...</p>
            )}
        </div>
    );
}

export default JouerEpisode;
