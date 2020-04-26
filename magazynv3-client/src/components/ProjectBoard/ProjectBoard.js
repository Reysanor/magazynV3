import React, { Component } from "react";
import { Link } from "react-router-dom";
import Backlog from "./Backlog";
//connect state of connected component to current state
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getBacklog } from "../../actions/backlogActions";

class ProjectBoard extends Component {
  //constructor to errors
  constructor() {
    super();
    this.state = {
      errors: {}
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params; //pobranie id ze ścieżki
    this.props.getBacklog(id); //pobranie backloga ze wskazanym id (id projektu)
  }
  //jezeli jest error - projekt nie istnieje
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { nip } = this.props.match.params;
    const { project_tasks } = this.props.backlog; //pobranie z backloga (tylko te z id projektu )
    const { errors } = this.state;
    //
    let BoardContent;

    const boardAlgorithm = (errors, project_tasks) => {
      if (project_tasks.length < 1) {
        if (errors.projectNotFound) {
          return (
            <div className="alert alert-danger text-center" role="alert">
              {errors.projectNotFound}
            </div>
          );
        } else if (errors.projectIdentifier) {
          return (
            <div className="alert alert-danger text-center" role="alert">
              {errors.projectIdentifier}
            </div>
          );
        } else {
          return (
            <div className="alert alert-info text-center" role="alert">
              No Project Tasks on this board
            </div>
          );
        }
      } else {
        {
          /* przekazanie do backlog*/
        }
        return <Backlog project_tasks_prop={project_tasks} />;
      }
    };
    //zapisuej wynik sprawdzenia istnienia projektu do zmiennej
    BoardContent = boardAlgorithm(errors, project_tasks);

    return (
      <div className="container">
        <Link to={`/addProjectTask/${nip}`} className="btn btn-primary mb-3">
          <i className="fas fa-plus-circle"> Create Project Task</i>
        </Link>
        <br />
        <hr />
        {/*wyswietlam errry albo taski  */}
        {BoardContent}
      </div>
    );
  }
}

ProjectBoard.propTypes = {
  //objekt
  backlog: PropTypes.object.isRequired,
  //funkcja
  getBacklog: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  backlog: state.backlog,
  errors: state.errors
});

export default connect(mapStateToProps, { getBacklog })(ProjectBoard);
