/*  ******************************  */
/* ********  Season ******* */
/*  ******************************  */

import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Pagination } from "./Pagination";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { svrURL } from "./constants";

function Episode({ episode, watchedEpisodes }) {
    const isWatched = watchedEpisodes.some(watchedEpisode => watchedEpisode.episodeId === episode.episodeId);

    /* Episode deja visionner par lutilisateur*/
    const episodeStyle = {
        filter: isWatched ? "grayscale(100%) blur(2px)" : "none", // Applique un effet de flou gris si l'épisode est déjà visionné
    };

    return (
        <div className="column is-3-desktop is-4-tablet is-6-mobile" role="listitem">
            <Link to={`/JouerEpisode/${episode.episodeId}`} style={episodeStyle}>
                <div className="card medium" style={episodeStyle}>
                    <div className="card-image">
                        <figure className="image is-4by3">
                            <img src={episode.imgURL} alt={`Image de :  ${episode.title}`} />
                        </figure>
                    </div>
                    <div className="card-content">
                        <div className="media">
                            <div className="media-content">
                                <div>
                                    <p className="title is-4 has-text-centered mb-2">{episode.title}</p>
                                </div>
                                <div>
                                    <p className="subtitle is-5 has-text-centered mb-1">{episode.number}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

function Season() {
    const { seasonId } = useParams();
    const [seasonData, setSeasonData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const { token } = useContext(AuthContext);
    const [watchedEpisodes, setWatchedEpisodes] = useState([]);

    useEffect(() => {
        const fetchSeasonData = async () => {
            try {
                const response = await fetch(`${svrURL}/episodes?seasonId=${seasonId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setSeasonData(data);
                } else {
                    console.error("Failed to fetch season data:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching season data:", error);
            }
        };

        const fetchWatchedEpisodes = async () => {
            if (token) { // Vérifie si le token est présent avant de faire la requête
                try {
                    const response = await fetch(`${svrURL}/user/history`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setWatchedEpisodes(data);
                    } else {
                        console.error("Failed to fetch watched episodes:", response.statusText);
                    }
                } catch (error) {
                    console.error("Error fetching watched episodes:", error);
                }
            }
        };

        fetchSeasonData();
        fetchWatchedEpisodes();
    }, [seasonId, token]);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div role="list">
            {seasonData && (
                <div>
                    <h4 className="title is-4 has-text-centered mb-2">{seasonData.tvshowTitle}</h4>
                    <h4 className="title is-4 has-text-centered"> {seasonData.seasonNumber}</h4>
                    <div className="columns is-multiline is-mobile">
                        {seasonData.episodes
                            .slice((currentPage - 1) * 8, currentPage * 8)
                            .map((episode) => (
                                <Episode
                                    key={episode.episodeId}
                                    episode={episode}
                                    watchedEpisodes={watchedEpisodes}
                                />
                            ))}
                    </div>
                    <Pagination
                        showsPerPage={8}
                        totalShows={seasonData.episodes.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                </div>
            )}
        </div>
    );
}

export default Season;
