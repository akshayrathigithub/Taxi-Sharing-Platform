import React, { Component } from "react"
import firebase from "firebase/app"
import "firebase/firestore"

export default class TimeCounter extends Component {
  state = {
    Created: this.props.Created.createdAt.seconds,
    Minutes: "",
    Hours: "",
    Days: "",
    Seconds: "",
    Diff: "",
  }
  componentWillUnmount() {
    clearTimeout(this.Timer)
  }
  componentDidMount() {
    this.Timer = setInterval(() => {
      this.setState({
        Diff: 3 * 24 * 60 * 60 - ((Date.now() / 1000 - this.state.Created) | 0),
        Seconds: this.state.Diff % 60 | 0,
        Minutes: (this.state.Diff / 60) % 60 | 0,
        Hours: (this.state.Diff / 3600) % 24 | 0,
        Days: (this.state.Diff / (3600 * 24)) | 0,
      })
      this.setState({
        Days: this.state.Days,
        Hours: this.state.Hours < 10 ? "0" + this.state.Hours : this.state.Hours,
        Minutes: this.state.Minutes < 10 ? "0" + this.state.Minutes : this.state.Minutes,
        Seconds: this.state.Seconds < 10 ? "0" + this.state.Seconds : this.state.Seconds,
      })
    }, 1000)
  }
  Delete(id) {
    if (this.state.Diff < 0) {
      let arrayA = firebase.firestore()
      arrayA.collection("Posts").doc(id).delete()
    }
  }
  render() {
    const { Minutes, Hours, Days, Seconds } = this.state
    return (
      <div id="Timer_Info">
        <p className="h6">
          AutoDelete in {Days}d : {Hours}h : {Minutes}m : {Seconds}s
        </p>
        {this.Delete(this.props.Created.id)}
      </div>
    )
  }
}
