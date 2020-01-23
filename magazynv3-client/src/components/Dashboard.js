import React, { Component } from "react";
import ProjectItem from "./Project/ProjectItem";
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
              {projects.map(project => (
                <ProjectItem key={project.id} project={project} /> 
              ))}
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
  project: PropTypes.object.isRequired,
  getProjects: PropTypes.func.isRequired
};
//przyjmuje parametr state i podłącza project to state project (mappuje do componentu aplikacji)
const mapStateToProps = state => ({
  project: state.project
});
//łączenie componentu z state
export default connect(
//podczas łączenie się ze state aplikacji wymagane jest zmapowanie wszystkich state do props
  mapStateToProps,
  { getProjects }
)(Dashboard);
