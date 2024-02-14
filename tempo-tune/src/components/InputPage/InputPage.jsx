import "./InputPage.css";
import { useState } from 'react';

import { fetchProfile } from "../../scripts/fetch";

// Components
import BpmSelector from "../BpmSelector/BpmSelector";
import NavBar from "../NavBar/NavBar";

const InputPage = ( {accessToken} ) => {

    const [number, setNumber] = useState(0);

    const handleNumberChange = (newValue) => {
        setNumber(newValue);
    };

    // Perform authentication and retrieve access token
    const fetchUsername = async () => {
        const ahh = await fetchProfile(accessToken);
        console.log(ahh);
    };

    return (
        <div>
            <NavBar />
            <section className="input-section">
                <h2>Select the BPM you want</h2>
                <BpmSelector value={number} onChange={handleNumberChange} />
                <button onClick={fetchUsername}>Show Username</button>
            </section>
        </div>
    );
};

export default InputPage;