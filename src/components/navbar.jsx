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

  closeCollapseList = () => {
    this.collapseList.style.maxHeight = null;

  }

  toggleCollapseList = () => {
    let collapseList = this.collapseList.style;
    if (collapseList.maxHeight) {
      collapseList.maxHeight = null;
    } else {
      collapseList.maxHeight = "15rem";
    }
    console.log(collapseList.maxHeight);
    console.log(this.collapseList);
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
            <NavLink to="/" onClick={this.closeCollapseList}>
              <FontAwesomeIcon icon={faHome} />
            </NavLink>
          </li>
          
          {user?._id ? (
            <span className={styles.topLeft}>
              <li className={styles.navlink}>
                <NavLink to="/user/me" onClick={this.closeCollapseList}>
                  <FontAwesomeIcon icon="user-circle" />
                </NavLink>
              </li>
              <li className={styles.navlink}>
                <NavLink to="/user/logout" onClick={this.closeCollapseList}>
                  <FontAwesomeIcon icon="people-arrows" />
                </NavLink>
              </li>
            </span>
          ) : (
            <li className={`${styles.navlink} ${styles.topLeft}`}>
              <NavLink to="/user/login" onClick={this.closeCollapseList}>
                <FontAwesomeIcon icon={faUserPlus} />
              </NavLink>
            </li>
          )}
        </ul>
        <ul className={styles.collapseList} id="collapse-list">
            <li className={styles.navlink}>
              <NavLink to="/food/search" onClick={this.closeCollapseList}>למצוא אוכל</NavLink>
            </li>
            <li className={styles.navlink}>
              <NavLink to="/user/me" onClick={this.closeCollapseList}>הפרופיל שלי</NavLink>
            </li>
            <li className={styles.navlink}>
              <NavLink to="/food/add" onClick={this.closeCollapseList}>שתף אוכל</NavLink>
            </li>
          </ul>
      </nav>
    );
  }
}

export default Navbar;
