import React, { Component } from 'react'
import { Link } from "react-router-dom";
import ProductToAutomat from './ProductToAutomats/ProductToAutomat';

class ProductToAutomatsWithPrices extends Component {
    render() {
        return (
            <div>
            <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="card text-center mb-2">
                  <div className="card-header bg-secondary text-white">
                    <h3>Products in automat</h3>
                  </div>
                </div>
              <ProductToAutomat/>
              </div>
              
            </div>
          </div>
            </div>
        )
    }
}
export default ProductToAutomatsWithPrices;