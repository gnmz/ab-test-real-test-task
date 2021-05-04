import React, { Component } from "react";
import "./NavSidebar.css";

export class NavSidebar extends Component {
  render() {
    return (
      <div className="nav-sidebar">
        <ul className="nav-list">
          <li className="nav-list-item">Projects</li>
          <li className="nav-list-item">Add new</li>
          <li className="nav-list-item">Account</li>
          <li className="nav-list-item">Support</li>
        </ul>
      </div>
    );
  }
}

export default NavSidebar;
