import React, { Component } from "react";
import AddOneMore from "../AddOneMore/AddOneMore";
import MainButton from "../MainButton/MainButton";

import TableContent from "../TableContent/TableContent";
import "./AddData.css";

export class AddData extends Component {
  render() {
    const {
      data,
      userIdHandler,
      dateRegistrationHandler,
      dateLastActivityHandler,
      addOneMoreHandler,
      saveDataHandler,
    } = this.props;
    return (
      <div className="add-data">
        <TableContent
          data={data}
          userIdHandler={userIdHandler}
          dateRegistrationHandler={dateRegistrationHandler}
          dateLastActivityHandler={dateLastActivityHandler}
        />
        <AddOneMore addOneMoreHandler={addOneMoreHandler} />
        <MainButton title="Save" onClick={saveDataHandler} />
      </div>
    );
  }
}

export default AddData;
