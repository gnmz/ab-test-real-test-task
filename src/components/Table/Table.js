import React, { Component } from "react";
import "./Table.css";
import AddData from "../AddData/AddData";
import GetData from "../GetData/GetData";
import CalculateData from "../CalculateData/CalculateData";

export class Table extends Component {
  state = {
    data: [{ UserID: "", DateRegistration: "", DateLastActivity: "" }],
    isAddData: true,
    isGetData: false,
    isCalculateData: false,
  };

  userIdHandler = (id, e) => {
    const value = e.target.value;
    const updatedData = this.state.data.map((item, index) => {
      if (index === id) {
        item.UserID = value;
      }
      return item;
    });
    this.setState({ UserID: updatedData.UserID });
  };

  dateRegistrationHandler = (id, e) => {
    const value = e.target.value;
    const updatedData = this.state.data.map((item, index) => {
      if (index === id) {
        item.DateRegistration = value;
      }
      return item;
    });
    this.setState({ DateRegistration: updatedData.DateRegistration });
  };

  dateLastActivityHandler = (id, e) => {
    const value = e.target.value;
    const updatedData = this.state.data.map((item, index) => {
      if (index === id) {
        item.DateLastActivity = value;
      }
      return item;
    });
    this.setState({ DateLastActivity: updatedData.DateLastActivity });
  };

  changeDateFormat = (date) => {
    let updatedDateArr = date.split(".");
    let updateDate = `${updatedDateArr[2]}-${updatedDateArr[1]}-${updatedDateArr[0]}`;
    return updateDate;
  };

  addOneMoreHandler = () => {
    const { UserID, DateRegistration, dateLastActivity, data } = this.state;

    this.setState({
      data: [
        ...data,
        {
          UserID: UserID,
          DateRegistration: DateRegistration,
          DateLastActivity: dateLastActivity,
        },
      ],
    });
  };

  saveDataHandler = () => {
    this.setState(
      {
        newData: this.state.data,
        data: [{ UserID: "", DateRegistration: "", DateLastActivity: "" }],
      },
      () => {
        this.updateDateForSQL(this.state.newData);

        fetch(`/add-data`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(this.state.newData),
        })
          .then((res) => res.json())
          .then((data) => alert(`${data.message}`));
      }
    );
  };

  updateDateForSQL = (arr) => {
    arr.map((item) => {
      if (item.DateRegistration) {
        item.DateRegistration = this.changeDateFormat(item.DateRegistration);
      }
      if (item.DateLastActivity) {
        item.DateLastActivity = this.changeDateFormat(item.DateLastActivity);
      }
      if (!item.DateLastActivity) {
        item.DateLastActivity = item.DateRegistration;
      }
      return item;
    });
  };

  chooseActionHandler = (item) => {
    if (item === "Add data") {
      this.setState({
        isAddData: true,
        isGetData: false,
        isCalculateData: false,
      });
    } else if (item === "Get data") {
      this.setState({
        isGetData: true,
        isAddData: false,
        isCalculateData: false,
      });
    } else if (item === "Calculate data") {
      this.setState({
        isGetData: false,
        isAddData: false,
        isCalculateData: true,
      });
    }
  };

  render() {
    const { data, isAddData, isGetData, isCalculateData } = this.state;
    return (
      <div className="table">
        <div className="table-header">
          <h1 className="table-title">Table</h1>
        </div>
        <div className="table-nav">
          <div
            className={isAddData ? "table-nav-item__active" : "table-nav-item"}
            onClick={() => this.chooseActionHandler("Add data")}
          >
            Add Data
          </div>
          <div
            className={isGetData ? "table-nav-item__active" : "table-nav-item"}
            onClick={() => this.chooseActionHandler("Get data")}
          >
            Get Data
          </div>
          <div
            className={
              isCalculateData ? "table-nav-item__active" : "table-nav-item"
            }
            onClick={() => this.chooseActionHandler("Calculate data")}
          >
            Calculate Data
          </div>
        </div>
        {isAddData ? (
          <AddData
            data={data}
            userIdHandler={this.userIdHandler}
            dateRegistrationHandler={this.dateRegistrationHandler}
            dateLastActivityHandler={this.dateLastActivityHandler}
            addOneMoreHandler={this.addOneMoreHandler}
            saveDataHandler={this.saveDataHandler}
          />
        ) : null}
        {isGetData ? (
          <GetData
            data={data}
            userIdHandler={this.userIdHandler}
            dateRegistrationHandler={this.dateRegistrationHandler}
            dateLastActivityHandler={this.dateLastActivityHandler}
          />
        ) : null}
        {isCalculateData ? <CalculateData /> : null}
      </div>
    );
  }
}

export default Table;
