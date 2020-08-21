import React from "react";

const Footer = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <p>We Have Food! &copy; {new Date().getFullYear()}</p>
      <p style={{ fontSize: "0.8rem" }}>
        Favicon made by{" "}
        <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
          Freepik
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          {" "}
          www.flaticon.com
        </a>
      </p>
    </div>
  );
};

export default Footer;
