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

  render() {
    //props z product_to_automat
    const { product_to_automat } = this.props;
    return (
      <div className="card mb-1 bg-light">
        <div className="card-body bg-light">
          <h5 className="card-title">
            {" "}
            {product_to_automat.product.name}
          </h5>
          <p className="card-text text-truncate ">
            Selling price: {product_to_automat.price}
          </p>

          <p className="card-text text-truncate ">
          Avarage profit: {product_to_automat.profit}
        </p>
        <p className="card-text text-truncate ">
        Total profit: {product_to_automat.profit*product_to_automat.number}
      </p>
        <p className="card-text text-truncate ">
        Number of inserted: {product_to_automat.number}
      </p>
          <Link
            to={`/updateProductToAutomat/${product_to_automat.automat.serialNumber}/${product_to_automat.product.id}`}
            className="btn btn-primary"
          >
            Update
          </Link>

          <Link
            to={{
              pathname: `/insertProductToAutomat/${product_to_automat.automat.serialNumber}/${product_to_automat.product.id}`,
              state: { sell_price: product_to_automat.price },
            }}
            className="btn btn-secondary ml-4"
          >
            Insert
          </Link>

          <button
            className="btn btn-danger ml-4"
            onClick={this.onDeleteClick.bind(
              this,
              product_to_automat.automat.serialNumber,
              product_to_automat.product.id
            )}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}
ProductToAutomat.propTypes = {
};

const mapStateToProps = (state) => ({
  errors: state.errors,

});

export default connect(mapStateToProps, { deleteProductToAutomat })(ProductToAutomat);
