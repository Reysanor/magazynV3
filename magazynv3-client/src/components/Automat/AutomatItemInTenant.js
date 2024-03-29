import React, { Component } from "react";
//
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteAutomatfromTenant } from "../../actions/automatActions";
//import { getInsertedProductsToAutomatTotalProfit } from "../../actions/insertedProductActions";
import {deleteAllProductToAutomat} from "../../actions/productToAutomatActions";

class AutomatItemInTenant extends Component {
  componentDidMount() {
   // this.props.getInsertedProductsToAutomatTotalProfit(this.props.automat.serialNumber);

  }

  //funkcja kasowania po naciśnieciu
  onDeleteClick = (automat_serialNumber) => {
    this.props.deleteAutomatfromTenant(automat_serialNumber);
    this.props.deleteAllProductToAutomat(automat_serialNumber);

  };

  render() {
    //pobieram dane automata od dashboard
    //<span className="mx-auto">{automat.nip}</span> = przykład wyświetlenia danych
    const { automat } = this.props;
    console.log(automat)
    const { tenant_id } = this.props;
    return (
      <div className="container">
        <div className="card card-body bg-light mb-3">
          <div className="row">
            <div className="col-lg-6 col-md-4 col-8">
            
              <Link to={{pathname: `/automatBoard/${automat.serialNumber}`,state: {
                tenant_id: tenant_id
              },
             }}>
                <li className="list-group-item">
                  <i className="fa fa-flag-checkered"> {automat.name} </i>
                </li>
              </Link>
              <p className="list-group-item disabled">
                Całkowity zysk: {automat.profit} zł
              </p>
            </div>

            <div className="col-lg-6 col-md-4 col-8">
              {/*Link z parametrem (id tego automat)*/}
              <Link to={`/addFundsDrawn/${automat.serialNumber}/${tenant_id}`}>
                <li className="list-group-item">
                  <i className="fa fa-flag-checkered"> Pobierz środki </i>
                </li>
              </Link>

              <Link to={`/insertedProductsToAutomat/${automat.serialNumber}/${tenant_id}`}>
                <li className="list-group-item">
                  <i className="fas fa-plus-circle"> Podsumowanie</i>
                </li>
              </Link>

              <button
                className="list-group-item list-group-item-action"
                onClick={this.onDeleteClick.bind(
                  this,
                  //uzyskuje z props od rodzica (Wybranego automata na liscie Projektów)
                  automat.serialNumber
                )}
              >
                {/* funkcja kasowania z routera */}
                <i className="fa fa-minus-circle pr-1">
                  Usuń automat z miejsca
                </i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
AutomatItemInTenant.propTypes = {
  deleteAutomatfromTenant: PropTypes.func.isRequired,
 // getInsertedProductsToAutomatTotalProfit: PropTypes.func.isRequired,
 // inserted_product: PropTypes.object.isRequired,
  deleteAllProductToAutomat: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
 // inserted_product: state.inserted_product,
});

export default connect(
  //nie mapuje stanu bo mam tylko skasować w tym widoku
  mapStateToProps,
  { deleteAutomatfromTenant,deleteAllProductToAutomat }
)(AutomatItemInTenant);
