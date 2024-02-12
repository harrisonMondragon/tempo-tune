import "./LandingPage.css";
import { Link } from "react-router-dom";

// Components
import NavBar from "../NavBar/NavBar";

const LandingPage = () => {
    return (
        <div>
            <NavBar />
            <section className="login-section">
                <h2>You're gonna have to login to spotify below pls</h2>
                <Link to="/input-page">
                    <button>Login</button>
                </Link>
            </section>
        </div>
    );
};

export default LandingPage;