/*  ******************************  */
/* ********  NoMatch ******* */
/*  ******************************  */

export function NoMatch() {
    return (
        <div role="alert" aria-labelledby="error-heading" aria-describedby="error-description">
            <h1 id="error-heading" className="title is-1 has-text-danger">Erreur 404</h1>
            <p id="error-description" className="has-text-danger">Cette page n'existe pas</p>
        </div>
    );
}