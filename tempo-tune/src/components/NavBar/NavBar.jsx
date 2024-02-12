import "./NavBar.css";

import React from "react";
import logo from "../../logo.svg";

const NavBar = () => {
  return (
    <header className="hero-section">
      {/* Change to my logo eventually */}
      <img src={logo} className="App-logo" alt="Logo" width="50" height="50" />

      <h1>TempoTune</h1>

      {/* Nav eventually, consider switching to nav tags */}
    </header>
  );
};

export default NavBar;