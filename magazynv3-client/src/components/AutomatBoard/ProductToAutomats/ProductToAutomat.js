import React, { Component } from "react";
import { Link } from "react-router-dom";
import { deleteProductToAutomat } from "../../../actions/productToAutomatActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class ProductToAutomat extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
    };
  }
  onDeleteClick(automat_serialNumber, product_id) {
    this.props.deleteProductToAutomat(automat_serialNumber, product_id);
  }
  checkAutomatIsNull() {
    const { product_to_automat } = this.props;
    if (product_to_automat.automat === null) {
      return <div></div>;
    }
    return (
      <div className="card mb-1 bg-light">
        <div className="card-body bg-light">
          <h5 className="card-title"> {product_to_automat.product.name}</h5>
          <p className="card-text text-truncate ">
            Cena sprzedaży: {product_to_automat.price} zł
          </p>

          <p className="card-text text-truncate ">
            Średni zysk: {product_to_automat.profit} zł
          </p>
          <p className="card-text text-truncate ">
            Całkowity zysk:{" "}
            {product_to_automat.profit * product_to_automat.number} zł
          </p>
          <p className="card-text text-truncate ">
            Liczba umieszczonych: {product_to_automat.number *1} 
          </p>
          <Link
            to={`/updateProductToAutomat/${product_to_automat.automat.serialNumber}/${product_to_automat.product.id}`}
            className="btn btn-primary"
          >
            Zmiana ceny
          </Link>

          <Link
            to={{
              pathname: `/insertProductToAutomat/${product_to_automat.automat.serialNumber}/${product_to_automat.product.id}`,
              state: {
                sell_price: product_to_automat.price,
                product_name: product_to_automat.product.name,
              },
            }}
            className="btn btn-secondary ml-4"
          >
            Wstaw
          </Link>
          <button
            className="btn btn-danger ml-4"
            onClick={this.onDeleteClick.bind(
              this,
              product_to_automat.automat.serialNumber,
              product_to_automat.product.id
            )}
          >
            Usuń
          </button>
        </div>
      </div>
    );
  }

  render() {
    //props z product_to_automat
    const { product_to_automat } = this.props;

   // console.log(product_to_automat);
    //console.log(product_to_automat.automat.serialNumber)
    //  const { id } = this.props.match.params;
    // console.log(id)

    return <div>{this.checkAutomatIsNull()}</div>;
  }
}
ProductToAutomat.propTypes = {};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { deleteProductToAutomat })(
  ProductToAutomat
);
