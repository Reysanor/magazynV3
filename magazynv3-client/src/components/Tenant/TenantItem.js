import React, { Component } from "react";
//
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteTenant } from "../../actions/tenantActions";

class TenantItem extends Component {
  //funkcja kasowania po naciśnieciu
  onDeleteClick = (id) => {
    this.props.deleteTenant(id);
  };

  render() {
    //pobieram dane tenanta od dashboard
    //<span className="mx-auto">{tenant.nip}</span> = przykład wyświetlenia danych
    const { tenant } = this.props;
    return (
      <div className="container">
        <div className="card card-body bg-light mb-3">
          <div className="row">
            <div className="col-lg-6 col-md-4 col-8">
              <Link to={`/tenantBoard/${tenant.id}`}>
                <li className="list-group-item">
                  <i className="fa fa-flag-checkered pr-1">
                    {tenant.name} - {tenant.city}
                  </i>
                </li>
              </Link>
            </div>

            <div className="col-lg-6 col-md-4 col-8">
                {/*Link z parametrem (id tego tenanta)*/}
                <Link to={`/updateTenant/${tenant.id}`}>
                  <li className="list-group-item">
                    <i className="fa fa-edit pr-1"> Update Tenant Info</i>
                  </li>
                </Link>

                <button
                  className="list-group-item list-group-item-action"
                  onClick={this.onDeleteClick.bind(
                    this,
                    //uzyskuje z props od rodzica (Wybranego tenanta na liscie Projektów)
                    tenant.id
                  )}
                >
                  {/* funkcja kasowania z routera */}
                  <i className="fa fa-minus-circle pr-1"> Delete Tenant</i>
                </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
TenantItem.propTypes = {
  deleteTenant: PropTypes.func.isRequired,
};

export default connect(
  //nie mapuje stanu bo mam tylko skasować w tym widoku
  null,
  { deleteTenant }
)(TenantItem);
