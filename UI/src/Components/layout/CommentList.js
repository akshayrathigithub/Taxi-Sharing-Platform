import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createComment } from '../../Store/actions/commentAction'
import Comment from './Comment';
import axios from 'axios';

class CommentList extends Component {
  state = {
    CommentDetail:{
    Comment: '',
    Time: new Date(),
    Photo: '',
    Email: '',
    Name: ''
  }
}
  CommeNt = e => {
    this.setState({
      CommentDetail:{
      Comment: e.target.value,
      Time: new Date(),
    Photo: this.props.UserInfo.photoURL,
    Email: this.props.Property.UsrEmail,
    Name: this.props.UserInfo.displayName
    }})
  }
  SubMit = e => {
    const { Comment, Photo, Email, Name, Time} = this.state.CommentDetail
    // e.preventDefault()
    if (e.key === 'Enter') {
      this.props.createComment(this.props.Property.id, this.state.CommentDetail)
      const comment =  axios.post('/',{
        Comment,
        Photo,
        Email,
        Name,
        Time
      })
      this.setState({
        CommentDetail:{
          Comment: '',
          Time: '',
          Photo: '',
          Email: '',
          Name: ''
        }})
    }

  }
  render() {
    return (
      <div className="container">
        {this.props.Property.CommentSection && this.props.Property.CommentSection.map(comment => {
          return (
            <Comment key={this.props.Property.CommentSection.indexOf(comment)} property={comment} />
          )
        })}
        <div id="CommentInput">
        <input type="text" name="Comment" value={this.state.CommentDetail.Comment} onChange={this.CommeNt}  onKeyPress={this.SubMit} placeholder="Add a Comment" />
        </div>
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    createComment: (ID, Comment) => dispatch(createComment(ID, Comment))
  }
}
export default connect(null, mapDispatchToProps)(CommentList)
