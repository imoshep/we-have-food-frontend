import React from "react";
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";

import styles from "./scss/food-listing.module.scss";

const FoodListing = (props) => {
  // const SM = useMediaQuery({ query: "(min-width: 576px)" });
  const MD = useMediaQuery({ query: "(min-width: 768px)" });

  function displayMore({ currentTarget: row }) {
    let container = row.nextElementSibling.style;
    container.display === "none"
      ? (container.display = "table-row")
      : (container.display = "none");
  }

  function addToFavorites({ currentTarget: icon }) {
    const foodId = icon.getAttribute("data-food-id");
    icon.setAttribute("icon", ['far', 'star']);
    console.log('clicked: ', foodId);
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
                <td>
                  <FontAwesomeIcon
                    data-food-id={listing._id}
                    onClick={(e) => addToFavorites(e)}
                    icon="star"
                  />
                  {listing.foodTitle}
                </td>
                <td>{listing.foodDesc}</td>
                <td>
                  <img
                    src={listing.foodImage}
                    alt={listing.foodTitle}
                    height="150"
                    onClick={() => Swal.fire({
                      text: listing.foodTitle,
                      imageUrl: listing.foodImage
                    })}
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
          </tr>
        </thead>
        <tbody>
          {props.array.map((listing, idx, arr) => {
            return (
              <React.Fragment key={listing._id}>
                <tr  onClick={displayMore}>
                  <td>
                    <FontAwesomeIcon
                      data-food-id={listing._id}
                      onClick={(e) => addToFavorites(e)}
                      icon="star"
                    />
                    {listing.foodTitle}
                  </td>
                  <td style={{display: "flex", justifyContent: "space-between", gap: '8px'}}>
                    {listing.foodDesc}
                    <FontAwesomeIcon icon="caret-down" size='lg'/>
                  </td>
                </tr>
                <tr style={{ display: "none" }}>
                  <td>
                    <img
                      src={listing.foodImage}
                      height="100"
                      alt={listing.foodTitle}
                      onClick={() => Swal.fire({
                        text: listing.foodTitle,
                        imageUrl: listing.foodImage
                      })}
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
