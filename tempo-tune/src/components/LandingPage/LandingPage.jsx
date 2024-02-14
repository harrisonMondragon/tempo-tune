import "./LandingPage.css";
// import { useNavigate } from "react-router-dom";

// Components and scripts
import NavBar from "../NavBar/NavBar";

const LandingPage = ( {handleAuth} ) => {

    // // const navigate = useNavigate();

    // const handleLogin = () => {
    //     handleAuth();
    //     // navigate("/input-page");
    // };

    return (
        <div>
            <NavBar />
            <section className="login-section">
                <h2>You're gonna have to login to spotify below pls</h2>
                <button onClick={handleAuth}>Login</button>
            </section>
        </div>
    );
};

export default LandingPage;