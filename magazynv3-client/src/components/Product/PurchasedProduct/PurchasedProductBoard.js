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
    return(
      <tr>
      <th >Nazwa</th>
      <th>Ilość</th>
      <th>Cena</th>

      </tr>
)
  }

  dataOfTable() {
    const { purchased_products } = this.props.purchased_product;
    return purchased_products.map((purchased_product, index) => {
      const { id, amount, price, product } = purchased_product; //destructuring

      if (id != null) {
        if (amount > 0) {
          return (
            <tr key={id}>
              <td>{product.name}</td>
              <td id="purchasedProductsPlus">{amount}</td>
              <td>{price}</td>
              <td className="btn-info">
                {" "}
                <Link to={`/updatePurchasedProduct/${id}` } className="btn-info">Edytuj</Link>
              </td>
            </tr>
          );
        } else {
          return (
            <tr key={id}>
              <td>{product.name}</td>
              <td id="purchasedProductsMinus">{amount}</td>
              <td>Nie dotyczy</td>
              <td >
                {" "}
                <Link to={`/updatePurchasedProduct/${id}`}>Edytuj </Link>
              </td>
            </tr>
          );
        }
      }
    });
  }

  render() {
    return (
      <div className="container">
      <Link to="/products" className="btn btn-lg btn-info">
      Powrót
    </Link>
        <div className="card card-body bg-light mb-5">
          <h1 id="purchasedProductsTitle">Historia magazynu</h1>
          <table id="purchasedProducts">
          <thead>{this.namesOfTable()}</thead>
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
