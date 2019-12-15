import React, { Component } from "react";
import { Link } from "react-router-dom";
import Backlog from "./Backlog";
//connect state of connected component to current state
import {connect} from "react-redux";
import PropTypes from "prop-types";
import  { getBacklog } from "../../actions/backlogActions";


class ProjectBoard extends Component {

//constructor to errors
componentDidMount(){
  const { id } = this.props.match.params; //pobranie id ze ścieżki
  this.props.getBacklog(id); //pobranie backloga ze wskazanym id
}


  render() {
    const { id } = this.props.match.params;
    return (
      <div className="container">
        <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
          <i className="fas fa-plus-circle"> Create Project Task</i>
        </Link>
        <br />
        <hr />
        <Backlog />
      </div>
    );
  }
}

ProjectBoard.propTypes = {
  //objekt
  backlog: PropTypes.object.isRequired,
  //funkcja
  getBacklog: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  backlog: state.backlog,

})

export default connect(mapStateToProps, {getBacklog})(ProjectBoard);
