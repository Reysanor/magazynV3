import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import PropTypes from "prop-types";
import { 
  getProductToAutomat,
  updateProductToAutomat } 
  from "../../../actions/productToAutomatActions";

class UpdateProductToAutomat extends Component {
  constructor() {
    super();

    this.state = {
      price: "",
      product: "",
      automat: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
 
  componentWillMount() {
    const { automat_serialNumber, product_id } = this.props.match.params;
    this.props.getProductToAutomat(automat_serialNumber, product_id, this.props.history);
  }


 //life cycle hooks - po każdym renderowaniu
 componentWillReceiveProps(nextProps) {
  //jeżeli mamy zmiany w state (jakieś errory nie null)
  if (nextProps.errors) {
    this.setState({ errors: nextProps.errors });
  }
    const {
        price,
        product,
        automat,
      } = nextProps.product_to_automat;


      this.setState ({
        price,
        product,
        automat,
      });
  }


  
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();

  const UpdateProductToAutomat ={
    price: this.state.price,
    product:  this.state.product,
    automat:  this.state.automat
  };
  this.props.updateProductToAutomat( 
    this.state.automat.serialNumber,
    this.state.product.id,
    UpdateProductToAutomat,
      this.props.history
  );
}



  render() {
    const { errors } = this.state;
    const { id } = this.props.match.params;

    return (
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={`/automatBoard/${id}`} className="btn btn-light">
                Back to Automat Board
              </Link>
              <h4 className="display-4 text-center">
                Update Product to automat
              </h4>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.price,
                    })}
                    placeholder="Automat price"
                    name="price"
                    type="number"
                    min="1"
                    max="5"
                    step="any"
                    value={this.state.price}
                    onChange={this.onChange}
                  />
                  {errors.price && (
                    <div className="invalid-feedback"> {errors.price}</div>
                  )}
                </div>

                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="product"
                    value={this.state.product}
                    onChange={this.onChange}
                    disabled
                  >
                   
                  <option value={this.state.product}>{this.state.product.name}</option>
                  </select>
                </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdateProductToAutomat.propTypes = {
  getProductToAutomat: PropTypes.func.isRequired,
  product_to_automat: PropTypes.object.isRequired,
  updateProductToAutomat: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  product_to_automat: state.product_to_automat.product_to_automat,
  errors: state.errors,
});
export default connect(mapStateToProps, {

  getProductToAutomat,updateProductToAutomat
})(UpdateProductToAutomat);
