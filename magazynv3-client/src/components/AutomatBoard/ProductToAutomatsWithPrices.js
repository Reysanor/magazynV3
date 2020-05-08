import React, { Component } from "react";
import ProductToAutomat from "./ProductToAutomats/ProductToAutomat";
import { getInsertedProductsAvaragePrice } from "../../actions/insertedProductActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
class ProductToAutomatsWithPrices extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
    };
  }

  componentDidMount() {
    const {id_prop} = this.props;
    //console.log(id_prop);
     this.props.getInsertedProductsAvaragePrice(id_prop);
  }

  render() {
    const { product_to_automats_prop } = this.props;
    const { inserted_products } = this.props.inserted_product;

    //musze mapować, nie moge wyświetlnić odrazu z props

    let merged2 = [];
    for(let i=0; i<product_to_automats_prop.length; i++) {
      merged2.push({
       ...product_to_automats_prop[i], 
       ...(inserted_products.find((itmInner) => itmInner.product.id === product_to_automats_prop[i].product.id))}
      );
    }
    //console.log(merged2);

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

ProductToAutomatsWithPrices.propTypes = {
  getInsertedProductsAvaragePrice: PropTypes.func.isRequired,
  inserted_product: PropTypes.object.isRequired,

  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  inserted_product: state.inserted_product,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  getInsertedProductsAvaragePrice,
})(ProductToAutomatsWithPrices);
