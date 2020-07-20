import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Navbar extends Component {
  state = {};
  render() {
    const { user } = this.props;
    return (
      <nav className="navbar" id="navbar">
        <li>
          <NavLink to="/food" className="active">
            למצוא אוכל
          </NavLink>
        </li>
        <li>
          <NavLink to="/users/my-favorites" className="active">
            הצעות מעניינות
          </NavLink>
        </li>
        <li>
          <NavLink to="/food/add" className="active">
            שתף אוכל
          </NavLink>
        </li>
        {user ? (
          <li>
            <NavLink to="/user/logout">שינוי משתמש</NavLink>
          </li>
        ) : (
          <li>
            <NavLink to="/user/login">התחברות למערכת</NavLink>
          </li>
        )}
      </nav>
    );
  }
}

export default Navbar;
