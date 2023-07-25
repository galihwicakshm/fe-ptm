import React from "react";
import "./hamburger.css";

const Hamburger = ({ handleClick }) => {
  return (
    <div className="hamburger" onClick={handleClick}>
      <div className="hamburger-line"></div>
      <div className="hamburger-line"></div>
      <div className="hamburger-line"></div>
    </div>
  );
};

export default Hamburger;
