import React, { Component } from "react";

export default class Comment extends Component {
  render() {
    return (
      <div className="CommentLayout">
        <div className="CommentImg">
          <img
            src={this.props.property.Photo}
            alt="pic"
          />
        </div>
        <div className="CommentTxt">
              {this.props.property.Comment ? (
                <span>
                  <h6>{this.props.property.Name} commented 9 hrs ago</h6>
                  <p>{this.props.property.Comment}</p>
                  </span>
              ) : null}
        </div>
      </div>
    );
  }
}
