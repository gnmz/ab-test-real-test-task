import React, { Component } from "react";
import MainButton from "../MainButton/MainButton";
import "./CalculateData.css";

export class CalculateData extends Component {
  state = {
    isFetchData: false,
    rollingRetation: "",
  };
  calculate = () => {
    fetch(`/calculate`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 1) {
          alert(`Нет данных для расчета`);
        }
        if (data.length === 2) {
          this.setState({
            isFetchData: true,
            rollingRetation: (data[0].params / data[1].params) * 100,
          });
        }
      });
  };

  render() {
    const { isFetchData, rollingRetation } = this.state;
    return (
      <div className="calculate-data">
        <h2 className="calculate-data-title">Rolling Retention 7 day</h2>
        {isFetchData ? (
          <div className="calculate-data-content">
            {rollingRetation.toFixed(2)}% пользователей вернулось через 7 и
            более дней
          </div>
        ) : (
          <div className="calculate-data-content"></div>
        )}

        <MainButton title="Calculate" onClick={this.calculate} />
      </div>
    );
  }
}

export default CalculateData;
