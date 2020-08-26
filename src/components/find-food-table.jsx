import React, { Component } from "react";
import { useMediaQuery } from "react-responsive";

import styles from "./scss/find-food-table.module.scss";
import FoodListing from "./food-listing";

const FoodTable = (props) => {
  // const SM = useMediaQuery({ query: "(min-width: 576px)" });

  let MD = useMediaQuery({ query: "(min-width: 768px)" });

  function displayMore({ currentTarget: row }) {
    let container = row.nextElementSibling.style;
    container.display === "none"
      ? (container.display = "table-row")
      : (container.display = "none");
  }

  function registerFavorites(foodId) {
    props.registerFavorites(foodId);
  }

  
  return (
    <React.Fragment>
      <h4 className={styles.header}>מזון למסירה ב{props.array[0].foodCity}</h4>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>שם</th>
            <th>תיאור</th>
            {MD && 
            <React.Fragment>
              <th>תמונה</th>
              <th>מי מוסר?</th>
            </React.Fragment>}
          </tr>
        </thead>
        <tbody>
          {props.array.map((listing, idx, arr) => {
            return (
              <FoodListing 
              key={listing._id}
              listing={listing} 
              displayMore={displayMore} 
              registerFavorites={registerFavorites} 
              isMD={MD}/>
            );
          })}
        </tbody>
      </table>
    </React.Fragment>
    )
  
};

export default FoodTable;
