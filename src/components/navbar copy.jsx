import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHome } from "@fortawesome/free-solid-svg-icons";
import "./scss/navbar.scss";

class Navbar extends Component {
  state = {};

  collapse() {
    document.getElementById("navbar").classList.toggle("collapse");
    document.getElementById("collapse").classList.toggle("collapse");
  }

  render() {
    const { user } = this.props;
    return (
      <nav className="navbar" id="navbar">
        <li className="navbar__link burger">
          <FontAwesomeIcon icon={faBars} onClick={() => this.collapse()} />
        </li>
        <li className="navbar__link home active">
          <NavLink to="/">
            <FontAwesomeIcon icon={faHome} />
          </NavLink>
        </li>
        <div className="collapse-links" id="collapse">
          <ul className="navbar__list">
            <li className="navbar__link collapse-link">
              <NavLink to="/food">למצוא אוכל</NavLink>
            </li>
            <li className="navbar__link collapse-link">
              <NavLink to="/users/my-favorites">הצעות מעניינות</NavLink>
            </li>
            <li className="navbar__link collapse-link">
              <NavLink to="/food/add">שתף אוכל</NavLink>
            </li>
          </ul>
        </div>
        {user ? (
          <li className="navbar__link user">
            <NavLink to="/user/logout">שינוי משתמש</NavLink>
          </li>
        ) : (
          <li className="navbar__link user">
            <NavLink to="/user/login">התחברות למערכת</NavLink>
          </li>
        )}
      </nav>
    );
  }
}

export default Navbar;
