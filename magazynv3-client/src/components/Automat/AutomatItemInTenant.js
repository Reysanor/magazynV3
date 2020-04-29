import React, { Component } from "react";
//
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteAutomatfromTenant } from "../../actions/automatActions";

class AutomatItemInTenant extends Component {
  //funkcja kasowania po naciśnieciu
  onDeleteClick = (automat_serialNumber) => {
    this.props.deleteAutomatfromTenant(automat_serialNumber);
  };

  render() {
    //pobieram dane automata od dashboard
    //<span className="mx-auto">{automat.nip}</span> = przykład wyświetlenia danych
    const { automat } = this.props;
    return (
      <div className="container">
        <div className="card card-body bg-light mb-3">
          <div className="row">
            <div className="col-lg-6 col-md-4 col-8">
              <p>{automat.name}</p>
              <p>{automat.serialNumber}</p>
              <p>{automat.type}</p>
              <p>{automat.capacity}</p>
              <p>{automat.status}</p>
              <p>{automat.productionDate}</p>
            </div>
            <div className="col-md-6 d-none d-lg-block">
              <ul className="list-group">
                {/*Link z parametrem (id tego automat)*/}

                <Link to={`/automatBoard/${automat.serialNumber}`}>
                  <li className="list-group-item board">
                    <i className="fa fa-flag-checkered pr-1"> Automat Board </i>
                  </li>
                </Link>
                <li
                  className="list-group-item delete"
                  onClick={this.onDeleteClick.bind(
                    this,
                    //uzyskuje z props od rodzica (Wybranego automata na liscie Projektów)
                    automat.serialNumber
                  )}
                >
                  {/* funkcja kasowania z routera */}
                  <i className="fa fa-minus-circle pr-1">
                    {" "}
                    Remove automat from tenant
                  </i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
AutomatItemInTenant.propTypes = {
  deleteAutomatfromTenant: PropTypes.func.isRequired,
};

export default connect(
  //nie mapuje stanu bo mam tylko skasować w tym widoku
  null,
  { deleteAutomatfromTenant }
)(AutomatItemInTenant);
