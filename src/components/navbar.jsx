import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHome,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./scss/navbar.module.scss";

class Navbar extends Component {
  state = {
  };

  toggleCollapseList() {
    let collapseList = document.getElementById("collapse-list").style;
    if (collapseList.maxHeight) {
      collapseList.maxHeight = null;
    } else {
      collapseList.maxHeight = "15rem";
    }
  };


  componentDidMount() {
    this.collapseList = document
    .getElementById("collapse-list");
  }
  
  render() {
    const { user } = this.props;

    return (
      <nav
        className={styles.navbar} 
        id="navbar"
      >
        <ul className={styles.topList}>
          <li
            className={`${styles.navlink} ${styles.burger}`}
            onClick={this.toggleCollapseList}
          >
            <FontAwesomeIcon icon={faBars} />
          </li>
          <li className={styles.navlink}>
            <NavLink to="/">
              <FontAwesomeIcon icon={faHome} />
            </NavLink>
          </li>
          
          {user?._id ? (
            <span className={styles.topLeft}>
              <li className={styles.navlink}>
                <NavLink to="/user/me">
                  <FontAwesomeIcon icon="user-circle" />
                </NavLink>
              </li>
              <li className={styles.navlink}>
                <NavLink to="/user/logout">
                  <FontAwesomeIcon icon="people-arrows" />
                </NavLink>
              </li>
            </span>
          ) : (
            <li className={`${styles.navlink} ${styles.topLeft}`}>
              <NavLink to="/user/login">
                <FontAwesomeIcon icon={faUserPlus} />
              </NavLink>
            </li>
          )}
        </ul>
        <ul className={styles.collapseList} id="collapse-list">
            <li className={styles.navlink}>
              <NavLink to="/food/search" onClick={this.toggleCollapseList}>למצוא אוכל</NavLink>
            </li>
            <li className={styles.navlink}>
              <NavLink to="/users/my-favorites" onClick={this.toggleCollapseList}>הצעות מעניינות</NavLink>
            </li>
            <li className={styles.navlink}>
              <NavLink to="/food/add" onClick={this.toggleCollapseList}>שתף אוכל</NavLink>
            </li>
          </ul>
      </nav>
    );
  }
}

export default Navbar;
