/*  ******************************  */
/* ********     Home    ******* */
/*  ******************************  */

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { svrURL } from "./constants";
import { Pagination } from "./Pagination";

export function Home() {
    const [tvShows, setTvShows] = useState([]);
    const [filteredTvShows, setFilteredTvShows] = useState([]);
    const [filterTitle, setFilterTitle] = useState("");
    const [filterStudio, setFilterStudio] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showsPerPage, setShowsPerPage] = useState(() => {
        const saved = localStorage.getItem("showsPerPage");
        return saved ? parseInt(saved, 10) : 8;
    });
    const [studios, setStudios] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        localStorage.setItem("showsPerPage", showsPerPage);
    }, [showsPerPage]);

    useEffect(() => {
        fetch(`${svrURL}/tvshows`)
            .then((response) => response.json())
            .then((data) => {
                setTvShows(data);
                setFilteredTvShows(data);
            })
            .catch((error) => {
                setError("Erreur lors de la récupération des émissions de télévision");
                console.error("Erreur lors de la récupération des émissions de télévision:", error);
            });

        fetch(`${svrURL}/studios`)
            .then((response) => response.json())
            .then((data) => setStudios(data))
            .catch((error) => {
                setError("Erreur lors de la récupération des studios");
                console.error("Erreur lors de la récupération des studios:", error);
            });
    }, []);

    useEffect(() => {
        const filtered = tvShows.filter(
            (show) =>
                show.title.toLowerCase().includes(filterTitle.toLowerCase()) &&
                (filterStudio === "" || show.studio.name === filterStudio)
        );
        setFilteredTvShows(filtered);
        // Réinitialiser currentPage à 1 lorsque qu'un filtre est appliqué
        setCurrentPage(1);
    }, [filterTitle, filterStudio, tvShows]);

    const indexOfLastShow = currentPage * showsPerPage;
    const indexOfFirstShow = indexOfLastShow - showsPerPage;
    const currentShows = filteredTvShows.slice(indexOfFirstShow, indexOfLastShow);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            {error && <div role="alert">{error}</div>}

            <div className="field is-grouped is-grouped-centered m-5 " role="search">
                <div className="control is-inline-flex is-align-items-center">
                    <label htmlFor="title" className="label"><b>Title:</b></label>
                    <div className="input-container ml-2">
                        <input
                            id="title"
                            className="input is-low"
                            type="text"
                            value={filterTitle}
                            onChange={(e) => setFilterTitle(e.target.value)}
                            placeholder="Filtrer par titre"
                            aria-label="Filtrer par titre"
                        />
                    </div>
                </div>

                <div className="control is-inline-flex is-align-items-center">
                    <label htmlFor="studio" className="label"><b>Studio:</b></label>
                    <div className="select-container ml-2">
                        <span className="select is-low">
                            <select
                                id="studio"
                                value={filterStudio}
                                onChange={(e) => setFilterStudio(e.target.value)}
                                aria-label="Filtrer par studio"
                            >
                                <option value="">Tous les studios</option>
                                {studios.map((studio) => (
                                    <option key={studio.studioId} value={studio.name}>
                                        {studio.name}
                                    </option>
                                ))}
                            </select>
                        </span>
                    </div>
                </div>
            </div>

            <div id="tvShows" className="row columns is-multiline is-mobile" role="list">
                {currentShows.map((show) => (
                    <div key={show.tvshowId} className="column is-3-desktop is-4-tablet is-6-mobile" role="listitem">
                        <Link to={`/details/${show.tvshowId}`}>
                            <div className="card large" >
                                <div className="card-image" >
                                    <figure className="image is-square">
                                        <img src={show.imgURL} alt={show.title} aria-hidden="true" />
                                    </figure>
                                </div>
                                <div className="card-content">
                                    <div className="media">
                                        <div className="media-content">
                                            <div>
                                                <p className="title is-4 has-text-centered mb-4">{show.title}</p>
                                            </div>
                                            <div>
                                                <p className="subtitle is-6 has-text-centered mb-1"><b>Studio:</b> {show.studio.name}</p>
                                            </div>
                                            <div>
                                                <p className="subtitle is-6 has-text-centered m-1"><b>Genres:</b> {show.genres.map((genre) => genre.name).join(", ")}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            <Pagination
                showsPerPage={showsPerPage}
                totalShows={filteredTvShows.length}
                paginate={paginate}
                currentPage={currentPage}
                setShowsPerPage={setShowsPerPage}
            />
            <div style={{ display: "flex", justifyContent: "center" }}>e2067382</div>
        </div>
    );
}
