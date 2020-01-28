import React, { Component } from "react";
//
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteTenant } from "../../actions/tenantActions";

class TenantItem extends Component {
    //funkcja kasowania po naciśnieciu
    onDeleteClick = id => {
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
                        <div className="col-2">
                            <span className="mx-auto">{tenant.nip}</span>
                        </div>
                        <div className="col-lg-6 col-md-4 col-8">
                            <p>{tenant.name}</p>
                            <p>{tenant.street}</p>
                        </div>
                        </div>
                    </div>
            </div>
        );
    }
}
TenantItem.propTypes = {
    deleteTenant: PropTypes.func.isRequired
};

export default connect(
    //nie mapuje stanu bo mam tylko skasować w tym widoku
    null,
    { deleteTenant }
)(TenantItem);
