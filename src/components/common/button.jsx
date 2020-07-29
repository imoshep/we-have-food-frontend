import React from "react";
import { Link } from "react-router-dom";
import styles from "./scss/button.module.scss";

const Button = (props) => {
  return (
    <Link to={props.to} className={`button ${props.color}`}>
      {props.text}
    </Link>
  );
};

export default Button;
