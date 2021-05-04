import React, { Component } from "react";
import "./TableContent.css";

export class TableContent extends Component {
  render() {
    const {
      data,
      userIdHandler,
      dateRegistrationHandler,
      dateLastActivityHandler,
      disabledInput,
    } = this.props;
    return (
      <div className="table-content-wrapper">
        <div className="table-content-header">
          <p className="table-content-header__item">UserID</p>
          <p className="table-content-header__item">Date Registration</p>
          <p className="table-content-header__item">Date Last Activity</p>
        </div>
        <div>
          {data.map((item, index) => (
            <div className="table-content-properties" key={index}>
              <input
                type="text"
                className="table-content-properties__item"
                onChange={(e) => {
                  userIdHandler(index, e);
                }}
                value={item.UserID ? item.UserID : ""}
                disabled={disabledInput}
                placeholder="123456789"
              />
              <input
                type="text"
                className="table-content-properties__item"
                onChange={(e) => {
                  dateRegistrationHandler(index, e);
                }}
                value={item.DateRegistration ? item.DateRegistration : ""}
                disabled={disabledInput}
                placeholder="20.02.2021"
              />
              <input
                type="text"
                className="table-content-properties__item"
                onChange={(e) => {
                  dateLastActivityHandler(index, e);
                }}
                value={item.DateLastActivity ? item.DateLastActivity : ""}
                disabled={disabledInput}
                placeholder="20.02.2021"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default TableContent;
