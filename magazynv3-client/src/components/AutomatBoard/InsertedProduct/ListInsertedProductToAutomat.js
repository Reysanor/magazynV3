import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getInsertedOneProductByAutomat } from "../../../actions/insertedProductActions";
class ListInsertedProductToAutomat extends Component {
  //lifecycle hook - co ma się dziać po zamontowaniu komponentu (dane z "mapStateToProps" na dole)
  componentDidMount() {
    this.props.getInsertedOneProductByAutomat(
      this.props.automat_serialNumber_prop,
      this.props.product_id_prop
    );
  }

  namesOfTable() {
    return (
      <tr>
        <th>Data i czas</th>
        <th>Liczba</th>
      </tr>
    );
    //   return <th key={index}>{key.toUpperCase()}</th>;
  }

  dataOfTable() {
    const { inserted_products } = this.props.inserted_product;
    return inserted_products.map((inserted_product, index) => {
      const { id, number, product, dateOfInsert } = inserted_product; //destructuring
      if (id != null) {
        const {finalDate} = inserted_product.dateOfInsert
        return (
          <tr key={id}>
            <td>{dateOfInsert}</td>
            <td>{number}</td>
          </tr>
        );
      }
    });
  }
  render() {
    return (
      <div>
        <div className="card card-body bg-light mb-5">
          <h1 id="purchasedProductsTitle">Historia</h1>
          <table id="purchasedProducts">
            <thead>{this.namesOfTable()}</thead>
            <tbody>{this.dataOfTable()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

ListInsertedProductToAutomat.propTypes = {
  //przekazuje funkcje, isRequired oznacza że jest niezbędna do działania componentu
  //jednocześnie określa wymagany typ uzyskanego prop
  getInsertedOneProductByAutomat: PropTypes.func.isRequired,
  inserted_product: PropTypes.object.isRequired,
};
//przyjmuje parametr state i podłącza project to state project (mappuje do componentu aplikacji)
const mapStateToProps = (state) => ({
  inserted_product: state.inserted_product,
});
//łączenie componentu z state
export default connect(
  //podczas łączenie się ze state aplikacji wymagane jest zmapowanie wszystkich state do props
  mapStateToProps,
  { getInsertedOneProductByAutomat }
)(ListInsertedProductToAutomat);
