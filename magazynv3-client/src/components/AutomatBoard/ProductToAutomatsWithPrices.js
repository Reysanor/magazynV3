import React, { Component } from "react";
import ProductToAutomat from "./ProductToAutomats/ProductToAutomat";

class ProductToAutomatsWithPrices extends Component {
  render() {
    const { product_to_automats_prop } = this.props;
    const { inserted_product_prop } = this.props;
    //musze mapować, nie moge wyświetlnić odrazu z props

    let merged2 = [];
    for(let i=0; i<product_to_automats_prop.length; i++) {
      merged2.push({
       ...product_to_automats_prop[i], 
       ...(inserted_product_prop.find((itmInner) => itmInner.product.id === product_to_automats_prop[i].product.id))}
      );
    }
    console.log(merged2);

    const pta2 = merged2.map((product_to_automat) => (
      <ProductToAutomat
        key={(product_to_automat.automat, product_to_automat.product.id)}
        product_to_automat={product_to_automat}
        
      />
    ));


    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="card text-center mb-2">
                <div className="card-header bg-secondary text-white">
                  <h3>Product</h3>
                </div>
              </div>
              {pta2}

            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ProductToAutomatsWithPrices;
