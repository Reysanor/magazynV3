import React, { Component } from "react";
//connect state of connected component to current state
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getProductToAutomats } from "../../actions/productToAutomatActions";
import ProductToAutomatsWithPrices from "./ProductToAutomatsWithPrices";

class AutomatBoard extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
    };
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getProductToAutomats(id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { id } = this.props.match.params;
    const { product_to_automats } = this.props.product_to_automat;
    const { errors } = this.state;
    let BoardContent;

    const boardAlgorithm = (errors, product_to_automats) => {
      if (product_to_automats.length < 1) {
        if (errors.automatNotFound) {
          return (
            <div className="alert alert-danger text-center" role="alert">
              {errors.automatNotFound}
            </div>
          );
        } else if (errors.serialNumber) {
          return (
            <div className="alert alert-danger text-center" role="alert">
              {errors.serialNumber}
            </div>
          );
        } else {
          return (
            <div className="alert alert-info text-center" role="alert">
              No Products To Automat on this board
            </div>
          );
        }
      } else {
        {
          /* przekazanie do backlog*/
        }
        return (
          <ProductToAutomatsWithPrices
            product_to_automats_prop={product_to_automats}
          />
        );
      }
    };
    BoardContent = boardAlgorithm(errors, product_to_automats);

    return (
      <div className="container">
        <Link
          to={`/addProductToAutomat/${id}`}
          className="btn btn-primary mb-3"
        >
          <i className="fas fa-plus-circle"> Add product to automat</i>
        </Link>
        <br />
        <hr />
        {BoardContent}
      </div>
    );
  }
}

PropTypes.propTypes = {
  product: PropTypes.object.isRequired,
  getProductToAutomats: PropTypes.func.isRequired,
  product_to_automat: PropTypes.object.isRequired,

  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  product: state.product,
  product_to_automat: state.product_to_automat,
  errors: state.errors,
});

export default connect(mapStateToProps, { getProductToAutomats })(AutomatBoard);
