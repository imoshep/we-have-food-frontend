import React from "react";
import { Link } from "react-router-dom";
import "./scss/button.scss";

const Button = (props) => {
  return (
    <Link to={props.to} className="button">
      {props.text}
    </Link>
  );
};

export default Button;
