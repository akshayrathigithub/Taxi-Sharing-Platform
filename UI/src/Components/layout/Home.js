import React, { Component } from "react";
import Footer from "../Footer/Footer";

export default class Home extends Component {
  state = {
    show: [false, false, false, false, false, false],
  };
  Collapse(id) {
    let Arr = this.state.show;
    if (this.state.show && Arr[id - 1] === false) Arr[id - 1] = true;
    else Arr[id - 1] = false;
    this.setState({ show: Arr });
  }
  render() {
    return (
      <div className="container">
        <div id="INFO">
          <div style={{ minHeight: "calc(-80px - 10rem + 100vh)" }}>
            <div>
              <div id="Collapse_btn" onClick={this.Collapse.bind(this, 6)}>
                <div>
                  <i
                    className={
                      this.state.show[5] ? "fas fa-minus" : "fas fa-plus"
                    }
                  ></i>
                </div>
                <div className="Info_Heading">
                  <p>Authentication</p>
                </div>
              </div>
              <div
                id={this.state.show[5] ? "Text_Area_Show" : "Text_Area_Hidden"}
              >
                <p>
                  # A Gmail account is required to access the contents of site.
                  The Site doesn't store any information of a user.
                </p>
                <p>
                  # Name, Email and ProfilePic Url are retrived from a gmail
                  account(on every login) for following use
                </p>
                <p>
                  Name and Email - To display name/email of user in Posts, Chat
                  and Emails.
                </p>
                <p>ProfilePic - To dislay photo of user in Posts and Chat</p>
                <p>
                  # Authentication has been appiled using Oauth 2.0( here ) ,
                  which works on the concept of token system. In short no one
                  will know your password.
                </p>
              </div>
            </div>

            <div>
              <div id="Collapse_btn" onClick={this.Collapse.bind(this, 1)}>
                <div>
                  <i
                    className={
                      this.state.show[0] ? "fas fa-minus" : "fas fa-plus"
                    }
                  ></i>
                </div>
                <div className="Info_Heading">
                  <p>Creating A Post</p>
                </div>
              </div>
              <div
                id={this.state.show[0] ? "Text_Area_Show" : "Text_Area_Hidden"}
              >
                <p>
                  # You can create a Post by Clicking on Post button on NavBar
                </p>
                <p>
                  # Starting Point of Journey , Ending Point of Journey, Date of
                  Journey, Address and Travel Detail are Mandatory while others
                  are not.
                </p>
                <p>
                  # For the address, it will be beneficial to provide your
                  current hostel address, eg: D-306/Hall-9.
                </p>
                <p>
                  # Posts Will be autoDeleted withing 3 days so that only
                  relevant posts remain.
                </p>
                <p># Submit button can be used to post your Posts.</p>
              </div>
            </div>

            <div>
              <div id="Collapse_btn" onClick={this.Collapse.bind(this, 2)}>
                <div>
                  <i
                    className={
                      this.state.show[1] ? "fas fa-minus" : "fas fa-plus"
                    }
                  ></i>
                </div>
                <div className="Info_Heading">
                  <p>Searching through Posts</p>
                </div>
              </div>
              <div
                id={this.state.show[1] ? "Text_Area_Show" : "Text_Area_Hidden"}
              >
                <p>
                  # You can search for StartingPoint, EndingPoint and Date of
                  Journey inside collections of posts.
                </p>
                <p>
                  # Result will be displayed based on most accurate keyword
                  found in respective field of post(where keyword should have
                  more than 2 letters)
                </p>
              </div>
            </div>

            <div>
              <div id="Collapse_btn" onClick={this.Collapse.bind(this, 3)}>
                <div>
                  <i
                    className={
                      this.state.show[2] ? "fas fa-minus" : "fas fa-plus"
                    }
                  ></i>
                </div>
                <div className="Info_Heading">
                  <p>Commenting on Post</p>
                </div>
              </div>
              <div
                id={this.state.show[2] ? "Text_Area_Show" : "Text_Area_Hidden"}
              >
                <p>
                  # Comments can be made on different Posts by clicking on
                  comment button
                </p>
                <p>
                  # Every time someone comments on a Post, Author of Post will
                  be notified via email which will include your Comment, Name,
                  Email and Time of Comment
                </p>
              </div>
            </div>

            <div>
              <div id="Collapse_btn" onClick={this.Collapse.bind(this, 4)}>
                <div>
                  <i
                    className={
                      this.state.show[3] ? "fas fa-minus" : "fas fa-plus"
                    }
                  ></i>
                </div>
                <div className="Info_Heading">
                  <p>Chat</p>
                </div>
              </div>
              <div
                id={this.state.show[3] ? "Text_Area_Show" : "Text_Area_Hidden"}
              >
                <p>
                  # Chat functionality can be used to instantanously connect
                  with others, eg-
                </p>
                <p>
                  # You can create a custom Chat room which will be active for
                  only 30 mins, eg- Campus To CNB Today @8pm
                </p>
                <p>
                  # Also conversations of chats are not stored anywhere, so you
                  will only find messages after you join a chat room
                </p>
              </div>
            </div>
            <div>
              <div id="Collapse_btn" onClick={this.Collapse.bind(this, 5)}>
                <div>
                  <i
                    className={
                      this.state.show[4] ? "fas fa-minus" : "fas fa-plus"
                    }
                  ></i>
                </div>
                <div className="Info_Heading">
                  <p>Designed and Developed By Akshay Rathi</p>
                </div>
              </div>
              <div
                id={this.state.show[4] ? "Text_Area_Show" : "Text_Area_Hidden"}
              >
                <p>
                  # Corrections and suggestions are welcomed -
                  akshayra@iitk.ac.in
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
