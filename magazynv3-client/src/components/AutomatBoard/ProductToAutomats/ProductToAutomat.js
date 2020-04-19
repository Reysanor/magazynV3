import React, { Component } from "react";
import { Link } from "react-router-dom";
import { deleteProductToAutomat } from "../../../actions/productToAutomatActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

 class ProductToAutomat extends Component {
  onDeleteClick(automat_serialNumber, product_id) {
    this.props.deleteProductToAutomat(automat_serialNumber, product_id);
  }
  render() {
    //props z product_to_automat
    const { product_to_automat } = this.props;
    return (
      <div>
        <div className="card-body bg-light">
          <h5 className="card-title">
            {" "}
            Product: {product_to_automat.product.name}
          </h5>
          <p className="card-text text-truncate ">
            Price: {product_to_automat.price}
          </p>
          <Link
            to={`/updateProductToAutomat/${product_to_automat.automat.serialNumber}/${product_to_automat.product.id}`}
            className="btn btn-primary"
          >
            View / Update
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
  deleteProductToAutomat: PropTypes.func.isRequired
};
export default connect(null, { deleteProductToAutomat })(ProductToAutomat);