import React, { Component } from "react";
import "./MainButton.css";

export class MainButton extends Component {
  render() {
    const { onClick, title } = this.props;
    return (
      <div className="main-btn-wrapper">
        <button className="main-btn" onClick={onClick}>
          {title}
        </button>
      </div>
    );
  }
}

export default MainButton;
