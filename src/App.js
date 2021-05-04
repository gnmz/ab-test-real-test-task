import React, { Component } from "react";
import Header from "./components/Header/Header";
import NavSidebar from "./components/NavSidebar/NavSidebar";

import "./App.css";
import Table from "./components/Table/Table";

export default class App extends Component {
  state = {
    data: [],
    UserID: "",
    DateRegistration: "",
    DateLastActivity: "",
    isAddOneMore: false,
  };

  saveDataHandler = () => {};

  addOneMoreHandler = () => {
    const {
      isAddOneMore,
      UserID,
      DateRegistration,
      DateLastActivity,
      data,
    } = this.state;
    if (!isAddOneMore) {
      this.setState({ isAddOneMore: true });
    }
    if (isAddOneMore) {
      this.setState({
        data: [
          ...data,
          {
            UserID: UserID,
            DateRegistration: DateRegistration,
            DateLastActivity: DateLastActivity,
          },
        ],
        UserID: "",
        DateRegistration: "",
        DateLastActivity: "",
      });
    }
  };

  userIdHandler = (e) => {
    this.setState({ UserID: e.target.value });
  };
  dateRegistrationHandler = (e) => {
    this.setState({ DateRegistration: e.target.value });
  };
  dateLastActivityHandler = (e) => {
    this.setState({ DateLastActivity: e.target.value });
  };

  render() {
    const {
      UserID,
      DateRegistration,
      DateLastActivity,
      data,
      isAddOneMore,
    } = this.state;
    return (
      <div className="app-wrapper">
        <Header />
        <div className="main">
          <NavSidebar />
          <Table
            data={data}
            isAddOneMore={isAddOneMore}
            UserID={UserID}
            addOneMoreHandler={this.addOneMoreHandler}
            DateRegistration={DateRegistration}
            DateLastActivity={DateLastActivity}
          />
        </div>
      </div>
    );
  }
}
