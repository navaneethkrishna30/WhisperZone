import React from "react";

import "./style.css"

const Button = ({ label, onClick }) => {
  return (
    <>
      <button className="btn-green-button" onClick={onClick}>
        {label}
      </button>
    </>
  );
};

export default Button;
