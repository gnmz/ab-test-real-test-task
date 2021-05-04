import React, { Component } from "react";
import MainButton from "../MainButton/MainButton";
import TableContent from "../TableContent/TableContent";

import "./GetData.css";

export class GetData extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    this.mounted = true;
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.data !== prevState.data) {
      this.mounted = true;
      this.fetchData();
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  fetchData = () => {
    fetch(`/get-all`)
      .then((res) => res.json())
      .then((data) => {
        if (this.mounted) {
          this.changeDate(data);
        }
      });
  };

  updateDate = (date) => {
    let year = new Date(date).getFullYear();
    let month = new Date(date).getMonth() + 1;
    let day = new Date(date).getDate();
    if (day < 10 && month < 10) {
      return `0${day}.0${month}.${year}`;
    } else if (month < 10) {
      return `${day}.0${month}.${year}`;
    } else if (day < 10) {
      return `0${day}.${month}.${year}`;
    } else {
      return `${day}.${month}.${year}`;
    }
  };

  changeDate = (arr) => {
    let updatedArr = arr.map((item) => {
      if (item.DateRegistration) {
        item.DateRegistration = this.updateDate(item.DateRegistration);
      }
      if (item.DateLastActivity) {
        item.DateLastActivity = this.updateDate(item.DateLastActivity);
      }
      return item;
    });
    this.setState({ data: updatedArr });
  };

  clearData = () => {
    fetch(`/clear-data`, {
      method: "DELETE",
    });
  };

  render() {
    const { data } = this.state;
    const {
      userIdHandler,
      dateRegistrationHandler,
      dateLastActivityHandler,
    } = this.props;
    return (
      <div className="get-data">
        <TableContent
          data={data}
          userIdHandler={userIdHandler}
          dateRegistrationHandler={dateRegistrationHandler}
          dateLastActivityHandler={dateLastActivityHandler}
          disabledInput={true}
        />
        <MainButton title="Clear data" onClick={this.clearData} />
      </div>
    );
  }
}

export default GetData;
