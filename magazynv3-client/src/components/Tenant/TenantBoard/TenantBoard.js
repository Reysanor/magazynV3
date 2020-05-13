import React, { Component } from "react";
//connect state of connected component to current state
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getTenantsToAutomat } from "../../../actions/automatActions";
import AutomatsToTenantOwned from "./AutomatsToTenantOwned";

class TenantBoard extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
    };
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getTenantsToAutomat(id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { id } = this.props.match.params;
    const { automats } = this.props.automat;
    const { errors } = this.state;
    let BoardContent;

    const boardAlgorithm = (errors, automats) => {
      if (automats.length < 1) {
        if (errors.tenantNotFound) {
          return (
            <div className="alert alert-danger text-center" role="alert">
              {errors.tenantNotFound}
            </div>
          );
        } else if (errors.id) {
          return (
            <div className="alert alert-danger text-center" role="alert">
              {errors.id}
            </div>
          );
        } else {
          return (
            <div className="alert alert-info text-center" role="alert">
              No Automat on this board
            </div>
          );
        }
      } else {
        {
          /* przekazanie do backlog*/
        }
        return (
          <AutomatsToTenantOwned automats_prop={automats} tenant_id_prop={id} />
        );
      }
    };
    BoardContent = boardAlgorithm(errors, automats);

    return (
      <div className="container">
        <Link to="/tenants" className="btn btn-lg btn-info">
          Lista miejsc
        </Link>{" "}
        <Link to={`/addAutomatToTenant/${id}`} className="btn btn-lg btn-info">
          Dodaj Automat do miejsca
        </Link>
        <br />
        <hr />
        {BoardContent}
      </div>
    );
  }
}

PropTypes.propTypes = {
  getTenantsToAutomat: PropTypes.func.isRequired,
  automat: PropTypes.object.isRequired,

  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  automat: state.automat,
  errors: state.errors,
});

export default connect(mapStateToProps, { getTenantsToAutomat })(TenantBoard);
