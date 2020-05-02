import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPurchasedProducts } from "../../../actions/purchasedProductActions";
import { Link } from "react-router-dom";
class PurchasedProductBoard extends Component {
  //lifecycle hook - co ma się dziać po zamontowaniu komponentu (dane z "mapStateToProps" na dole)
  componentDidMount() {
    this.props.getPurchasedProducts();
  }
  namesOfTable() {
    let header = ["name", "number", "price"];
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }

  dataOfTable() {
    const { purchased_products } = this.props.purchased_product;
    return purchased_products.map((purchased_product, index) => {
      const { id, amount, price, product } = purchased_product; //destructuring

      if(amount>0){
        return (
          <tr key={id}>
            <td>{product.name}</td>
            <td id="purchasedProductsPlus">{amount}</td>
            <td>{price}</td>
            <td>
              {" "}
              <Link to="/PurchasedProductBoard">Edit </Link>
            </td>
          </tr>
        );
      }else{
        return (
          <tr key={id}>
            <td>{product.name}</td>
            <td id="purchasedProductsMinus">{amount}</td>
            <td></td>
            <td>
              {" "}
              <Link to="/PurchasedProductBoard">Edit </Link>
            </td>
          </tr>
        );
      }
     
    });
  }

  render() {

    return (
      <div>
        <div className="card card-body bg-light mb-5">
            <h1 id="purchasedProductsTitle">History of storage</h1>
            <table id="purchasedProducts">
              <tr>{this.namesOfTable()}</tr>
              <tbody>{this.dataOfTable()}</tbody>
            </table>
          </div>
        </div>
        

 
    );
  }
}

PurchasedProductBoard.propTypes = {
  //przekazuje funkcje, isRequired oznacza że jest niezbędna do działania componentu
  //jednocześnie określa wymagany typ uzyskanego prop
  getPurchasedProducts: PropTypes.func.isRequired,
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
  { getPurchasedProducts }
)(PurchasedProductBoard);
