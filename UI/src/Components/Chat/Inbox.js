import React, { Component } from "react";
import Message from "./Message";
import { connect } from "react-redux";
import { ChatRooms } from "../../Store/actions/chatAction";
import Chat from "./Chat";
import firebase from "firebase/app";
import "firebase/firestore";

class Inbox extends Component {
  state = {
    show: false,
    event: "",
    ChatCalled: true,
    ChatId: "",
  };
  show = () => {
    this.setState({ show: !this.state.show });
  };
  componentWillMount() {
    let flag = false;
    let ChatRoomsArr =
      this.props.ChatEvents &&
      this.props.ChatEvents[0].Rooms.filter((chat) => {
        let LimitTime = chat.Time.seconds + 30 * 60;
        let PresentTime = Math.floor(Date.now() / 1000);
        if (PresentTime > LimitTime && chat.Event !== "Public") {
          flag = true;
        } else return chat;
      });
    if (flag) {
      console.log(ChatRoomsArr);
      const firestore = firebase.firestore();
      firestore.collection("ChatRooms").doc("7iQqm4PZarGFAcUwBOqy").update({
        Rooms: ChatRoomsArr,
      });
    }
  }
  Changed = (e) => {
    this.setState({ event: e.target.value });
  };
  Submit = () => {
    let Info = {
      Time: new Date(),
      Event: this.state.event,
      Name: this.props.authInfo.displayName,
      Email: this.props.authInfo.email,
    };
    this.props.ChatRooms(Info);
    this.setState({ show: false, event: "" });
  };
  chatcalled = (ID) => {
    this.setState({ ChatCalled: !this.state.ChatCalled, ChatId: ID });
  };
  render() {
    if (this.state.ChatCalled)
      return (
        <div style={{ backgroundColor: this.state.show ? "#808080" : null }}>
          {this.state.show ? (
            <div id="PopUp">
              <div id="card">
                <p>Your Event Name ? </p>
                <input
                  placeholder="Event"
                  type="text"
                  value={this.state.event}
                  onChange={this.Changed}
                />
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div id="btn" className="Cancel" onClick={this.show}>
                    <p>Cancel</p>
                  </div>
                  <div id="btn" className="Submit" onClick={this.Submit}>
                    <p>Submit</p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          <div className="border"></div>
          <div id="Task">
            <p id="CreateEvent" onClick={this.show}>
              Create event
            </p>
          </div>
          <div className="border"></div>
          <div></div>
          {this.props.ChatEvents &&
            this.props.ChatEvents[0].Rooms.map((chat, id) => {
              return (
                <Message
                  key={id}
                  ClickedCalled={this.chatcalled}
                  Name={chat.Name}
                  Task={chat.Event}
                  CreatedOn={chat.Time.seconds}
                  CreatorEmail={chat.Email}
                />
              );
            })}
        </div>
      );
    else return <Chat id={this.state.ChatId} authInfo={this.props.authInfo} />;
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    ChatRooms: (ChatEvent) => dispatch(ChatRooms(ChatEvent)),
  };
};
export default connect(null, mapDispatchToProps)(Inbox);
