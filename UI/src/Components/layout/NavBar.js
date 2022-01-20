import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";

class NavBar extends Component {
  state = {
    show: true,
  };

  Show = () => {
    this.setState({ show: !this.state.show });
  };

  OnLoggedOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        window.location.reload();
      })
      .catch(() => {});
  };

  render() {
    return (
      <div className={this.state.show ? "NavBar" : "NavBar-T"}>
        <div id="LogoSec">
          <p>Taxi-Sharing-Portal</p>
          <div id="Toggle">
            <i
              onClick={this.Show}
              className={
                this.state.show ? "fas fa-bars fa-2x" : "fas fa-times fa-2x"
              }
            ></i>
          </div>
        </div>
        <div className="Parts">
          <ul className="List">
            <li className="items">
              <Link to="/Dashboard" className="nav-link">
                Home
              </Link>
            </li>
            <li className="items">
              <Link to="/Createproject" className="nav-link">
                Post
              </Link>
            </li>
            <li className="items">
              <Link to="/Inbox" className="nav-link">
                Chat
              </Link>
            </li>
            <li className="items">
              <Link to="/Info" className="nav-link">
                Info
              </Link>
            </li>
            <li className="items">
              <a className="nav-link" onClick={this.OnLoggedOut}>
                Log Out
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default NavBar;
