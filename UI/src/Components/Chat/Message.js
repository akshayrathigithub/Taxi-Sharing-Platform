import React, { Component } from "react";

export default class Message extends Component {
  state = {
    id: this.props.Task,
  };
  called = () => {
    this.props.ClickedCalled(this.state.id);
  };
  render() {
    return (
      <div onClick={this.called}>
        <div className="border"></div>
        <div id="Task">
          <div id="Pic"></div>
          <div id="Topic">
            <h3>{this.props.Task}</h3>
            <div id="Info">
              <div>
                <p>Created By: {this.props.Name}</p>
              </div>
              <div>
                <p> Email: {this.props.CreatorEmail}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border"></div>
      </div>
    );
  }
}
