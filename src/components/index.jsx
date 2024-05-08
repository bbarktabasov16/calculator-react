/* eslint no-eval: 0 */

import React from "react";
import store from "../store";

export class Calculator extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "vrfvfr",
      out: "0",
    };
    this.refOutput = React.createRef();
  }

  tapNumber(value) {
    let currentValue = value;
    let output = this.refOutput.current;

    this.setState({
      out: currentValue,
    });

    if (output.value === "0") {
      output.value = "";
    }
    output.value += currentValue;
  }

  tapOperations(value) {
    let output = this.refOutput.current;

    if (value === "CE") {
      output.value.length === 1
        ? (output.value = "0")
        : (output.value = output.value.substring(0, output.value.length - 1));
    } else if (value === "C") {
      output.value = "0";
    } else if (value === "=") {
      try {
        output.value = eval(output.value);
      } catch {
        output.value = "error";
        setTimeout(() => {
          output.value = "0";
        }, 1250);
      }
    }
  }

  render() {
    return (
      <div className="border-container">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <div className="container">
          <input
            ref={this.refOutput}
            type="text"
            defaultValue={this.state.out}
          />
          <div className="buttons">
            {store.buttons.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  this.tapNumber(item.value);
                }}
                className="number"
              >
                {item.value}
              </button>
            ))}
            {store.operations.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  this.tapOperations(item.value);
                }}
                className="number"
              >
                {item.value}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
