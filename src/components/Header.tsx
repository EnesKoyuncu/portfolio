import React from "react";
import "../css/header.css";
import nskLogo from "../img/file.jpeg";

export default function Header() {
  return (
    <div className="header-main">
      <div className="header-left">
        <div className="header-left-top">
          <div className="header-left-top-left">asd</div>
          <div className="header-left-top-mid">asd</div>
          <div className="header-left-top-right">asd</div>
        </div>
        <div className="header-left-bottom">
          <div className="header-left-bottom-left">asd</div>
          <div className="header-left-bottom-mid">asd</div>
          <div className="header-left-bottom-right">asd</div>
        </div>
      </div>
      <div className="header-mid">
        <img src={nskLogo} alt="nsk logo" />
      </div>

      <div className="header-right">
        <div className="header-right-top">
          <div className="header-right-top-left">asd</div>
          <div className="header-right-top-mid">asd</div>
          <div className="header-right-top-right">asd</div>
        </div>
        <div className="header-right-bottom">
          <div className="header-right-bottom-left">asd</div>
          <div className="header-right-bottom-mid">asd</div>
          <div className="header-right-bottom-right">asd</div>
        </div>
      </div>
    </div>
  );
}
