import React, { Component } from "react";
//connect state of connected component to current state
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {getProductToAutomats} from "../../actions/productToAutomatActions";
import ProductToAutomat from "./ProductToAutomat/ProductToAutomatItem"


class AutomatBoard extends Component {
  //constructor to errors
 
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getProductToAutomats(id);  
  }
  //jezeli jest error - projekt nie istnieje
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { id } = this.props.match.params;
  
    return (
    <div className="tenants">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4 text-center">Automat board</h1>
            <br />
          </div>
        </div>
      </div>
    </div>


    )
  }
}

AutomatBoard.propTypes = {
  productToAutomats: PropTypes.object.isRequired,
  getProductToAutomats: PropTypes.func.isRequired

};

const mapStateToProps = state => ({
  productToAutomats: state.productToAutomats
});

export default connect(mapStateToProps, {
  getProductToAutomats
})(AutomatBoard);
