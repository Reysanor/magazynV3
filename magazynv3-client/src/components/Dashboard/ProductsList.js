import React, { Component } from "react";
import ProductItem from "../../components/Product/ProductItem";
import CreateProductButton from "../../components/Product/CreateProductButton";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPurchasedProductsPer } from "../../actions/purchasedProductActions";
import { getInsertedProductsInfo } from "../../actions/insertedProductActions";
import PurchasedProductButton from "../Product/PurchasedProduct/PurchasedProductButton";

class ProductsList extends Component {
  //lifecycle hook - co ma się dziać po zamontowaniu komponentu (dane z "mapStateToProps" na dole)
  componentDidMount() {
    this.props.getPurchasedProductsPer();
    this.props.getInsertedProductsInfo();
  }
  //czeck if keys is unique
  dataOfTable() {
    const { purchased_products } = this.props.purchased_product;
    var ids = [];
    for (let i = 0; i < purchased_products.length; i++) {
      ids.push(purchased_products[i].product.id);
    }
    if (ids.length === new Set(ids).size) {
      const { inserted_products } = this.props.inserted_product;

      let merged2 = [];
      for (let i = 0; i < purchased_products.length; i++) {
        merged2.push({
          ...purchased_products[i],
          ...inserted_products.find(
            (itmInner) =>
              itmInner.product.id === purchased_products[i].product.id
          ),
        });
      }
      //console.log(merged2);

      const pta2 = merged2.map((purchased_product) => (
        <ProductItem
          key={purchased_product.product.id}
          purchased_product={purchased_product}
        />
      ));

      return <div>{pta2}</div>;
    } else {
      return <div></div>;
    }
  }

  render() {
    return (
      <div>
        <div className="products">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="display-4 text-center ">Magazyn</h1>
                <br />
                <CreateProductButton /> <PurchasedProductButton />
                <br />
                <hr />
                {/*przycisk do utworzenia nowego Wynajmujacego */}

                {/*mapuje projekty i wyswietlam je jako projectItemy */}
                {this.dataOfTable()}
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
  getInsertedProductsInfo: PropTypes.func.isRequired,
  inserted_product: PropTypes.object.isRequired,
};
//przyjmuje parametr state i podłącza project to state project (mappuje do componentu aplikacji)
const mapStateToProps = (state) => ({
  purchased_product: state.purchased_product,
  inserted_product: state.inserted_product,
});
//łączenie componentu z state
export default connect(
  //podczas łączenie się ze state aplikacji wymagane jest zmapowanie wszystkich state do props
  mapStateToProps,
  { getPurchasedProductsPer, getInsertedProductsInfo }
)(ProductsList);
