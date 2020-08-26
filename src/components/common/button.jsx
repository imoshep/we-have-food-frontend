import React from "react";
import { Link } from "react-router-dom";
import "./scss/button.module.scss";

const Button = ({ to, color, style, text, ...rest }) => {
  return (
    <Link {...rest} to={to} className={`button ${color}`} style={style}>
      {text}
    </Link>
  );
};

export default Button;
