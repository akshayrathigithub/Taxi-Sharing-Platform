import React, { Component } from "react";
import NavBar from "./Components/layout/NavBar";
import { HashRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import "firebase/firestore";
import Dashboard from "./Components/dashboard/Dashboard";
import CreateProject from "./Components/projects/CreateProject";
import Home from "./Components/layout/Home";
import Inbox from "./Components/Chat/Inbox";
import firebase from "firebase";

class Auth extends Component {
  state = {
    authInfo: null,
  };
  componentDidMount() {}
  render() {
    if (this.props.projects)
      return (
        <HashRouter>
          <NavBar authInfo={this.props.authInfo} />
          <Switch>
            <Route
              exact
              path="/Dashboard"
              render={() => (
                <Dashboard
                  Project={this.props.projects}
                  authInfo={this.props.authInfo}
                />
              )}
            />
            <Route
              path="/Createproject"
              render={({ history }) => (
                <CreateProject
                  history={history}
                  authInfo={this.props.authInfo}
                />
              )}
            />
            <Route path="/Info" component={Home} />
            <Route
              path="/Inbox"
              render={() => (
                <Inbox
                  ChatEvents={this.props.ChatRooms}
                  authInfo={this.props.authInfo}
                />
              )}
            />
          </Switch>
        </HashRouter>
      );
    else return <h1>Loading......</h1>;
  }
}
const mapStateToProps = (state) => {
  if (state.firestore.ordered.Posts) {
    return {
      projects: state.firestore.ordered.Posts,
      ChatRooms: state.firestore.ordered.ChatRooms,
    };
  } else
    return {
      projects: null,
    };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "Posts" }, { collection: "ChatRooms" }])
)(Auth);
