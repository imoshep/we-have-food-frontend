import React, { Component } from "react";

import "./scss/homepage.scss";
import header from "../images/homepage-header.jpg";
// import robinfood from "../images/robinfood-logo.png";

import Button from "./common/button";
import Recommendation from "./recommendation";

class Homepage extends Component {
  state = {
    recommendations: [
      {
        title: "רובין פוד",
        desc: "מסעדה וקפה בשוק של חיפה שמבוססת כולה על מזון מוצל",
        image:
          "https://images.unsplash.com/photo-1518675219903-c682c4b16b1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
        link: "https://www.facebook.com/robinfood.il/",
      },
    ],
  };

  headerStyle = {
    backgroundImage: `url(${header})`,
    backgroundSize: "cover",
  };

  render() {
    const { recommendations } = this.state;
    return (
      <div className="container">
        <header className="header" style={this.headerStyle}>
          <h1 className="header__title">
            <span dir="ltr">We Have Food!</span>
            <br />
            יש לנו אוכל!
          </h1>
        </header>
        <section className="content">
          <p className="content__about">
            הצלת מזון היא וואלה איזה אחלה זה כזה טעים לבשל אוכל שהיה נזרק. אם יש
            לכם אוכל שאתם כבר לא מתכוונים להשתמש בו - בואו ותראו איזה כיף זה
            לחלוק אותו ולהביא אותו למי שיהנה ממנו!
          </p>
          <div className="content__add-food">
            <Button text="יש לי אוכל!" to="/food/add" />
          </div>
          <div className="content__recommendations">
            <h3 className="content__recommendations--heading">
              הנה עוד מקומות שכדאי לכם להציץ בהם:
            </h3>
            {recommendations.length > 0 &&
              recommendations.map((rec, idx) => (
                <Recommendation key={idx} rec={rec} />
              ))}
          </div>
        </section>
      </div>
    );
  }
}

export default Homepage;
