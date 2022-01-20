import React, { Component } from "react";
import { connect } from "react-redux";
import { createProject } from "../../Store/actions/projectAction";
import { Link } from "react-router-dom";

class CreateProject extends Component {
  state = {
    Name: this.props.authInfo.displayName,
    PhoneNumber: "",
    startingPoint: "",
    endingPoint: "",
    Address: "",
    DateOfJourney: "",
    TravelDetail: "",
    AdditionalComment: "",
    PicUrl: this.props.authInfo.photoURL,
    UsrEmail: this.props.authInfo.email,
    Token: false,
  };
  change = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit() {
    if (
      !this.state.startingPoint ||
      !this.state.endingPoint ||
      !this.state.Address ||
      !this.state.DateOfJourney ||
      !this.state.TravelDetail ||
      !this.state.AdditionalComment
    ) {
      console.log("here");
      alert("Fill all fields");
    } else {
      this.props.createProjecT(this.state);
      this.setState({
        Name: "",
        PhoneNumber: "",
        startingPoint: "",
        endingPoint: "",
        Address: "",
        DateOfJourney: "",
        TravelDetail: "",
        AdditionalComment: "",
      });
      this.props.history.push("/Dashboard");
    }
  }
  render() {
    if (this.props.authInfo)
      return (
        <div className="CreateProject">
          <h2>Create Your Query</h2>
          <form>
            <div className="form">
              <label htmlFor="Name">Name</label>
              <input
                type="text"
                name="Name"
                className="form-control"
                id="Title"
                aria-describedby="emailHelp"
                placeholder={this.state.Name}
                readOnly={true}
              />
            </div>
            <div className="form">
              <label htmlFor="ContactNumber">Contact Number</label>
              <input
                type="number"
                value={this.state.PhoneNumber}
                name="PhoneNumber"
                onChange={this.change}
                className="form-control"
                id="ContactNumber"
                placeholder="// Not Mandartory // "
              />
            </div>
            <div className="form">
              <label htmlFor="startingPoint">Starting Point*</label>
              <input
                type="text"
                value={this.state.startingPoint}
                name="startingPoint"
                onChange={this.change}
                className="form-control"
                id="startingPoint"
                placeholder="eg: Campus, CNB"
              />
            </div>
            <div className="form">
              <label htmlFor="endingPoint">Ending Point*</label>
              <input
                type="text"
                value={this.state.endingPoint}
                name="endingPoint"
                onChange={this.change}
                className="form-control"
                id="endingPoint"
                placeholder="eg: Campus, CNB"
              />
            </div>
            <div className="form">
              <label htmlFor="Address">Address*</label>
              <input
                type="text"
                value={this.state.Address}
                name="Address"
                onChange={this.change}
                className="form-control"
                id="Address"
                placeholder="Your Address"
              />
            </div>
            <div className="form">
              <label htmlFor="DateOfJourney">Date Of Journey*</label>
              <input
                type="text"
                value={this.state.DateOfJourney}
                name="DateOfJourney"
                onChange={this.change}
                className="form-control"
                id="DateOfJourney"
                placeholder="Date of Journey // eg: 26/04/19"
              />
            </div>
            <div className="form">
              <label htmlFor="travelDetail">Travel Detail*</label>
              <input
                type="text"
                value={this.state.TravelDetail}
                name="TravelDetail"
                onChange={this.change}
                className="form-control"
                id="travelDetail"
                placeholder="Your TrainNumber / FlightNumber"
              />
            </div>
            <div className="form">
              <label htmlFor="additionalComment">Additonal Comment</label>
              <input
                type="text"
                value={this.state.AdditionalComment}
                name="AdditionalComment"
                onChange={this.change}
                className="form-control"
                id="additionalComment"
                placeholder="Additional Comment"
              />
            </div>
            <button
              type="button"
              onClick={this.onSubmit.bind(this)}
              className="FormBtn"
            >
              Submit
            </button>
          </form>
        </div>
      );
    else
      return (
        <div className="container text-center">
          <div className="container">
            <h3>Your Have To First SignIn using Your Gmail Account</h3>
          </div>
        </div>
      );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createProjecT: (project) => dispatch(createProject(project)),
  };
};
export default connect(null, mapDispatchToProps)(CreateProject);
