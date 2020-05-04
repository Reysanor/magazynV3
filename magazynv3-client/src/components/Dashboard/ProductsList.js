import React, { Component } from "react";
import ProductItem from "../../components/Product/ProductItem";
import CreateProductButton from "../../components/Product/CreateProductButton";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPurchasedProductsPer } from "../../actions/purchasedProductActions";
import PurchasedProductButton from "../Product/PurchasedProduct/PurchasedProductButton";

class ProductsList extends Component {
  //lifecycle hook - co ma się dziać po zamontowaniu komponentu (dane z "mapStateToProps" na dole)
  componentDidMount() {
    this.props.getPurchasedProductsPer();
  }

  dataOfTable() {
    const { purchased_products } = this.props.purchased_product;
    for (let i = 0; i < purchased_products.length - 1; i++) {
      if (
        purchased_products[i].product.id == purchased_products[i + 1].product.id
      ) {
        return <div></div>;
      }
    }
    return (
      <div>
        {purchased_products.map((purchased_product) => (
          <ProductItem
            key={purchased_product.product.id}
            purchased_product={purchased_product}
          />
        ))}{" "}
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="products">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="display-4 text-center">Magazyn</h1>
                <br />
                {/*przycisk do utworzenia nowego Wynajmujacego */}
                <CreateProductButton />
                <PurchasedProductButton />
                <br />
                <hr />
                {/*mapuje projekty i wyswietlam je jako projectItemy */}
                <div>{this.dataOfTable()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProductsList.propTypes = {
  //przekazuje funkcje, isRequired oznacza że jest niezbędna do działania componentu
  //jednocześnie określa wymagany typ uzyskanego prop
  getPurchasedProductsPer: PropTypes.func.isRequired,
  purchased_product: PropTypes.object.isRequired,
};
//przyjmuje parametr state i podłącza project to state project (mappuje do componentu aplikacji)
const mapStateToProps = (state) => ({
  purchased_product: state.purchased_product,
});
//łączenie componentu z state
export default connect(
  //podczas łączenie się ze state aplikacji wymagane jest zmapowanie wszystkich state do props
  mapStateToProps,
  { getPurchasedProductsPer }
)(ProductsList);
