import React from "react";
import { useMediaQuery } from "react-responsive";

import { serverUrl } from "../config.json";
import styles from "./scss/food-listing.module.scss";

const FoodListing = (props) => {
  // const SM = useMediaQuery({ query: "(min-width: 576px)" });
  const MD = useMediaQuery({ query: "(min-width: 768px)" });

  function popImage({ target }) {
    console.log(target);
    console.log(target.src);

    let img = document.createElement("img");
    let popup = document.getElementById("image-popup");
    img.src = target.src;
    img.width = "250";
    popup.appendChild(img);
    popup.classList.toggle("hide");
    document.addEventListener("click", () => {
      img.remove();
      popup.classList.toggle("hide");
    });
  }

  function displayMore({ currentTarget: row }) {
    let container = row.nextElementSibling.style;
    container.display === "none"
      ? (container.display = "table-row")
      : (container.display = "none");
  }

  const renderMDscreen = () => {
    return (
      <table className={styles.table}>
        <thead>
          <tr>
            <th>שם</th>
            <th>תיאור</th>
            <th>תמונה</th>
            <th>מי מוסר?</th>
          </tr>
        </thead>
        <tbody>
          {props.array.map((listing) => {
            return (
              <tr key={listing._id}>
                <td>{listing.foodTitle}</td>
                <td>{listing.foodDesc}</td>
                <td>
                  <img
                    src={serverUrl + listing.foodImage.slice(8)}
                    alt={listing.foodTitle}
                    height="150"
                    onClick={popImage}
                  ></img>
                </td>
                <td>
                  <p>
                    {listing.user.name}
                    <br />
                    {listing.user.phone}
                    <br />
                    {listing.user.email}
                  </p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  const renderXSscreen = () => {
    return (
      <table className={styles.table}>
        <thead>
          <tr>
            <th>שם</th>
            <th>תיאור</th>
            {/* <th>תמונה</th>
              <th>מי מוסר?</th>
              <th>טלפון</th> */}
          </tr>
        </thead>
        <tbody>
          {props.array.map((listing, idx, arr) => {
            return (
              <React.Fragment key={idx}>
                <tr key={listing._id} onClick={displayMore}>
                  <td>{listing.foodTitle}</td>
                  <td>{listing.foodDesc}</td>
                </tr>
                <tr style={{ display: "none" }}>
                  <td>
                    <img
                      src={serverUrl + listing.foodImage.slice(8)}
                      height="100"
                      alt={listing.foodTitle}
                      onClick={popImage}
                    ></img>
                  </td>
                  <td>
                    <p>
                      {listing.user.name}
                      <br />
                      {listing.user.phone}
                      <br />
                      {listing.user.email}
                    </p>
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <React.Fragment>
      <h4 className={styles.header}>מזון למסירה ב{props.array[0].foodCity}</h4>
      {MD ? renderMDscreen() : renderXSscreen()}
      <div id="image-popup" className={`${styles.popup} hide`}></div>
    </React.Fragment>
  );
};

export default FoodListing;
