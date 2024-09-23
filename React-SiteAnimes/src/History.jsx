/*  ******************************  */
/* ********  History ******* */
/*  ******************************  */
import { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { Pagination } from "./Pagination";
import { svrURL } from "./constants";

function History() {
    const [historyData, setHistoryData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState("");
    const { token } = useContext(AuthContext);
    const errorMessageRef = useRef(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await fetch(`${svrURL}/user/history`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setHistoryData(data);
                } else {
                    setError("Failed to fetch history data");
                    console.error("Failed to fetch history data:", response.statusText);
                }
            } catch (error) {
                setError("Error fetching history data");
                console.error("Error fetching history data:", error);
            }
        };

        fetchHistory();
    }, [token]);

    useEffect(() => {
        if (errorMessageRef.current) {
            errorMessageRef.current.focus();
        }
    }, [error]);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div role="region" aria-label="History">
            <h2 className="title is-2 has-text-centered">History</h2>
            {error && (
                <div role="alert" ref={errorMessageRef} tabIndex="0" className="notification is-danger">
                    {error}
                </div>
            )}
            {historyData && (
                <div>
                    <div className="columns is-multiline is-mobile" role="list">
                        {historyData
                            .slice((currentPage - 1) * 6, currentPage * 6)
                            .map((item, index) => (
                                <div key={index} className="column is-4-desktop is-4-tablet is-6-mobile" role="listitem">
                                    <Link to={`/details/${item.tvshowId}`} aria-label={`Details of ${item.tvshowTitle}`}>
                                        <div className="card large">
                                            <div className="card-image">
                                                <figure className="image is-4by3">
                                                    <img src={item.imgURL} alt={`${item.tvshowTitle} poster`} />
                                                </figure>
                                            </div>
                                            <div className="card-content">
                                                <div className="media">
                                                    <div className="media-content">
                                                        <p className="title is-4 has-text-centered has-text-link" style={{ margin: "5px 0" }}>{item.tvshowTitle}</p>
                                                        <p className="title is-4 has-text-centered has-text-link" style={{ margin: "5px 0" }}>Season {item.seasonNumber}</p>
                                                        <p className="title is-4 has-text-centered has-text-link" style={{ margin: "5px 0" }}>{item.episodeTitle}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                    </div>
                    <Pagination
                        showsPerPage={6}
                        totalShows={historyData.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                </div>
            )}
        </div>
    );
}

export default History;
