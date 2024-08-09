/*  ******************************  */
/* ********  Details ******* */
/*  ******************************  */

import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { svrURL } from "./constants";

function ActorCard({ role }) {
    return (
        <div className="column is-narrow mr-1" style={{ width: "220px" }} role="listitem">
            <div className="card" style={{ width: "100%", height: "310px" }} role="listitem">
                <div className="card-image">
                    <figure className="image is-square">
                        <img src={role.imgURL} alt={`${role.name} as ${role.character}`} />
                    </figure>
                </div>
                <div className="card-content">
                    <p className="title is-5 has-text-centered mb-7">{role.name}</p>
                    <p className="subtitle is-6 has-text-centered">{role.character}</p>
                </div>
            </div>
        </div>
    );
}

function ActorList({ roles }) {
    return (
        <section style={{ marginTop: "20px", display: "flex", overflowX: "auto", overflowY: "hidden" }} role="region" aria-label="Liste des acteurs">
            <div className="conteneur-scroll-horizontal" style={{ display: "flex" }}>
                {roles.map((role) => (
                    <ActorCard key={role.roleId} role={role} />
                ))}
            </div>
        </section>
    );
}

function SeasonCard({ season }) {
    return (
        <Link to={`/season/${season.seasonId}`} className="card" style={{ width: "320px", marginRight: "20px", marginBottom: "20px" }} role="listitem">
            <div className="card-image">
                <figure className="image is-square">
                    <img src={season.imgURL} alt={`Saison ${season.number}`} />
                </figure>
            </div>
            <div className="card-content" style={{ padding: "1rem" }}>
                <p className="title is-4 has-text-centered mb-5">Saison {season.number}</p>
                <p className="subtitle is-5 has-text-centered">{season.episodeCount} épisodes</p>
            </div>
        </Link>
    );
}

function SeasonList({ seasons }) {
    return (
        <section style={{ marginTop: "20px", display: "flex", overflowX: "auto", overflowY: "hidden" }} role="region" aria-label="Liste des saisons">
            <div className="conteneur-scroll-horizontal" style={{ display: "flex" }}>
                {seasons.map((season) => (
                    <SeasonCard key={season.seasonId} season={season} />
                ))}
            </div>
        </section>
    );
}

export function Details() {
    const { tvShowId } = useParams();
    const [details, setDetails] = useState(null);
    const [error, setError] = useState("");
    const audioRef = useRef(null);
    const errorMessageRef = useRef(null);

    useEffect(() => {
        fetch(`${svrURL}/tvshow?tvshowId=${tvShowId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Échec de la récupération des détails de la série télévisée");
                }
                return response.json();
            })
            .then((data) => {
                setDetails(data);
            })
            .catch((error) => {
                setError("Erreur lors de la récupération des détails de la série télévisée");
                console.error("Erreur lors de la récupération des détails de la série télévisée:", error);
            });
    }, [tvShowId]);

    useEffect(() => {
        if (details && details.audioURL) {
            audioRef.current.play(); // Démarre automatiquement la lecture audio
        }
    }, [details]);

    useEffect(() => {
        if (errorMessageRef.current) {
            errorMessageRef.current.focus();
        }
    }, [error]);

    if (error) {
        return <div role="alert" ref={errorMessageRef} tabIndex="0">{error}</div>;
    }

    if (!details) {
        return <div>Chargement...</div>;
    }

    return (
        <div className="container" role="region" aria-label="Détails de la série">
            <div className="columns">
                <div className="column is-one-third mt-4">
                    <img src={details.imgURL} alt={details.title} />
                </div>
                <div className="column is-8">
                    <div className="columns is-mobile is-multiline">
                        <div className="column is-12">
                            <h1 className="title mt-4">{details.title}</h1>
                        </div>
                        <div className="column is-12">
                            <h2 className="subtitle">{details.year}</h2>
                        </div>
                        <div className="column is-2">
                            <span className="mr-5">{details.episodeCount} épisodes</span>
                        </div>
                        <div className="column is-2">
                            <span className="mr-5 align-top">{details.tvParentalGuideline}</span>
                        </div>
                        <div className="column is-8 has-text-right">
                            <span>
                                {details.genres.map((genre) => genre.name).join(", ")}
                            </span>
                        </div>
                        <div className="column is-12">
                            <span>Studio {details.studio.name}</span>
                        </div>
                        <div className="column is-12 has-text-justified">
                            <span style={{ marginRight: "2.5%" }}>{details.plot}</span>
                        </div>
                        <div className="column is-12">
                            <audio ref={audioRef} controls src={details.audioURL} aria-label="Lecture audio" className="mt-5">
                                Votre navigateur ne supporte pas l'audio.
                            </audio>
                        </div>
                    </div>
                </div>
            </div>
            <ActorList roles={details.roles} />
            <SeasonList seasons={details.seasons} />
        </div>
    );
}