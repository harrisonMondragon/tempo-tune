import "./LandingPage.css";

// Components and scripts
import NavBar from "../NavBar/NavBar";
import {authenticateUser} from "../../scripts/auth";

const LandingPage = () => {
    return (
        <div>
            <NavBar />
            <section className="login-section">
                <h2>You're gonna have to login to spotify below pls</h2>
                <button onClick={authenticateUser}>Login</button>
            </section>
        </div>
    );
};

export default LandingPage;