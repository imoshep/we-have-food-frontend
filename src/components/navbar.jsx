import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHome } from "@fortawesome/free-solid-svg-icons";
import "./scss/navbar.scss";

class Navbar extends Component {
  state = {
    hideNav: true,
  };

  collapse() {
    document.getElementById("collapse-list").classList.toggle("expand");
  }

  showNavbar() {
    let { hideNav } = this.state;
    let scrollBarPosition = window.pageYOffset | document.body.scrollTop;

    scrollBarPosition < 60 ? (hideNav = true) : (hideNav = false);

    this.setState({ hideNav });
  }

  componentDidMount() {
    window.addEventListener("scroll", this.showNavbar.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.showNavbar.bind(this));
  }

  render() {
    const { user } = this.props;
    const { hideNav } = this.state;
    return (
      <nav className={`navbar ${hideNav ? "hide" : ""}`} id="navbar">
        <ul className="top-list">
          <li className="navlink burger">
            <FontAwesomeIcon icon={faBars} onClick={() => this.collapse()} />
          </li>
          <li className="navlink home active">
            <NavLink to="/">
              <FontAwesomeIcon icon={faHome} />
            </NavLink>
          </li>
          <span className="collapse-list" id="collapse-list">
            <li className="navlink">
              <NavLink to="/food">למצוא אוכל</NavLink>
            </li>
            <li className="navlink">
              <NavLink to="/users/my-favorites">הצעות מעניינות</NavLink>
            </li>
            <li className="navlink">
              <NavLink to="/food/add">שתף אוכל</NavLink>
            </li>
          </span>
          <li className="navlink user">
            <NavLink to="/user/logout">שינוי משתמש</NavLink>
          </li>
          {/* {user ? (
            <li className="navlink user">
              <NavLink to="/user/logout">שינוי משתמש</NavLink>
            </li>
          ) : (
            <li className="navlink user">
              <NavLink to="/user/login">התחברות למערכת</NavLink>
            </li>
          )} */}
        </ul>
      </nav>
    );
  }
}

export default Navbar;
