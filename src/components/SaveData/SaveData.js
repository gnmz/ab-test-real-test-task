import React, { Component } from "react";
import "./SaveData.css";

export class SaveData extends Component {
  render() {
    const { saveDataHandler, data } = this.props;
    return (
      <div className="save-table">
        <button
          className="save-table-btn"
          onClick={saveDataHandler}
          disabled={data.length === 0}
        >
          Save
        </button>
      </div>
    );
  }
}

export default SaveData;
