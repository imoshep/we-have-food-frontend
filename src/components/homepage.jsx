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
            שלום! הגעתם ל<strong>יש לנו אוכל!</strong> שמחים לראות אתכם כאן.
            <br/>
            החזון שלנו הוא שכל מזון תקין ובריא יאכל ולא ילך לפח.
            אנו מקווים להצליח לשדך באופן ישיר בין אנשים, מסעדות וגופים אשר מייצרים אוכל שלא נאכל במלואו לבין אנשים שישמחו לקבל את האוכל הזה ואף זקוקים לו.
            אי אפשר לדעת מי מסביבנו זקוק לאוכל וכל תרומה עוזרת.
            <br/>
            לא נוכל לפתור את בעיית הרעב העולמית אבל נוכל לעשות את מיטבנו ברמה המקומית, במדינתנו הקטנה, החמה והתוססת.
            </p>
            <br />
            <p>
              התחברו למערכת, וספקו פרטים להתקשרות. כשתמצאו אוכל שמוצא חן בעיניכם, תוכלו ליצור קשר עם האדם שפרסם אותו.
              <br/>
              אם יש לכם אוכל שאתם כבר לא מתכוונים להשתמש בו - בואו ותראו איזה
              כיף זה לחלוק אותו ולתת אותו למי שיהנה ממנו!
              <br/>
              הפנו אלינו חברים ומשפחה כדי שגם הם יוכלו לתת ולקבל לפי צורכם וכך נרחיב את התרומה שלנו!
              אנחנו ואתם יכולים לפתח קשרים קהילתיים בקלות ולעזור להמון אנשים
              <br/>
              בואו, תצרפו, תפיצו
              והמון אנשים יודו לכם.

              בתיאבון!
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
