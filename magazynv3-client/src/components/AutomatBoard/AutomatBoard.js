import React, { Component } from "react";
//connect state of connected component to current state
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getProductToAutomats } from "../../actions/productToAutomatActions";
import ProductToAutomatsWithPrices from "./ProductToAutomatsWithPrices";

class AutomatBoard extends Component {
  //constructor to errors

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getProductToAutomats(id);

  }

  render() {
    const { id } = this.props.match.params;
    const { product_to_automats } = this.props.product_to_automats; 
    return (
      <div className="container">
        <Link to={`/addProductToAutomat/${id}`} className="btn btn-primary mb-3">
          <i className="fas fa-plus-circle"> Add product to automat</i>
        </Link>
        <br />
        <hr />
        <ProductToAutomatsWithPrices />
      </div>
    );
  }
}

PropTypes.propTypes= {
  product: PropTypes.object.isRequired,
  getProductToAutomats: PropTypes.func.isRequired,
  product_to_automats: PropTypes.object.isRequired

}

const mapStateToProps = state =>({
  product: state.product,
  product_to_automats: state.product_to_automats
})

export default connect(mapStateToProps,{getProductToAutomats})(AutomatBoard);
