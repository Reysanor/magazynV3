import React, { Component } from "react";
import ProjectItem from "./Project/ProjectItem";
import TenantItem from "./Tenant/TenantItem";
import CreateProjectButton from "./Project/CreateProjectButton";
import { connect } from "react-redux";
import { getProjects } from "../actions/projectActions";
import { getTenants } from "../actions/tenantActions";
import PropTypes from "prop-types";

class Dashboard extends Component {
  //lifecycle hook - co ma się dziać po zamontowaniu komponentu (dane z "mapStateToProps" na dole)
  componentDidMount() {
    this.props.getProjects();
    this.props.getTenants();
  }

  render() {
    //pobieram projekty
   const { projects } = this.props.project;
    const { tenants } = this.props.tenant;
    //mapuje przycisk z linkiem do tworzenia nowego projektu a poniżej utworzone projekty
    return (
      <div>


      <div className="tenants">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4 text-center">Tenants</h1>
          
            <hr />
            {/*mapuje projekty i wyswietlam je jako projectItemy */}
            {tenants.map(tenant => (
              <TenantItem key={tenant.id} tenant={tenant} />
            ))}
          </div>
        </div>
      </div>
    </div>


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

      </div>
    );
  }
}

Dashboard.propTypes = {
  //przekazuje funkcje, isRequired oznacza że jest niezbędna do działania componentu
  //jednocześnie określa wymagany typ uzyskanego prop
  getProjects: PropTypes.func.isRequired,
  getTenants: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  tenant: PropTypes.object.isRequired
};
//przyjmuje parametr state i podłącza project to state project (mappuje do componentu aplikacji)
const mapStateToProps = state => ({
  project: state.project,
  tenant: state.tenant
});
//łączenie componentu z state
export default connect(
  //podczas łączenie się ze state aplikacji wymagane jest zmapowanie wszystkich state do props
  mapStateToProps,
  { getTenants, getProjects }
)(Dashboard);
