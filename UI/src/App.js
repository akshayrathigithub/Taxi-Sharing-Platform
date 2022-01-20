import React, { Component } from "react";
import firebase from "firebase";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import Auth from "./auth";
import "./App.css";
import GoogleSvg from "./Google_Logo.svg";
import GuestSvg from "./user.svg";
import Pic_1 from "./guest_img.jpg";

class App extends Component {
  state = {
    authInfo: null,
    isLoggedIn: false,
    isGuestUser: false,
  };

  componentDidMount() {
    this.checkAuthState();
  }

  GoogleLogin = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        this.checkAuthState();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  guestLogin = () => {
    this.setState({ isGuestUser: true });
  };

  checkAuthState() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        const displayName = user.displayName;
        const email = user.email;
        const emailVerified = user.emailVerified;
        const photoURL = user.photoURL;
        const uid = user.uid;
        const phoneNumber = user.phoneNumber;
        const providerData = user.providerData;
        user.getIdToken().then((accessToken) => {
          const Info = {
            displayName: displayName,
            email: email,
            emailVerified: emailVerified,
            photoURL: photoURL,
            uid: uid,
            phoneNumber: phoneNumber,
            providerData: providerData,
            accessToken: accessToken,
          };
          console.log(Info);
          this.setState({ authInfo: Info, isLoggedIn: true });
        });
      } else {
        console.log("user not logged in");
      }
    });
  }

  generateUsrInfo = () => {
    const Info = {
      displayName: "John Doe",
      email: "johndoe@test.com",
      emailVerified: true,
      photoURL: process.env.React_App_Guest_Pic_URL,
      uid: "1234567890",
      phoneNumber: 1234567890,
      providerData: "",
      accessToken: "",
    };
    this.setState({ authInfo: Info, isLoggedIn: true });
  };

  LogoutUser = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // document.getElementById('LoginScreen').style.display="block"
        // document.getElementById('dashboard').style.display="none"
      })
      .catch((e) => {
        console.log(e);
      });
  };

  demoProfile = () => {
    return (
      <div className="guest-profile-wrapper">
        <img src={Pic_1} alt="guestImg" className="img" />
        <div className="name">John Doe</div>
        <div className="email">johndoe@test.com</div>
        <div className="continue-btn" onClick={this.generateUsrInfo}>
          <span>Continue</span>
        </div>
      </div>
    );
  };

  render() {
    if (!this.state.isLoggedIn) {
      return (
        <div className="LoginScreen">
          {this.state.isGuestUser ? (
            this.demoProfile()
          ) : (
            <div className="wrapper">
              <div className="title">TAXI-SHARING-PLATFORM</div>
              <div className="sub-title">Log in with</div>
              <div className="btn-wrapper">
                <div className="btn google" onClick={this.GoogleLogin}>
                  <img src={GoogleSvg} alt="googleIcon" />
                  <p className="text">Google</p>
                </div>
                <div className="btn guest" onClick={this.guestLogin}>
                  <img src={GuestSvg} alt="guestIcon" />
                  <p className="text">Guest</p>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <HashRouter>
          <Redirect from="/" to="Dashboard" />
          <Switch>
            <Route
              path="/"
              render={() => <Auth authInfo={this.state.authInfo} />}
            />
          </Switch>
        </HashRouter>
      );
    }
  }
}

export default App;
