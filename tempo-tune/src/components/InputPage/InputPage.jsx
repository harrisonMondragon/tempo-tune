import "./InputPage.css";
import { useState } from 'react';

import { fetchProfile } from "../../scripts/fetch";

// Components
import BpmSelector from "../BpmSelector/BpmSelector";
import NavBar from "../NavBar/NavBar";

const InputPage = () => {

    const [number, setNumber] = useState(0);

    const handleNumberChange = (newValue) => {
        setNumber(newValue);
    };

    const logProfile = async () => {
        try {
            const profile = await fetchProfile();
            console.log(profile);
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    }

    return (
        <div>
            <NavBar />
            <section className="input-section">
                <h2>Select the BPM you want</h2>
                <BpmSelector value={number} onChange={handleNumberChange} />
                <button onClick={logProfile}>Log Profile!</button>
            </section>
        </div>
    );
};

export default InputPage;