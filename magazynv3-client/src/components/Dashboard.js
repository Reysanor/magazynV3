import React, { Component } from "react";

import ProjectItem from "./Project/ProjectItem";
import { Link } from "react-router-dom";
import CreateProjectButton from "./Project/CreateProjectButton";
import { connect } from "react-redux";
import { getProjects } from "../actions/projectActions";
import PropTypes from "prop-types";

class Dashboard extends Component {
  //lifecycle hook - co ma się dziać po zamontowaniu komponentu (dane z "mapStateToProps" na dole)
  componentDidMount() {
    this.props.getProjects();
  }

  render() {
    //pobieram projekty
    const { projects } = this.props.project;

    //mapuje przycisk z linkiem do tworzenia nowego projektu a poniżej utworzone projekty
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="card text-center mb-2">
                <Link to="/automats" className="btn  bg-secondary text-white">
                  Automats
                </Link>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center mb-2">
                <Link to="/products" className="btn bg-primary text-white">
                  Magazyn
                </Link>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center mb-2">
                <Link to="/tenants" className="btn bg-success text-white">
                  Places
                </Link>
              </div>
            </div>
            
          </div>
        </div>
        <br />
        <br />
        <br />

        <h1 className="display-4 text-center">DEVELOPER ONLY CODE</h1>
        <br />
        <br />
        <br />

        <div className="projects">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="display-4 text-center">Projects</h1>
                <br />
                {/*przycisk do utworzenia nowego projektu */}
                <CreateProjectButton />
                <br />
                <hr />
                {/*mapuje projekty i wyswietlam je jako projectItemy */}
                {projects.map((project) => (
                  <ProjectItem key={project.id} project={project} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  //przekazuje funkcje, isRequired oznacza że jest niezbędna do działania componentu
  //jednocześnie określa wymagany typ uzyskanego prop
  getProjects: PropTypes.func.isRequired,

  project: PropTypes.object.isRequired,
};
//przyjmuje parametr state i podłącza project to state project (mappuje do componentu aplikacji)
const mapStateToProps = (state) => ({
  project: state.project,
});
//łączenie componentu z state
export default connect(
  //podczas łączenie się ze state aplikacji wymagane jest zmapowanie wszystkich state do props
  mapStateToProps,
  {
    getProjects,
  }
)(Dashboard);
