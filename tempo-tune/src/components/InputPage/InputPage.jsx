import "./InputPage.css";
import React, { useState } from 'react';

// Components
import BpmSelector from "../BpmSelector/BpmSelector";
import NavBar from "../NavBar/NavBar";

const InputPage = () => {

    const [number, setNumber] = useState(0);

    const handleNumberChange = (newValue) => {
        setNumber(newValue);
    };

    return (
        <div>
            <NavBar />
            <section className="input-section">
                <h2>Select the BPM you want</h2>
                <BpmSelector value={number} onChange={handleNumberChange} />
            </section>
        </div>
    );
};

export default InputPage;