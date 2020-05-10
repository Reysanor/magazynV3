import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getInsertedProductsByAutomat } from "../../../actions/insertedProductActions";
class ListInsertedProducts extends Component {
  //lifecycle hook - co ma się dziać po zamontowaniu komponentu (dane z "mapStateToProps" na dole)
  componentDidMount() {
    const { automat_serialNumber } = this.props.match.params;
    this.props.getInsertedProductsByAutomat(automat_serialNumber);
  }

  namesOfTable() {
     return(
            <tr>
            <th>DATE</th>
            <th>NAME</th>
            <th>COUNT</th>
            </tr>
     )
     //   return <th key={index}>{key.toUpperCase()}</th>;
   
  }

  dataOfTable() {
    const { inserted_products } = this.props.inserted_product;
    return inserted_products.map((inserted_product, index) => {
      const { id, number, product, dateOfInsert } = inserted_product; //destructuring

      if(id!=null){
       return (
          <tr key={id}>
          <td>{dateOfInsert}</td>
            <td>{product.name}</td>
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
          <h1 id="purchasedProductsTitle">History of automat</h1>
          <table id="purchasedProducts">
            <thead>{this.namesOfTable()}</thead>
            <tbody>{this.dataOfTable()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

ListInsertedProducts.propTypes = {
  //przekazuje funkcje, isRequired oznacza że jest niezbędna do działania componentu
  //jednocześnie określa wymagany typ uzyskanego prop
  getInsertedProductsByAutomat: PropTypes.func.isRequired,
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
  { getInsertedProductsByAutomat }
)(ListInsertedProducts);
