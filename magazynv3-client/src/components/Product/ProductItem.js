import React, { Component } from "react";
//
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteProduct } from "../../actions/productActions";

class ProductItem extends Component {
    //funkcja kasowania po naciśnieciu
    onDeleteClick = id => {
        this.props.deleteProduct(id);
    };

    render() {
        //pobieram dane producta od dashboard
        //<span className="mx-auto">{product.nip}</span> = przykład wyświetlenia danych
        const { product } = this.props;
        return (
            <div className="container">
                <div className="card card-body bg-light mb-3">
                    <div className="row">
                        <div className="col-lg-6 col-md-4 col-8">
                        <p>{product.name}</p>
                        <p>{product.type}</p>
                        </div>
                        <div className="col-md-4 d-none d-lg-block">
              <ul className="list-group">
              
                           {/*Link z parametrem (id tego producta)*/}
                <Link to={`/updateProduct/${product.id}`}>
                  <li className="list-group-item update">
                    <i className="fa fa-edit pr-1"> Update Product Info</i>
                  </li>
                </Link>

                <li
                  className="list-group-item delete"
                  onClick={this.onDeleteClick.bind(
                    this,
                    //uzyskuje z props od rodzica (Wybranego producta na liscie Projektów)
                    product.id
                  )}
                >
                  {/* funkcja kasowania z routera */}
                  <i className="fa fa-minus-circle pr-1"> Delete Product</i>
                </li>
              </ul>
            </div>
          </div>
     </div>
    </div>
        );
    }
}
ProductItem.propTypes = {
    deleteProduct: PropTypes.func.isRequired
};

export default connect(
    //nie mapuje stanu bo mam tylko skasować w tym widoku
    null,
    { deleteProduct }
)(ProductItem);