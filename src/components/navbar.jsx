import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHome,
  faUserCircle,
  faUserPlus,
  faPeopleArrows,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./scss/navbar.module.scss";

class Navbar extends Component {
  state = {
    hideNav: true,
  };

  collapseNavbar() {
    document
      .getElementById("collapse-list")
      .classList.toggle(`${styles.expand}`);
  }

  showNavbar(entries, observer) {
    let { hideNav } = this.state;

    entries.forEach((entry) => {
      // console.dir(entry);
      // console.log("prevRatio: " + this.prevRatio);
      if (entry.intersectionRatio < this.prevRatio) {
        hideNav = false;
      } else {
        hideNav = true;
      }
      this.prevRatio = entry.intersectionRatio;
    });
    // let scrollBarPosition = window.pageYOffset | document.body.scrollTop;
    // scrollBarPosition < 60 ? (hideNav = true) : (hideNav = false);

    this.setState({ hideNav });
  }

  componentDidMount() {
    this.container = document.querySelector("body");
    this.prevRatio = 1;
    this.creatObserver();
  }

  creatObserver() {
    let options = {
      // root: document.querySelector(".app-container"),
      root: null,
      rootMargin: "0px",
      threshold: [0, 0.3, 0.6, 1],
    };
    let observer = new IntersectionObserver(
      this.showNavbar.bind(this),
      options
    );
    observer.observe(this.container);
  }

  render() {
    const { user } = this.props;
    const { hideNav } = this.state;
    return (
      <nav
        className={`${styles.navbar} ${hideNav ? styles.hide : ""}`}
        id="navbar"
      >
        <ul className={styles.topList}>
          <li
            className={`${styles.navlink} ${styles.burger}`}
            id="burger"
            onClick={this.collapseNavbar}
          >
            <FontAwesomeIcon icon={faBars} />
          </li>
          <li className={`${styles.navlink} ${styles.home} ${styles.active}`}>
            <NavLink to="/">
              <FontAwesomeIcon icon={faHome} />
            </NavLink>
          </li>
          <span className={styles.collapseList} id="collapse-list">
            <li className={styles.navlink}>
              <p> </p>
            </li>
            <li className={styles.navlink}>
              <NavLink to="/food">למצוא אוכל</NavLink>
            </li>
            <li className={styles.navlink}>
              <NavLink to="/users/my-favorites">הצעות מעניינות</NavLink>
            </li>
            <li className={styles.navlink}>
              <NavLink to="/food/add">שתף אוכל</NavLink>
            </li>
          </span>

          {user ? (
            <span className={styles.topLeft}>
              <li className={styles.navlink}>
                <NavLink to="/user/my">
                  <FontAwesomeIcon icon={faUserCircle} />
                </NavLink>
              </li>
              <li className={styles.navlink}>
                <NavLink to="/user/logout">
                  <FontAwesomeIcon icon={faPeopleArrows} />
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
      </nav>
    );
  }
}

export default Navbar;
