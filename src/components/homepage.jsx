import React, { Component } from "react";

import styles from "./scss/homepage.module.scss";
import header from "../images/homepage-header.jpg";

import Button from "./common/button";
import Recommendation from "./recommendation";

class Homepage extends Component {
  state = {
    init: true,
    recommendations: [
      {
        title: "רובין פוד",
        desc: "מסעדה וקפה בשוק של חיפה שמבוססת כולה על מזון מוצל",
        image:
          "https://scontent.fsdv2-1.fna.fbcdn.net/v/t1.0-9/13427920_521503214700863_6669784899119421948_n.png?_nc_cat=107&_nc_sid=09cbfe&_nc_ohc=pgJNH974rmYAX8ZdsAO&_nc_ht=scontent.fsdv2-1.fna&oh=15603d08b3a252867e7970dd6f2464d5&oe=5F76C41A",
        link: "https://www.facebook.com/robinfood.il/",
      },
      {
        title: "לקט ישראל",
        desc: "הארגון הארצי הותיק המציל עודפי מזון איכותיים ומעבירים אותם לאלו הזקוקים להם",
        image:
          "https://www.leket.org/wp-content/uploads/2020/06/cropped-LOGOFORSITE.png",
        link: "https://www.leket.org/",
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
      <div className={styles.container}>
        <header
          className={styles.pageHeader}
          id="header"
          style={this.headerStyle}
        >
          <h1 className={styles.headerText}>
            <span dir="ltr">We Have Food!</span>
            <br />
            יש לנו אוכל!
          </h1>
        </header>
        <section className={styles.content}>
          <div className={styles.content__about}>
            <p>
              הצלת מזון היא וואלה איזה אחלה זה כזה טעים לבשל אוכל שהיה נזרק ועוד
              כל מיני מילים.
            </p>
            <br />
            <p>
              אם יש לכם אוכל שאתם כבר לא מתכוונים להשתמש בו - בואו ותראו איזה
              כיף זה לחלוק אותו ולתת אותו למי שיהנה ממנו!
            </p>
          </div>
          <div className={styles.content__addFood}>
            <Button
              text="יש לי אוכל!"
              to="/food/add"
              color="green"
              style={{ marginBottom: "0.5rem" }}
            />
            <Button text="חיפוש אוכל" to="/food/search" color="mustard" />
          </div>
          <div>
            <h3>הנה עוד מקומות שכדאי לכם להציץ בהם:</h3>
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
