import React, { Component } from "react";
//
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteAutomatfromTenant } from "../../actions/automatActions";
import { getInsertedProductsToAutomatTotalProfit } from "../../actions/insertedProductActions";

class AutomatItemInTenant extends Component {


  componentDidMount() {
    this.props.getInsertedProductsToAutomatTotalProfit(this.props.automat.serialNumber); 
   }

  //funkcja kasowania po naciśnieciu
  onDeleteClick = (automat_serialNumber) => {
    this.props.deleteAutomatfromTenant(automat_serialNumber);
  };

  render() {
    //pobieram dane automata od dashboard
    //<span className="mx-auto">{automat.nip}</span> = przykład wyświetlenia danych
    const { automat } = this.props;
    const { tenant_id } = this.props;
    const {profit} = this.props.inserted_product.inserted_product;
    return (
      <div className="container">
        <div className="card card-body bg-light mb-3">
          <div className="row">
            <div className="col-lg-6 col-md-4 col-8">
              <p>{automat.name}</p>
              <p>Całkowity zysk: {profit} zł</p>
            </div>
      
            <div className="col-md-6 d-none d-lg-block">
              <ul className="list-group">
                {/*Link z parametrem (id tego automat)*/}

                <Link to={`/automatBoard/${automat.serialNumber}`}>
                  <li className="list-group-item board">
                    <i className="fa fa-flag-checkered pr-1"> Automat Board </i>
                  </li>
                </Link>
                <Link
                  to={`/addFundsDrawn/${automat.serialNumber}/${tenant_id}`}
                >
                  <li className="list-group-item board">
                    <i className="fa fa-flag-checkered pr-1"> Get Funds </i>
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
                <Link
                  to={`/insertedProductsToAutomat/${automat.serialNumber}`}
                  className="btn btn-secondary mb-3"
                >
                  <i className="fas fa-plus-circle"> Podsumowanie</i>
                </Link>
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
  getInsertedProductsToAutomatTotalProfit:PropTypes.func.isRequired,
  inserted_product: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  inserted_product: state.inserted_product,
});

export default connect(
  //nie mapuje stanu bo mam tylko skasować w tym widoku
  mapStateToProps,
  { deleteAutomatfromTenant ,getInsertedProductsToAutomatTotalProfit}
)(AutomatItemInTenant);
