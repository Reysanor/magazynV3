import React, { Component } from "react";
//
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteAutomat } from "../../actions/automatActions";

class AutomatItem extends Component {
    //funkcja kasowania po naciśnieciu
    onDeleteClick = id => {
        this.props.deleteAutomat(id);
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
                        <div className="col-md-4 d-none d-lg-block">
              <ul className="list-group">
              
                           {/*Link z parametrem (id tego automat)*/}
                <Link to={`/updateAutomat/${automat.serialNumber}`}>
                  <li className="list-group-item update">
                    <i className="fa fa-edit pr-1"> Update Automat Info</i>
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
                  <i className="fa fa-minus-circle pr-1"> Delete Automat</i>
                </li>
              </ul>
            </div>
          </div>
                     
     </div>
    </div>
        );
    }
}
AutomatItem.propTypes = {
    deleteAutomat: PropTypes.func.isRequired
};

export default connect(
    //nie mapuje stanu bo mam tylko skasować w tym widoku
    null,
    { deleteAutomat }
)(AutomatItem);
