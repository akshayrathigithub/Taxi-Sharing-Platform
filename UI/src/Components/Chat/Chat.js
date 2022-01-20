import React, { Component } from "react";
import socketIOClient from "socket.io-client";

let socket;
export default class Chat extends Component {
  constructor(props) {
    super(props);
    socket = socketIOClient("/");
    this.state = {
      ReceivedData: [],
      Message: "",
      count: 0,
      OnlineUserList: [],
    };
  }

  componentWillUnmount() {
    let data = { email: this.props.authInfo.email, ID: this.props.id };
    socket.emit("terminated", data);
    console.log("UnmountedCalled");
  }
  componentWillMount() {
    let data = { email: this.props.authInfo.email, ID: this.props.id };
    socket.emit("InitialData", data);
    socket.on("NewUser", (EmailId) => {
      let flag = this.state.OnlineUserList.indexOf(EmailId);
      console.log(EmailId);
      if (EmailId && flag === -1) {
        let ModifiedArr = this.state.OnlineUserList;
        ModifiedArr.push(EmailId);
        this.setState({ OnlineUserList: ModifiedArr });
        socket.emit("ConfirmUser", {
          Email: this.props.authInfo.email,
          ID: this.props.id,
        });
      } else if (EmailId === undefined) {
      } else {
        alert("Please close your other session");
      }
      console.log(this.state.OnlineUserList);
    });
    socket.on("UserDisconnected", (EmailId) => {
      let indeX = this.state.OnlineUserList.indexOf(EmailId);
      let ModifiedArr = this.state.OnlineUserList;
      ModifiedArr.splice(indeX, 1);
      this.setState({ OnlineUserList: ModifiedArr });
    });
    socket.on("NewMessage", (Data) => {
      let NewData = this.state.ReceivedData;
      NewData.push(Data);
      this.setState({ ReceivedData: NewData });
    });
  }

  Changed = (e) => {
    this.setState({ Message: e.target.value });
  };

  Submit = () => {
    let Data = {
      Name: this.props.authInfo.displayName,
      Email: this.props.authInfo.email,
      Message: this.state.Message,
      ID: this.props.id,
      PhotoURL: this.props.authInfo.photoURL,
    };
    let NewData = this.state.ReceivedData;
    NewData.push(Data);
    this.setState({ Message: "" });
    socket.emit("Message", Data);
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.ReceivedData === nextState.ReceivedData) return true;
    else return false;
  }
  render() {
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ backgroundColor: "#f3f8fe", width: "100%" }}>
          {this.state.ReceivedData ? (
            this.state.ReceivedData.map((message, id) => {
              if (message.Email === this.props.authInfo.email) {
                return (
                  <div className="MessageContent" key={id}>
                    <div className="speech-bubble-user">
                      <h4>{message.Name}</h4>
                      <p style={{ maxWidth: "95%" }}>{message.Message}</p>
                      <span className="time-left">{message.Email}</span>
                    </div>
                    <div className="ImageContent">
                      <div
                        id="img"
                        className="right"
                        style={{
                          background: `url('${message.PhotoURL}')`,
                          backgroundSize: "cover",
                          float: "right",
                          maxWidth: "85px",
                          height: "85px",
                          maxHeight: "85px",
                          width: "85px",
                          marginRight: "0px",
                          marginLeft: "20px",
                          borderRadius: "50%",
                        }}
                      ></div>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="MessageContent" key={id}>
                    <div className="ImageContent-other">
                      <div
                        id="img"
                        className="left"
                        style={{
                          background: `url('${message.PhotoURL}')`,
                          backgroundSize: "cover",
                          float: "left",
                          maxWidth: "85px",
                          height: "85px",
                          maxHeight: "85px",
                          width: "85px",
                          marginRight: "0px",
                          marginLeft: "20px",
                          borderRadius: "50%",
                        }}
                      ></div>
                    </div>
                    <div className="speech-bubble-other">
                      <h4>{message.Name}</h4>
                      <p style={{ maxWidth: "95%" }}>{message.Message}</p>
                      <span className="time-right">{message.Email}</span>
                    </div>
                  </div>
                );
              }
            })
          ) : (
            <p>No Messages</p>
          )}
          <div id="MessageSection">
            <input
              placeholder="Type Your Message"
              onChange={this.Changed}
              value={this.state.Message}
            />
            <p id="Send" onClick={this.Submit}>
              Send
            </p>
          </div>
          <div style={{ marginLeft: "1rem" }}>
            <p>ONLINE: {this.state.OnlineUserList.length}</p>
          </div>
        </div>
      </div>
    );
  }
}
