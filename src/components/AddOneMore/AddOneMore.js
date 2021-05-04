import React, { Component } from "react";
import "./AddOneMore.css";
import AddIcon from "../../images/add-icon.svg";

export class AddOneMore extends Component {
  render() {
    const { addOneMoreHandler } = this.props;
    return (
      <div className="add-one-more">
        <img src={AddIcon} alt="add-icon" className="add-one-more-icon" />
        <button onClick={addOneMoreHandler} className="add-one-more-btn">
          Add one more
        </button>
      </div>
    );
  }
}

export default AddOneMore;
