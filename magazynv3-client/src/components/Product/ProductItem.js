import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteProduct } from "../../actions/productActions";

class ProductItem extends Component {
  componentDidMount() {
  }

  //funkcja kasowania po naciśnieciu
  onDeleteClick = (id) => {
    this.props.deleteProduct(id);
  };

  render() {
    //pobieram dane producta od dashboard
    //<span className="mx-auto">{product.nip}</span> = przykład wyświetlenia danych
    //const { product } = this.props;
    const {purchased_product} = this.props;
    return (
      <div className="container">
        <div className="card card-body bg-light mb-3">
          <div className="row">

            <div className="col-md-5">
            <p>Nazwa: {purchased_product.product.name}</p>

            <p>Ilość w magazynie: {purchased_product.amount}</p>
            <p>Średnia cena: {purchased_product.price}</p>

            </div>
            <div className="col-md-5 d-none d-lg-block">
              <ul className="list-group">
                <Link to={`/addPurchasedProduct/${purchased_product.product.id}`}>
                  <li className="list-group-item update">
                    <i className="fa fa-edit pr-1"> Dodaj do magazynu</i>
                  </li>
                </Link>

                <Link to={`/removePurchasedProduct/${purchased_product.product.id}/${purchased_product.amount}`}>
                  <li className="list-group-item update">
                    <i className="fa fa-minus-circle pr-1">
                      {" "}
                      Zabierz z magazynu
                    </i>
                  </li>
                </Link>
              </ul>
            </div>
            <div className="col-md-2 d-none d-lg-block">
            <ul className="list-group">
              <Link to={`/updateProduct/${purchased_product.product.id}`}>
                <li className="list-group-item update">
                  <i className="fa fa-edit pr-1"> Edytuj produkt</i>
                </li>
              </Link>

              <Link to={`/deleteProduct/${purchased_product.product.id}`}>
                <li className="list-group-item update">
                  <i className="fa fa-minus-circle pr-1">
                    {" "}
                    Usuń Produkt
                  </i>
                </li>
              </Link>
            </ul>
          </div>
          </div>
        </div>
      </div>
    );
  }
}
ProductItem.propTypes = {
  deleteProduct: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
});
export default connect(
  //nie mapuje stanu bo mam tylko skasować w tym widoku
  mapStateToProps,
  { deleteProduct }
)(ProductItem);
