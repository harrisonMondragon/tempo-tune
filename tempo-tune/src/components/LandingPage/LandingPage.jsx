import "./LandingPage.css";

import { loginWithSpotifyClick } from "../../scripts/auth";

import NavBar from "../NavBar/NavBar";

const LandingPage = () => {
    return (
        <div>
            <NavBar />
            <section className="login-section">
                <h2>You're gonna have to login to spotify below pls</h2>
                <button onClick={loginWithSpotifyClick}>Login</button>
            </section>
        </div>
    );
};

export default LandingPage;