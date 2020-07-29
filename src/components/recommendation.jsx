import React, { Component } from "react";
import styles from "./scss/recommendation.module.scss";

class Recommendation extends Component {
  state = {};
  render() {
    const { rec } = this.props;
    return (
      <div className={styles.recommendation}>
        <a
          href={rec.link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.recommendation__link}
        >
          <img
            src={rec.image}
            alt={rec.title}
            className={styles.recommendation__image}
          />
          <div className={styles.recommendation__text}>
            <h4 className={styles.recommendation__heading}>{rec.title}</h4>
            <p className={styles.recommendation__desc}>{rec.desc}</p>
          </div>
        </a>
      </div>
    );
  }
}

export default Recommendation;
