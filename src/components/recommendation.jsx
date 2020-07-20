import React, { Component } from "react";
import "./scss/recommendation.scss";

class Recommendation extends Component {
  state = {};
  render() {
    const { rec } = this.props;
    return (
      <div className="recommendation">
        <a
          href={rec.link}
          target="_blank"
          rel="noopener noreferrer"
          className="recommendation__link"
        >
          <img
            src={rec.image}
            alt={rec.title}
            className="recommendation__image"
          />
          <div className="recommendation__text">
            <h4 className="recommendation__heading">{rec.title}</h4>
            <p className="recommendation__desc">{rec.desc}</p>
          </div>
        </a>
      </div>
    );
  }
}

export default Recommendation;
