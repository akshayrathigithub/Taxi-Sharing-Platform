import React, { Component } from "react";
import ProjectList from "../projects/ProjectList";
import Fuse from "fuse.js";
import "firebase/firestore";
import Footer from "../Footer/Footer";

class Dashboard extends Component {
  state = {
    Keyword: "",
    ModifiedArray: this.props.Project,
    PagedArray: [],
    NoOfButton: 0,
    LeftsPost: 0,
  };
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.Project !== nextProps.Project) {
      this.setState({
        PagedArray: [...nextProps.Project],
      });
    }
    return true;
  }

  componentDidMount() {
    this.setState({
      PagedArray: [...this.props.Project],
    });
  }
  change = (e) => this.setState({ [e.target.name]: e.target.value });

  onSearch() {
    let SearchedPost = [...this.props.Project];
    let options = {
      shouldSort: true,
      threshold: 0.4,
      location: 0,
      distance: 100,
      maxPatternLength: 36,
      minMatchCharLength: 3,
      keys: ["endingPoint", "startingPoint", "TravelDetail"],
    };
    let fuse = new Fuse(SearchedPost, options); // "list" is the item array
    if (this.state.Keyword.length > 2) {
      console.log(fuse.search(this.state.Keyword));
      this.setState({ PagedArray: fuse.search(this.state.Keyword) });
    } else {
      this.setState({ PagedArray: [...this.props.Project] });
    }
  }
  render() {
    if (this.props.Project.length > 0)
      return (
        <div className="Container">
          <div className="SearchLayout">
            <div className="SearchInput">
              <input
                type="text"
                value={this.state.Keyword}
                name="Keyword"
                onChange={this.change}
                placeholder="Search for StartingPoint, EndingPoint, TravelDetail"
              />
              <button
                type="button"
                onClick={this.onSearch.bind(this)}
                className="SearchBtn"
              >
                Search
              </button>
            </div>
          </div>
          {console.log(this.state.PagedArray)}
          <div>
            <ProjectList
              project={this.state.PagedArray}
              auth={this.props.authInfo}
            />
          </div>
          <Footer />
        </div>
      );
    else return <h2>No Posts for now...</h2>;
  }
}

export default Dashboard;
