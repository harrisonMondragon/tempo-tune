import "./LandingPage.css";

import React, { useState } from 'react';

import BpmSelector from "../BpmSelector/BpmSelector";

const LandingPage = () => {

    const [number, setNumber] = useState(0);

    const handleNumberChange = (newValue) => {
        setNumber(newValue);
    };

    return (
        <div>
            <header className="hero-section">
                <h1>TempoTune</h1>
                {/* Logo eventually */}
            </header>
            <section className="input-section">
                <h2>Select the BPM you want</h2>
                <BpmSelector value={number} onChange={handleNumberChange} />
            </section>
        </div>
    );
};

export default LandingPage;