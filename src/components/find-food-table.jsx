import React from "react";
import MediaQuery from "react-responsive";

import styles from "./scss/find-food-table.module.scss";
import FoodListing from "./food-listing";

const FoodTable = (props) => {
  
  function registerFavorites(foodId) {
    props.registerFavorites(foodId);
  }

  
  return (
    <React.Fragment>
      <h4 className={styles.header}>מזון למסירה ב{props.array[0].foodCity}</h4>
      <p>מציג פריטים שפורסמו בשבוע האחרון בלבד</p>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>שם</th>
            <th>תיאור</th>
            
            <MediaQuery minDeviceWidth="768px">
              <th>תמונה</th>
              <th>מי מוסר?</th>
            </MediaQuery>
          </tr>
        </thead>
        <tbody>
          <tr><td>הוספה למועדפים</td></tr>
          {props.array.map((listing, idx, arr) => {
            return (
              <FoodListing 
              key={listing._id}
              listing={listing} 
              registerFavorites={registerFavorites} 
              />
            );
          })}
        </tbody>
      </table>
    </React.Fragment>
    )
  
};

export default FoodTable;
