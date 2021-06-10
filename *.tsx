import React, { Component } from "react";


export default class App extends Component {
  state = {
    notes: ["Corn", "Potato"],
  };

  saveInput = (e) => {
    this.setState({ input: e.target.value });
  };

  addNewItem = () => {
    let { notes, input } = this.state;
    notes.push(input);
    // this.state.cart.push(this.state.input); // same as above, though bad practice 
  };

  render() {
    return (
      <div>
        <input
          type="text"
          onChange={this.saveInput}
        />
        <button onClick={this.addNewItem}> Add Item </button>
        <ol>
          {this.state.notes.map((subItems, sIndex) => {
            return <li key={sIndex}> {subItems}</li>
          })}
        </ol>
      </div>
    );
  }
}