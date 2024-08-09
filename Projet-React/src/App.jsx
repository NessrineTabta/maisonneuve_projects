
/*  ******************************  */
/* ********  App ******* */
/*  ******************************  */

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { NoMatch } from "./NoMatch.jsx";
import { Details } from "./Details";
import Menu from "./Menu";
import Login from "./Login";
import { AuthProvider } from "./AuthContext.jsx";
import Season from "./Season";
import JouerEpisode from "./JouerEpisode.jsx";
import History from "./History.jsx";

export function App() {
    return (
        <AuthProvider>
            <Router>
                <Menu/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/details/:tvShowId" element={<Details/>}/>
                    <Route path="/JouerEpisode/:episodeId" element={<JouerEpisode />} />
                    <Route path="/season/:seasonId" element={<Season />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/login" element={<Login />} /> 
                    <Route path="*" element={<NoMatch/>}/>
                </Routes>
            </Router>
        </AuthProvider>
    );
}
