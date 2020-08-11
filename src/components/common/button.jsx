import React from "react";
import { Link } from "react-router-dom";
import "./scss/button.module.scss";

const Button = (props) => {
  return (
    <Link to={props.to} className={`button ${props.color}`} style={props.style}>
      {props.text}
    </Link>
  );
};

export default Button;
