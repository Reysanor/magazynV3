import React, { Component } from "react";
import PropTypes from "prop-types";
//łączenie z state
import { connect } from "react-redux";
//1 - pobieram funkcje i obiekty
import { createPurchasedProduct } from "../../../actions/purchasedProductActions"
import classnames from "classnames";
import ProductBoardButton from "./ProductBoardButton"

class AddPurchasedProduct extends Component {
    constructor(props) {
        super(props);
        const { id } = this.props.match.params;

        this.state = {
            amount: "",
            price: "",
            product: id,
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        const newPurchasedProduct = {
            amount: this.state.amount,
            price: this.state.price,
        };
        this.props.createPurchasedProduct(this.state.product,newPurchasedProduct, this.props.history);

    }


render() {
   
    const { errors } = this.state;
    
    return (
      <div>
        <div className="product">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h5 className="display-4 text-center">Dodaj produkt do magazynu</h5>
                <ProductBoardButton/>

                <hr />
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                  <input
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.amount
                    })}
                    placeholder="ilość"
                    name="amount"
                    type="number"
                    min="1" 
                    step="1"
                    value={this.state.amount}
                    onChange={this.onChange}
                  />
                  {errors.amount && (
                    <div className="invalid-feedback">
                      {errors.amount} 
                    </div>
                  )}
                  </div>

                  <div className="form-group">
                  <input
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.price
                    })}
                    placeholder="cena/1szt."
                    name="price"
                    type="number"
                    min="0.1"
                    step="any"
                    value={this.state.price}
                    onChange={this.onChange}
                  />
                  {errors.price && (
                    <div className="invalid-feedback">
                      {errors.price} 
                    </div>
                  )}
                  </div>

                  <input
                    type="submit"
                    className="btn btn-primary btn-block mt-4" value="akceptuj"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddPurchasedProduct.propTypes = {
 
  createPurchasedProduct: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { createPurchasedProduct }
)(AddPurchasedProduct);


