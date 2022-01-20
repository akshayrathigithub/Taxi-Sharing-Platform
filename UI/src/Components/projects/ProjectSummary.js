import React, { Component } from "react";
import TimeCounter from "./TimeCounter";
import CommentList from "../layout/CommentList";

class ProjectSummary extends Component {
  state = {
    showComment: false,
  };
  OnShow() {
    this.setState({
      showComment: !this.state.showComment,
    });
  }
  render() {
    const { proj } = this.props;
    const seconds = new Date().getTime() / 1000;
    const timePassed = Math.round((seconds - proj.createdAt.seconds) / 60);
    return (
      <div>
        <div className="Table">
          <div className="Head">
            <div id="Header">
              <div id="Header_IMG">
                <img src={proj.PicUrl} alt="pic" className="rounded-circle" />
              </div>
              <div id="Header_SUB">
                <div id="Header_INFO">
                  <h5>
                    {proj.Name} posted a Query about {timePassed} min ago
                  </h5>
                </div>
                <div>
                  <TimeCounter Created={proj} />
                </div>
              </div>
            </div>
          </div>
          <div className="Body">
            <div>
              <p id="StEn">
                {proj.startingPoint} to {proj.endingPoint}{" "}
              </p>
              <p id="Address">Address : {proj.Address} </p>
              <p id="ConNum">Contact Number : {proj.PhoneNumber} </p>
              <p id="DOJ">Date of Journey : {proj.DateOfJourney} </p>
              <p id="TraDetail">Travel Detail: {proj.TravelDetail} </p>
              <p id="AddComm">Comment : {proj.AdditionalComment} </p>
            </div>
            <button onClick={this.OnShow.bind(this)} className="CommentBtn">
              Comment
            </button>
          </div>
          <div className="Bottom">
            {this.state.showComment ? (
              <CommentList Property={proj} UserInfo={this.props.authInfo} />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
export default ProjectSummary;
