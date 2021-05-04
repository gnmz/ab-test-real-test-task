import React, { Component } from "react";
import avatar from "../../images/avatar.png";
import ExitBtn from "../../images/exit-btn.svg";
import Search from "../../images/search.svg";
import "./Header.css";

export class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="logo">
          <h1 className="logo-title"> AB Test Real</h1>
        </div>
        <div className="header-properties">
          <div className="search">
            <img src={Search} alt="search-icon" className="search-icon" />
            <input type="text" className="search-input" />
          </div>
          <div className="profile">
            <img src={avatar} alt="avatar" className="profile-avatar" />
            <button className="exit-btn">
              <img src={ExitBtn} alt="exit-btn" className="exit-btn-img" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
