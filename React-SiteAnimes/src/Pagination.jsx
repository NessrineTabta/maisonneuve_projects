/*  ******************************  */
/* ********  Pagination  ******* */
/*  ******************************  */

export function Pagination({ showsPerPage, totalShows, paginate, currentPage, setShowsPerPage }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalShows / showsPerPage); i++) {
        pageNumbers.push(i);
    }

    const changementPages = (e) => {
        const selectedShowsPerPage = parseInt(e.target.value, 10);
        setShowsPerPage(selectedShowsPerPage);
        paginate(1); 
    };


    return (
        <nav role="navigation" aria-label="pagination">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <ul className="pagination-list" style={{ textAlign: "left", margin: "0" }} role="list">
                        {pageNumbers.map((number) => (
                            <li key={number} role="listitem">
                                <button
                                    className={`pagination-link ${number === currentPage ? "is-current" : ""}`}
                                    onClick={() => paginate(number)}
                                    aria-label={`Go to page ${number}`}
                                    aria-current={number === currentPage ? "page" : undefined}
                                >
                                    {number}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <button
                        className="pagination-previous"
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        aria-label="Previous page"
                    >
                        <span aria-hidden="true">&lt;</span>
                    </button>
                    <button
                        className="pagination-next"
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === Math.ceil(totalShows / showsPerPage)}
                        aria-label="Next page"
                    >
                        <span aria-hidden="true">&gt;</span>
                    </button>
                </div>
            </div>
            <div style={{ textAlign: "center", marginTop: "1rem" }}>
                <div className="select">
                    <select
                        value={showsPerPage}
                        onChange={changementPages}
                        aria-label="Shows par page selection"
                        title="Shows par page selection"
                    >
                        {[4, 8, 12, 16].map((number) => (
                            <option key={number} value={number}>
                                {number}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

        </nav>
    );
}
