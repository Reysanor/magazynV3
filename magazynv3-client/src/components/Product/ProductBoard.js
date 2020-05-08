import React, { Component } from "react";
import { connect } from "react-redux";
import PurchasedProductBoard from "./PurchasedProduct/PurchasedProductBoard";
import ProductsList from "../Dashboard/ProductsList";
import PurchasedProductButton from "./PurchasedProduct/PurchasedProductButton";

class ProductBoard extends Component {
  //lifecycle hook - co ma się dziać po zamontowaniu komponentu (dane z "mapStateToProps" na dole)

  render() {
    //mapuje przycisk z linkiem do tworzenia nowego projektu a poniżej utworzone projekty
    return (
      <div>
        <div className="container">
                <ProductsList />
        </div>
      </div>
    );
  }
}

//łączenie componentu z state
export default connect(
  //podczas łączenie się ze state aplikacji wymagane jest zmapowanie wszystkich state do props
  null,
  {}
)(ProductBoard);
